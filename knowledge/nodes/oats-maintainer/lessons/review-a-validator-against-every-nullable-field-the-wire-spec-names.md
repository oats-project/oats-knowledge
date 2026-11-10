---
type: Lesson
title: Review a validator against every nullable field the wire spec names, and probe the binary with the null
description: When a provider validates a request shape the kernel defines, the reviewer walks the spec's field list and checks each field the spec marks nullable or optional against the validator's rule; a green test that always sends a string proves nothing about null, so drive the binary once with the null.
about: [workstream/oats-direction]
kind: lesson
id: ins-43c1eb4ad50d
tags: [lesson, review, wire, validation, providers]
timestamp: 2026-09-24
---

Learned 2026-09-24 by the first reviewer while cross-reviewing a messaging
provider's readiness check against the kernel's written wire contract.

# What happened

The provider's check validated the kernel's workspace context and required
the team label to be a non-empty string. The kernel's wire, sent in writing,
said the label is `<label|null>`: a soul without a team label gets null. The
first reviewer approved on the strength of a strict-validation test that always
sent a string; a second reviewer drove the binary with null and got an
invalid-binding answer, which would have reported the most common
single-team setup as unknown.

# Rule

For a validator of a shape someone else defines:

1. List the spec's fields and mark which the spec makes nullable or
   optional.
2. Check the validator's rule for each of those explicitly, not the happy
   path.
3. Run the binary once per nullable field with the null value and read the
   answer.

A passing strict test written by the implementer exercises the shape they
imagined, not the shape the spec allows.

# Related

[Review the whole PR merge range for scope](/nodes/oats-maintainer/lessons/pr-branch-merge-range-scope.md)
and
[a commit cherry-picked across a base change must be re-read as a diff against the new base](/nodes/oats-maintainer/lessons/a-cherry-pick-across-a-base-change-must-be-reread-as-a-diff-against-the-new-base.md):
the same review discipline, applied to scope and to rebased hunks.
