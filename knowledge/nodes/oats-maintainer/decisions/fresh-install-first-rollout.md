---
type: Decision
title: New kernel lines roll out fresh-install-first; historical migration is deferred, never destructive
description: A kernel line that changes its declaration contracts rolls out by provisioning fresh deployments and parks in-place conversion of historical state, without erasing anything or relabelling partial history as complete; the workspace model made this literal as "no migration".
about: [workstream/oats-direction]
id: dec-baba9fc9fcbd
tags: [rollout, migration, acceptance, portable-souls]
timestamp: 2026-09-17
---
# Decision

Decided 2026-09-16 with the human (oats-expert as maintainer) for the
Portable Souls rollout, which changed declaration, artifact and execution
contracts at once. A general in-place converter would have consumed the
critical path without helping a small early rollout whose operators could
provision fresh state. The same judgement shaped the 0.25 line: no converter
and no dual-schema reader — the previous kernel keeps running its
deployments, and an operator rebuilds when ready
([workspace model v2](/nodes/oats-maintainer/decisions/workspace-model-v2.md),
point 14). The Portable Souls captured path itself was removed in 0.26; the
rollout judgement outlived it.

# What was decided

- **Fresh installation is the rollout path.** Complete the new deployment and
  instance lifecycle first. Historical reconstruction, comprehensive legacy
  conversion and migration-facing CLI are **parked, not deleted**, and are not
  release prerequisites.
- **Shipped safeguards stay and are not widened.** Bounded partial/unknown
  evidence tools remain; they are never extended to make old state look
  complete. Partial or unknown history is never relabelled a complete record
  ([evidence-bounded migration](/nodes/oats-kernel-expert/decisions/evidence-bounded-compatibility-and-migration.md)).
- **A fresh install is not permission to erase.** User repositories,
  knowledge, native histories, unfinished work, identities and credentials
  are preserved; prefer an explicit fresh state location and keep the old
  deployment's state as frozen custody until the new path is qualified.
  Cleanup and retirement stay explicit and custody-preserving, never a
  migration shortcut or a forced wipe.

# Acceptance

A rollout is judged on a working fresh path — workspace, resolution,
instance lifecycle — with real provider acceptance, proven by an operator who
did not write it
([second-operator acceptance](/nodes/oats-maintainer/lessons/second-operator-acceptance.md)).
A single-backend or inert-adapter result is not a finished rollout, and
deferred historical conversion is tracked explicitly and never marked
complete. The Desktop follows infrastructure; screenshots do not substitute
for these gates.

# Citations

1. Migrated from agents/oats-expert/soul/knowledge @ 7838d3ca (`decisions/fresh-install-first-portable-rollout`, 2026-09-16/17).
