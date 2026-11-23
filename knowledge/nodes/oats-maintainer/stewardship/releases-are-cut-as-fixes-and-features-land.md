---
type: Decision
title: Releases are cut as fixes and features land, without asking the person
description: The release lane releases OATS and the official packages as soon as a fix or feature is merged on a green main, without asking its person first and without batching it for a later release; the plan, the second read of the prep and the verification still apply, and deploys to hosts still need the person's word each time.
about: [workstream/oats-direction]
id: dec-722683c05dc3
tags: [stewardship, release, cadence, authority, deploy]
timestamp: 2026-11-23
---
**Owner: oats-maintainer. Update-on-change: whoever changes when the release
lane releases, or what it may do without asking, revises this concept in the
same change.**

# Decision

Decided by Pepe, the release lane's person, on 2026-11-23: releases are cut
as fixes and features land, without asking him.

- **When.** Once a merged fix or feature is on a green main, the release lane
  plans and ships the release that carries it. It doesn't hold a merged change
  back for a larger release, and doesn't ask its person whether to release.
- **What still applies.** The written plan (where the lanes agree what goes
  in), the release-prep PR with its second reader, the gates of the live
  release contract, tagging the exact merged SHA and verifying what was
  published. Releasing promptly removes the asking, not the agreements.
- **What it does not cover.** A deploy to a host is still a one-way door kept
  for the person: their word each time, release by release.
- **Relation to earlier authority.** This supersedes the standing rule that
  a kernel tag `vX.Y.Z` waits for the person's direct go, each time (the
  [release lane's 2026-10-28 hand-over](https://github.com/awebai/oats/issues/1566#issuecomment-6475980012),
  recorded in the
  [onboarding delegation](/nodes/oats-maintainer/stewardship/release-lane-and-project-lanes.md#onboarding-redesign-delegation-2026-10-30)
  and the
  [release-only review decision](/nodes/oats-maintainer/stewardship/onboarding-redesign-release-only-review.md)).
  The release lane now tags without that go once a change lands. It does not
  supersede the deploy rule, and it grants no project lane release authority:
  the release lane still owns the final review, the merge and every tag.

# Why

A fix that is merged but not released reaches nobody. The person had asked
whether a Desktop fix was deployed. It had been merged for hours and was in
no release, because the lane was waiting to batch it with other changes.

# Rejected

- **Batching merged changes into a planned release:** this is what the
  decision replaces. It delays fixes the person is waiting for, and the
  release machinery is cheap enough to run per change.
- **Asking the person before each release:** releases already rest on their
  standing authority, so a question before each one adds latency and no
  decision.

# Acceptance and supersession

Acceptance is **source-reported**: the release lane reports that Pepe gave
this direction directly in its session on 2026-11-23. The knowledge
maintainer did not read that session, and this is not verified as the
human's own words. The public record confirms the circumstances and the
first application. The Desktop fix
([oats-project/oats#2105](https://github.com/oats-project/oats/pull/2105))
merged at 11:00 UTC that day, and the plan
([#2106](https://github.com/oats-project/oats/issues/2106)) was opened at
13:33. v0.70.6 was published at 14:19 and verified on the plan.

The proposal called this a refinement of a standing "may release" go. The
knowledge maintainer recorded it as a supersession at review (2026-11-23):
the hand-over's recorded rule was a direct go for each kernel tag.

Relates to: [one release lane](/nodes/oats-maintainer/stewardship/release-lane-and-project-lanes.md);
[release judgement for the tag-driven lane](/nodes/oats-maintainer/stewardship/release-traps.md).

Evidence: OKF proposal from oats-maintainer/release-maintainer, 2026-11-23; notes/release-cadence-as-landed.md. The first release under it was OATS 0.70.6 (plan oats-project/oats#2106, prep #2107).
