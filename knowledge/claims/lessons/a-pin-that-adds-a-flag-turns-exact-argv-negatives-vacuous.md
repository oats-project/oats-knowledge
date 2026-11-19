---
type: Lesson
title: A provider pin that adds a flag to an argv turns the kernel's exact-argv "never ran" checks vacuous
description: When a provider release adds a flag to a command the kernel's mirror-hook tests watch, update the positive checks to the release's exact new argv, and rewrite every negative "this never ran" check to match on the command and its operand prefix; an exact-string negative passes silently whatever ran. Run `npm ci` in a fresh tree before running even one such file.
about: [workstream/provider-integration]
kind: lesson
id: ins-089b7fee0aeb
tags: [lesson, testing, mirror, pins, fakes, argv]
timestamp: 2026-11-19
---

# What was observed

The pin of oats.aweb 1.43.0 (oats-project/oats#1969) failed 15 of the kernel's own
tests of the mirrored hook. One cause: grant revoke and show gained `--team=<team>`, so
`id grant revoke <id> --json` became `id grant revoke <id> --team=<team> --json`.

The positive checks compared the whole argv joined to a string, so they failed loudly.
Two negative checks were written the same way: "the old grant was never revoked" as
`argv.join(" ") === "id grant revoke grant-old --json"` being false. Under the new argv
that string can never match, so those checks still passed. They would have kept passing
if the hook had revoked the old grant. Nothing in CI pointed at them, because they never
failed.

Running one such test file in a freshly made extra tree had its own trap. Every test
failed with an error saying the aw version could not be read, which looks like a provider
or aw-floor problem. The real cause was the fake `aw`: it `require`s a test helper that
needs the repository's `yaml` package, and the tree had no `node_modules`, so the fake
crashed before printing its version.

# Rule

- When a pin changes an argv, grep the kernel's tests for every check on that command,
  not only the failing ones. Update each positive check to the release's exact new
  argv, taken from the mirror code and the package's own tests at the tag.
- Rewrite each negative check to match the command and its identifying operands as a
  prefix (for example `argv.slice(0, 4)` for `id grant revoke <id>`), so a check that
  "X never ran" catches X whatever flags follow. That check is stronger than the old
  one. It is not a loosening. It is also not the substring weakening that
  [a fake CLI that accepts what the real binary refuses](/nodes/integrations-expert/lessons/a-fake-cli-that-accepts-what-the-real-binary-refuses-hides-a-broken-hook.md)
  rules out for a refusal classifier: the leading argv tokens must equal the command
  and its operands exactly.
- Before running a kernel test file in a new tree, run `npm ci` to install the
  repository's packages. A wall of identical failures from a fake CLI is an environment
  fact, not a verdict on the provider. This is the kernel-test counterpart of the Desktop
  note in [a provider release is mirrored and pinned in one PR](/nodes/integrations-expert/lessons/a-provider-release-is-mirrored-and-pinned-in-one-pr.md).

# Why

A pin's red tests show what changed, while a negative check that turned vacuous shows
nothing. A pin adaptation that says no assertion was loosened has to cover the negatives
that went vacuous too, and a reviewer catches those only if the adapter looked for them.

Elimination route: one shared "attempted" helper per watched command (as hook-1-13 now
has), so negatives never compare a whole argv string. Until every test file uses one,
the grep in the first rule is the check.

# Citations

Evidence: OKF proposal from oats-engineering-expert/aweb-pin-test-fixes-lead, 2026-11-19; notes/aweb-1.43.0-test-causes.md.

Maintainer review of oats-knowledge#410 read commit `0ea9c0ef` of [oats-project/oats#1969](https://github.com/oats-project/oats/pull/1969), the PR's head, merged 2026-11-19. Verified there:
- the commit message's 15 failing tests and the `--team=<team>` change from [awebai/oats-aweb#279](https://github.com/awebai/oats-aweb/pull/279);
- the two hook-1-13 negatives on `grant-old` rewritten from a whole-argv string to `revokeAttempted`, which compares `argv.slice(0, 4)`;
- CI green at that head.

Also verified at that commit: the fake `aw` loads `test/helpers/fake-aw-grants.cjs`, which requires `yaml`, a package in the root `dependencies`. The exact error text in the fresh tree, and that `npm ci` cleared it, are the source's report.
