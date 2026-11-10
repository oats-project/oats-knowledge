---
type: Lesson
title: Test what a change strands through a real start, not by reading recorded paths
description: A stated risk about what a swap or removal leaves broken must be tested through a real start with real kernels, because static reads of generated state miss the hook that regenerates it; what a kernel swap strands is running sessions and the schedule unit, not homes.
about: [workstream/coordination]
kind: lesson
id: ins-44229aa7a182
tags: [planning, migration, evidence, risk, kernels, hooks, verification]
timestamp: 2026-10-30
---
# Generated state hides what regenerates it

Reading recorded paths in instance homes, the source concluded that
uninstalling the old kernel would strand every home for good: the shim and
the harness hooks named the old path, and nothing in the homes said who
would change them. A maintainer challenged the claim. A real swap (remove
the old kernel, install the new one) followed by a real start showed the
launch hook rewriting the shim and the Claude hook settings in every home
at each start, a home frozen on an older capability release included.

The error was method, not care. The settings file was read; the hook that
writes it at every start was not. **A file that a start regenerates says
nothing about what a start will do.** A claim of the form "after X, Y stays
broken" needs a real start after X, with the real kernels and a stand-in
only for what must not run for real.

# What a kernel swap does strand

The source's measured result, offered as the shape to expect rather than a
specification:

- **Homes heal on restart.** The shim and the hooks follow the new kernel
  at the next start.
- **Running sessions do not.** A running session's shim dangles and its
  shell falls through to the next `oats` on `PATH`: the new kernel if it
  shares the prefix, **any other installed kernel otherwise**, or
  "command not found" if none. A running harness session's waiting hook
  records nothing until restart, exiting zero both times, so the gap is
  silent.
- **The schedule unit keeps the old path** until the schedule host is
  reinstalled; see [the per-kernel gate](/nodes/oats-expert/lessons/a-contract-flip-gate-counts-kernels-not-hosts.md).
- **A client that identifies the CLI by name refuses a renamed kernel**
  until the client knows the new name. The maintainer's
  [org-move decision](/nodes/oats-maintainer/decisions/oats-moves-to-its-own-org-in-stages.md)
  owns that contract fact; the planning consequence for the move's stages
  belongs there too, not here.
- A process can remove its own package mid-run and finish, but lazy imports
  after that fail.

So the plan for a swap addresses sessions and the schedule unit, and does
not need a forwarder for homes. Which stage of a move carries that is the
maintainer's decision to record. The operational steps for moving a host to
a new node version are the kernel's
[upgrade guide](https://github.com/awebai/oats/blob/main/docs/upgrading.md);
this lesson is about how the risk is established, not those steps.

# How this differs from its neighbours

[Compare a leaning with alternatives](/nodes/oats-expert/lessons/compare-a-leaning-with-alternatives-before-specifying.md)
stops a code-reading inference from becoming a spec; this lesson stops a
state-reading inference from becoming a stated risk, and names the specific
trap: generated files. [Real proof boundaries](/nodes/oats-expert/lessons/real-proof-boundaries-preserve-fixture-isolation.md)
says which parts of a proof must be real; here the part that must be real
is the start itself.

# Evidence and limits

Evidence: OKF proposal from oats-expert/oats-org-migration-expert,
2026-10-30; notes/never-uninstall-the-old-kernel.md.

The note is a corrected version of an earlier wrong claim, and says so. The
swap test ran real released kernels in real terminal sessions on a private
host with a stand-in harness binary, one frozen and one current core
capability release, and did not run the schedule host install (it would
have touched the host's live schedule). Counts of homes and the specific
releases are source-reported and not durable. This harvest did not repeat
the swap. Maintainer review confirmed the mechanism in source, not by a
swap: at awebai/oats@c542bc3 the kernel rewrites the shim at every start,
and oats.core's launch hook rewrites the Claude settings; the running-session
results remain source-reported.
