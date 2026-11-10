---
type: Decision
title: Report-only prompt recognition may use derived labels
description: A recogniser that cannot send input may match derived whole option labels together, because a false waiting report has a different consequence from an unwanted keystroke.
about: [system/oats-kernel]
id: dec-d34ed90c500d
tags: [kernel, launch, prompts, evidence, input-safety]
timestamp: 2026-10-27
---
# Decision and rationale

A launch-prompt recogniser that **only reports and never sends a key** may
match whole option labels appearing together, using strings derived from the
harness rather than a captured screen. Keep it structurally separate from
input-gating entries: its input is `none`, its provenance is `derived`, and
loading it must refuse selection or input instructions.

An entry that gates a keystroke still requires exact full-screen equality
against a real capture. The distinction follows the consequence of a false
match: a report-only entry can produce a wrong waiting diagnosis; an
input-gating entry can send an unwanted keystroke. The weaker match is
acceptable only while the no-input boundary is enforced, not merely promised
by the current caller.

The motivating case was Claude's resume-cost dialog. The source could not
capture it, but reports deriving its option strings from the Claude Code
2.1.308 binary and documentation. Recognition can report a blocked resume;
it does not authorize choosing an option or bypassing the dialog. This
mechanism does not establish that a harness's resume selector works.

# Rejected alternatives

- **Label invented text as a capture.** That would misstate the evidence.
- **Require full-screen equality against derived text.** A constructed
  screen would not match the real dialog; apparent strictness would defeat
  recognition without supplying real capture evidence.
- **Omit the recogniser.** That would lose the required blocked-prompt
  diagnosis even though a strictly report-only mechanism is possible.

Replace the derived fixture with a real capture when one becomes available.
Enforce the report-only kind in the loader and dispatch path, and test that
it cannot select or send input. Those are enforcement targets, not claims
that this harvest ran the implementation tests.

# Related and evidence

[Native harness launch](/nodes/oats-kernel-expert/decisions/harness-native-launch.md)
retains native settings and permission choices. The
[recovery decision](/nodes/oats-maintainer/decisions/lost-sessions-resume-locally-in-their-own-conversation.md)
owns recovery policy; this concept owns the recogniser's evidence tradeoff.

Evidence: OKF proposal from oats-kernel-expert/session-resume-kernel-expert,
2026-10-27; notes/decision-report-only-prompt-recogniser-may-match-labels.md.

The source identifies the launch-prompt fixture documentation at `d5443cc3`
and the work tracked by [awebai/oats#1559](https://github.com/awebai/oats/issues/1559).
The binary reading, failed capture attempt and coordinator agreement are
source-reported, not independently repeated or audited here. No real
resume-cost screen, live recogniser accuracy or human acceptance is proved
by this evidence.
