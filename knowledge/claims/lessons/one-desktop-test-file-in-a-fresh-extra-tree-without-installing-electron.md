---
type: Lesson
title: "One Desktop test file runs in a fresh extra tree by linking an existing clone's Desktop node_modules; a symlink escapes the node_modules/ ignore rule"
description: "An oats extra tree has no dependencies; linking a clone's packages/desktop/node_modules runs one jsdom test file without installing Electron, and npm ci --ignore-scripts at the root is enough for npm run validate. Git's node_modules/ pattern matches directories only, so the link shows as untracked: stage by name and remove it after the run."
id: ins-7814bfa32b43
about: [system/oats-desktop]
kind: lesson
tags: [tests, desktop, worktrees, git, local-gate]
timestamp: 2026-11-25
---

# What happened

A lead building a small Desktop fix in an extra tree made by `oats worktree add` needed to confirm
one test file, `packages/desktop/test/mail-sheet.test.mjs`, which the repository's gate allows
locally. The tree had no `node_modules`: the file imports `jsdom`, and installing the Desktop's
dependencies pulls Electron. `npm run validate` also failed, missing `ajv`.

# The lesson

- **One Desktop test file:** symlink an existing clone's `packages/desktop/node_modules` into the
  tree's `packages/desktop/`, run the file with `node --test`, then remove the link. Nothing is
  installed and nothing is built.
- **`npm run validate`:** `npm ci --ignore-scripts` at the root installs about 140 small packages
  (`ajv`, `yaml` and their dependencies), which Git ignores.
- **The trap:** `.gitignore`'s `node_modules/` has a trailing slash, so it matches directories only.
  A symlink named `node_modules` is not a directory to Git: it shows as untracked, and `git add -A`
  would commit it. Stage files by name, and remove the link right after the run.

**Elimination route:** the trap is a one-character fix in the repository, not a lesson to carry.
Writing the root `.gitignore` pattern as `node_modules` (no trailing slash) ignores the link as well
as the directory. Until that lands, stage by name.

Relates to: [Desktop live checks run headless on a shared host](/claims/lessons/desktop-live-checks-run-headless-on-a-shared-host.md)
(its npm 11 note on Electron's install script, for when Electron is installed after all).

# Citations

1. oats-project/oats at 39031dc5 (verified at review): `AGENTS.md` "Gates" (no suites locally; `npm run
   validate`, `npm run check` and at most one or two test files); `.gitignore` line 18 `node_modules/`;
   `packages/desktop/test/mail-sheet.test.mjs` imports `jsdom`; `packages/desktop/package.json` depends
   on `electron` and `jsdom`; `scripts/validate-project.mjs` imports `ajv`, a root dependency; the root
   lock holds about 140 non-optional packages.
2. Git's gitignore rule that a pattern ending in a slash matches only a directory, reproduced at review:
   a symlink named `node_modules` was reported untracked while a directory of that name was ignored.
3. oats-project/oats PR 2139, merged 2026-11-25 with CI green; its body records the 21/21 local run.

Evidence: OKF proposal from oats-engineering-expert/mail-identity-decoder-lead, 2026-11-25; oats-project/oats PR 2139 (the file passed 21/21 locally, then in CI); notes/desktop-test-file-without-installing-electron.md.
