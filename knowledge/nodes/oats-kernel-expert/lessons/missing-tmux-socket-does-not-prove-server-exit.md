---
type: Lesson
title: A missing tmux socket does not prove the server exited
description: A tmux server can retain sessions after its socket file is removed, so a missing endpoint needs independent liveness evidence before lifecycle code treats work as stopped.
about: [system/oats-kernel]
kind: lesson
id: ins-80a38900080d
tags: [kernel, tmux, process, liveness, lifecycle, recovery]
timestamp: 2026-10-09
---
# Discovery

The source reports a tmux 3.7c probe on 2026-10-08 that separated two failures
which had been treated as one lost-server answer [1]:

| Endpoint condition | Reported tmux diagnostic | What it establishes |
| --- | --- | --- |
| A socket file exists but has no listener | `no server running on <path>` | The connection to that socket was refused. |
| The socket file is absent | `error connecting to <path> (No such file or directory)` | The endpoint is missing; server exit is not established. |

A reboot can leave the second condition, but so can removal of a live
server's socket file by a temporary-file cleaner or a person. In the latter
case the server retains its sessions and harnesses. The source reports that
SIGUSR1 caused that live server to recreate its socket and answer again.
The diagnostic distinction was the same for `has-session` and
`list-windows`; changing the tmux read does not remove the ambiguity.

A refused connection is a narrower observation than proof that no relevant
work exists anywhere. In particular, neither diagnostic is authority to
signal an unverified PID. The discovery is the persistence of work after
endpoint loss, not a general recovery recipe or a promise about every tmux
version's wording.

# Why the distinction changes lifecycle decisions

Treating a missing endpoint as stopped was reported to make status show live
instances as stopped, let start launch another harness in the same home,
and let stop report idle. Endpoint reachability is not work liveness.
Before an ambiguous endpoint answer justifies creating a session, reporting
stopped or removing a home, corroborate it with evidence about the work.

The reported repair uses the per-home process scan. Its
[explicit visibility limit](/nodes/oats-kernel-expert/decisions/home-process-scan-has-an-explicit-visibility-limit.md)
must remain visible to consumers; it is not an omniscient absence test.
An unavailable scan cannot be converted to no work, consistent with
[preserving recovery authority until outcomes are proven](/nodes/oats-kernel-expert/decisions/preserve-authority-until-cleanup-is-proven.md).

**A new home's emptiness cannot establish the shared server's absence.**
The home-level corroboration does not by itself solve spawn's shared-server
question, because the new home has no existing work to inspect. The source
identified this boundary in awebai/oats#839 [2]. Do not generalize a proof
about one existing home's work into a proof about every session on the server.

# Missing-socket refusal includes the invoking shell

The follow-up decision is deliberately conservative about processes the scan
**does find** [3]. When an instance's recorded tmux socket file is missing,
start, restart and stop refuse if the per-home scan finds a process working
in the home. This includes a shell left there by the operator and the shell
invoking the command from that directory. The refusal names the PID and
program, so an intentional safety boundary does not look like unexplained
failure.

**Exempting the caller's parent was rejected.** When a harness runs `oats`
directly, that parent can be the harness itself: exactly the process the scan
exists to find. The kernel cannot safely distinguish that relationship from
an interactive shell invoking the same command. Removing the apparent
inconvenience would therefore remove the evidence in the case that most needs
it. Do not turn caller ancestry into a liveness exemption.

The trigger is loss of an endpoint the home was **launched on**. A scaffold
that records neither a socket nor a launch has no endpoint to have lost, and
is not scanned on that basis. A launched home that records no socket reads
the default server and is covered like any other [4]; the exemption is the
never-launched scaffold, not every home without a recorded socket. OATS may
identify tmux's socket-recreation remedy, but
does not send the signal itself because it cannot verify the target PID.
That preserves the signal boundary above, rather than making a diagnostic
hint authority to act.

This decision does not strengthen the scan's visibility or change the
[unreadable-process tradeoff](/nodes/oats-kernel-expert/decisions/home-process-scan-has-an-explicit-visibility-limit.md).
An unreadable entry, a failed scan and a visible process in the target home
remain different observations.

The test-fixture consequence has its own
[cleanup-evidence decision](/nodes/oats-kernel-expert/decisions/fixture-tmux-directory-preserves-cleanup-evidence.md):
putting a private tmux directory inside a removable fixture base would let
base deletion hide the unended fixture. That decision applies this liveness
finding without changing the production lifecycle rules above.

# Elimination route

The behavioral fix belongs in shared lifecycle liveness classification and
all its callers, with regression tests, rather than in a reminder for
operators. Keep the missing-endpoint and refused-connection cases distinct;
exercise the decisions made by status, start, stop and retirement. A real-tmux
regression that removes a live server's socket and observes it answer again
after socket recreation establishes the failure mode that canned diagnostics
alone cannot prove.

The proposal points to such a real-tmux test and the lifecycle repair in
awebai/oats#838 [1]. This lesson preserves why the distinction exists and
why a per-home check has a shared-server boundary; it is not a substitute for
those tests or a claim that every lifecycle gap has been fixed. Regression
coverage for the follow-up decision should distinguish an invoking shell
from a harness that directly invokes the command, and preserve refusal in
both cases rather than "fixing" one with a parent exclusion.

# Citations

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-retire-recovery, 2026-10-08.

1. The proposal reports the tmux 3.7c probe, lifecycle consequences and real-tmux regression in [awebai/oats#838](https://github.com/awebai/oats/pull/838), addressing [awebai/oats#624](https://github.com/awebai/oats/issues/624). The named note `notes/decision-625-scan-blind-spot.md` corroborates only the scan decision and the fact that a tmux probe was reported; detailed probe results come from the proposal. The harvest did not read the source log, replay the experiment or audit the implementation.
2. [awebai/oats#839](https://github.com/awebai/oats/issues/839) is the source's reference for the shared-server spawn boundary, not a claim about the issue's current state.

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-retire-recovery, 2026-10-09; notes/decision-missing-socket-any-process-in-home-blocks.md.

3. The follow-up proposal and named note supply the caller-parent rejection, invoking-shell refusal, never-recorded-socket distinction and non-signalling remedy rationale for [awebai/oats#838](https://github.com/awebai/oats/pull/838). The note dates the decision to 2026-10-08; the proposal reports approval by both maintainers with this behavior stated at hand-over. That approval is source-attributed, not independently verified or established as human acceptance. The harvest did not inspect acceptance messages or audit implementation/merge history.
4. Verified by the knowledge maintainer at review of the harvest. [awebai/oats#838](https://github.com/awebai/oats/pull/838) merged on 2026-10-09 with APPROVE verdicts from both maintainers posted on the PR. Its description lists as an accepted trade-off that any process working in the home blocks start and stop while the socket is missing, the shell that runs the command included, and that excluding the caller's parent would exclude a harness that runs `oats` directly; one verdict accepts those limits as stated, and a macOS run quoted in the review shows the refusal naming each PID with its program and the remedy named, not performed. The [repository's missing-socket rule](https://github.com/awebai/oats/blob/main/docs/execution-targets.md#missing-socket) is the current contract: it applies to every tmux server OATS reads, including a home that records no socket and reads the default server, and exempts only a home that records neither a socket nor a launch. It states the rule, not the rejected exemption, which is why that rationale is kept here. The verdicts establish maintainer review of the PR, not human acceptance; the reason OATS does not send the signal rests on the source's note and the accepted signal boundary.
