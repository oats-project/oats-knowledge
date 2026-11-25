---
type: Lesson
title: A capability's manifest default reaches its provider as if the deployment had set it
description: The kernel hands a session provider its manifest's setting defaults as values, so a default that another setting is meant to derive (oats-bb's daemon address from hostDaemonPort) looks like a conflicting choice and refuses every real launch; provider tests that pass raw settings never see it. Test with the manifest's defaults read in, run the kernel-backed runs when settings change, and prefer no manifest default where the provider derives the value.
about: [workstream/provider-integration]
kind: lesson
id: ins-2104939f5682
tags: [provider, settings, manifest, defaults, testing]
timestamp: 2026-11-25
---

# What was observed

oats-bb's manifest declared `daemon` with `default: http://127.0.0.1:38887` (at v0.4.0 and v0.5.0). A deployment that set only `hostDaemonPort` (as the README told a second bb to) was refused at every spawn and readiness read under a real kernel: `settings.oats.bb.hostDaemonPort is 18887 and settings.oats.bb.daemon names port 38887`. The deployment had set no `daemon`: the kernel handed the default as a value. The provider's unit and contract tests called it with raw settings and never met the case. Dropping the default (the provider already falls back to bb's own port) fixed it: oats-bb#98, merged 2026-11-25 after v0.5.0, unreleased that day.

This refines [A second bb on one host needs its host-daemon port told to bb's CLI](/claims/lessons/a-second-bb-on-one-host-needs-its-host-daemon-port-told-to-bbs-cli.md): through oats-bb v0.5.0, `hostDaemonPort` alone was refused, and `daemon` had to be set beside it on the same port.

# What to do

- A provider test reads the manifest's defaults into the settings it checks.
- Run the kernel-backed runs whenever a change touches settings, the manifest or the rig.
- Prefer no manifest default where the provider derives the value itself.

The elimination route is in place for oats-bb: `test/unit/manifest-defaults.test.mjs` (oats-bb#98) reads the manifest's defaults into the settings it checks. Another provider needs the same test.

# Citations

1. oats-project/oats-bb#98 (fixes #88, merged 2026-11-25): the refusal's text, the cause ("The kernel hands a provider its manifest's defaults as values"), the raw-settings tests that never met it, the dropped default, the fallback to `http://127.0.0.1:38887`, the retired `daemon`-beside-`hostDaemonPort` workaround and the new manifest-defaults test.
2. oats-project/oats-bb `oats-package/capabilities/oats-bb/oats.json` at v0.4.0 and v0.5.0 (default present) and on main after #98 (absent); `CHANGELOG.md` on main lists the fix under "Unreleased" (release PR oats-bb#105 for 0.5.1 open on 2026-11-25).
3. Proposed in [oats-knowledge#481](https://github.com/oats-project/oats-knowledge/pull/481) by oats-engineering-expert/bb-backend-specialist, 2026-11-25; notes/manifest-defaults-reach-provider.md.
