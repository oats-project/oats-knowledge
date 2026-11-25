---
type: Lesson
title: A test's guard against one package's old version literals is scoped by how that package writes its version, not by the number
description: In the oats repository's tests over skill text, a negative regex for one package's old versions collides with another package's pin once their 1.x numbers overlap; exclude the other package's ref forms and pin both the passing and the failing case on the real text.
about: [system/oats-kernel]
kind: lesson
id: ins-aa6c92e689af
tags: [tests, skills, versions, oats.aweb, oats.framework, release-prep]
timestamp: 2026-11-25
---

# What was observed

`test/getting-started-steward.test.mjs` refused any `v1.31.x` or `v1.32.x` literal in the
getting-started skill (`doesNotMatch(flat, /…|v1\.3[12]\.\d/)`). The guard was meant for the
oats.aweb floors before v1.33.1. The same test requires the skill to show the catalog's framework
pin (`oats.framework: v${fw}`). Once release prep moved oats.framework to v1.31.0, the two
assertions contradicted each other and the release prep could not pass CI.

oats.framework and oats.aweb both number `1.x`, at different speeds. So a guard written by number
alone holds only until the other package reaches that range.

# The rule

- Scope such a guard by the form each package's version takes in the text. In the getting-started
  skill, oats.aweb refs are bare tags (`vX.Y.Z`). The framework's are `oats-framework/vX.Y.Z` refs,
  and the skeleton's pin is `oats.framework: vX.Y.Z`. A lookbehind that excludes the framework forms
  keeps every other old literal refused:
  `/(?<!oats-framework\/|oats\.framework: )v1\.3[12]\.\d/`.
- Pin both directions with substitutions on the real skill text:
  - a framework pin in the colliding range passes;
  - an old oats.aweb literal fails, in each place the skill writes one.

  Each substitution first asserts that its source text exists, so a reworded skill fails loudly
  rather than turning the case into a no-op.
- Rejected:
  - listing the oats.aweb contexts one by one, which misses an old literal in a new sentence;
  - dropping the guard, which loses the regression it was written for.

The landed test is this case's elimination: oats-project/oats `test/getting-started-steward.test.mjs`
(`OLD_AWEB_LITERAL`) now carries the scoped guard and both directions. The lesson stands for the next
negative version guard written over skill or doc text, where the same overlap can recur. It is the
version-literal sibling of [a provider pin that turns exact-argv negatives vacuous](/claims/lessons/a-pin-that-adds-a-flag-turns-exact-argv-negatives-vacuous.md):
a negative check is only trusted once a case that must fail is pinned beside it.

# Citations

1. Evidence: OKF proposal from oats-engineering-expert/getting-started-guard-lead, 2026-11-25.
2. Read at maintainer review, 2026-11-25: [oats-project/oats#2140](https://github.com/oats-project/oats/pull/2140)
   (tests only, merged as eb4bc66): the collision of the number-only guard with the framework pin
   once [#2136](https://github.com/oats-project/oats/pull/2136) moved oats.framework to v1.31.0,
   `OLD_AWEB_LITERAL = /(?<!oats-framework\/|oats\.framework: )v1\.3[12]\.\d/`, the source-text
   assertion before each substitution, and the three oats.aweb places that must fail.
3. Source-reported: the runs against #2136's head (the unchanged test failing only this test, the
   scoped one passing the file, an old oats.aweb pin making it fail) as reported on #2140, and the
   two rejected alternatives.
