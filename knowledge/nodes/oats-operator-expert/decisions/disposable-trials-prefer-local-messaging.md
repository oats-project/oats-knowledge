---
type: Decision
title: Disposable trials prefer local messaging over throwaway hosted accounts
description: Prefer a local rootless messaging stack when teardown must remove trial service state, reserving hosted trials for explicitly needed hosted-build behavior.
about: [workstream/operations, workstream/messaging]
id: dec-565f631a040a
tags: [operator, trials, messaging, teardown, rejected-alternatives]
timestamp: 2026-11-02
---
# Choice and rationale

For disposable coordination trials, the source chose local rootless aweb
and awid rather than creating a throwaway hosted account. The deciding
property was **what teardown can remove**, not whether onboarding is easy.
A local stack puts its service data under the trial's cleanup authority;
deleting a scratch deployment does not delete accounts, teams or identities
created on a hosted service.

The source's evaluation of oats.aweb 1.32.1 and aweb documentation found that
the hosted new-account route also requires a globally available username,
network access and use of the production service shared with live teams.
These were reasons to reject it as the default trial fixture. No hosted
account was created during the investigation: hosted persistence and setup
behavior were inspected, not tested through creation and deletion. This is
not a claim that the service has no account-deletion mechanism.

A hosted trial remains a distinct option when the behavior under question
may differ between the available stable server tag and the hosted build.
That option needs its own authority and cleanup accounting; a local result
is not proof about an untested hosted build. Conversely, testing the exact
hosted build is not worth silently leaving production-service residue when
that build difference is outside the question.

# What the local choice proves

The source reports a development run and a scripted smoke run using aweb
`server-v1.27.38`, with instance mail/reply, human mail/answer, a needs-input
claim and a scheduled wake driven by a tick loop. It reports no remaining
trial processes after teardown. The
[rootless dependency finding](/nodes/oats-operator-expert/lessons/rootless-messaging-needs-required-database-extensions.md)
records the obstacle that had to be solved to make this choice practical.

Those results support feasibility on the investigated Linux host, not
hosted parity, a host-installed scheduler, or universal containment. In
particular, local messaging does not make the authenticated model runtime
local or disposable. The source retained Claude's native configuration and
observed writes there. Keep those shared surfaces explicit under the
[trial runtime-state boundary](/nodes/oats-operator-expert/lessons/trial-runtime-redirection-excludes-host-service-proof.md).

This records a source-selected trial design, not human acceptance of a new
workspace-wide policy. No existing native-authentication decision is changed.

# Enforcement and evidence

A reusable trial launcher should verify its selected service endpoints and
owned data locations, and test process and service-state teardown, including
partial startup. Local storage is an opportunity for complete cleanup, not
proof that cleanup happened. Such checks belong in the launcher and its
regressions; this harvest supplies no implementation receipt.

Evidence: OKF proposal from oats-operator-expert/coord-trial-kit-expert, 2026-11-02; notes/hosted-aweb-for-scratch-rejected.md; notes/local-aweb-rootless.md; notes/scratch-deployment-isolation.md.

All run results are source-reported. The investigated client stack was OATS
0.69.8, aw 1.36.35, Claude Code 2.1.308 and oats.aweb 1.32.1 on Linux (Arch).
This harvest read the captured evidence only; it did not inspect the kit,
rerun its smoke test or test hosted account lifecycle.
