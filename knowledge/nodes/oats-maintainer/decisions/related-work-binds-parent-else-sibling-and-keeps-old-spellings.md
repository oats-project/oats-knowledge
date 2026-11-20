---
type: Decision
title: Related work binds the recorded parent, else the recorded sibling, and the same-work spellings stay as aliases
description: The kernel's same-work flag becomes the related-work flag. It binds a home's recorded parent, else its recorded sibling. The old spellings, row field and home file keep working as deprecated aliases until their removal is decided as its own contract change.
about: [workstream/oats-direction]
id: dec-4034b6ca6513
tags: [clients, lineage, contracts, compatibility, rejected-alternatives]
timestamp: 2026-11-20
---
# Decision

Related-work contract r1, decided by Pepe's side and Juan's side on 2026-11-20, extends the declared-shared-work flag of [parent-child lines require declared shared work](/nodes/oats-maintainer/decisions/parent-child-lines-require-declared-shared-work.md) (`dec-97cfed58e463`). It supersedes in part only that record's binding to the parent alone.

- **The binding.** The flag is now "related work". It binds the home's recorded parent when it has one, else its recorded sibling, so a top-level instance's sibling can carry it too. The kernel only records and reports the flag; how a client shows it stays a client design decision (for the Desktop, [the Desktop rework's direction](/nodes/oats-maintainer/decisions/desktop-rework-design-direction-is-joans-side.md) and what supersedes it).
  - It holds only while that edge is still the home's: a relink makes it read off, never an error.
  - A home that records neither a parent nor a sibling is refused, and nothing is created.
  - The declaration-only rule and the capability-owned coordination policy of the earlier record stand.
- **Backward compatibility (item 4): the old spellings stay.**
  - `--same-work` and `oats instance same-work` are aliases, with one deprecation line on stderr and no change to `--json`.
  - Rows carry `sameWork: true` beside `relatedWork: true` for a parent binding only, never alone.
  - The old home file reads as a parent binding while the new file is absent. The first write of the new file removes it, and `off` removes both.
- **Removing the aliases** is its own contract change, decided by both sides, with its own release-notes entry.
- **An older host** isn't a compatibility layer of ours. Toward a host that advertises only the old feature, a parent binding goes in the old spelling. A sibling binding is refused before anything is sent, and never dropped. This follows [an older host degrades with a warning](/nodes/oats-maintainer/decisions/an-older-host-degrades-with-a-warning.md).

# Why

Running homes keep the skills they were spawned with, and their copied teaching and operators' scripts use the old spellings. A rename that refuses them breaks every un-upgraded home at once, for a presentation flag. Keeping aliases costs one module's compatibility branch, and it lets the teaching move only after every host it runs against has the new kernel.

# Rejected alternatives

- **A hard break:** refuse the old spellings with a "renamed" error, report only the new row field, and give in the notes the command to set the flag again. It was built first, held from merging while item 4 was open, and replaced before release by the compatibility layer. It breaks copied skills and scripts immediately, and it gains nothing a deprecation line doesn't.
- **A sibling binding sent to an older host as a parent binding,** or dropped: that would record a relation the person didn't declare, or lose one silently.

# Acceptance

Pepe's side's half was given by its maintainer under Pepe's standing contract delegation (source-reported). Item 4 was decided on Pepe's direct word to that maintainer (2026-11-20) without waiting for Juan's own answer, and Juan's side was told. The acceptance is **source-reported (relay at [oats-project/oats#2010, comment 7039819161](https://github.com/oats-project/oats/pull/2010#issuecomment-7039819161))**: the maintainer's record lifting the hold on Pepe's direct word, checked at review.

Built in oats-project/oats#2010 (kernel) and #2011 (clients), both merged 2026-11-20; their release-notes entries are in the 0.69.23 release prep (oats-project/oats#2018, open at review).

Evidence: OKF proposal from oats-maintainer/product-maintainer, 2026-11-20; notes/related-work-r1-decision.md.
