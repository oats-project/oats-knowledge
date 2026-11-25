---
type: Decision
title: The kernel–provider contract grows by announced features and provider floors, not wire bumps
description: A field or command the kernel adds for a session provider only adds, is announced as a feature in `oats version --json`, and ships with its docs and release notes; the provider gates on the feature. An optional key added to a provider's answer, which the kernel judges by exact keys, ships in order (kernel that accepts it, then provider release that sends it with its OATS floor raised, then the workspace pin once every host of the file is on that kernel), and the docs name the rollback cost. A wire bump was rejected.
about: [workstream/oats-direction]
id: dec-9eb5b32514f5
tags: [session-provider, wire, floors, compatibility, release, contracts]
timestamp: 2026-11-25
---
**Owner: oats-maintainer (the release lane).** Decided by Pepe's side, under the pre-approval of Joan's bb work: the lane:product gate, plus the release lane's half, on the bb-parity kernel additions (oats#2122, items KP-1 to KP-8). Juan's side was told.

# Decision

**What the kernel adds for a provider (input keys, row fields, commands).** Set as the conditions on every item of oats#2122, and held for the next addition:
- it only adds, and a test holds that an older reader (the Desktop, the TUI, an older provider) is unaffected;
- it is announced as a feature in `oats version --json`;
- it ships with the JSON answer's docs and a release-notes entry.

A provider gates on that feature, never on a version string. It raises its `compatibility.oats` floor where it can't gate on the feature, as for an answer key (below). Warnings the kernel relays from a provider stay plain strings in `warnings[]`, because today's clients reject any other entry.

**An optional key in a provider's answer.** The kernel judges a provider's answer by exact keys, so an older kernel reads an answer carrying an unknown key as unreachable. A provider can't gate per call either: its input carries the wire version, and nothing of the kernel's features. Such a key ships in this order:
1. a kernel release that accepts it, announced as a feature;
2. the provider release that sends it, with its OATS floor raised to that kernel;
3. the workspace pin of that provider, moved only once every deployment of the workspace file is on that kernel.

The docs say the cost: a kernel moved back below that release reads every row of that provider as unreachable. The rule is written once in the kernel's `docs/capabilities.md`, for the next optional answer key.

# Why

Every bb home already running relies on wire 1.3. A wire bump would refuse them all at once. A floor costs only the release order. With `oats.bb` in the OATS workspace's default capabilities, every soul carries the package, so a floor reaches every deployment of the file, and step 3 protects those deployments.

# Rejected

- **A wire bump for an optional answer key.** It refuses every running provider home.
- **A provider-only rule that the kernel "ignores what it doesn't read".** That isn't true of answers, which are judged by exact keys.

# See also

- [A kernel may ship an unversioned provider wire before the versioned one, only behind a provider floor](a-provider-wire-ships-before-its-version-only-behind-a-floor.md): the floor that sets the wire's own first release.
- [A session backend other than tmux is a session provider](session-backends-are-a-kernel-contract-a-capability-implements.md).
- [An older host degrades with a warning](an-older-host-degrades-with-a-warning.md): the same stance from the client's side.

# What is checked and what is reported

Read at maintainer review on 2026-11-25, on [oats-project/oats#2122](https://github.com/oats-project/oats/issues/2122):
- the conditions on every item (feature announced in `oats version --json` and gated on, only adds with an older-reader test, JSON docs and a release-notes entry) and the string-only `warnings[]` change, in the [decision record](https://github.com/oats-project/oats/issues/2122#issuecomment-7157707398) and [the client facts](https://github.com/oats-project/oats/issues/2122#issuecomment-7157864001);
- the exact-keys correction, in [the build's correction](https://github.com/oats-project/oats/issues/2122#issuecomment-7158111937);
- the floor, the rollback cost, the rule written once and the three-step release order, in [the release lane's ruling](https://github.com/oats-project/oats/issues/2122#issuecomment-7158115291).

The kernel's `docs/capabilities.md` at oats main `f8f1f486` says a provider request carries the wire (`"wire": "1.3"`) and no kernel features, and that an `inspect` answer has exactly its listed keys. It did not yet carry the optional-answer-key rule. That a wire bump would refuse every running bb home rests on the wire-mismatch refusal in [the provider-wire floor decision](a-provider-wire-ships-before-its-version-only-behind-a-floor.md). The release lane's call is its own, under [Joan's bb effort is pre-approved on Pepe's side](joans-bb-effort-is-pre-approved-on-pepes-side.md) (`dec-155756953d6e`).

Evidence: OKF proposal from oats-maintainer/release-maintainer, 2026-11-25; notes/optional-provider-answer-key.md, notes/kernel-additions-announced-as-features.md.
Maintainer review of oats-knowledge#473 (2026-11-25) read the cited rulings on oats#2122 and the kernel docs, scoped the per-addition conditions to where they were set, bounded the floor rule to what the ruling says, and stamped the id.
