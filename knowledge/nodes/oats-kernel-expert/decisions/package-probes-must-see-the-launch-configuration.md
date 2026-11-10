---
type: Decision
title: Package probes must see the configuration used by the launch
description: Refuse launch-config args beside a harness package requirement when the native package probe cannot carry them, rather than maintaining a drifting kernel allowlist or a second settings contract.
about: [system/oats-kernel]
id: dec-1f13d4fc327a
tags: [kernel, launch, probes, native-settings, rejected-alternatives]
timestamp: 2026-10-30
---
# Decision and rationale

The onboarding investigation retained refusal of launch-config `args`
beside a harness package requirement. A probe cannot vouch for a launch
whose plugin configuration differs from what it inspected. This is a
proof boundary, not a judgment that every argument is inherently unsafe.

In the source's Claude Code 2.1.300 investigation, `claude plugin list --json`
accepted no `--settings`, while settings could change `enabledPlugins`.
Probing without those arguments and launching with them would therefore
validate a different configuration. The source reports that oats.aweb's
Claude package declaration makes even apparently unrelated launch-config
arguments, including `--permission-mode auto`, meet this refusal.

# Why the alternatives were rejected

- **Pass `--settings` through to the probe.** The investigated native
  subcommand has no such option; a fake probe accepting it would conceal
  the real boundary.
- **Maintain a kernel allowlist of probe-neutral Claude flags.** That puts
  release-dependent Claude knowledge in the kernel and creates another
  list whose drift can invalidate the proof.
- **Add a launch-config `settings:` key.** That adds a new public contract
  and revives the competing, last-settings-argument-wins problem rather
  than preserving one native configuration.

The source-selected route is native user settings in an operator-chosen,
agents-only `CLAUDE_CONFIG_DIR` selected through launch `env`, which the
probe also receives, or a wrapper executable used by the probe and launch.
The native permission setting route remains available even when its argv
alternative is refused. These routes preserve configuration agreement;
they do not themselves establish authentication or package readiness.

Keep the [native authentication boundary](harness-native-authentication.md):
the operator selects and authenticates the native context. This is not
permission for OATS to copy credentials, substitute a private profile or
build an isolation wrapper. The
[native-launch decision](harness-native-launch.md) remains in force.

# Enforcement and evidence

Enforce agreement at launch admission and qualify tests against the actual
native package command, including refusal of unrepresentable arguments.
Documentation must carry the broader consequence instead of offering an
argv route that admission refuses. A flag allowlist is not the fix.

Evidence: OKF proposal from oats-kernel-expert/onboarding-kernel-expert, 2026-10-30; notes/launch-args-refused-beside-package-requirements.md.

The proposal attributes the rejected alternatives to product-lane agent
decisions reported through private mail on 2026-10-30/31. Acceptance, native
command investigation and the then-current oats.aweb consequence are
source-reported, not verified human acceptance or a permanent support
matrix. Exact refusal conditions remain code-owned. The documentation work
was in draft awebai/oats#1692 at the checkpoint; no tests were rerun here.
