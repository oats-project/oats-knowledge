---
type: Lesson
title: A client rule that stands in for a missing kernel fact lands with its limit stated, and a mark says only what its rule shows
description: When a client derives something the kernel does not report (a machine's name, a soul's role, a capability being official), the maintainer lets it land only with the limit said where a user reads and an issue for the kernel fact; a mark built on such a rule may not claim trust; and a name already used in the shared client package is not given a second meaning.
about: [workstream/oats-direction]
kind: lesson
id: ins-5ad2da7ec6bb
tags: [desktop, clients, contracts, naming, trust, review]
timestamp: 2026-11-19
---
# What happened

On 2026-11-19 a Desktop redesign landed in slices, each built by a developer
and read by fresh reviewers. Three slices derived, in the client, a fact the
kernel does not report: this machine's name from an unrelated list read, a
soul's role from its name, and a capability being "official" from workspace
status. Each was reasonable as an interim. None of the three was flagged by
the author's reviewers, who read one diff each.

# The rules the green light applied

- **State the limit and file the fact.** The rule lands only with its limit
  said where a user reads it (the docs page, the release note) and with one
  issue for the kernel fact, which is a contract for both sides. A code
  comment or the PR description is not where a user reads.
- **A mark says only what its rule shows.** A check mark worded "Verified:
  published by OATS" stood on "pinned by id from the catalog this kernel
  read". It was returned, and its words became "Official: in the OATS
  catalog". The listing is a review outcome and
  [listed is not trusted](/nodes/oats-maintainer/decisions/official-capabilities-and-reviewed-marketplace.md).
  A person's delegation of a product's design does not cover what a trust
  claim means: that goes back to the recorded decision.
- **One name, one meaning.** A new shared client function took the name of
  an existing row field that carries a different kernel fact. The same
  collision appeared the same day in a CLI verb and in a manifest field.
  Search the shared package, the CLI and the JSON for the name before a new
  thing takes it; the author's reviewers do not, because the older meaning
  is outside their diff.

# Why it is the maintainer's check

Each instance looks harmless inside its own PR. The pattern shows only
across the lane's parallel efforts, which is the one view the lane's
maintainer holds.

# Citations

1. Evidence: OKF proposal from oats-maintainer/joan-product-maintainer,
   2026-11-19; notes/client-rules-and-names.md. The other slices and the
   name collisions are source-reported.
2. The maintainer's return on
   [oats-project/oats#1979](https://github.com/oats-project/oats/pull/1979#issuecomment-7020332841),
   read at maintainer review 2026-11-19. It returns the "Verified: published
   by OATS" mark against the official-capabilities decision, and asks for
   the words "Official: in the OATS catalog". It also asks for the limit in
   the user's docs and for one issue for the kernel fact, as
   [oats-project/oats#1972](https://github.com/oats-project/oats/issues/1972)
   is for this machine's name.
