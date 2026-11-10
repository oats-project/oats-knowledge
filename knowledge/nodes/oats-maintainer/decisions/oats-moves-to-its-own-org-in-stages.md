---
type: Decision
title: OATS moves to its own GitHub org and npm scope by full transfer, in separate stages
description: Move OATS and its non-aweb packages to the oats-project GitHub org and npm scope by repository transfer, in stages: the bridge release ships first because it is inert until a declared string changes, the transfer needs no kernel release, the string flip waits for every kernel and schedule unit to be on the bridge, the npm rename comes last under a closed seven-repository contract with a frozen probe name; old names are held by staying empty, never by a placeholder.
about: [workstream/oats-direction]
id: dec-adccf4392c7e
tags: [organisation, repositories, npm, compatibility, migration, stewardship]
timestamp: 2026-11-04
---
# Decision and acceptance

On 2026-10-30 the directing human accepted, directly in the source
instance's session, that OATS and its non-aweb capabilities move from the
`awebai` GitHub organisation and npm scope to a new organisation and scope,
**`oats-project`**, by **full repository transfer**, **in stages**.

Seven repositories move: `oats`, `oats-okf`, `oats-engineering`,
`oats-cloning`, `oats-authoring`, `oats-omarchy` and `oats-knowledge`.
`oats-aweb`, `oats-apps` and `oats-machine` stay at `awebai` because they are
aweb-specific or by the human's call; `oats-jira` and `oats-linear` stay by
the human's call. The human also rejected the names `framework`, `oatshq`,
`oats-team` and `openoats`; do not re-propose them.

The acceptance is **source-reported**: the record is the session, which a
reviewer cannot read. Changing the destination, the set of moving
repositories or the transfer-not-copy choice supersedes a human-accepted
decision and needs that human's acceptance, cited.

# The stages, and why they are separate

A rehearsal with real GitHub transfers of throwaway repositories, on the
released kernel (0.69.6) and with pins on 0.47.0, 0.60.0 and 0.68.0,
established the fact that shapes the plan: **a transfer alone is invisible
to OATS**. With nothing edited after the transfer, adopter sync kept a
byte-identical lock, spawn worked, a fresh machine onboarded from an empty
cache, an official-style workspace whose member clones still named the old
remotes kept working, and anonymous https, ssh, partial fetch, raw and API
URLs, pushes, issues, PR create and merge, REST writes and every pin type
passed, including a version that exists only at the new owner. Moved-tag
detection still fired. That finding is bounded by what the rehearsal ran:
on the day, two consumers it had not exercised broke
([what the rehearsal missed](/nodes/oats-maintainer/lessons/a-transfer-rehearsal-must-check-what-the-forge-returns.md)).

Breakage comes only from **changing declared strings**, because the kernel
keys membership and clones on literal repository strings and the clients
identify the CLI by its npm name:

- Flipping a member's backlink or the deployment's workspace key fails
  `oats workspace status` with `backlink-elsewhere` and spawn with
  `E_SOUL_UNKNOWN`. Membership files live in each member repository, so
  the flip is not atomic across repositories.
- A clone whose remote still names the old key then fails
  `E_CLONE_MISMATCH` until the remote is changed; any one matching remote
  passes, which is a usable transition aid.
- A client refuses a CLI whose reported package name is not the one it
  expects ("not the oats CLI"), so a renamed kernel fails with every
  installed client until the clients know the new name.
- Pins survive the transfer: a catalog pin's source is its catalog id, so a
  new catalog URL changes nothing while commit and digest match, and a
  `git:` pin edited to the new owner simply re-resolves. A transfer keeps
  tags and commits, so neither path trips `E_PACKAGE_INTEGRITY`.

So the move is three kinds of change, and they do not travel together:

1. **Transfer** the repositories. This is the safe step and needs no kernel
   release; GitHub redirects carry every old URL in shipped catalog copies
   and locks.
2. **Change the declared strings** (membership backlinks, workspace keys,
   catalog URLs). This stage needs a **bridge release** that accepts both
   keys, because the flip is neither atomic nor backward compatible on its
   own.
3. **Rename the npm packages.** npm has no scope move; see the
   [republish-not-move trap](/nodes/oats-maintainer/stewardship/release-traps.md#a-package-rename-is-a-republish-not-a-move-2026-10-30)
   in the release judgement, which also holds the token deadline that
   bounds this stage.

The obvious plans get this backwards: they bundle a bridge with the
transfer, or treat the transfer as the risky step. A redirect smoke test
passes them and the string flip then breaks spawning.

## The sequence: the bridge ships before the transfer (2026-10-30)

On 2026-10-30, the same day as the acceptance above, the directing human
set the order of the stages, directly in the source instance's session
(source-reported; the record is the session; the source's approval comment
on oats#1679 also names "the sequence Pepe set on 2026-10-30"):

1. the **bridge release** ships once it is proven and the contract below is
   agreed;
2. every development-workspace host updates to it;
3. the **transfers**;
4. the **string flip**, the same day if every host is on the bridge;
5. the **new npm name**, later, starting with a real test publish from the
   moved repository;
6. the **old npm name ends last**.

**Why the bridge goes first, although the transfer does not need it.** The
first plan had the bridge ready but not shipped, reasoning correctly that
nothing in the transfer needs it. But the bridge is inert until a declared
string changes, so shipping it early costs nothing, and it meets the flip's
one gate (every host on the bridge) before the transfer rather than after.
Without the bridge, the rehearsal's matrix had 22 of 24 mixes of old and
new strings failing on the old CLI. Adopters with their own workspace see
only catalog and lock URLs, which redirects carry, so the wait is only the
project's own hosts, which are few and known.

**Rollback is not a requirement** (the directing human, same day):
transfers are forward only.

**Rejected: everything on one day.** The npm rename needs a two-name
release pipeline and a real publish from a moved repository, neither
proven, and the old name's ending depends on the rename. Bundling them
with the transfer would hold the safe step hostage to the unproven ones.

## The contract with the other maintaining side (2026-10-30)

The bridge's contract was decided by both maintaining sides on
[oats#1679](https://github.com/oats-project/oats/pull/1679): Juan's side
accepted it in
[a comment of 2026-10-30](https://github.com/oats-project/oats/pull/1679#issuecomment-6529441981)
(verified at that link, under Juan's account; it presents itself as
Juan's lane posting, so it proves the record, not who typed it), and the PR
merged as `3ceb1f2c`. Four points, all four needed for the acceptance to carry:

- a **closed table of the seven moved repositories**, kept for good, that
  makes `awebai/<name>` and `oats-project/<name>` one repository to the
  kernel;
- an **additive `package` field** in `oats version --json`, so a client can
  learn the kernel's npm name instead of assuming it;
- the **probe name frozen at `@awebai/oats`**: clients keep identifying the
  CLI by that name whatever package installed it;
- **one code base under two npm names, for now**: no kernel tells a host
  to uninstall the other name.

**Why the table is closed.** It is OATS's own provenance inside a neutral
kernel, acceptable only because it lists nothing but the project's own
repositories. So there is **no general "moved repositories" setting**, and
an eighth entry needs a contract answer from both sides like this one.

# Coherence rule: never recreate a transferred name at the old owner

GitHub keeps a transferred repository's redirect only until a repository or
fork is created at the old name; creating one permanently ends it. Old CLIs
carry the old URLs in their shipped catalog copies indefinitely, so a later
repository in `awebai` named like a transferred one would silently break
every old CLI. No repository is ever created at `awebai/<transferred name>`.

**Old names are held by staying empty, never by a placeholder
(2026-10-30).** The other side's acceptance of the contract was conditional
on the seven old names never being reused, and
[suggested a placeholder repository](https://github.com/oats-project/oats/pull/1679#issuecomment-6529441981)
that only says "moved" to hold each name. That would defeat the condition it
serves: any repository at the old name, a stub included, ends the redirect
for good, and with the closed table above the kernel would then treat an
unrelated repository as OATS's own. The placeholder was
[rejected on the PR](https://github.com/oats-project/oats/pull/1679#issuecomment-6529463091)
by the source instance (read at that link); that the other side withdrew it and told the old
organisation's owners is source-reported. The rule is therefore a
prohibition with no reservation mechanism: nothing is created at
`awebai/<transferred name>`, and the organisation's owners must know it.

# Rejected alternatives

- **Copy instead of transfer.** A copy loses Releases, issues, PRs and the
  redirects, and leaves every old CLI on a frozen repository.
- **Find-and-replace straight after the transfer.** This is the string
  stage without its bridge. Most occurrences of the old owner are history
  (issue references, release notes) and are not rewritten at all.
- **A v0.22-style clean break.** v0.22.0 moved `@oas-framework/oas` to
  `@awebai/oats` as a clean break with a migrate command that is gone, and
  never deprecated the old package. That is not a precedent here: it falls
  outside the bound of
  [pre-adoption contracts are removed, not translated](/nodes/oats-maintainer/decisions/clean-contract-precedent.md),
  which keeps reader compatibility for published commitments and real
  deployments.
- **A placeholder at each old name**, and **a general moved-repositories
  setting**: both rejected above, in the coherence rule and the contract.
- **Telling hosts to uninstall the old package** at the rename: clean for
  npm, not for OATS; see the
  [corrected rename trap](/nodes/oats-maintainer/stewardship/release-traps.md#a-package-rename-is-a-republish-not-a-move-2026-10-30).

# Open state (owner: oats-maintainer; whoever moves a stage updates this)

**As of 2026-11-04.** The bridge, the host updates and the transfers are
done: the bridge shipped in 0.69.7 (oats#1679; the merge commit is in the
`v0.69.7` tag and not in `v0.69.6`), and all seven repositories
were transferred on 2026-11-04, with the post-move checks passing on both
maintaining sides' hosts (source-reported). **Next is the string flip**,
tracked in [oats#1736](https://github.com/oats-project/oats/issues/1736),
one PR per repository with `oats` last, **gated on every kernel on every
deployment, schedule units included, being 0.69.7 or later**; that gate
counts kernels, not hosts
([the generalist's gate lesson](/nodes/oats-expert/lessons/a-contract-flip-gate-counts-kernels-not-hosts.md)).
One string moved ahead of the gate: the knowledge-store binding, because the
bridge does not compare it and the harvester's publication did
([what the rehearsal missed](/nodes/oats-maintainer/lessons/a-transfer-rehearsal-must-check-what-the-forge-returns.md)).

**The npm ending is open; the human has not decided it.** The candidate
is a package swap done by `oats update` itself, which the generalist
measured with real kernels and sessions
([what a kernel swap strands](/nodes/oats-expert/lessons/test-what-a-change-strands-through-a-real-start.md)):
it is viable only if it moves the pi bridges first (the 0.69.6 bridge
refuses a kernel under a new name), relinks each home's shim, reruns the
schedule install, and finishes without lazy imports; a running session
loses its waiting claims until it restarts. Measured, not built, and it
would replace a permanent forwarder rather than add to one. Until a decision,
both npm names serve one code base, per the contract.

**Unproven until the next release:** a real npm publish from a moved
repository, and the attestation form a new-owner release produces.

# Evidence and limits

Evidence: OKF proposal from oats-maintainer/haiku-oats-migration-maintainer,
2026-10-30; notes/repo-move-is-a-contract-change.md;
notes/transfer-rehearsal-result.md.

The rehearsal results, the npm test and the human's acceptance are
source-reported; this harvest did not repeat the transfers or read the
session. The second note corrects the first on the spawn failure code
(`E_SOUL_UNKNOWN`, not `E_MEMBERSHIP_UNCONFIRMED`); the corrected code is
recorded here.

Evidence for the sequence, the contract, the placeholder rejection and the
2026-11-04 state: OKF proposal from
oats-maintainer/haiku-oats-migration-maintainer, 2026-11-04;
notes/bridge-ships-before-the-transfer.md;
notes/old-names-are-held-by-staying-empty.md;
notes/uninstalling-the-old-kernel-is-clean-for-npm-only.md;
notes/transfer-rehearsal-result.md (later capture, with the Actions, secrets
and second-round results). The human's sequence decision and the rollback
remark are source-reported from the session. The contract acceptance and
the placeholder exchange were read at the linked comments; the merge commit
was read from the PR; that the transfers passed their checks is the
public tracking issue's and the source's statement, not a host read by this
harvest. Maintainer review confirmed the merge commit is in the `v0.69.7`
tag and not in `v0.69.6`, and that the placeholder rejection was posted by
the source instance itself. The swap measurement is the
generalist's, source-reported here and canonical in its lesson.
