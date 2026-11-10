---
type: Decision
title: A declaration-versus-content check runs at sync and reuses the integrity family
description: A pin whose fetched manifest names another package id is refused by sync, the lock's only writer, under the existing E_PACKAGE_INTEGRITY family with a new why, rather than at spawn, under the manifest-malformed code or a new code; the compatibility claim was proved by enumerating the published tags.
about: [system/oats-kernel]
id: dec-f804310bc660
tags: [kernel, packages, sync, lock, integrity, error-codes, compatibility]
timestamp: 2026-11-09
---
# Rationale

Kernel decision of 2026-11-09, taken for the package-identity defect reported
in [oats-project/oats#1759](https://github.com/oats-project/oats/issues/1759)
item 1 [1]. The kernel never compared a fetched `oats-package.json` `package`
field with the `packages:` key that pinned it, so a release whose manifest
named a renamed id could be locked under the old id, and its souls composed
under that wrong id. **A package is locked under its own id:** `oats sync`
refuses a pin whose manifest names another package id, before writing the
lock, on both the fresh and the already-locked path (so a lock an older kernel
wrote is refused at the next sync), and the refusal names the exact
`packages:` line to write instead.

The decision is worth more than its code because the next kernel check that
compares a declaration (a pin, a lock entry) with what was fetched faces the
same three questions, and the answers below should not be re-derived.

**Where: sync, not spawn.** Sync is the lock's only writer, so it is the
gate: refuse before the lock is written, while the declaration and the fetched
bytes are both still live
([a refusal that needs the old bytes is a pre-commit gate](../lessons/refusal-belongs-before-commit.md)).
Spawn reads the lock and never re-resolves packages. A spawn-time check was
rejected because, at upgrade, it would turn an existing deployment's spawns
into refusals for a state that the next sync now catches; the lock-writing
step is where the operator is already acting on the declaration. The spawn
path claim rests on the developer's reading of the kernel (package resolution
is reached only through the sync operation that `sync`, `sync --plan` and
onboarding share), not on a deployment run.

**Which code: the existing `E_PACKAGE_INTEGRITY`, with a new `why`
(`"package-id"`).** That code is the family of "what the declaration or lock
says does not match what the package is", already discriminated by `why`
(for example `branch`, `capabilities`, `souls`) in the published contract [3];
[integrity is reproducibility, not approval](trust-approval-and-consent-boundaries.md)
records the family's meaning. Two alternatives were rejected:

- `E_PACKAGE_MANIFEST`, because it means the manifest itself is malformed,
  and here the manifest is valid: it merely describes a different package.
- A new error code, because a new code is a new contract that needs a lane
  decision, and no consumer must tell this case apart from the rest of the
  family.

The general rule: extend a family with a discriminator when the new case has
the family's meaning and no consumer needs a separate code; reach for a new
code only when a consumer must act differently on it.

**Whom it breaks: enumerate before tightening.** This applies
[compatibility follows supported adoption](evidence-bounded-compatibility-and-migration.md)
("enumerate the actual published artifacts"; "a check before an upgrade must
run on the version being left") and
[catalog resolution is authoritative](contained-capability-lifetime.md):
before the refusal shipped, every tag of every official catalog package was
checked to name its own id, so no official pin is refused. The source reports
that on 2026-11-09 all 201 tags across the 10 official catalog packages
passed (23 `oats-engineering` tags, 54 `oats-framework` tags, 124 across the
other eight) [2]. Only a `git:` pin can be affected, and the release note
gives the check to run on the version being left. The enumeration is the
compatibility claim's evidence; a check over published artifacts that cannot
show such an enumeration has not earned its tightening.

# Limits

- The implementation ([oats-project/oats#1763](https://github.com/oats-project/oats/pull/1763))
  was open at `d8f5f29fd`, with CI green and handed to the product lane, when
  this was harvested on 2026-11-09: not merged, released or deployed [1]. The
  release lane's choice to keep the change with this effort is
  source-reported. The decision's rationale stands either way; whether the
  shipped behaviour matches it is for the repository and its release notes.
- The tag enumeration is a dated source-reported run, not reproduced here,
  and it says nothing about `git:` pins or about tags published after it.
- No human-accepted decision is superseded. The integrity decision's
  statement that drift is `E_PACKAGE_INTEGRITY` is extended by one `why`,
  not changed.

# Related

[Integrity, origin and consent are different proofs](trust-approval-and-consent-boundaries.md);
[A refusal that needs the old bytes is a pre-commit gate](../lessons/refusal-belongs-before-commit.md);
[Compatibility follows supported adoption, not every intermediate format](evidence-bounded-compatibility-and-migration.md);
[Capability resources must outlive package staging](contained-capability-lifetime.md).

# Current contracts

- [Current packages.md](https://github.com/oats-project/oats/blob/main/docs/packages.md)

# Citations

1. [oats-project/oats#1759](https://github.com/oats-project/oats/issues/1759)
   item 1 (the defect and the request to refuse at sync, naming the
   manifest's id) and [oats-project/oats#1763](https://github.com/oats-project/oats/pull/1763)
   (the implementation), both read at harvest on 2026-11-09: the issue was
   open and the PR open at head `d8f5f29fd7e86840d1d3449d2a4d28eeddf25754`,
   labelled for the product lane. The harvest did not audit the PR's code or
   tests.
2. The 2026-11-09 enumeration of official catalog tags is reported by the
   source's proposal and note; it was not rerun at harvest.
3. The `why` discriminators `branch`, `capabilities` and `souls` on
   `E_PACKAGE_INTEGRITY` were read in `docs/packages.md` on
   oats-project/oats `main` at harvest; `package-id` was not yet there.

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-package-id-truth, 2026-11-09; notes/manifest-id-check-reuses-integrity-code.md.
