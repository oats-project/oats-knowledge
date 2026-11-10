---
type: Lesson
title: Real proof boundaries must preserve fixture isolation
description: Before accepting a fixture-based end-to-end proof, separate the boundary that must be real from the isolation that must remain, and verify harness actions and the child process's principal independently.
about: [workstream/coordination, workstream/messaging]
kind: lesson
id: ins-2c37d01de9b6
tags: [verification, fixtures, isolation, terminal, messaging]
timestamp: 2026-10-27
---
# A real harness does not make the whole experiment real

Before accepting an end-to-end proof through a repository fixture, identify
which substitutions bypass the property being claimed. Replace only those
substitutions with the authorized real boundary; retain the fixture's
private state, bounded lifetime and owned cleanup. Removing every fixture
control to make a run “real” trades a measurement defect for interference
with the operator or the running agent.

The session-resume proof exposed both sides of this distinction:

- **Placement seams can make a scope proof vacuous.** The source's fixture
  substituted cgroup and system-tool behavior. Launching real harnesses
  inside it did not prove their real scope placement. The reported corrected
  run removed those substitutions and supplied the user bus for the actual
  placement check. The kernel's
  [probe-guarded scope decision](/nodes/oats-kernel-expert/decisions/agent-scopes-are-probe-guarded-and-execution-only.md)
  owns the placement rule; the lesson here is how the fixture hid the
  boundary the lead meant to prove.
- **A terminal command is not a portable state transition.** In the reported
  first run, Claude's `/exit` was also sent to pi, where it did not exit.
  The later lost classification was consistent with that setup, not proof
  of a recovery defect. Establish that the selected harness actually made
  the intended transition before interpreting the next observation. The
  [real-terminal observation lesson](real-terminal-waits-prove-the-observed-state.md)
  owns those state-aware waits; do not turn one harness's command into a
  universal exit recipe.
- **A private socket does not select a private principal.** In a separate
  quit-status check, a test tmux server inherited the agent shell's
  messaging identity selector. Its pi process connected as the working
  agent, creating a competing event consumer. Socket separation kept tmux
  targets apart but did not prevent the test from acting as the agent.
  The source reports no lost messages in this incident; that is not proof
  that the setup was safe.

# Keep identity isolation when removing measurement seams

Construct the test child's environment deliberately, including messaging
and instance selectors and configuration discovery, rather than inheriting
the working agent's environment through a new tmux socket. The source
identified `AWEB_IDENTITY_HOME`, `OATS_INSTANCE` and `OATS_INSTANCE_HOME` as
inherited selectors to remove, and used a fixture with private HOME and no
messaging for the corrected recovery proof. A short unset list alone is not
a universal isolation guarantee: ambient configuration can still select
real state. Verify the principal and enabled messaging before allowing the
harness to consume events. If messaging is outside the proof, keep it out
of the fixture.

This applies the integrations lesson that
[ambient environment can select the wrong principal](/nodes/integrations-expert/lessons/a-lifecycle-hook-never-trusts-the-ambient-environment.md)
to lead-run proof apparatus, not a new lifecycle-hook policy. The existing
[runner-isolation obligation](automatic-per-user-writes-need-runner-isolation.md)
and Desktop's
[client-sweep isolation finding](/nodes/oats-desktop-expert/lessons/verification-judgment-for-privileged-surfaces.md#a-private-socket-does-not-isolate-a-client-triggered-machine-sweep)
remain canonical for private storage and sweep inventory. Neither a private
principal nor a private inventory proves the other.

# Elimination route and limits

Make the reusable proof harness distinguish real-boundary mode from inert
substitutions, and refuse a placement claim while its placement seam is
stubbed. Give each supported harness an asserted transition rather than a
shared guessed exit command. Enforce child-environment isolation at the
fixture launcher and regress it with a disposable foreign identity selector,
without connecting to a real agent's messaging. These are repository
harness repairs, not permanent manual recipes or work delivered by this
harvest.

This grants no authority for live harnesses, service changes or machine-wide
kills. The existing
[lifetime, output and teardown bounds](/nodes/oats-desktop-expert/lessons/verification-judgment-for-privileged-surfaces.md#a-passing-live-terminal-check-can-still-exhaust-the-host)
still apply when a real run is otherwise authorized.

Two applications of the same boundary judgment to a repository contract
change have their own lessons: [proving a flip on the real repositories
from local bare copies](/nodes/oats-expert/lessons/prove-a-contract-flip-on-real-repositories-patch-by-patch.md),
where the content and patches are real and the remotes are not, and
[testing what a swap strands through a real start](/nodes/oats-expert/lessons/test-what-a-change-strands-through-a-real-start.md),
where the start itself is the part that must be real.

# Evidence

Evidence: OKF proposal from oats-expert/oats-expert-session-resume,
2026-10-27; notes/proof-kill-server-f5cfa88a.md;
notes/private-tmux-tests-inherit-the-agent-identity.md.

The source reports two runs using real Claude Code 2.1.308 and pi 1.3.0 at
[awebai/oats#1563](https://github.com/awebai/oats/pull/1563) head `f5cfa88a`.
The corrected run recovered the two lost conversations, left stopped and
exited homes down, performed no new starts on a second sweep, and observed
separate server and harness scopes. These are source-reported results, not
experiments repeated by this harvest. The proof did not cover a real reboot,
channel/session delivery, live client triggering or differing deployments.
The separate identity incident supports the inherited-principal hazard,
not a claim that any message was lost or that removing three variables
proves complete containment.
