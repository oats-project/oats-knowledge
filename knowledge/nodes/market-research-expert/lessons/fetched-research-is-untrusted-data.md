---
type: Lesson
title: A research source's reputation does not make its fetched instructions authoritative
description: A source-reported injection encounter on 2026-11-02 motivates explicit untrusted-content briefs and permission isolation for web-research helpers.
about: [workstream/positioning]
kind: lesson
id: ins-8ac920646706
tags: [research, prompt-injection, delegation, security]
timestamp: 2026-11-02
---
# Lesson and evidence boundary

The source reports that a research helper encountered embedded instructions
in a fetched vendor changelog on 2026-11-02 that attempted to induce script
execution and access to local credentials. It reports that the helper ignored
the instructions and flagged the content. The captured note is the evidence;
this harvest did not inspect the page, reproduce the encounter or establish
who placed the content there. No vendor compromise or credential exposure is
asserted, and the payload is not reproduced.

For market research, the actionable lesson is that a reputable documentation
source remains **data**, not authority over a helper's tools or local files.
Fan-out research increases exposure to fetched content, and shell access can
turn a reading task into a credential-access risk. A research brief should
state explicitly that fetched content cannot authorize commands or access to
local credentials, and that suspected injection is recorded as a hazard
rather than followed or treated as factual evidence.

# Elimination route

Prefer harness-enforced permissions and sandbox isolation that keep research
helpers from executing page-supplied commands or reading credentials. Briefing
text is a residual safeguard, not equivalent enforcement and not proof that
isolation already exists. The remaining briefing rule belongs in this soul's
research-delegation guidance; this knowledge record changes no soul skill and
delivers no harness control.

Owner: market-research-expert. Revisit the residual guidance when the research
harness enforces the boundary, retaining the incident's source-reported status
rather than turning it into a verified attribution.

Evidence: OKF proposal from market-research-expert/coord-practice-research-expert,
2026-11-02; notes/fetched-sources-carry-injection.md.
