---
type: Reference
title: How oats.aweb attaches a grant home to the resident's custody service (1.16.1)
description: The spawn hook's attachment contract, introduced in oats.aweb 1.13.1 and current in 1.16.1: the concrete socket from the custody preflight goes to the mint, the grant record is read back from disk, attachment is proven by the custody status command run as the grant home (never by whoami), a failed proof revokes and removes the fresh grant, renewal keeps the old grant until the new one is proven, and readiness inspects the newest grant home.
about: [system/oats-aweb]
id: ref-deac1bd686b4
tags: [oats.aweb, grants, custody, spawn-hook, readiness, renewal]
timestamp: 2026-09-25
---

Facts of the package from release 1.13.1, verified against the 1.16.1 mirror.
In 1.16.1 the client floor is one exported constant, `AW_MIN` = aw 1.36.13 in
the binding-wire module, read by the runtime gate, the readiness diagnostic
and the wake-daemon check; it replaced the separate custody-attachment floor
of earlier releases (`CUSTODY_ATTACH_MIN`, aw 1.36.3 at 1.13.1). The layer contract this
implements is
[what a messaging provider must do to serve a resident through grants](/nodes/integrations-expert/references/what-a-messaging-provider-must-do-to-serve-a-resident-through-grants.md);
why the attachment exists at all is
[a grant is proven per path at the receiver](/nodes/integrations-expert/lessons/a-grant-home-needs-a-custody-reference-for-encrypted-receive.md).

# Schema

1. **Concrete socket, never `auto`.** The custody preflight (`aw custody
   status --json` in the resident's custody home) reports `socket_path`; the
   mint receives that absolute path as `--custody-socket`. If the preflight
   reports no socket path the spawn fails closed before anything is minted.
2. **Read the native record back.** After the mint reports success the hook
   reads `grant.yaml` from the new grant home and requires
   `custody.socket_path` to equal the preflight's socket. Command JSON alone
   is not proof when correctness depends on a file the native tool wrote.
3. **Attachment proof is the status command as the grant home.**
   `aw custody status --json` run with `AWEB_IDENTITY_HOME=<grant home>` must
   report the service running on the same socket, the resident's alias and
   the team ready. `aw whoami` succeeding through the grant proves the grant,
   not the attachment.
4. **The alias to compare comes from the grant record.** `subject.alias` in
   `grant.yaml`; then the mint's output; only then the configured resident
   key, when both omit an alias.
5. **A failed proof fails the spawn closed.** The hook revokes the fresh
   grant, removes the grant home and fails; a partly usable messaging
   identity is worse than none. The retire meta reports only what was
   confirmed.
6. **Renewal keeps the old grant.** At launch, a renewal that fails its
   preflight, mint or attachment proof leaves the previous grant and its
   environment in place; the launch environment switches only after the new
   grant is fully proven.
7. **Readiness looks at the newest grant home.** Renewed grants live in
   `.aweb-identity-<n>` siblings; the readiness check inspects the newest, not
   only the original `.aweb-identity` directory, and reports a home without
   the locator as a `custody` problem ("retire and respawn on aw >= 1.36.13").

# Examples

The 1.13.1 hosted rehearsal: preflight socket passed to the mint, the grant
record carried the custody block, the status command through the grant home
reported attached, and the receiver verified the grant's custody-signed mail.
