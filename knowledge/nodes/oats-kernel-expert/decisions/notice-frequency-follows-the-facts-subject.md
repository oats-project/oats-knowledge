---
type: Decision
title: A notice about a host fact is said once per command; a notice about a repository stays per repository
description: A degraded-but-working fallback notice takes its frequency and scope from what the fact is about, deduplicated where it is produced rather than grouped by text at the printers, counted per repository or hidden behind a verbose flag.
tags: [kernel, cli, diagnostics, git, cache, prerequisites, rejected-alternatives]
timestamp: 2026-11-09
---
# Decision

When the kernel tells the operator, on stderr, about a degraded-but-working
fallback, the notice's frequency and scope follow **what the fact is about**,
not where the fallback happened to be exercised.

- **A fact about the host** is said at most once per command, on one line
  that names the host fact, the floor it misses, the fallback in effect and
  what removes the notice. It names no repository, because the repository
  is not what the fact is about. The source's case: a Git older than the
  partial-cache floor, so every cache fetches whole trees.
- **A fact about one repository** stays one line per repository. The
  source's case: a server that does not serve partial fetches. Several
  repositories can each carry that fact, and the operator needs to know
  which.

**The dedupe lives where the notice is produced** (the read session that
starts and rebuilds caches), not in the printers. The printers drain the
session's notices per command or per reader call, so a notice recorded once
per session is said once per command without either printer knowing why.

Before adding or changing a kernel notice, ask "is this about the host, or
about this object?", and let the answer choose the frequency.

# Why

A fresh-host `oats onboard` on Git 2.43 opened on a run of identical
warnings, one per cache, all stating the same host fact with a different
repository URL. Repeating a host fact per repository buries the one action
the admin can take and trains them to ignore warnings. The remedy the line
names is behaviour contract under
[the CLI-boundary lesson](/nodes/oats-kernel-expert/lessons/machine-boundary-contract.md),
so the once-only line must still carry it.

This applies, and does not change,
[the prerequisite boundary](prerequisite-refusals-distinguish-baselines-from-optimizations.md):
an older Git is reported, never refused, because whole-tree fetching is a
working fallback rather than a broken operation. This decision only governs
how that report is said.

# Rejected alternatives

- **Grouping at the printers by matching the text.** Two consumers would
  each have to recognise the kernel's own prose, and a wording change would
  silently break the grouping. Dedupe is the producer's job.
- **Saying how many repositories the notice covers.** Optional in the brief;
  it needs aggregation at drain time for little operator value.
- **Verbose-only output.** Proposed by the reporting lane; the product-lane
  maintainer chose once per command so the admin still learns, once, why
  fetches are heavier and how to fix it.

# A wording constraint

The notice must not promise lighter fetches after a Git upgrade. A cache
recorded as whole-tree stays whole-tree; the upgrade removes the notice for
caches started afterwards, not the recorded fetch mode of existing ones.

# Evidence and limits

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-quiet-git-partial-notice, 2026-11-09; notes/older-git-notice-once-per-command.md.

The product-lane choice of once per command over verbose-only is
source-reported, attributed to the product-lane maintainer's brief of
2026-11-09. The harvest read the implementation,
[oats-project/oats#1768](https://github.com/oats-project/oats/pull/1768),
open at head `f9b8363ea` when read: its description states the host-fact
line without a repository, the per-session dedupe at the producer with
both printers unchanged, the per-repository server notice kept, and a test
asserting one notice for two new caches and one rebuilt cache in a single
session. That is an open PR's own account, not a merge, release or human
acceptance, and no test was rerun by this harvest.

Checked by the knowledge maintainer at review of the harvest on
2026-11-09: [oats-project/oats#1768](https://github.com/oats-project/oats/pull/1768)
merged on 2026-11-09 at `f9b8363ea8c461b89a53eac9ea83d8539d2d776f`, the
head cited above, and its description still states the points listed. The
implementation was not inspected, no test was rerun and no release was
checked; the merge is not recorded as human acceptance.

One notice family was observed. No measurement of operator reading
behaviour backs the "trains them to ignore warnings" rationale; it is the
source's judgement of the reported first screen.
