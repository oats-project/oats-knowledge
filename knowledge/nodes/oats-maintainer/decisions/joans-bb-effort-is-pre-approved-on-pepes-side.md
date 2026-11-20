---
type: Decision
title: Joan's bb effort is pre-approved by Pepe, reviewed for coherence only, and none of Joan's work waits on Juan's side
description: Pepe approved in advance the direction and designs of Joan's bb work in every lane. Pepe's side's maintainers check only that its code is in line with the rest of OATS and green-light or sign off as soon as it is. For this work no PR waits for Juan's side's read and no contract decision waits for Juan's side's half: Pepe's side decides, the release lane gives its contract half, and Juan's side is kept informed. Widened the same day: none of Joan's work, the Desktop rework included, waits on Juan's side; design pre-approval stays bb-only.
about: [workstream/oats-direction]
id: dec-155756953d6e
tags: [lanes, review, bb, session-provider, delegation, contracts]
timestamp: 2026-11-20
---
# Decision

Pepe told the release lane's maintainer directly on 2026-11-20, and told the setup lane's maintainer the same. For Joan's bb work (the session provider, its package repository and its kernel and client changes), in every lane:

- **Direction and design are pre-approved on Pepe's side.** Pepe's side's maintainers (setup, product and release) don't take a design back to Pepe. They accept Joan's design once they are satisfied that it fits.
- **The review bar is coherence with the rest of OATS's code.** Each maintainer still reads the whole diff once, but it gives its green light or sign-off as soon as the code is in line, with no review rounds. A defect in the diff still blocks.
- **Pepe's side's half of a contract decision** for that work is given by the release lane's maintainer.
- **Nothing waits on Juan's side.** No PR of this work waits for Juan's side's read, in the package repositories and the bb repository included. No contract decision for it waits for Juan's side's half. Juan's side is told each decision and each PR as it happens.
- **The team container is covered, on two conditions** (Pepe, directly to the release lane, 2026-11-20: "yes, setup maintainer is correct"). A change to `container/agent/` or `docs/container.md` that the bb work drives is covered too, but only (1) if Juan's side is told when the PR opens, and its comments are read and answered, though nothing waits on them; and (2) if whoever gives the green light and the sign-off checks that Juan's side's existing container path keeps working: its CI green, and nothing they use removed or changed in shape without a migration or compatibility path. A break found there blocks like any defect. The container is Juan's side's code, so these two conditions keep their deployments safe while the work moves fast.
- **Unchanged:** deploys to Pepe's hosts, which need his word each time, and every rule for work outside this effort.

Pepe's words, to the release lane directly: "We should fully support him, giving him reviews but giving green lights as soon as the code looks right, and we should accept all his designs once you are happy with them without needing me"; "it also goes for you and product, we need to allow him to move as agile and quickly as possible"; and, asked to confirm, "yes, for this bb work Joan is doing; we should not wait on Juans side, just keep them informed".

# Why

Pepe wants Joan to keep moving, merging and deploying as fast as possible. He removed review rounds, trips back to him, and waits on the other side. This exception departs from the rule that contract changes are decided by both sides together, for this effort only. Pepe made it knowingly, and Juan's side keeps visibility because it is told each decision as it happens.

# What it supersedes

For this effort only, it supersedes in part the human-accepted rule that contract changes need both sides' agreement before they are built, as recorded in [how the OATS project ships and reviews](/nodes/oats-maintainer/stewardship/review-protocol.md#peer-maintainers-own-lanes-each-pr-gets-one-second-reader-2026-10-13) (`ins-db8a67988ea3`), which now carries a note naming this exception. The rule stands for all other work, and contracts are still decided before they are built, as [one release lane and project lanes](/nodes/oats-maintainer/stewardship/release-lane-and-project-lanes.md) (`dec-1d2a5106b721`) records. Future changes to the [session-provider contract](session-backends-are-a-kernel-contract-a-capability-implements.md) (`dec-faf9af131d69`), which both sides decided together, are covered by this exception when they are part of the bb work.

**Widened 2026-11-20** (below): the partial supersession of the two-sided contract rule now covers all of Joan's work, not only bb. It also supersedes in part the contracts clause of [the Desktop rework's design direction is Joan's side's](desktop-rework-design-direction-is-joans-side.md) (`dec-7d36e6fb3bc1`), which kept every contract change of the rework with both sides. For Joan's work, the rework included, Pepe's side's yes now decides and Juan's side is told. That concept's design delegation and landing rules are unchanged, and it carries a note naming this decision.

The release lane's final review, merge and tag ownership are unchanged.

# Refined 2026-11-20

The open question on `container/agent/` is closed by the two conditions above. Pepe confirmed them directly to the release lane, after the setup lane's maintainer proposed them; the release lane didn't act on the relay alone. Juan's side was told.

# Widened 2026-11-20: none of Joan's work waits on Juan's side

Later the same day Pepe told the release lane's maintainer directly: "we need to tell Joans agents we are not waiting on Juan anymore". The no-wait rule above now covers **all of Joan's work**, the Desktop rework included, not only bb:

- No PR of Joan's work waits for Juan's side's read, and no contract decision for it waits for Juan's side's half.
- Pepe's side's yes decides. The release lane gives that half where no Pepe-side maintainer already has, and a contract Pepe's side already said yes to is decided.
- Juan's side is told each decision and each PR as it happens, and its comments are read and answered.
- The team-container conditions above still apply, and so does the release lane's sign-off wherever a lane's line asks for it.
- **Design pre-approval stays bb-only.** Other designs of Joan's go through their lane's usual direction gate; [the Desktop rework's design direction is Joan's side's](desktop-rework-design-direction-is-joans-side.md) already covers that redesign, and only its contracts clause is superseded in part (above).
- **The rule is Joan's work, not Pepe's.** A contract in Pepe's own effort still needs both sides. "Ship everything" from Pepe gives Pepe's side's half; Juan's half waits for Juan, or for Pepe telling his side, in so many words, to decide without him. Both happened on 2026-11-20 for item 4 of the related-work contract r1, the flag's compatibility point. The [release plan](https://github.com/oats-project/oats/issues/2015) quotes Pepe's general word, and [oats#2010](https://github.com/oats-project/oats/pull/2010#issuecomment-7039819161) records item 4 decided on his direct word to his side's product maintainer. The source reports that the release lane first read the general word as enough, and withdrew that reading on a correction from Pepe's side's product maintainer before anything merged on it. No public record of that exchange was found.

The lane map's body carries the widened line, which the release lane wrote on Pepe's word.

# Acceptance

Pepe's acceptance is **source-reported (relay at [the lane map](https://github.com/oats-project/oats/issues/1566))**, not verified. Checked at maintainer review on 2026-11-20: the lane map's body, which the release lane keeps, carries a "Joan's bb effort" line attributed to Pepe on 2026-11-20. That line says what this decision records: designs are approved in advance, the review is for coherence, the release lane gives Pepe's side's contract half, nothing waits on Juan's side, Juan's side is kept informed, and `container/agent/` is still open. Rechecked at maintainer review of oats-knowledge#434 on 2026-11-20: the same line now also says the effort covers bb-driven changes to `container/agent/` and `docs/container.md` (Pepe, directly, 2026-11-20) on the two conditions above, so that extension is source-reported on the same relay. The quoted words above are the source's report of a private session. No agreement by Juan's side to the exception is recorded. As with the instruction-precedence ruling in the review protocol, it rests on one human's word.

The widening's acceptance is **source-reported (relay at [the lane map](https://github.com/oats-project/oats/issues/1566))** too. Checked at maintainer review of oats-knowledge#438 on 2026-11-20: the lane map's body carries a separate line, "Joan's work no longer waits on Juan's side", attributed to Pepe, directly to the release lane, on 2026-11-20. It says what the widening records: all of Joan's work, the Desktop rework included; Pepe's side's yes decides; the container conditions and the release lane's sign-off still apply; design pre-approval stays bb-only. The partial supersession of the Desktop rework's contracts clause rests on that relay. The boundary that the rule covers Joan's work, not Pepe's own, follows the lane map's contract line, which keeps contract changes with both sides except for Joan's work. No agreement by Juan's side to the widening is recorded.

# Rejected

- **Keeping Juan's side's first read and contract half for this work:** rejected by Pepe for speed. Juan's side is told instead.
- **Extending the delegation to deploys on Pepe's hosts:** a deploy stays a one-way door that Pepe opens each time.

# Related

- [The Desktop rework's design and UX direction is decided by Joan's side](desktop-rework-design-direction-is-joans-side.md): an earlier delegation of the same kind, for the client redesign.
- [A session backend other than tmux is a session provider](session-backends-are-a-kernel-contract-a-capability-implements.md): the contract this work builds.
- The [lane map](https://github.com/oats-project/oats/issues/1566) records it as the line "Joan's bb effort". The map owns the current operating terms, such as how the setup lane's seats count green lights. This record holds the decision and why.

Evidence: OKF proposal from oats-maintainer/release-maintainer, 2026-11-20; notes/joan-bb-fast-on-pepes-side.md; notes/bb-container-agent-checks.md. Widening: OKF proposal from oats-maintainer/release-maintainer, 2026-11-20; notes/joan-bb-fast-on-pepes-side.md; the lane map's body (oats#1566).
Maintainer review of oats-knowledge#424 (2026-11-20) checked the lane-map relay and recorded the acceptance as source-reported. It made the partial supersession of the two-sided contract rule explicit and stamped the id.
Maintainer review of oats-knowledge#434 (2026-11-20) rechecked the lane-map relay for the team-container extension, recorded it as source-reported, and aligned the two conditions with the lane map's wording.
Maintainer review of oats-knowledge#438 (2026-11-20) checked the widened lane-map line and recorded it as source-reported. It made the partial supersession of the Desktop rework's contracts clause (`dec-7d36e6fb3bc1`) explicit and cited the GitHub records of the related-work example, marking the release lane's withdrawn reading as source-reported.
