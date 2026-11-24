---
type: Decision
title: A flaw found just before a tag that is no regression ships as a Known line, not a held tag
description: The release lane holds a prepared tag only for a flaw that makes the release worse than the previous one for a deployment, checked against the previous tag's code; otherwise the notes name it under Known with its workaround and the fix goes in the next release, and an infra-only PR that would force the prep PR's CI to run again lands after the tag unless that run actually needs it.
about: [workstream/oats-direction]
tags: [stewardship, release, notes, regression, ci]
timestamp: 2026-11-24
---
**Owner: oats-maintainer. Update-on-change: whoever changes when a prepared
tag is held revises this concept in the same change.**

# Decision

Taken by the release lane on oats-bb v0.4.0, 2026-11-24.

- **Hold the tag only for a regression:** a flaw that makes the new release
  worse than the previous one for a deployment. Settle that from the previous
  tag's code, not from memory or from the fix's description.
- **Otherwise, a Known line.** The release notes name what a person sees and
  the workaround, and the fix goes in the next release (released as it lands:
  [releases are cut as fixes and features land](releases-are-cut-as-fixes-and-features-land.md)).
- **Infra-only PRs wait for the tag** (a CI timeout raised, say) when merging
  first would move the prep PR's head and force its CI and second read again.
  If the prep PR's own run actually hits the problem, the infra PR lands first.

# Why

Every new head on a prep PR costs a full CI run and a second read. Holding a
tag for a fix that is no regression delays everything queued behind the tag.
On v0.4.0 that was a pilot's PRs.

# Evidence

oats-bb v0.4.0 (tag on the #69 merge commit, 2026-11-24). A stale-window flaw
in the plugin was found just before the tag. v0.3.0's `app/store.ts` had the
same read path, so it was no regression: 0.4.0 shipped with a Known line. The
CI timeout raise waited for the tag, and the prep PR's run (41m58s against a
45-minute limit) passed.

Evidence: OKF proposal from oats-maintainer/release-maintainer, 2026-11-24; notes/known-flaw-before-tag.md.
