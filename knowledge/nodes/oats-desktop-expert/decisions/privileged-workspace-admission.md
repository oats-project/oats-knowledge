---
type: Decision
title: Workspace admission is privileged and transactional
description: Validated suggestions or a privileged picker admit workspaces only after identity, readiness and rollback authority are established.
about: [system/oats-desktop]
id: dec-5a7ef5775bf8
tags: [desktop, security, workspaces, privileged-process, transactions]
timestamp: 2026-10-08
---
# Rationale

Decided 2026-07-24. Renderer choices are not arbitrary filesystem or process
authority. The renderer never scans the filesystem; suggestions come from
bounded, validated sources — deployments the app already knows and recents
revalidated on use. A native directory picker is an explicit privileged
admission path, not a reason to trust every renderer-supplied path. Recents
remain input to revalidate, not authorization.

Since Phase F (2026-09-24) admission checks only that the directory holds a
regular, non-symlink `oats-local.yaml`; what the deployment contains is the
kernel's to read and validate (`oats workspace status --json`), so admission
parses nothing and the earlier sibling-root discovery is gone. A picked folder
without a deployment is offered onboarding through the kernel, never
scaffolded by Desktop.

A responding server may belong to another workspace or an incompatible
application. Never kill or extend a foreign server merely because it occupies
a convenient port. Commit workspace, recents and trust only after the
intended owner and readiness are established; rollback must restore trust as
well as process state. Existing terminal viewers survive the replacement of
Desktop's own server because they attach to the session source, not to the
server ([Terminal tabs are viewers, not session owners](terminal-viewers-not-session-owners.md)).
The 2026-10-08 [bundled-server lifetime decision](bundled-server-owner-lifetime.md)
refines this boundary: owning the server means bounding its lifetime even
when the app crashes, not claiming another app's server or cancelling
in-flight kernel work. It preserves the foreign-server prohibition.

Discovery, native picker and non-dismissible mutation have different
lifetimes. A picker can cover discovery without invalidating it, while an
effect already in progress may still succeed after a view disappears.
Preserve focus and reconcile that result rather than hiding uncertainty
behind a stale-response guard.

# Admitted roots are canonicalised once and held immutable

Discovered 2026-07-24: re-resolving an admitted root at use time is a
time-of-check/time-of-use hole. A directory swapped for a symlink between
admission and use makes the requested file and the "admitted" root both
resolve into the attacker's target, so containment holds vacuously and the
outside file is served. Roots are canonicalised exactly once at admission and
carried as immutable strings; only the requested path is resolved at use
time; containment is exact-root or root-plus-separator so a sibling with a
shared prefix cannot match. A candidate root whose unresolved path comes from
opened-workspace content is itself validated (a real directory, not a
symlink, under the expected canonical parent) before it is admitted — an
untrusted workspace must not be able to nominate a secret directory as a
viewer root. String normalisation alone closes none of these. This is a
Desktop finding from the file-serving review; the kernel's spawn-placement and
lock-hardening reviews of 2026-07-24 → 2026-07-29 reached the same
canonicalise-once / compare-resolved-objects rule independently
([identity and location belong to the resolved object](/nodes/oats-kernel-expert/lessons/resolved-object-not-referring-string.md)).

# Related

[Identity and relationships must stay legible under ambiguity](../lessons/identity-and-relationship-legibility.md);
[Async completion must still own the user's intent](../lessons/asynchronous-intent-and-truthful-outcomes.md);
[The loopback interface is Desktop's trust boundary](loopback-trust-boundary-and-transport-simplicity.md);
[Verification judgment for Desktop's privileged surfaces](../lessons/verification-judgment-for-privileged-surfaces.md).

# Current contracts

- [Current workspace-registry.mjs](https://github.com/awebai/oats/blob/main/packages/desktop/workspace-registry.mjs)
- [Current desktop-deployment-model.md](https://github.com/awebai/oats/blob/main/packages/desktop/docs/desktop-deployment-model.md)

# Citations

1. Migrated from agents/oats-desktop-engineer/soul/knowledge and agents/ux-designer/soul/knowledge @ 7838d3ca.

Evidence: OKF proposal from oats-desktop-expert/oats-desktop-expert-desktop-backlog, 2026-10-08; notes/698-server-owner-lifeline.md.
