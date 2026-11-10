---
type: Lesson
title: A CLI decision made in two layers, or copied per command, drifts
description: Keep CLI policy in one authoritative rule, pin unavoidable mirrors, make fallbacks structural, and check a proposed writer's flags against write semantics before approval.
about: [system/oats-kernel]
kind: lesson
id: ins-a7fa51b4a1d7
tags: [kernel, cli, dispatch, guards, flags, servers, review]
timestamp: 2026-10-15
---
# Lesson

Learned in CLI reviews of 2026-07-24 → 2026-09-06. The CLI decides routing,
help, remote targets and flag values in more than one layer, and each time a
decision was written twice, or once per command, the copies disagreed without
any test noticing.

**One predicate, one layer.** An outer dispatch allowlist and the handler's
refusal once tested the same predicate: `okf … --server` was routed only for
`harvest`, so the handler's "harvest only" refusal was unreachable and every
other `okf` subcommand with `--server` fell through and ran *locally*, with the
flag handed to the capability as a stray argument. Whichever copy is narrower
wins; the other is dead or fails open. Route on the coarse namespace and
refuse precisely in the handler, where the diagnostic can be written well. The
check: for each shape a guard rejects, ask what the CLI does if the guard is
deleted; "runs something else silently" means the guard sits in the wrong
layer.

**A hand-copied mirror needs a pin.** The set that stops `--help` from
executing a builtin is a hand-maintained copy of the dispatch chain, and no
test ties the two. A new command added to the chain but not to the set gets
the side-effecting `--help` back, invisibly at the call site. Both sides are
literals in one file, so a set-equality test is cheap; until it exists, review
every new dispatch branch for its entry.

**A preamble that branches per command strands the next route.** "Consult the
saved route before the registry" is structural for session routes (the
snapshot short-circuits the registry lookup) but was written for command
routes by naming the commands that get it. A new route whose own branch was
correct still failed on exactly the removed-registration case the module
exists to survive, because the registry lookup above it had already thrown.
For any function whose preamble branches on the command, enumerate the
commands and ask which preamble each new one inherits; the fix is the
unconditional structural form, not another name in the list.

**A value flag's boolean fallback travels.** The shared flag reader returns
`true` when the next token is another flag, so `--task --purpose x` once
carried a boolean into spawn and crashed after the home was created, leaving
a half-scaffolded instance. Every value-carrying flag reads through a helper
that refuses a missing value, and the kernel type-checks what it receives
before any side effect.

## A proposed grammar can drift before code exists

**Check a new writer against write semantics before asking for approval, not
against the read verb beside it.** For each borrowed flag, compare the proposed
operation with existing write-command refusals and the shared admission rule.
Namespace proximity is not evidence that two verbs may reuse the same inputs.

In the source's account of 2026-10-12, the proposed `oats soul launch set|remove`
grammar copied `--max-age` from the read form of `oats soul teams`. The maintainer
accepted that grammar before a developer's question about its `observation`
answer exposed the mismatch: observation reuse was read-only, while edit forms
and spawn apply refused it and observed live. The shared allow-list already
refused an unlisted command; the failure was in the proposed contract, not an
observed runtime write. Correcting it required another decision round [2].

The distinction protects more than consistency. A writer resolving a soul name
from a reused observation could persist the key of a soul the workspace no
longer offers—the unmatched launch-preference key the new writer was meant to
prevent. This is the rationale for the refusal, not a claim that such a stale
write occurred [2].

Keep enforcement in the shared admission rule and cover new writers with
flag-refusal tests. Those tests protect execution, but cannot validate a grammar
that exists only in an issue. The remaining elimination route is to put this
semantic check in specification-authoring guidance, or check executable grammar
examples against the shared policy where supported. No new tooling is claimed
here. The lasting lesson is when and against which operations to check a draft,
not a second table of accepted flags.

## Explicit refinement: preview-bound spawn apply (2026-10-15)

The earlier incident's read-only observation-reuse boundary now has one
source-reported exception: [a preview-bound spawn apply may reuse observations](/nodes/oats-kernel-expert/decisions/preview-bound-apply-may-reuse-observations.md).
That decision owns the exception and its rationale: a valued decision fence
binds apply to the confirmed preview. The launch-preference writers above
still refuse reuse, as does an apply without that fence. Keep the historical
account and shared admission rule; do not treat this refinement as permission
to copy read-side flags into other writers.

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-spawn-resolution-speed, 2026-10-15; notes/preview-bound-apply-may-reuse-observations.md.

# Related

[The CLI as a machine boundary](machine-boundary-contract.md);
[A refusal that needs the old bytes is a pre-commit gate](refusal-belongs-before-commit.md);
[Identity and location belong to the resolved object](resolved-object-not-referring-string.md).

# Current contracts

- [Current servers.md](https://github.com/awebai/oats/blob/main/docs/servers.md)
- [Current oats.mjs](https://github.com/awebai/oats/blob/main/bin/oats.mjs)
- [Current desktop-cli-api.md, observation reuse](https://github.com/awebai/oats/blob/main/docs/desktop-cli-api.md#observation-reuse-feature-observe-max-age-oats-0311)

# Citations

1. Migrated from agents/cli-dev/soul/knowledge/lessons/dispatch-allowlist-strands-its-own-guard.md, help-allowlist-mirrors-the-dispatch-chain.md, snapshot-before-registry-is-per-command.md and task-flag-boolean-crash.md @ 7838d3ca.
2. The source reports the grammar correction on [awebai/oats#990](https://github.com/awebai/oats/issues/990#issuecomment-6133192790); the proposal also names [maintainer confirmation](https://github.com/awebai/oats/issues/990#issuecomment-6133200511). The incident and agreement are source-reported, not independently audited human acceptance. This harvest did not inspect the implementation or reproduce a stale write.
3. Verified by the knowledge maintainer at review of the harvest on
   2026-10-13. On awebai/oats#990 the kernel lead's specification carries
   `[--max-age <s>]` on both `set` and `remove`; the decision that follows
   accepts the grammar as given; the correction cited in [2] withdraws the
   flag, naming the standing rule and the stale-key reason; and the
   confirmation cited in [2] says the grammar was accepted without reading
   that rule. The confirmation is signed as the maintainer's side; this
   review did not establish it as a human acceptance. The repository's
   contract states the refusal, in the observation-reuse refusals and in the
   `oats soul launch` section's live read, but not the stale-key reason,
   which this lesson preserves. The thread attributes the discovery to the
   developer's reading of the code; that it began as a question about the
   `observation` answer rests on the source's note alone, which this review
   did not read. awebai/oats#1013 merged on 2026-10-12; its implementation
   was not audited here.

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-launch-pins, 2026-10-13; notes/write-verbs-refuse-max-age.md (incident dated 2026-10-12).
