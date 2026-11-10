---
type: Lesson
title: Test feasibility before committing to a plan
description: Use bounded, authorized CI spikes to settle feasibility disagreements and recheck inherited limitations before planning hardware, rental or recurring manual work around them.
about: [workstream/coordination]
kind: lesson
id: ins-530f27cf29a4
tags: [coordination, feasibility, ci, experiments]
timestamp: 2026-10-15
---
# Judgment before recommendation

When two owning experts disagree about a fact of feasibility, and the
repository's CI can answer it in one session, the generalist should request
a bounded spike before recommending either position. Reading a configuration
correctly does not establish all its consequences. Another recommendation
based on the same reading adds agreement, not independent evidence.

This applies to a testable packaging, build or integration claim, not to a
preference or a product-direction decision that green CI cannot decide. The
experiment must exercise the disputed consequence; an unrelated green suite
does not settle the disagreement.

# Trace inherited limitations before planning spend

The 2026-10-14 finding extends this judgment to a case with no disagreement:
everyone inherits the same claim. Before a plan buys hardware, rents machines
or retains recurring manual work because a comment, skipped CI step or docs
sentence says CI cannot do something, trace that claim to the observations
behind it. Record their dates and how many independent attempts they represent.
Several files repeating one observation do not make several observations.

A single old observation with no known retry is a feasibility question, not
proof of a permanent constraint or proof that the claim is false. When a
bounded CI experiment can answer it, request an authorized draft-PR spike
before recommending the costly alternatives. State in the proposal that those
alternatives depend on the spike's result. If the experiment is not authorized
or remains inconclusive, preserve that uncertainty; an unrun spike is not
permission to remove a safety gate or presume that hardware is unnecessary.

Use the same experiment bounds below. If later evidence changes the limit,
correct the inherited rationale and carry the tested behavior into appropriate
CI coverage, rather than leaving contradictory comments for the next plan.
That eliminates stale technical advice; the remaining planning judgment is
recognizing when its evidential basis needs rechecking.

# Keep the experiment separate from delivery

The source reports that these bounds made a spike cheap for the maintainer
to authorize during a freeze on new surfaces:

- a draft PR, never marked ready and with no review requested;
- few pushes and a one-session time box;
- closure without merging, with the result posted in the decision record.

Those are terms to propose, not a standing freeze exception or permission to
skip implementation review. Obtain the applicable authorization before running
the spike. [Green gates do not lift a hold](/nodes/oats-maintainer/stewardship/review-protocol.md#green-gates-do-not-lift-a-hold-2026-09-19).

Where the experiment exposes a repeatable failure, carry its useful assertion
into a regression check when implementing the chosen design. A permanent
check can eliminate that failure; it cannot decide when competing expert
judgments warrant an experiment. This lesson preserves that coordination
judgment, not a substitute for tests or a new release procedure.

Related checks apply the same stance to different decisions: [establish the
cause before changing a restore baseline](/nodes/oats-expert/lessons/control-before-changing-a-restore-baseline.md),
and [inspect the producer before declaring a client limitation permanent](/nodes/oats-expert/lessons/inspect-the-producer-before-making-an-exception-permanent.md).
Neither is a reason to duplicate this lesson's draft-spike procedure.

When no owners disagree but the lead has an untested preference,
[compare that leaning with alternatives before specifying it](/nodes/oats-expert/lessons/compare-a-leaning-with-alternatives-before-specifying.md).
That lesson owns the common state-preservation and interruption comparison,
not this bounded draft-PR process for settling a feasibility claim.

When the leaning is the human's, in the form of a named UI framework for a
terminal client,
[separate the chrome from the live pane and name the gating spikes](/nodes/oats-expert/lessons/framework-request-is-ergonomics-separate-chrome-from-live-pane.md)
before committing to the framework.

# Evidence and limits

Evidence: OKF proposal from oats-expert/oats-expert-tui, 2026-10-09;
notes/spike-settled-extraction-first.md.

In the [terminal-client planning](https://github.com/awebai/oats/issues/855),
the release lane preferred extracting shared readers first. The Desktop
expert and generalist initially recommended importing in place, believing
extraction required additional build or dependency machinery. The source
reports that the [unmerged draft spike](https://github.com/awebai/oats/pull/857)
passed installer and Desktop CI checks without that machinery. Both positions
then converged on extraction first, removing the import-in-place alternative
from the plan. The generalist offered the spike only after pushback; the
lesson corrects its own premature recommendation.

These results are source-reported, not independently rerun by this harvest.
They support the tested feasibility conclusion, not shipped status or blanket
release readiness. The technical choice and its limitations have one canonical
home in [shared-code packaging](/nodes/oats-desktop-expert/decisions/shared-code-keeps-one-relative-path.md).

Evidence: OKF proposal from oats-expert/oats-expert-qa-rigs, 2026-10-14;
notes/macos-launch-claim-single-observation.md.

In the [QA-rigs proposal](https://github.com/awebai/oats/issues/1145), the source
reports tracing the hosted-macOS launch limitation repeated in two workflows
and release guidance to one failed launch recorded on 2026-07-24. Its issue
and PR search found no later retry; that is the search's reported result, not
proof that none occurred. The limitation was the reason dedicated or rented
hardware entered the options, so the source recommended a spike first.

The macOS spike had not run in this evidence. This harvest did not repeat the
history search or establish that hosted macOS can launch the packaged window;
the lesson is the planning method, not a platform verdict or authorization to
experiment. The accepted [Linux packaged-shell observation](/nodes/oats-desktop-expert/lessons/verification-judgment-for-privileged-surfaces.md#linux-can-exercise-the-packaged-shell-in-ci)
is a related precedent, not evidence about macOS. Platform verification results
remain in the Desktop owner's node; none is added here.
