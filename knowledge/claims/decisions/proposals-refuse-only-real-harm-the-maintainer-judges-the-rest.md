---
type: Decision
title: Knowledge proposals refuse only what causes real harm; the maintainer judges the rest, and the author still reads the diff before a public push
description: Decided for oats.okf 6.3.0, `oats okf propose` keeps hard refusals only for secrets and personal data leaving the host, a base that would be invalid, forged provenance, file safety, the soul's consent, credentials and one-attempt publication. Every other rule becomes a W_* warning that the knowledge maintainer resolves before merging. The typed digest goes, but the printed diff before the push stays, because the base is public.
about: [system/oats-okf, workstream/knowledge]
kind: decision
id: dec-acd554ff9428
decided-by: human
tags: [knowledge, propose, review, friction, personal-data]
timestamp: 2026-11-20
---

# The decision

Pepe's direction (2026-11-20, relayed by setup-maintainer): knowledge PRs should
have "a lot fewer rules and friction" and "rely more on the knowledge maintainer
judging it". Both sides decided cut list r1 on
[oats-project/oats-okf#164](https://github.com/oats-project/oats-okf/issues/164).
The build is [oats-project/oats-okf#165](https://github.com/oats-project/oats-okf/pull/165),
which targets oats.okf 6.3.0 and was open and unmerged at `07af566` when this
decision was accepted. Whether it ships as described is not verified here.

- **Still hard:**
  - the content screen;
  - changes to `okf-base.json`;
  - file safety (non-Markdown, hidden, executable, symlinked or out-of-root paths);
  - validator errors that would make the accepted base invalid;
  - a provenance block written by the proposer;
  - the soul's opt-out and the home's integrity;
  - credentials;
  - one attempt per proposal, with publication errors never retried.
- **Warnings the maintainer resolves (`W_*`, each naming the code it replaces):**
  - every other write-surface rule (was `E_SCOPE`, `E_OWNER`);
  - a claim's subject (was `E_SUBJECT`, and the `about:` validator errors), tolerated in a proposal as a missing `id` already is;
  - the `--strict` lints (broken links, unreachable concepts, a missing title or description);
  - a rejected id without `reconsiders:` (was `E_VERDICT`);
  - the shape of `proposal.md` and of the backing-note references.
- **Optional:** `--slug` and `--digest`; `proposal.md` (left unfilled, the PR text is built from the claims).
- **The maintainer's side (knowledge-review):**
  - every "Check warnings" row gets a recorded resolution (fixed, moved, or accepted with a reason) before the merge;
  - a proposal's write under `verdicts/`, or a workstream change without a person's cited acceptance, is not merged: the maintainer removes or rewrites that file first;
  - a delete or a supersession needs the maintainer's stated reason.

# Why

The upstream checks duplicated a gate the maintainer already held. The review
skill (at oats-okf `92c6306`, 6.2.0) already called the tool's write-surface
check advisory, because it runs with the proposer's own push rights. When #164
was written, the maintainer had merged 63 of the 66 `okf-proposal` PRs on
oats-project/oats-knowledge since 2026-11-11 (2 closed, 1 open), so the
friction was in the proposer's refusals, not in review. Moving those checks to
review loses nothing the maintainer did not already check.

**The diff read stays before the push.** The first recommendation dropped the
pre-push check altogether: `--apply` alone would check and publish. Pepe's side
kept the read and dropped only the ceremony:

- `--check` records the digest it printed;
- a bare `--apply` with no check behind it prints the check and stops;
- a second `--apply` publishes only unchanged bytes, and a changed proposal refuses `E_DIGEST`.

The reason: oats-project/oats-knowledge is public, so the push publishes before
the maintainer reads anything. The content screen cannot detect names, so the
author's look at the exact diff is the only personal-data check before
publication. That look is the author's judgment, not a guarantee, as
[personal-data exclusion is not a publication guarantee](/nodes/oats-okf-expert/decisions/personal-data-exclusion-is-not-a-publication-guarantee.md)
(`dec-d60b5a9ccd2d`) already holds. No single command was found that both puts
the diff in front of the author and pushes, so there are two; Pepe's side said
it would take a single command that kept the diff printed before the push.

**Rejected:** a single-step `--apply` that publishes without the author having
seen the diff (it loses the pre-push read on a public base), and keeping the
typed 64-hex digest (pure ceremony once `--check` records what it printed).

# What a future instance does differently

When lightening a check-then-review path again, it first lists which upstream
refusals the downstream judge already re-checks: those can become warnings. It
keeps every check that must run before content leaves the host, above all on a
public destination.

# Related

- It carries forward [direct knowledge proposals should retain doctrine and maintainer review](/nodes/oats-maintainer/stewardship/direct-knowledge-proposals-retain-maintainer-review.md)
  (`dec-ab8abe185811`): the maintainer's review gains the checks the proposer
  no longer refuses. It supersedes nothing.
- It extends the proposal-side tolerance of [readers tolerate a stale index and a missing id; writers refuse them](/nodes/oats-okf-expert/decisions/readers-tolerate-a-stale-index-and-a-missing-id-writers-refuse-them.md)
  (`dec-eb168e76219e`) from the missing `id` to a missing or unknown `about:`;
  the maintainer still regenerates, stamps and validates strictly before merge.

# Acceptance

Source-reported (relay on GitHub), both comments posted under Pepe's account by
setup-maintainer:
- Pepe's side's answer, which setup-maintainer gives as judged against Pepe's
  direction: [#164 issuecomment-7034856331](https://github.com/oats-project/oats-okf/issues/164#issuecomment-7034856331).
- The decision of both sides, with Juan's side's conditions:
  [#164 issuecomment-7034879849](https://github.com/oats-project/oats-okf/issues/164#issuecomment-7034879849).
  Juan's side's yes came from oats-expert-juan by aweb mail, which that comment
  reports and which was not inspected.

Pepe's direction is quoted from the relay in #164's body; Pepe's own words on
the cut list itself are not on the record.

Evidence: OKF proposal from oats-engineering-expert/knowledge-proposal-friction-lead, 2026-11-20; notes/cut-list-r1.md, notes/digest-kept-for-public-base.md, notes/write-surface-was-already-advisory.md.
