---
type: Lesson
title: A framework request is about ergonomics, not rendering architecture; separate a terminal client's chrome from its live agent pane
description: A human's "build it with Ink" asks for Claude-Code-like ergonomics, not a renderer; a React-style terminal framework can carry a client's chrome but rebuilds the whole grid per frame, so a live agent pane needs an in-process terminal emulator whatever the chrome, and the honest proposal measures the frame floor and names the gating spikes and packaging decisions instead of promising fidelity.
about: [workstream/coordination]
kind: lesson
id: ins-d56e2175b82e
tags: [terminal, tui, frameworks, feasibility, proposals, spikes, honesty]
timestamp: 2026-10-30
---
# Read the request for what it asks

When a human asks for a terminal client "with Ink" (or any named UI
framework), they are asking for the feel of the tools they like: sidebars,
tabs, overlays, keyboard-first interaction, a client that looks finished.
They are not choosing a rendering architecture, and a lead who answers the
request as if they were either promises what the framework cannot deliver
or refuses a reasonable wish on technical grounds the human did not raise.

The honest answer separates two parts of a terminal client:

- **Chrome** (sidebars, tabs, splits, overlays, key handling, alternate
  screen): a React-style terminal framework handles this as-is, and the
  design can be identical under the framework or under a hand-rolled
  renderer. What changes is cost, dependency weight and the frame budget.
- **The live agent pane**: a terminal inside the client showing another
  program's output at interactive rates. This needs an in-process terminal
  emulator fed by a pseudo-terminal, whatever draws the chrome around it. A
  framework that rebuilds the whole cell grid per frame sets a frame floor
  the pane must live under; a "real multiplexer pane in a hole" is
  impossible because a multiplexer client owns the whole TTY; and polling a
  multiplexer's captured screen (the source's hosting mechanism, as it reported it on 2026-10-26)
  caps fidelity: no scrollback, guessed tab stops, no mouse, slow close
  detection.

# Rule: measure the floor, then name the spikes

Before proposing a framework for a terminal client:

- **measure** the framework's frame cost at the client's realistic grid
  size and its input gaps (mouse, function keys, who owns stdin), and put
  the method in the proposal's appendix so the numbers can be rerun;
- **say what the framework carries and what it does not**: chrome yes, live
  pane only through an emulator, with the fidelity the measured floor
  allows, never "60 fps live terminals" on a per-frame grid rebuild;
- **name the gating spikes** the decision depends on (for the source: a
  framework-plus-emulator pane meeting a p90 echo latency bound, and the
  framework yielding the TTY to a lent terminal) and make the framework
  choice conditional on their results, as
  [test feasibility before committing to a plan](/nodes/oats-expert/lessons/test-feasibility-before-choosing-between-owners.md)
  asks;
- **name the packaging decisions for the maintainer**: a framework and its
  UI library bring a dependency tree into the project's package, and a
  pseudo-terminal binding without prebuilt binaries for a supported platform
  is a release question, not a detail. For the same reason the framework
  choice never appears in a design draft as a "decision for the
  requester": it is a release-lane structural call made before any design
  spec sets, and the draft routes it there
  ([each decision item has an owner](/nodes/oats-expert/lessons/ask-for-the-record-of-the-briefs-subject-before-designing.md)).

# Rejected

- Promising framework-rendered live terminals at full interactive rate: the
  measured frame floor says no.
- A framework with a built-in embedded terminal that requires a different
  runtime or an experimental FFI flag of a very recent Node: it moves the
  client off the kernel's supported runtime.
- Rewriting the client in another language: it leaves the kernel's language
  and shared client packages behind, and the rendering question would still
  be the same.

# How this relates to neighbouring lessons

This is a terminal-client instance of two general lessons:
[compare a leaning with alternatives before specifying it](/nodes/oats-expert/lessons/compare-a-leaning-with-alternatives-before-specifying.md)
(here the human's leaning, not the lead's) and
[test feasibility before committing to a plan](/nodes/oats-expert/lessons/test-feasibility-before-choosing-between-owners.md).
The terminal client's product boundary and the rendering architecture it
finally adopts are its owners' decisions, not this lesson's. The accepted
product decision is
[one standalone Desktop product](/nodes/oats-desktop-expert/decisions/standalone-product-and-cli-authority.md);
its [terminal-client exception](/nodes/oats-desktop-expert/decisions/standalone-product-and-cli-authority.md#terminal-client-exception-2026-10-09)
answers whether a terminal client is permitted as a product beside it, and
this lesson does not. This lesson is the lead's way of answering the request,
not either decision.

# Evidence and limits

Evidence: OKF proposal from oats-expert/ui-ux-redesign-expert, 2026-10-26;
notes/ink-chrome-yes-terminal-pane-no.md. The routing of the framework
choice to the release lane rather than the requester:
notes/supersession-each-goes-to-its-human.md, same proposal and date.

The source reports measurements by its research subagent on one machine with
Ink 8.0.0: roughly 10 ms per frame typical and roughly 30 ms worst at a
200×50 grid, a 30 fps default, no mouse or function-key input, and the
framework owning stdin; and that the pseudo-terminal binding it evaluated
shipped no Linux prebuilt binaries in the version read. None of this was
rerun by this harvest, the research reports and the published proposals were
not read, and the numbers describe one framework version on one machine.
The lesson is the method for answering a framework request; the spikes it
names had not run in this evidence, and no terminal client architecture is
decided here.
