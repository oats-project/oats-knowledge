---
type: Lesson
title: A new field on the kernel's status rows needs the golden fixtures regenerated; the feature's own tests don't catch it
description: PR CI's golden status fixtures and the unreadable-record test pin exact rows; regenerate with UPDATE_GOLDEN and update those row assertions in the same change.
id: ins-d6286cfebafc
about: [system/oats-kernel]
kind: lesson
tags: [kernel, status, golden, tests, ci]
timestamp: 2026-11-20
---

Adding `board` to every status row passed the feature's own tests, then failed three PR CI jobs: the
golden status.json fixtures and test/unreadable-record.test.mjs pin exact rows. Regenerate with
`UPDATE_GOLDEN=1 UPDATE_GOLDEN_ARTIFACT=status.json node --test test/golden-fixtures.test.mjs` (a full
run: see [the name-filter trap](/claims/lessons/update-golden-with-a-name-filter-prunes-skipped-cases.md))
and update the row assertions in the same commit. Plan it into any kernel spec that adds a row field.

Evidence: OKF proposal from oats-engineering-expert/desktop-rework-lead, 2026-11-20; oats-project/oats PR 1998; notes/kernel-row-field-goldens.md.
