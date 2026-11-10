---
type: Decision
title: One standalone Desktop product, no hidden operational kernel, with a bounded terminal-client exception
description: Desktop owns operator-product succession while the installed compatible CLI is the model it renders and the only way it changes a deployment; the one exception is a preview terminal client through shared kernel JSON readers, with no second model, kernel-internal client or session ownership.
about: [system/oats-desktop]
id: dec-901e276157cc
tags: [desktop, product, cli-authority, succession, degradation, workspace-v2, terminal-client]
timestamp: 2026-10-30
---
# Original rationale (2026-07-24; narrowed 2026-10-09)

Accepted 2026-07-24 (human direction, succession of the browser and terminal
panels). Keeping a browser panel, terminal panel and Desktop as separate
products would split ownership and duplicate behavior. Desktop is the
standalone operator application, not a capability installed into agents. Its
backend belongs to that product rather than inflating the generic kernel.

A hidden bundled operational kernel would erase the honest boundary between
observing an existing deployment and administering it. Desktop uses the
installed compatible CLI instead of forking lifecycle logic or importing
adjacent private implementation. The generic process-boundary rationale has
its sole home in the kernel node.

# Terminal-client exception (2026-10-09)

The one-product scope above is **narrowed, not reversed**: a preview terminal
client (`oats tui`) is permitted for operators working in terminals or over
SSH where Desktop cannot run. This is a bounded exception, not blanket
permission for additional operator products. The source records acceptance
by both maintainer sides with their humans' agreement; the acceptance
evidence and its limits are cited below.

The terminal client is admitted on three conditions:

- **No second model.** Read kernel JSON through the same readers as Desktop;
  keep only view state, never an independent reader of deployment files.
- **Nothing in `lib/`.** The client sits beside the kernel, not inside it.
  The in-kernel panel removed in 0.18.2 is not reinstated.
- **No session ownership.** Open the kernel's own viewer; never build or own
  a session, and never type into one on the client's own account. What the
  operator types reaches the agent through that viewer.

The other maintainer side's yes added two durable terms. Untrusted text: the
shared client filter refuses at least the kernel's refused set, and a hostile
fixture sent through the real draw path proves that the only control
sequences written are the client's own. A new kernel JSON read the client
needs is its own decision, never folded into a client change.

The original reason still binds: independently owned models and behavior
would drift. A kernel-internal panel, a parallel reader of deployment facts
and a terminal client that owns sessions remain rejected. The exception
changes only the permitted product scope, not the CLI-authority rules below
or Desktop's [existing terminal-viewer contract](terminal-viewers-not-session-owners.md).

The shared-reader consequence is a design decision, not a map of shipped
code: both clients are to import one shared directory, owned by the Desktop
expert and Desktop developer. A field needed by the second client extends
that shared reader; it is not read a second way. Two renderers do not mean
two models. The [packaging decision](shared-code-keeps-one-relative-path.md)
remains the canonical home for how the shared source is packaged.

Permission is not delivery: the terminal client remains preview and may be
moved to `oats experimental tui`. The 2026-10-09 refinement did not claim that
the client or shared-reader extraction had shipped; the
[terminal client's documentation](https://github.com/awebai/oats/blob/main/docs/tui.md)
is the current record of what has, and of when the preview mark may drop.

# The kernel is the model; Desktop renders and drives it (Phase F, 2026-09-24)

The first Desktop kept its own reader of the deployment (config chain, soul
and manifest files, installed-capability directories) and derived the roster
itself. When workspace model v2 changed what a deployment is, that reader was
a second model that could only drift. The human's direction was that Desktop
must be *natively built* for v2, not adapted to it, and Phase F rebuilt it on
one rule:

- **Every deployment fact comes from kernel JSON** (`oats status --json`,
  `oats workspace status --json`, inspect, preview, readiness, version).
  Desktop parses no deployment file. A fact missing from a kernel surface is a
  kernel change, never a Desktop-side parser.
- **Every change is a kernel verb.** Desktop never writes a deployment file.
- **Features are gated on what the CLI declares** (`oats version --json`
  `features[]`), not on version numbers. The accepted version band only
  fences the kernel line; a missing feature is named in the UI and nothing is
  invoked optimistically. Older commands can ignore new flags and still
  succeed, so feature support needs evidence at the authoritative boundary.
- **Remove, do not wrap.** Old readers were deleted with the slice that
  replaced them. No fallback for older kernels, no adapter translating one
  generation's shape into another, and old vocabulary leaves with the code.
  A concept with a genuine v2 successor that Desktop already handles
  correctly (terminal broker, tmux admission) stays and is named
  "unchanged, v2-agnostic", never "kept for compatibility".

Consequence: deployment observation needs a compatible CLI. Pending,
incompatible and ready are distinct truthful states with a recovery path.
Terminal viewers still attach to exact recorded targets without reading any
deployment file.

A forge (GitHub) connection is a workstation fact, not a capability: it lives
in Desktop as a per-machine Connection under the forge CLI's own credential
custody ([forge connection is a workstation fact](/nodes/oats-maintainer/decisions/forge-connection-is-a-workstation-fact.md)).

# Consequences for what Desktop sees and sends

- **Observation tolerates what the app does not own.** A nonzero exit is
  never success, even with plausible output. A row whose reported home falls
  outside the deployment, or repeats another row's home, is withheld and
  counted in the header, never published, addressed or silently dropped.
  Read-only discovery never scaffolds missing state; a folder without a
  deployment is offered explicit onboarding.
- **Desktop does not narrow what the CLI accepts.** Model choice stays free
  text with advisory suggestions; a hard selector was rejected (2026-07-27)
  because runtime preferences may be comma-separated fallback lists and any
  local catalog misses valid models. A suggestion failure resolves to "no
  suggestions", never to "cannot launch".
- **An empty task is a real launch, not a separate mode.** Launching with no
  opening instruction creates an instance that awaits instructions, the same
  shape the CLI produces.

# Rejected alternatives

- A bundled kernel or imported framework code — rejected: hides the
  administer/observe boundary and forks lifecycle logic.
- A Desktop-side deployment reader kept as fallback for older kernels —
  rejected in Phase F: a second model drifts, and "if the kernel is old" paths
  never die.

# Related

[Shared Desktop code keeps one relative path in the repository and package](shared-code-keeps-one-relative-path.md) (packaging rationale, not a change to CLI authority or product succession);
[Agent-centered navigation makes the action target legible](agent-centered-navigation.md);
[Async completion must still own the user's intent](../lessons/asynchronous-intent-and-truthful-outcomes.md);
[The loopback interface is Desktop's trust boundary](loopback-trust-boundary-and-transport-simplicity.md);
[macOS installers — what ad-hoc signing fixes and what it cannot](../lessons/macos-adhoc-signing-decision.md);
[A minimal process boundary avoids permanent private coupling](/nodes/oats-kernel-expert/decisions/minimal-process-boundary.md);
[Integrity, origin and consent are different proofs](/nodes/oats-kernel-expert/decisions/trust-approval-and-consent-boundaries.md).

# Current contracts

- [Current desktop-cli-api.md](https://github.com/awebai/oats/blob/main/docs/desktop-cli-api.md)
- [Current desktop-deployment-model.md](https://github.com/awebai/oats/blob/main/packages/desktop/docs/desktop-deployment-model.md)
- [Current design-brief.md](https://github.com/awebai/oats/blob/main/packages/desktop/docs/design-brief.md) (§7, what the Desktop is for)
- [Current tui.md](https://github.com/awebai/oats/blob/main/docs/tui.md) (the terminal client and its preview status)
- [Desktop Phase F boundary (superseded record)](https://github.com/awebai/oats/blob/7838d3ca70772f63854b198601fbc45437c2e999/docs/design/2026-09-24-desktop-phase-f-boundary.md)
- [Souls and capabilities in Desktop (superseded record)](https://github.com/awebai/oats/blob/7838d3ca70772f63854b198601fbc45437c2e999/docs/design/2026-09-07-desktop-souls-capabilities.md)

# Citations

1. Migrated from agents/oats-desktop-engineer/soul/knowledge, agents/oats-expert/soul/knowledge and agents/dev-coordinator/soul/knowledge @ 7838d3ca.

Evidence: OKF proposal from oats-desktop-expert/oats-desktop-expert-tui-readers,
2026-10-09; notes/terminal-client-narrows-one-product-decision.md.

For the refinement, the source identifies [awebai/oats#855](https://github.com/awebai/oats/issues/855):
section 0 decisions A and D record the partner side's acceptance, section 2 records
the narrowing and preview rollback, and decision F records shared-reader
ownership. It identifies the [other maintainer side's acceptance](https://github.com/awebai/oats/issues/855#issuecomment-6090292949)
at 2026-10-09T22:27Z, with that side's human's agreement. Acceptance by both
sides with their humans' agreement is source-reported in the proposal and
named note, not independently verified by this harvest. This is explicit
refinement of the human-accepted 2026-07-24 product scope; its other sections
are not superseded.

Maintainer check (2026-10-30, review of oats-knowledge#72): acceptance of this
narrowing is **source-reported (relay at
[awebai/oats#855](https://github.com/awebai/oats/issues/855#issuecomment-6090292949)
and at [the PR's review](https://github.com/awebai/oats-knowledge/pull/72#pullrequestreview-5476170616))**.
Both records stand under the `juanre` account and present themselves as that
human's maintainer agent reporting the human's agreement to this narrowing,
so they are agents' reports, not the human's own record. The comment set the
two durable terms above; its third term, merge sequencing, is task residue and
is left out. The [partner-side yes](https://github.com/awebai/oats/issues/855#issuecomment-6086919046)
is that side's maintainer agent and quotes no human; its human's agreement is
source-reported by the proposal and note, which this review could not read.

The [stage-two plan](https://github.com/awebai/oats/issues/855#issuecomment-6188604759)
later moved the viewer from the whole terminal to a panel: the same unchanged
kernel viewer runs in a pane of a tmux server private to the client's run, so
the client now passes on what the operator types. The session limit above is
worded for that. It widens nothing: the client still builds no viewer and
never attaches to the agents' tmux session. The other maintainer side's
[late read](https://github.com/awebai/oats/issues/855#issuecomment-6196395423)
agreed. `lib/` holds no terminal client, and `oats tui` still reads as preview
at this review.
