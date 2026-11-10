---
type: Decision
title: Host Git credentials must work for unattended agents
description: Design the host account's shared Git credentials for unattended use, explicitly accepting the key-protection trade-off while minimizing token authority and preserving the person's sign-off responsibility.
about: [workstream/operations]
id: dec-20ab5dc9b80a
tags: [operator, git, github, credentials, unattended, least-privilege]
timestamp: 2026-10-15
---

# Decision

For an OATS host whose agents use the person's Git and GitHub account,
credential guidance must serve those unattended agents, not just the person's
interactive terminal. The shared account makes availability, token authority
and certification choices consequential for every agent using it.

Accepted by the product owner on **2026-10-15**: asked about recommending an
**SSH key without a passphrase for unattended agent hosts**, with the lane
maintainer's recommendation to keep it, the product owner left the choice to
the lane, which kept it. This is a deliberate protection
trade-off, not a claim that passphrase-less keys are universally preferable:
file permissions and disk encryption protect the stored key without a key
passphrase, and a lost host requires revocation of its registered key.
The knowledge maintainer verified this acceptance at review against the
decision comment on awebai/oats#1236 (cited below).

# Why the SSH-agent alternative was rejected

A passphrase-protected key plus `ssh-agent` was rejected **for the guided
unattended setup**. It requires every separately started session and service,
including remote sessions and sessions after reboot, to reach an agent holding
the unlocked key. Success in the person's terminal does not establish that
property for later workers. The chosen guide avoids an implicit dependency the
operator cannot establish merely by completing an interactive setup.

The proposal reports a disposable-home reproduction in which commit signing
failed with a passphrase-protected key and no agent, and identifies prompt-less
Git and SSH batch mode as the unattended constraints. This does not establish
that a deliberately provisioned, reachable SSH agent cannot work; it explains
why that additional operational dependency was left outside this guided path.

# Consequences of sharing the account

- **Minimize the authority every agent inherits.** Administrative key scopes
  are temporary registration authority, not standing worker authority: remove
  them after registration. Do not grant `delete_repo` for setup or scratch-repo
  cleanup; human web cleanup avoids adding destructive authority to the shared
  token.
- **Preserve the chosen token storage through refreshes.** An interactive login
  alone is not proof of unattended access. The source's review of GitHub CLI
  refresh behavior found that a later refresh could return a deliberately
  file-stored token to the keychain unless the storage choice was repeated.
  The durable decision is to carry that choice through the token lifecycle;
  version-specific flags belong in the setup skill, not a second recipe here.
  A *second*, separate gh credential on the same host is a different case:
  the [GH_CONFIG_DIR keyring lesson](/nodes/oats-operator-expert/lessons/a-separate-gh-config-dir-does-not-separate-the-keyring-token.md)
  records that a configuration directory alone does not separate the stored
  token.
- **Explain the person's certification before enabling global DCO sign-off.**
  The sign-off applies to agents' commits under that person's identity too.
  Automation does not turn it into the agent's independent certification or
  establish that any particular contribution satisfies the DCO.

This concerns agents using the configured host account, not unrelated OS users,
and does not grant an agent permission to change credentials or expand scopes.
The existing [forge-custody decision](/nodes/oats-maintainer/decisions/forge-connection-is-a-workstation-fact.md)
remains authoritative: the forge CLI owns its credential store, not OATS. The
[scope-placement lesson](/nodes/oats-operator-expert/lessons/place-each-fact-at-the-scope-that-owns-it.md)
explains the host-versus-soul distinction; it is not an instruction to put keys
or tokens into OATS configuration.

# Procedure and evidence limits

The operational home is the existing `/oats-git-setup` skill and repository
host guidance, not this decision. Keep storage/refresh checks there; do not
make future operators rediscover the reason for the unattended default. The
proposal reports review against GitHub CLI v2.102.0, but **no exercise on a real
GitHub account or on macOS**. Neither the reproduction nor this decision proves
those live environments work.

# Citations

Evidence: OKF proposal from oats-operator-expert/oats-operator-expert-git-setup,
2026-10-15; notes/a-hosts-git-credentials-serve-every-agent-unattended.md.

- Source-reported implementation and acceptance reference:
  [awebai/oats#1236](https://github.com/awebai/oats/pull/1236), for
  [awebai/oats#1233](https://github.com/awebai/oats/issues/1233), reported merged
  as `adc5b375` on 2026-10-15.
- Source-identified host guidance:
  [servers.md](https://github.com/awebai/oats/blob/main/docs/servers.md),
  “Git on a macOS host”; consult the current procedure rather than treating this
  rationale as a command reference.
