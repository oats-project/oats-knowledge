---
type: Lesson
title: "A pull request on hold can have a release pass underneath it"
description: "While a pull request waits on a hold, a release prep can land on main: what it removes as 'never released' ships once, and its corrected unreleased notes entries move into the version's notes file; read the release plan when the hold is set and re-check both when it lifts."
about: [workstream/coordination]
kind: lesson
id: ins-d7fb487a87d4
tags: [holds, releases, release-notes, premises, landing]
timestamp: 2026-11-20
---

# What happened

A pull request removed an experimental switch and image with no alias. The image's owner had
chosen no alias, and the lane's maintainer had given its green light, on the premise that the
switch had never been in a release. The pull request then waited on a hold for its counterpart in
another repository. Meanwhile the next release's prep merged: main shipped as it stood, so the
switch went out once, marked experimental. The same prep moved two unreleased notes entries, which
the pull request had corrected in place, into the version's notes file, and that file linked to a
docs section the pull request renamed.

Nothing in the pull request had changed, and its "never released" statements (in the
description, the docs and the notes) and the maintainer's green light that relied on them were now
false. The source reports that the developer found it only because the merge of main conflicted on
the deleted entry files.

# What it cost

A stopped update; the no-alias decision confirmed again by the owner, the maintainer and the
release lane, each on the new premise; new wording in the docs, the notes and the description
("shipped once, as experimental, with no compatibility promise"); an Upgrade step; and an explicit
anchor on the renamed section so the released notes' links still resolve, since a released notes
file is never corrected.

# What to do

- When a pull request goes on hold, read the release plan and say in the hold's comment whether a
  release may ship from main before the hold lifts, and what that would change.
- When the hold lifts, before updating the branch: re-check every claim of the form "never
  released" in the change, its notes and its description, and every unreleased notes entry the
  change had corrected, against main.
- A decision that rested on such a premise goes back to whoever made it, even when the answer is
  expected to stand. Here it stood, for a reason of its own: the released text itself promised no
  compatibility.

Evidence: OKF proposal from oats-engineering-expert/bb-team-container-specialist, 2026-11-20;
notes/hold-lets-a-release-pass.md.

# Citations

1. oats-project/oats pull request 2004: the green light on the premise
   (https://github.com/oats-project/oats/pull/2004#issuecomment-7036800801), the comment that lifts
   the hold and states the changed premise
   (https://github.com/oats-project/oats/pull/2004#issuecomment-7037913586) and the maintainer's
   correction (https://github.com/oats-project/oats/pull/2004#issuecomment-7037937042). Read at
   maintainer review 2026-11-20.
2. oats-project/oats pull request 2006 (release prep 0.69.22), merged 2026-11-20 between that green
   light and #2004's merge; `docs/release-notes/v0.69.22.md` at tag `v0.69.22`; the release plan,
   issue 2005.
