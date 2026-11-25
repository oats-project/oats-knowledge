---
type: Decision
title: A harness control the kernel doesn't know travels as a provider-declared, opaque launch choice
description: A launch control only some harnesses or providers have (a reasoning level, a service tier) is not a first-class kernel key. The provider declares it in its manifest (`launchChoices`), a person passes it with `--launch-choice name=value`, and the provider gets it as `choices` in its launch input. The kernel checks only that the name is declared, and refuses, never drops. No answer a client reads gains a key. First-class kernel keys were rejected.
id: dec-f65756c23ba2
about: [workstream/oats-direction, workstream/provider-integration]
tags: [session-provider, contracts, launch, manifest, clients]
timestamp: 2026-11-25
---
**Owner: oats-maintainer (the release lane). Update-on-change:** whoever lets a launch configuration, a soul, a host default, a schedule or a trigger carry choices, or builds the tmux side, updates this record.

# Decision

Decided 2026-11-25 by Pepe's side through the release lane, under [Joan's bb effort is pre-approved on Pepe's side](joans-bb-effort-is-pre-approved-on-pepes-side.md), after the lane:product gate. Juan's side was told. The item is oats-project/oats#2122, KP-14, on its second text.

- **Declared by the provider:** `sessionProviders.<name>.launchChoices`, a new optional manifest property. It holds named choices, each with a bounded, single-line description. The kernel knows no choice's meaning.
- **Passed by a person:** `--launch-choice <name>=<value>` on spawn, start and restart. A value is a short id passed as data, never through a shell. A spawn's choices are kept in the home's launch record. The reserved value `default` clears one and is never passed on.
- **Received by the provider:** `choices` in the planned launch and the launch input, present only when chosen. A provider gets only names it declared, so there is no wire bump.
- **Refuse, never drop:** `E_BAD_ARGS` before anything starts in each of these cases:
  - a name the home's provider doesn't declare;
  - a tmux home;
  - a recorded choice the provider no longer declares, with the way to clear it named.

  A routed spawn to a host without the feature is refused `E_REMOTE_INCOMPATIBLE`, the code clients already read as "the host is too old".
- **No client-read answer gains a key, and recorded choices never reach the status row, the roster row or inspect.** The Desktop and the TUI read several launch answers by exact keys, so a new key there makes today's client refuse the whole answer.
- **`launchOptions` keeps its one meaning:** the kernel's own options in `oats version --json`.
- Rollout follows [the provider contract's growth rule](a-provider-contract-grows-by-feature-and-floor.md): the kernel ships the feature first, then the provider floored at it, then the pin.

# Why

The kernel stays runtime-neutral: the next such control costs a provider's manifest line, not a kernel change. For pi, the level is already part of the model id, so on bb it travels only as the choice, and a `:level` model id is refused with a sentence naming the choice. One choice never sits in two places.

# Rejected

First-class `reasoningLevel` and `serviceTier` kernel flags and keys (the first text). They are one harness family's words. They took the name `launchOptions`, which already meant something else. They duplicated pi's level. They added keys to answers that clients read by exact keys. The release lane said yes to that text before the lane:product gate had posted, and amended the decision when the gate found the exact-key readers.

Evidence: OKF proposal from oats-maintainer/release-maintainer, 2026-11-25; notes/provider-launch-choices-are-opaque.md. Checked at review against the issue record [1]–[6].

# Citations

1. [KP-14, first text](https://github.com/oats-project/oats/issues/2122#issuecomment-7163077163): `reasoningLevel` and `serviceTier` as kernel flags and keys.
2. [The first "DECIDED YES"](https://github.com/oats-project/oats/issues/2122#issuecomment-7163094808), posted before the gate.
3. [The lane:product gate on the first text](https://github.com/oats-project/oats/issues/2122#issuecomment-7163106928): the name clash, pi's level in the model id, the harness words, the exact-key client readers.
4. [The amendment](https://github.com/oats-project/oats/issues/2122#issuecomment-7163117664) superseding the first yes, and [the r2 text](https://github.com/oats-project/oats/issues/2122#issuecomment-7163123792).
5. [The gate on r2](https://github.com/oats-project/oats/issues/2122#issuecomment-7163163919), with its three conditions, and [the decision on r2](https://github.com/oats-project/oats/issues/2122#issuecomment-7163175022).
6. [The routed-spawn amendment](https://github.com/oats-project/oats/issues/2122#issuecomment-7163227475): `E_REMOTE_INCOMPATIBLE`, not `E_BAD_ARGS`.
