---
type: Insight
title: The kernel's presentation verbs refuse only beside a retire, so a spec that mirrors one states exactly that
description: `instance color`, `background`, `same-work` and `pin` share refuseBesideRetire, which never blocks a live stop, start or upgrade; a spec that promises E_LIFECYCLE_BUSY for "a concurrent lifecycle act" contradicts the verb it copies and stops the build.
about: [system/oats-kernel]
kind: lesson
id: ins-13b5d14c244e
tags: [kernel, lifecycle, claims, presentation, specs]
timestamp: 2026-11-19
---

# Discovery

The verbs that write a home's presentation facts (`oats instance color`, `background`, `same-work` and,
since 2026-11-19, `pin`) refuse in one sequence: each refuses a quarantined home and a pending retire marker
itself, then calls the shared guard `refuseBesideRetire` in lib/core.mjs (which `oats worktree add` also
uses). Together they answer:

- **E_INSTANCE_RETIRING** while a live retire holds the home's lifecycle claim, its retire marker is
  pending, or the home is quarantined;
- **E_LIFECYCLE_BUSY** only for a lifecycle claim that can't be read, or a retire holder whose liveness
  can't be read.

The authority for the cases is the verb's refusal table in docs/desktop-cli-api.md (for `pin`, "Pinned
instances"); this lesson is about writing a spec that agrees with it.

Beside a live stop, start or upgrade the verb goes through. That's deliberate. Each fact is its own home file
and a kernel home receipt, so none of those acts writes it and nothing races it. Starts hold the claim for
their whole length, so refusing would fail the verb for the whole of every start.

# What it cost

The spec for `instance pin` said both "the same refuseBesideRetire as `instance background`" and "a
concurrent lifecycle act: E_LIFECYCLE_BUSY". The first review round ranked the gap major, and the developer
stopped to ask the lead which line held. The lead kept the background behaviour, and the docs' refusal table
now states the cases exactly.

# How to apply

When a spec adds or changes one of these verbs, write its refusals as the guard answers them (above), or
just "refused exactly as `instance background`". Don't use the general phrase "a concurrent lifecycle act".

# Evidence

Evidence: OKF proposal from oats-engineering-expert/sidebar-pinned-instances-lead, 2026-11-19;
notes/presentation-verbs-refuse-only-beside-retire.md. Observed in review round 1 of the `instance pin`
kernel change, merged as [oats-project/oats#1967](https://github.com/oats-project/oats/pull/1967), whose
docs/desktop-cli-api.md "Pinned instances" refusal table records the cases.

Maintainer review of [oats-knowledge#412](https://github.com/oats-project/oats-knowledge/pull/412) checked
oats-project/oats#1967 at its merge `a7473d55`: lib/instance-lifecycle.mjs gives `instance color`,
`background`, `pin` and `same-work` the same quarantine and retire-marker checks followed by
`refuseBesideRetire`; that guard refuses only for an unreadable claim or a retire holder that is not gone;
and the "Pinned instances" table states the cases and that a pin goes through beside a running stop, start
or upgrade. The spec's two lines, the review round's ranking and the lead's ruling are the source's report.
