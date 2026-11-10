---
type: Lesson
title: Identity polling should not buy a server request for local facts
description: The health publisher chooses offline identity inspection because a per-minute whoami call adds a server request per identity for identifiers already held locally.
about: [system/oats-aweb]
kind: lesson
id: ins-ac0866d4cd18
tags: [oats.aweb, identity, polling, performance]
timestamp: 2026-10-15
---

The health-publisher investigation found that an apparently simple identity
lookup can carry an unrelated network dependency. The source reports that
`aw whoami` asks the server for inbound mode, while
`aw doctor identity --offline --json` supplies the locally held identifiers
without that request. For a per-minute publisher, choosing whoami would add
one server request per identity per tick without improving the identifier
evidence.

The reported read-only observation used aw 1.36.36 on 2026-10-14 against a
local identity home and a resident custody root. In that version, successful
`identity.local.did_key_format` and `identity.local.stable_id_expected` checks
carry the did:key and, for a global identity, did:aw in their details. This is
a bounded observation of the external CLI, not a permanent output schema or
proof that every kind of identity home has been qualified.

Use the offline path when the publisher needs only those identifiers.
Operations that actually need server-held state still need their own evidence;
this lesson does not replace interactive identity diagnostics generally.

The elimination route is the publisher's identity-reader adapter and tests
that establish both offline operation and absence handling. The source
reports a test for a directory without an identity; that alone does not prove
the no-network property. Preserve that property at the real CLI boundary
when changing the client version. See also the
[cost of per-home CLI polling](../decisions/readiness-cache-needs-measured-cost.md).

Evidence: OKF proposal from oats-aweb-expert/oats-aweb-expert-agent-health-publisher, 2026-10-15; notes/aw-identity-read-offline.md.

The observation and adapter test are source-reported; this harvest did not
replay them.
