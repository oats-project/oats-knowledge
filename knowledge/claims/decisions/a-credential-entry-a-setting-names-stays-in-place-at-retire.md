---
type: Decision
title: At retire, a credential entry that a setting names inside the home stays in place, neither removed nor held
description: A root, a resident's custody or a standing identity that a setting places inside an instance home is not that instance's key. The messaging provider's retire leaves it where it is and names it in the warning. When the settings can't be read it can't tell whose an entry is, so it removes nothing: held keys stay held and every other entry stays in place.
about: [workstream/provider-integration]
kind: decision
id: dec-966285ebd11b
tags: [retire, credentials, settings, root, custody, aweb]
timestamp: 2026-11-23
---

# Decision

Taken by the lead of awebai/oats-aweb#318, on the second reader's RETURN of #321. Built in #321, with
#323 adding the follow-ups.

- **The case.** Older deployments can configure `root`, `roots`, `residents` or `identity.source`
  to point inside an instance home. Retire's "remove on a clean exit 0, otherwise hold"
  ([a kept home holds no usable credential](/claims/decisions/a-kept-home-holds-no-usable-credential-retire-removes-on-success-and-holds-aside-on-failure.md)) would take that entry along with
  the instance's own keys.
- **The rule.** An entry a setting names, as written or through a link, compared in the
  on-disk case (`realpathSync.native`), stays in place on every exit and is named in the warning.
- **Rejected: holding it.** The second reader suggested this. A held root is just as broken as a
  removed one, because every later spawn, mint and custody read looks at the configured path.
  Leaving it in place is also what retire did under `--keep-dir` before.
- **Settings that don't parse.** The retire stops before it puts held keys back: what is held stays
  held, nothing else moves, and it exits nonzero.
- **A setting path that won't resolve.** The remote cleanup still runs. On every exit, exit 0
  included, the run holds again exactly what it restored. Every other entry stays in place, named as
  possibly still live. See [the lesson on holding when ownership can't be proven now](/claims/lessons/when-ownership-cant-be-proven-now-hold-rather-than-remove.md).

It narrows, and supersedes nothing in, [the kept-home decision](/claims/decisions/a-kept-home-holds-no-usable-credential-retire-removes-on-success-and-holds-aside-on-failure.md):
an entry a setting names is not one of the instance's own credential entries that decision removes or holds.

# Citations

1. awebai/oats-aweb#321: the second reader's RETURN (P2 suggests holding), the lead's answer deciding
   "left in place, not held", and the second reader's APPROVE ("holding it would break the root's path").
2. awebai/oats-aweb#323 (closes #322): `realpathSync.native`, the parse check before the restore, and
   the re-hold of what the run restored on every exit under an unresolvable setting path (spec v7.1).
