---
type: Lesson
title: Condensing instructions must preserve load coverage and deliberate text contracts
description: Map text consumers before setting a compression target, preserve deliberate wording contracts and skill load triggers, and have an independent reader per capability compare the complete original.
tags: [instructions, review, skills, condensation, cross-area]
timestamp: 2026-10-27
---
# Preserved words are not preserved coverage

Moving a rule from an always-loaded inject into a skill changes when the
agent sees it. Calling the move a removed duplicate is justified only if
the destination is loaded in every situation that needs the rule. A rule
can still exist in the package while disappearing from the agent's working
context at precisely the moment it matters.

The source's condensation effort kept a rule list for each capability, yet
independent reviewers found five lost or misplaced rules. The lists had
not omitted the rows: they marked them as kept or duplicate. Among the
reported gaps, release authority disappeared from the path used to tag,
and the solo maintainer's release responsibility moved out of the inject
without a skill that the solo case would load. The defect was the claimed
coverage, not a missing inventory entry.

# Review the situation that loads the rule

For each rule leaving the inject, name the situation that needs it and the
trigger that loads its proposed home. If that path does not load the skill,
keep the rule in the always-loaded text or repair the routing; its presence
somewhere else is not enough. Check exceptions on the same path: wherever a
rule is stated, keep its exception with it so compression does not silently
turn a conditional rule into an absolute one.

Assign an independent reader to each capability being condensed. Have that
reader read the **old text in full** and compare it with the new locations
and triggers, rather than take the condenser's rule list as the review's
source of truth. The list is a useful claim to challenge, not evidence that
the move preserved behavior. This is an instruction-editing check, not a
new requirement for additional reviewers on every kind of PR.

# Establish the text constraints before choosing a size target

The 2026-10-27 refinement adds a second constraint: some pinned sentences
encode earlier decisions, not merely a test's incidental choice of words.
A compression-only effort must not quietly reverse those decisions to meet
a flat percentage target. Establish the retained contracts first, then set
the size target from what can safely move or shrink.

Apply the [affected-test inventory](/nodes/oats-expert/lessons/check-affected-test-inventory-at-handback.md)
before drafting, across the repositories participating in the change.
Include consumers of the composed text as well as the inject itself:
kernel assertions, goldens, client inspect fixtures and capability-package
tests. The source reports that selected kernel checks passed while a
client's embedded briefing fixtures still broke in CI. A fixed filename
list is not a lasting substitute for discovering the current readers.

Distinguish a deliberate wording contract from incidental copied prose.
For the former, keep the pinned words verbatim within a compression-only
change; literal substring assertions can also make a line wrap significant.
Do not weaken the assertion merely to make the shortened text pass. This
does not make every existing text pin permanent policy: the
[client-reading lesson](/nodes/oats-desktop-expert/lessons/kernel-text-tests-own-the-client-reading.md)
already explains why incidental producer-text coupling should be removed.
Changing a deliberate contract is a separate decision for its owner.

When a rule legitimately moves from an inject into a skill, carry its
assertion to that home rather than delete the protection. The move still
has to pass the load-trigger check above: a passing assertion on a skill
file does not prove that the agent loads it when needed. The source's
example moved operator guidance to an existing operator-facing skill;
it is not permission to move always-needed agent behavior off the hot path.

# Canonical boundaries and prevention

When the effort changes a rule rather than only condensing it, also plan
[review of the neighboring capabilities in the composition](/nodes/oats-expert/lessons/rule-changes-need-cross-capability-composed-review.md).
Preserving load coverage does not establish that another capability has
stopped teaching the old rule. When the question is what a new skill
should contain and whether to adopt a community pack at all,
[the focused-rules lesson](/nodes/oats-expert/lessons/agent-skills-take-focused-rules-and-targeted-context-not-packs-or-procedures.md)
holds the evidence; it relies on this lesson for the rule that each skill
needs a trigger in the always-loaded text. When the text in hand is a
template copied and adapted rather than condensed, the mirror-image risk
(a default kept that the organisation never adopted) is
[verifying a template adaptation twice](/nodes/oats-expert/lessons/verify-a-template-adaptation-by-its-diff-against-the-tag-and-the-authorities-it-grants.md).

[Enumerating the guarantees the old behavior held up](/nodes/oats-expert/lessons/enumerate-what-a-removed-behaviour-held-up.md)
is the general method. Here the guarantee at risk is contextual instruction
coverage, and even a complete-looking disposition list can misstate it.
The kernel's [composed-instructions lesson](/nodes/oats-kernel-expert/lessons/kernel-composed-text-is-executable-surface.md)
owns composition invariants and target availability; this lesson adds the
condensation-specific check that an available skill is actually triggered.

Prefer a single maintained rule home with reliable routing over duplicated
prose that can drift. Tests can pin structural properties such as which
block owns a rule and whether a required skill is available in a composition.
They do not prove that the skill's natural-language trigger covers the
situations the removed inject covered. Put the trigger-and-exception check
in the owning instruction-authoring/review guidance; keep the independent
semantic comparison for what structural tests cannot establish. This
harvest changes no skill and claims no new automated enforcement.

For text-consumer omissions, prefer shared derivation of illustrative
fixtures and removal of incidental copies where the owning contract allows
it. Keep intentional wording or ownership assertions at their authoritative
home, with coverage of the affected compositions. Dependency-aware test
selection and fixture consistency checks are the automation route; the
remaining pre-draft contract classification belongs in instruction-authoring
guidance. These are prevention routes, not newly delivered checks.

# Evidence and limits

Evidence: OKF proposal from oats-expert/oats-expert-maintainer-lanes,
2026-10-27; notes/moving-an-always-on-rule-into-a-skill-changes-when-it-fires.md.

The source reports one trim effort in
[awebai/oats-engineering#21](https://github.com/awebai/oats-engineering/pull/21),
with independent per-capability review finding five gaps and all being fixed
before handover. This harvest did not audit the old/new package text or
verify those repairs. The examples explain the failure mode; they neither
redefine maintainer lanes nor establish a measured failure rate for
instruction condensation.

Evidence: OKF proposal from oats-expert/oats-injection-compression-expert,
2026-10-27; notes/inject-text-pins-beyond-goldens.md;
notes/pinned-text-limits-injection-compression.md.

The refinement is source-reported from one effort across
[awebai/oats#1580](https://github.com/awebai/oats/pull/1580),
[awebai/oats-aweb#158](https://github.com/awebai/oats-aweb/pull/158) and
[awebai/oats-okf#112](https://github.com/awebai/oats-okf/pull/112).
The source reports missed fixture consumers, newline-sensitive assertions
and retained wording that limited the trim. This harvest did not audit the
implementations or rerun their tests. The observed size ratios are not a
general compression floor, and no release or completed repair is certified.
