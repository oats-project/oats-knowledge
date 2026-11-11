---
type: Lesson
title: A "CI green" claim is the count of failures being zero at the exact head, so the hand-over says the counts, never the word
description: A checks listing read as "8 pass" hid one failed shard of six, and both readers the PR was handed to had to be corrected; before saying green, the lead groups every result at the named head by state (pass, fail, pending, skipped), counts each, and writes the counts into the hand-over, because a pass count alone says nothing about failures and a pending check is not green.
about: [workstream/coordination]
kind: lesson
id: ins-22a39589cc42
tags: [hand-over, verification, ci, coordination, review]
timestamp: 2026-11-10
---
# A pass count is not a verdict

A checks listing shows the passes first and in bulk, and the eye stops at
the pass count. The source handed a PR to two readers as "CI green" after
reading "8 pass" in the checks output; one of six test shards had failed
(a release-notes file name with dots broke a naming test). Both readers
had started from a false premise and had to be corrected.

"Green" is a claim about the absence of failures, and a pass count is
evidence of presence: it says how many checks passed, not how many did
not. The two are easy to confuse because a listing that is all green
looks the same at a glance as one with a failure further down.

# Rule: count every state at the head you name

Before writing "green" in a hand-over, the lead:

- reads the checks at the exact head the hand-over names, not the branch:
  a later commit has its own results, and the
  [hand-off lesson](/nodes/oats-expert/lessons/send-a-hand-off-by-message-to-every-waiter-at-an-exact-head.md)
  already requires the head in the message;
- groups every result by state and counts each: `pass`, `fail`, `pending`
  (queued or running), `skipped` or cancelled. A sum that does not reach
  the number of checks the repository runs means a result is missing;
- writes the counts into the hand-over ("10 pass, 0 fail, 0 pending at
  `<sha>`"), never the word alone. A reader can check a count; "green" has
  to be taken on trust;
- treats a pending check as not green. "All finished checks pass" is a
  different claim and is said that way if it is the one being made.

The same counts belong in a verification report handed up to a maintainer:
the maintainer's
[verdict-binding rule](/nodes/oats-maintainer/stewardship/review-protocol.md#bind-every-verdict-to-content)
reads the check run's head against the PR head before merging, and a
hand-over that already names the head and the counts gives it something to
compare rather than a word to re-derive.

# How this relates to neighbouring lessons

[Check the affected-test inventory, not only the green runs](/nodes/oats-expert/lessons/check-affected-test-inventory-at-handback.md)
is about which tests should have run: a run list can be green and still
omit a consumer. This lesson is about reading the results of the runs that
did happen: a listing can be read as green while one of its entries is a
failure. The two checks are separate and both sit at the lead's hand-over.

Two more readings sit beside the counts. A pipeline that stops at its
first failure reports nothing for the stages after it, so one red result
can stand in front of others:
[a pin that removes something carries its repairs in one PR](/nodes/oats-expert/lessons/soul-text-lands-with-its-capability-pin.md#a-pin-that-removes-something-carries-its-repairs-in-one-pr-2026-11-11).
And a failure counted at the lead's head is not yet the branch's failure:
[a test that fails only on your branch may still not be yours](/nodes/oats-expert/lessons/a-test-that-fails-only-on-your-branch-may-still-not-be-yours.md).

# Elimination route

A hand-over template whose CI field asks for counts by state at a sha
rather than a free-text status would make the omission visible when the
field is filled. A forge query that prints the per-state tally for a head
is a one-liner on most forges and could be the field's recipe. Neither is
delivered by this lesson; until then this is the lead's manual step.

# Evidence and limits

Evidence: OKF proposal from oats-expert/oats-expert-coordination-rethink,
2026-11-10; notes/a-green-claim-counts-failures-not-passes.md.

One PR in one build on one deployment, source-reported: the "8 pass"
reading, the failed shard and its cause, the two readers and their
correction are the source's report; this harvest did not read the PR or
its checks. The states listed are the ones the source named plus the
obvious neighbour (cancelled); a forge may name more.
