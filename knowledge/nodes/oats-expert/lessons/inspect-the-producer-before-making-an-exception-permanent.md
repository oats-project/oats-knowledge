---
type: Lesson
title: Inspect the producer before making a client limitation a permanent exception
description: Before declaring a rule exception permanent because a client lacks provenance, inspect the producer that combines the sources and determine whether it can preserve the distinction.
about: [workstream/coordination]
kind: lesson
id: ins-f52b0f35d546
tags: [planning, provenance, shared-code, exceptions]
timestamp: 2026-10-12
---
# The client's missing fact is not proof that the fact is unavailable

A client may receive one value that can originate from several sources and
be unable to apply a display or safety rule requiring that distinction.
Before treating the limitation as permanent, have the shared producer's
selection or merge point examined. If it knows which source it chose, it
may be able to carry that fact to the client. Absence of provenance in the
current interface, or of a planned PR to add it, is not proof that provenance
cannot be supplied.

The source reports accepting an unattributed error display with no end
because the client could not distinguish the speakers. Review of the shared
function then found that it already chose between the sources. That turned
an apparently permanent exception into a producer-origin follow-up and a
corresponding consumer change. The lasting error was accepting a local interface
limitation as a system-wide impossibility before looking at the producer.

# Separate feasibility, permission and completion

If the distinction can be preserved, bring that finding to the rule's owner.
Any permitted interim exception should name its limited scope, remaining
safeguards, responsible change owner and observable end condition. A planned
issue or PR is a route to that end, not proof the limitation has ended:
the producer must carry the distinction and the consumer must use it where
required. If the inspection is inconclusive, record that uncertainty rather
than announcing permanence.

Do not infer origin from incidental message text or a generic error code,
and do not copy the producer's selection logic into the client. Preserve
provenance where it is known. This changes how the lead investigates and
presents an exception; it grants no authority to relax a display or safety
rule. The [Desktop attribution rationale](/nodes/oats-desktop-expert/decisions/source-prose-is-an-attributed-quote.md)
remains in its owner's node and is not narrowed here.

The same inspection, done while a brief is still being accepted rather than
after a limitation appears, is [tracing each "done" item to the code that
owns it](/nodes/oats-expert/lessons/trace-done-items-to-owning-code-before-accepting-repo-list.md);
that lesson adds the step of naming the producing repository and owner in
the spec.

# Elimination route

Have the shared owner carry origin through the interface, with tests for
each selection or merge branch. Have the consumer use that origin under the
existing display protections and test removal of the interim treatment.
Those changes eliminate the specific limitation. The reusable judgment is
to inspect the information-producing layer before calling a limitation
permanent, not to store its current field shape or a never-ending exception
in knowledge.

# Evidence and limits

Evidence: OKF proposal from oats-expert/oats-expert-tui, 2026-10-12;
notes/spec-3-inputs.md; notes/spec-2b-draws-from-paneldata.md.

The note's 2026-10-12 entry reports review of the instance-error display in
[awebai/oats#978](https://github.com/awebai/oats/pull/978) and the resulting
origin follow-up [#982](https://github.com/awebai/oats/issues/982). Its earlier
deployment-error discussion is a different exception, not evidence that the
instance-error follow-up shipped. The review finding and agreement are
source-reported; this harvest did not inspect producer code, verify human
acceptance or establish implementation status. No product decision is
superseded by this process lesson.
