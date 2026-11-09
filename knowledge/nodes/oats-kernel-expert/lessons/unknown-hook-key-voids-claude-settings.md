---
type: Lesson
title: An unknown hook key makes Claude Code skip the whole settings file, and a headless check hides it
description: Before 2.1.78 a StopFailure key voids a Claude Code settings file and stops an interactive start at a Settings Error dialog no unattended instance can answer, while a -p run shows nothing, so a new Claude hook key is written only after versioning the executable the launch runs and any failure of that check leaves the key out.
tags: [kernel, harnesses, claude, hooks, settings, evidence]
timestamp: 2026-10-30
---
# Finding

The source reports measuring Claude Code 2.1.61, 2.1.77, 2.1.78, 2.1.288
and 2.1.308 on 2026-10-30 against a loopback provider:

- With a `StopFailure` hook key in the settings file on 2.1.61 and 2.1.77,
  **no hook fired and a `model` in the same file stopped applying**. Without
  the key, hooks fired. An unknown hook key does not fail by itself; it
  makes Claude skip **the whole file**.
- An interactive start then stops at a **"Settings Error"** dialog offering
  exit or continue. An unattended instance cannot answer it, so the start
  hangs.
- `claude -p` shows no error for the same file, so a headless check passes
  while a real start hangs.
- `StopFailure` arrived in 2.1.78.

The failure direction matters: the key was being added so that failed turns
stop going unseen, and on an older Claude it produced exactly the unseen
stuck start it was meant to end.

# What a kernel expert does differently

- **Gate every new Claude hook key on the executable the launch runs**,
  not on `claude` from the hook's PATH. A declared executable or a pane PATH
  that differs selects another Claude, so the version check reads the
  [kernel-handed executable](../decisions/hook-executable-is-the-pane-side-answer.md).
- **Any failure of the check means "leave the key out"**: absent variable,
  older kernel, timeout, unparseable output. The hook must not refuse the
  launch over it. On a kernel without the variable, the capability leaves
  the key out and that harness's failed turns stay unreported until the
  kernel is upgraded; that cost was accepted.
- **Probe with SIGKILL, not only a timeout.** A `--version` process that
  ignores TERM defeats a timeout; the probe runs the path alone, with no
  launch-configuration arguments and a short deadline.
- **Test the real interactive start**, not `-p`, when a change touches
  settings a harness may reject. A headless pass proves nothing about the
  dialog.

The measured key is `StopFailure`; measure the actual behaviour of the
actual key on the actual version rather than inferring every unknown key
fails the same way.

# Elimination route and limits

The structural fix is the one in place: the capability writes a version-gated
key from the kernel-handed executable, with a generated-settings test per
Claude version. This lesson remains for the **next** hook key, so it is
added under the same gate rather than unconditionally, and for the test
discipline (interactive, not headless). It does not change a soul skill or
certify that every Claude version was measured.

Version boundaries are the source's measurements on the versions listed,
not a maintained support matrix; recheck them on the version a change
targets.

# Evidence

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-failed-turn-reported, 2026-10-30; notes/claude-unknown-hook-key-voids-settings.md.

The harvest read the [problem statement citing the measurement](https://github.com/oats-project/oats/issues/1667#issuecomment-6525497844)
and the [release lane's "a failure means no key" condition](https://github.com/oats-project/oats/issues/1667#issuecomment-6525516333)
on oats-project/oats#1667, and
[implementation PR #1669](https://github.com/oats-project/oats/pull/1669),
merged on 2026-10-30 at head `309b4409e`. The measurements are
source-reported; this harvest reproduced none of them.
