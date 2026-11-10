---
type: Lesson
title: A provider test that fakes the kernel's payload proves nothing about the kernel; a provider's meaning for a settings key is only as good as what the kernel puts there
description: When a provider gives a settings key a meaning the contract does not guarantee (settings.team as "the default team a host chose"), a test that hand-writes the payload without the key passes while the real kernel, which merges the primary label's team into that key, makes the provider do the opposite; check what the kernel actually merges before assigning meaning, and when the meaning is right, change the kernel's merge rather than guess from equality in the provider.
about: [workstream/provider-integration]
kind: lesson
id: ins-99454983a442
tags: [integrations, kernel-contract, settings, teams, testing]
timestamp: 2026-09-25
---

**Observed.** The teams work moved the provider to "default team by
default; the primary label is just the first eligible team". The provider
read the default team from `settings.team`. Its test built `OATS_SETTINGS`
by hand without `team` and passed. The kernel, though, merged
`byTeam[primary].team` into that same key, so on a real deployment with a
mapped primary label the provider minted the instance straight into the
wider team the model says it must not join by default. Only a read of the
kernel's resolver, not the green suite, showed it.

**Rules.**
- Before a provider assigns meaning to a settings key, read the kernel's
  merge for that key (which sources feed it, in which order) and write the
  test from what the kernel produces, not from a payload you author.
- When two sources land in one key and the provider needs them apart, the
  fix is a kernel contract change that keeps them apart (here: byTeam only
  in the per-label teams entries, `settings.team` = host/soul/spawn), never a
  provider heuristic that guesses from equality, which misreads a host that
  deliberately sets both the same.
- Gate the provider release on the kernel change landing, and say in the
  PR which kernel behaviour the head assumes.
- Read what the kernel hands you where it hands it: teams arrive in the
  environment (`OATS_TEAMS`, `OATS_TEAMS_SOURCE`), and the strict check
  stdin wire stays as released; widening the wire to carry them breaks
  every released provider that rejects unknown keys.
