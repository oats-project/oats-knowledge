---
type: Lesson
title: How the OATS project ships and reviews
description: Maintainer review binds verdicts to content and issue-recorded contract decisions, carries them only across an unchanged delta, preserves same-area integration evidence, requires timely and safely obtained verification, uses fresh readers and one second reader per PR, checks hand-written release claims, and judges tests against requirements rather than implementations.
tags: [stewardship, review, pull-requests, process]
timestamp: 2026-11-09
---
**Owner: oats-maintainer (the PR gate). Update-on-change: whoever changes the
review skill, the repository gate or the delivery flow revises this concept in
the same change.** The review procedure itself is the `pr-review` skill; this
concept holds the judgement behind it.

# The flow (decided with the founder 2026-07-21)

Contributed work — from helper instances, package maintainers or outside
contributors — reaches `main` **only through pull requests**. The maintainer
commits its own stewardship directly, because the gate exists to review
contributed work, not to slow stewardship; framework behaviour changes still
go to the human first. Only a maintainer that **owns `main`** pushes
directly; a checkout-mode maintainer whose local `main` is never pushed
delivers by pull request. The knowledge base is the one stewardship surface
that moved to PR-only learning
([external knowledge custody](/nodes/oats-maintainer/decisions/external-knowledge-custody.md));
a later decision extending PR-only elsewhere must name this paragraph as
superseded. Enforcement is discipline plus the gate, not git hooks.

Before trusting repository-resident state, establish the tree's position
against the remote — a shared checkout serves a coherent, possibly stale
picture ([a shared checkout serves a stale soul](/nodes/oats-operator-expert/lessons/shared-checkout-serves-a-stale-soul.md)).

# Four gates, direction first

Maintainer review has **four gates**, in order: product direction against
recorded decisions; correctness (the gate re-run, never the author's report of
it); security through the trust-boundary lens (injection, secrets, path
containment on user-named lookups, supply chain, authorisation);
mergeability. Direction is checked first because it is cheapest and because a
green, secure, mergeable PR in the wrong direction is still returned. When the
human redirects a slice, the amendment is recorded in the design record
**before** the review, so the direction gate reviews against what was asked,
not against a frame the human has since changed.

For instructions about when agents coordinate or retire children, apply the
[capability-owned coordination policy boundary](/nodes/oats-maintainer/stewardship/coordination-policy-lives-in-capabilities.md):
neutral mechanism documentation does not make core the owner of team policy.

Two further direction checks are the
[whole-design comparison](/nodes/oats-maintainer/lessons/judge-a-chain-of-fixes-as-a-whole.md)
when successive fixes accumulate complexity, and the
[healthy-default warning rule](/nodes/oats-maintainer/lessons/healthy-defaults-do-not-warn-about-optional-features.md)
when readiness starts treating an unused optional feature as a fault. At the
messaging/tasks seam, apply the
[independent-composition decision](/nodes/oats-maintainer/decisions/messaging-and-task-coordination-are-separate-choices.md):
choosing messaging does not select task teaching or task-only prerequisites.

## A shape check must protect the value that reaches the reader (2026-11-03)

When reviewing a sender-supplied value, trace what the validator checks and
what downstream code actually receives. Parsing a normalized copy and then
returning the unchecked original breaks that connection. A general URL
parser can remove ASCII tabs and newlines and accept paths that the service
contract forbids; parse success is not a plain-service-URL shape check.

The source reports approving an invite setup change before a second reader
found this mismatch. The invite's raw service value could reach recorded
configuration, a JSON result, mismatch text and a resume command printed on
the failure path. Checking only the successful operation would miss that
last output route. These are potential agent-input surfaces, not proof that
an agent followed injected text or that an exploit occurred.

Prefer one contract-specific helper whose callers consume only its checked
result. Either validate the raw string against the allowed shape or return
a normalized value that also satisfies that shape; normalization alone does
not reject an otherwise forbidden path. Reuse an existing helper for the
same contract rather than invent a second URL rule. Add hostile-input
regressions for embedded/trailing controls and extra paths on success and
failure paths, asserting both refusal before effects and absence of the raw
value from output. This is the elimination route; residual source-to-sink
judgment belongs in `pr-review`, not a permanent manual substitute for tests.

The [reference-display decision](/nodes/oats-maintainer/decisions/reference-display-is-rebuilt-or-withheld.md)
already owns construction versus redaction. This finding adds the
checked-value/returned-value mismatch, not a second display grammar or a
claim that one regex makes all agent-readable text safe.

Evidence: OKF proposal from oats-maintainer/setup-maintainer-pepe,
2026-11-03; notes/validate-the-value-you-return.md. The public
[second-reader return](https://github.com/awebai/oats-aweb/pull/194#issuecomment-6610660459)
at `ad97521` and [delta approval](https://github.com/awebai/oats-aweb/pull/194#issuecomment-6611082683)
at `2b3321f5` were read and corroborate the review miss and reported shared-helper
fix. This harvest did not execute the implementation or tests; merge is not
release or live-service verification. The exact grammar stays in the package.

## Raw host identifiers are disclosures even when they do not look like secrets (2026-11-03)

Trace identifiers read from the host to their audiences during the security
read. Machine IDs, hardware UUIDs, MAC addresses and serials must not land
raw, including raw prefixes, in names, messages or files other people see.
A credential-oriented scan can miss them because they do not look like
passwords. For an application-specific name, require a suitable keyed
identifier derivation or a random identifier retained locally, rather than
publishing host-identifier characters.

The source reports approving an onboarding change whose team-visible names
contained raw machine-ID prefixes. The public
[initial approval](https://github.com/awebai/oats/pull/1705#issuecomment-6601362324)
and [second-reader return](https://github.com/awebai/oats/pull/1705#issuecomment-6601392031)
were read and corroborate the review miss at `8b049542`. The return identifies
the root alias and setup expert's name as the disclosure surfaces. This is
one review failure, not a measured failure rate or an independent audit of
the later fix. The cited
[machine-id(5)](https://www.freedesktop.org/software/systemd/man/latest/machine-id.html)
guidance treats the machine ID as confidential and calls for an
application-specific cryptographically keyed derivation instead of exposing
it or any portion directly; no shell recipe or unlinkability guarantee is
certified here.

Prefer an identifier-generation boundary that never exports the raw input,
with synthetic-host-ID regression cases checking every outward naming and
reporting surface. Source-to-sink checks can help flag direct use; residual
judgment belongs in the existing `pr-review` security gate. No test, skill or
cryptographic implementation changes here. This does not reverse the
[explicit execution-selector decision](/nodes/oats-maintainer/decisions/host-bound-automation-is-declared-in-the-workspace.md):
required operational host/account labels and confidential machine identifiers
are different data, and neither decision grants blanket disclosure authority.

Evidence: OKF proposal from oats-maintainer/setup-maintainer-pepe,
2026-11-03; notes/never-publish-raw-machine-ids.md. The public review record
corroborates the incident; the broader identifier review rule is the source's
generalized lesson, not a claim that machine-id(5) specifies every platform.

## A favorable first reaction is not a final direction decision (2026-11-03)

When conveying a human's response, preserve whether it is a provisional
reaction or acceptance of a specified proposal. Remaining review and scope
qualifications belong in the report; do not turn them into a final decision
merely because the reaction was favorable. Routing builds, telling peers
that direction is settled and rewriting decision records can spread that
misclassification before it is corrected.

The source reports one such case: an expert interpreted a favorable first
reading as adoption of a coordination proposal. The receiving maintainer
routed builds, informed peers and rewrote direction notes before the expert
corrected the report: the human still intended to review the proposal.
The source reports withdrawing those actions the same day. This is a
source-reported failure to distinguish discussion from decision, not a
measured relay failure rate. The capture does not preserve the full original
relay or establish whether it met the prescribed decision-record form.

This lesson does **not** add a human reconfirmation round for every large
direction, role, contract or shared-package decision. The cited
[`cross-review-peer` rule](https://github.com/awebai/oats-engineering/blob/7a079d99674c5d97a5ca04032e36cdb6aea7b571/oats-package/capabilities/maintainer/skills/cross-review-peer/SKILL.md#decisions-passed-on-from-a-human)
trusts a decision relayed by that human's own agent, within what that human
may decide, without asking the human whether they said it. Its separate
rules for decision form, conflicts, human-accepted supersessions and direct
authority for safeguarded acts remain intact. A known qualification or
correction must not be discarded, but a mandatory quoted line for every
such relay is not adopted; neither a quotation alone nor confidence in the
sender settles the meaning or scope of the response.

Prefer an explicit distinction between proposed and decided status in the
existing decision record, carrying any remaining human review. The cited rule
already draws that line: a relay is a decision only in its
`Decided with <human>: <decision>` form, recorded where it applies, and anything else is a
proposal. A favorable first reading does not earn that form, and a receiver
treats a relay without it as a proposal. Structural
checks can expose a missing status or locator, not determine whether the
human intended final acceptance. The residual interpretation belongs in
existing `direction-gate` and `cross-review-peer` guidance, not a second
approval service. No skill, schema or automated enforcement is changed here,
and this incident does not itself supersede any accepted coordination choice.

Evidence: OKF proposal from oats-maintainer/release-maintainer-pepe,
2026-11-03; notes/a-yes-on-first-reading-is-not-a-decision.md. The incident
and correction are source-reported; no private mail, session or decision
page was inspected, and no human acceptance of a new confirmation rule is
cited.

## A declared deferral still needs the decision's permission

When a PR openly leaves part of a decided rule for a later PR, read the
original decision before accepting the split. If that decision does not
permit the staging, return the PR or have the same deciders agree the split
first. An explicit deferral in a PR description is not itself a decision
amendment.

The source reports approving a staged change that retained an old start
kill deadline, then a second reader finding that the decision covered starts
as well as apply. The description made the omission visible but also made it
look intentional; checking implementation against that description missed
the actual direction constraint. This refines the direction-first gate,
not the authority to change a decision. Put the decision and any authorized
split in the review evidence; the operating check belongs in the existing
`direction-gate` skill rather than in a competing implementation plan.

## An adapted template answers its release markers with the lane map, never with a stricter per-person gate (2026-11-09)

When reviewing an adaptation of generic role text (a coordination template
copied into OATS, or any copy of role skills), read every answer that touches
merges, releases or tags against the authority lines of the
[release-lane decision](/nodes/oats-maintainer/stewardship/release-lane-and-project-lanes.md)
and the lane map it points to, not only against the safeguards the text
keeps. In OATS the answer is the record's: `lane:release` has the final say
on what is released; the lanes agree on its posted release plan through
their maintainers; the tag and the publication rest on the authority of the
release lane's human, in the form that human has recorded. A copy that keeps
the template's default, or adds a "direct go" on top of it, writes a release
process nobody decided.

A "stricter" answer is not a safe default. Adding a go from each lane owner
before a tag looks like a safeguard, but it creates an authority the record
does not hold and binds the release lane; that is a direction question for
whoever decides direction, not something a reviewer accepts because it is
tighter. The release lane's human's own go, where the release-lane decision
requires it, is the recorded authority, not such an addition.
"Stricter" does not mean "recorded". The relayed-word safeguard (a relayed
yes grants no tag) is already in the maintainer briefing, so a copy needs
nothing extra for it; reading an override only against that safeguard, and
not against who holds the authority, is the miss.

The source reports one such case. In the PR that made OATS's souls compose
its own copy of the engineering template, the copy's release planning and
landing rules kept the template default (a card to, and a yes from, each
lane owner whose lane has changes) and added that the tag waits for each
owner's direct go. The source approved it, reading the addition as a
relayed-word safeguard. The release lane returned it as a new release
authority: taken together, the two texts would have made every OATS release
wait on three humans. The fix answered the template's release markers with
the lane map's release-lane rule at each site. Read on the public PR
([oats-project/oats#1769](https://github.com/oats-project/oats/pull/1769))
at harvest: the source's approval at `6c8ad151`, the release lane's return
at the same head naming this finding, the correction at `51fb3ab3`, and the
merge at `1af4a64c`.

The general adaptation check, in the developer's and reviewers' briefs, is
owned by
[verify a template adaptation twice](/nodes/oats-expert/lessons/verify-a-template-adaptation-by-its-diff-against-the-tag-and-the-authorities-it-grants.md),
which also records this PR's other return (unmarked overrides, found by a
diff against the template's tag). This section holds only the maintainer's
review judgment: a tighter answer is not a safe one, and the answer is read
against who holds the authority, not against the safeguard it seems to add.

This refines the direction-first gate; it changes no release, merge, tag or
second-reader authority and records no new release arrangement. The
template's default wording points the same way on every port and every new
template release, so the check belongs in the existing `direction-gate` and
`pr-review` guidance for template copies, not in a second roster of the
authority lines here. A review checklist entry for marker answers that touch
releases is the prevention route; no skill change or enforcement is
delivered by this record.

Evidence: OKF proposal from oats-maintainer/setup-maintainer-pepe, 2026-11-09;
notes/a-copied-template-must-not-add-release-authority.md. One occurrence in
one review; the PR's return, correction and merge were read on the forge,
the source's reading of its own approval is source-reported.

## An agreed condition follows the advice across messages (2026-11-02)

When a decision constrains advice, review every place the change gives that
advice against every agreed condition: warnings, refusals, documentation,
release prose and the PR description. Checking only the surface named in the
original discussion can miss the same remedy in a second message. This is a
concrete application of the every-surface
[scope corollary](#a-test-that-agrees-with-the-code-is-not-evidence-consolidated-2026-09-06)
below, not another approval
round or permission to revise the agreement.

The source reports approving a compatibility warning with a condition on
pinning an older client, while missing that condition in a new mint refusal
in the same PR. The condition matters because another deployment on that
host may require the newer client. A second reader returned the omission.
The [compatibility decision](/nodes/integrations-expert/decisions/newer-than-tested-warnings-follow-release-authority.md)
owns the remedy's rationale; this section owns the review failure, not a
second specification of the provider's messages.

Prefer one shared remedy representation where practical, and regression
checks that assert the required condition on every emitted variant. Tests
should check the resulting message, not merely a shared helper. Residual
semantic checking of docs and PR prose belongs in the existing `pr-review`
and `direction-gate` guidance. These are prevention routes, not delivered
code or skill changes, and a passing wording test cannot supply decision
authority.

Evidence: OKF proposal from oats-maintainer/setup-maintainer-pepe,
2026-11-02; notes/check-every-emitted-message-against-agreed-conditions.md.

This is one source-reported review miss on
[awebai/oats-aweb#175](https://github.com/awebai/oats-aweb/pull/175) at
`2835c4b`, not a measured failure rate. The public correction
[`dbb2962`](https://github.com/awebai/oats-aweb/commit/dbb29620170df8c1f79e39b731bc777e65f5da78)
was read: it adds the condition to the refusal, its assertions and the
changelog. That corroborates the omission and correction, not the private
agreement or return, human acceptance, runtime safety or completed release.

# Fresh eyes

Every substantive commit gets a **fresh, ephemeral reviewer**: diff-only, no
kept state, reporting by message and retiring after the verdict. The first
multi-agent run (2026-07-21) showed why: reviewers that kept report files or
tracked state stalled, and stalled reviewers led developers to review their
own code, losing the fresh-eyes property. A reviewer that vanishes mid-turn
is replaced by a **new** reviewer on the same commit, never resumed. But a
vanished window with no wake event is not proof it vanished mid-turn
(2026-07-23): a reviewer that finished, mailed its verdict and retired looks
identical when the channel failed to wake the spawner. Check the full message
history, not only the unread inbox, and the session tail (a clean send and
self-retire versus an abrupt cut-off) before calling it killed; a verdict
found there is a channel fault to report, not a reason to re-review. Reviewer
notes reach knowledge only through their own reviewed change. A reviewer is a
soul like any other, spawned fresh per verdict — capabilities no longer
declare agents on main (a manifest `agents:` is refused), so a reviewer ships
as a package or member soul.

# Bind every verdict to content

A verdict names the **exact SHA and non-merge commit count**; an approval is
bound to content, never to a branch name. Immediately before merging, compare
the PR head, the remote ref and the check run's head SHA, and merge with a
guard on the full approved object id — a handback is final only when
reviewer-driven commits are settled, because even a test-only nit moves the
head past the green run. When told "still broken", the first triage is SHA
drift, not a missing fix. Review the **whole merge range**
([merge-range scope](/nodes/oats-maintainer/lessons/pr-branch-merge-range-scope.md));
a verification command supplied by the party being verified bounds the answer
to what they included. After a squash, prove the landed patch equals the
approved one (compare patches, not trees, when main moved in between), and
prove a fix reached main by ancestry before telling its author it landed — a
commit "in the PR" can be orphaned by the squash. Where the platform refuses
an author's own approval, the verdict is still recorded durably on the PR.

## Establish the review checkout before reading the diff (2026-10-31)

Head-bound review begins at fetch, not only at the merge guard. The source
reports nearly reviewing an old local PR ref after a force-push. When
refreshing a disposable local review ref, allow its non-fast-forward update
with a leading `+` in the fetch refspec, then compare the resolved full
object id with the head handed over for review **before reading the diff**.
A successful refresh alone does not establish that it fetched the handed
head; a mismatch means the review target is not established.

Treat any rejected fetch as a failed refresh, never permission to proceed
with whatever the local ref already names. The `+` applies only to a
replaceable local review ref, not a contributor's working
branch, accepted branch or remote push. It changes no approval-carry or
merge-update rule below.

This mechanical check belongs in the existing `pr-review` skill and its
checkout tooling: make fetch success and expected-SHA equality prerequisites
to review, with a force-pushed-ref regression case. Until enforced there,
it is temporary review-procedure debt, not another review protocol. This
harvest changes neither tooling nor skills.

Evidence: OKF proposal from oats-maintainer/release-maintainer-pepe,
2026-10-31; notes/pr-ref-fetch-needs-a-plus.md. The source identifies
[awebai/oats#1673](https://github.com/awebai/oats/pull/1673) on 2026-10-30 as
the near miss; this harvest did not reproduce or independently audit it.

## Carry verdicts only with proof of an unchanged delta (2026-10-13)

This replaces the earlier rule here requiring the approver's confirmation
after every rebase of an approved head. The source reports human and
both-side acceptance of the replacement [6]; the
[review record](#acceptance-of-the-2026-10-13-decisions-recorded-at-review-2026-10-30) says what that
acceptance covers. Repeatedly rebinding an unchanged patch creates review rounds without a new independent judgment;
content identity and integration evidence are the gates, not another message.

The merging maintainer brings the branch up to date using the forge's update
operation: merge the default branch into it, never force-push it. Both
verdicts carry only when the PR's own diff is unchanged and CI is green on
the updated head. If the owner rebases instead, both verdicts carry when
every commit is `=` in `git range-diff` and CI is green on the new head;
anything other than `=` returns to both readers for that delta. Record the old and new
heads and the evidence on the PR: this is a content-bound carry, not approval
of any future head on the branch.

When the default branch has moved since the head's CI ran, first run on a
trial merge the test files changed or added by the PR and by what merged
since its base, inside the
[operator-host boundary](#trial-merge-test-selection-must-respect-the-operator-host-boundary-2026-10-28).
This is a first check, not a substitute: a same-area merge still needs the
[updated-head CI](#a-batch-window-preserves-same-area-integration-evidence)
that section requires. No shared file and a clean textual merge do not prove
the combination: a test and the behavior it reads can change in separate files
[6]. The head guard and the integration check answer different questions.

This decision does not assume a merge queue. Where one exists, enqueue the
approved head instead; a queue is the repository-level route for enforcing
CI on the combination. The operating procedure belongs in the
`oats.maintainer` `pr-review` skill, not in a second checklist here [7].

## A release heading is part of an entry's meaning (2026-11-03)

After updating or rebasing a PR across a release cut, inspect the heading
above each added CHANGELOG entry on the updated head. Identical added lines
can acquire the wrong meaning when an update places them under a version
that has already shipped rather than `Unreleased`. A comparison that ignores
surrounding context can miss this even when the patch appears unchanged.
Return a misplaced entry for correction; this is a semantic placement check,
not a new blanket approval-carry exception.

The public [return on oats-aweb#188](https://github.com/awebai/oats-aweb/pull/188#issuecomment-6604310692)
records precisely that failure after a forge update across the 1.34.0 cut.
The [subsequent read](https://github.com/awebai/oats-aweb/pull/188#issuecomment-6604514665)
records moving the entry to `Unreleased`. This is one corroborated review
incident, not a claim that every update misplaces notes or that ordinary CI
can never detect it.

Prefer separate per-change release-note fragments to eliminate this shared
heading trap; where a repository keeps one changelog, add a check against
unintended edits to already-released sections. Until enforced, placement is
review-procedure debt in the existing `pr-review` guidance. Neither approach
proves the release prose true, and no CI or skill change is made here.

Evidence: OKF proposal from oats-maintainer/setup-maintainer-pepe,
2026-11-03; notes/changelog-section-after-branch-update.md. The cited review
records were read; this harvest did not reproduce the merge. The kernel's
per-change notes are a contrast, not immunity from all release-note errors.

## A publication screen must distinguish the PR range from a moving base (2026-11-03)

Review a new publication gate against the ordinary concurrent case: two PRs
start from one accepted base, then one merges before the other. A gate that
requires the old base to equal today's accepted tip, without a safe way to
rebuild the pending change, blocks ordinary concurrent work. The original
lesson recorded the source's real-Git reproduction and the stale-whole-tree
rewrite trap.

**Refinement of that earlier lesson, later on 2026-11-03:** screening the PR's
own range from its fork point remains distinct from screening what will be
published. It is not sufficient merge evidence. A local approximation of a
hosted squash is not necessarily the hosted result either: `merge=union` or
other merge-algorithm differences can retain content the screen rejected.
The review invariant is that the published tree must be the screened tree.
This supersedes the note's initial suggestion that fork-point screening plus
an exact-head guard alone resolves the moved-base problem.

The source reports both maintainer sides agreeing three conditions for the
content-screened rewrite path: integrate the sanitized delta onto the
current accepted tip as one screened replacement commit; bind a fresh verdict
to that replacement head, with a range-diff read of the delta; and prove the
behavior with real Git, including a `merge=union` case. Direct merge requires
the accepted tip to be an ancestor of the screened head, so the squash needs
no divergent-tree composition. Renewed advancement that invalidates that
condition requires refusal and renewed review, not automatic recomposition
under an old verdict.

Rebuilding still starts from the current accepted tree plus the intended
delta, never the old head's whole tree. Test preservation of intervening
additions, edits and deletions as well as conflict refusal. A content-pattern
screen does not establish semantic preservation or cover personal data in
general; the [package's publication-limit decision](/nodes/oats-okf-expert/decisions/personal-data-exclusion-is-not-a-publication-guarantee.md)
owns that separate boundary.

The public second read also identifies a residual race: a last accepted-tip
check is not atomic with the hosted merge. Its recorded mitigation is one
serialized merge writer per base, an operational requirement rather than a
lock the helper enforces. Do not describe a head guard or repeated checks as
an atomic expected-base guarantee, or local Git tests as certification of
hosted merge semantics.

This refines publication-gate review judgment, not the general unchanged-delta
carry rule, same-area updated-head CI or affected-test requirements. It grants
no new authority to rewrite a branch. Package-specific publication and legacy
ancestry procedures stay with their owner and composed skills. Enforcement
belongs in the publication implementation and real-Git regression suite;
residual judgment belongs in `pr-review`. No gate or skill changes here.

Evidence: OKF proposal from oats-maintainer/setup-maintainer-pepe,
2026-11-03; notes/a-publication-gate-must-allow-a-moved-base.md, later capture.
The source reports bilateral agreement in private message `6feb3148`. The
public [delta approval](https://github.com/awebai/oats-okf/pull/121#issuecomment-6607805220),
[other-side confirmation](https://github.com/awebai/oats-okf/pull/121#issuecomment-6607890507)
and [serialization clarification](https://github.com/awebai/oats-okf/pull/121#issuecomment-6607979387)
were read and corroborate the three conditions and residual limit.
Agreement is source-reported maintainer agreement, not human acceptance.
The PR merged on 2026-11-03; this harvest did not run its tests, reproduce the
experiment or establish a release, deployment or hosted-merge guarantee.

# A batch window preserves same-area integration evidence

The source reports a same-area merge rule agreed by both maintainer sides
on 2026-10-10 and a 2026-10-14 batch that violated it: a PR whose base moved
through a same-area merge must be brought up to date and CI-green on that
combination before it merges. Same area includes shared files and the same
lane's code and tests, even when they share no file. A shared docs page or
workflow counts too. A clean textual merge cannot prove this integration,
and a guard on the approved head does not guard the base.

The narrow release-notes exception is a clean merge where the next version's
aggregate notes file is the only shared file. It does not exempt two PRs
correcting the same per-change entry file. Nor does absence of shared files
establish that changes are unrelated: one PR can change a sentence in the
producer while another adds a test that expects its old wording.

Updating approved PRs onto one common main and running CI in parallel can
save redundant rounds. It does not freeze main for the later merges. Before
each merge in the batch, compare the PR with what has already landed, by
changed files and by code/test dependency. Same-area changes need another
update and CI run; independent changes need no serial CI round merely because
they belong to the batch. Watch main's CI on every merge commit and stop the
batch at the first red. This makes failures attributable and avoids feeding
a broken base into every lane's queue.

In the reported batch, two individually green client/Desktop PRs shared no
file but disagreed on the withheld-text wording. Main went red after the
second merge and stayed red until a fix-forward. The successful parallel
update round did not establish that the successive combinations were green.

This is an integration-evidence requirement, not a new rule for carrying
review verdicts across an update or choosing merge-update versus rebase.
It also grants no file-nonoverlap shortcut around affected-test checks.
The structural elimination route is a merge queue that verifies each
prospective combination; without that enforcement, the residual judgment
belongs in `pr-review`. A local trial merge can reveal a bad combination,
but does not replace the same-area updated-head CI requirement.

## Trial-merge test selection must respect the operator-host boundary (2026-10-28)

Before running a trial merge on an operator host, inspect the selected test
files for real-process signalling or use of real tmux or `oats tui`. Exclude
such files from the local run, even when they are among the PR's changed
tests or the tests changed by intervening merges. For a PR needing those
checks, bring the branch up to date and obtain the integration evidence in
CI on a disposable runner instead. Pure file-reading and fake-terminal
tests remain eligible locally when they have no such real effects; a name
filter does not make a mixed module inert.

The source reports that this routine review step selected a TUI signal test
on 2026-10-28 and killed the user's systemd manager and its agents, followed
by an operator-directed hold on those local runs. Private HOME,
OATS_HOME_DIR and TMUX_TMPDIR did not contain the signal. The
[signal-test containment lesson](/nodes/oats-desktop-expert/lessons/signal-tests-must-contain-regressed-cleanup.md)
owns the reparenting rationale, runner/namespace boundary and cleanup proof;
this refinement puts that boundary at the maintainer's test-selection point,
not in a second reproduction recipe. Separate isolated reproduction remains
subject to that lesson and the operator's restrictions.

This qualifies local trial evidence; it does not waive affected-test
coverage, same-area updated-head CI or existing review-verdict rules. A
passing inert subset cannot stand in for the omitted integration checks.
Enforce effect separation and containment in the test-launch harness and CI;
until then, the selection and CI-routing check belongs in the existing
`pr-review` skill. No skill or harness enforcement is claimed delivered here.

Evidence: OKF proposal from oats-maintainer/polaris-oats-maintainer-desktop, 2026-10-28; notes/local-test-runs-can-kill-the-host.md.

The incident and operator hold are source-reported; this harvest did not
rerun the tests or independently audit
[awebai/oats#1615](https://github.com/awebai/oats/issues/1615).

# Evidence outside PR CI belongs before hand-over

The source reports a review starting with an affected macOS path still unrun,
with that run deferred to the merge gate. The subsequent run failed nine of
ten tests and hung on the last. It was not a pass, and the investigation later
traced fixture isolation to a runtime-version difference rather than the
platform first suspected. Reviewing first would have bound a verdict to a
head whose required evidence could still force it to change.

Require results for the affected path before accepting the owner's hand-over,
not merely a promise to obtain them before merge. This includes affected
Desktop suites or platform-specific paths absent from PR CI. A stand-in can
qualify logic but not the real service manager's behavior it models.

The exception is evidence that cannot change the code under review, such as a
later artifact signature. Nor does this require every neighboring test to
pass regardless of an established baseline failure: the source records a
bounded exception where the platform-dependent function ran, the larger test
file failed identically on main, the limit was disclosed in hand-over and
verdict, and the test problem had an owner. A baseline failure is not evidence
for or against the change; establish it rather than asserting it.

The structural route is a targeted runner for paths omitted from ordinary
PR CI, with platform-provided run identity and exact head evidence. The note
reports that such a manually triggered macOS runner was added; a clean runner
still cannot prove isolation against a live host service it does not have.
Keep that limit explicit rather than replacing the missing real-world check
with a green simulated one. This refines evidence timing, not the authority
to merge or the paired-maintainer arrangement below.

## A restart that can leave the service down blocks approval (2026-11-04)

Treat a suspected restart failure after the stop step as a correctness
blocker when it can leave the service down with no automatic recovery.
Do not approve while labelling that risk a follow-up. Resolve it with
evidence on the affected platform before approving, or return the change
with the unresolved finding. Reviewing from another operating system limits
what the reviewer can establish; it does not reduce the failure's severity.

The source reports initially approving a service reload despite suspecting
a stop/reload race. A later real-platform slow-exit check reproduced the
failure and overturned that approval: the reload could leave the job
unloaded. This adds a severity judgment to the evidence-before-hand-over
rule above, not a new sign-off round or a ban on non-blocking follow-ups.
The [launchd upgrade lesson](/nodes/integrations-expert/lessons/launchd-binary-upgrades-can-need-rebootstrap.md)
owns the platform recovery rationale; this section owns why the unresolved
service-down path cannot be treated as non-blocking. The release-side
counterpart, checking a prescribed upgrade command against its platform path
before the tag, is the
[prescribed-step check](/nodes/oats-maintainer/lessons/provider-pin-upgrade-notes-belong-in-the-kernel-release.md#a-prescribed-step-must-reach-its-promise-2026-11-04);
it governs release notes, this section governs code-review severity.

Prefer lifecycle handling that preserves or restores service across partial
failure, backed by regressions and an authorized affected-platform rehearsal
that checks the resulting service state, not just command order. These are
the elimination routes; residual severity judgment belongs in the existing
`pr-review` skill, not a permanent manual substitute for implementation and
tests. Requiring evidence grants no permission to bypass existing host-safety
and containment limits. No code, test or soul skill changes here.

Evidence: OKF proposal from oats-maintainer/setup-maintainer-pepe,
2026-11-04; notes/launchd-kickstart-fails-after-binary-replaced.md.
The proposal identifies [awebai/oats-aweb#198](https://github.com/awebai/oats-aweb/pull/198).
The approval reversal and later successful check are source-reported from
one review; this harvest did not audit that PR, run a service-manager
experiment or independently verify platform constants, release or deployment.
No human-accepted review rule is superseded.

## An agent-read claim false under a supported setting blocks approval (2026-11-05)

A skill, inject or onboarding document that promises behavior contradicted
by a supported configuration has a correctness defect, not a wording
follow-up. Do not approve over a known false claim because that configuration
seems unlikely: an agent using the text is directed incorrectly whenever
that case applies. This is a severity judgment, not a ban on non-blocking
editorial follow-ups or another sign-off round.

The source reports finding such a gap in invite-join guidance, approving it
as a follow-up, and having the release lane return it. The text promised a
refusal without stating the configuration conditions that controlled it;
under another supported configuration the operation proceeded instead, so
the next instructional check would misclassify the result. The reported fix
qualified the text and asserted the relevant refusal codes in tests.

The [composed-instruction lesson](/nodes/oats-kernel-expert/lessons/kernel-composed-text-is-executable-surface.md)
already owns why shared text must distinguish invariant from variable
behavior. Apply it at review: identify the setting or combination that
switches the promised behavior and check the sentence against the supported
cases. Require the missing condition or removal of the false claim before
approval. The [version-qualified-claim lesson](/nodes/oats-maintainer/lessons/a-re-dated-claim-must-be-re-verified-against-the-release-it-now-names.md)
owns the analogous release-evidence check; this section adds configuration-
dependent severity, not another provider contract.

Prefer one authoritative account of the conditional behavior and regression
cases for both permitted and refused outcomes, asserting each relevant
refusal's exact code rather than merely that something failed. These are
the elimination routes for the concrete mismatch; tests do not establish
all prose semantics. Residual truthfulness and severity judgment belongs in
the existing `pr-review` skill. No code, tests or soul skills change here.

Evidence: OKF proposal from oats-maintainer/setup-maintainer-pepe,
2026-11-05; notes/agent-read-claims-false-in-a-supported-config-block.md.
The proposal identifies [oats-project/oats#1744](https://github.com/oats-project/oats/pull/1744).
The review miss, return and correction are source-reported from one review;
this harvest did not audit that PR or execute the provider. Exact policy
predicates remain repository-owned; no release, deployment, universal agent
compliance or measured failure rate is certified. No human-accepted review
rule is superseded.

# Delegating implementation

When an expert delegates to several helpers communicating asynchronously, most
coordination rounds are spent on *crossed* state. Every message states the
exact head it refers to, what of the recipient's work is already merged, and
exactly one next action; stale references are reconciled against git, not
re-litigated. Once a branch is PR-ready, declare a **hard freeze**: only
blocker-class defects get commits. A green gate on a stale base tests the
wrong product — check whether `main` moved before each round. Behavioural
conflicts return to the implementer who owns the logic; only mechanical,
append-only unions are the maintainer's. Distinguish environment failures
from PR defects before returning.

## A brief that may lead to live terminal checks carries their safety gate

A maintainer's brief that may lead to a real-terminal check must point the
lead to the existing
[bounded live-terminal verification lesson](/nodes/oats-desktop-expert/lessons/verification-judgment-for-privileged-surfaces.md#a-passing-live-terminal-check-can-still-exhaust-the-host)
and make satisfying it part of the assignment, rather than leaving safety
implicit in a request for live evidence. That concept owns the bounds and
harness teardown requirements; a second checklist here would drift. The
briefing hook belongs in `launch-work`, while enforced containment belongs
in the verification harness.

When a capture runs away, ask its owner or the human to end it. A permission
refusal is not permission to find a different route to the same kill.
Requiring live evidence or bounding a check grants neither permission to run
an otherwise forbidden experiment nor authority over unrelated processes.

# A lone gate gets a second reader (2026-09-27)

Locally the gate is the affected suites; the sharded CI run is the gate of
record, and defects found after merge are fixed forward. That speed has a
price when one lead gates alone: schedule a second maintainer's re-review of
every window a single lead gated. The first such re-review, of a few days of
lead-only merges, found two security defects (an argv flag injection and an
arbitrary file write); its findings landed as follow-ups, never reverts.

## Paired maintainers cross-review and plan releases together (2026-10-01)

**Operating terms superseded by the
[2026-10-13 lane decision](#peer-maintainers-own-lanes-each-pr-gets-one-second-reader-2026-10-13)
below; the second-reader rationale and joint release planning remain.**

The human directed the participating maintainers to review one another's work
and plan releases together [4]. The maintainer's recorded rationale is to
build the second reader into the pairing from the start, rather than routinely
needing an after-the-fact review of lone-gate windows [5]. This adds a paired working
arrangement; it does not remove the lone-gate fallback or relax head-bound
review. The direction records how the pair coordinates, not a standing grant
of merge or release authority to future instances.

## Peer maintainers own lanes; each PR gets one second reader (2026-10-13)

**Refined since:** the 2026-10-26 decision on
[one release lane and project lanes](/nodes/oats-maintainer/stewardship/release-lane-and-project-lanes.md)
owns the lane model, including who merges, and refines rather than removes
the two rules here. The [lane map](https://github.com/awebai/oats/issues/1566)
holds today's lanes; this section keeps the 2026-10-13 decision and why.

The source reports a human-accepted refinement, agreed by both maintainer
sides [6]: each peer holds a lane whose review, merge and tracking have one
accountable maintainer. A lane is a division of existing responsibility, not
a new grant of merge or release authority. Every PR gets **one second
reader**, not a read from every peer. Ask once, at the head the lane's
maintainer approved; a PR authored by that maintainer goes to the second
reader without waiting for its author's approval. Where another side already
reads every PR, peers on the same side do not add reads of one another's PRs.
Contract changes still need both sides' agreement before implementation.

The forge is the one copy of a PR's state; a maintainer's state holds only
its own lane. The decision limited peer messages to a second-read request,
its verdict, a hold on work in flight, the release plan, and a lane
hand-over; the [`cross-review-peer` skill](https://github.com/awebai/oats-engineering/blob/7a079d99674c5d97a5ca04032e36cdb6aea7b571/oats-package/capabilities/maintainer/skills/cross-review-peer/SKILL.md)
owns the current list, which has since grown. There is no routine notice before or after a merge or tag. Joint release
planning remains; duplicating each event does not make it joint planning.

This supersedes the all-peers, parallel-review practice and repeated
verdict-rebinding associated with the earlier pairing. Experience with that
practice produced duplicate PR tracking, repeated rebases and per-event mail
without a new independent read. The choice keeps the second pair of eyes
while removing those costs, rather than weakening review to save messages.
The lone-gate fallback above is unchanged; content changes still return to
both readers under the carry rule. The operating detail belongs in the
`oats.maintainer` `cross-review-peer` and `pr-review` skills [7].

## Acceptance of the 2026-10-13 decisions (recorded at review, 2026-10-30)

Both decisions above supersede part of a human-directed decision. The
acceptance is **source-reported (relay at
[awebai/oats#1103](https://github.com/awebai/oats/issues/1103#issuecomment-6150667299))**, not verified as the human's own
record. That comment presents itself as an agent reporting the human's
one-word yes, given in a session on 2026-10-13, to decisions D1 to D4 of the
[proposal](https://github.com/awebai/oats/issues/1103#issuecomment-6150614496), with that side's
[condition on D1](https://github.com/awebai/oats/issues/1103#issuecomment-6150639181). The same human gave the 2026-10-01
direction, so this is that human's refinement of their own decision. D2 is
the one-second-reader rule and D3 the range-diff carry; each names the
recorded sentence it changes.

Two terms came from the maintainer sides and that yes does not cover them.
The [other side's answer](https://github.com/awebai/oats/issues/1103#issuecomment-6150651275) added the changed-test
selection, and said its own human had not yet weighed in; no later comment on
the issue overrules it. The [release lane's answer](https://github.com/awebai/oats/issues/1103#issuecomment-6150671879), posted
after the yes, added the merging maintainer's forge update and the carry
across it. A merge update is not a rebase, so that term supersedes no recorded
rule. Both terms went into
[awebai/oats-engineering#14](https://github.com/awebai/oats-engineering/pull/14),
approved by a reader from each side, and remain in the current
[`pr-review` skill](https://github.com/awebai/oats-engineering/blob/7a079d99674c5d97a5ca04032e36cdb6aea7b571/oats-package/capabilities/maintainer/skills/pr-review/SKILL.md).

The shipment in [7] is confirmed: #14 merged as 944470be, which tag v1.10.0
names, and [awebai/oats#1119](https://github.com/awebai/oats/pull/1119) merged
as 9a3ae4b2.

# A test that agrees with the code is not evidence (consolidated 2026-09-06)

The recurring defect in this repository's review history is a test that agrees
with the code instead of the requirement. Named forms: a fake more generous
than the real tool; a non-execution assertion with no positive control; a
restore test whose fixture fails before the code under test; a killed mutant
one layer below the reported bug; an assertion message claiming an ordering
the expression does not check; a source-text regex loosened until it matches;
an assertion on a one-way call's return instead of its effect at the far end;
a guard no removal mutant can kill because another layer already guarantees
it. The maintainer therefore asks of every fail-closed change: what else would
fail if the measuring apparatus were dead; does the positive branch of the new
gate fire in a test; was the base already red; when expected and actual share
a computation, what independent quantity is measured.

Scope corollaries: a test per layer is not a test of the seam — ask what
object the caller actually holds across a process boundary; a finding names
where it was noticed, not its extent — check the same predicate on every
surface; a refusal added at one entry point is probed at every entry point an
operator or the Desktop uses. A **removal** is complete only when no text
composed into agents still teaches the removed thing: generate the sweep from
the refusal table itself, across skills, injects and package skills, not from
the nouns one PR happened to touch (a sweep in 2026-09 found published skills
still teaching a dozen verbs refused since 0.25.0). Kernel fail-closed
guarantees are proven only by their first real capability user
([kernel view](/nodes/oats-kernel-expert/lessons/fail-closed-mechanism-proven-by-first-user.md)).

## Removed assertions are part of the review (2026-11-03)

Read test deletions and weakened assertions as changes to guarantees, not
just reductions in test maintenance. For each, identify what the assertion
used to establish and where that guarantee is now tested. If the behavior is
intentionally changing, compare that change with the accepted requirement;
a green suite cannot justify silently discarding it. A suite says nothing
about a guarantee whose only assertion has been removed.

The source reports approving a readiness change after reading code paths and
CI but missing a deleted channel-home test. A second reader caught that the
absence of an inapplicable warning, and avoidance of its extra kernel query,
would no longer be guarded. This is a concrete extension of the requirement-
based test judgment above, not a new sign-off round.

Restore behavioral regressions for the retained guarantees. Tooling can flag
deleted or weakened assertions for review, but cannot decide whether their
replacement proves the same requirement. That semantic comparison belongs in
the existing `pr-review` guidance; no automated enforcement or skill change
is claimed here.

Evidence: OKF proposal from oats-maintainer/setup-maintainer-pepe,
2026-11-03; notes/read-the-test-diff-for-removed-guards.md. The note dates the
miss to 2026-11-02 on
[awebai/oats-aweb#179](https://github.com/awebai/oats-aweb/pull/179) at
`1503e65`. The missed assertion and second-reader finding remain source-reported;
this harvest did not audit the test diff or rerun the suite.

## Consult cross-lane findings before commissioning another rehearsal (2026-10-31)

When a delivery review exposes a missing state, first check the other
owning lanes' issue records and existing evidence, and ask what they have
already observed when that remains unknown. The source reports that the
open-prompt behavior uncovered in its checkpoint review had been observed
and tracked elsewhere weeks earlier. Discovering that only after another
rehearsal duplicated investigation rather than filling the actual evidence
gap. This is a review-planning lesson, not a mandatory extra sign-off round.

The [checkpoint decision](/nodes/integrations-expert/decisions/checkpoint-wake-belongs-to-the-waiter.md)
already calls for idle, busy and open-prompt coverage; the kernel's
[dialog-coverage lesson](/nodes/oats-kernel-expert/lessons/dialog-claims-do-not-enumerate-all-dialogs.md)
owns the known limits. Reuse those findings to select the missing probe,
not as a substitute for evidence on the delivery path and harness under
review. An earlier observation elsewhere is not that combination's pass.

Maintain executable state coverage in the real-harness fixtures rather
than relying on reviewers to rediscover the missing row. The remaining
cross-lane evidence lookup belongs in existing `pr-review` guidance; no
fixture, skill change or new review authority is delivered by this record.

Evidence: OKF proposal from oats-maintainer/setup-maintainer-pepe,
2026-10-31; notes/rehearse-the-waiting-state.md. The initial
[review](https://github.com/awebai/oats-engineering/pull/34#issuecomment-6525755420)
and subsequent [reported probe](https://github.com/awebai/oats-engineering/pull/34#issuecomment-6526004654)
were read and corroborate the missing-state finding. The prior cross-lane
observation and avoidable delay remain source-reported; this harvest did
not read private correspondence or reproduce the experiment.

# Green gates do not lift a hold (2026-09-19)

Mergeability, diff fidelity and a green suite answer "does it apply and run";
none answers **"is this content permitted to land"**. Permission lives in
prose — holds in design documents, decision records, scope boundaries — so a
held change can pass every gate buried in the ancestry of a long merge while
the reviewer's attention is correctly on the small net diff. Before landing
ancestry you did not write, search the project's prose for holds and check
**both ancestry and content** (an ordinary merge preserves the held commit's
identity; cherry-picks and rebases need a patch-id comparison, which still
misses a reimplementation). "Merge everything" scopes the *work*; it does not
clear a hold the speaker may not know exists. A breach is repaired
**forward-only** to the last approved state, the disposition says the held
commit remains an ancestor and whether it is permitted is a separate question,
and a hold is never lifted retrospectively to unblock the work its breach
created. Once a breach is shared state, its disposition belongs to whoever set
the hold.

# Compatibility and contract changes

A runtime alias is incomplete until the public schema validates
representative *pre-migration* artifacts; the maintainer returns any
compatibility or migration PR without fixture tests of legacy artifacts
against the current schema. When a ruling replaces a transitional model, every
sentence describing the old behaviour is re-verified
([clean-contract precedent](/nodes/oats-maintainer/decisions/clean-contract-precedent.md)).

An **additive field on a closed-shape contract is breaking** for every strict
consumer already released: make the consumer tolerant first, then ship the
producer; a wire rename between a provider and a strict consumer lands
consumer-first, in one release. When a consumer's review finds a trust gap in
its producer, fix the producer and keep the consumer's guard as defence in
depth. A stand-in producer proves only the shapes we assumed: before shipping a
contract change, recapture the consumer's fixtures from the real producer.

## One reference contract must agree across schemas without widening display (2026-11-03)

A repository-reference form must be accepted consistently wherever that same
contract appears, not just in the configuration file where an operator first
hit a refusal. The source reports bilateral agreement on 2026-11-02 to admit
the password-free SSH-user form across the local, membership and workspace
schemas, including the pinned-source form. Widening only the local file was
rejected: onboarding would accept a value that the next configuration surface
could refuse. This is a contract-coherence decision, not a second copy of the
reference grammar or a requirement to unify distinct reference contracts.

Input acceptance does not widen disclosure. The source's initial condition
to show a bare SSH user in refusals was withdrawn because it would reverse
[the recorded reference-display decision](/nodes/oats-maintainer/decisions/reference-display-is-rebuilt-or-withheld.md).
Preserve that redaction; once the supported input is accepted, repairing its
confusing refusal does not require exposing user information. Before changing
what an error shows, check the decision that established the current display.

Prefer one contract definition or generated schema fragments, backed by the
same accepted/refused fixtures at every consumer, with separate redaction
checks. The remaining review judgment is whether the contract's consumers
were all identified. No schema, renderer or test changes are made here.

Evidence: OKF proposal from oats-maintainer/setup-maintainer-pepe,
2026-11-03; notes/one-ref-pattern-across-schemas.md. The body of
[awebai/oats#1714](https://github.com/awebai/oats/pull/1714) was read and
corroborates the reported all-patterns scope and unchanged display rule.
Agreement remains source-reported, not verified human acceptance; the merged
PR record is not a release, deployment or independently executed test receipt.

## Instruction precedence needs a cross-side decision (2026-10-27)

The named contract list is not an exhaustive boundary for shared-behaviour
judgment. Changing the order of composed instructions changes their
precedence across deployments, even if no config key, manifest field, hook
environment, Desktop JSON shape or lock format changes. Both maintainer
sides decide that change on a decision issue **before implementation**;
absence from the list is not permission for one lane to settle it alone.

The source first treated order as a contract change only if a client read
the instruction-source arrays positionally. After the other side objected,
the source agreed that instruction precedence itself needed the cross-side
decision. A positional JSON consumer still makes it a Desktop-JSON contract
change outright, but proving there is no such consumer does not remove the
precedence decision. This distinguishes the governance gate from the wire
compatibility test rather than conflating them.

The proposed order was still undecided at capture. This lesson records the
agreed need to decide, **not acceptance of any particular ordering** or a
guarantee about how a harness resolves conflicting prose. The existing
[kernel composition lesson](/nodes/oats-kernel-expert/lessons/kernel-composed-text-is-executable-surface.md)
owns composed-text coverage and structural assertions. The residual
cross-side decision check belongs in the maintainer's direction gate;
regressions should enforce the order once decided, not substitute a green
ordering test for that agreement.

Recorded at maintainer review on 2026-10-30: the order was decided after this
lesson's capture, on the decision issue
[awebai/oats#1576](https://github.com/awebai/oats/issues/1576), and merged on
2026-10-27 in [awebai/oats#1600](https://github.com/awebai/oats/pull/1600).
Relays on that issue report that the release lane's human accepted it and,
when asked, said the other side's sign-off was not needed. So this gate's first
use ended on one human's word, not on both sides' agreement. That ruling is
source-reported (relay at the issue), and it is recorded here as what happened
on that change, not as a general waiver: a lane still may not settle precedence
alone, and the map's rule that both sides decide contract changes is unchanged.

## Contract agreement stays on the issue through implementation (2026-10-28)

The source reports a useful practice across three product-contract cases:
keep the proposal, both sides' answers and later amendments on the issue,
so the implementation review can check what was built against what was
actually decided. Mail directs the other side to that record; it is not a
parallel decision record. The existing requirement to decide contracts
before building them remains the authority boundary, not a new claim here.

When a lead finds a contract question, stop the affected build and bring
options to the lane maintainer. The maintainer's direction gate compares
them with accepted decisions. Its issue proposal explains the client-visible
change, alternatives, a recommendation with its decision basis, and the
consequence for existing deployments: either why no action is needed or
what must change. Do not assume every contract change is deployment-neutral.
The other side's explicit answer and build conditions belong on that issue
before building; carry references to both positions and those conditions
into the lead's brief and PR review evidence. Inform the release lane when
the bilateral decision is settled, not through a duplicate negotiation.

A narrowing discovered during implementation still belongs on the issue
before the PR if it changes the decided text. Fewer affected cases do not
make it invisible to the other decider. Posting an amendment is not itself
acceptance: the existing
[decision-amendment gate](/nodes/oats-maintainer/stewardship/review-protocol.md#a-declared-deferral-still-needs-the-decisions-permission)
continues to apply. This keeps a review from comparing the code only with
the author's revised PR description while missing the agreed conditions.

The reported compatibility judgment was to keep an existing error answer
that clients already match rather than rename it merely for consistency
inside the larger change. In the lifecycle-start case, the other side's
answer kept `E_SESSION_START_BUSY` for two concurrent starts rather than
relabelling them `E_LIFECYCLE_BUSY`; the later build-time narrowing that
keeps every existing start-lock answer was posted on the issue, not agreed
by the other side (see the verification note below). The spelling
cleanup offered no compensating benefit for breaking client matching. This
is an application of the
[published-commitment boundary](/nodes/oats-maintainer/decisions/clean-contract-precedent.md#the-precedent-is-bounded),
not a universal ban on an explicitly decided migration, a new error-code
specification or permission to apply the pre-adoption removal rule to
supported clients. Contract fixtures should enforce the preserved answer.

**Limits:** these are three source-reported cases on 2026-10-27–28, with
prompt replies, not a proven protocol for an absent or disagreeing side.
One side's positions were posted by its lane maintainer; the source
expressly says the human had not ruled on that representation. Record the
practice without turning non-objection into human acceptance or granting
future maintainers authority to decide on a human's behalf. Routine launch
autonomy is not that delegation.

The operating route is the existing maintainer `direction-gate` and review
guidance. Prefer one linked issue record and review evidence requiring the
agreed conditions; regression tests can enforce contract answers, but cannot
supply the missing decision authority. No skill change or automated gate is
claimed here.

Evidence: OKF proposal from oats-maintainer/product-maintainer-pepe,
2026-10-28; notes/contract-decisions-between-the-two-sides.md. The source
identifies [session resume](https://github.com/awebai/oats/issues/1567#issuecomment-6439924216),
[start's proposal](https://github.com/awebai/oats/issues/1602#issuecomment-6476048759),
[answer with conditions](https://github.com/awebai/oats/issues/1602#issuecomment-6477039652)
and [narrowing](https://github.com/awebai/oats/issues/1602#issuecomment-6477132396),
and the [roster proposal](https://github.com/awebai/oats/issues/1628#issuecomment-6476678220)
and [answer](https://github.com/awebai/oats/issues/1628#issuecomment-6477040132).
Those are evidence locators from the source, not independently audited
agreement, implementation, test or release receipts.

Verified by the knowledge maintainer at review on 2026-10-28: the six cited
comments exist and match the claims above. On awebai/oats#1602 the other
side answered yes to the proposal and kept `E_SESSION_START_BUSY` for two
concurrent starts, with three build conditions. The narrowing to every
start-lock pair, with its follow-up precision, was posted by the proposing
side with "unless you object" and had no recorded answer from the other side
at review. So it is the kind of posted amendment the paragraph above says is
not acceptance, not an agreed scope. On awebai/oats#1628 both sides' yes is
recorded. #1602 was still open with no implementation merged at review.

## Package-private formats become shared contracts at the reader boundary (2026-10-27)

A format written and read only within one package may evolve inside its
lane, provided legacy input keeps its existing behavior: unambiguous old
input still works, while ambiguous old input refuses with an error naming
the fix. Package-private does not mean compatibility-free. Review who reads
the format rather than escalating every file-format edit or treating every
unlisted format as private.

Once another package or the kernel reads it, its change is a shared contract
decided by both maintainer sides. A change that needs a new kernel field or
hook variable crosses that boundary too, even if the package still owns the
file. This classifies the format dependency; it does not waive an independent
shared-behaviour direction decision or weaken published compatibility promises.

The source's precedent is the `Source:` line in an oats.okf proposal. The
lane permitted an explicit incarnation while preserving the legacy line's
unambiguous acceptance and ambiguous refusal, reusing incarnation data the
kernel already published rather than requiring a new kernel contract.
The point is the private reader/writer boundary and compatibility judgment,
not a second specification of the harvest format.

Legacy-input and ambiguity fixtures should enforce the promised behavior;
the maintainer's `direction-gate` skill owns the remaining judgment about
readers and cross-side agreement. This does not invoke the
[pre-adoption removal precedent](/nodes/oats-maintainer/decisions/clean-contract-precedent.md)
as permission to break a package's supported old inputs.

Evidence: OKF proposal from oats-maintainer/pepe-setup-maintainer, 2026-10-27; notes/reused-name-harvest-gate.md.

The source records its lane ruling on
[awebai/oats-okf#83](https://github.com/awebai/oats-okf/issues/83), identifying
comment 6441169785, and reports its application in
[#111](https://github.com/awebai/oats-okf/pull/111) with the other side's
second read. These are source-reported decision and review references, not
an independently audited implementation, test result or release receipt.

# Release-prep second reads check hand-written claims (2026-10-28)

Keep the mechanical checks that release entries were preserved and mirror
payloads match their tags, but do not treat those checks as proof of the
release's prose. The introduction, Upgrade section and provider entries
written without a per-change entry need a semantic read against the doc or
code that owns each claim. Spend the independent reader's attention there,
not only on text the release tooling carried forward unchanged. The
[provider mirror-and-pin lesson](/nodes/integrations-expert/lessons/a-provider-release-is-mirrored-and-pinned-in-one-pr.md)
owns the parity check; it is not a new procedure here.

The source reports several release-prep reads in which verbatim-entry and
tree-id checks found no issue, while hand-written text needed correction.
One Upgrade sentence incorrectly implied that upgrading a stopped home
also started its session. Checking the owning lifecycle documentation
exposed that conflation. The lesson is to verify the sentence's behavioral
claim, not to preserve another copy of the upgrade command sequence.

Automate entry preservation and mirror parity, and reduce duplicated
behavioral instructions by linking to their authoritative documentation.
The remaining editorial judgment belongs in the release-prep second-read
guidance. This is not permission to skip generated material, weaken release
gates or assume all errors occur in hand-written text; the small reported
sample establishes a useful review focus, not a general defect rate.

Evidence: OKF proposal from oats-maintainer/pepe-lfx-maintainer, 2026-10-28; notes/release-prep-second-read-checks-the-hand-written-parts.md.

The proposal identifies reads of awebai/oats#1606, #1619, #1623 and #1622 on
2026-10-27–28; the note specifically describes #1606 and the Upgrade claim
in [#1623](https://github.com/awebai/oats/pull/1623), reported corrected at
`ae2fa39e`. Review findings and the correction are source-reported, not
independently audited implementation or release receipts.

# Knowledge PRs

Strict validation proves structure, not truth. Validate the knowledge tree
from its **root** (per-node runs report cross-node links as broken) and read
validator **counts, not exit status** — an aggregate that exits zero over a
producer's warnings is a gate defect to fix, and until every gate is known to
fail on them, the reviewer reads the counts. Knowledge PRs get a **semantic
read** of changed and linked concepts: does each describe the final design, or
clearly mark history as superseded with a link? If a new concept claims
another captures the design, open that target in the PR head. A knowledge
change that alters security or identity guidance gets the security gate too,
because it changes operator behaviour. Append-only logs and pure-addition
index entries may be unioned by the maintainer, verifying every link on the
merged tree; duplicate concepts or competing rewrites return to the owning
expert. Errors in knowledge *inputs* are fixed at the source before judgement,
or an inaccuracy is accepted with full provenance and becomes harder to
dislodge than the original.

# Related

[External knowledge needs source-independent custody](/nodes/oats-maintainer/decisions/external-knowledge-custody.md);
[Release judgement for the tag-driven lane](/nodes/oats-maintainer/stewardship/release-traps.md);
[One release lane, project lanes defined by their maintainers](/nodes/oats-maintainer/stewardship/release-lane-and-project-lanes.md);
[Cross-workstream delivery](/nodes/oats-maintainer/stewardship/multi-workstream-delivery.md).

# Citations

1. Migrated from agents/oats-expert/soul/knowledge @ 7838d3ca (`decisions/dev-team-and-review-flow`, 2026-07-21/27, and the 2026-07 review lessons), with lessons from agents/dev-coordinator, agents/docs-expert, agents/oats-coordinator and agents/cli-dev knowledge @ 7838d3ca (crossed mail, stale base, reviewer deaths, schema-migration aliases, review routing, the testing-honesty family).
2. Migrated from agents/oats-expert/soul/knowledge/stewardship @ 7838d3ca (delivery-log, 2026-09-24 → 2026-09-27: squash orphan and patch verification, head-bound ACKs, human redirection recorded before review, removal sweeps and every-entry-point probes, the lone-gate re-review, additive fields and consumer-first renames, producer trust gaps, stand-in providers, one-way-call assertions, security review of knowledge changes).
3. Migrated from agents/oats-expert/soul/knowledge/lessons/window-gone-completed-vs-killed-triage.md @ 7838d3ca.
4. Harvested 2026-10-01 (paired maintainers). OKF input c15a51880924deaff3fb01859f1c90b8aa09ad3a815c75af48410a708b5862c3 (turns t1:e06654b04457084a49aa064a418ef9a08d6f2e8fd0c0090c1c0edc683f99b78a).
5. Harvested 2026-10-01 (paired maintainers). OKF input 6fe3e66661e1fb9bcef9dd2a99d0d8c0f3ebcc7aa9882e1a1d6591edc1cb899c (note maintainer-pairing-agreement.md; second-reader rationale only, not the still-proposed operating terms).
6. Evidence: OKF proposal from oats-maintainer/polaris-oats-maintainer-lfx, 2026-10-14; notes/a-human-gate-gets-a-time.md; notes/merge-rule-base-moved.md. The proposal reports human and both-side acceptance on 2026-10-13 in [awebai/oats#1103](https://github.com/awebai/oats/issues/1103), proposal comment 6150614496 and answers 6150639181, 6150651275, 6150667299, 6150671879. The first note records the lane decision and rejected duplicated tracking/notices; the second explains why changed test files, not file overlap alone, determine integration evidence. Its earlier rebase-and-reconfirmation procedure is historical evidence, not an additional current rule. Acceptance references are source-reported, not independently verified by this harvest.
7. The proposal reports the replacement procedure shipped in [awebai/oats-engineering#14](https://github.com/awebai/oats-engineering/pull/14), oats.engineering 1.10.0 at 944470be, and mirrored/pinned in [awebai/oats#1119](https://github.com/awebai/oats/pull/1119) at 9a3ae4b2. The recorded source composition confirms oats.engineering 1.10.0 at 944470be71a96299ae4a1cfb7df0fba94a592899; this harvest did not inspect the source's copied skills or independently verify the release/tag.

Evidence: OKF proposal from oats-maintainer/polaris-oats-maintainer-pepe, 2026-10-14; notes/a-path-ci-does-not-run-is-run-before-the-hand-over.md.

The note dates the initial [awebai/oats#1000](https://github.com/awebai/oats/pull/1000)
incident to 2026-10-12, rather than the proposal's 2026-10-13, and records later
qualifications for [#1056](https://github.com/awebai/oats/issues/1056) and
[#1102](https://github.com/awebai/oats/pull/1102). Runs, causes and accepted
exceptions are source-reported; this harvest did not reproduce or independently
audit them.

Evidence: OKF proposal from oats-maintainer/polaris-oats-maintainer-lfx, 2026-10-14; notes/a-batch-window-keeps-the-same-area-rule.md; notes/merge-rule-base-moved.md; notes/merge-on-old-base-run-the-combination.md; notes/a-pr-that-defers-part-of-a-decided-rule-cites-the-split.md; notes/a-real-terminal-check-is-bounded-and-cleans-up.md.

The source reports the batch failure in
[awebai/oats#1151](https://github.com/awebai/oats/pull/1151) with
[#1155](https://github.com/awebai/oats/pull/1155), fixed forward by
[#1203](https://github.com/awebai/oats/pull/1203); the unauthorized staging in
[#1164](https://github.com/awebai/oats/pull/1164) against the decision in
[#855](https://github.com/awebai/oats/issues/855); and the terminal-capture
incident during [#1193](https://github.com/awebai/oats/issues/1193). Agreement,
CI results and incidents are source-reported, not independently audited by
this harvest. The base-moved note's later qualifications are not reduced to
the proposal's earlier head-guard/clean-merge-only path for unrelated files.

Evidence: OKF proposal from oats-maintainer/pepe-setup-maintainer,
2026-10-27; notes/injection-effort-scope-gate.md. The note's later update
supersedes its initial positional-consumer-only gate for instruction
precedence. Agreement to require a decision is source-reported; this
harvest did not inspect private correspondence or decide the new order.
