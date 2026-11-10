---
type: Lesson
title: Check the running Desktop's version before debugging behaviour
description: Establish the running Desktop's version before diagnosing post-upgrade behaviour, because a new launch can hand off to old code and a restart remedy cannot retrofit that running process.
about: [system/oats-desktop]
kind: lesson
id: ins-24d5c18e7bd9
tags: [desktop, diagnosis, upgrades, single-instance, user-consent]
timestamp: 2026-10-26
---
# Establish which code is answering

Before debugging a Desktop behaviour report after an upgrade, establish the
version of the **running process**, not just the installed file. In the
source's 2026-10-22 investigation, a shortcut report attributed to the newer
installation came from an older Desktop still running. Keymap overrides,
compositor grabs and keyboard-layout explanations had already been ruled
out; the current code was not the code answering the launch.

A launch that encounters Electron's existing single-instance lock can hand
off to the running Desktop, which opens a window of its own code. A new
window or a recent launch attempt therefore does not establish a new process
or version. On Linux, replacing an AppImage file does not replace the code
in an already-running app's mount. The source established the running version
from that mount's packaged application metadata and corroborated the process
with the single-instance lock. This is read-only diagnostic evidence, not a
reason to launch or restart an app to discover its version.

This check precedes [keyboard policy diagnosis](keyboard-focus-and-action-ownership.md);
it does not change the binding policy or infer the current shortcuts from a
historical incident. The durable finding is the mismatch between installation
and execution, not a version-to-keybinding table.

# Remedy: offer the intended version without taking away the user's work

The proposal reports an accepted remedy: the **running app** responds to a
different-version launch with a native dialog attached to the launch's
window. Offer a choice to restart into the launched copy or keep the running
one. Restart targets that copy with its own launch arguments and uses the
normal quit path. If there is no usable relaunch path, explain that the user
must quit and reopen instead.

Preserve the reasons behind that choice:

- **No automatic restart.** Launching a different version is not consent to
  close the existing windows and open work.
- **No second-instance version probe.** The older app supplies no reply from
  which the new second instance can learn its running version. Put the
  response in the process that owns the existing app, rather than assuming
  a reply protocol the older process never implemented.
- **Information alone is the fallback, not the main remedy.** Merely telling
  the user to quit and reopen leaves a chore after they already chose another
  copy. Offer the direct action when it is available, without removing the
  choice to keep working.
- **Prefer the native dialog for this boundary.** A renderer toast would
  require a new bridge and per-window routing. The native dialog avoids those
  additions; this is the rationale for this handoff, not a general ban on
  renderer notifications.

# Elimination route and evidence limits

The mismatch should be handled in the app and guarded by regression coverage,
not left solely as a diagnostic reminder. The source identifies
[awebai/oats#1486](https://github.com/awebai/oats/pull/1486) as the merged remedy.
It cannot retrofit an already-running version that predates the handler:
that process can still accept a handoff silently. The version check therefore
remains useful even after the remedy exists. This is a compatibility limit
for older running copies, not a claim that every future upgrade is silent.

The proposal reports unit-tested relaunch behavior only; it supplies no live
Electron or AppImage relaunch verification. It also reports that macOS
same-bundle launches do not reach `second-instance`, so this handler is not
proof of coverage for that route. Keep the existing
[privileged-surface verification and operator-machine safety rules](verification-judgment-for-privileged-surfaces.md):
unit coverage is not native evidence, and a missing live check grants no
permission to run the packaged app on an operator's machine.

# Citations

Evidence: OKF proposal from oats-desktop-expert/oats-desktop-expert-quick-open-linux,
harvested 2026-10-26 (investigation dated 2026-10-22);
notes/check-running-version-before-debugging-keys.md.

The captured note supports the stale-process finding and read-only diagnosis;
it still describes the remedy as in progress. The later proposal supplies the
reported accepted remedy, rejected alternatives, merge reference and platform
and verification limits. Those later outcomes are source-reported, not an
independent implementation audit or a claim of live verification by this harvest.
