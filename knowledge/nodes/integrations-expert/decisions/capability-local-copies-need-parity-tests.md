---
type: Decision
title: Capability-local helper copies need a behavioral parity test
description: For small helpers needed by separately composed capabilities, keep a copy in each capability, cross-reference the copies, and test their behavior on the same success and refusal fixtures rather than adding a runtime dependency.
about: [workstream/provider-integration]
id: dec-fe6b671e71c6
tags: [integrations, capabilities, composition, dependencies, testing]
timestamp: 2026-11-04
---

# Decision and rationale

For a small helper needed by two independently composed capabilities, prefer
**capability-local copies with a behavioral parity test**. Each copy's comment
names its counterpart; one test executes both against the same fixtures and
requires identical results, including refusals. When review requested a
shared helper, explain this deliberate copy in the PR description rather
than leaving the departure from that request implicit.

The reason is the existing [capability lifetime and containment decision](/nodes/oats-kernel-expert/decisions/contained-capability-lifetime.md):
a package is a transport unit, not a guarantee that every sibling capability
will be present at runtime. An import into a sibling can work in the package
repository yet fail when only one capability is composed. Keeping both
capabilities in one package does not remove that boundary.

In the reported installed-version reader case, copying was chosen over:

- **A cross-capability import:** it depends on a sibling's presence and
  private implementation rather than each capability's complete copy.
- **A shared library package for a few lines:** it creates a new package
  contract instead of solving this small reuse need within the existing
  composition boundary. This is the source's rationale, not a prohibition
  on a separately justified and reviewed library contract.
- **An unpinned copy:** duplication without an executable comparison allows
  one reader to change its accepted inputs or refusals silently.

This records integration judgment about maintaining a necessary copy; it
does not redefine kernel composition or justify copying another component's
authoritative policy. [Client-local checks versus reported host facts](/nodes/oats-maintainer/decisions/client-local-tools-and-reported-host-facts.md)
remains a separate ownership decision. [Release mirror parity](/nodes/integrations-expert/lessons/a-provider-release-is-mirrored-and-pinned-in-one-pr.md)
compares released payload bytes, not these separately maintained helpers.

# Enforcement

The drift problem belongs in executable tests, not reviewer memory. Run both
actual implementations over the same fixtures, including malformed or
missing inputs and containment and size refusals where the helper has those
boundaries. Comments make the counterpart discoverable; they do not enforce
parity. The residual judgment is why this duplication is deliberate and why
introducing a runtime dependency is not the default fix.

# Evidence and limits

Evidence: OKF proposal from integrations-expert/overdue-step-checkpoint-integrations-expert, 2026-11-04; notes/capabilities-share-code-by-a-tested-copy.md.

The proposal and note report the choice for the installed Pi version reader
in [awebai/oats-aweb#200](https://github.com/awebai/oats-aweb/pull/200), at
`bfb8cbcfaa5ae2df7e388f627555710fcc903e08`. The [setup maintainer's approval comment](https://github.com/awebai/oats-aweb/pull/200#issuecomment-6632820135),
read during this harvest, explicitly accepts copying instead of sharing,
cites separate composition, and names the parity test and earlier parser
and version-floor precedents. This corroborates the agent maintainer's
acceptance record, not direct human authorship or independent human approval.
The new-library alternative is supported by the captured note, not expressly
by that comment.

The PR was open and unmerged when checked on 2026-11-04. Its description
reports success and refusal fixtures; implementation tests and mutation
results were not independently rerun. No shipped version or deployment
behavior is certified by this decision.
