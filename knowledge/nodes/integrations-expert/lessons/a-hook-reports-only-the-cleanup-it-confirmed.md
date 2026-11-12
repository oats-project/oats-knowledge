---
type: Lesson
title: A hook reports only the cleanup it confirmed, and keeps the credential a retry needs
description: Emit meta before failing and write a killable effect's intent to disk before it happens, report only confirmed cleanup, re-check uncertain effects, retain credentials for key-dependent retries, and pair credential exclusion from retirement recovery with fail-closed hooks.
about: [workstream/provider-integration]
kind: lesson
id: ins-c6200a56b377
tags: [lesson, integrations, hooks, compensation, retire, external-state, truthfulness]
timestamp: 2026-11-12
---

Learned 2026-09-24 in a live rehearsal: a recovery path reported "revoked"
for a revoke that had thrown, and the credential stayed active on the server
for eight minutes until a human revoked it. The same shape reappeared on
2026-09-25 in a provider's team-leave verb, which removed the local identity
home before the remote self-delete was confirmed.

# Rule

1. **Emit meta before failing.** A spawn hook that created anything external
   (an identity, a grant, a registration) puts its identifiers in meta even
   when it exits nonzero; the kernel feeds that meta to the retire hook as
   compensation.
2. **Claim only confirmed effects.** "Revoked" is said inside the branch where
   the revoke returned success; a failed revoke says "revoke failed: reason"
   and keeps the meta.
3. **An uncertain effect is re-checked, not guessed.** After a timeout or a
   "may have applied" error, query the external state and report what it
   says; treat a confirmed prior revocation as success.
4. **Compensation is idempotent from both ends.** The hook's own recovery and
   the kernel's later retire may both revoke; the second attempt must be
   harmless, and the hook must tolerate the server's "already done" answer.
5. **Remote first, local key last.** Removing an external membership or
   identity runs in this order: remote deletion confirmed, then the local
   credential removed, then the provider's record dropped. On failure keep
   both the credential and the record, and let the next retire or leave retry
   with the key still in hand. A retire hook must exit nonzero while cleanup
   still needs that key; a warning followed by exit zero does not preserve it.
   Report the memberships that remain. The narrow exception is a confirmed
   handoff that needs no member key, described below; it is not completed
   cleanup.

# Why

Compensation runs in the worst conditions: a partial success, a slow network,
a process the kernel is about to tear down. A message written for the happy
path ("revoked it") becomes a lie exactly when it matters, and a stranded
credential that the record says is gone is the hardest kind to find. Deleting
the local key first is the same lie in structural form: the remote record
survives with no key that can remove it. The kernel side of the same
principle is
[preserve authority until cleanup is proven](/nodes/oats-kernel-expert/decisions/preserve-authority-until-cleanup-is-proven.md).

# Recovery exclusion makes incomplete cleanup a gate

**Refinement, 2026-10-08.** A provider's recovery copy had accidentally been
its backup for failed cleanup. Excluding credentials from that copy removed
an exposure, but also exposed a second bug: a retire hook that warned about a
failed leave and exited zero now allowed the last retry key to be destroyed.
Credential exclusion and fail-closed cleanup therefore have to ship together.
Keeping secrets in recovery to conceal a broken failure path is not a fix.

- **Declare the credential-bearing home entries.** A provider that stores
  credentials or identity state at the top level of an instance home declares
  every such entry in `retirement.disposable.home`, rather than letting
  retirement recovery archive it indefinitely. Membership removal is not
  proof that a copied key is unusable; a retained seat may also hold a key for
  an identity that remains live. The declaration excludes recovery copies;
  it does not itself revoke anything at the service.
- **Floor on enforcement, not shape acceptance.** The provider's
  `compatibility.oats` floor must reach the first kernel that actually honors
  the home exclusion. A parser accepting the field while its recovery copier
  ignores it gives a false security promise. The kernel contract belongs in
  [capabilities.md](https://github.com/awebai/oats/blob/main/docs/capabilities.md),
  not in a second version table here.
- **Keep key-dependent failure fatal.** If any remaining cleanup needs the
  member's credential, a nonzero hook exit must keep the home available for
  retry. Do not rely on recovery to retain a credential declared disposable.
- **Recognize a key-independent handoff exactly.** A clean exit with cleanup
  still outstanding is permissible only when the external tool's contract
  establishes that the remaining action can be done without the member key,
  such as controller-side removal. Parse the documented refusal exactly;
  finding its name somewhere in diagnostic text is not classification. A
  path or HTTP prose can contain the same word. Unknown failures stay fatal,
  and a recognized handoff reports the remaining obligation, never claims
  that the controller already completed it.

# A killed hook emits nothing: write the intent ahead

**Refinement, 2026-11-12.** Rule 1 covers a hook that fails; a hook that is
killed (SIGKILL, a lost host) emits no meta at all. A provider's joined-team
join accepted an invite, so the membership existed at the service, and only
then recorded the team in its own state; a kill in between left a membership
that leave and retire, which work from that record, would never release.

- **Write the intent before the external effect,** atomically, in state the
  provider owns, and drop it in the same atomic write that records the
  result. What is on disk after a kill is then exactly what needs settling.
- **Recover by adopting, then releasing through the existing release path.**
  The next explicit action finishes the effect (adopts it); a release adopts
  first so the ordinary remote-first, key-last release runs unchanged. A
  second release path for half-finished effects is a second thing to get
  wrong.
- **Record the authority the effect used** (here, the root it minted from).
  Recovery can run in another context than the effect did: another verb, or
  retire under the home's captured settings, which may never have named a
  root the live settings supplied at join time. A review caught exactly that:
  recovery could not reach the service until the intent carried the root.
- **Confirm absence, never assume it:** no artefact written means drop the
  intent; a failed read keeps everything and fails closed, by rule 5; and a
  successful read without the effect proves absence only when the external
  tool's own in-flight marker is gone too. A marker written before its remote
  call means the remote may hold the effect: keep the key, and report the
  recovery. (aw's hosted accept writes `pending-hosted-accept` in the
  identity home before its server call and removes it only after it stores
  the certificate, so a kill in between leaves a team list without the team
  while the server may hold the membership; deleting the home then recreates
  the orphan.)
- **Never record what this effect did not create.** State that existed before
  it (an identity already in the directory) gets no intent, so recovery never
  removes a key that is someone else's.
- **A start only reports** the unfinished effect and names both fixes
  (finish, release); it does not finish an effect nobody asked it to.

Test it with a fake that kills its caller after the external effect (the
fake's command sends SIGKILL to its parent), and on the real binary with a
wrapper that does the same after the real command succeeds.

# Consequences

- Tests cover the failure branches of compensation: revoke fails, revoke
  times out then a status read says revoked, mint wrote files but printed no
  answer, remote leave fails and the identity home survives.
- The kernel's retire retry must be able to re-run a hook it owes; a home
  whose outstanding compensation still needs its credential is retained,
  not deleted.
- Eliminate the failure in the provider's declaration, hook and regression
  suite, rather than relying on this lesson as a manual cleanup checklist.
  Test recovery exclusion at the supported kernel floor, nonzero exits and
  credential retention for failed leaves, and exact refusal classification
  against misleading paths and prose. Use the
  [real-binary lifecycle gate](/nodes/integrations-expert/lessons/a-fake-cli-that-accepts-what-the-real-binary-refuses-hides-a-broken-hook.md),
  not only a fake that agrees with the classifier.
- A spawn-captured declaration is not retroactive. Qualification must
  distinguish new homes from homes spawned before the change; a provider
  release is not proof that existing recovery copies have been sanitized.

Evidence (write-ahead refinement): OKF proposal from integrations-expert/oats-aweb-followups-integrations-expert,
2026-11-12; notes/write-ahead-intent-for-a-killed-hook.md (awebai/oats-aweb#217,
[PR #224](https://github.com/awebai/oats-aweb/pull/224), open and unmerged when
proposed: its 20 fake-kill cases and its real-stack CI row at aw 1.36.33 and
1.36.58, run 43254548049, are the evidence; release is not established).
The in-flight-marker clause was amended at review, from PR #224's second read
at 0dea5a06 (a RETURN finding) and aw's source at aw-v1.36.58
(`cli/go/cmd/aw/id_team.go` in awebai/aweb, `writeHostedAcceptPendingMarker`
and `removeHostedAcceptPendingMarker`); neither the fake-kill cases nor the
real-stack row exercised that marker when reviewed.

Evidence: OKF proposal from integrations-expert/integrations-expert-aweb-disposable-keys,
2026-10-08; notes/retired-local-identity-keys-stay-usable.md (recovery-exclusion
refinement; the note's source-only investigation does not establish hosted
self-retirement or post-retirement authentication outcomes).
