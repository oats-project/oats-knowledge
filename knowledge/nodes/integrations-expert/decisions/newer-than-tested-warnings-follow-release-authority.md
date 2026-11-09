---
type: Decision
title: Newer-than-tested warnings follow the service's release authority
description: A provider's tested client bound is evidence rather than a refusal ceiling, and a managed-service exemption depends on that service owning server-before-client release order.
tags: [integrations, compatibility, releases, readiness, external-cli]
timestamp: 2026-11-09
---

# Decision and rationale

The source reports a 2026-11-02 decision for oats.aweb: an aw newer than the
provider's tested upper bound produces a warning, not a refusal, when the
home's own team root names a service outside the exact Cloud origins. The
upper bound is tied to the highest aw exercised by the provider's CI journeys,
not an operator's assertion of compatibility. A test keeps the declared floor
and tested bound aligned with the matrix. This is a boundary on evidence,
not proof that every newer client is broken or every intervening version was
tested.

The motivating rehearsal used aw 1.36.53-rc.3 against Cloud 0.8.64 and could
not mint where 1.36.51 could. The source reports that aweb addressed the Cloud
risk by ordering its releases: deploy the server before publishing aw to npm
`latest`. Under that reported release-order commitment, warning every Cloud
home after each newer aw would add noise without requiring a new provider
release to repair the gap. A self-hosted or BYOT server has no such release
ordering guarantee, so a newer client there remains honestly unqualified.

The warning names upgrading the server before pinning the client back. A
rollback is not harmless when another deployment feature needs the newer
client. The choice preserves that constraint rather than prescribing an
older client as the universal remedy.

# Rejected alternatives

- **Pin the installation command to one aw version.** This would require a
  provider release for each client advance and strand hosts below client
  fixes or newly required features. Narrowed on 2026-11-09 for the customer-run
  (BYOT) onboarding install only, which installs the provider's published
  tested version:
  [the tested aw version is published by oats.aweb, and pinned only for a customer-run server](/nodes/oats-maintainer/decisions/tested-aw-is-published-by-oats-aweb-and-pinned-only-for-byot.md).
  Hosted installs and the warning choice here are unchanged.
- **Warn on the Cloud as well.** This would turn each client release into
  routine noise while the managed service owns the server-before-client
  release obligation.
- **Let a host setting raise the tested bound.** Configuration cannot create
  missing CI evidence.
- **Compare only major and minor versions.** The motivating incompatibility
  occurred within a minor version; patch and prerelease distinctions cannot
  be discarded merely to quiet the warning.

# Scope and enforcement

This records the integration tradeoff, not a current compatibility table or
an independent certification of aweb's release process. The Cloud exception
is conditional on the upstream release-order commitment; it is not evidence
for arbitrary release candidates, other distribution channels, or services
outside that commitment. Current bounds, exact origins and executable
behavior belong to the provider's contract and tests and the
[messaging package expert](/nodes/oats-aweb-expert/index.md).

Keep the tested bound mechanically coupled to required real-client jobs.
The [real-binary execution lesson](/nodes/integrations-expert/lessons/real-binary-tests-that-skip-give-no-cover.md)
owns why declaring a matrix is not execution evidence. Tests should preserve
the warning-versus-refusal choice and distinguish exact scheme/host/port
origin matches from suffix lookalikes. Select the home's actual minting root,
not an ambient service or a convenient different team's root.

Service classification must also remain separate from permission to disclose
its URL: the [nullable-locator boundary](/nodes/integrations-expert/lessons/a-lifecycle-hook-never-trusts-the-ambient-environment.md#disclosure-rejection-is-not-service-absence)
owns why a hidden value cannot be interpreted as an absent service. These
executable boundaries, not a permanent manual checklist, are the enforcement
route.

# Evidence and acceptance limits

Evidence: OKF proposal from integrations-expert/overdue-step-checkpoint-integrations-expert,
2026-11-02; notes/warn-newer-than-tested-off-cloud.md.

The source reports agreement through the setup maintainer between the release
lane and the other maintainer lane, and identifies
[awebai/oats-aweb#175](https://github.com/awebai/oats-aweb/pull/175) at `2835c4b`
as the implementation. The rehearsal, release-order commitment, agreement,
review approval and passing CI are source-reported; this harvest did not
independently inspect that implementation or reproduce them. The lane relay
is not recorded as verified human acceptance. No prior accepted decision is
superseded, and no release or deployment is certified.

Maintainer review of oats-knowledge#259 on 2026-11-02 found #175 open and
unmerged, with `2835c4b` as its second commit and a later head `dbb29620`;
its two resident-journey jobs (aw 1.36.33 and 1.36.51) had passed and its
validate-and-test job had not concluded. Until it merges, this records the
decision's rationale, not shipped behavior.
