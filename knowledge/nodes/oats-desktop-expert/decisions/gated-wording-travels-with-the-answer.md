---
type: Decision
title: Feature-gated wording travels with the answer
description: Choose refusal wording where the answering kernel's feature declaration is known and carry it beside the code, rather than reconstruct a gated guarantee from a page's code-only table.
about: [system/oats-desktop, system/oats-kernel]
id: dec-79ae7fe98830
tags: [desktop, kernel, wording, compatibility, rejected-alternatives]
timestamp: 2026-10-30
---
# Decision and rationale

The source records a 2026-10-30 choice for a start refusal: select its
feature-dependent wording on the Desktop server and carry that sentence
beside the code to the page. The merged change makes that selection in the
shared start rule, which the Desktop server calls and the TUI calls too, so
it is not a Desktop-only sentence. The relevant authority is the **answering
kernel's** declaration, not the client's installed version or the code alone.

The existing code-keyed sentence table was rejected for this case. A kernel
without the feature can return the same code without establishing the same
no-start guarantee. The page lacks the feature context needed to distinguish
those answers; a table entry would turn an uncertain outcome into a confident
promise that nothing started. The server can combine the answering kernel's
feature list with the refusal details before choosing that promise.

Carry the contextual reading with the answer rather than discard its basis
and reconstruct it at the final view. This is a choice about where the client
interprets evidence, not permission for Desktop to invent kernel facts or
change refusal semantics. A missing feature does not acquire a stronger
meaning because a newer client recognizes the code.

# Relationship to existing decisions

[Remove's ownership-fact decision](remove-wording-needs-an-owned-worktree-fact.md)
already records why a promise must be gated on the answering kernel's
declaration. This decision adds the location and transport rationale for
feature-dependent refusal wording; it does not change Remove's compatibility
fallbacks.

[Shared terms and kernel prose](shared-readers-separate-client-terms-and-kernel-prose.md)
still owns client terms, control-specific next steps and attribution. A
sentence selected by the shared rule on the server remains client-authored;
kernel speech stays separate. No general removal of code-keyed tables or move of
all UI wording to the server is implied. For codes with multiple producers,
the [wording audit](../lessons/client-wording-must-hold-at-every-code-producer.md)
is independently necessary even after the feature gate is satisfied.

# Enforcement

Keep feature-context interpretation at one boundary and test the same code
with and without the answering kernel's declaration. Cover response-to-page
composition so the page cannot replace a qualified reading with an
unqualified code-only promise. These are enforcement requirements, not a
claim of completed coverage; the current wire keys and table inventory
belong in the repository.

# Evidence and limits

Evidence: OKF proposal from oats-desktop-expert/oats-desktop-expert-start-refused-at-claim, 2026-10-30; notes/decision-gated-sentence-travels-with-the-answer.md.

The source identifies work for
[awebai/oats#1666](https://github.com/awebai/oats/issues/1666). The design and
rejected alternative are source-reported, not independently audited human
acceptance, implementation, test or release evidence. No existing
human-accepted decision is superseded.

That described the harvest. At maintainer review on 2026-10-30,
[awebai/oats#1668](https://github.com/awebai/oats/pull/1668) was merged as
`27dae302`, just after this proposal was opened. Its diff selects the sentence
in the shared start rule only where the answering kernel lists
`lifecycle-claim-start`, carries it to the page as an optional route key, and
leaves the same codes uncertain otherwise; the page's code-keyed table stays
for other codes. The maintainer read the diff and did not run its tests. A
merge is not a release.
