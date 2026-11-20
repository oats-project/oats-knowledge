---
type: Decision
title: The Desktop rework's design and UX direction is decided by Joan's side; contracts and landing rules are unchanged
description: For the client redesign built Desktop-first, Joan's side decides design and UX direction without a round with Pepe, also where it supersedes a Desktop design decision Pepe accepted; every contract change still goes to both sides before a build, and each PR still lands by its lane's rules. Since 2026-11-20 the contracts clause is superseded in part: a contract decision for Joan's work, this rework included, no longer waits for Juan's side's half (dec-155756953d6e).
about: [workstream/oats-direction]
id: dec-7d36e6fb3bc1
tags: [desktop, redesign, direction, delegation, contracts, lanes, supersession]
timestamp: 2026-11-20
---
# Decision

On 2026-11-19 the first direction list of Joan's client redesign went to Pepe
through his `lane:product` maintainer, before any build. His answer, given to
that maintainer directly and relayed in its words: "lets agree with Joan on
all. And lets give him full freedom".

Two things were decided.

**The five items asked.** Each is now accepted direction for the Desktop:

- Chrome uses the system sans; monospace appears only in terminals. This
  supersedes the second half of
  [Desktop chrome uses sans names and role-based type hierarchy](/nodes/oats-desktop-expert/decisions/chrome-typography-follows-information-role.md),
  which kept monospace for secondary machine strings.
- "agent" replaces "instance" on the primary surface; "soul" and
  "capability" stay. This supersedes
  [Desktop copy names a soul's instances and instruction injection](/nodes/oats-desktop-expert/decisions/desktop-copy-names-instances-and-injection.md)
  for Desktop's primary surface. The CLI and the docs keep "instance", so
  the Desktop copy needs one place that maps the two words.
- No relation picker at spawn: a human's spawn is top-level.
- Ctrl+Space is the default leader and Ctrl+X stays selectable. The
  collision review of
  [keyboard policy follows actions and user intent](/nodes/oats-desktop-expert/lessons/keyboard-focus-and-action-ownership.md)
  still applies to it.
- A same-work group is shown by indentation and spacing, with no lineage
  lines. This supersedes the line cues of
  [Explicit sibling links are shown on both ends and apart from parentage](/nodes/oats-desktop-expert/decisions/sibling-relations-are-shown-apart-from-parentage.md).
  It also supersedes in part
  [Parent-child lines require declared shared work](/nodes/oats-maintainer/decisions/parent-child-lines-require-declared-shared-work.md)
  (`dec-97cfed58e463`), which made a parent-child line the only visible
  mark of declared shared work: that rendering no longer holds for the
  Desktop. The declaration itself, its binding to the parent and the rule
  that capabilities own the coordination policy are unchanged.

Each superseded concept now carries a note naming this decision.

**The standing delegation.** For this rework, Joan's side decides design and
UX direction, the later slices included, without bringing each item to Pepe,
also where an item supersedes a Desktop design decision Pepe accepted. The
lead records each such item in the spec with the decision it supersedes and
the words above. The maintainer of Joan's `lane:product` seat does not route
them to Pepe's side first.

# What it does not change

- **Contracts.** A kernel option, a JSON field the Desktop reads or a new
  command is decided by Pepe's side and Juan's side together before it is
  built. A design the delegation covers may not assume a kernel fact that
  does not exist: that fact is a contract proposal of its own.
  **Superseded in part (2026-11-20):** for Joan's work, this rework
  included, a contract decision no longer waits for Juan's side's half.
  Pepe's side's yes decides and Juan's side is told; see
  [Joan's bb effort is pre-approved on Pepe's side](/nodes/oats-maintainer/decisions/joans-bb-effort-is-pre-approved-on-pepes-side.md)
  (`dec-155756953d6e`), widened that day on Pepe's word. A contract is still
  decided before it is built.
- **Landing rules.** Every PR of the rework still needs the green light of
  Joan's `lane:product` maintainer and the release lane's sign-off at the
  head being merged.
- **One shared design.** The same day Joan decided to build the Desktop
  rendering first, in stages, replacing the earlier "both renderings in
  lockstep" order. The spec stays one design that the Terminal UI renders
  later, as
  [a cross-client redesign starts with one shared design](/nodes/oats-expert/lessons/inventory-then-one-shared-design-for-a-cross-client-redesign.md)
  asks.

# Alternatives rejected

- **Each superseding item goes to Pepe as it comes up.** This was the
  default, since superseding a decision a person accepted needs that
  person's own words. Pepe replaced it with one standing answer for this
  rework.
- **Treating the delegation as covering contracts.** Rejected by Pepe's own
  maintainer when it recorded the answer: contract changes keep their
  two-sided decision.

# A check to keep

The design guide named fewer supersessions than it carried, labelled one
item as already agreed by a lane that had no record of it, and assumed key
bindings and kernel facts that the main branch did not have. Before a design
document's decision list goes to whoever decides, its lead checks each item
against the recorded decisions and the main branch, and says which decision
each one changes.

# Acceptance

Pepe's acceptance is **source-reported**: given on 2026-11-19 to his
`lane:product` maintainer and relayed by it to the maintainer of Joan's
`lane:product` seat, outside GitHub. No public record of it was cited or
found, so it is the source's report, not a verified record or the human's
own words. The superseded Desktop decisions carried product-owner
acceptance; this answer is the acceptance that supersedes them.

Evidence: OKF proposal from oats-maintainer/joan-product-maintainer, 2026-11-19; notes/desktop-rework-direction.md.
Maintainer review of oats-knowledge#401 (2026-11-19) recorded the
acceptance as source-reported, added the partial supersession of
`dec-97cfed58e463` that dropping lineage lines implies, and marked the four
superseded concepts in place.
