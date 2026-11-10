---
type: Decision
title: Worktree setup is a capability hook, not a repository-file contract
description: A composed capability decides what repository setup runs, avoiding a second kernel trust mechanism based on a file's presence, host opt-in or script scanning.
about: [system/oats-kernel]
id: dec-25d1be012c57
tags: [kernel, worktree, hooks, capabilities, trust]
timestamp: 2026-10-08
---
# Decision and rationale

The proposal and named notes record agreement on 2026-10-08 by maintainers
`oats-maintainer-REDACTED` and `oats-expert-juan`: repository worktree setup belongs
at a capability `worktree` hook, not at a special executable file discovered
in the target repository. The source identifies awebai/oats#801 as the
implementation merged for OATS 0.49.0 [1].

The kernel owns the moment a tree is created; a composed capability owns the
setup behaviour. The chosen event covers both the initial worktree-mode
spawn tree, within the spawn transaction, and extra trees created by
`oats worktree add`. A spawn-only hook was not a complete seam for a
per-tree responsibility. This applies the existing
[kernel/capability split](/nodes/oats-kernel-expert/decisions/kernel-and-capability-responsibility.md)
without making product repositories carry an OATS execution contract.

**The admission decision is which capability the instance composes, not
which files happen to exist in the target tree.** The hook-declaring
capability is trusted through workspace membership or package declaration,
as established by
[Integrity, origin and consent are different proofs](/nodes/oats-kernel-expert/decisions/trust-approval-and-consent-boundaries.md).
It may deliberately execute repository code, including dependency installation
in a non-member repository. That is the capability's reviewed decision; it
does not make the repository itself a trusted capability or ask the kernel
to approve each repository script.

# Rejected alternatives

- **A repository `.oats/worktree-setup` file:** it would require a new kernel
  trust list, put an OATS path in every product repository and make a file's
  presence choose what runs. The capability seam keeps the execution decision
  at the existing reviewable trust boundary.
- **Additional host opt-in or digest-pinning gates for an already trusted
  capability:** these would stack a second admission mechanism on membership
  or declaration. This rejection does not remove package-lock integrity or
  the separate consent required for host installs.
- **Script scanning as an admission gate:** a scan establishes only what it
  inspected; transitive install scripts remain outside that evidence. A
  capability may offer an advisory scan, but the scan is not execution trust.

# Deliberate limits

Hook environment inheritance was accepted knowingly, not as a sandboxing
claim. Capability-side handling of inherited locators and credentials remains
in [A lifecycle hook never trusts the ambient environment](/nodes/integrations-expert/lessons/a-lifecycle-hook-never-trusts-the-ambient-environment.md).
The worktree seam's output boundary keeps hook log contents out of structured
answers and durable records, exposing log paths instead. Trust to execute
is not permission to propagate arbitrary output; see
[Hook failures and error messages are output channels](/nodes/oats-kernel-expert/lessons/hook-and-error-channels-disclose.md).

A required setup failure must not report a usable tree: the spawn rolls back,
or the extra-tree addition is undone. Exact ordering and branch-cleanup rules
belong in the live
[capability contract](https://github.com/awebai/oats/blob/main/docs/capabilities.md),
not in a second implementation inventory here.

Adoption still requires upgrading every composing host before introducing
`hooks.worktree`, with the capability floor at `compatibility.oats: ">=0.49.0"`.
The reason is already canonical in
[Unknown hook events are forward-tolerant unless required](/nodes/oats-kernel-expert/decisions/forward-tolerant-hook-events.md):
the tolerance does not help a pre-0.49.0 kernel. This decision applies that
limit; it does not supersede it or establish that 0.49.0 has been released.

# Citations

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-worktree-setup, 2026-10-08; notes/796-decision.md and notes/796-seam-findings.md.

1. The proposal identifies [awebai/oats#796](https://github.com/awebai/oats/issues/796) as the design discussion and [awebai/oats#801](https://github.com/awebai/oats/pull/801), merged as `a82d5e5f`, as the implementation. Maintainer agreement and merge details are attributed to the source evidence, not an independent implementation audit.
