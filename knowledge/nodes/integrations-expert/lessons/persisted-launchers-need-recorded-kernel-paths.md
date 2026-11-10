---
type: Lesson
title: Persisted launchers need recorded kernel paths, not the installer's PATH
description: Record and verify absolute CLI and Node paths for commands an integration leaves behind, reject instance shims, and detect paths lost to upgrades rather than promising that absolute means permanent.
about: [workstream/provider-integration]
kind: lesson
id: ins-0a0f381f1a75
tags: [integrations, launchers, environment, paths, lifetime, upgrades]
timestamp: 2026-10-19
---
# The failure outlives the successful setup

A launcher, hook, menu action or bar widget can work during setup yet fail
when the desktop invokes it later. The source found two lifetime boundaries:
inside an OATS instance, `oats` on PATH selected that home's disposable shim;
in the desktop launch environment, Node supplied by the interactive shell's
version manager was not necessarily available. Retirement removes the first
locator, and leaving the shell removes the second assumption.

The [ambient-environment lesson](/nodes/integrations-expert/lessons/a-lifecycle-hook-never-trusts-the-ambient-environment.md)
owns which inputs a hook may trust for its current operation. This lesson
owns a different boundary: executable references the integration persists
for future invocations. Successful discovery in the installing process is
not evidence of the reference's lifetime or its usability by that consumer.

# Record a verified executable pair

Persist the absolute CLI entry point and Node executable, not a bare `oats`
command to be resolved again by the future process. Under kernel dispatch,
the selected command environment supplies `OATS_CLI_BIN` and `OATS_NODE_BIN`;
use those kernel-provided values, not a similarly named inherited assumption.
The kernel's current path contract belongs in
[capabilities.md](https://github.com/awebai/oats/blob/main/docs/capabilities.md),
including its guidance on the Node path a hook writes down.

Moving the integration to a standalone desktop plugin removes that dispatch
environment. The source's replacement design treats PATH as a discovery
input only: locate the installed CLI, refuse an instance-home `.oats/bin`
shim, resolve version-manager indirection, and verify the chosen pair with
`<node> <cli> version --json` before recording it. Merely taking a shim's
realpath can find the manager rather than the CLI; the reported mise case
needed `mise which oats` [1]. Preserve this distinction rather than treating
PATH discovery itself as forbidden when no kernel payload is available.

Use the kernel's stable-Node selection rule instead of inventing another
one. But **absolute is not permanent, and the rule is not a guarantee that
every installation yields an upgrade-stable path**. The earlier capability-era
note described the supplied Node path as surviving upgrades. The later
proposal narrows that claim: its actual selection still returned a versioned
mise path. A recorded version-specific executable can disappear when that
version is removed.

Consequently the persisted pair needs an explicit maintenance check. The
reported plugin design has a host post-update hook run `--check`, reporting
each recorded CLI or Node path that is gone. Do not hide that failure by
silently resolving a different executable from the launcher's ambient PATH.
Test the generated invocation under the intended minimal desktop environment,
not just the developer's shell. Existence and a version probe are bounded
checks, not proof of every command's future behavior.

# Enforcement and evidence limits

The elimination route is one resolver/recorder used by every generated
invocation, with regression cases for an instance shim, manager indirection,
minimal launch environment and removal of either recorded executable. The
post-update check covers lifetime loss that an install-time probe cannot
prevent. The knowledge worth retaining is why PATH persistence and an
unqualified stable-path promise were rejected; executable selection rules
and their tests remain code, not a second algorithm maintained here.

Evidence: OKF proposal from integrations-expert/integrations-expert-omarchy, 2026-10-19; notes/resolve-oats-from-the-kernel-not-path.md; notes/omarchy-plugin-facts-that-shape-a-setup.md.

1. The proposal identifies awebai/oats-omarchy #3 for the capability-era path
   choice and #5 for the plugin-era resolver and checks. It reports reusing
   the stable-Node rule from OATS v0.60.0. Resolution behavior and upgrade
   limitations are source-reported, not independently reproduced by this
   harvest; no live desktop apply or post-upgrade run is certified here.
