---
type: Lesson
title: Real-terminal waits must prove the state they observe
description: Before trusting a real-terminal content or absence check, establish the intended view and fixture state, account for capture transformations, and wait for a closing transition before sending the next key.
about: [workstream/coordination]
kind: lesson
id: ins-09526ea2b7e9
tags: [testing, terminal, tmux, controls, integration]
timestamp: 2026-10-15
---
# A matching screen is not necessarily the state under test

A real-terminal assertion can pass for the wrong reason or fail only on one
platform or checkout path while the program is correct. Before routing a
fix to the program or weakening the assertion, establish that the capture
shows the intended view and that the fixture still represents the runtime
being tested. For content or absence checks, require positive evidence of
that view in the observation being evaluated. After a key closes a view,
wait for the transition before sending the next key.

This specializes [causal controls before changing a restore baseline](/nodes/oats-expert/lessons/control-before-changing-a-restore-baseline.md):
the added lesson is how terminal capture, runtime fixtures and input timing
can invalidate the observation itself, not another copy of the general
positive-control rule.

# Four ways the observation lied

- **Joined capture changes row boundaries and retains trailing spaces.**
  The source found a prompt comparison that could never match its captured
  trailing space. A separate control using tmux 3.7c, bash and an 80-column
  pane showed that when the typed prompt plus command exactly filled a row
  (or a multiple of the width), `capture-pane -p -J` joined the first output
  line onto it. Neighboring lengths did not. A checkout path can therefore
  change a screen assertion without changing the program. Use unjoined
  capture for prompt checks; use joined capture for wrapped content with
  narrowly justified end trimming. For an output-line check affected by
  this wrap, accept either its own row or the verified suffix of the
  prompt/command row, not an arbitrary substring. Assert exact output bytes
  separately on a pipe when that is the contract.
- **An exited runtime stub leaves a shell.** A stand-in that immediately
  succeeds no longer models a running agent. The client can correctly show
  "shell" while the test expects a live runtime. Use an owned, bounded
  stand-in that remains alive for the observation, with teardown; do not
  change the client's classification to satisfy an inert fixture.
- **An overlay makes row absence vacuously true.** A confirmation view can
  hide the entire list. First establish that the list is visible, then check
  that the target row is absent. Absence from another view proves nothing
  about list membership.
- **Escape followed too soon by another key can be Alt+key.** Sending Escape
  and then `q` inside the parser's escape timeout can arrive as Alt+q, not two
  actions. Wait for the first view to close before continuing. A guessed
  sleep encodes machine timing instead of proving the transition.

These are demonstrated mechanisms to investigate, not an exhaustive list or
permission to blame every platform failure on the harness. The width
observation is scoped to the reported environment; test the relevant capture
behavior rather than assuming all terminal versions share it.

For end-to-end checks through a reusable fixture,
[separate the real proof boundary from fixture isolation](real-proof-boundaries-preserve-fixture-isolation.md):
a real harness does not remove placement stubs, and a private tmux socket
does not remove an inherited messaging principal. That lesson owns the
fixture-boundary audit; this one owns the validity of the observed state.

# Elimination route

Encode view-aware waits and transition barriers in the test harness, and make
fixtures explicitly own their runtime lifetime. Add capture controls with a
typed line one character below, exactly at and one above the pane width,
including prompt length. Preserve a failing case for an absent view or an
overlay so an absence assertion cannot pass without reaching its target.
Use the control result to justify only the specific normalization it proves;
do not loosen every screen assertion until the suite passes.

These are test/harness repairs, not permanent manual steps. The lead's
remaining judgment is to demand evidence that the measuring apparatus reached
the claimed state before treating its result as a product defect. The
[existing live-terminal safety boundary](/nodes/oats-desktop-expert/lessons/verification-judgment-for-privileged-surfaces.md#a-passing-live-terminal-check-can-still-exhaust-the-host)
still applies: reliable assertions do not authorize a live run or replace
bounded output, lifetime and verified teardown.

# Evidence and limits

Evidence: OKF proposal from oats-expert/polaris-oats-expert-tui, 2026-10-15;
notes/real-terminal-waits-must-prove-the-state-they-claim.md;
notes/capture-pane-j-glues-output-onto-a-full-typed-row.md.

The source reports macOS failures in `test/tui-acts.test.mjs` during
[awebai/oats#1212](https://github.com/awebai/oats/pull/1212) resolved by
harness-only changes, and the width-boundary control without the program
under test during [#992](https://github.com/awebai/oats/issues/992). These are
source-reported observations, not experiments rerun by this harvest. The
reported success does not prove that every test or supported platform is
free of other harness defects.
