---
type: Decision
title: A launch opens a running instance's terminal without taking input focus
description: Let Desktop launch intent reveal a running local instance's terminal while keeping keyboard input behind the person's explicit focus action.
about: [system/oats-desktop]
id: dec-e117832c2522
tags: [desktop, launch, navigation, keyboard, intent]
timestamp: 2026-11-06
---

# Decision and rationale

A Desktop launch's `--instance`, within its `--dir` deployment, selects a
matching running local row and opens its terminal tab through the same opening
path as a row click. A non-running row stays select-only; a launch never opens
Start. Showing a terminal is a viewing choice, not permission to start or stop
an instance, write deployment state or send input.

The opened terminal takes no keyboard focus. Focus stays on the roster row;
keys reach the agent only after the person clicks into the terminal or uses
the existing focus-terminal action. A launch is not intent to type: someone
typing elsewhere when the window appears must not send those keys to an agent.
Within Desktop, apply that distinction to automated or argv-driven opening
rather than treating opening a view as an input-focus request.

The rejected alternatives explain both halves of the decision:

- Giving a launch click-parity keyboard focus would mistake untrusted argv
  for the person's deliberate click. Reuse the opening path while preserving
  the different input intent.
- Keeping select-only behavior and moving the question into the instance
  panel would require more work and still require a click before answering.
  The motivating packaged investigation showed selection leaving the main
  area on Workspace overview, with the expert's question unseen.

Keep the existing validation, remote-row exclusion, notices and preference
for the person's later choice. The pending request still has a 30-second
window, and its first matching row consumes it: finding a stopped row does
not authorize opening its terminal if it starts later. These constraints
preserve the bounded launch request rather than turning it into a watcher.

# Acceptance and partial supersession

Human acceptance is **source-reported (relay at
[oats-project/oats#1665](https://github.com/oats-project/oats/issues/1665#issuecomment-6695059336))**:
the source reports Juan's decision to oats-expert-juan on 2026-11-06 at
20:40:06Z, relayed by aweb mail. This harvest read the linked GitHub record,
posted under `juanre`; it explicitly presents the human decision as a relay
and records both opening the running row's terminal and withholding keyboard
focus. Reading that record does not verify that the human authored it.

For running local instances only, this **supersedes D3's select-only and
no-attach condition** in the onboarding brief. The earlier
[product-lane conditions](https://github.com/oats-project/oats/issues/1665#issuecomment-6528183350)
and their [acceptance](https://github.com/oats-project/oats/issues/1665#issuecomment-6528193809)
were also read. Non-running selection and the no-start, no-stop, no-write and
no-input boundaries remain. The earlier diagnostic account in
[Verification judgment](../lessons/verification-judgment-for-privileged-surfaces.md#launch-diagnosis-must-reach-the-persons-view)
now links here; its statement that captured evidence lacked human acceptance
describes the earlier capture, not a continuing veto.

# Evidence and limits

Evidence: OKF proposal from oats-desktop-expert/desktop-platforms-expert, 2026-11-06; notes/launch-instance-is-focus-only.md.

The proposal identifies [oats-project/oats#1758](https://github.com/oats-project/oats/pull/1758)
as implementation, open at capture. It reports packaged Linux checks of
running-row opening on first and second launch, no terminal focus or native
key arrival at a pane, and stopped-row selection. Those results are
source-reported and were not rerun or audited by this harvest; the macOS GUI
tier was not run. The decision records accepted intent, not shipment or
cross-platform proof. Keep packaged regressions over the visible view,
keyboard focus and actual input arrival as the enforcement route.

# Related

[Keyboard policy follows actions and user intent](../lessons/keyboard-focus-and-action-ownership.md)
owns the general intent and event-ownership judgment;
[Terminal tabs are viewers, not session owners](terminal-viewers-not-session-owners.md)
owns the exact-session and viewer-lifetime boundaries. This launch decision
changes neither.
