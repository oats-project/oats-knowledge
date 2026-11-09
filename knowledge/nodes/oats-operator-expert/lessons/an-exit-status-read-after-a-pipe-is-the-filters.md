---
type: Lesson
title: An exit status read after a pipe is the filter's, not the tool's
description: Filtering a tool's output through a pipe to keep secrets out of the transcript makes `$?` the filter's status, which reportedly produced a false defect report to another team; when an exit code is evidence, redirect to a file and filter that, or use pipefail or PIPESTATUS, and mark any status read through a pipe as unverified.
tags: [operator, verification, evidence, shell, defect-reports, trials]
timestamp: 2026-11-09
---
# A habit that protects the transcript breaks the evidence

Operators filter command output through `grep` for a good reason: it keeps
tokens, invite codes and other secrets out of the transcript. The side
effect is that `$?` afterwards is the filter's exit status, not the tool's.
The source reports filing a defect with the aweb team that a refusal of
`aw init --global` exited 0; the other team could not reproduce it, because
the tool had refused with a nonzero status and the 0 belonged to `grep`.
The report was retracted the same day, after it had cost another team a
reproduction attempt.

This is a fault-attribution failure of the same family as
[scripted provider checks separate product questions from harness blockers](/nodes/oats-operator-expert/lessons/scripted-provider-checks-separate-product-from-harness.md):
the rig, here the shell pipeline, produced the symptom, and the product
got the blame.

# When an exit code is evidence

Before an exit code goes into a defect report, a trial result or a
"refusal exits 0" claim:

- Send the output to a file and filter the file afterwards
  (`tool > out 2>&1; echo rc=$?; grep -v … out`). The transcript still
  sees only the filtered text, and the status is the tool's.
- Or read `${PIPESTATUS[0]}` (bash) right after the pipeline, or run with
  `set -o pipefail` so a failing tool fails the pipeline.
- Treat any status that was read after `tool | filter` as **unverified**,
  and say so if it is reported at all. Reproduce it with one of the forms
  above before sending it to another team.

# Limits and elimination route

The source observed one such report, against aw 1.36.56 on 2026-11-09;
this harvest did not inspect the original pipeline or the retraction. The
shell semantics are not in doubt; the lesson is the operator's evidence
discipline when secret-filtering and exit-code evidence meet in the same
command.

The elimination route is in the trial drivers and check scripts the
operator already prefers over ad-hoc shell: capture each step's status
separately from its filtered output, and report the two side by side.
A report template that asks how the status was read, and refuses a piped
reading, would make the gap visible before the report leaves the team.

# Evidence

Evidence: OKF proposal from oats-operator-expert/oats-operator-expert-onboarding-vm-campaign,
2026-11-09; notes/exit-status-through-a-pipe-is-the-last-command.md.

The note records the false report, the failed reproduction and the
retraction; the machine name and campaign stage labels are omitted here.
