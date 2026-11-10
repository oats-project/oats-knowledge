---
type: Lesson
title: Review shared-client prerequisites with their owner before depending on them
description: Review shared modules and callers with their owner before estimating a second client, then isolate and test small shared prerequisites for owner review at an exact commit before building their consumers.
about: [workstream/coordination]
kind: lesson
id: ins-721ac72e316c
tags: [integration, shared-code, planning, second-consumer, review]
timestamp: 2026-10-15
---
# Import closure is not an interface review

Following imports establishes a candidate set of loadable modules, not that
another client can use them without duplicating behavior or changing the
first client's experience. A dependency-free graph can still conceal work
needed to make the interface shareable.

The generalist should ask the owning expert to review that set **before**
counting implementation PRs or presenting the cost of a scope exception to
maintainers. In the source's terminal-client effort, this review happened
only while the Desktop expert was writing the first developer spec. It
exposed additional shared-interface work after the initial estimate had
already supported the exception request. The lesson is about when to seek
domain judgment, not a permanent map of those modules.

# Three questions for the owning expert

- **Whose language is embedded in otherwise reusable data?** Look for
  product names, windows, menus and the first client's term for the local
  machine inside shared sentence tables. Moving a table does not make its
  wording appropriate for a second client.
- **Which necessary callers were left behind?** Reusable preflight,
  argument-building or confirmation logic can sit outside the selected set,
  next to a client-only terminal gate or inside a DOM dialog. The second
  client would otherwise have to reconstruct it.
- **Which execution assumptions change?** A client launched from an agent's
  terminal can inherit instance environment variables that an independently
  launched desktop client never encounters. Check the consumer's launch
  context and the behavior of all relevant callers, not merely whether a
  suitable helper exists somewhere in the graph.

These are prompts for a semantic review, not an exhaustive checklist or a
claim that every second-client estimate will grow.

# Review the callers' decisions, not just the shared modules

The 2026-10-10 refinement makes the caller question explicit: ask the owner
to examine every caller of the proposed shared set in the first client,
against the second client's intended scope, and identify decisions that the
second client would otherwise repeat. A module review alone can miss the
composition root that turns reader results into view inputs and failure
states, or the transaction boundary that preserves invariants between calls.
Key lifetime, replay of settled outcomes and retry restrictions are examples
of decisions to locate, not contracts to reconstruct in the new client.
Sharing low-level readers does not by itself share these rules.

If the same kind of omission appears in two different specs, treat the
second finding as evidence that the review scope may be too narrow. Request
the broader caller audit before extending the plan one small PR at a time.
In the source's effort, a missing view-input composition led to review of
one caller; the subsequent all-caller audit exposed a wider boundary layer.
That pattern changed the estimate after it had already informed the scope
exception. It supports this escalation trigger, not a prediction that every
client has the same layers or that every estimate must grow.

# Turn findings into owned prerequisites

For findings that require shared-interface changes, agree small changes with
the owning expert and name the consumer change each one enables. Sequence
those prerequisites before their consumers rather than letting the new
client create parallel implementations. The source reports that this kept
newly discovered work reviewable without hiding it in the original
extraction. It does not imply one PR per finding: a mechanical consolidation
may fit an existing prerequisite.

Treat pressure to make the first client's behavior uniform as a behavior
decision, not a mechanical extraction. Decide with its owner which differences
are intentional and where the new consumer must adapt. Merge authority and
breaking-contract ordering remain
with the [maintainer's review protocol](/nodes/oats-maintainer/stewardship/review-protocol.md);
this planning lesson does not relax either. General contract freezing lives
in [cross-workstream delivery](/nodes/oats-maintainer/stewardship/multi-workstream-delivery.md),
and shared-code packaging rationale lives in the
[Desktop decision](/nodes/oats-desktop-expert/decisions/shared-code-keeps-one-relative-path.md).

# During the build, make the shared prerequisite the first reviewable commit

The 2026-10-15 refinement carries the same owner review into implementation.
When a client PR needs a small shared-interface change that can properly
travel in that PR, put the prerequisite first as its own tested commit. Ask
the owning lead to read that exact commit before building the client code
on it. The PR body should identify the shared area changed and the commit
the owner reviewed, rather than implying that a whole client PR received an
unspecified owner approval.

The source reports that this kept the owner's review focused on one small
change while its shape was still cheap to alter. The client work stayed in
one PR rather than needing a separate prerequisite in another lane's queue.
This is a useful sequencing choice, not a rule that every cross-owner change
must fit one PR or that review always removes queueing. Changes requiring
separate delivery or breaking-contract ordering still follow the
maintainer's protocol. An owner read of the prerequisite is not approval of
later consumer code or a replacement for whole-PR review.

This extends, rather than replaces, the pre-estimate caller audit above:
one review discovers the shared work; the later exact-commit read checks
what will actually be built on. A concrete example is the client's
[output-lifetime boundary](/nodes/oats-expert/lessons/outliving-a-client-needs-independent-output.md),
where a shared execution seam was needed without copying lifecycle rules.

# Elimination route

Resolve concrete gaps in the shared interface or the consumer's explicit
boundary, then pin the behavior with tests. The named notes propose tests
for missing client vocabulary and for child processes launched under a
contaminated instance environment. Such tests can prevent known regressions;
they cannot decide which inherited assumptions matter to a not-yet-built
consumer or whether the estimate presented to maintainers covers them.
That up-front judgment is the durable lesson. During implementation, tests
pin the shared prerequisite but cannot supply the owning expert's design
judgment; the existing specification and review guidance is the place to
operationalize that handoff, not a second gate maintained in knowledge.
For newly found caller rules,
prefer one owner-reviewed implementation over a second client's copy, and
pin its composition and transaction behavior with regressions. Existing
Desktop rationale for [truthful async outcomes](/nodes/oats-desktop-expert/lessons/asynchronous-intent-and-truthful-outcomes.md)
remains there; this lesson changes the scope of the planning review, not
those contracts. No new CI gate is claimed.

Before this review, [trace each "done" item to the code that owns
it](/nodes/oats-expert/lessons/trace-done-items-to-owning-code-before-accepting-repo-list.md):
the shared set is worth reviewing only once every promised outcome is known
to be produced by code the task's repositories can change.

For the later handover check, [run the consumer spec against the built
producer](/nodes/oats-expert/lessons/run-consumer-spec-against-built-producer.md):
an owner-reviewed shared interface can still be composed incorrectly by the
lead's consumer spec.

# Evidence and limits

Evidence: OKF proposal from oats-expert/oats-expert-tui, received 2026-10-09;
notes/desktop-expert-gaps-in-the-shared-set.md; notes/spec-2b-inputs.md.

The source identifies [awebai/oats#855](https://github.com/awebai/oats/issues/855)
and reports the later owner review, additional prerequisites and maintainer
agreement. Those are source-reported planning outcomes, not independently
audited acceptance or a claim that the changes shipped. The notes date the
findings to 2026-10-10; this harvest's UTC receipt is 2026-10-09. No timezone
explanation or independent chronology is inferred.

Evidence: OKF proposal from oats-expert/oats-expert-tui, 2026-10-10;
notes/desktop-expert-gaps-in-the-shared-set.md (item 6);
notes/desktop-boundary-layer-and-two-stages.md.

The refinement's notes report the missing composition, the subsequent
boundary audit and the generalist's spot-check of three files. These are
source-reported findings, not a code audit by this harvest. The proposed
staging checkpoint was a recommendation awaiting maintainer judgment, not
an accepted direction or evidence that extraction shipped.

Evidence: OKF proposal from oats-expert/polaris-oats-expert-tui, 2026-10-15;
notes/shared-home-change-goes-first-with-its-owner-read.md.

The source reports that the first commit of
[awebai/oats#1212](https://github.com/awebai/oats/pull/1212), `605d1b24`,
contained the shared prerequisite and its test, and that the shared area's
lead accepted it on 2026-10-14 before the client code was built. The reported
PR body identified the shared change and owner read. Review, sequencing and
merge remain source-reported, not independently audited by this harvest;
no new human acceptance or merge authority is inferred.
