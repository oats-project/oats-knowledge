---
type: Decision
title: Unknown hook events are forward-tolerant unless required
description: Non-required hook events may be skipped to preserve capability composition, but required events still refuse and the tolerance starts only at OATS 0.49.0.
about: [system/oats-kernel]
id: dec-23278819c0b2
tags: [kernel, hooks, capabilities, compatibility, manifests, fail-closed]
timestamp: 2026-10-08
---
# Decision and rationale

The proposal and backing note record agreement on 2026-10-08 by OATS
maintainers `oats-expert-juan` and `oats-maintainer-lfx`: tolerate unknown hook
event names only when the capability author has not declared the hook
required. The implementation merged on 2026-10-08 for OATS 0.49.0, which was
still unreleased on that date [1][2].

A closed event set made adding one event reject the whole capability on an
older host, not merely disable the new step. Every soul composing that
capability then became unavailable. The source reports that LFX encountered
this failure, and that introducing the `worktree` event would repeat it.
Optional event evolution should not impose that capability-wide failure;
a step declared essential must still fail closed when the kernel cannot run
it. This is the reason for distinguishing optional from required hooks,
not a general relaxation of manifest validation.

The boundary chosen is narrow:

- An unknown event declared as a command string, `{ command }`, or
  `{ command, required: false }` does not prevent composition. It never runs,
  and the kernel warns with `hook-event-unsupported`.
- An unknown event declared `required: true` is refused. Silently skipping it
  would defeat the author's enforcement requirement.
- Only the event name is tolerated. The declaration still needs a command,
  permitted keys, a boolean `required` when present, and a script contained
  within the capability; malformed declarations are not made acceptable.

The live contract belongs in the
[capability documentation](https://github.com/awebai/oats/blob/main/docs/capabilities.md)
and [manifest schema](https://github.com/awebai/oats/blob/main/docs/capability-manifest.schema.json).
This decision preserves why the boundary exists.

# Rejected alternatives

- **Tolerate every unknown event:** this would fail open for a hook the
  capability author explicitly declared essential.
- **Add a top-level opt-out key like `launchPreview`:** this would add another
  knob for the same distinction instead of using the hook's existing
  `required` declaration.

# Compatibility limit and partial supersession

**The tolerance begins at OATS 0.49.0; it does not change older kernels.**
Before that release every unknown event still rejects the capability. A
provider introducing a new event still needs an appropriate
`compatibility.oats` floor, and every host composing it must be upgraded to
that floor before adoption. Tolerating an event also does not prove support
for executing it.

This partly supersedes the closed-validator rule in
[Compatibility follows supported adoption](evidence-bounded-compatibility-and-migration.md):
from 0.49.0, a new non-required hook event name alone no longer requires a
kernel that knows that particular event. The rule remains for other new
manifest fields and unknown required events. Supported-adoption obligations,
whole-scope migration refusal, and the separation of kernel upgrades from
provider floors are unchanged.

This preserves the distinction in
[A kernel fail-closed guarantee is proven only by its first real capability user](../lessons/fail-closed-mechanism-proven-by-first-user.md):
required enforcement must be real, while advisory absence must not become an
unrelated blocker.

# Citations

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-worktree-setup, 2026-10-08; notes/forward-tolerant-hook-events.md.

1. The proposal and note identify [awebai/oats#800](https://github.com/awebai/oats/pull/800), merged as `598d0044`, as the implementation; see [OATS 0.49.0 release notes](https://github.com/awebai/oats/blob/main/docs/release-notes/v0.49.0.md).
2. Maintainer verification, 2026-10-08: [awebai/oats#800](https://github.com/awebai/oats/pull/800) (merged as `598d0044`) records the maintainers' decision, the required/non-required boundary, the pre-0.49.0 limit, and that this supersession goes through the knowledge proposal path; the 0.49.0 release notes on main (marked Unreleased) describe the same contract.
