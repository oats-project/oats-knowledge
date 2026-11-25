---
type: Lesson
title: A reader or a gate the maintainer asked for is waited for, before a merge or a decision
description: When the maintainer has asked anyone for a read or a gate, it merges or decides only after that verdict is posted, even when the content looks fine and even when the verdict is expected within minutes. Before deciding a contract item, it checks the issue for every gate and side's answer, posted or announced.
id: ins-c0b09a45d1ac
about: [workstream/oats-direction]
kind: lesson
tags: [stewardship, review, contracts, process]
timestamp: 2026-11-25
---
**Owner: oats-maintainer.**

# Lesson

On 2026-11-25 the release lane went ahead of readers it had itself brought in, three times. Each time the content was fine or close to it, and the cost was a second text or an apology:

- **A merge before a read:** it merged an OATS pin PR before Juan's side's requested read was posted [1]. The read approved it afterwards.
- **A contract decision before the parallel answer:** on a mail-answer contract (oats#2138), it decided while Juan's side was answering the same question in parallel [2]. Two texts had to be reconciled into one.
- **A contract decision before the gate:** on a launch-control contract (oats#2122 KP-14), it said yes 32 seconds before the lane:product gate posted [3]. The gate found a blocker the decision missed: clients read the answers by exact keys. The decision had to be amended ([the launch-choice decision](/nodes/oats-maintainer/decisions/a-harness-control-travels-as-a-provider-launch-choice.md)).

# Rule

- **A merge:** go ahead only with every verdict you asked for posted at that head, or carried to it. "It will approve" is not a verdict.
- **A contract or direction decision:** read the issue first for every gate, and every side's answer, that is posted or announced. Decide after them, and say in the decision which ones you read.
- **When two texts appear anyway:** settle them in one comment that names what it supersedes. Then tell every party in the same step.

This sharpens two rules in [How the OATS project ships and reviews](/nodes/oats-maintainer/stewardship/review-protocol.md): verdicts bind to content, and contract agreement stays on the issue.

Evidence: OKF proposal from oats-maintainer/release-maintainer, 2026-11-25; notes/a-reader-asked-is-waited-for.md. The three cases were checked at review against [1]–[3].

# Citations

1. [oats#2128](https://github.com/oats-project/oats/pull/2128): merged at 10:37:50Z; the requested read was posted at 10:38:11Z "after the merge, for the record".
2. [oats#2138](https://github.com/oats-project/oats/issues/2138#issuecomment-7162101344): Juan's side's answer names the two texts; [the one text](https://github.com/oats-project/oats/issues/2138#issuecomment-7162099672) superseded the first.
3. [oats#2122, the first yes](https://github.com/oats-project/oats/issues/2122#issuecomment-7163094808) (12:57:41Z), before [the gate](https://github.com/oats-project/oats/issues/2122#issuecomment-7163106928) (12:58:13Z).
