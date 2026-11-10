---
type: Decision
title: "The OATS soul roster: expert domains own knowledge nodes, developers own none"
description: The one canonical record of the OATS roster — six domain experts and six package experts own nodes, four developer souls and the setup admin own none, release stewardship is a Playbook, and knowledge is rebuilt by audit, never bulk-copied.
about: [workstream/oats-direction, workstream/knowledge, workstream/operations]
id: dec-3697f43f967c
tags: [souls, roster, expertise, knowledge, developers, operator, integration]
timestamp: 2026-11-09
---
# Decision

Accepted human direction 2026-09-13 (oats-expert as maintainer): the OATS
knowledge base is organised around **expertise domains**, not engineering job
titles. Confirmed 2026-09-21 by the human with the redesign lead (developers
are ephemeral, knowledge is centralised); amended 2026-09-24 by the lead and
the OSS coordinator under delegated authority (operator and integration
nodes, package experts, promotion routing, seams); amended 2026-09-28 by the
human (developer souls in the framework repository; the assistant and the
coordination souls dropped); amended 2026-10-07 by the oats-maintainer, owner
of this node (the `oats-apps-expert` package expert for `oats.apps`). This
concept is the **one** place the roster is stated; other concepts link here
instead of restating it.

# The roster today (2026-10-07)

- **Domain experts, each owning a node:** `oats-expert` (overall direction,
  cross-cutting rationale, the single cross-package stewardship gate),
  `oats-kernel-expert` (kernel-to-capability contracts),
  `oats-desktop-expert` (Desktop product judgement), `oats-operator-expert`
  (deployment operation: onboarding, rebuilds, multi-machine layout, custody
  as host facts, cutover sequencing, outsider verification — and the
  user-facing adoption help the dropped `oats-assistant` held),
  `integrations-expert` (cross-package provider integration),
  `market-research-expert` (dated, sourced comparisons).
- **Package experts, one member soul per official package repository**, each
  owning the node for **that package's facts** and nothing cross-package:
  `oats-okf-expert`, `oats-aweb-expert`, `oats-jira-expert`,
  `oats-linear-expert`, `oats-authoring-expert`, and `oats-apps-expert`
  (package `oats.apps`, repository `oats-apps`, capabilities `oats.folio` and
  `oats.library`). (`oats-dev-expert` was retired
  on 2026-09-28 with `oats.dev`, which `oats.engineering` replaced.) They sit
  *beside* the domain roster; cross-package architecture stays with
  `oats-expert`.
- **Developer souls, owning no node** (framework repository `souls/`,
  [oats#279](https://github.com/awebai/oats/pull/279)):
  `oats-kernel-developer`, `oats-desktop-developer`,
  `oats-desktop-designer`, `oats-integrations-developer`. Each declares the
  nodes it reads.
- **Souls that own no node by design:** `oats-setup-admin` (holds
  `oats.setup` for a deployment's config, never harvested) and
  `knowledge-theory-expert` (an `oats.framework` package soul, an optional
  authoring aid — see
  [optional reference theory](/nodes/oats-maintainer/decisions/optional-reference-theory.md);
  a [move to `oats.authoring`](/nodes/oats-maintainer/decisions/knowledge-theory-expert-moves-to-authoring.md)
  is planned as of 2026-11-02, not shipped).
- **Dropped:** `oats-assistant` (merged into the operator expert),
  `dev-coordinator`, `docs-expert`, `lead`, `oats-coordinator`. Release
  stewardship is not a soul: it is authority plus a procedure, held as
  [release judgement](/nodes/oats-maintainer/stewardship/release-traps.md) in
  this node and read by whoever holds the authority.

An expert may implement when assigned. Implementation is a task, not a reason
to preserve an engineer identity, create an expert per source module, or keep
a documentation or coordination soul merely to retain its useful writing.

# Why the operator and integration experts own nodes (2026-09-24)

- **Operator.** Rebuilding a real deployment surfaced ten disagreements
  between the guide and the kernel; consolidating credentials across
  machines, placing a messaging root, keeping knowledge state outside every
  work tree, pinning owners by soul id and sequencing a cutover are none of
  them derivable from the repository, all universal once names are stripped
  — and they were unowned, because stewardship is a record of what happened,
  not operator knowledge. A node without a soul to keep it honest rots; that
  is the argument *for* the owner.
- **Integration.** Review rounds on one provider, several from a live
  rehearsal, produced discipline that is neither kernel internals nor one
  package's facts (rehearse before approving; what a live acceptance covers;
  how compensation reports; a hook never takes a locator from the ambient
  environment). Folding it into the kernel expert mixes it with internals;
  folding it into one package expert loses the cross-package part.

# Why developers own no node

On 2026-09-21 two readings were possible: **(A)** the experts are the roster
and developer roles are ephemeral, or **(B)** developers keep durable souls
and nodes. The human chose **A**: durable developer nodes turn the base into
work logs, and the promotion bar already filters out the material that would
justify them. The 2026-09-24 amendment found the gap in A — a developer
spawned from a package has no expert soul behind it, so "promoted into an
expert node or not at all" resolved to "not at all" for exactly the roles
that learn the most — and required every developer role to name the expert
node its lessons go to. On main a developer soul owns nothing and names what
it reads, and the knowledge capability retains a harvest whose source owns no
destination for explicit routing instead of discarding it; a developer's
lesson reaches a node only through the owning expert's review.

# Cross-project seams are read, not re-derived

A program larger than one package (the messaging identity and custody
program is the example) keeps its expert on its own project's side; the
package expert on the seam **reads** that node, and the other project reads
the operator and integration nodes, through a read-only reference across
bases. The messaging and knowledge package experts name their seams in their
charters. Otherwise two rosters re-derive each other's decisions — see the
[cross-base consult corollary](/nodes/oats-maintainer/decisions/optional-reference-theory.md).
A read edge grants no write; no soul infers write authority from a sole
readable store, and private locators and credentials belong to the
deployment, never to a shared soul definition.

# The promotion bar

Every candidate concept must pass four questions: (1) would it change how a
future instance of the intended expert works; (2) does it add judgement,
rationale or discovery beyond current code and canonical docs; (3) is it
still true of the OATS actually delivered; (4) can it be stated with
provenance, one canonical home and any needed ownership discipline.
Dispositions are keep, rewrite, merge, route elsewhere (skill, repository
doc, or code/test), drop, or unresolved with a named owner — uncertainty is
not permission to keep everything.

The base carries **expertise about OATS, never code teaching**: no module
maps, implementation walkthroughs or coding conventions; architecture passes
only as rationale or decision. One refinement (2026-09-24): a recipe is kept
when it encodes judgement about an **external system's behaviour** that a
competent engineer reading the code still gets wrong, and rejected when the
code says the same thing. Raw PR, release and task ledgers never become
expertise by moving repositories, and the base keeps no dated direction
snapshot — dated direction lives in release notes and the lead's working
state.

# How the roster changes in a shared workspace (2026-11-09)

The roster above is not changed by this section; it records how a change to
it is decided and shipped. This rule is the node owner's, drawn from a
source-reported exchange (below), and carries none of the human acceptance
recorded at the top of this concept. Under the
[lane model](/nodes/oats-maintainer/stewardship/release-lane-and-project-lanes.md)
the framework's `souls/` directory sits in `lane:setup`'s area (the
[lane map](https://github.com/awebai/oats/issues/1566) as read on
2026-11-09, which owns the assignment), but the workspace is shared: the maintainers on each human's side spawn the
same souls. Area ownership decides who reviews a change; it does not decide
whose work the change rewires.

- **Removing or folding a soul needs the agreement of every human's side
  that spawns it**, asked directly. Before saying yes to a roster change,
  list who spawns each affected soul and get those sides' agreement.
- **A removal or fold ships whole.** Every text that names the old soul is
  updated (the maintainer soul's "who leads what", the workspace-experts
  table, the docs, and the lane routing table in the same release); the
  removed souls' live homes are shown, in a scratch deployment, to still
  restart, show in status and retire with a harvest; in-flight PRs keep their
  owners; a release note names each removal and its successor; knowledge
  paths stay valid, with one harvester rehearsal per rebound node before any
  mass harvest.
- **Staging is allowed, with one limit.** The additive part (new souls added,
  nothing removed, routing unchanged) can go ahead on one side's word; the
  removals wait for the others. Additive is real only while no shared package
  pin moves: swapping the package that provides shared capabilities rewrites
  every soul's next spawn, everyone's included, because
  [every capability is copied whole into the instance](/nodes/oats-maintainer/decisions/workspace-model-v2.md).
- **Node ownership follows the owner id, not the soul name.** The knowledge
  package keys a node's owner to the id the soul's `okf.json` declares and
  refuses a node whose recorded owner differs; the operator playbook records
  why [identity must survive a move of the soul's files](/nodes/oats-operator-expert/playbooks/cutover-is-sequenced-per-deployment.md).
  A renamed soul therefore keeps its old id to inherit its node. Two souls
  declaring one id co-own the node, acceptable only as an interim state
  during a fold. Moving a node to another soul is an `okf-base.json` change
  made by the knowledge maintainer, never a rename on the soul's side.

Rejected: treating the roster as a setup-lane-only call because `souls/`
sits in its area.

The rule arose from a 2026-11-09 roster proposal in the coordination rethink
(experts folded, knowledge rebound by ownership only) that one side accepted
and the other put to its human with the shipping conditions above; the
removals and the knowledge reshape were not decided and are not recorded
here. The 2026-11-02 direction to deliver coordination as templates
([capability-owned coordination](/nodes/oats-maintainer/stewardship/coordination-policy-lives-in-capabilities.md))
leaves the rule unchanged. Evidence: OKF proposal from
oats-maintainer/setup-maintainer-pepe, 2026-11-09;
notes/a-shared-workspace-roster-change-needs-every-affected-side.md. Both
sides' positions are source-reported from the lead's exchange, not verified
human acceptance; the owner-id refusal was not read in the package's code by
the harvest.

# Rejected alternatives

- **String-replace `engineer` with `expert`** — the redesign is of
  responsibilities and curriculum, not labels.
- **Bulk migration with a legacy/archive bucket in the active base** — an
  attic is retrieval context for every future instance; Git history
  preserves rollback. The 2026-09-21 migration kept 58 of ~400 legacy
  concepts.
- **Option B, durable developer nodes** — see above.
- **A release or steward soul** — release authority is a Playbook read by
  whoever holds it.
- **One maintainer soul per package in place of the domain experts** (the
  2026-07-26 shape) — package experts own facts beside the domain roster,
  never the cross-package architecture
  ([official development dogfoods the workspace](/nodes/oats-maintainer/decisions/official-development-dogfoods-the-workspace.md)).

# Related

[One standalone Desktop product, no hidden operational kernel](/nodes/oats-desktop-expert/decisions/standalone-product-and-cli-authority.md);
[External knowledge needs source-independent custody](/nodes/oats-maintainer/decisions/external-knowledge-custody.md);
[Centralised per-soul knowledge is the default](/nodes/oats-maintainer/decisions/flexible-knowledge-and-situated-instances.md).

# Citations

1. Direct human direction 2026-09-13 (domain experts instead of engineering roles; strict audit of soul knowledge) and 2026-09-28 (developer souls, dropped souls).
2. Migrated from agents/oats-expert/soul/knowledge @ 7838d3ca (`decisions/expert-souls-and-knowledge-rebuild`, `five-souls-are-the-roster-knowledge-centralised`, `roster-amendment-operator-and-integration-experts`, `portable-role-editions-and-bootstrap`).
3. Developer souls: [awebai/oats#279](https://github.com/awebai/oats/pull/279); a source that owns no destination is retained, not dropped: `capabilities/oats-okf/lib/worker.mjs` (`E_OWNER`) in awebai/oats.
4. `oats-apps-expert`: the oats-maintainer node owner's disposition on [awebai/oats-knowledge#57](https://github.com/awebai/oats-knowledge/pull/57), 2026-10-07.
5. Roster-change rule: OKF proposal from oats-maintainer/setup-maintainer-pepe, 2026-11-09 (the coordination-rethink roster exchange, source-reported).
