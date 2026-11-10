---
type: Lesson
title: A device-login code expires on the server's clock, not aw's timeout
description: An aweb device-login code reportedly lasted ten minutes whatever `aw auth login --timeout` asked for, so when a person approves through a relay, confirm they are at their browser first, then start the code and send the link within a minute.
about: [workstream/operations]
kind: lesson
id: ins-553a94707cd2
tags: [operator, onboarding, aweb, authentication, device-flow, relay]
timestamp: 2026-11-09
---
# The local wait and the code's lifetime are two different clocks

`aw auth login --timeout` sets how long the client waits locally for the
approval. The source reports that the device code itself expires after ten
minutes, set by the service, and that a longer `--timeout` did not extend
it: two codes started for a person who was not yet at a browser expired
unapproved, one of them started with `--timeout 30m`.

The operational cost is not the expiry itself but the relay. When an agent
starts a device login on a machine and a parent, another agent or a chat
carries the link to the person, each expired code costs another message
round and another wait for the person to come back. In an onboarding where
the newcomer is already being asked to do several things, those rounds are
the friction that
[onboarding passes on the newcomer's experience](/nodes/oats-operator-expert/decisions/onboarding-passes-on-the-newcomers-experience.md)
judges.

# Sequence the relay around the code, not the code around the relay

Get word that the person is at their browser *before* starting the login,
then start it and send the link within a minute. Do not start a code "so
it is ready" while the person is still being found, and do not reach for a
longer local timeout as the fix: it only makes the client wait longer for a
code that has already died.

This is the other half of planning a relayed login:
[Claude Code's subscription login needs the approver at the server](/nodes/oats-operator-expert/lessons/claude-code-login-needs-the-approver-at-the-server.md)
records a flow that cannot be relayed at all; this lesson is about a flow
that can, as long as the relay fits inside the code's lifetime.

This lesson sequences an `aw auth login` that is already permitted; it is
not permission to add one. Agent-facing text does not tell anyone to run
`aw auth login`, except the scoped, link-approved and immediately ended
login that
[the steward bind may use](/nodes/oats-maintainer/decisions/human-attribution-is-an-optional-messaging-contract.md#the-steward-bind-may-use-a-scoped-immediately-ended-aw-login-2026-11-05)
under its three guards. Where that exception applies, the timing here
applies to it.

# Limits and elimination route

The source observed this on 2026-11-05 with aw 1.36.54 against aweb Cloud
0.8.70, on one disposable virtual machine; the ten-minute figure is what it
observed there, not a read contract, and this harvest did not reproduce it.
A later client or service release may change the lifetime or the client's
behaviour. The durable lesson is that a device code has a server-side
lifetime independent of the local wait, so the relay must be sequenced
around it.

The elimination route is the client's: print the code's expiry alongside
the link, and warn when `--timeout` exceeds the lifetime the service
granted. That belongs to the aweb product, not to this node; until it
exists, the sequencing above is the operator's control.

# Evidence

Evidence: OKF proposal from oats-operator-expert/oats-operator-expert-onboarding-vm-campaign,
2026-11-09; notes/aweb-device-code-ten-minute-cap.md.

The note records the two expired codes and the `--timeout 30m` attempt; the
trial machine's name and the campaign's stage labels are omitted here.
