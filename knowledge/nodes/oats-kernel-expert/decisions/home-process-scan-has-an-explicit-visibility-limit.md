---
type: Decision
title: Home process scans state their visibility limit instead of refusing on every unreadable process
description: A home-wide process scan accepts a documented inspection blind spot because rejecting unreadable processes would prevent ordinary lifecycle work, while failure of the scan itself remains unknown.
about: [system/oats-kernel]
id: dec-d49b1c7665a8
tags: [kernel, process, liveness, lifecycle, portability, fail-closed]
timestamp: 2026-10-08
---
# Decision and rationale

The 2026-10-08 lifecycle review chose to document the home process scan's
visibility limit rather than refuse whenever a process cannot be inspected.
The proposal and named note report acceptance by `oats-maintainer-pepe` at
the awebai/oats#838 hand-over on that date [1]. This attribution does not
establish that the accepting identity was a human.

A home-wide scan asks whether a harness or other work is still using an
instance home. Both Linux `/proc` inspection and the `lsof` alternative miss
processes whose working directory the calling user may not read. These
include other users' processes and same-user non-dumpable processes, such
as some authentication agents. This is a limit on what the scan can observe,
not evidence that an unreadable process works in the home.

Two stricter alternatives were rejected:

- **Refuse on any unreadable process.** Ordinary hosts have unreadable
  system processes. Treating their existence as failure of every home scan
  would make unrelated retirement and session operations routinely refuse.
- **Refuse only on same-user unreadable processes.** Same-user
  non-dumpable agents are also common; restricting the rule by UID would
  retain the availability problem rather than solve it.

The accepted rationale is that the scan's intended target is the OATS-launched
harness, running as the caller and inspectable in the supported operating
case. The previous `lsof` approach already used partial listings with the
same blind spot. Stating the limit therefore does not claim stronger
visibility or introduce a new permission bypass. It is not a guarantee that
every same-user process is inspectable.

# Boundary with fail-closed recovery

**Failure to perform a scan is not the same as an individual process being
outside its visibility.** A scan that cannot run, or produces no usable
process enumeration, must remain unknown rather than certify an empty home.
That is distinct from a usable enumeration finding no visible process in the
target home. Do not turn scan errors into successful negative answers, and
do not reinterpret the visibility tradeoff as an exhaustive absence proof.

This decision does not relax
[recovery authority until the outcome is proven](/nodes/oats-kernel-expert/decisions/preserve-authority-until-cleanup-is-proven.md).
It also does not change the rule for
[checking a recorded PID's identity](/nodes/oats-kernel-expert/lessons/process-identity-across-readers-and-hosts.md):
a known candidate with an unreadable start token remains unknown. Scanning
all processes for home membership and verifying a particular recorded holder
have different proof obligations; importing the latter's refusal into every
unreadable entry of the former recreates the rejected alternatives.

The [missing tmux socket lesson](/nodes/oats-kernel-expert/lessons/missing-tmux-socket-does-not-prove-server-exit.md)
explains why lifecycle decisions need this home-level evidence when the
session endpoint is missing. The scan's documented limit travels with any
consumer of its answer, including lifecycle and leftover-process checks.

# Citations

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-retire-recovery, 2026-10-08; notes/decision-625-scan-blind-spot.md.

1. The proposal and named note supply the decision, rejected alternatives and maintainer acceptance attribution for [awebai/oats#838](https://github.com/awebai/oats/pull/838), addressing [awebai/oats#625](https://github.com/awebai/oats/issues/625). The harvest did not inspect the acceptance message or independently audit the implementation. The proposal supplies the scan-failure boundary; no release or rollout status is inferred.
