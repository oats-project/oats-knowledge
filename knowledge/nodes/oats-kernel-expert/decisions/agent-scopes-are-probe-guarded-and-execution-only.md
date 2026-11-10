---
type: Decision
title: Per-agent scopes are probe-guarded and execution-only
description: Per-agent scope placement uses a real probe in the launch environment and adds no home marker, accepting a residual exit-classification ambiguity rather than changing retirement or process observation.
about: [system/oats-kernel, workstream/oats-direction]
id: dec-dcd0e5bb70a9
tags: [kernel, launch, systemd, lifecycle, resource-isolation]
timestamp: 2026-10-27
---
# Decision and rationale

The source-selected design for per-agent isolation on Linux's unified cgroup
hierarchy wraps the harness launch in a user systemd scope only after a real
scope-start probe succeeds in the pane's launch environment. Otherwise it
launches unwrapped with a warning naming the reason. Environment variables
that locate a user manager are not evidence that the manager can start a
scope; probing the spawner's environment would answer the wrong question.
This applies the existing [launch-environment decision](/nodes/oats-maintainer/decisions/checks-use-the-launch-environment.md).

Keep this wrapper execution-only, in the shared harness-launch path. Do not
persist it as a new launch recipe or add a home file to classify its failure.
The wrapper concerns the harness and its native recorder, not the pane's
fallback shell. Do not condition per-agent placement on the creator's unit:
the harness inherits from the tmux server regardless of who created that
server or where it runs.

This complements [separating a client-created server from the client cgroup](/nodes/oats-maintainer/decisions/client-created-tmux-server-needs-its-own-cgroup.md).
That concept owns the shared-failure-domain requirement, not a promise of
per-agent isolation. This decision owns the kernel mechanism's tradeoffs;
it does not rewrite the maintainer's rule or claim that scopes are a sandbox.

# Rejected alternatives

- **A home marker distinguishing runner failure from harness exit.** Rejected
  because extra home state changes retirement's preservation input; apply
  the [home-marker lesson](/nodes/oats-kernel-expert/lessons/bridge-home-markers-change-retirement.md),
  rather than silently broadening exclusions.
- **An extra non-exec shell layer to distinguish outcomes.** Rejected because
  the selected process arrangement must preserve the parent/descendant
  relationships used by stop and pane-status observation.
- **An environment-variable-only reachability test.** A configured bus or
  runtime directory does not prove a successful scope launch.
- **Wrapping the entire pane command.** That would place the fallback shell
  in the scope too, widening the intended lifetime and execution boundary.

# Residual ambiguity is not outcome attribution

The probe does not make the later launch atomic. The source reports that a
scope-runner failure between the probe and execution can leave pane status
1, classified as `exited`. Under the proposed recovery design that class is
not relaunched, so this failure does not spuriously resume the agent. The
tradeoff can instead leave a launch down. This is a safe-direction argument
about recovery, not proof that the harness ran or returned that status.

The source also reports a design gate requiring scope-runner failure not to
be attributed to the harness. A probe plus the residual classification above
does not establish that stronger distinction. Preserve this limitation for
review; do not infer acceptance of a relaxed gate from implementation review,
or turn this account into a universal guarantee about all wrapper failures.
The [recovery decision](/nodes/oats-maintainer/decisions/lost-sessions-resume-locally-in-their-own-conversation.md)
remains the canonical home for recovery policy.

# Enforcement and evidence limits

Enforce the chosen boundary in the shared launch path, with regressions for
probe failure, probe/launch races, fallback-shell exclusion, process
observation and unchanged home bookkeeping. These are enforcement targets,
not tests this harvest ran. Command rendering must also respect [one native
start per launch](/nodes/oats-kernel-expert/lessons/native-start-is-prepared-once-per-launch.md).

Evidence: OKF proposal from oats-kernel-expert/session-resume-kernel-expert, 2026-10-27; notes/decision-agent-scope-probe-guards-wrap.md.

The source identifies [awebai/oats#1561](https://github.com/awebai/oats/pull/1561)
at `add54ec5`, still unmerged at proposal time, and reports CI and adversarial
review success. The note records the gate and rejected alternatives. This
harvest read the captured evidence, not the implementation or private gate
correspondence. No human acceptance, completed deployment, real reboot or
oomd-kill proof is established.
