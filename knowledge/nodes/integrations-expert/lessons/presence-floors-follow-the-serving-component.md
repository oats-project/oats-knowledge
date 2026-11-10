---
type: Lesson
title: Presence-dependent floors follow the component serving each identity
description: Before gating a presence-dependent feature, map each identity to its active heartbeat producer, keep task prerequisites in the task capability, and distinguish presence-only registration from message delivery.
about: [workstream/provider-integration, workstream/messaging]
kind: lesson
id: ins-bbc1f32ec82f
tags: [integrations, presence, readiness, messaging, tasks, versioning]
timestamp: 2026-11-03
---

# Why one floor was the wrong boundary

The source's 2026-11-03 investigation rejected a single “upgrade aw and
restart the daemon” prerequisite for keeping task claims alive through stale
claim takeover. In the source-reported reading of `aw-v1.36.54-rc.1`, the
broker heartbeated its registered homes, while Claude and Pi channel homes
relied on their plugin or extension for primary-identity presence. Poll-only
joined identities had no heartbeat producer in that arrangement.

The integration mistake was treating an installed CLI or a running broker as
coverage for every identity. A primary identity's presence did not establish
presence for another team's identity in the same home. Polling mail did not
supply that missing guarantee either. This is a bounded investigation, not a
permanent inventory of current aweb behavior.

# Map the producer before choosing the prerequisite

For each identity on which a feature relies, identify the component actually
responsible for its presence. Apply the prerequisite to that component and
route, rather than assuming a daemon upgrade fixes a channel-owned path.
Give poll-only identities an explicit answer instead of inheriting the
primary identity's readiness.

The later proposal reports agreement between the maintainer sides to keep
this selection behind one scope function in the tasks capability, using
public `aw wake status` and the kernel's launch record rather than the
messaging provider's private metadata. The rationale is one route decision
without a second interpreter of another capability's internal state. A
recorded route or version is still not an observed successful heartbeat.

The reported direction also separates responsibility from consumption:
`oats.aweb` would register poll-only joined identities for **presence only**,
without adding task behavior or changing their message-receive mode;
`oats.aweb-tasks` would refuse its presence-dependent use when its selected
identity lacked heartbeat coverage. This is intended integration behavior,
not a claim that the registration was shipped.

The accepted [messaging/task composition decision](/nodes/oats-maintainer/decisions/messaging-and-task-coordination-are-separate-choices.md)
remains canonical for keeping task-only teaching and prerequisites out of
messaging-only homes. The [daemon-version decision](/nodes/integrations-expert/decisions/the-messaging-integrations-readiness-reports-the-host-wake-daemons-version.md)
still owns how to inspect a broker-dependent route; this lesson does not
replace its historical policy or expand it to non-broker routes. The separate
[consumer-input lesson](/nodes/integrations-expert/lessons/readiness-reads-what-the-consumer-reads.md)
owns captured-versus-current setting selection.

# Eliminate the integration gap in code

Centralize route and identity selection in the feature's gate. Exercise
broker, channel-primary and poll-only joined identities separately, including
a present primary with an uncovered joined identity and an upgraded broker
that does not serve the selected route. Check that presence-only registration
does not enable message receive or task teaching, and that task-only gates do
not leak into messaging-only compositions. Pair those regressions with a
real-path rehearsal of presence and claim survival; a fake registration or
version match alone does not establish either.

These are enforcement targets, not tests implemented or rerun by this
harvest. Exact supported versions belong in release-qualified package
contracts, under the existing [feature-floor evidence rule](/nodes/oats-maintainer/lessons/a-re-dated-claim-must-be-re-verified-against-the-release-it-now-names.md),
not in a second operational compatibility table here.

# Evidence and limits

Evidence: OKF proposal from integrations-expert/overdue-step-checkpoint-integrations-expert,
2026-11-03; notes/what-heartbeats-a-claim-depends-on-the-delivery-path.md.

The note records the investigation while version and poll-only questions were
still open. The later proposal reports their resolution through maintainer
mail; agreement is **source-reported**, not independently verified human
acceptance. It identifies [awebai/oats-aweb#196](https://github.com/awebai/oats-aweb/pull/196)
as open implementation work and says presence-only registration was not yet
built and upstream `presence_identities` had not shipped. The harvest read
only the captured proposal and named note for this evidence; it did not
inspect the private exchanges, implementation or upstream source, reproduce
the behavior, or establish release or deployment. No existing human-accepted
decision is superseded.
