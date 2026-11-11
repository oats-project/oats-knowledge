---
type: Lesson
id: ins-fa7a35ce1a06
title: A local Git base under the calling instance's home is refused as disposable source custody
description: Run from inside an instance (ambient `OATS_INSTANCE_HOME`), the 5.8 CLI (and 6.0.2, whose check is unchanged) refuses a local-path `kind: git` base lying under that home with `E_PATH: Git locator is disposable source custody`; a local-binding rehearsal runs the CLI with a cleared environment and keeps the bound repository, including `TMPDIR`, outside the home. The refusal is correct protection; the trap is in the rehearsal setup.
about: [system/oats-okf]
kind: lesson
tags: [lesson, okf, consult, rehearsal, bindings, git, custody]
timestamp: 2026-11-10
---

# The trap

Rehearsing consult against a local bare repository bound as a `kind: git` base, from inside an instance session, the
5.8.0 CLI answered `E_PATH: Git locator is disposable source custody` whenever the repository lay under the calling
instance's home (the ambient `OATS_INSTANCE_HOME`), including when a temporary directory under `TMPDIR` pointed into
the home. Two reviewers reproduced the same refusal independently with their own temporary directories.

# What to do

Run the CLI with a cleared environment (`env -i` passing on only `PATH`, `HOME` and the OKF settings the rehearsal
needs) and keep the bound repository outside any instance home. The CLI takes its source home from
`OATS_INSTANCE_HOME`, else `OATS_HOME`, else the working directory, and the custody check applies when that directory
is an instance seat (it holds `instance.json`). The refusal protects a home from becoming knowledge custody and is not a bug.

# Evidence

Bridge PR rehearsal, 10 November 2026 (oats-knowledge #342): observed on 5.8.0 `bin/oats-okf.mjs`, fixed by the
cleared environment in the rehearsal script; verified on 5.8.0. Maintainer check at acceptance (11 November 2026): the
refusal is in `lib/config.mjs` of 5.8.0 and, unchanged, of 6.0.2; the source home comes from `bin/oats-okf.mjs`
(5.8.0) and `consultSource` in `lib/sources.mjs` (6.0.2). Backing note: a local-binding rehearsal of 5.8
consult.
