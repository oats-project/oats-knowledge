---
type: Decision
title: settings.oats.aweb.interaction is validated strictly, at spawn and at launch, before any aw call
description: Absent means `terminal`; null, empty, non-string or unknown values are refused with a message naming the key, the received value and both accepted values, following the package's `claudeChannelMode` precedent rather than `delivery`'s silent coercion, because a mis-typed `threads` that silently became `terminal` would give Desktop no panel and the human no explanation.
about: [system/oats-aweb]
id: dec-4e946c9a95ea
tags: [oats.aweb, threads, interaction, settings, validation, spawn, launch]
timestamp: 2026-10-26
---

Decided 2026-10-26 in stage 1 of the threaded human channel. The soul-level
field `settings.oats.aweb.interaction: terminal | threads` is the one the
maintainer's decision placed in the messaging capability's settings
([humans address long-lived agents through threads](/nodes/oats-maintainer/decisions/humans-address-long-lived-agents-through-threads.md),
rule 1); this record is how the provider validates it.

# What was decided

- **Absent → `terminal`.** Only a missing key takes the default.
- **Anything else must be exactly one of the two strings.** `null`, `""`, a
  non-string or an unknown string is refused with a message naming the key,
  the value received and the two accepted values.
- **The check runs at spawn, before any `aw` call, and again at launch.**
  Stage 2's launch hook selects the wake presentation from the same value; a
  home must never launch with a value the hook cannot act on. The kernel
  re-supplies the spawn-captured settings at launch, so a frozen home cannot
  newly fail.

# Why this precedent and not the other

The package had two precedents for a settings key: `delivery` coerces
anything that is not `session` to `channel` silently, while
`claudeChannelMode` refuses explicit null, empty, wrong-type and unknown
values at spawn and launch, before any effect. `interaction` follows the
strict one. The design record says the spawn hook refuses any other value
with a message naming the key, the value and the accepted values; and the
failure the rule exists for is exactly a typo in `threads` that would
silently become `terminal`, leaving Desktop without a panel and the human
without an explanation.

**Rejected:** treating `null`/`""` as the default, as `delivery` does. An
explicit null in a soul file is more likely a mistake than an intent, and the
strict precedent already existed in this package. A later setting should copy
this precedent, not the lenient one.

# Known limit (stage 1)

The captured-execution (portable-profile) path allow-lists settings keys and
did not admit `interaction` in stage 1: a `threads` soul under captured
execution is refused with that path's generic message. Reported, not fixed,
in stage 1; whoever closes it supersedes this paragraph.

# Citations

Evidence: OKF proposal from oats-aweb-expert/threaded-channel-aweb-expert,
2026-10-26; notes/interaction-validation.md. The source cites the design
record in awebai/oats (`docs/design/2026-10-26-threaded-human-channel.md`,
§1) and the stage 1 branch's tests; the branch's merge state is not known to
this harvest.
