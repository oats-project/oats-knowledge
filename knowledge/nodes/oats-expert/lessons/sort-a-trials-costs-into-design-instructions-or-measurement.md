---
type: Lesson
title: Before attributing a coordination trial's cost to a design, sort each cost into the design, the trial's instructions or its measurement
description: In the T7 v2 paired trial most of the redesign arm's lost time came from ceremony the trial built in (standing label-woken gates, a separate gated knowledge path, human approvals restated on the forge) and from the measurement (a time cap, an idle-end rule, a mail-only human seat blind to needs-input), not from fresh experts or hand-offs as such; a lead comparing designs names the cause of each cost before reading it as a verdict, and a gate's cost, like its value, depends on whether it runs as a standing station or as a call.
about: [workstream/coordination]
kind: lesson
id: ins-f54329195fc3
tags: [coordination, trials, gates, measurement, evaluation, ceremony]
timestamp: 2026-11-09
---
# The design, its instructions, or the ruler

A trial arm that loses on time and checks has not necessarily shown that its
design is worse. The source's reading of T7 v2 found three distinct causes
behind the redesign arm's slowness, and attributing all of it to "fresh
experts with hand-offs" would have led to the wrong conclusion twice: it
would have rejected fresh experts, and it would have kept stations whose
whole job a call does.

Before reading a cost as a verdict on the design, put it in one of three
bins:

1. **The design's own friction.** Each hand-off costs a wake and a fresh
   instance reading its node. In the source's account this part was small.
2. **The trial's instructions**, fixable by better coordination text
   without changing the design. In T7 v2 this was most of the loss:
   - standing merge gates per lane, woken by a label and handing back by a
     label, which lost relabels, removed their own, and needed eleven manual
     respawns; the review bot had already read every PR, so the gate re-read
     agreed work;
   - a separate, gated path for knowledge PRs, where four of the arm's five
     knowledge changes sat open for two days while the other arm updated its
     conventions inside feature PRs; the cost sat in how the trial woke and
     released that path, not in reviewing knowledge apart from code, so the
     accepted [custody decision](/nodes/oats-maintainer/decisions/external-knowledge-custody.md)
     that learning never rides the work branch, and maintainer review of
     knowledge PRs, stand;
   - a human's approval restated on the forge after it had been given by
     mail, demanded by the bot and quoted by the gate "for the record";
   - cross-lane notices and an expert-to-developer split on small changes,
     each one more message or hand-off with no answer expected.
3. **The measurement.** A 180-minute cap and a "done plus fifteen idle
   minutes" end rule scored slowness as failure on items that finished, or
   were right, later; the human seat read only mail, so a needs-input flag
   that a real human would see in the Desktop or `oats status` reached
   nobody; the kit's operator acts stood in for a human who would not have
   been needed under the corrected instructions.

Only what is left in the first bin is evidence about the design. The
second bin becomes coordination text; the third bin becomes a change to the
next trial's contract. For capped items, re-run the checks on the final
state before counting them as failures.

# What earned its place, and the station-versus-call distinction

The same sorting names what the ceremony hid: a front door that caught an
already-shipped release before anything launched, cards with a
recommendation that got one-word answers and fixed findings, fresh review,
the effort record with its deciders, and area ownership of decisions. None
of these needs a standing seat in the merge path.

This refines
[evaluating gates beyond code-seed catches](/nodes/oats-expert/lessons/evaluate-gates-beyond-code-seed-catches.md):
a gate's value is not its catches alone, and neither is its cost. The same
review, run as a call to a fresh reviewer at an exact head with the verdict
returned by mail
([hand-offs by message](/nodes/oats-expert/lessons/send-a-hand-off-by-message-to-every-waiter-at-an-exact-head.md)),
does the gate's review job without the hours a label-driven station spent
waiting to be woken and released. A trial that measures "gate or no gate"
without separating how the gate is run confounds the duty with the
ceremony. The [re-ask audit](/nodes/oats-expert/lessons/evaluate-gates-beyond-code-seed-catches.md#count-re-asks-separately-from-new-decisions-2026-11-06)
is one instrument for the second bin; this lesson adds the sorting itself
and the measurement bin.

# Evidence and limits

Evidence: OKF proposal from oats-expert/oats-expert-coordination-rethink,
2026-11-09;
notes/t7-the-redesign-arm-carried-ceremony-that-made-its-friction.md;
notes/handoffs-go-to-a-role-by-message-at-a-head.md.

The source reports the T7 v2 blind paired trial of 2026-11-06 to 09 in
scratch deployments: sixteen tasks run on both arms, oracle checks 142 of
156 for the generalist arm against 126 of 156 for the redesign arm, slot
time about 24 hours against about 41, the redesign arm hitting the cap five
times, and the label hand-backs costing one incident effort about 3.5 hours
and one feature effort about 56 minutes. The sorting itself is the source's
judgment after the human remarked that some of the friction came from
theatre added for the trial; which ceremony to drop is that human's and the
maintainer's decision, recorded in the maintainer's node when accepted, not
here. The trial was stopped at slot 32 of 34 and its records deleted at the
human's request, so the figures survive only in the named notes; one run
per arm and task; the blind judge never ran. No kit, transcript or forge
record was inspected and no trial was repeated. The figures are
source-reported trial accounting, not measured effects of any single
ceremony item.
