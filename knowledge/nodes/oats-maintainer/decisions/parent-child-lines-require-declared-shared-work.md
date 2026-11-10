---
type: Decision
title: Parent-child lines require declared shared work, not inferred organisation
description: Keep parent-child placement while drawing its connector only from a parent-bound shared-work declaration, with coordination guidance owned by capabilities rather than the kernel or oats.core.
about: [workstream/oats-direction]
id: dec-97cfed58e463
tags: [clients, lineage, coordination, capabilities, rejected-alternatives]
timestamp: 2026-10-27
---
# Decision and rationale

The source reports direct product-owner direction on 2026-10-27: the instance
tree must not assume that every organisation uses lead-and-worker roles.
Keep every child under its parent, but distinguish shared work through an
explicit declaration rather than interpreting the roles or shape of that tree.
This is cross-client direction, not a claim that the feature has shipped.

- On a host supporting the feature, draw a parent-child connector only when
  the child declares shared work with that parent. A person or agent may set
  the flag at spawn or later; it persists with the home and is bound to the
  parent against which it was set. Parentage alone does not supply the flag.
- The line is the only visible mark of the flag; do not add a flag label.
  A host without the feature retains the earlier lines, not a client-side
  approximation of the new declaration.
- Each team's capabilities teach when its process sets the flag. The kernel
  and `oats.core` supply and neutrally describe the mechanism, never the
  coordination policy; this applies the general
  [capability-owned coordination policy](/nodes/oats-maintainer/stewardship/coordination-policy-lives-in-capabilities.md)
  boundary. OATS's own convention belongs in `oats.engineering` capabilities:
  experts set it on their developers, developers on their
  reviewers, and maintainers do not set it on their experts. That convention
  is guidance for those capabilities, not a role classifier in the kernel
  or clients.

This applies the [kernel/capability responsibility boundary](/nodes/oats-kernel-expert/decisions/kernel-and-capability-responsibility.md)
without making one team's organisation a framework requirement. It also
preserves the rule that [clients consume the kernel's reported model](/nodes/oats-maintainer/decisions/desktop-parity-lifecycle-and-policy.md#the-kernels-json-is-the-desktops-model-2026-09-24),
rather than building a second organisational model in each viewer.

# Rejected alternatives

- **Role or soul inference:** assumes a lead-based organisation that other
  teams need not use. Familiar OATS role names do not authorize a line.
- **Work-mode or tree-shape inference:** an expert's team and a maintainer's
  separate efforts can have the same shape, so structure does not establish
  shared work.
- **Named workstreams:** a richer model than the distinction requires.
- **Per-viewer display settings:** let different viewers and the TUI present
  different relationship meanings for the same instances.

The mechanism and client regressions should enforce declaration-only
connectors and legacy-host behavior; capability instructions should carry the
team convention. This record preserves the choice and rejected alternatives,
not a substitute for those implementations or evidence that tests passed.

# Explicit partial supersession and neighbouring ownership

For hosts supporting the feature, this direction **partially supersedes**
the parent-child connector meaning in Desktop's
[explicit sibling and parentage display decision](/nodes/oats-desktop-expert/decisions/sibling-relations-are-shown-apart-from-parentage.md):
a parent-child line now represents declared shared work, not parentage alone.
Indentation still conveys parentage. The direct explicit sibling-link policy
is not replaced by this proposal.

That older concept includes human-requested design. The supersession requires
human review, not a silent rewrite: the human owner accepted it on 2026-10-27
in the maintainer review of oats-knowledge#166, and the Desktop concept now
records that it is partially superseded. Its decorative-line rationale depended on
indentation conveying the same information as the line; it cannot simply be
carried over when the line is the only visible shared-work cue. Updating the
Desktop concept's rendering and accessibility judgment belongs to that node's
owner. This decision does not select new contrast, spoken-word or row-order
rules, nor alter the existing roster or palette ordering decisions.

# Evidence and limits

Evidence: OKF proposal from oats-maintainer/polaris-oats-maintainer-desktop, 2026-10-27; notes/sidebar-grouping-is-declared-not-inferred.md.

The proposal and captured note report the product owner's dated direction and
rejected alternatives. The proposal additionally supplies the parent-binding
and no-label requirements and reports contract agreement on
[awebai/oats#1577](https://github.com/awebai/oats/issues/1577), identifying
comment 6441606665. The note's header still says that contract agreement is
pending. Preserve the direction without treating those accounts as independent
proof of finalized contract status, implementation, release or live client
behavior; this harvest did not audit the external discussion.
