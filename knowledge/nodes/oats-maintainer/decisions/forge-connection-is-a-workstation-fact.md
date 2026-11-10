---
type: Decision
title: A forge connection is a workstation fact, not a capability
description: Signing in to GitHub or GitLab changes what the operator's machine can see, not what any agent is, so it lives in the Desktop as a per-machine Connection under the forge CLI's own credential custody — no capability, no kernel dispatch contract, and automatic PR becomes ADE-owned.
about: [workstream/oats-direction, system/oats-desktop]
id: dec-4d6eebf2b8fa
tags: [architecture, desktop, forge, connections, credentials, capabilities, levels]
timestamp: 2026-09-22
---
# Decision

Accepted 2026-09-22 by human direction, recorded by the redesign lead.
**Supersedes** the lead's first draft of the same question (an official
`oats.forge` *capability* reached through a new kernel additive-view dispatch
contract), which was never accepted. **Amends** the automatic-pull-request
clause (§5) of
[Desktop parity: lifecycle and policy](/nodes/oats-maintainer/decisions/desktop-parity-lifecycle-and-policy.md):
automatic PR is *ADE-owned*, not "provider-owned", because there is no
provider capability for it to belong to.

A **forge** is the established term for GitHub/GitLab/Gitea/Forgejo-class
collaboration platforms. The facts a forge holds about an instance's branch —
pull request, checks, review decision — are not Git facts, and the kernel must
not fetch them. The question was *at which level* OATS models the connection
to a forge. The answer is: **the operator's workstation**, surfaced in the
Desktop, and nowhere in the framework's configuration model.

# Rationale: levels

Capabilities shape what an agent *is* — instructions, skills, hooks, provider
bindings — and are activated per soul, injected, catalogued, trusted. Signing
in to GitHub changes nothing about any agent; it changes what *this machine*
can see. IDEs already draw the same line: Git is built in and local to every
workspace, while the forge account is a per-machine sign-in that every
workspace's Git panel then uses. The framework's habitual answer ("make it a
capability") would have put a workstation fact at the soul level:

- activation per soul and injection text about a forge in agents that never
  touch one;
- a catalogue entry and a trust step for what is really "sign in on this
  machine";
- a new kernel dispatch surface whose only purpose is to reach that sign-in.

The human's framing — *a button in the ADE, however IDEs do it* — is the
smaller and truer design. Consequently nothing about a forge connection is
written into deployment config, soul definitions, instance records, locks or
the catalogue; there is no activation and no injection; and the kernel is
not involved in connections at all.

# Rationale: custody and reads

- **The forge's own official CLI holds the credential** (GitHub's first;
  others are later backends behind the same card model). Its credential store
  *is* the custody. Connect and disconnect are the CLI's own login/logout
  flows, launched by the Desktop in a pane it owns; the Desktop never sees the
  token. OATS never stores, reads, copies, forwards or logs a forge credential
  and never puts one on the wire or in the renderer. This is the same stance
  as [harness authentication is native](/nodes/oats-kernel-expert/decisions/harness-native-authentication.md)
  and the refusal to be a second custodian of host credentials in
  [runtime, messaging and viewer ownership](/nodes/oats-maintainer/decisions/runtime-messaging-viewer-ownership.md).
- **Forge reads are performed by the Desktop server** at its existing guarded
  boundary — not by the renderer and not by the kernel — under the same
  discipline as its other command-running routes
  ([loopback trust boundary](/nodes/oats-desktop-expert/decisions/loopback-trust-boundary-and-transport-simplicity.md)).
  Because the connection belongs to this machine, remote workspaces refuse
  rather than fall back. Unavailability is a closed set of typed states
  (not connected, CLI not installed, unsupported forge, no remote, no pull
  request…), never a guess and never raw CLI output.
- **Backend selection needs no forge knowledge in the kernel.** The kernel's
  one addition is to report the instance's upstream remote (host and path)
  in its read-only Git observation, so the Desktop can choose a backend
  without running Git itself. Parsing a URL is kernel-neutral; talking to a
  forge is not
  ([kernel and capability responsibility](/nodes/oats-kernel-expert/decisions/kernel-and-capability-responsibility.md)).

# Automatic pull request: ADE-owned, off by default, honest about reach

With no capability, the owner of "open a PR when the first commit is pushed"
is the ADE. It is a per-spawn *recorded intent*, default off, acted on only
while the Desktop is running and the forge is connected; it creates a draft,
is idempotent when a PR already exists, and records the PR identity in the
instance's typed events. Undrafting stays human, and OATS never commits or
pushes. The reach limit is stated in the UI: a terminal-only operator opens
the PR themselves. This replaces the earlier "provider-owned" wording.

# Where the specifics live

The Connections surface, PR card, typed states and verification judgement are
Desktop product decisions for the Desktop node; the shape of the remote field
on the kernel's Git observation is a kernel contract for the kernel node. Both
are described by the repository's documentation and are not restated here.

# Citations

1. Legacy `agents/oats-expert/soul/knowledge/decisions/p1-forge-connection-is-an-ade-integration.md` (2026-09-22), the accepted second draft of parity seam P1.
