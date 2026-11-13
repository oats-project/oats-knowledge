---
type: Lesson
title: A provider's spawn refusal reaches clients as its text, not as a code
description: A failing spawn hook's last-line warning becomes the kernel's E_REQUIRED_HOOK_FAILED message, which --json carries and the client keeps from a kernel that advertises worktree-event. Trace the kernel's hook runner and the client's pass-through before claiming in review that a provider's text only reaches a terminal.
about: [workstream/oats-direction]
kind: lesson
id: ins-7a9351bfd994
tags: [review, capabilities, hooks, errors, desktop]
timestamp: 2026-11-11
---
# What happened

On 2026-11-11, reviewing a messaging-provider spec, the maintainer claimed a
provider's spawn refusal reached only a terminal's stderr, and asked for a
structured refusal. The spec's lead showed the path, confirmed at oats main
288ca5c6:

- **The provider:** a failing spawn hook prints `{"warning": "<text>"}` as
  its last stdout line and exits nonzero.
- **The kernel:** its hook runner takes that `warning` as the failure
  detail and puts it into the `E_REQUIRED_HOOK_FAILED` message.
- **The client:** from a kernel that advertises `worktree-event`, it keeps
  the kernel's message for the rolled-back codes, up to 4,096 characters;
  its generic "A required worktree hook failed." is only the fallback.

The miss came from reading the docs (which do not say this) and the client's
fallback table, not the kernel's runner.

# The lesson

A spec should pin the provider's text instead: it starts with its code and
carries its fix within the provider's length cap. A structured
`{code, message, fix}` that clients word themselves is a nice-to-have for
every provider, not a gap.

Before claiming that something never reaches a client:

1. Trace it through the kernel's code path, not only the docs.
2. Follow it through the client's pass-through rule.
3. Read the fallback table last.

The repository's docs do not state this path; documenting it where the docs
describe a hook's output is the route that would retire this lesson.

# Evidence

Evidence: OKF proposal from oats-maintainer/product-maintainer-pepe,
2026-11-13; notes/provider-refusal-must-reach-the-client.md. Verified at oats
main 288ca5c6 (`lib/core.mjs` hook runner;
`packages/client/spawn-apply-cli.mjs`, `spawn-apply-contract.mjs`).
