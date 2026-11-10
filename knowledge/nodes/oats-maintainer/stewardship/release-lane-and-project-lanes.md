---
type: Decision
title: One release lane does the final review, merge and tags; project lanes are defined by their own maintainers
description: One release lane owns final review, merge and tags; project maintainers define lanes without sign-off, route follow-ups by the map, review with one second reader, record changed practice and hand over approved heads, while the directing human's lanes launch routine filed work without asking again; child overflow preserves accountability and the onboarding redesign has bounded human-sign-off and reviewer-routing exceptions.
about: [workstream/oats-direction]
id: dec-1d2a5106b721
tags: [stewardship, lanes, release, review, process, multi-human]
timestamp: 2026-10-30
---
**Owner: oats-maintainer. Update-on-change: whoever changes the lane map's
rules, the routing judgment, the release lane's ownership or the
second-reader rule revises this concept in the same change.** The lane map
itself lives in the repository with the release lane, not here.

# Decision

Decided by the release lane's human on 2026-10-26 on
[awebai/oats#1103](https://github.com/awebai/oats/issues/1103), relayed by
the release lane, after a new maintainer on a third human's machine asked
for a lane.

- **One release lane.** It does the final review, the merge and every tag,
  and keeps the lane map. The default branch is protected by this one
  final-review gate.
- **Every other lane is a project lane.** A maintainer defines one by adding
  its line to the map (name, label `lane:<name>`, what it covers, its
  maintainers, its human) and labelling its PRs. No sign-off is needed; a
  human may launch maintainers into it.
- **Inside its lane** the maintainer launches work, reviews, and gets each PR
  its one second reader; at the approved head it hands the PR to the release
  lane.
- Contracts are still decided before they are built, whatever the lane.
  Earlier lanes keep their recorded arrangements until their humans change
  them.

# Why

The earlier lane model made every new human's side a decision of the release
lane's human: a new maintainer asked the release lane which lane was its own,
and a third human joining with their own machine and goals had to wait for a
lane assignment by hand. What protects the default branch is the single
final-review gate, not centralising who defines the project lanes above it.
Any deployment that composes `oats.maintainer` with several humans meets the
same situation.

# Overflow adds capacity, not another authority (2026-10-27)

The source reports direct acceptance by the lane's human on 2026-10-27 of
help **as the lane maintainer's child**, after the other human's side
objected to an independent second maintainer. With more than five efforts
in flight, the lane maintainer can spawn an overflow seat:

- it is listed inside the parent's lane-map entry, with no entry of its own;
- it drives its assigned efforts through specs, developers and PRs up to
  hand-back;
- it has no merge, second-read, sign-off-request or contract-answer
  authority, and never spawns another overflow seat;
- its parent retires it like a finished child; it does not retire itself
  when idle.

One accountable maintainer per human per lane still holds. The parent keeps
those review and coordination responsibilities; this does **not** give a
project-lane parent the final merge or tag authority reserved above for the
release lane. The accepted cost is that review and merge load is not relieved:
this delegation relieves launching and tracking instead.

This refines the one-maintainer rule, not the release-lane boundary. The
rejected equal-authority second maintainer would split accountability and
conflict with the existing newcomer-stands-down and lane-split rules.
Idle self-retirement was also rejected: it was not part of the human's
request and would turn extra capacity into a separate lifecycle authority.
The operating terms belong in the lane map and maintainer skills, not a
second roster here.

The source's later overflow note records the child-form acceptance; the
scope-gate note still contains the earlier objection and pending-decision
stage. At proposal time the amended map bullet and skill text were not yet
edited or merged. This records the reported decision and its rationale,
not completed implementation or a release.

Recorded at maintainer review on 2026-10-30: the acceptance is
**source-reported (relay at
[the lane map](https://github.com/awebai/oats/issues/1566))**, not verified
as the human's own record. The map the release lane keeps says the child form
was decided by the human and the other side on 2026-10-27, and its edit
history shows the independent form, the other side's objection, then the child
form. That human also took the 2026-10-26 decision above, so this is that
human's refinement of their own decision. The map now carries these terms, and
the [maintainer skill](https://github.com/awebai/oats-engineering/blob/3a8dbb9d4a17314c77886ad7371254b1991fe560/oats-package/capabilities/maintainer/skills/cross-review-peer/SKILL.md)
has since added two: at most one seat until it is retired, and the seat
reviews each PR at its head before handing it to its parent. That moves part
of the review load the accepted cost above says stays with the parent; second
reads, the hand-over, sign-off and the merge stay with the parent. The map and
skill own the terms; this section keeps the decision and why.

# One product lane replaces separate kernel and Desktop lanes (2026-10-28)

The source reports that the release lane's human chose `lane:product` on
2026-10-28, replacing `lane:kernel` and `lane:desktop`, with one maintainer
per human for the combined area instead of one per former lane; further
capacity for open-feature load is the map's overflow seat. The choice joins
kernel/CLI work with its Desktop, TUI and shared-client consumers, including the
Omarchy integration. The current lane map owns the exact coverage and
staffing; this is the decision record, not another roster.

The source's rationale is that contract and client changes repeatedly cross
that boundary: separate lanes require repeated cross-lane second reads,
whereas one maintainer can carry the contract and its consumers together.
This explanation, and the counterfactual of keeping two lanes with a kernel
reader on contract-touching Desktop PRs, are **the source maintainer's
interpretation**, not separately evidenced human reasoning or an explicitly
human-rejected alternative.

This supersedes the two-lane split, not its recorded release arrangement.
The source reports that the combined lane retains the earlier lanes'
permission to merge only after release-lane sign-off, with the release lane
as second reader; Omarchy tags also stay with the release lane. This is the
existing-arrangements qualification above, not new independent merge or tag
authority for every project lane. Adding maintainers for workload creates
no further release authority; this record does not decide the separate
overflow-seat operating terms.

Evidence: OKF proposal from oats-maintainer/pepe-setup-maintainer,
2026-10-28; notes/product-lane-replaces-kernel-and-desktop.md. The source
attributes the choice to the release lane's human, relayed by that lane,
and identifies the [lane map](https://github.com/awebai/oats/issues/1566)
and [soul-list update](https://github.com/awebai/oats/pull/1624). Acceptance,
the preserved arrangement and those updates are source-reported, not
independently audited correspondence or implementation receipts.

Verified by the knowledge maintainer at review on 2026-10-28: the lane map on
[awebai/oats#1566](https://github.com/awebai/oats/issues/1566) records
`lane:product` opened on 2026-10-28 on a human's recorded word, replacing
`lane:kernel` and `lane:desktop`, merging once the release lane has signed
off at that head, with the release lane's maintainer as second reader
and awebai/oats-omarchy tags staying with the release lane; the
[soul-list update](https://github.com/awebai/oats/pull/1624) is merged. The
human's choice is therefore publicly recorded, not only source-reported. It
changes an earlier lane's arrangement, which the 2026-10-26 decision above
leaves to the humans; that decision itself is unchanged, not superseded. The
rationale paragraph above remains the source's interpretation.

# Routine follow-ups do not need another human launch decision (2026-10-28)

The source reports a direct human clarification on 2026-10-28: for that
human's project-lane maintainers, launching filed bugs and gaps in their own
lane does not need another request for permission. The maintainer chooses
how to route that work and how many leads it needs within the lane's
existing arrangements. The reported prompt concerned one lead for five
filed follow-ups; a predecessor's unanswered request for the same routine
launch had left the work waiting for a day. Recreating that human queue
adds no direction decision.

This clarifies the inside-the-lane launch responsibility above, not the
release boundary. Escalate direction that recorded decisions do not settle,
shared contract changes for both sides to decide, and acts needing authority
not already held, including a merge without the required second read,
deployment or tagging. An escalation is not permission to bypass those
gates. Work explicitly parked by the human stays parked until that human
releases it; an unanswered request is not consent.

The clarification is scoped to the directing human's lanes, not a new
policy for every human or an unlimited-capacity exemption. Resolve ownership
and already-covered efforts using the routing rule below. It changes no
second-reader, overflow-seat, final-review, merge or tag authority and does
not let routine-work delegation settle a contract on either human's behalf.
For the distinct agreement-record lesson, see
[contract decisions on the issue](/nodes/oats-maintainer/stewardship/review-protocol.md#contract-agreement-stays-on-the-issue-through-implementation-2026-10-28).
The residual escalation judgment belongs in maintainer launch and direction
guidance, not in neutral kernel policy or a duplicate lane map.

Evidence: OKF proposal from oats-maintainer/product-maintainer-pepe,
2026-10-28; notes/launch-lane-followups-without-asking.md. The source
attributes the clarification to its lane's human in that day's session.
Acceptance, the earlier delay and subsequent launches are source-reported;
this harvest did not inspect the session or certify a guidance change.

# Onboarding redesign delegation (2026-10-30)

**Reviewer routing superseded later the same day:**
[the release-only review decision](/nodes/oats-maintainer/stewardship/onboarding-redesign-release-only-review.md)
replaces the area-lane reviewer assignment and release-plus-product contract
participation below with the release lane alone on Pepe's side. It records
source-reported acceptance by the same human, with a checked public relay.
The original routing below is historical; the release delegation, its limits
and acceptance history remain current. The new decision owns the current
reviewer assignment, design responsibility and return grounds.

For the [onboarding redesign brief](https://github.com/awebai/oats/issues/1665),
Pepe initially chose Juan's side to build and his own lanes to review
against the brief and OATS vision, rather than drive the implementation
themselves. The arrangement is specific to this effort:

- Implementation PRs use `lane:juan`. **Original reviewer routing, now
  superseded:** they named the area lane they touched, whose maintainer on
  Pepe's side reviewed without seeking his sign-off on each verdict. The
  current map and brief own assignments, not a second roster here.
- Contract changes are decided by both sides **before** implementation.
  **Original participants on Pepe's side, now superseded:** the release
  lane and `lane:product`. Delegated PR verdicts do not supply a missing
  contract agreement.
- Once the required reviews are green, the release lane coordinates and
  tags this effort's releases without another go from Pepe. His later direct
  clarification includes kernel tags and deploys for this effort; it is not
  merely permission to give PR verdicts.
- Every other kernel tag still needs Pepe's direct go, and every other
  deploy his word: the standing authority in the
  [release lane's 2026-10-28 hand-over](https://github.com/awebai/oats/issues/1566#issuecomment-6475980012).
  The release lane's final review, merge and tag ownership and the usual
  verification gates are unchanged. The later release-only review decision
  changes who supplies the read on Pepe's side, not the general
  second-reader rationale. No project lane gains independent release authority.

The human's stated review bar is
[optional, provider-neutral human attribution with no-human compatibility](/nodes/oats-maintainer/decisions/human-attribution-is-an-optional-messaging-contract.md),
with onboarding skills and flows matching the design. The source's reason
for preserving this delegation is that a later maintainer should neither
recreate a redundant human sign-off queue nor mistake an authorized
onboarding tag for a general relaxation of release authority.

**Acceptance and supersession limits.** Acceptance is **source-reported**:
Pepe, directly in the release lane's session on 2026-10-30, clarified the
scope to include kernel tags and deploys. That later clarification
supersedes the backing note's earlier interpretation that the relayed
no-sign-off direction covered only PR verdicts. For this effort only it
replaces the separate kernel-tag go and deploy word that hand-over records;
it does not supersede the general lane model or its contract-before-build
boundary. The [public brief](https://github.com/awebai/oats/issues/1665),
read during harvest on 2026-10-30, confirms an agent's relay of the
build/review split and release coordination after green verdicts:
**source-reported (relay at the brief)**, not verified human authorship. The
explicit tags-and-deploys clarification rests on the source's report of the
private session, which was not audited.

Recorded at maintainer review on 2026-10-30: the relay at
[the brief](https://github.com/awebai/oats/issues/1665) exists under the
cited account and says what is claimed above. The brief speaks of
coordinating releases and names neither tags nor deploys, so that scope stays
source-reported. The standing rule itself is
**source-reported (relay at
[the hand-over](https://github.com/awebai/oats/issues/1566#issuecomment-6475980012))**,
also not verified human authorship.

At the original delegation's capture, Juan's agreement to take on the work
was still pending; this records Pepe's delegation, not a bilateral
acceptance or delivery receipt. Removing harvesters was explicitly still an
undecided leaning, so this release delegation does not authorize that change
or supersede accepted knowledge decisions. The contract and implementation
were also unfinished at that capture.

Evidence: OKF proposal from oats-maintainer/release-maintainer-pepe,
2026-10-30; notes/onboarding-redesign-juans-side-builds.md.

# Route package follow-ups by repository ownership (2026-10-28)

Opening a package-repository PR as part of a project effort does not make
that effort's lane the owner of subsequent work on the PR. Before launching
a follow-up lead, check the repository's lane in the current map and that
lane's open efforts. Route the follow-up to its maintainer; if an effort
already covers it, hand over the PR, its head and the requested work rather
than launching a second lead.

The source reports that package-repository work belonged to `lane:setup`
on 2026-10-28. Two lanes nevertheless assigned leads to the same package PR
because one lane's earlier effort had opened it. The overlap required a
handoff and withdrawal of the duplicate effort. The lesson is to resolve
ownership **before launch**, not to synchronize two implementations after
they have started. The lane map remains authoritative for assignments;
this dated example is not a permanent package-to-lane roster.

This is a maintainer lesson from source-reported experience, not part of
the human-accepted 2026-10-26 decision above. It applies that decision's
inside-your-lane boundary; it changes neither who may define a project lane
nor the release lane's final gate. The
[cross-workstream delivery lesson](/nodes/oats-maintainer/stewardship/multi-workstream-delivery.md#independence-needs-write-surfaces-not-titles-2026-09-20)
owns the broader requirement for explicit write surfaces and an accountable
integration lead. Here the additional judgment is that PR authorship is not
routing authority. Keep the map as one source of assignment; lane-aware
launch checks could prevent duplicate allocation. Until such enforcement
exists, the check belongs in the maintainer's launch and handoff guidance,
not a second roster or a kernel-wide coordination policy. No new enforcement
or skill change is claimed here.

# Record changed lane practice on the map in the same session (2026-10-28)

When an authorized change alters who merges, where a lane's PRs come from
or who supplies its second read, record it on the canonical lane map in the
same session, through the map's owner and existing review path. A private
working log is not enough: successors and authors of maintainer guidance
use the map, so an unrecorded change can be replaced by the old rule when
that guidance is refreshed. Preserve a dated reference to the decision and
its scope, not a verbatim copy of private correspondence.

The source reports that a changed merge arrangement was logged privately
on 2026-10-19 but omitted from the map. On 2026-10-27, both a soul draft and
a map draft repeated the old arrangement; a second read caught it. The
lesson is the publication gap, not the historical lane assignment. It
neither authorizes a new arrangement nor changes the release lane's map,
merge or tag authority.

Prefer guidance that points to the map over duplicated operating rules;
where a copy is necessary, make reconciliation with the canonical decision
part of the guidance change. A map-update check belongs in maintainer
handoff and policy-change guidance. Semantic agreement still needs review;
no automated freshness check or skill change is claimed here.

Evidence: OKF proposal from oats-maintainer/pepe-lfx-maintainer, 2026-10-28; notes/lanes-release-and-projects.md.

The dates, omission and later correction are source-reported from one
incident. This harvest did not inspect private logs or correspondence and
does not certify the underlying arrangement as current policy.

# What this supersedes and what it keeps

Supersedes the rule that a new maintainer asks the release lane (the keeper
of the map) which lane is its own, as recorded in the lane model on
awebai/oats#1103 and in the repository's lane documentation. At the time of
recording, the knowledge base held no such sentence: the lane-owned review
refinement then pending, since accepted in
[how the OATS project ships and reviews](/nodes/oats-maintainer/stewardship/review-protocol.md#peer-maintainers-own-lanes-each-pr-gets-one-second-reader-2026-10-13),
records one accountable maintainer per lane and one second reader per PR,
and this decision **refines, not removes,** both: one second reader per PR
and release ownership by the release lane are unchanged.
[Release judgement](/nodes/oats-maintainer/stewardship/release-traps.md)
remains the release lane's. The
[overflow seat](/nodes/oats-maintainer/stewardship/release-lane-and-project-lanes.md#overflow-adds-capacity-not-another-authority-2026-10-27)
refines the one accountable maintainer per lane recorded here without adding
a second one. The [onboarding delegation](#onboarding-redesign-delegation-2026-10-30)
adds an effort-specific exception to separate human sign-off, with its direct
acceptance source-reported. Its later
[release-only review refinement](/nodes/oats-maintainer/stewardship/onboarding-redesign-release-only-review.md)
supersedes the original area-lane routing and product-lane contract
participation for this effort only. Both leave the release lane's ownership
and all other kernel-tag and deploy approval requirements intact.

A copy of generic role text that touches releases, merges or tags answers
with this record, not with a stricter default of its own: see
[an adapted template answers its release markers with the lane map](/nodes/oats-maintainer/stewardship/review-protocol.md#an-adapted-template-answers-its-release-markers-with-the-lane-map-never-with-a-stricter-per-person-gate-2026-11-09)
(2026-11-09). That review lesson adds no authority here.

# Citations

Evidence: OKF proposal from oats-maintainer/oats-threaded-agent-ux-maintainer,
2026-10-26; notes/project-lanes-defined-by-maintainers.md. The source reports
the human's words relayed by the release lane in a comment on
[awebai/oats#1103](https://github.com/awebai/oats/issues/1103) and the first
project lane defined by its own maintainer the same day. Acceptance and the
map edit are source-reported, not independently verified by this harvest.

Evidence: OKF proposal from oats-maintainer/pepe-setup-maintainer,
2026-10-27; notes/overflow-maintainer-is-a-child.md;
notes/injection-effort-scope-gate.md. The source reports the human's direct
acceptance of the child form and the other side's agreement to that form of
the [lane-map amendment](https://github.com/awebai/oats/issues/1566).
This harvest did not independently audit that acceptance or the amendment.

Evidence: OKF proposal from oats-maintainer/polaris-oats-maintainer-kernel,
2026-10-28; notes/package-repo-work-routes-to-lane-setup.md. The source
identifies [awebai/oats-okf#113](https://github.com/awebai/oats-okf/pull/113)
as the overlap and [awebai/oats#1566](https://github.com/awebai/oats/issues/1566)
as the lane map. The assignment, overlap and handoff are source-reported;
this harvest did not audit the map or private correspondence, and does not
claim fresh human acceptance, implementation or release.
