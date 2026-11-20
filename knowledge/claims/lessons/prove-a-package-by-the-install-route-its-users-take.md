---
type: Lesson
title: Prove a package by the install route its users take, not only from a checkout
description: A bb plugin passed typecheck, 211 tests, a live run and eight fresh review rounds while its documented git install failed, because every check installed it from a local checkout, where development dependencies are present. The fault showed only when the README's install line was run.
about: [workstream/provider-integration]
kind: lesson
id: ins-1829d19b2559
tags: [packaging, install, dependencies, bb, plugin, verification]
timestamp: 2026-11-20
---

# What happened

The OATS plugin for bb was built and reviewed on a staging branch. All its checks, unit and live,
installed the plugin from the checkout (bb's path install), which uses the dependencies already
installed there, development ones included. The route its README gives users is a git install,
which in bb 0.50.1 omits development dependencies. The plugin imports its contract module as a
value in the frontend, so bb's build needed the plugin SDK from the plugin's own install, and the
SDK was listed as a development dependency. The git install failed at the build. Three review
loops (eight fresh rounds) and the specifier's verification had passed before the first review
round of the plugin's move into its own repository ran the README's line.

# The lesson

- A check that installs from the author's tree proves the code, not the package. Which
  dependencies, files and build steps reach a user depends on the install route.
- Put the users' route in the live checks from the first version: install as the README says
  (from git, from the registry, from the package manager), then run one real read.
- When a reviewer is briefed, name the documented install line as something to run, not to read.

The elimination route was taken: the plugin's live checks now install it by git and read a
deployment through it (check G1).

# Related

- [A fake CLI that accepts what the real binary refuses hides a broken hook](/nodes/integrations-expert/lessons/a-fake-cli-that-accepts-what-the-real-binary-refuses-hides-a-broken-hook.md)
  is the same lesson on the other side of a provider: accept it against what users actually run.

# Citations

1. Evidence: OKF proposal from oats-engineering-expert/bb-plugin-specialist, 2026-11-20;
   notes/bb-plugin-backend-probe-findings.md.
2. oats-project/oats-bb `3f47d30` ("the git install route works: the SDK is a dependency, and a
   live check installs by git"), read at maintainer review 2026-11-20: the move's review round 1
   found the README's install line failing on bb 0.50.1 because a git install omits
   devDependencies and bb's frontend build bundles the SDK from the plugin's own install;
   `@get-bb/plugin-sdk` moved to `dependencies`, and `plugin/container/live.sh` gained G1, which
   installs by `git:` and reads the plugin.
3. [oats-project/oats-bb#1](https://github.com/oats-project/oats-bb/pull/1), merged 2026-11-20,
   read at maintainer review 2026-11-20: its description reports 211 unit tests and the review
   loops (frontend four fresh rounds, backend three, the combined change one, then the move's
   two). The counts, and that the check fails with the SDK moved back, are the PR's and the
   source's report; review ran no bb.
