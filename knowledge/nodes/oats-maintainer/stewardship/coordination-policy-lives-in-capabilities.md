---
type: Decision
title: Coordination policy lives in capabilities, not in the kernel or oats.core
description: Keep coordination policy in composed capabilities, deliver the redesign as tagged template repositories adapted into workspace-owned capabilities with a human guide (template-v tags that no package pin can resolve, the frozen package left for existing pins, the package-rename route rejected), and retain the existing cleanup and action-required lifecycle-message rules until explicitly changed.
about: [workstream/oats-direction]
id: dec-5ee56bcf899c
tags: [stewardship, coordination, capabilities, instructions, retirement, templates]
timestamp: 2026-11-10
---
**Owner: oats-maintainer. Update-on-change: whoever changes this coordination
boundary records the new decision and its rationale here.**

# Decision and rationale

The source reports product-owner direction on 2026-10-27 applying the
capability boundary to automatic retirement as well as shared-work flags.
The kernel and `oats.core` supply and neutrally describe mechanisms; the
team's composed capabilities decide when its agents use them. For OATS's
engineering process, guidance about when a parent retires finished children
belongs in `oats.engineering`, not in `oats.core` or kernel instructions.

This is not a flag-specific exception. Putting a team's coordination policy
in generally composed operating instructions imposes that process on souls
that never selected it. Keeping the mechanism neutral lets teams compose
different processes without teaching contradictory rules in the common layer.
It applies the existing
[kernel/capability responsibility boundary](/nodes/oats-kernel-expert/decisions/kernel-and-capability-responsibility.md);
the [shared-work decision](/nodes/oats-maintainer/decisions/parent-child-lines-require-declared-shared-work.md)
remains the canonical home of that flag's semantics and engineering convention.

# Delivery direction: templates become workspace-owned capabilities (2026-11-02)

For the [coordination redesign](/nodes/oats-maintainer/stewardship/coordination-redesign-precedes-adaptive-onboarding.md),
OATS supplies templates that onboarding adapts into the workspace's own member
capabilities, rather than a coordination package pinned for each use case.
Every template carries a human-facing guide, and onboarding ends by explaining
how the human interacts with the resulting agents.

The rationale is variation in use: a team software project, an individual's
application, personal scheduled-agent work and research fan-out need not share
one process. Workspace ownership lets the coordination text fit the use;
the guide makes the result usable without requiring the human to discover
its organisation unaided. Review should reject per-use-case coordination
packages as the delivery model for this redesign, not move the policy into
neutral core instructions.

This refines **delivery and ownership of the text**, not the capability
boundary above. It is not a ban on packages generally, nor evidence that
existing coordination packages have been removed. The adaptive-onboarding
step waits on the templates as part of the already-recorded coordination
outcome dependency. At this capture no delivered template, completed trial or
installed workspace change was certified; the
[2026-11-09 record below](#delivered-as-tagged-template-repositories-the-package-rename-route-rejected-2026-11-09)
records the first deliveries. Current operating rules remain until
explicitly changed.

Acceptance is **source-reported**: Pepe in the coordination-rethink lead's
session on 2026-11-02, relayed to the source maintainer by that lead in mail
83131d00 that day. Neither the session nor the mail was inspected. The source
reports a pre-trial direction; trials test its shape, not whether that
direction was given.

Evidence: OKF proposal from oats-maintainer/release-maintainer-pepe,
2026-11-02; notes/coordination-ships-as-templates.md.

## Delivered as tagged template repositories; the package-rename route rejected (2026-11-09)

**State, 2026-11-10.** The first coordination template is delivered:
oats-project/oats-engineering-coordination, `template-v2.0.0` (2026-11-09),
followed by `template-v2.1.0` and `template-v2.2.0`. The second,
oats-project/oats-research-coordination, released `template-v1.0.0` and
`template-v1.0.1` on 2026-11-10 by the same procedure. One repository holds
one template; the source reports scientific-research coordination planned as
its own repository. A template repository carries the guide and the
capabilities and souls a workspace copies, and deliberately **no OATS package
manifest**. The `oats.engineering` package stays frozen in
oats-project/oats-engineering at `v1.18.0`, catalog entry and aliases
included, so existing pins keep resolving; retiring it later is still open.
The tags, the merged PRs and the `v1.18.0` tag were read on the forge at
harvest on 2026-11-10; whether any workspace has copied a template, or the
pin has been removed from OATS's own workspace, is not certified here (the
source reported neither at capture; the
[review lesson of 2026-11-09](/nodes/oats-maintainer/stewardship/review-protocol.md#an-adapted-template-answers-its-release-markers-with-the-lane-map-never-with-a-stricter-per-person-gate-2026-11-09)
separately records a copy PR read as merged).

**Coherence rule: a template release is tagged `template-v<version>`, never
`v<version>`.** A template repository has no package manifest, so a package
pin cannot resolve one of its releases; the tag shape makes that visible and
keeps the two delivery forms apart. The source reports that pointing the
`oats.engineering` pin at the template fails `oats sync` with
`E_PACKAGE_MANIFEST` (cause `E_REMOTE_PATH_MISSING`) and writes no lock, in
a scratch run on OATS 0.69.12 recorded in the first template PR's
description (read on the forge); it was not re-run at the tag. **Review
consequence:** reject a `v*` tag, or an OATS package manifest, in a template
repository. A copy records the release it came from, so an adaptation can be
read against its tag
([verify a template adaptation twice](/nodes/oats-expert/lessons/verify-a-template-adaptation-by-its-diff-against-the-tag-and-the-authorities-it-grants.md)).
How a template release is cut is release judgement:
[a template repository is cut by an annotated tag on its prep merge commit](/nodes/oats-maintainer/stewardship/release-traps.md#a-template-repository-is-cut-by-an-annotated-tag-on-its-prep-merge-commit-2026-11-09).

**Rejected alternative: rename the package.** The same day's plan was to
rename `oats.engineering` to `oats.engineering-coordination` at v2.0.0, a new
package major, with a kernel package-id move table so that existing pins and
soul keys carried over. Pepe rejected it on 2026-11-09: coordination is
adapted per organisation, so a pinned package is the wrong delivery form,
whatever its name. Leaving the package frozen needs no kernel change and
breaks no existing lock; a workspace moving off the pin does a few hand
steps, its host `souls.launch` keys first, which the template's CHANGELOG
("From v1.18.0") and the pin-removal release note list, not this record.
Acceptance is **source-reported**: Pepe in the coordination lead's session on
2026-11-09, relayed to the source by that lead as a decision made with Pepe;
the session was not inspected. This applies the 2026-11-02 direction above;
it supersedes nothing accepted in this base, since the rename plan was never
recorded here.

What the rejected route would have cost is worth keeping, so nobody proposes
it as cheap. An OATS package id is recorded wherever deployments name it:
soul selectors, host `souls.launch` and `souls.disabled` keys, team-policy
keys (exact and `<old>/*`), schedule and trigger soul names, and the homes
recorded under the old id. The source verified that impact list in a scratch
deployment: without a kernel move table resolving the old id at read time,
the rename becomes a per-machine hand checklist on every adopter's machine (a
stale `souls.launch` key blocks every spawn; a stale `/*` team key is ignored
silently; schedules and triggers fail at every poll). The source records the
maintainers' view (Juan's side and the release lane, 2026-11-09,
source-reported) that any future official package-id rename ships such a
table no later than the renamed pin, or ships the new content under the old
id as a major version and renames later; a rename with a migration checklist
in the release notes was rejected. That is recorded as the rejected route's
requirement and the maintainers' position, not as an accepted kernel
contract. The npm-side rename trap is separate:
[a package rename is a republish, not a move](/nodes/oats-maintainer/stewardship/release-traps.md#a-package-rename-is-a-republish-not-a-move-2026-10-30).

Evidence: OKF proposal from oats-maintainer/release-maintainer-pepe,
2026-11-10; notes/coordination-ships-as-templates.md;
notes/package-rename-ships-with-a-move-table.md. The template tags and their
merge commits, the first template PR's E_PACKAGE_MANIFEST evidence and the
`v1.18.0` tag were read on the forge; the reviews, the human's words, the
scratch deployment and the hand-step count are source-reported.

# Review consequence

When a change adds guidance about **when** to act to a kernel block or
`oats.core`, distinguish a mechanism's requirements from a coordination
policy. Move the latter to the capability that owns the process. Core may
need an authority clarification so a composed capability can authorize the
action alongside a task or the human, but that clarification must not teach
the capability's policy itself or independently authorize an action.

The rejected retirement design placed a mandatory parent-retirement rule in
the core inject and a checklist defining finished work in `oats-operate`.
Moving only the checklist out would leave the policy in the wrong layer.
Neutral documentation of the retire mechanism is not the rejected policy;
this decision does not remove lifecycle operations or their safety requirements.

The operating review belongs in the maintainer's `direction-gate` skill.
Structural composition tests should check which capability owns a protocol;
semantic neutrality still needs review, as the
[composed-text lesson](/nodes/oats-kernel-expert/lessons/kernel-composed-text-is-executable-surface.md)
explains. This harvest changes no skill and claims no new enforcement.

# OATS delegates finished-worker retirement (2026-10-27)

The source reports that the release lane's human directed this division of
responsibility and directly confirmed it to the source maintainer that day:

- Experts retire their own developers once the developer's work has merged.
- A lane maintainer retires its own child experts once their effort is done
  and its PRs have merged; the parentless case follows the explicit
  2026-10-28 supersession below.
- Neither waits for a new human request for each such retirement.

The reason is operational ownership, not eagerness to delete instances:
waiting for the human to initiate each cleanup had left finished workers
running. The retirement/resume incident made that backlog more visible but
is not the basis of the delegation. The maintainer closes its own lane's
finished effort rather than making routine cleanup another human queue.

This is OATS's engineering policy, not a universal rule for all souls or
permission over unrelated instances. It adds the delegation to the existing
capability-placement decision without moving policy into the kernel or
`oats.core`. Operational conditions and the cleanup procedure belong in the
composed engineering/maintainer guidance (`keep-it-clean`), not in a second
checklist here. The applicable lifecycle, work-preservation and knowledge
capability requirements still apply; merged work does not waive a refusal.
This record does not establish that the policy has shipped into every home.

Evidence: OKF proposal from oats-maintainer/polaris-oats-maintainer-kernel,
2026-10-27; notes/retire-authority.md. Human acceptance and the reported
same-day use are source-reported, not independently audited correspondence.

## Human-spawned leads and standing maintainers

**Supersession, 2026-10-28.** The earlier, human-directed assignment recorded
on 2026-10-27 made the reporting lane's maintainer retire a finished lead
spawned directly by that lane's human, even without an OATS parent. That
assignment is superseded: in OATS's engineering process a finished lead with
no OATS parent sends its done line to the maintainer it reports to and then
retires itself. This covers both a directly human-started lead and a lead
spawned with an unrelated relation. A maintainer retires only its own
children, not a non-child lead merely because the lead reports to it.

The source reports direct product-owner acceptance on 2026-10-28 of this
self-retirement option on the source's recommendation. It reaches the same
no-human-cleanup outcome with one rule for parentless leads while preserving
the own-children-only boundary for retiring another instance. The rejected
alternative retained maintainer retirement of a non-child lead: it needed a
second retirement path and conflicted with that boundary. Leaving a finished
parentless lead waiting for the human is not the replacement policy.

Standing lane maintainers remain excluded: they are long-running lane owners,
not finished effort leads, and leave only under their own lane-leaving rules.
The supersession changes who performs finished-lead cleanup, not its
finished-work, lifecycle, preservation or knowledge gates. It grants no
power over unrelated instances and is not universal policy for every soul.
The procedure remains in composed engineering/maintainer guidance, not a
new core rule or a second operational checklist here.

Historical evidence: OKF proposal from oats-maintainer/pepe-setup-maintainer,
2026-10-27; notes/maintainers-retire-finished-experts.md. The source attributed
the former bounded assignment to the release lane's human, relayed through
that lane; that acceptance record is retained, not silently rewritten.

Evidence: OKF proposal from oats-maintainer/pepe-setup-maintainer, 2026-10-28;
notes/maintainers-retire-finished-experts.md.

This explicitly replaces a human-accepted assignment. Acceptance is
**source-reported (relay at
[awebai/oats-engineering#28](https://github.com/awebai/oats-engineering/pull/28#issuecomment-6468930552))**,
checked at maintainer review on 2026-10-30. The relay sets this option against
the 2026-10-27 assignment, names that assignment as the same human's rule and
reports the human leaving the choice to the source's recommendation. It is the
source's report of that session, not the human's own record.

# Human communication is for required action (2026-10-28)

The source reports direct product-owner direction that routine spawning,
finished-worker cleanup and completion reporting should remain between
agents. A human should hear what they must decide, approve or provide, not
receive a progress report solely because they originally requested the
work. Done lines go to the parent agent, or for a parentless lead to its
reporting maintainer; reporting to a maintainer does not make that maintainer
its OATS parent or transfer the lead's self-retirement duty.

This extends the retirement rationale to the surrounding guidance: removing
per-retire permission requests is insufficient if routine requester notices
recreate the same human coordination queue. Review requester-facing language
for whether it asks for a real human action. Routine outcome and launched-lead
notices go to agent requesters; an actual need for a human to start a stopped
maintainer, deal with a new standing maintainer seat, or act on cross-lane
routing remains visible. The test is required action, not the label of the
notice. It neither suppresses failures needing human help nor removes
standing-maintainer lane-leaving rules.

Keep this policy separate from authority. The task, human or composed
capability must authorize a spawn; a capability-authorized helper does not
need a fresh human permission round solely because it is a spawn. Resolve
an unclear relation with the parent or task-giving agent before escalating
the remaining uncertainty to the human. Neutral core authority documentation
can support this without adopting OATS's communication policy.

This is not a never-wait mandate and does not override an explicit approval,
direction, safety or preservation gate. It does not change cross-side review
or hold rules, which remain governed by the
[review protocol](/nodes/oats-maintainer/stewardship/review-protocol.md).
The review judgment belongs in the existing `direction-gate` skill and the
operational routing in composed engineering guidance, not a parallel
knowledge procedure; no new skill or enforcement is delivered here.

Evidence: OKF proposal from oats-maintainer/pepe-setup-maintainer, 2026-10-28;
notes/maintainers-retire-finished-experts.md. The product-owner direction is
source-reported, not independently audited correspondence.

The source identifies merged changes in
[awebai/oats-engineering#28](https://github.com/awebai/oats-engineering/pull/28),
[#29](https://github.com/awebai/oats-engineering/pull/29) and
[awebai/oats#1621](https://github.com/awebai/oats/pull/1621), but explicitly says
they were not yet released or deployed at proposal time. These are
source-reported implementation references, not this harvest's verification
of shipment or the instructions present in any home.

# Evidence and limits

Evidence: OKF proposal from oats-maintainer/pepe-setup-maintainer, 2026-10-27; notes/coordination-policy-lives-in-capabilities.md.

For the original 2026-10-27 capability-placement decision, the source
attributes the retirement direction to the product owner, relayed by the lead
during [awebai/oats#1580](https://github.com/awebai/oats/pull/1580), and
distinguishes it from the earlier shared-work direction. Acceptance is
source-reported, not independently audited here. At that earlier capture the
core change and engineering retirement change were not yet merged. The
2026-10-28 evidence above separately records the later source-reported state.
This records decisions and rejected designs, not a live shipment ledger, an
operational retirement checklist or permission to retire any particular
instance.
