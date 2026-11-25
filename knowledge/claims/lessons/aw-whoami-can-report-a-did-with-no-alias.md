---
type: Lesson
title: aw whoami can report a did with no alias, so a reader of it must not assume one
description: At aw 1.36.59 whoami leaves `alias` out when neither the team membership nor the identity's address names one, while the did still comes from the certificate or identity.yaml; the messaging:mail decision has oats.aweb's mail read report such an identity as identity-unreadable rather than answer an empty or made-up alias.
about: [system/aweb, system/oats-aweb, workstream/provider-integration]
kind: lesson
id: ins-b1463a63fa93
tags: [aw, whoami, alias, identity, mail, contract]
timestamp: 2026-11-25
---

# What was found

`aw whoami --json` prints `alias` with `omitempty`. At tag `aw-v1.36.59` (b9c0157) the alias comes
from the selection: the selected team membership's alias, trimmed, else the handle cut from
identity.yaml's address; a standalone identity with no address has no handle at all. The did (and the
stable id) are filled independently, from the team certificate or identity.yaml
(`cli/go/cmd/aw/introspect.go`, `cli/go/awconfig/selection.go`). So a home whose membership has no
alias and whose identity has no address answers `whoami` with a did and no `alias` key.

# The lesson

Anything that reads `whoami` to name an identity treats the alias as optional input, and decides
what an identity with no alias means instead of carrying an empty string forward. A contract answer
that promises a non-empty alias for a healthy identity (the `messaging:mail` rule of
oats-project/oats#2138: `alias` and `identity` may be `""` only where `error` is non-null) needs that
decision at the provider, or one aliasless identity makes a closed decoder refuse the whole answer.

For oats.aweb that decision is made: the same rule's second condition has its mail read report such an
identity as `identity-unreadable`, with `alias` and `identity` `""`, and read none of its mail; it
never invents an alias. The provider change (awebai/oats-aweb#335) also treats a blank alias, and a
whoami with no did or stable id, the same way. #335 was open and unmerged at review (2026-11-25), so
check that it has shipped before relying on a released oats.aweb behaving so.

Check this again when the tested aw moves, as
[a tested-aw bump](/claims/lessons/a-tested-aw-bump-rests-on-the-tag-to-tag-diff.md) reads the tag
diff: the source paths above are where it would change.

# Citations

1. Evidence: OKF proposal from oats-engineering-expert/mail-identity-shape-lead, 2026-11-25;
   notes/aw-whoami-alias-not-guaranteed.md.
2. Read at maintainer review, 2026-11-25: awebai/aweb at tag `aw-v1.36.59` (b9c0157),
   `cli/go/cmd/aw/introspect.go` (`introspectOutput.Alias` with `omitempty`, copied from the
   selection) and `cli/go/awconfig/selection.go` (the membership alias, the address-handle fallback,
   and the did and stable id from the certificate or identity.yaml).
3. The decision comment on [oats-project/oats#2138](https://github.com/oats-project/oats/issues/2138#issuecomment-7162099672)
   (the rule and its three conditions), read at maintainer review.
4. [awebai/oats-aweb#335](https://github.com/awebai/oats-aweb/pull/335) (the provider fix in
   `lib/mail-read.mjs` and its test), open at maintainer review.
