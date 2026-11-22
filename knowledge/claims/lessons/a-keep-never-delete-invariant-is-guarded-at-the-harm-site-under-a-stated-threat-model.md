---
type: Lesson
title: A "keep, never delete" invariant is guarded at the harm site, under a threat model the first review round is given
description: When a change must never delete something another tool still holds, a check per code path keeps leaking under fresh review. Guard the one place the harm happens (the answer that lets the deletion proceed, and each delete site) with one inventory built from what is physically there, failing closed on any error. Give every reviewer, from round 1, the threat model naming which producers of state count. Where a producer can be removed (a setting that creates the state), remove it instead of covering it.
about: [workstream/coordination, workstream/provider-integration]
kind: lesson
id: ins-865aa1259daf
tags: [lesson, review-loop, safety-invariant, fail-closed, threat-model, coordination]
timestamp: 2026-11-22
---

# What was observed

In an oats.aweb provider PR, retire must never let the kernel remove an instance home while aw still held
a pending mint in it (aw's key and pending files). The PR was
[awebai/oats-aweb PR 308](https://github.com/awebai/oats-aweb/pull/308), human attribution, built to
oats-project/oats `docs/design/2026-11-21-human-ids-contract.md`.

- **Rounds 4 to 10 each found one more path to the same unsafe exit.** A malformed record, a branch that answered
  before the fence, a joined identity home reached only through records, a seat branch exiting early, a delete
  before any answer, a missed directory name, a symlink.
- **The first class closed after round 7.** All answers were routed through one exit check that rescans the home
  and turns any deleting answer into "kept" while aw's files are anywhere in it. Round 8 then added the same check
  at each delete site.
- **The second class closed after round 10.** The check stopped listing known identity-home names and built its
  inventory at exit time from what is in the home: every entry, symlinks resolved inside it, and every locator
  the records name. Later rounds widened that inventory (the directories the settings name, each entry's `.aw`)
  and, after three delta reads found a fail-open in its loop, made each entry one try whose error answers "held"
  unless the entry is positively gone.
- **The reviewers had no threat model until round 11.** Before it, a fresh reviewer could always hand-make a
  state (a case-variant JSON key, a duplicate key, a symlink), and the loop had no end. The threat model was
  stated as: states produced by the tools' own flows, a kill or crash, an IO error, or a documented operator act.
  Hand-made states count as minor. After it, findings each named their producer.
- **Removing a producer ended one branch of the loop, not all of it.** Rounds 17 to 20 found configured roots
  placed inside an instance home, which retire's spawn-captured settings can't see. At round 19 setup started
  refusing such a root before any aw call (`E_ROOT_INSIDE_INSTANCE_HOME`). Round 20 still found the same state
  made by an earlier provider release, which this change cannot refuse, so the scan had to cover it, by a fix that
  only adds held paths.

# How to apply

- **Pin the invariant in the spec's acceptance.** For any "keep, never delete what X still holds", write the
  invariant and the threat model there. Hand both, verbatim, to round 1's reviewer, and ask it to name the producer
  of every state a finding needs. This is the same move as writing
  [a text-pattern guard's contract before its first review](/claims/lessons/a-text-guards-contract-is-written-before-its-first-review.md):
  the reviewer checks a stated scope instead of discovering it.
- **Enforce at the harm site, not per branch.** That means the single writer of the answer that permits deletion,
  and every delete call. Use one shared inventory built from the filesystem as it is, failing closed on any error
  except a positive "absent".
- **A fix that only adds held paths can't open a settle path.** A delta read checks that claim; a fix that
  removes a held path, or changes the decision, gets a fresh whole-change round.
- **When a documented setting is what produces the unsafe state, prefer refusing it** (with an owned error code
  and a changelog line) over widening the scan without bound. A producer the change can't remove (an older
  release still deployed) is still covered by the scan.
- **This complements the accepted lessons; it doesn't replace them.** A
  [transition table](/claims/lessons/a-review-loop-that-keeps-finding-state-defects-converges-with-a-transition-table.md)
  converges a state machine; a [must-fix cut-off](/nodes/oats-okf-expert/lessons/a-hardening-review-loop-needs-a-cut-off.md)
  bounds edge-case hunting. This one is for safety invariants whose violation is irreversible.

# Evidence

Evidence: OKF proposal from oats-engineering-expert/human-ids-lead, 2026-11-22; notes/a-retention-safety-property-needs-one-exit-check-and-a-stated-threat-model.md.

Verified by maintainer review on 2026-11-22 against awebai/oats-aweb PR 308 (open, draft, held, not merged) at
`7296ac05`. Its commits labelled review rounds 4 to 10 each close one more path to the unsafe retire answer; round 7's
commit routes every answer through one exit check because "seven rounds each found a new path to the same unsafe
exit"; round 8 adds the check at every delete; round 10 builds the inventory from what is in the home. Later commits
add the settings-named roots (round 17), refuse a root inside an instance home (round 19), cover an earlier
provider's root by only adding held paths (round 20, a delta read), and make each entry's check one fail-closed try.
Each finding from round 15 on names its producer. The PR body records rounds 17 to 20 as fresh rounds under the
lead's threat model. Source-reported: the threat model's wording, that it was first given at round 11, and the
reviewers' hand-made states before it.
