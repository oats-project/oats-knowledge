---
type: Decision
title: Recovery copies preserve work, not repository-local Git behavior
description: Nested-repository recovery deliberately omits local Git configuration beyond status semantics, rather than reinstalling agent-selected executable behavior for a later operator.
about: [system/oats-kernel]
id: dec-6596383792d5
tags: [kernel, retire, recovery, git, security]
timestamp: 2026-10-08
---
# Decision

A nested repository's retirement recovery copy preserves the work and its
identity, not the source repository's operating configuration. Do not carry
repository-local Git configuration into the copy beyond the narrowly selected
settings needed to preserve status semantics. Document the omissions,
including remotes and user configuration, instead of implying that recovery
recreates every aspect of the original repository.

The source records choosing this boundary on 2026-10-08 while resolving the
nested-repository recovery requirement. This is a source-reported kernel
expert decision, not evidence of explicit human acceptance.

# Rationale and rejected alternatives

Repository-local configuration is not merely descriptive metadata. It can
select hooks, filesystem monitors, includes, credential helpers and diff or
text-conversion drivers. Copying those selections can cause a later operator's
Git commands to execute behavior chosen by the retired agent. The recovery
writer therefore owes a boundary to the later reader, not only to the process
performing the copy.

- **Copy the entire local config:** rejected because preserving work must not
  silently reinstall source-selected executable behavior.
- **Copy an additional allowlist of remote, branch and user configuration:**
  rejected as extra surface and judgment calls with little recovery value.
  Not every such key executes a helper; the decision is to avoid expanding
  the recovery contract for incidental operating metadata.

Branch identity and the objects needed for preserved work are a different
obligation from restoring remotes, authorship defaults or helper selections.
A request to restore convenient configuration must revisit this tradeoff,
not be treated as an obvious completeness fix.

# Scope

This is a rule about configuration written into the recovery artifact. It does
not replace the separate
[retirement read-profile decision](/nodes/oats-kernel-expert/decisions/retire-git-reads-preserve-baseline-semantics.md),
which retains operator configuration for baseline comparability. Nor does
omitting local config prove that every later Git operation is inert: it is
not a sandbox or a guarantee about the operator's configuration and commands.

# Related

- [Recovery preserves Git state across ref formats, not just paths](/nodes/oats-kernel-expert/decisions/recovery-preserves-git-state-across-ref-formats.md) refines the ref/object preservation obligation without restoring source-selected operating configuration.
- [Observation must not harm the observer](/nodes/oats-kernel-expert/lessons/observation-must-not-harm-the-observer.md) owns the helper-execution hazard and the protections required while reading another agent's tree; this decision applies that concern to what recovery leaves for a later reader.
- [Recovery completeness must be measured against the source, not Git's advertised refs](/nodes/oats-kernel-expert/lessons/recovery-completeness-needs-source-refs.md) explains why preserving branch identity needs source-side evidence, independently of configuration retention.

# Citations

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-retire-recovery, 2026-10-08; notes/decision-657-no-local-config.md.

The proposal identifies [awebai/oats#657](https://github.com/awebai/oats/issues/657)
as the recovery requirement and [awebai/oats#817](https://github.com/awebai/oats/pull/817)
as its implementation. The harvest did not independently audit that
implementation or its approval history.

Verified by the knowledge maintainer at review of the harvest: awebai/oats#657
records that a nested repository's recovery copy carried only the status
settings of its local config and asked to copy it or say plainly what is
dropped. awebai/oats#817, merged 2026-10-08 and closing #657, keeps local
config out beyond the status settings, documents the omission, and gives
hooks, fsmonitor, filters and credential helpers as the reason. Its approval
is recorded in the PR description as an agent adversarial review and the
source's lead verification, not a human acceptance.
