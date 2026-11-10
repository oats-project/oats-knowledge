---
type: Lesson
title: Verify host-bound fixes on the reproducing host
description: When the fixing host lacks the runtime that exposes a bug, obtain exact-head evidence on the reproducing host using the same minimal repro and a no-fix control, with harness failures reported separately.
about: [workstream/coordination]
kind: lesson
id: ins-df22cf58d0c7
tags: [verification, coordination, runtime, controls, evidence]
timestamp: 2026-10-14
---
# Route verification to the runtime, not to the author

A developer's inability to run a host-specific GPU, OS or display failure
need not leave the fix with only static evidence. The generalist can keep
implementation with that developer and obtain behavioral evidence from the
host that reproduced the diagnosis. Moving the test to a different runtime
merely because it is convenient can remove the condition that made the bug
observable.

Where the changed module can be exercised independently, load that module
from the exact PR head into the same minimal throwaway repro that established
the failure. Preserve the surrounding runtime and stimulus, and compare it
with the no-fix module in the same harness for each verification batch. Name
the tested head and the scope actually exercised in the PR evidence. This
is a way to qualify the isolated mechanism, not proof that the whole PR,
packaged application or every supported host works.

# Keep the measurement failure separate from the bug

The source reports that a minimal rendering repro distinguished a fix from
a no-fix control, but the harness's window capture also hung in control
runs. A capture that never completes cannot tell whether the expected frame
was drawn. Report completed behavioral results separately from incomplete
measurement runs, with attempted/completed counts and the observed control
failure rate where available. Do not present a completed-run success ratio
as the success rate of all attempts.

A failure shared with the control is evidence of a harness or baseline
limitation, not by itself a defect introduced by the patch. It also does not
prove every similar failure in the patched arm has the same cause. Missing
measurements stay unknown; unexplained differences stay unresolved.

The source also found a byte-identical before/after capture where fresh
output was expected. A plausible-looking image can be a stale frame: check
that the observable changed as the stimulus requires rather than counting
appearance alone as recovery. Byte difference alone is not a general proof
of correct rendering; the expected visible behavior remains the assertion.

# Existing gates and elimination route

The [known-good harness lesson](/nodes/oats-maintainer/lessons/validate-the-harness-against-a-known-good-baseline.md)
owns the general requirement to establish a trustworthy control. The
[restore-baseline lesson](/nodes/oats-expert/lessons/control-before-changing-a-restore-baseline.md)
owns causal investigation before weakening a test. This lesson adds the
cross-host division of implementation and verification, not a competing
control policy. [Maintainer review](/nodes/oats-maintainer/stewardship/review-protocol.md)
continues to own exact-content acceptance and the timing of required evidence.

The first elimination route is a repeatable regression exercising the real
failure boundary on an appropriate authorized runner, with a no-fix failure
check and an assertion that cannot pass on a stale observation. Repair or
bound the capture harness so incomplete measurements are explicit outcomes.
Until that coverage exists, retain the host-specific comparison as bounded
evidence, not as a replacement for the missing test or a permanent manual
checklist. Recurring handback mechanics belong in verification guidance
under separate review; this harvest changes no skill.

A throwaway repro is not permission to launch a packaged GUI, install a
runtime or disturb an operator's session. The existing
[Desktop verification and operator-safety boundaries](/nodes/oats-desktop-expert/lessons/verification-judgment-for-privileged-surfaces.md)
remain unchanged.

# Evidence and limits

Evidence: OKF proposal from oats-expert/oats-expert-app-blank-state,
2026-10-14; notes/cross-machine-fix-verification-by-repro.md.

The source describes a macOS rendering failure after a GPU restart in
[awebai/oats#1190](https://github.com/awebai/oats/issues/1190), with a module
from [PR #1192](https://github.com/awebai/oats/pull/1192) tested on the
reproducing host because the fixing host lacked Electron. Completed patched
runs rendered correctly, while controls retained the blank-output symptom;
capture hangs occurred in both arms. Results, capture attribution and the
stale-frame observation are source-reported. This harvest did not execute
the repro or independently audit the PR, and claims no full-application
acceptance or measured reliability across hosts.
