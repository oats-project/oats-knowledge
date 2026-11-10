# OATS knowledge

[`knowledge/index.md`](knowledge/index.md) is the entry point to the canonical
OATS knowledge base. **Accepted knowledge is the reviewed `main` branch**;
working branches and PRs remain proposals. This repository holds useful
judgment, rationale, rejected alternatives and maintained direction—not a
copy of framework code, API tables, command manuals or old task/release queues.

## Canonical surfaces and owners

- **Knowledge:** small, linked concepts under `knowledge/nodes/`, one canonical
  home per concept. Start index-first and cross-read rather than duplicate.
- **Repository/code documentation:** current schemas, API definitions and
  implementation behavior stay with the [framework docs](https://github.com/awebai/oats/tree/main/docs)
  and [OKF package](https://github.com/awebai/oats-okf). Procedures belong in their
  maintained skills, not a second KB manual.
- **Theory:** consult the single accepted
  [optional-reference decision](knowledge/nodes/oats-maintainer/decisions/optional-reference-theory.md)
  and the [canonical authoring references](https://github.com/awebai/oats/tree/main/docs/knowledge-reference).
  This README does not restate the theory or require it for alternate providers.
- **Deployment state:** bindings, owner registries, machine/account settings,
  private handoffs and pending input custody stay with their deployment. No
  recovery attic or raw legacy archive belongs in the active base.

[`knowledge/okf-base.json`](knowledge/okf-base.json) declares the stable
`oats-knowledge` identity and fourteen nonoverlapping nodes:

| Node | Responsibility |
| --- | --- |
| `oats-maintainer` | Overall direction, motivations, cross-domain planning and adoption judgment |
| `oats-expert` | What the generalist expert learns leading cross-area OATS work |
| `oats-kernel-expert` | Kernel/capability contract rationale, constraints and tradeoffs |
| `oats-desktop-expert` | Product, interaction and integration judgment |
| `market-research-expert` | Dated attributable research; no unsupported market claims |
| `oats-operator-expert` | Deployment operation and first-time adoption: onboarding/rebuild rationale, migration and cutover judgement; no user setup state |
| `oats-setup-admin` | Administering a workspace's OATS config: which changes went wrong and why, how refusals were read, what verification caught; no deployment state |
| `integrations-expert` | Cross-package provider-integration judgement, read by the package experts |
| `oats-okf-expert`, `oats-aweb-expert`, `oats-jira-expert`, `oats-linear-expert`, `oats-authoring-expert`, `oats-apps-expert` | One per official package: that package's facts, nothing cross-package |

It also declares the reserved nodes `claims`, `subjects` and `verdicts` (path = name) under the
placeholder owner `00000000-0000-0000-0000-000000000000`.

Market and most package-expert nodes currently have navigation only: absence of researched
knowledge is not permission to invent it. Owner UUIDs route responsibility,
not access control. Declaring nodes does not register live owners, activate
bindings or complete a cutover. The validation adapter pins the reviewed UUID
map; changes to it and base metadata require explicit ownership review.

## Contribution and PR review

1. Confirm the accepted base and consult the relevant indexes/decisions. Select
   or rewrite only evidence-backed knowledge that changes future judgment;
   route procedural/API material to its canonical skill/docs instead.
2. Prepare a branch and PR. Keep one concept home, cite sources, update indexes
   and add a dated log entry; each log keeps its newest ~20 entries. Dated
   direction lives in the framework's release notes, not in this base.
3. Run whole-base strict validation and owner-mapping tests below. Cross-node
   links use the **base**, never an individual node, as their root namespace.
4. Review semantic correctness, scope, freshness and ownership as well as CI.
   Merge only with authority and exact reviewed evidence; do not push knowledge
   directly to accepted `main`. Git-backed harvests use this same PR boundary.
5. Reconcile acceptance and verify a fresh reader actually consumes the accepted
   change before claiming learning or cutover. A green structural test is not
   semantic approval, deployment or model-learning evidence.

## Lightweight validation

Use **Node 22 and Git**. No npm install, framework checkout, private code,
provider credentials, OATS runtime, bindings, scheduler or model is needed.
Acquire the public OKF **v2.1.1** source at this immutable commit in a disposable
location **outside this repository**, then run:

```sh
export OKF_SOURCE="$(mktemp -d)"
git init "$OKF_SOURCE"
GIT_TERMINAL_PROMPT=0 git -C "$OKF_SOURCE" -c credential.helper= -c core.askPass= \
  fetch --depth=1 https://github.com/awebai/oats-okf.git \
  01b48dfc9d763b5b8cc4606aea3e361bf2ef783d
git -C "$OKF_SOURCE" checkout --detach FETCH_HEAD
node scripts/validate.mjs
node --test test/ownership.test.mjs
```

The adapter verifies the source revision/cleanliness, invokes its **strict
whole-base** concept validator and requires **zero errors and warnings**. It
uses the same pinned public source's metadata/declaration checks for base
structure, canonical nonoverlapping node paths, required navigation/history,
unowned or hidden files, and owner resolution. Local assertions enforce the
fourteen reviewed UUIDs and the three reserved nodes. Tests include malformed metadata, owner drift, unauthorized
cross-node ownership and warning-as-failure cases, without provisioning anything.
These pinned helpers are a CI adapter, not a promise of a stable runtime API.

[GitHub Actions](.github/workflows/validate.yml) runs the same commands on PRs
and pushes to `main`. Actions and OKF source use full commit pins. Only checkout
of **this** repository uses GitHub's built-in read-only token, with credential
persistence disabled; public OKF acquisition is unauthenticated. No custom
secrets, cross-private-repository access, write permissions or deployment jobs
are required. Updating the validator pin is a separate reviewed tooling change.
