---
type: Lesson
title: Compare a code-reading leaning with alternatives before specifying it
description: Before a risky implementation assumption becomes a spec, compare the lead's preferred approach with plausible alternatives under the same state-preservation and interruption checks.
about: [workstream/coordination]
kind: lesson
id: ins-b5a2e9649b75
tags: [planning, experiments, alternatives, user-state]
timestamp: 2026-10-14
---
# A written leaning is not a tested choice

A lead's notes can turn an inference from code and documentation into an
apparent decision before anyone has exercised it. For a risky operation,
especially one that temporarily hands user-owned state to another program,
a spike should compare the preferred approach with plausible alternatives,
not merely demonstrate that the preferred approach runs. An alternative
provides evidence that a confirming happy path cannot.

Use the same checks for each candidate. Record the user-owned state before
and after, compare stable readable state byte for byte where appropriate,
and observe the actual user-facing result. For a terminal handoff, relevant
state includes terminal modes and the multiplexer’s sessions, options and
key bindings; a successful child exit alone cannot establish preservation.
Include repeated actions and the interruption paths relevant to the
contract. State explicitly which paths and environments remain untested,
rather than letting a promising result become blanket approval.

Correct the leaning where it was recorded as well as in the eventual spec,
so the rejected approach does not remain advice for the next reader.

# What this adds to the existing experiment lessons

[Test feasibility before committing to a plan](/nodes/oats-expert/lessons/test-feasibility-before-choosing-between-owners.md)
addresses testable feasibility disputes and inherited CI limitations. Here
the assumption belongs to the lead itself, and
the important evidence may be state restoration or a visible interaction,
not CI. Its distinct check is a comparison of alternatives under common
observations before the spec fixes the choice. It grants no authorization
to experiment on an operator's live environment.

If a state comparison fails, [establish the cause before changing the
baseline](/nodes/oats-expert/lessons/control-before-changing-a-restore-baseline.md).
Do not weaken a comparison to make the favored candidate pass. The kernel's
[terminal signal-lifetime lesson](/nodes/oats-kernel-expert/lessons/terminal-child-signal-gaps.md)
owns the wrapper-lifetime rationale; this lesson does not restate its
implementation policy.

[Registry population coverage](/nodes/oats-expert/lessons/registry-population-needs-user-path-coverage.md)
is a distinct application: an apparently complete set of explicit writers
can still miss a user path, while an unmeasured cost assumption rules out
automatic population too early.

[Asking whether children follow when moving tree rows](/nodes/oats-expert/lessons/ask-whether-children-follow-when-hiding-tree-rows.md)
addresses a different uncertainty: an experiment can compare implementation
outcomes, but cannot select the human's intended descendant placement.

For performance work, [profile the read's waits before designing concurrency](/nodes/oats-expert/lessons/profile-read-waits-before-designing-concurrency.md).
Comparing candidates can show which is faster without identifying the cost
that the proposed architecture should address.

# Elimination route

Implement state ownership and restoration in the responsible boundary, and
carry the distinguishing cases into executable integration or regression
tests, including supported interruptions. Real-tool fixtures should protect
the observed state invariants; visual checks remain scoped to the tested
environment. Specification guidance should ask which alternatives were
compared and what remains unproved. A remembered successful spike is not a
substitute for those tests or permission to skip implementation review.

# Evidence and limits

Evidence: OKF proposal from oats-expert/polaris-oats-expert-tui, harvested
2026-10-14; notes/spike-open-here-lend-the-terminal.md;
notes/detach-key-interface-for-the-tui.md.

The source's 2026-10-13 spike in the
[terminal-client effort](https://github.com/awebai/oats/issues/855) compared
three terminal-handoff approaches using the real kernel and two private tmux
servers. Its earlier code-reading preference for retaining raw mode failed
both visible-output and post-interruption state checks. The existing suspend
path alone could end the TUI while its viewer still held the terminal. The
third candidate, a cooked handoff with QUIT handled while lent, passed the
reported checks and displaced the earlier preference.

These results were not rerun by this harvest. The note explicitly leaves
INT/TERM/HUP while lent for later testing, and excludes SIGKILL of the
viewer, resize while lent, remote routing, macOS and a real terminal
emulator. The third candidate therefore won this bounded comparison, not
universal terminal acceptance. Preserve the investigation lesson, not a
current implementation recipe or a claim that comparing alternatives
always costs the same as testing one.
