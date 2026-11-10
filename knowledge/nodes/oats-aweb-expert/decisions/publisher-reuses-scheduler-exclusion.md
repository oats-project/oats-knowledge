---
type: Decision
title: The scheduled publisher reuses the kernel job lock
description: A second publisher tick lockfile was rejected because the kernel already serializes runs of the scheduled job and another lock would add a stale-lock failure mode.
about: [system/oats-aweb]
id: dec-89d2c112f8cf
tags: [oats.aweb, health, scheduling, concurrency, rejected-alternative]
timestamp: 2026-10-15
---

The publisher's review rejected a separate tick lockfile with staleness
checks. For the scheduled command job, the kernel already holds a per-job
lock: a due minute whose preceding run still holds that lock is skipped,
and the command has a timeout with a grace kill. A second lock would
duplicate that exclusion and introduce another stale-lock failure mode.

The intended tradeoff is that a slow tick loses the minutes it spans, instead
of overlapping the next tick and racing on the designation cache or sending
older sequence values after newer ones. Keep the reason for this deliberate
omission when reviewing proposals to add a publisher lock.

The guarantee is scoped to runs of the same kernel-managed scheduled job.
It does not establish exclusion between distinct jobs or arbitrary manual
invocations. Nor does a per-job lock serialize work inside one tick: the
publisher still serializes its own parallel writes to the refusal log.

This records the package's choice to rely on an existing kernel guarantee;
it does not create or restate the kernel's general scheduler contract.
If invocation topology changes, re-establish which owner supplies exclusion
before carrying this decision forward.

Evidence: OKF proposal from oats-aweb-expert/oats-aweb-expert-agent-health-publisher, 2026-10-15; notes/publisher-relies-on-kernel-job-lock.md.

The note reports reading the kernel scheduler lock for versions 0.56–0.58
on 2026-10-15 and agreement in the second review round. This harvest did not
audit the scheduler or replay overlap tests. Enforcement belongs in the
scheduler and publisher concurrency tests, not a new operational lockfile
procedure.
