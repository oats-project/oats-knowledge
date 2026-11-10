---
type: Decision
title: A harvest is published only when the forge reads back an open PR at the exact head; an unlabelled PR is its own status
description: After the push, knowledge publication is proven by reading the PR back from the forge (open, at the exact screened head, on its own branch, against the accepted base, on the canonical repository, not cross-repository), never by the returned URL's text; only idempotent forge calls are retried, the label is applied after the create, an open PR that could not be labelled gets its own status, and the fix is called fixed only after one live labelled harvest.
about: [workstream/oats-direction, workstream/knowledge]
id: dec-279ee8a255af
tags: [knowledge, publication, read-back, review, release, okf]
timestamp: 2026-11-06
---
# Decision and acceptance evidence

The source reports that both directing humans' sides decided this on
2026-11-06, on a design by the knowledge package's lead for the package
issues that followed the repository move, one side adding conditions that
the terms below include. **Not built at the time of the proposal.** The
acceptance is source-reported from the lane records the proposal names;
this harvest read neither them nor a package change.

Three harvests had failed after a successful push and were reported as
failures, though two had in fact published:

- a label upsert returned a server error before the PR was created;
- the forge CLI creates a PR and applies its label in two calls, and the
  second failed;
- the knowledge repository had moved owners, so the forge answered with the
  canonical URL and a literal prefix check against the old binding refused
  it. The move incident and its read-source rule are canonical in the
  generalist's
  [read-source inventory lesson](/nodes/oats-expert/lessons/a-moves-inventory-follows-what-each-consumer-reads.md)
  and the maintainer's
  [rehearsal lesson](/nodes/oats-maintainer/lessons/a-transfer-rehearsal-must-check-what-the-forge-returns.md).

Each harvester stayed up as instructed, and nobody had a rule for what to
do with it. The decision:

- **The proof of publication is the forge's read-back, not the URL.** The PR
  is looked up with an explicit open-state query by head branch. It must be
  open, at the exact screened head, on its own branch, against the accepted
  base, not cross-repository, and its URL must be on the canonical name the
  forge gives for the bound repository. More than one open PR is uncertain.
  Only a closed PR means not created.
- **Retries only for idempotent forge calls**: the label upsert, the
  read-backs and the label edit. The push and the PR create are never
  retried.
- **The label goes on after the create, as a separate call.** An open PR
  that could not be labelled is reported with its own status
  (created-unlabelled), not as created with a side field. Anything that
  checks only the status would otherwise read it as done while the review
  trigger never sees the PR. The hand-back goes to the spawner, and the
  harvest is not done until the label is on.
- **Branch pushed, no PR**: an operator runs a separate open-PR command. It
  never pushes, and it refuses unless the remote branch is the exact
  screened head.
- **A stale binding** is reported as a fixed constant naming a redirect,
  with a fixed remedy in the hand-back: update the host binding.
- **Release rule.** The fix is called fixed only after one live harvest on
  the released version has published a labelled PR. A fake forge CLI proves
  the logic, not the forge's behaviour.

Status values, command names and query shapes at each version are the
package's facts, kept in its code and in the knowledge package expert's
node, not here.

# Why

This applies the maintainer's rule that
[an outcome is reported only from a read-back of the target](/nodes/oats-maintainer/lessons/verify-the-remote-ref-after-every-scripted-push.md)
to the knowledge gate itself, and the integrations lesson that
[an acknowledgement must name the stage its receipt proves](/nodes/integrations-expert/lessons/acknowledgement-stage-must-match-receipt.md):
pushed, created and labelled are different claims, and a status that
collapses them misdirects whoever must act next.

# Rejected alternatives

- **Trusting any URL the forge returns.** A redirect would then be trusted
  blindly; the read-back checks identity and head, not a string.
- **A resumable create.** "The push is never retried" would stop being plain
  to see.
- **A missing-label side field beside a created status.** Callers that check
  only the status would miss it.
- **Depending on whichever PR a view-by-branch happens to pick.** More than
  one open PR is uncertainty, not a choice.

# Rule for review

When a refusal comes after an irreversible effect, check that the code
re-reads the effect and reports which stage was reached. Guessing from
returned text is wrong, and so is reporting the whole operation as failed.
Any partial success that changes who must act next gets its own status
value.

# Evidence

Evidence: OKF proposal from oats-maintainer/setup-maintainer-pepe,
2026-11-06; notes/publication-is-proven-by-the-forge-readback.md.

# Citations

1. Source-reported decision of 2026-11-06 (design 8336f85f, acceptance
   da8ce2a7 in the proposal's words) for
   [oats-okf#123](https://github.com/oats-project/oats-okf/issues/123),
   [oats-okf#124](https://github.com/oats-project/oats-okf/issues/124); the
   proposal names
   [oats-knowledge#314](https://github.com/oats-project/oats-knowledge/pull/314)
   alongside them. Not independently verified; the design was reported as
   not yet built.
