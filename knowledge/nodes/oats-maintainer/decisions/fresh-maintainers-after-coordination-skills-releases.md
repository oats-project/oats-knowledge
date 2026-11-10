---
type: Decision
title: Refresh maintainer context with a new instance after a coordination-skills release
description: For the directing human's lanes, use fresh maintainer instances after syncing coordination skills rather than upgrading retained context, defer occupied seats until their efforts land, and replace the release lane last.
about: [workstream/oats-direction]
id: dec-6f2505b7fdb5
tags: [maintainers, coordination, releases, handover]
timestamp: 2026-10-28
---
**Owner: oats-maintainer. Update-on-change: record any change to this rollout
choice, its scope or its in-flight-work exception here, with its acceptance.**

# Decision and scope

The source reports direct direction from the release lane's human on
2026-10-28: after syncing a coordination-skills release, give each of that
human's maintainer lanes a fresh instance, including the release lane,
instead of upgrading the existing maintainers in place. The same human
explicitly deferred replacement of the occupied setup seat until its work
was finished. Preserve that exception: a maintainer with efforts in flight
keeps its seat until those efforts land; its successor comes afterward.

This records a human-selected rollout policy for those lanes, not a global
ban on instance upgrades or authority to replace another human's maintainers.
The [lane decision](/nodes/oats-maintainer/stewardship/release-lane-and-project-lanes.md)
continues to own lane assignments and release authority. The current lane
map, not this concept, holds instance names and staffing.

# Why a fresh instance, rather than a package upgrade

The source's rationale is context coherence: an in-place package upgrade
still needs a stop and start while keeping the old working context against
new coordination rules. A fresh instance starts with the newly synced
briefing; an explicit handover makes the predecessor write down what the
forge does not hold. This is the maintainer's explanation for the chosen
rollout, not a claim that the human separately stated each reason or that
freshness alone proves correct behavior. The existing distinction between
[accepted knowledge and situated working understanding](/nodes/oats-maintainer/decisions/flexible-knowledge-and-situated-instances.md)
still holds: harvesting and handing over do not reproduce the predecessor's
whole working picture. This bounded rollout choice does not make all
instances short-lived.

The rejected alternative for this rollout was upgrading each existing
maintainer with `oats instance upgrade`. The choice is deliberate even when
that operation is technically available. It does not redefine the kernel's
upgrade contract or ordinary restart behavior.

# Handover preserves the lane

The source records the transition as a lane-map handover, a final knowledge
harvest, marking the predecessor's entry `left`, and retirement. Replace
the release lane last. These are the recorded rollout terms, not evidence
that every lane has completed them. Keep one canonical lane map and follow
the composed lifecycle, work-preservation and knowledge requirements; the
rollout decision does not waive their refusals.

This is distinct from
[retiring finished effort leads](/nodes/oats-maintainer/stewardship/coordination-policy-lives-in-capabilities.md#human-spawned-leads-and-standing-maintainers):
standing maintainers do not become disposable merely because they are idle.
Their replacement here follows the named human direction and lane handover.
Operational guidance belongs in the maintainer's composed skills rather than
a second command checklist in knowledge. No skill or deployment is changed
by this record.

# Evidence and limits

Evidence: OKF proposal from oats-maintainer/pepe-release-maintainer,
2026-10-28; notes/fresh-maintainers-after-a-skills-release.md.

Human acceptance and the in-flight-work exception are source-reported from
direct instructions to the release lane that day. This harvest did not
inspect correspondence or interview the source. The proposal reports partial
same-day application, not completion of the whole rollout; no spawn,
retirement, package adoption or live-context verification is certified here.
