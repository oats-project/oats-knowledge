---
type: Lesson
title: The package's Git and gh calls see only HOME-level configuration; a scratch deployment needs the credential helper in its HOME
description: oats.okf runs `git` and `gh` with every `GIT_*`, `PI_AGENT*` and `OATS_*` variable removed (except `OATS_HOME_DIR` and `OATS_PACKAGE_CATALOG`), so a scratch deployment's private base gets its credentials only from Git configuration found without those variables, such as a credential helper in the HOME's own `~/.gitconfig`, and a `GIT_CONFIG_GLOBAL` pointed elsewhere is ignored and the clone fails with reason `auth`.
about: [system/oats-okf]
kind: lesson
id: ins-ae84dc2778d4
tags: [lesson, okf, rehearsal, credentials, environment, deployment]
timestamp: 2026-11-11
---

# Two traps of a scratch deployment

1. **Credentials.** The package's `exec` removes every `GIT_*`, `PI_AGENT*` and `OATS_*` variable (except
   `OATS_HOME_DIR` and `OATS_PACKAGE_CATALOG`) before running `git` or `gh`, on purpose: inherited Git selectors are
   a custody risk. A scratch HOME therefore needs its own `~/.gitconfig` with the credential helper (for example
   `[credential] helper = !gh auth git-credential`) and a reachable gh configuration (`GH_CONFIG_DIR` is not
   removed). Pointing `GIT_CONFIG_GLOBAL` at a file does nothing, and priming the base fails with
   "clone failed (reason: auth)".
2. **Dispatch.** From inside a running instance's session, inherited `OATS_INSTANCE` and `OATS_INSTANCE_HOME` make
   `oats okf` resolve through that home's composed modules, an older package than the deployment under test. Unset
   them (and `OATS_HOME`, `OATS_SOUL`) in the scratch shell. This is the same family as
   [a local Git base under the instance home is refused](/nodes/oats-okf-expert/lessons/a-local-git-base-under-the-instance-home-is-refused-as-disposable-custody.md):
   rehearse with a cleared environment.

# Retire when

The README's operator section says where the package's Git credentials must come from; until then this lesson is
the only record of the trap.

# Evidence

- Maintainer check at acceptance (11 November 2026): `cleanEnv` in `lib/io.mjs` of oats.okf 6.0.2 removes
  `^(OATS_(?!HOME_DIR$|PACKAGE_CATALOG$)|PI_AGENT|GIT_)`, and `lib/stores.mjs` classifies an authentication failure
  as reason `auth`.
- Source-reported: the 6.0.0 and 6.0.1 release rehearsals on a scratch deployment bound to a private scratch
  repository (11 November 2026), where both traps were met; the dispatch trap is kernel behaviour this review did
  not reproduce.
- Backing note: the proposer's note on the cleaned clone environment (proposal of 11 November 2026, live source
  kb-by-subject-okf-expert).
