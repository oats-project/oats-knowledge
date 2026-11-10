---
type: Decision
title: Cache fetch negotiates before one whole-pack retry
description: A filtered cache keeps cheap negotiated fetches, then retries once without negotiation on an unknown failure because advertised commits can imply missing delta bases and negotiated non-thin HTTPS fetch was unavailable.
about: [system/oats-kernel]
id: dec-e5fd3127da42
tags: [kernel, git, cache, partial-clone, negotiation, retry]
timestamp: 2026-10-13
---
# Decision

The source records this choice on 2026-10-13: fetch a commit into the kernel's
remote cache with negotiation first; if the failure classifies as `unknown`,
make exactly one second attempt without negotiation. Report the second
attempt's own failure if it fails. Do not enable implicit missing-object
fetches to make either attempt succeed [1].

## The discovery behind the retry

Advertising a commit as a Git `have` does not prove that a filtered cache
holds every blob reachable from it. The source's investigation found that
the server could send a wanted blob as a delta against a larger version that
the cache's size filter had omitted. Completing that pack then required a
missing base; with lazy fetch forbidden, the fetch failed [1].

This needs no exotic repository: a file can cross the filter threshold as it
grows, shrinks or is split. Reading a head and then an older pin can expose
it. Moving the branch is not a reliable cure, and deleting the cache is not
a durable repair: the same head-then-pin sequence can recreate the state.
The conflict is between incremental negotiation's assumptions and the
intentional refusal of implicit fetch, not evidence of a broken network.
The security rationale for forbidding lazy fetch remains in
[the observation lesson](/nodes/oats-kernel-expert/lessons/observation-must-not-harm-the-observer.md);
this decision does not relax that boundary.

## Rejected alternatives and the cost accepted

- **Never negotiate.** The source reports this avoided the missing-base
  failure but made the common adjacent-head fetch much more expensive:
  about 5.88 MiB without negotiation versus 5.76 KiB with it. Across a
  measured sequence of 60 heads, the selected design transferred about
  7.7 MiB versus 301 MiB without negotiation. These are measurements of
  that experiment, not portable byte counts or a promised failure rate [1].
- **Keep negotiation but request a self-contained, non-thin pack.** This
  would remove the failed first attempt while preserving useful `have`
  information. The source checked Git 2.55: `git fetch` exposed no switch
  for it, while `git fetch-pack` without `--thin` supplied the needed pack
  but did not speak HTTPS. **Revisit this decision if the HTTPS-capable
  fetch path gains that control**; the workaround is not an intrinsic
  preference for failing first [1].
- **Retry only on a particular Git sentence.** The observed wording differed
  by transport and version. Use the failure classification, not a copied
  stderr phrase, to decide whether the single retry is allowed.

The failing case pays for one unsuccessful attempt and a whole pack. The
gate also makes classifier correctness part of recovery correctness: the
source found an object's hexadecimal id containing digits that matched an
`auth` status pattern, which would suppress the retry. Keep object ids out
of status-text matching; do not turn arbitrary object-id text into evidence
of authentication failure. The reason for preserving `unknown` is recorded
in [the CLI-boundary lesson](/nodes/oats-kernel-expert/lessons/machine-boundary-contract.md).

## Enforcement, not a permanent troubleshooting ritual

The elimination route is the kernel fetch policy and regression coverage:
a real filtered cache with a moved default branch and an older pin, transport
variants, a classifier case containing status-like object-id digits, and a
second failure that remains the final answer. The proposal reports regression
coverage in the implementation reference; this harvest did not execute it.
A future native non-thin fetch control is the architectural route to removing
the failed attempt. Temporary-file handling has its own
[age-bounded cleanup decision](/nodes/oats-kernel-expert/decisions/cache-fetch-cleanup-waits-out-possible-writers.md).

# Citations

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-launch-pins, 2026-10-13; notes/partial-cache-have-lines-assume-unfiltered-history.md; notes/cache-fetch-negotiates-then-retries-whole.md.

1. The proposal and named notes attribute the investigation, measurements and
   chosen design to [awebai/oats#1059](https://github.com/awebai/oats/issues/1059)
   and the implementation to [awebai/oats#1075](https://github.com/awebai/oats/pull/1075).
   They are source-reported evidence; this harvest did not reproduce the
   experiment, audit Git or the implementation, or independently establish
   human acceptance or release status.
2. Verified by the knowledge maintainer at review of the harvest on 2026-10-13. [awebai/oats#1059](https://github.com/awebai/oats/issues/1059) reports the failure, the delta base the cache's filter had left out, and the evidence separating it from the network: the same fetch succeeds into an empty repository and with negotiation turned off. [Comment 6135956782](https://github.com/awebai/oats/issues/1059#issuecomment-6135956782) records the chosen design, the adjacent-head and 60-head measurements, both rejected alternatives with the Git 2.55 limitation, and the object-id digits read as `auth`. [Comment 6136852135](https://github.com/awebai/oats/issues/1059#issuecomment-6136852135) reports a removed cache entry failing again on an older pin once rebuilt. [awebai/oats#1075](https://github.com/awebai/oats/pull/1075), merged on 2026-10-13 with both maintainer sides approving the head that merged, carries the single classification-gated second attempt, keeps lazy fetch forbidden on both attempts and names the regression fixtures. That Git's wording differed by transport and version appears in none of these; it rests on the source's notes, which this review did not read. The comments are maintainer-lane records posted from the two maintainers' accounts, not evidence of human acceptance, and no release was checked.
