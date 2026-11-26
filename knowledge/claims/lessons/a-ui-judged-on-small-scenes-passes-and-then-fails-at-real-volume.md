---
type: Lesson
title: A UI judged on small scenes passes and then fails at real volume, so the worst-case data is the first thing any design or review opens
description: Every screen of the bb plugin was judged on scenes of 5 to 10 agents and an independent reader said yes. The first images on 60 agents showed three faults at once. Build the worst-case data set before the first design, and open it first in every review.
about: [workstream/positioning]
kind: lesson
tags: [design, review, worst-case, bb, ux]
timestamp: 2026-11-26
---

# Lesson

For a week the screens of the OATS plugin for bb were designed, reviewed and merged on scenes of 5 to
10 agents with short names. An independent UX reader gave them three looks and ended at "no safety
finding, no stopper; show it to the person". The person then set a rule: design on the worst-case
data (many souls, many agents running, many automation runs, full screens of text), "otherwise it's
cheating".

The first images of what was already merged, on 60 agents four levels deep with 13 asking, 24 souls
and 37 automations, showed three faults at once:

- eight sidebar rows of one effort read exactly alike, because long names were cut at the same place
  and what tells them apart is their end;
- a folded parent that asks, over a child that asks, showed two marks side by side;
- the home opened with 13 full cards, two and a half screens, before anything else.

None of these is visible at 10 agents. A reader's "yes" is only a yes to the data it was shown.

**The rule.** Before the first design of a list, a tree or a page of cards, build the worst-case data
set: the most items, the longest names, the deepest nesting, the longest text. Open it first in every
design, every scene set and every review, and the calm case second. A product lead asks a reviewer
"on which data?" before accepting its verdict.

**A limit.** A live stage that holds the worst case can be too heavy for small test runners (14 real
agents at once failed by load on 2-processor runners) and for a person's own machine (three such runs
together took its load to 38). Size the live stage to what the runner carries, and keep the full set
for by-hand runs, one at a time.

Evidence: OKF proposal from oats-product-expert/bb-investigation-lead, 2026-11-26; notes/bb-lead-final-lessons-2026-11-26.md.
