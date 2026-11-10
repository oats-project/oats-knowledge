---
type: Lesson
title: Outliving a client requires independent output, not only no signals
description: A lifecycle change promised to outlive its client needs output destinations independent of that client's readers, because detachment and a no-signal policy alone leave a broken-pipe failure path.
about: [workstream/coordination]
kind: lesson
id: ins-f32dcfdf431a
tags: [integration, lifecycle, process-lifetime, client-boundary]
timestamp: 2026-10-15
---
# Review every way the client can end the change

For a start or a stop/retire apply that must continue after the client exits,
"we never signal it" is an incomplete lifetime argument. Even a detached
process can fail on its next stdout or stderr write when the client was the
last reader of its pipe: closing that reader exposes EPIPE or SIGPIPE. The
lead must review output ownership alongside session and signal ownership
before promising that quitting the client leaves the change running.

The terminal-client design rejected pipes for these changes and chose
file-backed stdout and stderr in a private directory with mode 0700. Together
with a separate session and no client-originated cancellation signal, this
removes the dependency on a live client reader. This is rationale for that
boundary, not a guarantee of completion despite unrelated I/O failure,
external termination or host loss.

# Why the alternatives did not meet the promise

- **Keep the pipes and make the child ignore broken-pipe errors:** the child
  is the kernel command, not a process whose output behavior the client owns.
  The client's lifetime promise must not depend on changing that behavior.
- **Signal the change during client shutdown:** an interrupted lifecycle
  apply or start can strand work. Cleanup of the view is not authority to
  cancel the operation it already sent.
- **Prove only that the child survives the client's exit:** survival before
  its next write misses the actual failure path. Completion evidence must
  include output written after the reader is gone.

The Desktop's [bundled-server lifetime decision](/nodes/oats-desktop-expert/decisions/bundled-server-owner-lifetime.md)
already owns the no-child-signal rationale. Its successful spawn with a
closed output pipe was explicitly a bounded observation, not a guarantee for
every CLI. This lesson adds the output-dependency review for cross-client
integration; it neither changes that decision nor claims Desktop already
uses the terminal client's output arrangement. An owner-lifeline pipe meant
to end the bundled server is a different contract from output of kernel work
that must survive it. Likewise, the kernel's
[holderless-marker probes](/nodes/oats-kernel-expert/lessons/holderless-markers-cannot-support-safe-recovery.md)
saw a stop finish after its reader closed its pipes. Such command-specific
observations show a closed reader did not always break the work; they do
not establish the guarantee this boundary removes the need for.

# Elimination route

Put output and lifetime ownership in the client's process boundary rather
than leaving each action to remember a shutdown exception. Pin the promise
with a regression whose child writes to **both** streams after the client
has exited and then proves completion. Exercise the supported quit, signal
and pane-loss paths, and include a real lifecycle boundary check where
permitted; a fake writer proves transport survival, not all kernel recovery
semantics. Readers or other explicitly cancellable work are outside this
non-cancellation claim.

The generalist's lasting judgment is to ask what the supposedly independent
change still needs from the client, not to preserve a copy of the process
API or temporary-file cleanup recipe. Changes to a shared boundary need the
[owning expert's review](/nodes/oats-expert/lessons/import-closure-needs-owner-review.md).

# Evidence and limits

Evidence: OKF proposal from oats-expert/polaris-oats-expert-tui, 2026-10-15;
notes/a-change-a-client-lets-go-writes-to-files.md.

The source reports that a second reader found the pipe dependency in
[the terminal-client specification](https://github.com/awebai/oats/issues/855#issuecomment-6177536491),
and that [awebai/oats#1212](https://github.com/awebai/oats/pull/1212) replaced
pipes with files. It identifies `test/tui-acts.test.mjs` tests 1 and 2 as
covering post-exit output/completion and the real lifecycle boundary across
normal quit, INT, TERM, HUP, terminal suspension and pane loss, with Linux
and macOS CI evidence. The interrupted-lifecycle motivation is attributed to
[#890](https://github.com/awebai/oats/issues/890) and
[#889](https://github.com/awebai/oats/issues/889). Findings, merge and test
results are source-reported; this harvest did not rerun or audit them.
