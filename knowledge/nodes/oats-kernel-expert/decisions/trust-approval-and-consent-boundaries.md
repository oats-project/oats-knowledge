---
type: Decision
title: Integrity, origin and consent are different proofs
description: Membership trusts member capabilities and declaring a package trusts it; the lock proves reproducible contained bytes, not approval; host-install consent is a separate, explicit step.
about: [system/oats-kernel]
id: dec-10074274ce33
tags: [kernel, trust, integrity, consent, packages, security]
timestamp: 2026-09-24
---
# Rationale

Each proof answers one question, and none implies another.

**Trust is membership or declaration.** A member capability is trusted by the
reciprocal membership handshake: whoever can push to the member decides what
runs, the same model every team already accepts for committed `.agents/skills/`.
A package comes from outside that boundary and is trusted by its declaration
in the workspace's `packages:` (human decision 2026-09-24, OATS 0.26.0). The
earlier per-version executable approval was removed because people declare a
package only when they trust it; a second approval stacked on that
declaration was ceremony, not a boundary
([workspace model v2](/nodes/oats-maintainer/decisions/workspace-model-v2.md)).
A spawn admits only a locked package the workspace *still* declares.

**Removed: configuration scope as the trust boundary.** From 2026-07-12 the
classic kernel trusted a capability authored at a configuration scope and
required a lock and integrity match for an acquired one, so location alone
could not confer trust. v2 removed scopes: location is never version, and a
directory's position confers nothing. What survived is the principle that
trust is decided at one explicit, reviewable place.

**Integrity is reproducibility, not approval.** The lock pins each package's
commit and content digest; a moved tag or drifted content is
`E_PACKAGE_INTEGRITY`, and at spawn the lock's capability list must match the
package at the locked commit. Drift is a refusal, never a diff: a command that
fell back to current source bytes when the locked ones changed would let
whoever edits the source present arbitrary bytes as "upstream". Advancing is
an explicit `oats sync` against a changed declaration.

**Origin needs its own check.** A digest can match while the artifact tells a
different origin story from the lock (2026-07-29), so provenance consistency
is checked beside content. Check order is not cosmetic: missing → drifted →
provenance, because reporting the wrong class sends the operator to the wrong
repair.

**A trust boundary must contain the actual runtime bytes.** Escaping manifest
paths, symlinks out of a fetched tree and resources borrowed from staging
undermine a boundary even when the manifest is hashed; v2 refuses symlinks
in fetched trees (except the soul's `CLAUDE.md` alias) and traversal in remote
tree names. Classify a value's policy class *before* normalization erases it.
A persisted field that is later re-parsed as input is itself a trust boundary:
validate it against the writer's exact grammar, and never let "absent"
collapse with "present but malformed". Argument vectors remove shell injection,
not option injection
([hook failures and error messages are output channels](../lessons/hook-and-error-channels-disclose.md)
owns that rule); in a lock system its consequence is a reference that silently
selects nothing and reports the wrong pin.

**Host-install consent is separate from declaring a package.** A capability's
`requires` names host commands and harness packages. OATS never installs
either silently: a harness package is verified at spawn in that harness's own
package list, never installed there, and a missing one fails the spawn with
the consent command that fixes it. It is raised only for deployments that use
that harness; installed is not enabled; identity ignores version selectors.
Verify through the exact executable and scope the session will use, preferring
the harness's machine output over its human rendering. None of these proofs
asserts that a *secret* is present: credential presence is a per-human runtime
fact, surfaced as an advisory warning or a first-use failure, never as
checked-in configuration.

# Related

[Capability resources must outlive package staging](contained-capability-lifetime.md);
[A declaration-versus-content check runs at sync and reuses the integrity family](declaration-checks-run-at-sync-under-the-integrity-family.md)
(how the `E_PACKAGE_INTEGRITY` family grew a `package-id` case, and why at sync);
[Identity and location belong to the resolved object](../lessons/resolved-object-not-referring-string.md);
[Harness authentication is native and user-managed](harness-native-authentication.md).

# Current contracts

- [Current packages.md, Trust](https://github.com/awebai/oats/blob/main/docs/packages.md#trust)
- [Current workspaces.md, Membership and trust](https://github.com/awebai/oats/blob/main/docs/workspaces.md#membership-and-trust)
- [Current capabilities.md](https://github.com/awebai/oats/blob/main/docs/capabilities.md)

# Citations

1. Migrated from agents/cli-dev/soul/knowledge, agents/oats-expert/soul/knowledge and agents/integrations-expert/soul/knowledge @ 7838d3ca (integrity-alone-cannot-see-disputed-origin, distribution-packages-config-profiles-and-requirements, scoped-capability-store-and-templates, capability-artifact-paths-must-be-integrity-bounded, linear-task-interface-selection, runtime-package-requirements, lock-source-strictness-prevents-reclassification, public-refs-are-option-injection-vectors, config-diff-fails-closed-on-drifted-source).
2. [OATS 0.26.0 release notes](https://github.com/awebai/oats/blob/main/docs/release-notes/v0.26.0.md), "Package approval".
