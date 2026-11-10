---
type: Lesson
title: A cross-client redesign starts with a classified feature inventory and one shared design that each client renders
description: Before drawing anything for two clients, inventory every feature of the existing clients and classify each as essential, useful, nice-to-have or internal plumbing; derive one design from the human's questions and have each client's proposal render that same design, so parity is a ledger and comments on either apply to both; when the proposals become one interactive prototype, both renderers draw only from shared selectors and the build asserts no cut words and the keyboard model in both frames.
about: [workstream/coordination]
kind: lesson
id: ins-92f4a9e9c2b9
tags: [design, redesign, clients, parity, inventory, mockups, prototype, method]
timestamp: 2026-10-27
---
# Taste cannot carry a two-client redesign

A brief that asks for "parity on everything useful, drop the useless"
across two clients (the source's were the Desktop app and the terminal
client) gives the designer two ways to fail. Arguing from taste leaves every
drop contestable and every keep homeless. Letting each client's expert design
its own client first and reconciling later produces two products in one
name, and the reconciliation then has to undo work that is already loved.
The source's brief asked for one product in two bodies.

# Method: inventory, then one design, rendered twice

1. **Inventory before drawing.** List every feature of the existing clients
   and classify each as **essential**, **useful**, **nice-to-have** or
   **internal plumbing** (operator and deployment machinery that reached the
   user surface by accident). Each item then has a disposition with a reason:
   a primary surface, Settings, or dropped. In the source's inventory a large
   share of the Desktop surface turned out to be operator plumbing; the
   classification, not an argument, is what made dropping it uncontested.
2. **One design, from the human's questions.** Derive a single design
   (vocabulary, shell, screens, keys) from the questions the human asks of
   the product, and reconcile it there with the lane's recorded decisions,
   naming every supersession in the shared design rather than in one
   client's proposal. The recorded Desktop decisions may pull in a different
   direction from the brief; the shared design is where that is settled.
3. **Each client renders the same design.** Each client's proposal is a
   rendering of the shared design, so the two proposals differ only in
   rendering, which is what the human is choosing between. A comment on one
   applies to both, halving the comment surface, and parity is a ledger
   against the inventory rather than a hope.

# Two production lessons from the mockups

- **Terminal mockups come from a bounds-checked cell buffer.** Generate them
  from a buffer that refuses a string overflowing its cell range, so "no cut
  words" is a build error rather than a review item. A misaligned terminal
  mock is the first thing a reader notices and discredits the rest.
- **One sample-data table for every screen.** Titles, roles, states and
  times come from one shared table, so screens agree with each other.
  Inventing data per screen produces contradictions a careful reader finds.

Both are the elimination route for their own class of defect: the check
lives in the mockup generator, not in a reviewer's eye.

# When the mockups become one prototype: one state, two renderers

Once the two renderings are side by side in one interactive prototype (the
source's second round had a DOM frame for the Desktop client and a cell-grid
frame for the terminal client, driven by the same tour of states), the
parity ledger becomes a property of the code and can be enforced:

- **Every fact a renderer needs comes from a shared selector**, never from
  raw state. Hints for the current screen, the context card, the home
  model, palette rows and settings items are each one function both
  renderers call; the renderers only draw. The source reports that the two
  frames drifted *only* where a renderer had read raw state instead of a
  selector, so a drift is a missing selector, and the fix is to add one,
  not to patch the frame that disagrees.
- **"No cut words" is asserted at build time in both frames**, not only in
  the cell grid. The grid keeps the bounds-checked buffer that throws; the
  DOM frame gets a headless pass that fails on any leaf text outside its
  pane box. The source's build-gate pass found six overflows in the
  terminal frame's narrow mode that the eye had missed across review
  rounds; the narrow mode is where fixed intros and legends overflow first,
  so intros wrap and legends are gated on available width.
- **The keyboard model runs end to end in Node.** A synthetic-key scenario
  walks the whole key model against the shared state, with no browser. It
  found a title bug (a first clause split on a version number) that no
  visual check had caught.

The frame assertions and the key scenario are the elimination route for
the prototype's own defects, in the same sense as the bounds-checked buffer
above: the cost is one build script, and the alternative is a human reading
over a hundred frames for a cut word.

# Rejected

- Each client's expert designing its own client first, then reconciling:
  the brief asked for one product in two bodies, and the reconciliation with the
  lane's recorded decisions has to happen once, in the shared design, with
  supersessions named.

# How this relates to neighbouring lessons

A redesign that touches a decided-and-parked direction resumes it;
[ask the lane's maintainer for the record of the brief's subject](/nodes/oats-expert/lessons/ask-for-the-record-of-the-briefs-subject-before-designing.md)
is the step before this method. The quality bar and the rule that a mockup's
typography for a terminal region is not a spec for the live terminal belong
to the Desktop expert's
[design direction](/nodes/oats-desktop-expert/decisions/design-direction-and-quality-bar.md);
this lesson is the lead's method for structuring the effort, not a design
authority over either client.

# Evidence and limits

Evidence: OKF proposal from oats-expert/ui-ux-redesign-expert, 2026-10-26;
notes/redesign-method-inventory-then-shared-design.md. The one-state,
two-renderers section: OKF proposal from oats-expert/ui-ux-redesign-expert,
2026-10-27; notes/prototype-one-state-two-renderers.md;
notes/round2-choices.md.

One effort, one human, two clients, source-reported; this harvest did not
read the inventory, the shared design, the published proposals or the
prototype's build script, and the proportion of plumbing found is the
source's figure for one product at one date, not a property of Desktop. The
six overflows and the title bug are the source's counts from one build of
one prototype. The method is what is promoted; the classification labels
are the ones that worked once, not a fixed taxonomy, and the selector names
are the source's, not a required vocabulary.
