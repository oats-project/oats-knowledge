---
type: Lesson
title: Adoption evidence and authority must match the claimed outcome
description: Installation, usable execution, publication, delivery, consumption and learning are different evidence; an apparent gap is classified before anyone adds fields or authority; and review findings do not expand approved product scope.
about: [workstream/oats-direction]
kind: lesson
id: ins-8f7abc0e73e4
tags: [acceptance, evidence, scope, review]
timestamp: 2026-09-05
---
# Lesson

An adoption claim needs evidence at the user's actual boundary. Installation
proves availability; a scaffold proves composition; a usable session proves
execution. Delivered input still may not be consumed, and an accepted
knowledge change still may not inform a fresh instance — the proof of
learning is a fresh instance obtaining it through the supported reader, not a
seeded answer. Do not promote one of these observations into all the others.

A **release** claim likewise needs the exact source tag, the published
artifact, the installed version and execution evidence against it; a green
source checkout is not a published installation, and "it is on main" is not
"it is released" (see [release judgement](/nodes/oats-maintainer/stewardship/release-traps.md)).

A resolution gate does not prove every independently targetable capability
is spawnable: composition resolves only what the selected soul activates, so
a malformed resource path stays latent until that target is probed (observed
2026-07-28, when an additive capability's paths were valid only in its source
layout). Acceptance therefore includes at least one fresh probe **per
targeting class**, not one generic baseline soul.

# Classify the gap before adding anything (2026-09-20)

Before adding fields, kernel work or authority for an apparent gap, classify
it: already supported, documentation drift, provider behaviour, deployment
setup, or a genuinely missing generic seam. Assign adoption *outcomes*, not
presumed code changes. Check what exists before queuing kernel work: a
host-only settings gap that reached the kernel's queue in 2026-09 had been
enforced by the kernel for weeks — the missing piece was a package that did
not mark its keys. A created soul, a valid declaration or a better refusal is
not a completed deployment.

# Scope discipline

First establish the user outcome and responsibility split. Scope by the
actual domain boundaries rather than inventing parallel work to fit an
inherited roster. A diagnosis of missing reachability can be correct while a
new navigation destination is the wrong remedy: a review defect is not
permission to add a product surface the human did not request.

# Operations

The same separation applies to operations. Messaging can deliver a wake hint
without owning execution or acknowledging work for the recipient
([runtime, messaging and viewers have separate owners](/nodes/oats-maintainer/decisions/runtime-messaging-viewer-ownership.md)).
Runtime permission flags do not confer task authorisation. Report the observed
result, remaining uncertainty and next authorised check, rather than calling a
handoff, green probe or missing error successful adoption.

# Related

[External knowledge needs source-independent custody](/nodes/oats-maintainer/decisions/external-knowledge-custody.md);
[second-operator acceptance](/nodes/oats-maintainer/lessons/second-operator-acceptance.md).

# Current contracts

- [acceptance.md](https://github.com/awebai/oats/blob/main/docs/knowledge-reference/acceptance.md)

# Citations

1. Migrated from agents/lead/soul/knowledge @ 7838d3ca (`operating-boundaries`, `continuation-sources`, 2026-09-05), agents/dev-coordinator/soul/knowledge @ 7838d3ca (`lessons/review-fix-scope-overreach`, `scope-feature-before-spawning-developers`) and agents/oats-expert/soul/knowledge @ 7838d3ca (`lessons/strict-preflight-exposes-capability-layout-debt`, 2026-07-28; the redesign lead's alignment-gate judgement of 2026-09-20).
2. Migrated from agents/oats-expert/soul/knowledge/stewardship @ 7838d3ca (delivery-log: "assign adoption outcomes, not presumed code changes", 2026-09-20; "check what exists before queuing kernel work", 2026-09-24).
