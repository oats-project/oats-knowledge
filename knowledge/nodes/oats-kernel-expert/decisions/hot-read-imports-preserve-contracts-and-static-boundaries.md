---
type: Decision
title: Hot-read imports preserve contracts and static boundaries
description: Use a narrow hot-read import table with re-exported leaves and literal specifiers to reduce startup work without changing synchronous consumers, non-hot commands or soul-resolution errors.
about: [system/oats-kernel]
id: dec-0300d669fbcd
tags: [kernel, cli, performance, imports, compatibility, testing]
timestamp: 2026-10-28
---
# Selected design and scope

The source's 2026-10-28 design removes `core.mjs` from the import closure of
six frequently invoked forms: `version`, `session inspect`,
`status --max-age`, `workspace status --max-age`, `instance events` and
`instance waiting clear`. It deliberately optimizes those forms rather than
restructuring every command. This is source-selected direction, not a claim
of human acceptance or released behavior: the implementation was open at
the proposal checkpoint. The code and tests own the exact argv classifier.

Move whole functions to leaf modules and re-export them from their original
modules under the same names. Preserve `./core`'s public names, behavior and
sync/async shape. A leaf must not import `core.mjs` or the module it left;
otherwise the supposedly smaller closure pulls the old graph back in.
Module-level mutable state keeps exactly one owning module, rather than
creating independent caches or memo maps during the split.

# Why one narrow table, not a command-wide rewrite

The selected `lib/hot-reads.mjs` table substitutes leaves at the CLI's
existing import lines only for the recognized hot forms. Every other argv,
including help and unlisted flags, keeps the full imports in their original
order. The reason is bounded change: per-handler dynamic imports would
change dozens of handlers and the behavior exercised by a much larger test
surface without serving the startup goal.

The table accepts a maintenance risk: a later hot-path use might need a name
that its substitute does not supply. An unlisted name must therefore throw
a defect naming the form, import line and name. Returning an empty object
was rejected because it silently yields `undefined`, leaving an obscure
`TypeError` for an untested branch. Closure-absence and missing-name tests
are the enforcement route, not a permanent reliance on reviewer memory.

Library-internal `await import()` was also rejected where it would turn
synchronous exports asynchronous and break in-process callers. Re-exported
leaves reduce CLI loading without imposing that API migration.

# Literal specifiers preserve a separate proof boundary

The source reports that the first implementation's computed specifiers
blinded `test/client-boundary.test.mjs`: that guard reads literal imports to
prove the kernel's `lib/` and `bin/` do not import the client or Desktop
packages. A runtime-equivalent indirection was not equivalent evidence.

Keep the specifier as one string literal inside a thunk, for example
`kernelImport("core", () => import("../lib/core.mjs"))`, rather than passing
a string to `import(specifier)` or constructing leaf paths with templates.
The selected fix preserved the boundary test rather than weakening it to
accept imports it could no longer inspect. Future lazy-loading changes must
keep literal specifiers so they do not silently remove the guard's view of
the graph.

# Preserve error behavior even when it retains loading cost

The source rejected removing YAML parsing from instance resolution for
`instance events` and `instance waiting clear`. Resolution parses every soul
under the root, and two observable failures depend on that work:
`E_BAD_MANIFEST` for a harness/runtime disagreement in any soul, and the
names in `E_AMBIGUOUS_INSTANCE`. A flat reader or lazy soul resolution would
change those answers, including failure caused by an unrelated malformed
soul. Under a no-contract-change bound, that is not an acceptable startup
saving. Keep error-path equivalence, not just successful output equivalence.

One different effect was deliberately accepted by the source: validation of
packaged launch-prompt fixtures happens only in commands that load them, so
a corrupt installation may fail later instead of on every command. The
rationale is that these are package-integrity-covered files, not operator
input. This is not permission to defer validation of arbitrary user data.

# Evidence and related judgment

Evidence: OKF proposal from oats-kernel-expert/cli-startup-node-fixes-kernel-expert, 2026-10-28; notes/hot-read-extraction-boundary.md.

The proposal identifies [awebai/oats#1630](https://github.com/awebai/oats/issues/1630)
as the evaluation and [#1634](https://github.com/awebai/oats/pull/1634) as the
open implementation. Import-hook tracing, V8 coverage, output comparisons
and the boundary-test failure/fix are source-reported, not reproduced by
this harvest. Reported speedups are workload-dependent; macOS evidence was
limited to named test runs, not a performance measurement.

The [spawn-probe lesson](/nodes/oats-kernel-expert/lessons/spawn-probe-cost-is-claude-telemetry-flush.md)
owns workload-specific cost attribution, and the
[compile-cache decision](/nodes/oats-kernel-expert/decisions/compile-cache-stays-in-the-per-user-oats-home.md)
owns cache placement and environment rationale. Neither is superseded by
this import-boundary choice. The later
[warm-process lifetime lesson](/nodes/oats-kernel-expert/lessons/warm-process-state-needs-lifetime-classification.md)
explains why preserving one state owner is not enough when the same code is
called repeatedly without process exit; it does not change this extraction
decision. The
[CLI drift lesson](/nodes/oats-kernel-expert/lessons/per-command-enumerations-drift-from-the-dispatch.md)
explains why unavoidable dispatch mirrors need executable pins. Keep
closure, fallback-order, export/state parity and error-path regressions with
the implementation; this record does not certify their coverage.
