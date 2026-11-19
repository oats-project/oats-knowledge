---
type: Decision
title: Retire refuses a home whose cleanup hooks cannot run, unless its record proves nothing is owed
description: `oats retire` refuses with E_UNIDENTIFIED_INSTANCE_HOME, before anything is stopped, run or removed, every home whose retire hooks cannot run, unless the home's own record positively proves no cleanup is owed. Missing information is never proof, plan and apply refuse alike, and `--force` stays the deliberate removal that names what it leaves behind.
about: [workstream/oats-direction, system/oats-kernel]
id: dec-6c6c9626646c
tags: [lifecycle, retire, refusal, hooks, identities, force, contract]
timestamp: 2026-11-19
---
# The decision

Juan's side proposed this rule in its second systemic review (§13.4), and
both maintainer sides agreed it. The source dates the agreement
2026-11-18. Pepe's side's yes came from its lane:product maintainer, with
five conditions. The source reports that it acted under a standing
delegation of contract decisions from Pepe. No record of that delegation
was read at review. The rule landed in oats#1953, with the Desktop wording
in oats#1949, both merged on 2026-11-19. The lane:product second read on
oats#1953 approves the merged head against the five conditions.

Retire already refused a home with no record and no cleanup descriptor,
because a spawn hook may have registered an identity that only a retire
hook releases. Two kinds of home escaped that rule and were removed with
only a warning: homes from a kernel that recorded no hook bindings
(`capabilityRuntime`), and captured homes from before 0.26 whose hooks can
no longer run. Removal deleted the local key and left the identity or
membership alive at the server, with nothing left that could release it.

# The rule

- A home whose retire hooks cannot run is refused unless **its record**
  proves that no cleanup is owed. For an ordinary home, the proof is an
  explicit set of hook bindings with no retire hook. For a captured home,
  it is explicit evidence that no spawn hook ran.
- **Missing or malformed information is never proof.** Nothing in today's
  deployment configuration can say what an old home registered.
- **Plan and apply refuse alike,** before any session, child or hook is
  touched. This includes Desktop Remove's plan. A plan that succeeds where
  the apply would refuse is a defect.
- **One code, one sentence per cause.** The refusal names the capabilities
  that may have left state, and the remedy: clean up with the provider's
  tooling, then `--force`.
- **`--force` keeps its warnings** about hooks that did not run and state
  that was not revoked. An unreadable record still refuses under force.

# How it relates to the refusal rule

[A refusal must protect something that is still there](/nodes/oats-maintainer/decisions/a-refusal-must-protect-something-still-there.md)
says only a live or unjudgeable process holds a block, and that a recorded
debt alone never blocks. This decision is the boundary of that rule, not
an instance of it. The rule assumes that the debt stays readable and
payable after the action. Retire removes the local credential, which is
the only means of releasing the external state, and it removes the home
that records the debt. So a refusal also holds when the refused action
would destroy the only means of paying a debt.

`oats host run`, the supervisor that stops homes, does not retire them,
so it does not meet this refusal. Whoever does retire meets it: a person
at the CLI, Desktop Remove, or a self-retire. A forced self-retire keeps
`--force` through its deferred completion.

# Rejected

- **Keep the warning-only removal for old homes.** It orphans identities
  silently, and the warning arrives after the key is gone.
- **Run today's hooks against an old home.** A home never changes under
  itself, and today's hooks may not match what its spawn did.
- **A new error code per cause.** Clients already read this code as
  "refused, nothing happened"; the cause belongs in the message.

# Supersedes

This replaces two exemptions from the 0.26 work: the old-home removal with
a warning, and the captured-home removal with a warning. oats#1953 traces
them to oats commits 2b6e97ce (#175) and bcf44b59 (#188). It reports that
both were lead decisions and that neither lane found a record of a human
accepting them. No concept in this base records them, so this supersedes
no accepted concept.

# Rule for review

When a removal path skips cleanup, ask what in the record proves that the
cleanup is not owed. "The record does not say" is a refusal, not a pass.
Check the plan path with the same fixture as the apply path.

# Evidence

Evidence: OKF proposal from oats-maintainer/product-maintainer-pepe,
2026-11-19; notes/retire-refuses-when-hooks-cannot-run.md. Pull requests
oats#1953 and oats#1949, merged 2026-11-19. Maintainer review of
oats-knowledge#396 read both PRs and the comments on oats#1953 (the
lane:juan approval and the lane:product second read). At oats#1953's merge
commit `785d152d`, it also read the release entry
`docs/release-notes/next/review2-retire-hook-admission.md`,
`docs/capabilities.md` (force does not override an unreadable record) and
`lib/retire-admission.mjs`. The 2026-11-18 date of the agreement and the
delegation are source-reported.
