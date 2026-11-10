# Knowledge log

## 2026-11-10

* **Update**: Bridge to the subject layout, by PR [#342](https://github.com/oats-project/oats-knowledge/pull/342): the reserved nodes [claims](/claims/index.md), [subjects](/subjects/index.md) and [verdicts](/verdicts/index.md) under a placeholder owner, 22 [subject files](/subjects/index.md) with generated views, and `about:`, `kind:` and `id:` frontmatter on all 429 concepts. No file moved and no concept body changed. The base declares 17 nodes.

## 2026-10-07

* **Creation**: Chartered the [oats-apps-expert](/nodes/oats-apps-expert/index.md) node for the package expert soul of `oats.apps` (capabilities `oats.folio` and `oats.library`, repository `oats-apps`): that package's facts, nothing cross-package; it reads the integrations node. The base declares fourteen nodes.

## 2026-10-03

* **Update**: The oats-expert node moved, notes unchanged, to [oats-maintainer](/nodes/oats-maintainer/index.md), owned by the new oats-maintainer soul (the OATS maintainer). The oats-expert soul stays the generalist expert that leads cross-area work, with a fresh [oats-expert](/nodes/oats-expert/index.md) node under its unchanged owner. Links across the base point at the moved node, and the seven node indexes whose cross-reference was labelled `oats-expert` (market-research, authoring, aweb, desktop, jira, linear, okf) now label it `oats-maintainer`; no other note text changed. The base declares thirteen nodes.

## 2026-10-01

* **Creation**: Chartered the [oats-setup-admin](/nodes/oats-setup-admin/index.md) node for the setup-admin soul, which gains the oats.okf knowledge slot: the judgement of administering a workspace's OATS config, never deployment state; distinct from [oats-operator-expert](/nodes/oats-operator-expert/index.md). The base declares twelve nodes.

## 2026-09-28

* **Removal**: The `oats-dev-expert` node, retired with `oats.dev` (the `oats.engineering` package replaced it, oats#283). It held no researched knowledge; the base declares eleven nodes. The roster in [domain-expert rebuild](/nodes/oats-maintainer/decisions/domain-expert-rebuild.md) is updated.
* **Update**: Audit pass against main (the 0.30 line; team-model content held for its own pass): every node describes main — the captured path, the classic cascade, install and approval removed; one canonical roster ([domain-expert rebuild](/nodes/oats-maintainer/decisions/domain-expert-rebuild.md)); stewardship cut to judgement with the legacy ledgers' lessons swept in; integrations consolidated and current to oats.aweb 1.16.1; Desktop at Phase F; provenance citations collapsed; one-line indexes; logs capped at ~20 entries, newest first.
* **Update**: The `oats-assistant` node merged into [oats-operator-expert](/nodes/oats-operator-expert/index.md); the base declares twelve nodes.
* **Deletion**: The dated current-direction snapshot; dated direction lives in the framework's release notes.

## 2026-09-24

* **Creation**: Chartered six package-expert nodes — [oats-okf-expert](/nodes/oats-okf-expert/index.md), [oats-aweb-expert](/nodes/oats-aweb-expert/index.md), [oats-jira-expert](/nodes/oats-jira-expert/index.md), [oats-linear-expert](/nodes/oats-linear-expert/index.md), [oats-authoring-expert](/nodes/oats-authoring-expert/index.md), [oats-dev-expert](/nodes/oats-dev-expert/index.md) — one per official package, owning that package's facts and reading the integrations node; the aweb and okf charters name their cross-project seams (Phase D slice 3, roster amendment of 2026-09-24).

## 2026-09-22

* **Update**: Cut [Release judgement for the tag-driven lane](/nodes/oats-maintainer/stewardship/release-traps.md) to decisions, traps-as-lessons and their elimination routes; every procedure sentence (refspec fix, token rerun, whitelist, syntax-check, pack-and-install recipe, sweep mechanics) is routed to the `git-tag-release` skill and the release workflow, and elimination routes already landed (verify-only installer build, clean-room smoke, mirror-parity test) are marked as such. Retitled; audit item B1.
* **Update**: Trimmed [How the OATS project ships and reviews](/nodes/oats-maintainer/stewardship/review-protocol.md) to the named failure forms and the maintainer's questions; test-writing recipes routed to the `pr-review` skill (B2), and the self-approval/branch-deletion platform detail generalised to one sentence (B5).
* **Update**: Trimmed [A refusal that needs the old bytes is a pre-commit gate](/nodes/oats-kernel-expert/lessons/refusal-belongs-before-commit.md) to the principle plus the post-commit-is-best-effort corollary; the transaction ordering list is named as the province of the transaction invariant tests (B3).
* **Update**: [The CLI as a machine boundary](/nodes/oats-kernel-expert/lessons/machine-boundary-contract.md) now states the elimination route for envelope leaks (a stdout-capture test over every command) and keeps remedy obligations without the test recipe (B4).
* **Fix**: Normalised the root log and every node log to the OKF convention (newest-first, ISO-date headings only, one bold kind per bullet): the undated "Curation draft" entries were folded under 2026-09-13, the date of the curation pass they describe, and duplicate date headings were merged. Historical links in earlier entries were left as written.
* **Update**: [market-research-expert](/nodes/market-research-expert/index.md) gained its charter and the explicit statement that it is intentionally empty until dated, attributable research exists; section indexes across nodes now share one heading style and every cross-node link is bundle-root-absolute.

## 2026-09-13

* **Harvest**: Preserved the founder-accepted optional reference theory and capability-owned runtime decision in [Optional reference theory, capability-owned runtime](/nodes/oats-maintainer/optional-reference-theory.md).
* **Creation**: Prepared five domain nodes for review, preserving the accepted optional-theory concept byte-for-byte. Market and assistant contain navigation only. No release, deployment or fresh-reader learning is certified.
* **Creation**: Proposed the judged 24-concept seed and five-node ownership map for knowledge PR review, preserving the accepted theory and history. Added a current-direction snapshot (since removed) from accepted priorities and verified published OATS 0.23.1 / OKF 2.0.0; cutover, fresh-role adoption and delegated Desktop UX remain separate acceptance work.
