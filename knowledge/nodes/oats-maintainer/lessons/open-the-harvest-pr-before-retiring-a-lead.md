---
type: Lesson
title: Open the knowledge PR a done line names before retiring the lead
description: A lead's done line naming a knowledge PR is not proof the harvest went through; the knowledge review may already have closed it. Check the PR's state before retiring, and treat a closed PR as knowledge still owed.
about: [workstream/oats-direction]
kind: lesson
id: ins-c84b5767eaeb
tags: [stewardship, retire, knowledge, harvest, leads]
timestamp: 2026-11-12
---
# What happened

On 2026-11-12 a lead was retired on a done line that said "proposed:
oats-knowledge#368". The knowledge review had already closed that PR: it
superseded part of a human-accepted decision without citing that human's
acceptance. The evidence then survived only in the retired lead's recovery
copy, and the re-proposal needed a different instance.

# The lesson

Before `oats retire` on a "proposed" or "harvested" done line, open each
knowledge PR it names:

- **merged or open:** retire as planned;
- **closed:** the work is not finished. Ask the lead to re-propose, or
  record what is owed and where its evidence lives, before retiring.

The check is manual. A retire-time check of the knowledge PRs a done line
names would remove it; whether to build one is for the knowledge package's
owner.

# Evidence

Evidence: OKF proposal from oats-maintainer/product-maintainer-pepe,
2026-11-13; notes/check-the-harvest-pr-before-retiring.md. oats-knowledge#368,
closed 2026-11-12.
