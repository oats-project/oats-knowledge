---
type: Decision
title: Shared readers separate client terms from attributed kernel prose
description: Share facts and code meanings, require explicit client terms, keep control-specific next steps in a closed code set worded by each client, and return attributed kernel prose as separate parts.
about: [system/oats-desktop]
id: dec-190560635f99
tags: [desktop, shared-code, wording, attribution, rejected-alternatives]
timestamp: 2026-10-15
---
# Decision and rationale

The source records a 2026-10-10–13 decision for sharing Desktop readers with
another client: share the interpretation of codes and data, not an implicit
Desktop voice. Where a shared sentence needs client-specific wording, the
caller supplies its own terms explicitly, with no default. Desktop-only
remedies tied to a dialog or menu stay with that client; adding a term for
every control would turn the terms into a second description of the UI.

The goal was to preserve Desktop's existing wording while preventing a
second client from acquiring its own drifting table of meanings. Neutral
wording was rejected because it changed the first client's behavior and made
remedies less specific. A Desktop default silently prints the wrong client's
name when a caller forgets its terms; a module-level setter makes the answer
depend on shared mutable state. Required terms fail at the named public
function instead of producing another client's sentence.

The source also records why the terms use a module-private brand: duck typing
can admit incomplete objects, while an object registry would violate the
no-module-level-mutable-state condition. The accepted cost is that terms from
one evaluated copy are not valid in another. Fix duplicate loading rather
than weaken that check. Packaged graph and shell tests are the enforcement
route; this is not a claim that a single shell launch proves every view loads
correctly. [Shared-code packaging](shared-code-keeps-one-relative-path.md)
owns the packaging rationale.

# A control-specific next step is a code, not another UI term

The source's 2026-10-15 spawn refinement makes the client-only-remedy boundary
explicit: a sentence mixing a shared fact with a step naming one client's
control returns the fact plus a `next` code from a closed, frozen set. Each
client supplies the wording for that step. Shared facts may retain generic
actions, but must not name another client's dialog, menu or control.

Keeping the full Desktop sentence beside a separate fact was rejected: the
shared home would still contain one client's UI. Making every control a term
was also rejected as a second description of the UI. The closed next-step
vocabulary shares the intended action without making another client inherit
the Desktop's controls. Adding a code is a shared `SURFACE` contract change;
tell the other client's lead rather than treating it as a local copy edit.

Preserve the first client's wording while splitting ownership. The reported
regression pins every recomposed Desktop sentence byte-for-byte against the
pre-split base tables. This intentionally owns Desktop-authored copy during
the extraction; it is not permission to freeze the kernel's live prose, whose
[test boundary remains different](../lessons/kernel-text-tests-own-the-client-reading.md).
Review the retained facts for control-name leaks too: the source reports one
schedule-control reference caught during review. Keep the code inventory and
parity checks in the repository, not a second table here. The proposal does
not establish that the terminal client's spawn has adopted this surface.

# Keep the speaker at the reading boundary

A reader marks a reason read from the CLI's error envelope as kernel-origin
text; its own timeout, protocol failure or gate is not thereby kernel speech.
This does not reclassify source-authored prose merely transported by a kernel
envelope: the existing attribution decision still follows the actual origin.
Return the presentation parts separately—headline, client-authored lead and
kernel sentence—so a client can quote the kernel with its speaker without
parsing a joined string. A one-line form is those same parts joined, not a
second wording rule. Withheld or absent kernel text gets no dangling lead.

Likewise, message and remedy belong together at the attributed-rendering
boundary: the source's `kernelLines(message, fix, terms)` decision prevents
each caller from reconstructing that rule. A client must not recognize a
kernel warning by matching its prose. The producer owns that prose, and a
rewording is not a new machine contract.

This supplies the interface rationale needed to apply
[attributed source prose](source-prose-is-an-attributed-quote.md); that concept
remains the canonical visual and accessibility treatment. It does not require
every existing view to change presentation during a shared-code move.

[Feature-gated refusal wording](gated-wording-travels-with-the-answer.md)
adds why a sentence whose meaning depends on the answering kernel is chosen
where that context is known and carried to the page. It remains client-authored
text, not attributed kernel speech.

# Scope and enforcement

Use required-terms tests, attribution/parts equivalence tests and shared
reader coverage to preserve the boundary. Keep the code's API inventory in
the repository. This decision concerns shared-reader behavior only: it does
not change CLI authority, decide product succession or authorize a second
deployment model.

# Evidence and limits

Evidence: OKF proposal from oats-desktop-expert/oats-desktop-expert-partner-desktop-queue, 2026-10-14; notes/shared-readers-carry-desktop-wording.md; notes/an-error-reader-says-whose-words-it-carries-and-answers-the-parts.md; notes/the-terms-brand-fails-loudly-on-a-second-copy-of-the-module.md.

The proposal and notes report the expert's terms decision and agreement on
the attributed parts in [awebai/oats#855](https://github.com/awebai/oats/issues/855)
(comments 6111654641, 6111663016 and 6111784559), and implementation in
[#953](https://github.com/awebai/oats/pull/953),
[#1054](https://github.com/awebai/oats/pull/1054) and
[#1094](https://github.com/awebai/oats/pull/1094). Acceptance, implementation
and packaging checks are source-reported, not independently audited or run
by this harvest.

Evidence: OKF proposal from oats-desktop-expert/oats-desktop-expert-client-spawn, 2026-10-15; notes/spawn-words-are-facts-and-next-codes.md.

The source reports the closed-next-step rule and rejected alternatives in
[#855](https://github.com/awebai/oats/issues/855), with implementation in
[#1250](https://github.com/awebai/oats/pull/1250) at `81bef3f1a`. It identifies
`packages/desktop/test/spawn-words.test.mjs` as the base-table parity guard.
The agreement, review finding, merge and test behavior are source-reported;
this harvest did not audit the implementation or run that guard.
