---
type: Lesson
title: An older Desktop does worse against a newer kernel where it words the consequence itself
description: In the traced kernel minors, the N-1 Desktop did worse than show less or be refused in four cases, all where it writes the consequence sentence of a destructive action (Stop, Remove) or saves a whole definition (schedule edit). API integers and feature names never caught them, because each change kept the JSON shape and changed its meaning.
about: [system/oats-desktop, system/oats-kernel]
kind: lesson
id: ins-52bdf31616b6
tags: [desktop, kernel, version-skew, compatibility, lifecycle, schedules]
timestamp: 2026-11-12
---

# What was observed

For each kernel minor from 0.27 to 0.69, the question was what the latest Desktop of the previous minor would do against kernel N. Four cases did worse than show less or be refused. Each was re-checked at its tags:

| Kernel | Surface | The older Desktop | The newer kernel |
|---|---|---|---|
| 0.40 | schedule edit | drops `description` from its draft and saves the whole definition | replaces the whole definition, so the description is lost without notice |
| 0.49 | Remove | always says "Branches and pull requests are not changed" | retiring an interrupted spawn's leftover deletes its empty branch |
| 0.52 | Stop outcome | shows "Didn't stop" for every failed row | a harness that exited, where only recording the stop failed, comes back as a failed row |
| 0.53 | Remove | offers delete or move-aside of the worktree from `workMode` alone | leaves a `work/` link under a worktree record untouched, whatever was chosen |

Two traced refusals were harmless: `--delete-branch` at 0.41 and `E_LIFECYCLE_BUSY` at 0.51. A refusal is safe; a sentence that is no longer true is not.

**What the four cases share:**
- None loses committed work.
- Each sits where the Desktop authors a consequence itself, or writes a whole record built from a partial read.
- Each was safe in practice only because the kernel change landed beside its Desktop fix in the same minor, behind the per-minor ceiling.
- `desktopApi` stayed 1 from July 2026 through 0.69 and was never bumped. So the exclusive ceiling, not the API integer, was the real breaking-change gate.

# How to apply

- **Judging whether an older client can safely meet a newer producer:** look first at the surfaces where the client words the outcome or writes a whole record, not at whether the JSON still parses.
  - Surfaces that render the producer's own preview, or apply under the producer's fence (`--expect-decision`, or `--plan-revision` as in [a retire revision binds reviewed facts](/nodes/oats-kernel-expert/decisions/retire-revision-binds-reviewed-facts.md)), carry much less of this risk.
- **Changing the kernel:** a change of meaning under an unchanged shape is the case shape checks miss. Either land the Desktop's fix beside it, or make it visible to older Desktops. Today that visibility is the soft ceiling's hold-back; a per-surface fence would be a further decision.
- **Limits of the record:** 0.54 to 0.69 were listed, not traced, and 0.27 to 0.39 were screened from release notes only. The four cases are a lower bound.

Relates to: [prove coupled Desktop changes](/nodes/oats-desktop-expert/lessons/coupled-kernel-and-desktop-landings.md) (confirms that a kernel change can make an existing Desktop actively wrong; this lesson says where); [a client's sentence must hold at every producer](/nodes/oats-desktop-expert/lessons/client-wording-must-hold-at-every-code-producer.md) (the same client-authored sentences, audited across producers rather than across versions); [the decision built on it](../decisions/desktop-cli-ceiling-is-a-tested-bound-with-an-allowlist.md).

Evidence: OKF proposal from oats-engineering-expert/oats-engineering-expert-desktop-cli-ceiling, 2026-11-12; notes/older-desktop-did-worse-in-lifecycle-and-schedule-writes.md, notes/desktop-ceiling-is-the-de-facto-break-gate.md.

Maintainer review of oats-knowledge#367 on 2026-11-12 checked that the table, the two harmless refusals, the untraced ranges and the shared traits match the traced record in [oats-project/oats#1879](https://github.com/oats-project/oats/issues/1879) (code read at `288ca5c61`), and that the first locator (`53a20c71d`, 2026-07-24) accepted exactly one minor. The per-tag re-checks and the probe are source-reported; this review did not re-trace the tags.
