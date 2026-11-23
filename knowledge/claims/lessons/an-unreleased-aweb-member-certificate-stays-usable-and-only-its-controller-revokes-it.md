---
type: Lesson
title: An unreleased aweb member certificate stays usable, and only its controller can revoke a member of a team that is not hosted
description: When `aw workspace delete` does not release the alias, the workspace and member row are soft-deleted but the certificate stays active, and `/v1/connect` re-creates a member row from the key and certificate alone. A member can revoke itself only on a hosted team. A local member has no key rotation, and a copied key cannot be disabled alone. aw finds its identity only at `--identity-home`, `$AWEB_IDENTITY_HOME` or `<cwd>/.aw`, with no parent walk, so any key a retire leaves behind is the provider's to dispose of locally.
about: [workstream/provider-integration, workstream/messaging]
kind: lesson
id: ins-6d11c20a36b9
tags: [aweb, retire, certificate, revocation, identity, keys]
timestamp: 2026-11-23
---

# What was observed

Read from awebai/aweb's source at `aff5aac56dc2` (server under `server/src/aweb`, CLI under
`cli/go`). Nothing was run.

- **Not released.** The CLI answers `alias_released: false` for these reasons:
  `team_not_hosted`, `not_own_workspace`, `global_identity`, `no_workspace_credential`,
  `controller_key_missing` and `retired_revocation_pending`. In every one the certificate
  stays active.
  - The delete soft-deletes the workspace and the member row. Mail, chat and wake then
    refuse, because ordinary routes require a live row (`team_auth_deps.py` ~313-319).
  - `/v1/connect` checks only the certificate (`connect.py` ~758-767). Its conflict and
    alias checks skip deleted rows (~271-300), and it inserts a fresh row. So the kept key
    and certificate can act again.
- **Released** (`retired_and_revoked`, or the hosted cloud's self-remove): the certificate
  is revoked and every later request is refused. The hosted revocation runs in cloud code
  that is not in the repo.
- **Who revokes.** The registry's revoke route takes a request signed by the team
  controller key (`aw id team remove-member --cert-id`). A member revokes itself only on a
  hosted team, one whose domain is `aweb.ai` or a subdomain. No member-key-only revocation
  exists for any other team.
- **Copies and rotation.** `aw id rotate-key` refuses a local identity. Disabling a copied
  key (a retained seat's) means revoking the identity it copies.
- **Local verbs.**
  - No aw verb destroys local key material or marks it retired.
  - `aw reset` removes only `.aw/context` and `.aw/workspace.yaml`.
  - aw writes a local-retire receipt (`<identity home>/retirements/<id>.json`) and reads it
    only to resume that retire. aw does not refuse to sign while it exists.
- **Identity lookup** (`awconfig/identity_home.go` ~49-58): `--identity-home`, else
  `$AWEB_IDENTITY_HOME`, else `<cwd>/.aw`. aw does not climb to parent directories and
  has no user-global fallback: without one it answers "not initialized".
  - Two helpers do walk up, and neither reads an identity: the interaction log, and the gc
    mail address map.
  - Team controller keys are user-wide (`~/.awid/team-keys`), readable by every home of
    that user.
- Not traced: whether a deleted member's key can still send through the bare-`did:key`
  authentication that some mail and chat routes accept.

# Rules

- **Treat a retire whose alias was not released as leaving a live credential**, whatever
  the warning calls it. The only server-side lever is the controller's revoke. Until it
  runs, only local disposal makes the key unusable.
- **Removing `.aw` from a directory is safe against fallback.** aw will not pick up a
  parent deployment's identity in its place.
- Re-read these facts at the aw and aweb versions in use before building on them: they
  are source readings, not a published contract.

Relates to: [a hook reports only the cleanup it confirmed](/nodes/integrations-expert/lessons/a-hook-reports-only-the-cleanup-it-confirmed.md).
That lesson notes that membership removal is no proof a copied key is unusable; the source
reading above confirms it for the unreleased case. See also
[a global instance identity's address is released only by the authority that owns its lifecycle](/nodes/integrations-expert/lessons/a-global-instance-identity-leaves-a-permanent-address-behind.md).

Evidence: awebai/oats-aweb#318, planned by retire-kept-keys-lead, 2026-11-23, from a
source probe of awebai/aweb at `aff5aac56dc2`.
