---
type: Decision
title: Retire warnings preserve event meaning and reader bounds
description: Record retire-hook warnings under their own event kind before later failures can erase them, and enforce a shared text bound in the strict reader's units rather than widening launch semantics or relying on every writer.
about: [system/oats-kernel]
id: dec-59e05fe3b4ba
tags: [kernel, retire, hooks, events, compatibility, rejected-alternatives]
timestamp: 2026-11-05
---
# Decision and rationale

On 2026-11-05 both maintainer sides chose a distinct `retire-warning` event
with `data: {message}`, written to the workspace log when the retire hooks
return [1][2]. A successful hook can still report an action someone needs to
take. Keeping that warning only in the immediate answer loses its usefulness
once the caller moves on, and a home-local record cannot survive removal.

The event belongs to the **hook invocation**, not to the eventual retirement
outcome. Write each warning before later fallible steps, so refusal or
quarantine does not erase what the hooks reported. In the source's account,
a later refusal's error carries no warnings. Each actual rerun of the hooks
adds its own rows without deduplication or rewriting earlier rows; this
applies the [per-attempt evidence requirement](retire-hook-retry-stays-inside-authorizing-completion.md),
not a new authorization to retry.

# Rejected reuse changes meaning even when the shape fits

Reusing `launch-warning` would leave the data shape unchanged but widen its
documented start/restart meaning. A consumer filtering for launch trouble
would then receive retire actions. The source initially treated reuse as
contract-free and corrected that judgment before implementation. **An
existing kind is reused unchanged only if its meaning stays unchanged too.**
The [contract-refinement agreement rule](../lessons/contract-approval-does-not-carry-across-refinement.md)
already owns the approval obligation; this is a concrete application, not a
second review policy.

The new kind was chosen because it preserves existing meanings and the
published unknown-kind rule permits additive kinds [1][2]. That rationale
does not prove every client presents the warning usefully.

Other rejected placements:

- **Attach warnings to terminal outcome rows such as `retired` or
  `retire-refused`.** That changes client-read fields and couples each warning
  to whichever outcome ends the attempt. An early warning row survives later
  failures without waiting for successful retirement.
- **Put warning text in the hook receipt's boolean `meta`.** Text is not that
  boolean's meaning or type; the receipt and existing outcome rows stay
  unchanged.

# Bound persisted text where every writer meets

The answering side required the new kind to handle untrusted hook text at
least as strictly as launch warnings, with both hardened if launch warnings
had no bound [2]. The selected design applies one stored-message rule at the
common append boundary for both kinds, rather than at individual call sites
[3]. The source reports many launch-warning writers: per-writer cleaning
would let the next caller omit it.

The crucial choice is **the unit the strict reader counts**. The proposal
reports that Desktop's detail validator counts UTF-16 code units and refuses
the whole events read for one oversized detail. Cutting by code points can
leave astral text at nearly twice that budget. The design therefore uses the
reader's 2048-unit budget without splitting a surrogate pair, after replacing
refused control text with U+FFFD [3]. The earlier note's code-point bound is
not the final choice. Exact current bounds and character sets belong in the
producer, consumer contract and tests, not in a competing specification here.

This is a bounded stored representation; the immediate answers keep their
original warning text. The kernel records hook text without interpreting it,
and client handling must treat it as plain text, not markup or instructions.
Character replacement and truncation **do not redact credentials or establish
that hook output is safe to disclose**. The existing [hook-output disclosure
lesson](../lessons/hook-and-error-channels-disclose.md) retains that separate
obligation. Nor does an advisory action in a row become permission to run it.

# Enforcement and limits

The elimination route is the shared append rule plus regressions for both
warning kinds, astral boundary cases, refused/quarantined outcomes and retries
that preserve earlier rows. This tests storage and reader compatibility
instead of relying on a reminder at each writer. The implementation PR
reports such tests; this harvest did not audit code, rerun tests or verify
end-to-end Desktop presentation.

This decision records the retire design, not a universal new lifecycle event
schema. Spawn-hook warnings were explicitly separate work; Desktop's new-kind
presentation and the CLI's text-mode shortening were not decided here. No
human-accepted decision is superseded.

# Evidence

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-retire-hook-warnings-kept, 2026-11-05; notes/retire-hook-warnings-design.md.

1. [First-side alternatives and recommendation](https://github.com/oats-project/oats/issues/1749#issuecomment-6664334101), posted 2026-11-05; read at harvest. It records the semantic cost of reuse and the invocation-versus-outcome choice.
2. [Other-side agreement and build conditions](https://github.com/oats-project/oats/issues/1749#issuecomment-6664347456), posted 2026-11-05; read at harvest. Both comments corroborate the maintainer-lane decision, not independently established human acceptance.
3. [Implementation PR #1752](https://github.com/oats-project/oats/pull/1752), read on 2026-11-05 while open at `f94565e19d7d79c9ee0bc0afed5e0689c37e9f45`. Its description corroborates the shared append rule and UTF-16 correction. The proposal supplies the whole-read rejection rationale; no implementation, merge, release or deployment is certified. The captured note preserves the earlier reuse choice followed by its correction, but still says code points; the proposal explicitly corrects that later bound.
