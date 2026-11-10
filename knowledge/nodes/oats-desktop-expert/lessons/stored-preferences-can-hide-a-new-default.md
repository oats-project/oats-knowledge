---
type: Lesson
title: A fresh-profile demonstration does not prove an upgraded user's experience
description: Reproduce preference-dependent changes with representative saved state as well as a fresh profile, because an old override can hide a new default or change meaning when another setting changes.
about: [system/oats-desktop]
kind: lesson
id: ins-c0eb1cfac3b8
tags: [desktop, preferences, verification, upgrades, typography]
timestamp: 2026-10-27
---
# Discovery

A new default is not necessarily a change for an existing user. In the
source's 2026-10-27 terminal investigation, a fresh Desktop profile showed
JetBrains Mono at the intended 13px, while an upgraded profile's saved 15px
preference still won. The earlier change had been demonstrated and accepted
on a fresh profile, so the approved appearance was not what the requester
received after upgrading.

This was more than an override hiding a default. The stored size had been
chosen for a different font face. When a preference's meaning depends on
another setting, retaining its raw value across a change to that setting
can misrepresent the original choice. Not every saved value becomes wrong;
the review question is which dependency gave it meaning.

# What changes in verification

A fresh-profile check proves the default path only. For a post-upgrade
complaint, establish the relevant saved values through an authorized,
read-only inspection or values supplied by the requester, then reproduce
those values in a disposable profile. Do not repair or experiment on the
operator's profile as part of diagnosis. Seed only the state needed for the
case, not an entire personal profile.

Show a preference-dependent correction using that representative saved
state, alongside the fresh case. This makes approval evidence about the
requester's path rather than merely the new default. Profile preparation
before an authorized on-screen showing also avoids presenting an unintended
intermediate state; it is not permission to launch Electron or weaken the
[existing isolation and native-effect boundaries](verification-judgment-for-privileged-surfaces.md).

The [per-face terminal-size decision](../decisions/terminal-size-belongs-to-its-face.md)
owns the product remedy and rejected migrations. This lesson owns why the
previous acceptance check missed the upgraded experience, not a second
font-size policy or a universal mandate to migrate all saved settings.

# Elimination route

First express the meaningful dependency in the preference model: for the
terminal decision, the size belongs to its face rather than a global slot.
Then cover both fresh and persisted-state paths in composition-level
regressions, including changing the dependent setting and resetting it.
Keep representative older preference states as synthetic fixtures so a
new default cannot silently leave the affected upgrade path untested.

The existing `electron-live-verification` guidance is the operational home
for authorized live comparisons. Reusable profile seeding belongs in the
repository's verification harness, not a private command recipe remembered
by each expert. The lasting judgment is to ask which state the accepted
preview actually represented. This harvest does not claim that such
reusable harness coverage has been completed.

# Citations and limits

Evidence: OKF proposal from oats-desktop-expert/omarchy-font-size-expert, 2026-10-27; notes/a-stored-preference-hides-a-new-default.md.

The source reports a controlled Xvfb comparison: 15px with the saved value,
13px without it, associated with
[awebai/oats#1539](https://github.com/awebai/oats/pull/1539) and the correction
in [#1595](https://github.com/awebai/oats/pull/1595). The observation is one
Omarchy environment with JetBrains Mono at scale 2, not a cross-platform
visual result. No personal profile or live Desktop was inspected by this
harvest; the experiment and the earlier acceptance mismatch are
source-reported evidence.
