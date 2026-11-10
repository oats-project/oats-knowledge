---
type: Lesson
title: Provider guidance cannot depend on upstream skill pointers
description: A provider must teach its selected slot's minimum loop in its composed guidance because upstream skill pointers do not establish local availability, and an agreed wording-based opt-in must be expressed where that capability is selected.
about: [workstream/provider-integration]
kind: lesson
id: ins-4b6be6ebd10d
tags: [integrations, composition, skills, guidance, testing]
timestamp: 2026-11-03
---

# The missing dependency

The source reports that a messaging integration initially relied on skills
named in upstream team instructions, role descriptions and an extension's
welcome. Those pointers assumed a different skill set from the one OATS
composed. A pointer can be valid upstream yet unusable in a home that was
never given the named skill.

The rejected assumption was that upstream teaching could supply the provider's
essential loop merely by naming a skill. The integration instead carried that
loop in its own inject and skill, and explained that upstream-named skills
might be absent. Repository inspection can show the resulting text; it does
not recover why relying on an upstream pointer was rejected during review.

# Integration judgment

- **Teach the minimum loop for the selected slot in its composed guidance.**
  For messaging, the reported remedy covered reading the presented wake or
  checking pending messages, replying or answering, and returning to the work
  already in progress. This is rationale for self-contained teaching, not a
  second command reference or permission to import every upstream feature.
- **Separate a skill's name from its availability.** Explain that upstream
  team, role or welcome text may name skills absent from this composition;
  point agents to the guidance actually supplied. Do not repair the gap by
  silently adding unrelated upstream skills.
- **Express an already-agreed opt-in in the upstream gate's terms.** Where
  composing a capability is deliberately the feature selection, its own
  guidance must communicate that selection rather than leave a wording-based
  upstream gate ambiguous. In the reported tasks integration, the selected
  capability explicitly stated use of the task system. This does not let
  wording create authorization, membership or readiness, or let a messaging
  capability opt a home into tasks.

The accepted
[messaging/task separation decision](/nodes/oats-maintainer/decisions/messaging-and-task-coordination-are-separate-choices.md)
owns which capability may teach tasks; it is not repeated or changed here.
[Guidance against the real contract](/nodes/integrations-expert/lessons/guidance-names-only-verbs-the-target-cli-exposes.md)
owns command and setting correctness. This lesson concerns a different
failure: correct upstream guidance can still be an unavailable dependency.

# Elimination route

Keep required teaching inside the capability that supplies it. Test the
composed text, including adapted upstream material, for the minimal loop and
for references that require an uncomposed feature; include a composition
without that feature as a negative case. Where an agreed gate is textual,
pin the required declaration in the selected capability's inject and skill.
If upstream offers a structured feature-selection contract, prefer it to
fragile wording. Text assertions prevent regressions in the artifact, not
proof that a model follows it or that a live service accepted the selection.
Residual review should check whether the loop remains complete after adapting
upstream guidance. Skills and executable tests are the prevention surfaces;
this knowledge change edits neither.

# Evidence and limits

Evidence: OKF proposal from integrations-expert/overdue-step-checkpoint-integrations-expert,
2026-11-03; notes/upstream-text-names-skills-the-home-lacks.md.

The capture reports one provider and one change. Its maintainer direction and
cross-maintainer agreement remain source-reported, not independently verified
human acceptance. The description and review comments of
[awebai/oats-aweb#186](https://github.com/awebai/oats-aweb/pull/186), read on
2026-11-03 while open, corroborate the self-contained loop, absent-skill warning
and selected-capability declaration. Tests and implementation were not rerun
by this harvest. The PR explicitly leaves extension-bundled skill filtering
to separate work: this lesson does not certify that filtering is installed in
all homes, that the change shipped, or that the approach was tested across
other providers.
