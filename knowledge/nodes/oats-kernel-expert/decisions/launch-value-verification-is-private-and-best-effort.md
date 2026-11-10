---
type: Decision
title: Launch-value verification is private and best-effort
description: A launch-value verifier must resist low-entropy guessing without becoming credential custody, and recording failure must not become a new reason to fail a start.
about: [system/oats-kernel]
id: dec-0d317787dff3
tags: [kernel, launch, credentials, recovery, rejected-alternatives]
timestamp: 2026-10-27
---
# Kernel rationale

For the resume environment check, a one-way digest is not enough on its own:
a plain hash lets someone test guesses for low-entropy values and correlate
equal values across homes. The source selected HMAC-SHA256 with a key made
once per home and restricted to that home's owner (0600), rather than a
plain hash or a retained value. Keeping the key private is part of this
argument, not an optional storage optimization.

This applies the [native-authentication boundary](/nodes/oats-kernel-expert/decisions/harness-native-authentication.md):
`fromEnv` may resolve to a credential, but the comparison record must not
become a credential store or a new authentication mechanism. A digest that
cannot authenticate to the harness is still sensitive comparison material;
it is not permission to export the digest together with its key. The
[home-file retirement lesson](/nodes/oats-kernel-expert/lessons/bridge-home-markers-change-retirement.md#refinement-work-classification-is-not-copy-permission-2026-10-27)
owns the separate recovery-copy boundary.

**A failed verifier-record write must not fail the start.** Making the
safety record a launch prerequisite would introduce a new way to break an
otherwise usable start. Accept the loss of comparison evidence rather than
pretend that an unwritten record proves equality. This choice concerns
record production; it does not waive a detected environment change,
unresolved reference or any independent lifecycle refusal.

The source reports a further limit: a start can write the comparison record
and then fail before that start is itself recorded, leaving the previous
start unverified. A file's presence is therefore not sufficient evidence
that it describes the start being resumed.

# Scope and enforcement

The [maintainer's recovery decision](/nodes/oats-maintainer/decisions/lost-sessions-resume-locally-in-their-own-conversation.md)
is the canonical home for resume eligibility and launch-environment policy.
This concept records the kernel's rejected plain-hash and fail-start
alternatives, not a second policy for when an unverified resume may proceed.
The warning-only exception and its scope belong with that policy.

Use the same read-only comparison for execution and planning, rather than a
second sweep-side implementation that can disagree. This is an application
of [one authoritative CLI rule](/nodes/oats-kernel-expert/lessons/per-command-enumerations-drift-from-the-dispatch.md),
not a new general drift lesson.

Enforce these boundaries in the record writer and shared comparison code.
Regression targets include per-home key separation, no retained values,
non-fatal record-write failure, stale or mismatched start evidence, and
plan/execution agreement. These are prevention targets, not test results
from this harvest.

# Evidence and limits

Evidence: OKF proposal from oats-kernel-expert/session-resume-kernel-expert,
2026-10-27; notes/decision-start-env-record-is-a-keyed-digest.md.

The source identifies [awebai/oats#1578](https://github.com/awebai/oats/pull/1578)
and reports maintainer rulings and a reviewed implementation. The proposal
supplies the HMAC-SHA256, key-permission and interrupted-start details; the
note supports the plain-hash rejection, best-effort-write rationale and
shared-check choice. No implementation, private correspondence or runtime
behavior was independently audited here. No new human acceptance or
supersession of the native-authentication decision is inferred.
