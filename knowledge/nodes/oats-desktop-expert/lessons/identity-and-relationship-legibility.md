---
type: Lesson
title: Identity and relationships must stay legible under ambiguity
description: Qualified identity and full-roster ambiguity checks preserve agents without inventing relationships from filtered views.
about: [system/oats-desktop]
kind: lesson
id: ins-a5704dfdfb95
tags: [desktop, identity, roster, hierarchy, legibility, accessibility]
timestamp: 2026-07-25
---
# Rationale

A display name is not a globally unique agent (learned 2026-07-25 by the
Desktop engineering role in a merged-state review of the first agent-relations
graph, where a map keyed by bare instance name silently dropped a live
instance that shared its name with one from another agents root; generalised
the same day by the UX design role to every team-scoped roster view). Even a canonical local home
needs host qualification when remote instances enter the same view, and any
roster spanning more than one agents root, workspace or host must key by a
qualified identity while showing the convenient label. Keep the identity used
by actions distinct from the label shown to the operator. When items with
legal duplicate display names are sorted, the qualified identity is the final
tie-breaker (UX design role, 2026-07-25, same finding); otherwise positions swap with input order and the operator loses
the agent they were tracking.

Resolve relationship ambiguity over the full relevant roster before filtering
or grouping (UX design role, 2026-07-25). A globally ambiguous name can look unique inside a cluster,
resurrecting an edge that was correctly refused earlier. Showing disconnected
nodes is safer than hiding an agent or manufacturing lineage.

**Scope travels with the request** (2026-07-22 … 2026-07-23). Instance names
repeat across workspaces, and an unscoped first-match lookup once let an
Interrupt clicked in one workspace reach a same-named agent in another, and
marked a stopped instance running because its namesake elsewhere was. An
instance-addressed request carries its workspace end to end; the server
resolves only inside that scope, never falls back to the first match
anywhere, and refuses a bare name that is ambiguous within the scope. Scoping
is classified by route family, not per endpoint, so a new route under the
family is pinned by construction and fails safe.

# Degrade to a forest, never to an error

Malformed parentage must never break the overview (decided 2026-07-24): a
missing parent makes its child a root, a cycle takes a deterministic
fallback, and a valid relation that crosses a grouping boundary stays
connected. Desktop renders whatever sparse explicit relations exist and
refuses ambiguous edges; it does not promise to reconstruct lineage the kernel
deliberately does not record ([Live lineage is deliberately bounded](/nodes/oats-kernel-expert/decisions/bounded-live-lineage.md)).

# Recognition and naming

Stable deterministic layout preserves recognition across refreshes (UX design
role, 2026-07-24);
force-directed movement obscures that continuity. Drag, pan and zoom are
accepted because real teams do not fit a rigid tree; lineage is highlighted
on demand rather than emphasising every edge permanently.

Anonymous grouping need not erase internal identity (UX design role,
2026-07-25): a "no cluster names"
product request removes the *label*, not the deterministic key that keeps
grouping and ordering stable across refreshes (derive and display are two
decisions). Category labels that classify a bucket — such as "independent" —
are not cluster names and survive such a request. Visible parent/sibling
distinctions must not rely on colour alone. These are legibility
requirements, not a new user-named team entity or a promise to repair the
kernel's bounded live graph.

# Related

[Agent-centered navigation makes the action target legible](../decisions/agent-centered-navigation.md);
[Terminal tabs are viewers, not session owners](../decisions/terminal-viewers-not-session-owners.md);
[Accessibility is proven on effective colours, not token pairs](effective-contrast-over-token-pairs.md);
[Explicit sibling links are shown on both ends and apart from parentage](/nodes/oats-desktop-expert/decisions/sibling-relations-are-shown-apart-from-parentage.md) (the 2026-10-16 display decision applies the full-roster and no-colour-only rules);
[Live lineage is deliberately bounded](/nodes/oats-kernel-expert/decisions/bounded-live-lineage.md).

# Current contracts

- [Current instance-tree.mjs](https://github.com/awebai/oats/blob/main/packages/desktop/renderer/instance-tree.mjs)

# Citations

1. Migrated from agents/oats-desktop-engineer/soul/knowledge and agents/ux-designer/soul/knowledge @ 7838d3ca.
2. Migrated from agents/oats-desktop-engineer/soul/knowledge/lessons/workspace-scoped-instance-routing.md, workspace-scoped-snapshot-lookups.md and route-family-workspace-pinning.md @ 7838d3ca.
