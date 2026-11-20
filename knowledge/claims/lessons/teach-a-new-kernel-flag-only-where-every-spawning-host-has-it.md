---
type: Lesson
title: Teaching a new kernel flag in shared capabilities waits for every spawning host, or names both spellings by version
description: Capabilities a workspace takes as member modules from its default branch reach every host that spawns from them, whatever kernel each runs. A skill that starts teaching a flag only a new kernel accepts breaks every spawn on a host still on the older kernel, so it merges only once every such host, on every side, runs that release; a package with a lower compatibility floor names both spellings by version instead and needs no wait.
about: [workstream/coordination, system/oats-kernel]
id: ins-46b043566ae6
kind: lesson
tags: [capabilities, compatibility, release-order, spawning, holds]
timestamp: 2026-11-20
---

# What happened

On 2026-11-20 OATS's own coordination capabilities were changed to spawn with `--related-work`, a flag OATS 0.69.23
added. A reviewer spawn on a host still on 0.69.22 was refused (`oats spawn: unknown flag --related-work`). The
capabilities' floor stayed at `oats >=0.69.7`, and every deployment of the workspace takes them as member modules
from main, so the release lane
signed off with the hold lifting only once 0.69.23 ran on every host that spawns from them: Juan's side's as well as
Pepe's, not just the author's own. oats.framework, whose floor is far lower, taught the same rule naming
`--related-work` from 0.69.23 and `--same-work` before, and merged with no hold.

# How to apply

- Before changing a capability to use a new kernel flag, verb or field, check the capability's floor against the
  release that adds it.
- Either raise the floor (a new head, and the verdicts again), or hold the PR until every host that composes the
  capability runs the release (ask each side's maintainer, not only your own), or write the text version-conditional.
- A kernel rename that keeps the old spelling as an alias makes the wait safe: old teaching still works meanwhile.

A check that compared the flags a capability's skills teach with its compatibility floor would turn this review step
into a refusal; none was cited, so until one exists the step is the author's and the reviewer's.

Evidence: OKF proposal from oats-engineering-expert/sidebar-collapsed-sibling-lines-lead, 2026-11-20. oats-project/oats#2019 (open at review; its [hold](https://github.com/oats-project/oats/pull/2019#issuecomment-7040089878) and the release lane's [sign-off](https://github.com/oats-project/oats/pull/2019#issuecomment-7040530005), which widened the lift condition to every side's hosts), and #2022 (version-conditional, merged 2026-11-20 with no hold).
