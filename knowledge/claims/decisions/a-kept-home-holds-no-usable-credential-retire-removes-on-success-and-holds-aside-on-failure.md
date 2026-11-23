---
type: Decision
title: A home the kernel keeps holds no usable credential. Retire removes credentials on a success that did its cleanup, and holds them aside on failure
description: Because a session can be revived in a kept home outside OATS (bb's Unarchive), key protection lives in the home's contents, not in the kernel's start path. The messaging provider's retire removes its credential entries on an exit 0 that did, or proved it owed no, remote cleanup. It renames them under its own state directory on any other answer, and puts them back at the start of every retire run. A kernel revive refusal was rejected.
about: [workstream/provider-integration, system/oats-kernel]
kind: decision
id: dec-3310811e1712
tags: [retire, keep-dir, quarantine, credentials, bb, revive, provider, aweb]
timestamp: 2026-11-23
---

# Decision

Taken by the effort's lead for awebai/oats-aweb#318. Its lane:setup maintainer accepted the
shape before the build. Built in awebai/oats-aweb#321.

- **The case.** A home the kernel keeps after `oats retire` can be started again with no
  OATS around it: `--keep-dir`, a quarantined home, or a failed retire. On bb, a person
  unarchives the home's archived thread and a message restarts it, with the home's launch
  env (`AWEB_IDENTITY_HOME`) in place.
- **What OATS already refuses.** `oats session start` refuses a quarantined or retire-owed
  home with `E_INSTANCE_RETIRING`. A successful `--keep-dir` retire leaves no marker, so
  OATS can start that home again.
- **The rule, in the provider's retire hook, applied to every answer:**
  1. Remote acts first.
  2. Then the records a keyless rerun needs: controller handoffs, and leaves already made.
  3. Then the credential entries. **Removed** on an exit 0 that followed the remote
     cleanup, or proved none was owed. **Held**, renamed as themselves under the
     provider's own state directory (`.oats-aweb/held/`), on any other answer. That covers
     every nonzero exit, and an exit 0 from a gate that skipped owed cleanup.
  4. Every retire run restores held entries first, all or none. When an entry and its
     held copy both exist, it fails closed and calls nothing remote.
- **The stated limit.** This is no boundary against a process of the same OS user that
  goes looking: the controller keys are user-wide anyway. It stops a revived session from
  acting as the agent through the tool's normal identity lookup.

# Why

- An exit 0 means, by the provider rule, that no remaining cleanup needs the member key.
  The key is then useful only to whoever revives the home.
- On failure the key is the retry's only authority, so it is kept, but off the paths the
  tool reads.
- The general rule: **whatever can revive a home outside the platform decides where key
  protection must live: in the home's contents, not in the platform's start path.**
- A recovery-copy exclusion (`retirement.disposable.home`) is not disposal from a kept home.

# Rejected

- **The kernel refuses to revive a home whose retire is recorded.** Bb's Unarchive never
  goes through OATS. It would also be a lane:product contract question.
- **A `--keep-dir` signal from the kernel to the provider.** A contract change, and
  unneeded once every exit 0 disposes.
- **Server-side revocation instead.** A non-hosted member has no member-key revoke, and a
  retained seat's copy cannot be disabled alone.
- **Deleting on failure.** It destroys the retry's authority.
- **Holding outside the home.** No gain against a same-user process, and it splits the
  state a retry must reconcile.
- **Holding a grant seat's grant homes on failure.** Its retry revokes through the
  resident's custody and never reads them, so they are removed on every exit, as before.

# Lesson from the build: an exit code is not proof the cleanup ran

The first rule removed credentials on every exit 0. An older gate (the CLI missing from
PATH) answers exit 0 with a warning and does no remote work, so removing the key there
made a home that a rerun could clean unrecoverable.

Before tying an irreversible local act to an exit code, **list every path that produces
the code and classify it**: did the owed work run, or was none owed? Paths that skipped it
get the reversible act. The rule "a retire hook exits nonzero while cleanup needs the key"
binds new code. Existing gates may predate it; such a gate is a follow-up of its own
(awebai/oats-aweb#319).

Relates to:
- [a credential entry a setting names stays in place at retire](/claims/decisions/a-credential-entry-a-setting-names-stays-in-place-at-retire.md):
  narrows which entries are the instance's own, and keeps held entries held when settings don't parse
  (awebai/oats-aweb#321, #323).
- [a hook reports only the cleanup it confirmed](/nodes/integrations-expert/lessons/a-hook-reports-only-the-cleanup-it-confirmed.md):
  it refines that lesson's credential-declaration rule.
- [preserve recovery authority until the outcome is proven](/nodes/oats-kernel-expert/decisions/preserve-authority-until-cleanup-is-proven.md):
  holding rather than deleting on failure applies it.
- [an unreleased aweb member certificate stays usable](/claims/lessons/an-unreleased-aweb-member-certificate-stays-usable-and-only-its-controller-revokes-it.md):
  the facts this rests on.

Evidence: awebai/oats-aweb#318 and #321 (open when proposed), with spec v5 of the effort.
Review round 4 of the developer's loop found the exit-0 gate.
