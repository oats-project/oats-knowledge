---
type: Lesson
title: Live config validation belongs after confirmation, not in a reusable preview cache
description: Validate an isolated baseline and candidate after confirmation and just before an atomic guarded write, because unchanged copied bytes do not prove an executable config's dependencies stayed unchanged.
about: [workstream/provider-integration]
kind: lesson
id: ins-d58853df6999
tags: [integrations, config, validation, confirmation, environment]
timestamp: 2026-10-19
---
# Why the preview's pass was rejected

An integration editing an auto-reloading desktop config can break the active
session at save time. In the reported Omarchy work, avoiding two validation
rounds during interactive apply led to a cache keyed by SHA-256 over every
copied file and the candidate. It reused a pass even after a dependency under
`$OMARCHY_PATH` changed, and after an executable bit changed [1].

The config was executable Lua: it could load files outside the copy and run
commands through `io.popen`. A digest of copied bytes was therefore not a
fingerprint of the validator's inputs. Hashing more of the same tree would
not close that dependency set. A confirmation prompt gives those untracked
inputs time to change while preserving a convincing but stale green result.

The chosen design removes validation from the interactive preview and says
it is pending. After the answer, apply performs one fresh validation phase,
covering baseline and candidate, immediately before the write. A standalone
plan may validate for information; its pass is not authorization for a later
apply. This is not a blanket ban on all preview reuse: the kernel's
[decision-fenced spawn exception](/nodes/oats-kernel-expert/decisions/preview-bound-apply-may-reuse-observations.md)
binds a different promise and does not prove arbitrary config inputs fresh.

# Validate the copy the application actually reads

A top-level `-c <copy>` is insufficient if module resolution still reaches
live files. The source found that Omarchy's Hyprland bootstrap resolves
`require("hypr.*")` through `$HOME`. Its validation arrangement uses a private
temporary home holding the copied config, with HOME and the relevant XDG
locations redirected there. Use the application's own validator on the
unchanged copy first, then on the candidate: an already-invalid baseline is
not an edit-induced failure.

That arrangement redirects known lookups; it is not a sandbox for arbitrary
Lua or a proof that every dependency is copied. This is the same isolation
boundary as the [real-binary rehearsal lesson](/nodes/integrations-expert/lessons/a-fake-cli-that-accepts-what-the-real-binary-refuses-hides-a-broken-hook.md):
a temporary directory isolates only the state actually redirected into it.
For another application, establish its lookup behavior rather than assuming
it follows HOME in the same way.

Fresh validation and write ownership are separate checks. The reported
write policy requires the live target to remain byte-identical to the
planned input and uses atomic replacement. Removal takes out only the marked
integration block; restoring the whole backup is permitted only when the
file still exactly matches what the integration wrote. Otherwise restoration
would erase intervening user edits. Neither an atomic rename nor a target
byte comparison freezes external validator dependencies.

# Enforcement and proof boundary

The elimination route is the setup writer's control flow and regression
coverage, not a reminder to recheck manually. Test that interactive preview
does not validate, post-confirmation apply does, and an external dependency
or mode change cannot be hidden by a copied-byte cache. Cover baseline
failure, changed-target refusal, atomic writes and removal with user edits.
Use real-validator fixtures for lookup behavior rather than a fake that
accepts the intended model.

The source reports headless validation with Hyprland 0.56.2 on Omarchy 4.0.4,
and a read-only real plan with the live home mounted read-only. The validator
accepted duplicate binds, so a parse pass is not proof of conflict freedom.
No live-session apply was run. These observations support the rejected cache
and isolation rationale, not full live-session acceptance or a claim that
headless validation is side-effect-free for arbitrary config code.

# Evidence

Evidence: OKF proposal from integrations-expert/integrations-expert-omarchy, 2026-10-19; notes/never-reuse-a-config-verification-across-a-prompt.md; notes/hyprland-verify-config-is-a-headless-proof.md; notes/omarchy-plugin-facts-that-shape-a-setup.md.

1. The proposal names awebai/oats-omarchy #6 and #7, with PR #5 review round 2,
   for the write and cache findings. Reproductions, write/removal policy and
   the read-only plan are source-reported; this harvest did not audit the
   implementation or execute the application.
