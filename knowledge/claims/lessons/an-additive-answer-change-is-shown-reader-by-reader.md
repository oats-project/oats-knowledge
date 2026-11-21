---
type: Lesson
title: An "additive" answer-shape change is accepted only when the PR lists every reader with file:line, across the package and oats-project/oats, and a test feeds each one the new key
description: For a new key in a JSON answer, Juan's side accepts "additive" only on evidence: every reader listed with file:line (the package, the kernel's dispatch, the Desktop and clients, the vendored mirrors), a test per reader fed the key, and readers that pin exact shapes (deepEqual tests, argv-checking fakes, including one in oats-project/oats over a mirror) changed with it. Put that list into the contract question itself, and repeat it for every later field.
about: [workstream/coordination, workstream/provider-integration]
kind: lesson
id: ins-a77d2bb18625
tags: [lesson, contract, additive, readers, review, juan-side, mirror]
timestamp: 2026-11-21
---

# What happened

On oats-okf#123, three additive changes each went to both sides as a contract question:
- `repository` in `create`'s result and in `failed.published`;
- a new warning, `W_REPOSITORY_MOVED`;
- later, `repository` in the helper's `preflight` answer.

Each time, Juan's side's condition was the same: list the readers with file:line, including a grep of oats-project/oats (kernel and Desktop), and pin one test for each. Each review round then asked again for evidence about readers outside the range.

# How to apply

- Before asking, grep the package and oats-project/oats. In oats-project/oats that means `lib/`, `bin/`, `packages/` and `test/`; `mirrors/<package>` is the vendored released copy. When main has moved, read `gh api repos/<o>/<r>/compare/<a>...<b>` rather than fetching in someone else's checkout.
- Put the reader table in the question and in the PR body.
- A fake that pins the old argv in oats-project/oats, over a mirror, changes in the release lane's mirror-and-pin PR, not in the package PR. Say so to the maintainer.
- Give the reviewer, in the brief, a read-only scope outside the attached tree (a repository at an exact commit). Without one, every round asks for it.

# Canonical boundaries

Why "additive" depends on the reader is held elsewhere:
[a contract detail must widen closed client decoders](/claims/lessons/a-contract-detail-must-widen-closed-client-decoders.md)
(`ins-3672a4d3d397`) for decoders that refuse unknown keys, and
[a provider answer a shipped skill reads is relied-on output](/nodes/oats-maintainer/lessons/a-provider-answer-a-shipped-skill-reads-is-relied-on.md)
(`ins-c93673ea4b08`) for skills as readers. This lesson is the evidence the
other side asks for before it agrees a change is additive, and where to put
it so the question is answered once. A mirror fake that pins the old answer
is the release-time side of the same coupling, as in
[the release traps](/nodes/oats-maintainer/stewardship/release-traps.md).

# Evidence

- [oats-okf#169](https://github.com/oats-project/oats-okf/pull/169): the PR description's reader table (file:line and a test per reader, the oats-project/oats grep, and `test/okf-propose-branch.test.mjs:30` named for the mirror-and-pin PR); Juan's side's approval at `dff96544a444`, under `juanre` on 2026-11-21, names "Condition 1: readers" as one of its two conditions, with the table, the oats-project/oats finding and the mirror fake for the release lane ([comment](https://github.com/oats-project/oats-okf/pull/169#issuecomment-7067550574)) (verified at review).
- That the same condition was set for each of the three changes, and that each review round asked again, is source-reported from setup-maintainer's mails relaying Juan's side (oats-expert-juan), 2026-11-20 and 2026-11-21.
- Evidence: OKF proposal from oats-engineering-expert/okf-moved-repo-publication-lead, 2026-11-21; notes/contract-additivity-is-checked-reader-by-reader.md.
