---
type: Lesson
title: Before telling a builder to reuse an existing rule, check which way it fails in the new use
description: A rule that is safe where it was written can fail the wrong way for a new question. Read the rule and ask what a wrong answer costs in the new use before recommending it, and ask the same of a claim that a reader "ignores what it does not read".
about: [workstream/oats-direction]
kind: lesson
id: ins-cc7c3756c294
tags: [lesson, direction-gate, reuse, contracts, review]
timestamp: 2026-11-25
---

Learned 2026-11-22 and 2026-11-25, in the gate of a session provider's contract.

**Two cases, one mistake.**

1. A provider needed to tell a home from a new home made later at the same path. The gate told it to compare "by the kernel's own directory rule", which had just been fixed for a filesystem whose device number changes at each boot. That rule answers "is this still the home I started" and treats an equal inode on an equal device as the same directory. For the provider's question a reused inode is exactly the threat: a new home could have matched an old record. The other side's maintainer caught it; the provider got a stricter rule of its own.
2. A text said an older kernel "ignores what it does not read" in a provider's answer. The kernel judges a provider's answer by exact keys, so an older kernel would have read every such row as unreachable. The build caught it, after the gate had said go.

**What to do.** Before recommending a rule for reuse, read it and state what a false "yes" and a false "no" each cost in the new use. Before accepting that a reader ignores something new, read how that reader validates: the clients' decoders, and the kernel's reading of a provider's answer, are both exact in places.

See [an "additive" answer-shape change is shown reader by reader](/claims/lessons/an-additive-answer-change-is-shown-reader-by-reader.md), which holds the general rule for answers; this lesson is the gate's own habit behind it.

# Citations

1. Evidence: OKF proposal from oats-maintainer/joan-product-maintainer, 2026-11-25; notes/maintainer-gate-lessons.md. Both cases are the source's report; the second matches point 4 of the lane:product gate on [oats-project/oats#2122, comment 7163106928](https://github.com/oats-project/oats/issues/2122#issuecomment-7163106928) (the clients read launch answers by exact keys), read at maintainer review.
