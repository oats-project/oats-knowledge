---
type: Lesson
title: When a cleanup can't prove now whose a credential is, it holds the credential rather than removing it, even on success
description: An exit 0 doesn't prove a key is dead, and an earlier run's sorting doesn't prove ownership once the current settings can't be read. Holding takes the key out of reach and can be undone; removing can't.
about: [workstream/provider-integration]
kind: lesson
id: ins-076d03d1540d
tags: [retire, credentials, reversibility, exit-code, aweb]
timestamp: 2026-11-25
---

# Lesson

The case was a retire whose setting path couldn't be resolved, ending in exit 0 (awebai/oats-aweb#323).
Two wrong turns in a row:

1. **"Exit 0, so the key is dead; leave it in place."** That's false whenever an exit 0 leaves the
   certificate active: an alias the server didn't release, or a retained seat's copy of a standing key.
   Before resting on "exit 0 means the key is dead", list every exit-0 outcome of the hook.
2. **"An earlier run held it after reading its settings, so it's ours; remove it."** Settings can
   change between runs, and this run can't read them. The earlier sorting is evidence, not proof.

**The rule.** When a cleanup can't prove now whose a credential is, it picks the reversible act.
Holding puts the key where the client doesn't look, which is the goal, and a wrong hold can be
undone. A wrong removal destroys someone else's key. A later run with readable settings settles it.
The same reasoning applies to the person: a warning that names an entry left in place should tell
them to fix the setting and run the cleanup again, not to delete the entry by hand: the rerun, with
readable settings, is the act that judges whose the entry is. A manual fallback, for when the cleanup
can't be rerun, carries the same test the cleanup would apply. The retire's warning now says "fix the
setting, then retire again; where a retire can't be rerun, remove it yourself only if no setting names
it" (awebai/oats-aweb#330, closing #324, the second reader's follow-up on #323).

It extends [the kernel decision to preserve recovery authority until the outcome is proven](/nodes/oats-kernel-expert/decisions/preserve-authority-until-cleanup-is-proven.md)
to authority whose owner is uncertain. The first wrong turn repeats, for a new case, the exit-code lesson
in [the kept-home decision](/claims/decisions/a-kept-home-holds-no-usable-credential-retire-removes-on-success-and-holds-aside-on-failure.md).

# Citations

1. awebai/oats-aweb#323: the lane maintainer's green light at 8933f02 (the exit-0 leftovers are not
   dead keys; suggests removing or holding what the run restored), the hold-only change at deadac4
   ("settings can change between runs ... a hold can be undone"), and the second reader's APPROVE with
   its follow-up on the warning's wording.
2. awebai/oats-aweb#330 (closes #324): the warning's wording changed to "retire again", with the
   fallback; an existing test pins that a rerun with the setting fixed settles the entries.
