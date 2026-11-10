---
type: Lesson
title: Continuous triggers must account for every input
description: When specifying a trigger driven by observed state, derive scope from the producer's authoritative field and account for every triggering input even when the completed run omits it.
about: [workstream/coordination]
kind: lesson
id: ins-893889387644
tags: [planning, verification, triggers, integration, scope]
timestamp: 2026-10-27
---
# Single flight and a time floor do not settle an input

For a trigger that starts work whenever an observed row remains in a given
state, enumerate every input that can start a run. For each, ask what stops
the same observation from triggering again if the completed run never names
it. A result-based settlement rule can be internally correct yet incomplete:
the unmentioned input remains eligible forever. Single flight prevents
concurrent runs and a time floor slows them; neither explains why the next
run should happen.

The session-resume client review exposed this gap after the lead's spec and
verification had checked all three of single flight, the floor and
settlement from returned rows. A remote lost row was outside the local
sweep's answer, and a local row in a skipped deployment could also be
absent. Each could retrigger after every floor interval while its observed
state remained unchanged. The defect was in the relationship between the
trigger's input set and the run's answer set, not a lack of throttling.

# Review the input-to-disposition mapping

- **Establish scope from the producer's contract.** Use the field and
  association that actually distinguish local from remote inputs. Looking
  for convenient keys that the row never carries cannot establish locality.
  Exercise producer-shaped rows, including their containing deployment
  association, rather than simplified fixtures invented by the consumer.
- **Account for the triggering set, not just returned rows.** On completion,
  every input that caused the run needs a disposition, including skipped or
  unmentioned inputs. The absence of a row from the answer must not alone
  make the same observation a new trigger. Settlement here means accounting
  for the observation, not claiming the requested action succeeded.
- **Keep the no-answer cases explicit in verification.** Include out-of-scope
  inputs, skipped in-scope deployments and an answer omitting a triggering
  row; then feed the unchanged observation again after the time floor. Also
  preserve a positive case for genuinely new eligible input so suppressing
  every later run cannot pass as a fix.

This is a generalist specification and verification question, not a second
resume policy. It does not prescribe permanent suppression, a new retry
policy, remote-start authority or kernel loss-judgment semantics. Those
belong to the owning contracts. It extends the evidence sought when
[running a consumer spec against its built producer](run-consumer-spec-against-built-producer.md),
which already owns composition and producer-shape verification.

# Elimination route

Put scope selection and input disposition in one testable trigger
composition, reusing the producer's reported associations rather than
recreating locality in each client. Regress repeated observations against
partial and empty answers, along with the eligible positive control.
Specification guidance should require this input accounting before the
review concentrates on debounce and concurrency. The durable lesson is why
the earlier review checklist missed the loop; the exact keys, intervals and
settlement data structure belong in code and tests.

For presentation changes, the Desktop lesson on
[tracing control inputs before removing suppression](/nodes/oats-desktop-expert/lessons/verification-judgment-for-privileged-surfaces.md#presentation-removal-includes-reader-states-and-suppression-bookkeeping)
asks a different question: which copy of an answer controls re-running.
An unfiltered answer can still omit an input, so that trace does not replace
this input-to-answer coverage check.

# Evidence and limits

Evidence: OKF proposal from oats-expert/oats-expert-session-resume,
2026-10-27; notes/continuous-trigger-settles-every-input.md.

The source identifies the lane maintainer's return on
[awebai/oats#1564](https://github.com/awebai/oats/pull/1564) at `88d919b1`.
Its note supports both the missing producer-scope association and the
unmentioned-input loop. The repair was in progress at capture. This is one
source-reported defect and review gap; no fix, regression result, release or
live client behavior was independently verified by this harvest.
