---
type: Lesson
title: Date host-read facts before a cross-workspace adoption gate
description: Before a version-dependent adoption gate, enumerate the adopter's hosts from team presence and require each version to be read on the named host with its observation time and reporting route.
about: [workstream/coordination]
kind: lesson
id: ins-5682434e67b9
tags: [coordination, adoption, hosts, evidence, freshness]
timestamp: 2026-10-14
---
# A relayed version needs a host and an observation time

When the OATS contact cannot inspect an adopter's machines itself, it must
not turn a remembered host list or repeated version into current gate
evidence. Before a version-dependent adoption gate, enumerate the hosts
visible in the adopter team's workspace presence, including hostnames,
rather than relying on the names participants happen to recall. Resolve an
ambiguous host label before attaching a reading to it. Presence can expose
an overlooked host; it is not proof of a complete or current inventory.

For each relevant host, require an `oats --version` reading made on that
host, with when it was read and through whom it reached the relay. Keep the
observation time distinct from the time somebody repeats the value. A
freshly relayed old reading is still old evidence. Missing, ambiguous or
stale readings remain gaps in the gate rather than assumed passes or fails.
Hostnames and reporting details belong in the authorized task evidence,
not in durable knowledge.

# Three different ways relay evidence failed

The source reports three mistakes in one outside-adopter effort: a third
host appeared only in the team's presence view; a shorthand host label
referred to a different machine; and a version repeated from several days
earlier no longer described the installation. An unexpected feature in a
plan's output exposed the stale value and prompted reconciliation.

Those are distinct failures of enumeration, attribution and freshness.
Repeated agreement cannot repair any of them without returning to the
host-specific observation. Incidental output can challenge a version claim,
but it should trigger a new reading, not become a permanent substitute for
one. Preserve this judgment rather than a table of that adopter's machines,
versions or feature-to-release guesses.

# Boundaries and elimination route

A host-version reading establishes one input to the adoption decision, not
successful execution or acceptance. The [maintainer's adoption-evidence rule](/nodes/oats-maintainer/lessons/adoption-evidence-and-approved-scope.md)
remains the canonical home for what those outcomes require. The operator's
[target-provider requirements lesson](/nodes/oats-operator-expert/lessons/check-target-provider-host-requirements-before-sync.md)
owns upgrade sequencing; this lesson owns how a cross-team relay obtains
and attributes the host facts used in that decision. Neither grants host
access or upgrade authority. [Remedy advice still goes through the maintainer](/nodes/oats-expert/lessons/relay-own-readings-through-the-maintainer.md).

An authorized host probe that carries host identity and observation time
with its result could reduce manual transcription and stale-value reuse;
checks could reject incomplete evidence. That is a possible elimination
route, not an implemented collection service or permission to create one.
The coordination skill is the place for a recurring collection procedure,
under separate review. The lasting lesson is to distinguish a host
observation from a relay's assertion about it.

A host reading is also not one reading: a host can run several kernels,
and the one its schedule unit runs is the one a home never reports. When
the gate guards a contract flip, [count kernels, not hosts](/nodes/oats-expert/lessons/a-contract-flip-gate-counts-kernels-not-hosts.md).

# Evidence and limits

Evidence: OKF proposal from oats-expert/polaris-oats-expert-REDACTED-support,
2026-10-14; notes/read-adopter-host-facts-on-the-host.md.

The note dates the incidents to 2026-10-09 through 2026-10-13. The discovered
host, corrected attribution and stale-version diagnosis are source-reported;
this harvest did not inspect the adopter's presence, hosts or messages.
No current host state, actual gate result or exhaustive inventory is claimed.
