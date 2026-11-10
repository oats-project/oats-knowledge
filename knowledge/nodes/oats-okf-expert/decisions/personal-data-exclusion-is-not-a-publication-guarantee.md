---
type: Decision
title: Personal-data exclusion is one shared instruction, not a publication guarantee
description: The personal-data exclusion uses one shared wording to preserve lessons without identifying outsiders, while a pre-push hold was rejected as a guarantee unless publication authority is separated.
about: [system/oats-okf]
id: dec-d60b5a9ccd2d
tags: [okf, harvest, privacy, publication, enforcement]
timestamp: 2026-10-10
---

# Decision and acceptance evidence

The source reports that both maintainer sides accepted the personal-data
exclusion on 2026-10-10 in [oats-okf issue 64](https://github.com/awebai/oats-okf/issues/64),
with [PR 65](https://github.com/awebai/oats-okf/pull/65) merged as `12fb3ad7`
and released in [5.0.2](https://github.com/awebai/oats-okf/releases/tag/v5.0.2).
This acceptance is reported by the proposal and named notes, not independently
verified by this harvest; it is not evidence of a separate human approval.

The decision is to use **one identical exclusion sentence** wherever capture,
harvest or review teaches what to leave out. Keep the authoritative wording
in the package rather than maintain another copy here. The important rationale
is the boundary it draws:

- **People outside the team:** excluding every person's name would also
  erase legitimate decision acceptance and provenance.
- **Detail derived from correspondence:** banning only verbatim messages
  leaves a gap for identifying paraphrases.
- **Keep the lesson, leave the person out:** a received message can teach
  something without its subject becoming reusable knowledge.
- **Published-source attribution remains possible:** privacy exclusions
  must not strip ordinary author citations.

The shared wording matters because the capturing instance, harvester and
reviewer are different judges. Independently phrased exclusions drift. The
reported regression test pins the sentence at each teaching point; it proves
that the text ships, not that a model obeys it.

# Why an instruction is not a publication guarantee

The investigation behind this decision read the released 5.0.1 harvest path;
it did not rehearse a live harvest. Its consequential finding is that the
harvester is asked to judge exclusions while it already has publication
access. Review by another agent happens on the open PR, **after the push**.
A structural OKF validation pass is not a personal-data check.

This is consistent with the accepted [native-harness boundary](/nodes/oats-kernel-expert/decisions/harness-native-launch.md):
OATS contributes instructions, not a sandbox. Do not answer a privacy question
by presenting reading limits, diff review or a model's promised pause as code
enforcement. A deployment that needs a pre-publication guarantee cannot infer
one from this exclusion decision.

The source's soul-level opt-out is a narrower control: the spawn checks apply
to the **recorded source named by a proposal**. They establish source-record
consistency, not who authored the proposal. An opted-out soul's exclusion
from harvest is not an information-flow barrier around correspondence its
instances send to other seats. That limit is why an opt-out cannot substitute
for a publication boundary. How that per-soul opt-out is ordered against
legacy record keys on a retired source is in
[the package's retired 4.x source admission](/nodes/oats-okf-expert/decisions/retired-4x-host-harvest-keys-carry-no-authority.md).

# Rejected alternatives and deferred direction

- **An agent-held harvest waiting for a human before pushing:** rejected as
  a guarantee because the same agent still holds push access. Adding an
  instruction to wait does not remove its ability to publish.
- **A pattern scan as the guarantee:** the investigation rejected this
  framing because it catches only the identifying details anticipated by
  its patterns, not personal data in general.
- **Editing the reference theory's numbered reject list:** rejected in
  favor of the package's own runtime Exclusions section. The existing
  [optional-reference-theory decision](/nodes/oats-maintainer/decisions/optional-reference-theory.md)
  already assigns runtime policy to the capability; this is its application,
  not a change to the reference doctrine.
- **Reusing name-selection advice unchanged for every judge:** the working
  instance chooses names; a harvester or reviewer receives them. The latter
  need the consequence for unsafe evidence or provenance, not advice to
  rename the source they were given.

The proposal records a stronger design question: remove push access from the
harvester and have a separate publication step act only after human release.
It was deferred as a host/kernel question until a second deployment needs
it, not accepted as a shipped mechanism. This concept records why a prompt-only
hold was rejected; it does not specify or authorize a kernel implementation.

# Evidence limits

The code observations are scoped to the source's tagged investigation, not
all future 5.x releases. Neither a live harvest nor model adherence was
established. The decision and rejection history are the durable knowledge;
current settings, hook inventories and command behavior belong in the package.

Evidence: OKF proposal from oats-okf-expert/oats-okf-expert-harvest-personal-data,
2026-10-10; notes/harvest-has-no-pre-push-check-for-personal-data.md;
notes/personal-data-exclusion-wording.md. The held-harvest rejection and
second-deployment trigger are reported in the proposal itself.
