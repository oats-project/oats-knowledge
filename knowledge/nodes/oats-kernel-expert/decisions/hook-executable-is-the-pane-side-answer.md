---
type: Decision
title: A hook is handed the pane-side lookup's answer at that moment; a later replacement is warned, not prevented
description: OATS_HARNESS_EXECUTABLE is the kernel's own pane-side lookup as a real path, absent where it has no answer; sessions stay created after hooks, so a replacement on the real session is warned in the answer and the home with both real paths, rather than prevented by reordering spawn or checked through the hook's PATH.
tags: [kernel, hooks, launch, harnesses, rejected-alternatives]
timestamp: 2026-10-30
---
# Decision

When a spawn or launch hook needs to know which harness executable this
launch will run, the kernel hands it the answer rather than letting the
hook look for itself. The source reports the decision by both maintainer
lanes on 2026-10-30:

- `OATS_HARNESS_EXECUTABLE` is the result of the **kernel's own pane-side
  lookup at the moment the hook runs**: the launch configuration's
  executable, else the PATH of the session, server or launch configuration,
  never the hook process's PATH. It is an absolute **real path**.
- Where that lookup has no answer, the variable is **absent, never
  guessed**. A hook decides things from it, and a wrong answer is worse
  than none.
- It reaches the **spawn hook at spawn** and the **launch hook at start**,
  and is set the same way in preview runs, so a preview shows the settings
  the real launch writes. `oats spawn` runs no launch hook; the spawn hook
  is what writes the first session's settings.
- It is a reserved hook variable, like `OATS_HARNESS`: a launch
  configuration's `env` or a trigger cannot set it.

# Why the kernel hands it

Only the kernel knows what the pane will run. A hook's own `command -v`
answers for the hook's environment, which can select a different harness
than the pane's PATH or a declared executable. The motivating case is the
[Claude settings lesson](../lessons/unknown-hook-key-voids-claude-settings.md):
a hook that versions one Claude while the pane runs another writes a key
the launched Claude does not know, and the start hangs at a dialog.

# Why the value can still go stale, and what was chosen

The kernel selects the executable before the hook on every path, but a
**bare harness name is looked up again on the real session**, and the
launch runs what that finds. The session the kernel gets is not always the
one it planned for: another creator can win the server's creation, and the
harness default is a bare name, so a first spawn takes this path. A
recorded or declared path does not change; a restart usually keeps its
recorded recipe. A symlink can also move under any path.

The chosen answer is to **warn, not prevent**: when the launched executable
differs from the one handed to the hook, the kernel records the replacement
in the start's answer **and as an event in the home**, naming **both real
paths**, so whoever reads it can tell which harness ran. An unattended
spawn's answer often goes unread, which is why the home record is required
as well.

Because a pathname is not a program, the comparison before dispatch is
between **real paths**, whatever the pathname did. The source reports that
review found a plain string comparison missed the symlink case.

# Rejected alternatives

- **Create the tmux session before the hooks run**, so the answer is final.
  Rejected by both lanes: it reorders spawn's failure compensation, a much
  bigger risk than the narrow race it closes, and hooks may create the
  session themselves.
- **Withhold the variable from the first spawn**, where the bare-name race
  exists. Rejected: most instances never restart, so the first spawn is
  where the answer is needed most.
- **Keep a PATH version check in the hook** with no contract change.
  Rejected: a launch configuration pinning an older harness with a newer
  one on PATH still hangs a start, in a change meant to stop instances
  sitting stuck unseen.

# Scope and limits

The variable is capability-neutral: set for every harness, it says nothing
about Claude. Any harness-specific version rule stays in the capability
that needs it. It is additive; hooks that do not read it are unaffected,
and on a kernel without it a capability must behave as if the lookup had
no answer.

Accepted limit: a hook that is not preview-aware is not compared when an
early lookup moves the executable. The residual hang needs the bare-name
race **and** the other session's PATH finding an older harness **and** the
planned one being newer; under the rejected PATH check a plain PATH
difference was enough.

A name the kernel hands only to hooks also has to be kept away from the
harness pane; the [launch-variable decision](declared-launch-variable-is-the-providers.md#hook-only-reserved-names-take-the-same-pane-boundary-2026-10-30)
records why reservation alone does not do that. The
[per-start hook decision](dialog-claim-support-is-a-per-start-hook-statement.md)
relies on this variable for its "reported only when claims will actually
fire" condition.

# Evidence

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-failed-turn-reported, 2026-10-30; notes/hook-executable-is-the-panes-answer.md.

The harvest read the
[option B proposal](https://github.com/oats-project/oats/issues/1667#issuecomment-6525497844),
the [release lane's five conditions](https://github.com/oats-project/oats/issues/1667#issuecomment-6525516333),
the [two corrections and warn-not-prevent amendment](https://github.com/oats-project/oats/issues/1667#issuecomment-6525549780)
and the [agreement to the amendment with the home-event addition](https://github.com/oats-project/oats/issues/1667#issuecomment-6525558709),
all on oats-project/oats#1667 under their named accounts, and
[implementation PR #1669](https://github.com/oats-project/oats/pull/1669),
merged on 2026-10-30 at head `309b4409e`. The records present as the two
maintainer lanes agreeing on the public issue; they are lane decisions, not
a separate human acceptance record. The real-path comparison fix, the
regression tests and the measurement behind the motivating case are
source-reported; this harvest ran nothing and audited no implementation.
