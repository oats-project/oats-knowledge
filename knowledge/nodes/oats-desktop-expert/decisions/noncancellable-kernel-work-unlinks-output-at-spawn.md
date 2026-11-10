---
type: Decision
title: Non-cancellable kernel work unlinks output at spawn
description: A shared file-output boundary unlinks its temporary names immediately after spawn and reads through retained descriptors, because a Desktop crash can skip every cleanup callback.
about: [system/oats-desktop]
id: dec-12be5c4b54c6
tags: [desktop, shared-client, process-lifetime, output, cleanup]
timestamp: 2026-10-27
---
# Decision and rationale

The Desktop expert's 2026-10-27 choice for the machine recovery sweep is a
shared, non-cancelling file-output boundary. It applies the existing
[independent-output lesson](/nodes/oats-expert/lessons/outliving-a-client-needs-independent-output.md):
detachment and a no-signal policy are insufficient when the child's output
still depends on a live client reader. That lesson owns the rejection of
pipes and of asking the kernel to ignore broken-pipe errors.

The additional decision is **unlink at spawn, not during shutdown or after
reading the result**. Create private stdout/stderr files, open the client's
own read descriptors, give the detached child the output descriptors with
stdin ignored, then remove the file names and temporary directory as soon
as it has spawned. Read the result through the retained descriptors rather
than reopening paths. The selected permissions are 0600 for the files and
0700 for the directory.

Electron can crash or be SIGKILLed before any exit callback runs. Deferring
unlink until completion or client let-go therefore leaves cleanup dependent
on precisely the process allowed to disappear. On the supported POSIX
platforms, open descriptors keep the unlinked files usable without retaining
names to leak or reuse. This removes named temporary residue after successful
unlink; it does not mean the bytes cease occupying storage while descriptors
remain open, or that every I/O failure is impossible.

# Keep lifetime policies distinct

Put this choice in one shared client execution boundary rather than a
Desktop-only exception at each caller. For operations using this
non-cancellation contract, the client never signals the child and the
adapter rejects a positive timeout. A reader's buffer bound is not authority
to kill the work. The proposed recovery sweep is the motivating use, not
permission to convert every command to an unbounded operation.

In particular, [spawn's preview-implied deadline](preview-bounded-spawn-outcomes.md#a-separate-session-does-not-remove-spawns-deadline)
remains a separate intentional interruption policy; this decision does not
remove it. The [bundled server's owner lifeline](bundled-server-owner-lifetime.md)
remains a pipe for a different purpose: the server should end with its owner,
whereas the sweep must not end with either the server or the app. No migration
of other callers or terminal-client adapters is implied.

# Enforcement and evidence limits

Enforce the file lifecycle in the shared adapter, with regressions that end
the client before the child writes more than pipe capacity to **both** streams
and completes, and that check the temporary names are already gone. Exercise
normal exit and the supported signal paths rather than relying on a quit
callback. This is the elimination route for per-call cleanup discipline.

Evidence: OKF proposal from oats-desktop-expert/session-resume-desktop-expert,
2026-10-27; notes/file-output-unlinked-at-spawn.md.

The source identifies [awebai/oats#1564](https://github.com/awebai/oats/pull/1564),
then unmerged, and reports tests for exit, SIGTERM, SIGHUP and SIGKILL with
post-client output exceeding 64 KiB on each stream. It also reports a live
Desktop sweep surviving SIGTERM and SIGKILL. These are source-reported checks,
not tests rerun by this harvest or proof of recovery on real deployments.
