---
type: Lesson
title: Diagnose "no harvests lately" from the base's PR history and the provider pin history, then read the captured instructions against the host
description: When asked why knowledge harvests stopped, count the base's `okf-harvest/*` PRs by date, line the drop up with the oats.okf pin history, and read the captured harvest instructions for host-dependent gates before auditing live instances; a provider fix reaches a home only on respawn, so the PR count recovers after respawns.
about: [workstream/workspace-administration]
kind: lesson
id: ins-2fc99a947b33
tags: [lesson, setup-admin, okf, harvest, diagnosis, provider-pin, host, capture]
timestamp: 2026-10-23
---

Judgement formed 2026-10-23 by a setup-admin instance asked why the
workspace's knowledge harvests had gone quiet.

# The trap

"Why didn't X happen" sounds like a question about the instances, so the
natural move is to audit the live ones: open their notes, read their logs,
ask them. On a workstation that is a handful of short-lived homes, most with
empty notes, and it finds little. The answer was in two records that outlive
every instance, and two commands reached it.

# Answer from records, in this order

1. **Count the harvest PRs on the knowledge base by date.** `gh pr list -R
   <base repository> --state all` with head refs `okf-harvest/*` shows when
   the drop started and how steep it is. A harvest that happened left a PR;
   one that did not leaves nothing in any home.
2. **Line the drop up with the oats.okf pin history** in the workspace file
   (`git log -G'oats.okf:' -- oats-workspace.yaml`). A drop that begins at
   a pin is the provider's shipped text, not the instances' diligence.
3. **Read the captured harvest instructions against this host.** Two things
   to look for: what the text counts as a checkpoint, and any gate whose
   outcome depends on the host (a command this OS lacks, a resource
   threshold a shared workstation cannot meet). An instruction an instance
   cannot satisfy ends in deferral, and an instance that only defers "to
   task close" never harvests if its task never closes: long-lived
   maintainers and area experts are exactly the instances with the most to
   propose.
4. **Remember capture before judging a fix.** A home keeps the provider it
   was spawned with, as it keeps its launch ([a host-wide pi model is one
   `launch set` write](a-host-wide-pi-model-is-one-launch-set-write.md),
   last section). A corrected provider reaches an instance only on respawn,
   so a fix shows in the PR count only after the long-lived homes are
   respawned. Report that, or the person will look at the unchanged count
   the next day and conclude the fix failed.

# The case that taught it

On one workspace's base, about 45 harvest PRs opened over three days in
mid-October 2026, then 2, 1 and 5 on the next three days with activity, then
none for four days. The drop lined up with pinning oats.okf 5.2.0 and, a day
later, 5.2.1. That version's text named only "a finished task or PR
hand-over" as a checkpoint, said never to harvest merely because a PR was
opened, and gated harvest on confirming 8 GB of available memory. macOS has
no `free`; a 16 GB Mac running several sessions could not confirm 8 GB, and
the one live instance log consulted read "Harvest deferred to task close".
The base's PRs and the pin history answered this in two commands; the live
instances would not have, and none was interviewed beyond that one log
line. The instances were following their text. The provider's maintainers
took the gate and the checkpoint list as the thing to fix; the facts of
that package's versions are the okf package expert's to record, not this
node's.

# Elimination route

The host-dependent gate and the implicit checkpoint are provider debt: the
provider should ship no gate a host cannot evaluate, name its checkpoints,
and write a visible line when a checkpoint proposes nothing, so a drought
reads directly from instance logs. The diagnostic order itself is
judgement, not debt: whatever the provider ships, the base's PR history and
the pin history are the two records that outlive the instances.

# Citations

Evidence: OKF proposal from oats-setup-admin/oats-maintainer-lanes-admin,
2026-10-23; notes/harvest-drought-2026-10.md. The counts and the host
reading come from one workspace and one 16 GB Mac; the provider text is as
read from the captured oats.okf 5.2.0 instructions by the source, not
re-read by the harvest.
