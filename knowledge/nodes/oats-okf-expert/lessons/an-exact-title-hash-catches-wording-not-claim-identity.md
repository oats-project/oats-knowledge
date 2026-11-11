---
type: Conclusion
title: An exact title hash as verdict identity catches wording, not claim identity
description: In the design's probe an exact title hash matched 0 of 180 paraphrased titles (and all 60 case and whitespace controls), a lexical union of title and summary similarity found 144 of 180 with a wrong candidate on 6 queries, and neither tells a denial from the claim it denies; so a verdict's identity is a maintainer-assigned stable id, the title hash is only an exact-wording shortcut, and any similarity lane retrieves candidates for a reviewer, never a verdict.
about: [system/oats-okf, workstream/knowledge]
kind: finding
id: ins-5c191eb24102
tags: [conclusion, okf, verdicts, identity, title-hash, probe]
timestamp: 2026-11-10
---

# What the probe measured

Sixty concepts sampled from the accepted base (418 concepts), each retitled three ways (near-reordering, stronger
synonym reformulation, moderate reformulation or qualification), plus case and whitespace controls. An exact
type-and-title hash matched none of the 180 retitled queries and all 60 controls; a title-and-description hash also
matched none. A union of title Jaccard ≥ 0.30 or title-and-rewritten-summary Jaccard ≥ 0.20 retrieved 144 of 180,
with a different concept among the candidates on 6 queries. The thresholds were chosen after viewing the sweep, and
the 80% depends on the paraphrase mix (the stronger-synonym set alone hit far less), so these are synthetic rates,
not a production estimate.

Neither lane tells a denial from its claim: a description rewritten to deny the claim left the title hash unchanged
(60 of 60), and a title prefixed with "It is false that" still matched its source at title Jaccard ≥ 0.50 (60 of 60).

# What follows

A verdict is keyed by the maintainer-assigned stable id of the claim it ruled on; the title hash is an exact-wording
lookup that catches verbatim or normalization-only retries; anything lexical is retrieval of candidates for the
reviewer to judge, never a refusal by itself. 6.0 ships verdict lanes 1 and 2 (id and title hash) and not the
design's lexical lane (README, "The lexical lane of the design is not in 6.0").

# Evidence

- Probe P4 of the knowledge-base-by-subject design, 9–10 November 2026:
  `docs/design/2026-11-09-knowledge-base-by-subject-probes/p4-verdict-matching.md` on the oats-okf branch
  `agents/kb-by-subject-okf-expert` (commit 9fa18f0), not on main.
- Maintainer check at acceptance (11 November 2026): the figures above against that report, and the verdict lanes in
  the oats.okf 6.0.2 README and CHANGELOG.
- Backing note: the proposer's note on the exact title hash (proposal of 11 November 2026, live source
  kb-by-subject-okf-expert).
