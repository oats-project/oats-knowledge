---
type: Lesson
title: Claude Code's subscription login needs the approver at the server
description: Claude Code's subscription login reportedly hands the browser a code that must be typed back into the server's own terminal, so a headless or remote onboarding needs the approver on a shell at that machine or a pre-supplied login, and an agent never relays the code.
tags: [operator, onboarding, harnesses, claude, authentication, headless, remote]
timestamp: 2026-11-09
---
# The secret-bearing step happens at the server, not in the browser

In the GitHub CLI's web flow the person enters a code *in the browser*; the
machine that started the login needs nothing typed into it. The source
reports that Claude Code's subscription login (`/login`, "Claude account
with subscription") runs the other way round: the terminal prints an
authorize URL, the browser completes authorization and lands on a page that
shows a code, and that code has to be typed back at the terminal's
"Paste code here" prompt. The step that carries the credential is at the
server.

For an unattended or headless machine this changes who must be where. A plan
that works for gh, "send the URL to the person, they approve in their
browser, done", does not complete a Claude Code login: someone with a
terminal on that machine must still paste the code. Either the approver
gets a shell there (for example an SSH session attached to the agent
account's terminal multiplexer), or the operator pre-supplies the
harness's authenticated state through the harness's own mechanisms before
the run.

# What an agent may and may not carry

An agent may pass the authorize URL on: it is not a secret. It must not
receive and type the code. The code is part of an interactive login, and
relaying it would put the agent in the credential path that
[harness authentication is native and user-managed](/nodes/oats-kernel-expert/decisions/harness-native-authentication.md)
keeps it out of. This is the login exception already named in
[onboarding passes on the newcomer's experience](/nodes/oats-operator-expert/decisions/onboarding-passes-on-the-newcomers-experience.md):
agents run the routine commands, the person does the login. The source
reports its campaign lead agreed the code must not be relayed; that is the
source's report of a team conversation, not an independently readable
record.

When a plan calls for the person to approve a login from elsewhere, check
which direction the flow runs *before* promising it can be done remotely.
For a relayed approval that the flow does allow, the code's lifetime matters
too; see
[a device-login code expires on the server's clock](/nodes/oats-operator-expert/lessons/a-device-login-code-expires-on-the-servers-clock.md).

# Limits and elimination route

The source observed this once, with Claude Code 2.1.319 on an Ubuntu 24.04
virtual machine with no display, as a fresh user without sudo, on
2026-11-09. It did not test other harness releases, other account types
(an API key or a console login) or whether the harness offers a different
flow when it detects no browser. This harvest did not reproduce it. The
login mechanics are the harness vendor's and may change; the durable lesson
is that each harness's login flow decides who must be at which machine,
and that must be checked before a remote onboarding is planned.

The elimination route is in the onboarding and trial guidance that plans
remote or headless runs: state per harness where the login must be
completed, and have the person's shell access or a pre-authenticated
harness arranged before the run rather than discovered at the prompt.

# Evidence

Evidence: OKF proposal from oats-operator-expert/oats-operator-expert-onboarding-vm-campaign,
2026-11-09; notes/headless-claude-login-needs-the-approver-at-the-server.md.

The note records the observed prompt sequence and the comparison with gh's
web flow; the trial's stage labels and the authorization page's address are
omitted here as task residue.
