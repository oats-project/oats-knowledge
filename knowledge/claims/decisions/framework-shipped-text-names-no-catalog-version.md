---
type: Decision
title: Text shipped inside oats.framework names no version the catalog check tracks; it writes a placeholder and a guard refuses a concrete one
description: A concrete package pin inside a framework capability is rewritten by every pin round after the framework tag, because the catalog-reference check makes it track the catalog; the knowledge-theory guide now writes vX.Y.Z, its package check refuses a concrete framework version, and the capability's version bump stays in the release lane's framework prep.
about: [workstream/oats-direction]
kind: decision
id: dec-488655830b27
tags: [release, packaging, pins, catalog, framework]
timestamp: 2026-11-25
---

# Decision

Text that ships inside an `oats.framework` capability does not name a concrete
version of a catalog package. It writes a placeholder (`vX.Y.Z`) and points to
the package's entry in `package-catalog.json` in plain text. For the
`oats.knowledge-theory` guide, a check now refuses a concrete framework
version, so there the rule holds without anyone remembering it.

This delivers the elimination route the release lane's
[framework self-literal trap](/nodes/oats-maintainer/stewardship/release-traps.md)
named and left open ("drop the version literal from the guide"), for the
`oats.knowledge-theory` authoring guide. It supersedes in part that lesson's
section "A framework's own guide pin is re-synced by the kernel prep after
the framework tag" (`ins-559dbb88da8b`): the guide no longer carries a pin,
so no kernel prep re-syncs it.

# Why

`scripts/check-catalog-references.mjs` walks `docs/`, `oats-package/` and the
repository's other text roots, and requires every `oats.<id>: vN.N.N` (or
`oats-framework/vN.N.N`) literal to equal the catalog. A literal
inside a framework capability therefore has to move in the kernel prep that
pins a new release, after the framework was tagged: the capability's content
then differs from its tag with no version bump. A placeholder escapes the
check's pattern, so a pin round leaves the tagged capability as it is.

Rejected:
- **Name the new version in the framework prep before the tag:** the catalog
  still pins the previous release then, so the catalog check fails that prep.
- **Link the catalog file:** the knowledge-theory curriculum's closure check
  refuses nonlocal links, so the pointer is plain text.
- **Bump the capability version in the content PR:** the release lane's
  framework prep owns capability versions (`docs/release-lane.md`, "Releasing
  `oats.framework`", step 1); a lane:setup PR carries no version change.

# Where it holds, and where it doesn't yet

The guard (`scripts/check-knowledge-theory-package.mjs`) covers only the
`oats.knowledge-theory` curriculum, and only the framework's own version. The
same class remains elsewhere: `oats.setup`'s `oats-package-pins` and
`oats-onboarding` skills pin `oats.okf`, which each okf pin PR rewrites after
the framework tag ([oats#2145](https://github.com/oats-project/oats/issues/2145)).
Before adding a pin example to any capability under `oats-package/`, write the
placeholder.

# Citations

1. Evidence: OKF proposal from oats-engineering-expert/framework-pin-example-lead, 2026-11-25.
2. Read at maintainer review, 2026-11-25:
   [oats-project/oats#2144](https://github.com/oats-project/oats/pull/2144) (closes
   [#498](https://github.com/oats-project/oats/issues/498), merged as `904534c3` on
   2026-11-25): both copies of `knowledge-capability-authoring.md` pin
   `oats.framework: vX.Y.Z` with a plain-text pointer to the catalog;
   `scripts/check-knowledge-theory-package.mjs` (`CONCRETE_FRAMEWORK_VERSION`)
   refuses the three forms `scripts/check-catalog-references.mjs` matches, in the
   shipped capability and the canonical docs; no version change, the
   `oats.knowledge-theory` patch bump left to the release lane's next framework
   prep; the lane:setup green light and the release lane's sign-off are posted on
   the PR. `docs/release-lane.md` at `904534c3`, "Releasing `oats.framework`",
   step 1: the framework prep bumps each changed capability's `oats.json`.
3. Read at maintainer review: the drift at
   [#2135](https://github.com/oats-project/oats/pull/2135) (framework 1.31.0 prep)
   then [#2136](https://github.com/oats-project/oats/pull/2136) (the 0.70.8 prep,
   which changed the packaged guide), and for oats.okf at
   [#2007](https://github.com/oats-project/oats/pull/2007), which changed
   `oats.setup`'s `oats-package-pins` and `oats-onboarding` skills;
   [#2145](https://github.com/oats-project/oats/issues/2145) is open for that class.
4. Source-reported: the release lane's agreement, by message, that the
   `oats.knowledge-theory` patch bump rides its next framework prep.
