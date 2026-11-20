---
type: Decision
title: A new official repository's code lands only through reviewed PRs
description: An official repository created empty gets a minimal seed commit (a README and OATS's MIT licence) from the release lane, and its first code lands as an ordinary PR on that main under the lane's agreements; pushing a working history as main is rejected.
about: [workstream/oats-direction]
id: dec-a630448f5b8c
tags: [stewardship, repositories, review, packaging]
timestamp: 2026-11-20
---
**Owner: oats-maintainer. Update-on-change: whoever changes how official
repositories are created, or who pushes to their default branch, revises this
concept in the same change.**

# Rule

When an official package or template repository is created empty, its first
commit is a minimal seed: a README and a byte-for-byte copy of the MIT licence
OATS ships, as in the other official packages. The release lane pushes it,
since it keeps the official repositories and their tags. The first real code
then goes in as an ordinary PR against that main and lands through the lane's
usual agreements at an exact head.

# Why

- An empty repository has no default branch, so a PR has nothing to target.
- Pushing a working branch's history as main, a "first import", lands the
  repository's first and usually largest change with no reader's verdict at any
  head: it skips every landing agreement at the point where they matter most.
- The seed costs one trivial commit that nobody needs to review.

# Rejected

- **Import the working history as main** and review it after the fact: a
  verdict after the push binds nothing.
- **Let the author push the seed:** a direct push to an official repository's
  default branch is the release lane's, not an effort's (the
  [release lane](/nodes/oats-maintainer/stewardship/release-lane-and-project-lanes.md)
  owns final review, merge and tags, and its gate is what protects the
  default branch).

# Evidence

This is the lane:setup maintainer's stewardship judgment of 2026-11-20,
source-reported; no human acceptance of it as a standing rule is recorded.

oats-project/oats-bb was added to `lane:setup` on 2026-11-19 while still
empty ([lane map, oats-project/oats#1566](https://github.com/oats-project/oats/issues/1566)).
When its first provider PR was ready, the lane:setup maintainer chose the seed
over an import, and the seed was pushed on 2026-11-20 so the provider could
open as a PR: oats-bb `main` is the single commit 4870c86a, holding only
`README.md` and `LICENSE`, whose blob is identical to the `LICENSE` of
oats-project/oats and oats-project/oats-okf.
Evidence: OKF proposal from oats-maintainer/joan-setup-maintainer, 2026-11-20; notes/new-package-repo-seed-commit.md.

# Citations

1. [oats-project/oats#1566](https://github.com/oats-project/oats/issues/1566),
   the lane map, read at maintainer review 2026-11-20: `lane:setup` lists
   oats-project/oats-bb, added 2026-11-19.
2. [oats-project/oats-bb@4870c86a](https://github.com/oats-project/oats-bb/commit/4870c86a96503bafa4d8860d4243bb56a14f4cc5),
   read at maintainer review 2026-11-20: the seed commit, `README.md` and
   `LICENSE` only.
