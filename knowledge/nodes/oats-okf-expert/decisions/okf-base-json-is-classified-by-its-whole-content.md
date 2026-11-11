---
type: Decision
title: okf-base.json is classified by its whole content; the 16 MiB metadata bound refuses only metadata declaring the subject layout
description: Every 6.0 reader (validator, regenerator, `propose`, the subject verbs) reads `okf-base.json` whole and decides the base's layout from it through one shared function; a plain base's metadata has no 16 MiB bound, as in 5.8 (consult's 64 MiB per-blob read bound still applies); rejected: refusing any metadata above the bound before reading it (broke the "a plain base is served as 5.8 served it" guarantee) and "above the bound means plain" (consistent and bounded, but silently drops a bridged base's layout instead of failing loudly).
about: [system/oats-okf]
id: dec-757d12e77b14
tags: [decision, okf, okf-base, metadata, subject-layout, compatibility, 6.0]
timestamp: 2026-11-11
---

# The decision

`okf-base.json` is read whole by every reader and classified by its content through one shared function
(`layoutOf`), so no reader can see a layout another does not. The 16 MiB metadata bound applies to metadata that
declares the subject layout; a plain base's metadata keeps 5.8's behaviour (only consult's 64 MiB per-blob read bound,
which 5.8 also applied).

# Rejected

- Refusing any `okf-base.json` above 16 MiB before reading it (the 6.0.0 build): one plain base over the bound got an
  error 5.8 never raised, breaking the guarantee that a plain base is served as 5.8 served it.
- "Above the bound means plain": bounded and consistent across readers, but it silently drops a bridged base's
  layout, where a loud failure is the right outcome.

# Evidence

oats-okf #136 (11 November 2026, the release lane's follow-up 5 after #132): a plain base with a 17 MiB
`okf-base.json` validates with v5.8.0's exact findings, spawns and answers the subject verbs `E_USAGE`; two reviews
approved. Released in 6.0.1 (CHANGELOG, "A plain base's `okf-base.json` above 16 MiB").
