---
type: Decision
title: The host-default harness reuses souls.launch."*", not a second key
description: Use the existing host-wide launch preference rather than a second default-harness key, because it must override unavailable soul-declared harnesses and cover souls added later, with per-soul exceptions only for installed and authenticated harnesses.
about: [workstream/oats-direction]
id: dec-8bed689780ff
tags: [onboarding, launch, host-policy, rejected-alternatives]
timestamp: 2026-11-03
---
# Decision and rationale

The source reports a 2026-11-03 decision with the product lane to use
`souls.launch."*"` for a machine's default harness. The wildcard covers souls
without their own host entry, including souls added later, and takes
precedence over a soul's declared `launch:`. That precedence is deliberate:
a declaration of pi or codex cannot make it available on a Claude-only host.
A soul preference is not evidence that the host can execute it.

When onboarding preserves a different soul-declared harness through a
per-soul entry, it does so only if that harness is installed and logged in
on the machine. Otherwise the soul remains under the host-wide choice and
the handover discloses that choice. Unconditionally copying every declaration
into an override would undo the very fallback the wildcard was meant to
provide.

# Rejected alternatives

- **A new host-default-harness key just above the kernel fallback:** a second
  way to express the same host choice, but below the soul declaration and
  therefore at the wrong precedence for a one-harness machine.
- **Writing only per-soul preferences:** enumerating today's souls leaves
  later-added souls uncovered.
- **Preserving a declaration without checking host availability:** records
  a preference that can leave a soul unable to run.

The wildcard is an intentional host-wide selection, not an incidental repair
for one failed helper. A multi-harness case that needs different precedence
requires a contract proposal, not invention of another key during onboarding.
This decision does not authorize changing an existing host's selections.

The earlier [authoring-placement decision](/nodes/oats-maintainer/decisions/knowledge-theory-expert-moves-to-authoring.md)
rejected the wildcard as a way to record one person's harness, because it
would override deliberate soul-specific choices and did not solve package
placement. That rejection stands for its problem. This decision answers the
same concern differently: the wildcard is the host's chosen default, and a
soul keeps its own harness through a per-soul entry when that harness can
actually run there.

# Canonical boundaries and prevention

The [setup-admin launch lesson](/nodes/oats-setup-admin/lessons/a-host-wide-pi-model-is-one-launch-set-write.md)
owns routing to the supported write and checking member/package previews;
current commands and precedence details belong in launch documentation and
setup skills. The [operator's package-soul lesson](/nodes/oats-operator-expert/lessons/knowledge-onboarding-must-check-package-soul-launches.md)
owns the trial that exposed the ancillary-soul gap. This concept adds the
maintainer's rejected-key and precedence rationale, not another setup recipe.

Enforce the selection in onboarding and launch-resolution tests, including
later-added souls, absent declared harnesses and installed-but-not-logged-in
harnesses. Checks must use the
[environment the launch will have](/nodes/oats-maintainer/decisions/checks-use-the-launch-environment.md).
Preview selection alone proves neither authentication nor successful launch.
No test or skill is changed by this knowledge record.

# Evidence and limits

Evidence: OKF proposal from oats-maintainer/setup-maintainer-pepe,
2026-11-03; notes/host-default-harness-is-souls-launch-star.md.

The product-lane decision and rejection of a second key are source-reported,
not explicit human acceptance. The public
[return](https://github.com/awebai/oats/pull/1726#issuecomment-6606358265)
and [corrected-head approval](https://github.com/awebai/oats/pull/1726#issuecomment-6606657103)
were read and corroborate the installed-and-logged-in condition supplied in
the proposal. The PR merged on 2026-11-03; that is not proof of a release,
authentication check or successful deployment. This harvest did not run the
onboarding campaign or inspect its private lane discussion.
