---
type: Lesson
title: Plan a composed review beyond the capability changing a rule
description: When changing an instruction rule, put a review of neighboring capability text in the spec and route contradictions to their owning repositories rather than treating per-capability approval as composition evidence.
about: [workstream/coordination]
kind: lesson
id: ins-831d5641ed39
tags: [planning, instructions, review, composition, cross-area]
timestamp: 2026-10-28
---
# A locally coherent change can leave the old rule beside it

Per-capability review can establish that each edited package makes sense on
its own while missing an older instruction supplied by a neighboring
capability. The agent receives those instructions together. A rule change
therefore needs a review boundary wider than the capability being edited,
including relevant injects and the skills that teach the same action.

The source reports this gap during an engineering-instruction change:
reviewing the composed expert, developer and maintainer briefings exposed
human-gated spawn guidance still present in core skills. The main change
could have passed its own review while leaving that conflicting guidance
beside it. This is a discovered contradiction and a prospective behavior
risk, not evidence that an agent actually followed the old rule after release.

# Put the composition and the handoff in the spec

When leading an instruction-rule change, name the composed review in the
spec's review loop before implementation. Identify the affected roles and
the neighboring capability sources at exact revisions; do not make a
reviewer guess which moving version of another package was considered.
Have the reviewer read the resulting briefing and relevant skills for
contradictions, not only compare the changed package's old and new text.

The reviewer **reports** a cross-repository contradiction rather than
silently repairing another owner's text. The lead routes a small companion
change to the repository that owns the conflicting guidance and makes the
dependency visible in the effort's handoff. This keeps the finding from
becoming either an out-of-scope reviewer edit or a forgotten follow-up.
It grants no new editing, merge or release authority.

The distinct lesson is early discovery and ownership routing. The existing
[dependent-text planning lesson](/nodes/oats-expert/lessons/soul-text-lands-with-its-capability-pin.md)
owns the landing condition when text depends on a new pin; the maintainer's
[release judgment](/nodes/oats-maintainer/stewardship/release-traps.md)
owns release coordination. A review against an exact source revision alone
does not prove that the deployed pins compose that revision.

# Canonical boundaries and prevention

The kernel's [composed-instructions lesson](/nodes/oats-kernel-expert/lessons/kernel-composed-text-is-executable-surface.md)
already owns the principle that individually defensible blocks can disagree
and the need for composition assertions. Here the generalist's addition is
to specify the cross-capability read and route its findings before the
main change is considered complete. It complements
[condensation review](/nodes/oats-expert/lessons/condensing-instructions-preserves-load-triggers.md):
preserving a rule's words and load coverage is different from checking
whether another capability still teaches a conflicting rule. Within the
text being written, [a nested skill's one stated order and host mapping](/nodes/oats-expert/lessons/a-skill-run-inside-another-states-one-order-mapped-to-the-hosts-steps.md)
prevents the timing contradictions between a skill and the host that
loads it, before a composed review looks across capabilities.

Prefer one capability-owned definition with neutral shared guidance over
independent copies. Composition tests should enforce known ownership and
availability properties at the selected revisions; semantic agreement still
needs review. Put the residual cross-capability review and finding handoff
in the owning specification/review guidance rather than rely indefinitely
on remembering this lesson. No new test, skill change or enforcement is
claimed here. The underlying
[coordination-policy decision](/nodes/oats-maintainer/stewardship/coordination-policy-lives-in-capabilities.md)
remains with its owner; this lesson does not redefine spawn or retirement
policy.

# Evidence and limits

Evidence: OKF proposal from oats-expert/oats-injection-compression-expert,
2026-10-28; notes/composed-check-across-capabilities.md.

The source reports that the spec's composed-review item for
[awebai/oats-engineering#28](https://github.com/awebai/oats-engineering/pull/28)
found two contradictory lines in `oats-operate`, and companion review found
two more in `oats-souls`. It reports their repair in
[awebai/oats#1621](https://github.com/awebai/oats/pull/1621), alongside
[awebai/oats-engineering#29](https://github.com/awebai/oats-engineering/pull/29).
These are evidence pointers, not independent repair or release receipts.
This harvest did not audit those implementations or compose a fresh instance.
The conclusion is limited to one effort involving instruction-text rules;
it establishes neither a measured failure rate nor a universal review
protocol for all cross-repository changes.
