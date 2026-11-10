---
type: Lesson
title: A raw-mode terminal child does not protect its wrapper's whole lifetime
description: Terminal signal handling must cover setup through cleanup, protect cleanup children from group signals, and allow pending signals to dispatch before the next side effect while preserving the child's outcome.
about: [system/oats-kernel]
kind: lesson
id: ins-5df65117e908
tags: [kernel, terminal, signals, cleanup, process-groups, event-loop, exit-status, testing]
timestamp: 2026-10-15
---
# Discovery and consequence

A terminal child's raw mode is temporary protection from the terminal's
signal-generating keys, not a property of the wrapping command. Before a
client such as tmux takes over terminal mode and after it restores that mode,
the line discipline can again signal the foreground process group. If the
Node wrapper is in that group, a key handled as input by the client can now
terminate the wrapper: `C-\` commonly maps to SIGQUIT, and `C-c` to SIGINT.
The actual mappings and foreground arrangement matter.

The source reported on 2026-10-09 that an unhandled SIGQUIT ended Node with
shell status 131, bypassing `finally`. With a listener installed, a signal
sent during a synchronous child call was handled after that call returned
and the process survived. Post-client work is still exposed: a repeated key
can arrive while the wrapper reads an outcome marker or tears down temporary
resources. Reviewing only the period when the interactive child is running
misses the failure.

For catchable termination signals in the command's terminal contract,
**install handling before the first side effect and keep it through cleanup**.
In particular, handling INT, TERM and HUP does not cover a QUIT-generating
key. A caught signal listener is not an inherited ignore disposition: on
POSIX exec, caught dispositions reset to their defaults. This is not a
promise of cleanup after a crash or an uncatchable signal.

# Preserve the outcome before destroying its evidence

The child's action can precede Node observing its exit. If that action has a
separate witness, the signal path must read it before cleanup removes it;
otherwise a completed user action can be reported as an interruption. The
source found this ordering necessary for a detach marker set by the key
binding before the client exited.

Nor does a clean child exit prove why it ended. The source observed cleanup
ending a tmux viewer client with status 0 before a subsequent child kill took
effect. Keep the command's semantic outcome distinct from the incidental
status produced by teardown. This applies the existing
[CLI machine-boundary lesson](/nodes/oats-kernel-expert/lessons/machine-boundary-contract.md),
not a new universal exit-code table.

# Cover cleanup children and signal dispatch, not just listeners

The 2026-10-15 source reports a second gap in real-tmux reproductions on
tmux 3.4: a late pty hang-up relayed when the wrapping shell died reached the
foreground process group, including the wrapper's synchronous cleanup child.
Terminal-generated INT can reach that group too. Keeping Node's listener
installed did not protect the `tmux kill-session` child from the same signal;
the cleanup could die and leave a viewer behind.

The reported remedy was to run the noninteractive preparation and cleanup
children in their own session and process group, while leaving the
interactive client in the foreground group. The source probed
`execFileSync(..., { detached: true })` on Node 26.8.2 and found distinct child
session/group IDs despite `detached` not being documented for the synchronous
API. It reports Node 22 CI coverage of the repaired lifecycle. Treat this as
a tested, version-bounded workaround, not a portable promise of the sync API
or a reason to detach the interactive client. Group isolation does not
protect a child from a signal addressed directly to it.

An inherited ignore disposition (`trap '' HUP` or `nohup`) was rejected for
these tmux calls: the source found that the tmux client installs its own
HUP/TERM handlers and exits on them. An inherited ignore is not protection
against a program replacing it. That client behavior was not re-verified
across tmux versions.

Listener installation is also distinct from listener execution. The source
found that a signal received during synchronous preparation remained pending
until Node reached a poll phase. Returning from the synchronous call and
immediately spawning the interactive client could therefore perform the very
side effect the signal should have prevented. The reported remedy yields
through two `setImmediate` hops, allowing an intervening poll phase, then
checks the interruption outcome before spawning. Preserve the dispatch
opportunity and the check, not merely an early listener or an arbitrary
delay. This addresses signals pending from preparation, not every possible
arrival between a check and a later side effect.

Tmux-side viewer self-destruction (`destroy-unattached` or a `client-detached`
hook) was considered to cover wrapper death, including SIGKILL, but rejected
as a replacement: the source found that `destroy-unattached` can destroy a
viewer still being prepared when another client leaves; it also identified
lost-client hook behavior across supported tmux versions as a compatibility
risk. Neither removes the need to handle interruption during preparation.
This is the reason for retaining wrapper-owned cleanup, not proof that every
tmux version's hooks fail or that SIGKILL cleanup is now guaranteed.

# Dated refinement of the plain-attach caveat

The 2026-10-09 review below correctly described the then-unchanged plain
attach path, but its warning that widening HUP/TERM/INT lifetime still needed
a decision is superseded by the 2026-10-15 proposal. The source reports that
the partner maintainer lane treated coverage from before preparation through completed
cleanup as a repair without a contract change, implemented in
[awebai/oats#1249](https://github.com/awebai/oats/pull/1249). Preserve the
reason: exit meanings do not change merely because those handlers now cover
the whole operation. This is source-reported maintainer disposition, not a
new human-acceptance receipt.

The [caller-chosen detach-key decision](/nodes/oats-kernel-expert/decisions/viewer-detach-key-is-caller-chosen.md)
remains authoritative for opt-in keyboard exit and status meanings. This
refinement introduces no default exit key, and SIGQUIT under a plain attach
remains a separate decision; full-lifetime HUP/TERM/INT is not coverage of
every signal.

# Elimination route

Fix the wrapper's signal-handler lifetime, cleanup-child process groups,
pending-signal dispatch boundary and outcome-before-cleanup ordering in code;
a remembered warning is not the fix. Guard those invariants
with deterministic boundary tests. A disposable executable shim ahead of the
real terminal client on a test-only PATH can signal its wrapper parent at the
post-client call, rather than depending on a human timing a second keypress.
Assert both resource cleanup and the semantic exit status, including when
the action witness already exists. Keep signal injection confined to the
test-owned process.

The proposal reports that removing either the QUIT listener or the handler's
marker read made the developer's tests fail. Retain that regression intent
when changing the interactive command; a no-terminal happy-path test cannot
prove it. The lasting knowledge is why setup and teardown belong to the
signal boundary even when raw-mode interaction itself appears safe.

Add real-tmux group-directed interruption coverage as well as parent-only
shim signals: the latter cannot reveal a cleanup child killed by the same
group signal. Exercise signals during synchronous preparation and during
cleanup, asserting both the semantic result and absence of the viewer.
Keep groups and servers test-owned. The 2026-10-15 source reports that the
new cases failed on the prior implementation, and that four mutations each
failed a test: removing listeners before cleanup, dropping child detachment,
installing listeners after preparation, and removing the poll-phase yield.
Those regressions, rather than this lesson, should guard the repair.

# Citations

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-attach-detach-key, 2026-10-09; notes/tty-quit-key-after-the-client-exits.md; notes/detach-exit-status-is-a-new-code.md.

The source attributes the implementation and tests to
[awebai/oats#856](https://github.com/awebai/oats/issues/856) and
[awebai/oats#858](https://github.com/awebai/oats/pull/858), with tmux 3.7c in its
reported probes. This harvest did not rerun the experiments or independently
verify the implementation's completion.

Verified by the knowledge maintainer at review of the harvest, 2026-10-09,
by reading [awebai/oats#858](https://github.com/awebai/oats/pull/858) at head
`b90a46ff`; nothing was run. The pull request was open, not merged, with
APPROVE verdicts from both maintainers posted on it. Its diff adds the QUIT
listener before the viewer is prepared and never removes it; the handler
reads the detach mark before it stops the attach; and a QUIT with no mark
answers a forced status, because the cleanup ends the client with tmux's own
0. Its tests put a `tmux` shim first on the command's PATH that sends QUIT to
its parent during preparation, at the marker read, at the cleanup and just
after the client exits, asserting the status and that nothing is left. Its
description lists the mutations this lesson names.

Historical scope of that review: the diff applied the full-lifetime rule
**to QUIT under a keyed attach only**. The decision on
[awebai/oats#856](https://github.com/awebai/oats/issues/856) kept a plain attach
as it was, and the pull request left its HUP, TERM and INT handlers added
after preparation and removed before final cleanup. The review therefore
warned that widening that path needed its own decision. The dated refinement
above supersedes that warning for HUP/TERM/INT, not the separate plain-QUIT
question. The earlier verdicts establish maintainer review, not human
acceptance.

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-attach-late-hangup, 2026-10-15; notes/attach-signal-lifetime-group-and-poll.md; notes/execfilesync-detached-and-tmux-signals.md.

The later source attributes the real-tmux reproduction to
[awebai/oats#1243](https://github.com/awebai/oats/issues/1243) and the repair to
[awebai/oats#1249](https://github.com/awebai/oats/pull/1249), reported merged
on 2026-10-15 at `26effa92`. It reports a local Node 26.8.2 process-group
probe and green Node 22/Ubuntu CI with dash. The harvest verified the named
notes against the captured hashes, but did not rerun probes, inspect the
implementation or independently audit its merge and CI results. macOS was
not run, and the tmux signal-handler behavior was not qualified per version.

Verified by the knowledge maintainer at review of the harvest, 2026-10-15,
by reading [awebai/oats#1249](https://github.com/awebai/oats/pull/1249) and
its discussion; nothing was run. It merged on 2026-10-15 at `26effa92` from
head `89d5039a`, with APPROVE verdicts from both maintainer lanes bound to that
head and CI reported green. Its diff installs the HUP/TERM/INT listeners
before preparation and removes them only after cleanup, passes `detached: true`
to every viewer tmux call but not to the client, and yields two `setImmediate`
hops before spawning the client. Its description states no contract change,
rejects inherited ignores and tmux-side self-destruction for the reasons
above, lists the same four mutations, names Node 26.8.2 with tmux 3.7c
locally and Node 22, dash and macOS as left to CI, and keeps plain-attach
SIGQUIT and SIGKILL cleanup out of scope. The verdicts establish maintainer
review, not human acceptance.
