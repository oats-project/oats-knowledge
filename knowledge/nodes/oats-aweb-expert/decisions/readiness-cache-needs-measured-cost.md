---
type: Decision
title: A readiness cache needs measured publisher cost
description: The health publisher deferred a readiness cache below an agreed approximate one-second per-home threshold, using bounded CLI CPU measurements and a remeasurement trigger rather than treating scratch timings as a production budget.
about: [system/oats-aweb, system/oats-kernel]
id: dec-fe2c84923aab
tags: [oats.aweb, health, performance, caching, kernel]
timestamp: 2026-10-15
---

The publisher rejected a readiness cache while the measured per-home cost
remained below its agreed approximate one-second threshold. Retain that
reason when revisiting the implementation: the absence of a cache was a
measured choice, not an overlooked optimization.

The source's 2026-10-15 scratch measurement used kernel 0.58.0 on macOS,
median of five runs, user plus system CPU time, at reported load about four:

| CLI operation | CPU seconds |
| --- | ---: |
| status | 0.20 |
| session inspect | 0.16 |
| instance events | 0.15 |
| readiness | 0.20 |

The publisher avoided instance-events reads for live homes, where the
stop-versus-crash distinction was unnecessary. Its resulting estimate was
about `0.20 + 0.36 × live homes` CPU seconds per tick. Re-measure near 30 live
homes, where that estimate reaches roughly 11 CPU seconds per minute.

These are CPU measurements, not wall-time guarantees or a universal cost
for every kernel command. Provider readiness work and aw doctor on real
oats.aweb homes were not measured: scratch homes lacked aweb identities.
Include those costs before treating the threshold as satisfied on a real
deployment. The source reports agreement on the threshold but identifies no
explicit human who/when acceptance; it is a scoped publisher decision.

The architectural elimination route is a public batched kernel query for
liveness and readiness across homes, reducing repeated process startup.
The proposal identifies that route, not an implemented API or an approved
kernel request. It preserves the
[public process boundary](/nodes/oats-kernel-expert/decisions/minimal-process-boundary.md);
private kernel imports would undo that separate accepted decision. The
[offline identity-read lesson](../lessons/identity-polling-uses-offline-reads.md)
addresses avoidable network work, which these scratch timings do not price.

Evidence: OKF proposal from oats-aweb-expert/oats-aweb-expert-agent-health-publisher, 2026-10-15; notes/kernel-cli-call-cost.md.

The measurement and rejected cache are source-reported; the harvest did not
rerun the benchmark or establish production performance.
