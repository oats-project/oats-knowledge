---
type: Lesson
title: A kernel fail-closed guarantee is proven only by its first real capability user
description: A required-hook mechanism shipped green and protected nothing because the capability it was built for exited clean on every fatal path; enforcement, its intended user, and the schema must move together.
about: [system/oats-kernel]
kind: lesson
id: ins-934556f1f2e8
tags: [kernel, hooks, capabilities, fail-closed, contracts, testing]
timestamp: 2026-07-27
---
# Lesson

Learned 2026-07-27. Required spawn hooks were implemented, tested with fixture
hooks, and green: a nonzero exit fails the spawn and rolls it back. The
mechanism protected nothing, because the capability it was built for caught
every fatal condition — missing tool, missing root, every minting exception —
printed a warning and exited clean. The kernel saw success; an instance started
with no messaging, precisely the outcome the flag existed to prevent.

**A fail-closed mechanism is only as strong as the exit code of its first
user.** The change that adds enforcement must convert its intended user in the
same change, and the test must execute the shipped implementation. Fixture
hooks that fail on demand prove the kernel half and nothing about whether any
real capability will ever trigger it.

**A failing hook's stdout is its only channel for external state it already
created.** Discarding it on failure left rollback with nothing to compensate,
so a failure after a remote identity was minted stranded that identity. Parse
hook output on the failure path exactly as on success, and have the hook record
external state the instant it exists, not when it finishes — the failure may
arrive in between. A compensation hook that could not finish must exit
nonzero, and "nothing to undo" must be distinguishable from "tried and failed"
at the source, or the caller cannot tell completion from silent loss.

**Fixing the obvious paths is not fixing the class.** The first correction made
the visible failures fatal and left three more terminal paths warning on a
clean exit. When converting a component to fail closed, enumerate *every* exit
and ask whether the guaranteed thing actually happened; do not patch the paths
a reviewer happened to name.

**Converting a path to fatal is a claim that the path is correct.** Making a
membership check fatal turned a latent field-name drift into a hard block on
every spawn; while the mismatch only warned, nobody noticed. The moment before a
path becomes fatal is the moment to verify it against the real tool's output —
not against the fixture written alongside the bug, which agreed with the
defect.

**Keep the distinction the decision rests on.** The founder separated "the
capability cannot function" (fatal) from advisory trouble (warn). Making
everything fatal would have been easier and wrong: every transient annoyance
becomes a spawn blocker and the mechanism is discredited.

**The published schema must not accept what the runtime refuses.** A schema
that admitted a constraint the loader rejected let authoring tools approve
manifests OATS would not load; any load-time constraint needs the same
constraint in the public schema, tested in both directions.

# Related

[Preserve recovery authority until the outcome is proven](../decisions/preserve-authority-until-cleanup-is-proven.md);
[Hook failures and error messages are output channels](hook-and-error-channels-disclose.md);
[Keep kernel responsibilities generic and capability runtimes complete](../decisions/kernel-and-capability-responsibility.md).

# Citations

1. Migrated from agents/cli-dev/soul/knowledge @ 7838d3ca (required-hook-guarantee-first-user).
