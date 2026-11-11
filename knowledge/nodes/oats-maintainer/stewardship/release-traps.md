---
type: Lesson
title: Release judgement for the tag-driven lane
description: Release judgment distinguishes publication from artifact availability, rehearses released-state upgrades, changed macOS tests and newly taught skill commands before tags, compares what each job sets up before a step that both the PR installer build and the tag workflow run, runs the kernel tests that read a package's mirror before the package tag or plans their port, contains failed-tag repairs and re-runs only a clearly timing failure from the same unpublished tag, separates one-off package patches from maintenance lines, gates package-soul adoption through catalog, explicit-tag and shared-workspace routes, holds new keys in shared member-repository souls until every reader accepts them, coordinates source, tag, mirror, every form of version pin and the framework release that carries them, pins a provider release that removes a component inside the adoption PR that rewrites the texts and kernel tests for it, pairs changes to shared instructional behaviour across separately released packages, treats a package rename as a republish whose old package is never uninstalled from a running host, cuts a template repository by an annotated template-v tag on its dated prep merge commit with its third-party notices, and plans tags around a hosted runner image's retirement brownouts.
about: [workstream/oats-direction, workstream/provider-integration]
kind: lesson
id: ins-559dbb88da8b
tags: [stewardship, release, ci, npm, packaging, pins, templates]
timestamp: 2026-11-11
---
**Owner: oats-maintainer. Update-on-change: whoever changes the release workflow,
the runnerless lane or the release skill revises this concept in the same
change.** The release procedure is the `git-tag-release` skill and the
repository's [release lane](https://github.com/awebai/oats/blob/main/docs/release-lane.md);
this concept holds only the judgement a maintainer needs when cutting a
release.

# Decisions the lane embodies

- **Tag, not manifest, is the version (2026-07-21).** CI derives the version
  from an immutable tag on a commit reachable from `main`; the manifests on
  `main` are bumped *after* publication. A local version bump is a release
  defect, not a convenience.
- **Kernel, runtime adapter and Desktop release from one tag as one version
  (2026-07-25).** Instance isolation spans kernel launch flags and adapter
  discovery, so a version drift between them is a correctness bug. The
  distribution package (`oats.framework`) is the deliberate exception: its
  tag is decoupled so capability content ships without a kernel cut
  ([official capabilities](/nodes/oats-maintainer/decisions/official-capabilities-and-reviewed-marketplace.md)).
- **Kernel first, providers floor on it (2026-09-21).** When a kernel release
  introduces manifest fields, the provider releases that declare them are cut
  after it and floor on it, because every earlier kernel's closed validator
  rejects the fields. **A breaking provider release and a kernel that refuses
  its predecessor move in lockstep** (2026-09-26: the knowledge provider's
  4.0 needed kernel 0.29, which refuses its 3.x): the release notes lead with
  the upgrade order, and old deployments keep their kernel until they move
  their pins.
- **The runnerless lane is first-class (2026-09-05).** No release capability
  may depend permanently on hosted CI or hosted messaging. A runner outage or
  an urgent release may take an explicit human risk override, and the release
  report names what was bypassed.
- **No maintenance line for a version nobody runs (2026-09-24, agreed with
  the human).** In-flight work that began against a superseded line lands on
  `main` and ships in the next release; the old release branch is left inert.

## A one-off package patch is not a maintenance line (2026-10-28)

The no-maintenance-line decision above leaves superseded development on
`main`; it does not require shipping a deliberately held change with a
needed fix. When a package's `main` already contains a change held for a
later minor, isolate the patch from the last released tag. Releasing `main`
would ship the held change; postponing the fix would leave users with the
bug. Neither follows from keeping old release branches inert.

Use a one-off release branch for a reviewed release-prep containing only the
fix and required release metadata, and tag that prep's merge commit. The
next minor's cut records the patch section on `main`; the patch branch stays
inert, with no further work targeted to it. Its existence is not a promise
to maintain the old line. This is a package-release isolation choice, not a
change to the kernel tag/reachability contract above, ordinary review gates,
or the human-accepted prohibition on ongoing work for an unused old line.

Keep the operational mechanics in the existing release skill. Release
verification should check the candidate against the selected tag and allowed
fix/metadata delta so held content cannot slip into the patch. This is a
prevention target, not automation established by this harvest; it cannot
decide whether the held change is ready or create a maintenance commitment.

Evidence: OKF proposal from oats-maintainer/release-maintainer-pepe,
2026-10-28; notes/patch-from-older-tag-is-not-a-maintenance-line.md.
The source identifies [oats-aweb#160](https://github.com/awebai/oats-aweb/pull/160)
as a patch prep from the prior release with
[#159](https://github.com/awebai/oats-aweb/pull/159)'s fix, excluding
[#158](https://github.com/awebai/oats-aweb/pull/158) held for the later minor.
This is one source-reported release, second read and tag, not independently
audited shipment evidence or a new human decision to support an old line.

## A hosted runner image's retirement brownouts can stop a tag from publishing anything (2026-10-30)

GitHub retires a hosted runner image in stages, with announced **brownout
windows** first. A job that names the image gets no runner inside a window
and is simply not run, which at a glance reads like a hang or a timeout. It
is neither: check whether a runner was ever assigned before diagnosing a
stuck job.

For OATS the cost is the **whole release**, not one job, because the tag
workflow's publish step needs the Desktop build on a named macOS image. A
tag pushed inside a brownout publishes nothing. So, when planning a tag,
check the retirement schedule of every image the release workflow names,
tag in a clear window, and move the runner before the retirement date. The
runnerless-lane decision above still governs an outright outage; this is
the scheduled, avoidable case.

The elimination route is a CI check that warns when a workflow names an
image with an announced retirement date; this lesson does not deliver it.

Evidence: OKF proposal from oats-maintainer/haiku-oats-migration-maintainer,
2026-11-04; notes/runner-retirement-can-stop-a-tag.md. The source identifies
the `macos-14` retirement
([actions/runner-images#13518](https://github.com/actions/runner-images/issues/13518))
and three jobs on
[oats#1679](https://github.com/oats-project/oats/pull/1679#issuecomment-6530256569)
that ran no steps in a window; that they passed once it closed is
source-reported. The approval comment naming the brownout was read, the job
logs were not. The tag consequence is inferred from the publish step's
dependence on the Desktop build, not an observed empty tag.

# Pair changes to shared instructional behaviour (2026-10-27)

When separately released packages both state one behaviour and a change to
only one would make composed instructions disagree, the maintainer asks the
release lane to pair both changes in the **same release window**. Treat
that shared meaning as a release dependency, even when both diffs are only
text and neither alone appears to break an API.

The source's example is retirement responsibility stated in the oats.core
inject shipped by oats.framework and in oats.engineering skills. Independent
release review can find each new text coherent while missing the interval
in which an instance composes the new rule from one package with the old
rule from the other. The source reports that the release lane paired these
changes in its plan; that is planning evidence, not proof either shipped.

This extends lockstep release judgment to instructional meaning. It does
not require coupling unrelated text edits or approve the underlying
retirement policy. Same-window publication alone also does not prove that
a deployment's selected pins compose a coherent set: the generalist's
[dependent-text planning lesson](/nodes/oats-expert/lessons/soul-text-lands-with-its-capability-pin.md)
owns that pin dependency and composed-text check. The
[ship-together evidence gate](/nodes/oats-maintainer/stewardship/multi-workstream-delivery.md#a-ship-together-set-needs-whole-set-evidence-before-its-first-merge-2026-10-27)
remains distinct from deciding which changes need pairing.

Prefer one capability-owned definition of a shared rule; where separate
texts must remain, composition checks at the intended versions can catch
known disagreements. Recording the pair in the release plan and enforcing
its dependency is the prevention route, with the remaining semantic
judgment in release review. This harvest claims no new enforcement or
skill change has landed.

# A package soul's new key is a package-wide rollout decision (2026-10-27)

A small declaration change in one packaged soul can raise the kernel floor
for **every adopter of that package**, not just users who spawn that soul.
Review the package-wide adoption consequence, not the size of the soul diff.

**Correction, 2026-10-28:** the earlier account said that the floor excludes
an older deployment from the package release altogether, rather than causing
a later spawn refusal. The source-reported released-kernel rehearsal on
**0.68.1** contradicts that failure-stage description: sync still locks the
new package and reports the unknown soul key as a schema problem. Discovery
drops that soul (`E_SOUL_UNKNOWN`); the raised capability floor refuses new
spawns that compose the package (`E_CAPABILITY_INCOMPATIBLE`), with a re-pin
remedy. Existing homes keep their captured composition and continue running;
that is not a guarantee that their later service spawns will succeed.

For adoption advice, distinguish **locked** from **usable for the next
spawn**. Do not promise that sync itself will block the incompatible release.
The failure-stage finding is limited to the reported old-reader experiment,
not every earlier kernel or every command.

**Rollout refinement, 2026-10-28:** supersede the earlier requirement that
every affected side already run the accepting kernel **before the package
PR merges**. Ask each side **how it takes the package**, not just which
kernel it runs. The compatibility gate belongs where the deployment adopts
the floor-raising release:

- A catalog-following deployment can remain on an older kernel while the
  package change merges, provided the release lane moves the catalog to the
  new package release only in a kernel release at or above its floor.
- An explicitly chosen tag can also keep an older deployment on a compatible
  package. The tag is not an exemption: selecting the floor-raising tag
  requires an accepting kernel. Independently advancing the package ahead
  of that kernel exposes the deployment to the refusal described above.
- **Shared-workspace refinement, 2026-10-28:** ask whether **any deployment**
  follows the project's own workspace definition, not only how product
  deployments take packages. A deployment following
  `workspace: git:github.com/awebai/oats` takes the pins in that repository's
  `oats-workspace.yaml` at its next sync. Those pins move when the PR merges,
  before a kernel tag: hold every PR that advances them to the floor-raising
  package with the `hold` label until the affected side confirms that the
  consuming deployment runs a kernel at or above the floor. This includes
  the framework prep carrying the okf pin with onboarding text, not just the
  kernel prep. A published accepting kernel alone does not lift that hold.
- Keep each affected side's own second-read approval and record its adoption
  routes across deployments and the applicable catalog or workspace-pin
  condition. Under those conditions,
  a side below the new floor need not hold the package merge merely until
  it upgrades. Unknown adoption routes are not evidence of protection.

This separates source merge from adoption rather than coupling a ready PR
to every deployment's upgrade schedule. The shared-workspace route narrows
the earlier catalog/tag framing: a side's catalog answer can be correct for
its product deployments while omitting its own maintainer deployment. Hold
the PR that changes the consuming workspace's pins, regardless of which
release prep it is called; a hold on only the later kernel prep is too late.
It does not relax the kernel-first
package-release order above, authorize an upgrade or certify that any
particular deployment is ready. A published accepting kernel and a green
probe still do not prove that the deployment taking the new package runs it.
The real-kernel rehearsal at the declared floor remains release evidence:
record it in the package release PR before the tag, not as a substitute for
compatible deployment selection.

Moving the new behavior into an unconditional spawn-time flag in a skill
is not a compatibility escape. That route still requires a feature check
against the kernel that will execute it. A different place to spell the
request does not make an older kernel understand it.

The motivating case was the background default for packaged service souls.
The original 2026-10-27 proposal described a draft, gated change. The later
2026-10-28 proposal reports that both package PRs merged after a second
reader below the new floor approved on catalog/tag-selection grounds and the
release lane accepted the catalog condition. This is one rollout across two
packages and one other maintainer side, not a universal safety guarantee.
Exposure from independently pinning ahead of the kernel is inferred from
the accepted refusal findings, not an observed deployment failure in this
rollout. Keep exact versions in release artifacts, not a second version
ledger here.

Enforce declared-floor consistency and supported-kernel compatibility in
validation and CI, including released-reader checks that distinguish locking,
soul discovery and composition refusal. At catalog changes, check the selected
package floor against the kernel release carrying it. Include shared-workspace
pin changes in compatibility review and hold enforcement rather than keying
the gate only to kernel-prep PRs. These are prevention targets, not enforcement
delivered by this harvest. The remaining judgment is the deployment's actual
adoption route and second-read agreement; tests
cannot establish those or prove an installed upgrade. The integration
[released-refusal lesson](/nodes/integrations-expert/lessons/package-kernel-floors-need-released-refusal-probes.md)
remains canonical for the experiment, not the maintainer's rollout gate.

Evidence: OKF proposal from oats-maintainer/polaris-oats-maintainer-kernel,
2026-10-27; notes/background-instances-gate.md. The package-wide consequence
and merge gate are source-reported from
[awebai/oats-okf#113](https://github.com/awebai/oats-okf/pull/113), not an
independently audited validator or rollout receipt.

Evidence: OKF proposal from oats-maintainer/pepe-setup-maintainer,
2026-10-28; notes/package-soul-new-key-floor.md. For the correction, the source
identifies the rehearsals in
[awebai/oats-okf#113](https://github.com/awebai/oats-okf/pull/113) and
[awebai/oats-cloning#6](https://github.com/awebai/oats-cloning/pull/6).
The earlier proposal named accepting-kernel 0.69.2 checks and said neither
package PR had merged at that capture; those checks do not establish failure
behavior on additional old kernels.

Evidence for the rollout refinement: OKF proposal from
oats-maintainer/pepe-setup-maintainer, 2026-10-28;
notes/package-soul-new-key-floor.md (updated capture). The source identifies
the adoption-route explanation on
[awebai/oats#1579](https://github.com/awebai/oats/issues/1579#issuecomment-6477062124),
the second reads on
[oats-okf#113](https://github.com/awebai/oats-okf/pull/113#issuecomment-6477061036)
and [oats-cloning#6](https://github.com/awebai/oats-cloning/pull/6#issuecomment-6477061574),
and the release lane's catalog condition on
[the okf PR](https://github.com/awebai/oats-okf/pull/113#issuecomment-6477113344)
and [the cloning PR](https://github.com/awebai/oats-cloning/pull/6#issuecomment-6477113895).
Approvals, adoption routes and merges are source-reported, not independently
audited receipts. The note records a request for the cloner's real-kernel
rehearsal before the tag, not proof it completed. This harvest did not run
the binaries, inspect deployments or establish release readiness.

Evidence: OKF proposal from oats-maintainer/release-maintainer-pepe,
2026-10-28; notes/package-floor-gate-met-by-pins.md. The source identifies the
[release-plan adoption question](https://github.com/awebai/oats/issues/1571#issuecomment-6477231538),
[the shared-workspace answer](https://github.com/awebai/oats/issues/1571#issuecomment-6477261137)
and [the framework-prep precedent](https://github.com/awebai/oats/pull/1607).
This extends the earlier catalog/tag account with one source-reported
rollout and one other side. The hold had not been lifted at capture; no
installed upgrade, completed rollout or independent deployment inspection
is certified here. The workspace/package distinction remains in its
[canonical decision](/nodes/oats-maintainer/decisions/workspace-definition-is-not-a-package.md),
not a second workspace specification in this lesson.

# Shared-soul keys wait for every reader

The 2026-10-27 background-instance gate adds the deployment-side consequence
of kernel-first release order: **a soul committed to a shared member
repository gains a new schema key only after every deployment reading that
soul runs a kernel that accepts it**. A released parser is not an installed
parser. Otherwise a shared soul can become unreadable to a still-old
deployment even though the feature's kernel release exists.

Maintainer review scope, 2026-10-30: the proposal said "a committed soul".
The gate holds where a deployment reads the soul from the member repository
itself, so merging is adoption. A packaged soul has a catalog, tag or pin
between merge and reader: the
[package-soul section](/nodes/oats-maintainer/stewardship/release-traps.md#a-package-souls-new-key-is-a-package-wide-rollout-decision-2026-10-27)
owns that case, and its 2026-10-28 refinement moved the gate to where the
deployment adopts the release. This section restores no pre-merge gate there.

The source cites the earlier launch-declaration rollout as precedent. This
is not an automatic upgrade authorization or a claim that those deployments
have moved. Keep deployment acceptance evidence in the rollout, and make
schema compatibility a checked adoption gate rather than a memory-only
warning. The [background decision](/nodes/oats-maintainer/decisions/background-is-presentation-not-lifecycle.md)
is the motivating application, not a second home for the general rule.

# Publish first, housekeep second

Registry publication is idempotent per version and cannot be undone, which
fixes the order of everything else:

- **Irreversible publication runs before fragile housekeeping.** Workflow-bot
  PR creation is denied by an **organisation-level Actions policy**, not the
  repository toggle, so the workflow's bump-PR step fails by design: treat
  that failure as expected, not as a signal, and open the bump PR by hand from
  the branch the workflow pushed. Its merge gate differs from every other
  PR's — it carries `[skip ci]` and never gets checks, so the gate is a diff
  of exactly the version manifests and locks at the tag's version; anyone
  waiting on its CI waits forever.
- **Never retag a burned version.** Publish skips an already-live version, so
  a partially shipped version cannot be re-tagged to ship the rest — cut a
  fresh patch. A recut *before* publication is the only legitimate reuse of a
  version. **Registry propagation lag is not a failed publish:** a version
  can take minutes to become visible; a "not found" in that window is a
  reason to wait and re-query, never to retag or republish.

**Refinement, 2026-10-14:** metadata visibility and tarball availability are
separate observations. The source reports that 0.55.0's metadata, tag commit
and checksum were visible while its kernel tarball still returned 404 for
about seventeen minutes; the tarball then arrived with the expected checksum.
That interval is not evidence that publication failed. Recheck artifact
availability without publishing again; verify the served bytes against the
published checksum before the clean-install check. Do not treat metadata
alone as successful artifact verification, or seventeen minutes as a bound.
Release-verification automation should handle delayed availability explicitly
and leave verification incomplete when its bounded check cannot obtain the
artifact. This extends the existing no-republish rule, not a retry permission.

**Refinement, 2026-11-11:** the lag has two more faces, and a fixed
reference to read it against. First, inside the window the packument's
`latest` can still name the previous version while the new version's own
endpoint answers not found: a stale `latest` is the same lag, not a failed
dist-tag. Second, the release workflow's documented order publishes npm
before it creates the GitHub Release, so a live Release for the tag beside
a registry that does not yet serve the version is the expected shape of the
window, not a partial publication; partial-publication recovery starts by
observing what was published, and an observation taken inside the window
makes a clean release look partial. Third, the claim to verify is the
publish log's own `npm notice version`, `shasum` and `+ <pkg>@<version>`
lines: wait until the registry serves `<pkg>/<version>` itself, then compare
the served `gitHead` with the tag's commit and the served shasum with the
log's. The source reports that the npm CLI's view can lag the registry's
own answer; read the version endpoint directly rather than relying on the
CLI's cached view. Only a version still absent well after the window, or a
served shasum that differs from the log's, is a publication fault. Two
observations on one registry set no bound. The prevention route is the one
named above: release verification that polls the exact version with a
stated bound and compares it against the publish log, not delivered here.

Evidence: OKF proposal from oats-maintainer/release-maintainer-pepe,
2026-11-11; notes/npm-registry-lags-a-fresh-publish.md. The source reports
that `npm view` lagged 0.69.14's publish (2026-11-10) and that three minutes
after 0.69.15's publish (2026-11-11, run 42957483846) the version endpoint
answered not found and `latest` read 0.69.14, before both packages served
0.69.15 with `gitHead` equal to the tagged commit and shasums equal to the
log. The harvest read on the forge that the run succeeded on its first
attempt, that the Release was published seconds before the run completed,
that the registry now serves `@awebai/oats@0.69.15` and
`@awebai/oats-pi@0.69.15` with `gitHead` equal to the commit `v0.69.15`
peels to, and that each packument's `time` entry for 0.69.15 is about three
and a half minutes after the run completed, which is consistent with the
reported window. The workflow's header states the npm-before-Release order;
its job graph, the publish log and the shasums in it were not read. The
general rule and its no-republish consequence were already recorded above
and are confirmed, not changed; the proposal's statement that this concept
held no such trap was mistaken.

## A package rename is a republish, not a move (2026-10-30)

npm has no scope or name move. Moving the kernel and its packages to a new
scope (the [org move decision](/nodes/oats-maintainer/decisions/oats-moves-to-its-own-org-in-stages.md))
means **publishing the new names and deprecating the old ones**, with the
old packages left in place for their readers. Two traps follow:

- **A same-named bin fails `EEXIST` over the old package.** Installing a
  new-scope package globally that ships the same bin as the installed
  old-scope package fails with `EEXIST` and leaves the old one active;
  `--force` succeeds but leaves both installed, and then removing either
  package removes the shared bin link, leaving no `oats` at all. The
  kernel's own update path and remote install run a global install on the
  kernel's package name, so the rename stage cannot simply install over the
  old name.

  **Correction, 2026-10-30:** this entry first said that uninstalling the
  old package first is clean. That holds **for npm only**. For OATS it
  strands every running session, whose hook settings and shim name the old
  kernel's path until a restart regenerates them, and the schedule unit,
  which records the path it was installed with and is rewritten only by
  `oats schedule install`, which `oats update` does not run. The mechanics
  are the generalist's
  [swap lesson](/nodes/oats-expert/lessons/test-what-a-change-strands-through-a-real-start.md).
  The release consequence: **no release note or skill tells a host to
  uninstall the old package**, and the bridge's contract keeps one code base
  under two npm names until the npm ending is decided
  ([open state of the move](/nodes/oats-maintainer/decisions/oats-moves-to-its-own-org-in-stages.md)).
  A final `oats update` that performs the swap itself is the candidate
  ending, measured and not built.
- **Token-based publishing has a deadline.** npm targets January 2027 to
  remove direct publishing through bypass-2FA granular tokens; publishing
  the new names from CI needs trusted publishing (or a staged-publish
  token) set up before then, and a new scope is a fresh trust
  configuration, not an inherited one. Plan the rename before the lane's
  tokens stop publishing, not around that date.

Renaming an OATS **package id** (the `packages:` key) is a different trap,
recorded with the rejected coordination-package rename in
[capability-owned coordination](/nodes/oats-maintainer/stewardship/coordination-policy-lives-in-capabilities.md#delivered-as-tagged-template-repositories-the-package-rename-route-rejected-2026-11-09):
the id is recorded in soul selectors, host keys, team policies and
schedules, so a rename without a kernel move table is a per-machine hand
check-list.

# A template repository is cut by an annotated tag on its prep merge commit (2026-11-09)

Coordination templates are delivered as tagged repositories, not packages
([capability-owned coordination](/nodes/oats-maintainer/stewardship/coordination-policy-lives-in-capabilities.md#delivered-as-tagged-template-repositories-the-package-rename-route-rejected-2026-11-09)
owns that decision and the `template-v<version>` tag shape). Their release
follows the lane rule of the
[release-lane decision](/nodes/oats-maintainer/stewardship/release-lane-and-project-lanes.md):
the project lane reads first (Juan's side, for these templates, as the
source reports), and the release lane gives the final read, the sign-off,
the merge and the tag. The judgement the release lane needs:

- **The tag goes on the prep PR's merge commit, after main CI is green
  there.** A content PR merges on the release lane's sign-off after Juan's
  side's read. A release-prep PR, the release lane's own, turns the
  CHANGELOG's unreleased heading into `## template-v<version> - <date>`;
  Juan's side is its second reader. Once main CI is green on that merge
  commit, the release lane pushes an annotated `template-v<version>` tag on
  it: the dated heading and the tag name the same commit.
- **The heading's date is the UTC day of the tag.** If the prep is dated for
  the next UTC day, hold the merge and the tag until 00:00Z rather than
  pushing a new head: a new head would void the second read, a short wait
  does not. The research template's `template-v1.0.0` was cut this way (its
  tag is timestamped one minute into 2026-11-10 on the forge).
- **The prep is one line only when the content PRs already moved the
  versions.** The template's validator ties every capability's `version`,
  and its "Copied from … template-v<version>." sentence, to the latest
  CHANGELOG heading, so a copy can tell which release it came from. When
  the content PRs left the versions alone (`template-v2.2.0` of the
  engineering template, `template-v1.0.1` of the research template), the
  prep bumps every version the validator ties to the heading and adds the
  heading's summary line; the second read covers them.
- **Text adapted from outside sources ships with its notices.** The
  repository's THIRD-PARTY-NOTICES.md names each source repository, the
  commit read, its copyright line and its full licence, and the adapted
  skill points to it. The content read checks each licence on the forge,
  and a copy keeps the file with the skills it adapted.

The validator already makes a stale version a red check; a check that the
heading's date matches the tag's UTC day is the elimination route for the
date rule, not delivered. The procedure itself belongs to the template
repositories' own release documentation and the lane map; this record holds
the judgement (where the tag goes, why a date waits, what a prep carries, what
ships with adapted text).

Evidence: OKF proposal from oats-maintainer/release-maintainer-pepe,
2026-11-10; notes/coordination-ships-as-templates.md. Five template releases
across two repositories, 2026-11-09 and 2026-11-10: the annotated tags and
the prep merge commits they peel to were read on the forge; the reads,
sign-offs, CI state and licence checks are source-reported.

# What the pre-merge gate cannot rehearse

Anything that only runs on a tag has never run when the PR is reviewed. A
packaging-config defect (2026-07-24) survived an exhaustive review chain and
failed the real run. The elimination route — installer builds verify-only on
PRs, fail-fast off — has landed; the residual judgement is to distrust any
"rehearsed" claim for a path with no PR-time run, and to read release-run
history rather than the reviewer's report. Check `main`'s own CI, not only the
PR's: a guard that fails only under CI's shallow clone once kept `main` red for
days while every PR looked fine.

## Rehearse changed macOS tests before the tag (2026-10-27)

Installer verification does not establish that every platform's tests ran.
The source reports that, for the 0.69.0 release, PR CI ran the Desktop suite
on Linux only; macOS Desktop builds and their tests first ran in the tag
workflow. Both macOS jobs then failed on an assertion that confused a
symlinked temporary-directory path with its canonical path, and publication
was skipped. The targeted macOS run passed with the fix. The lesson is the
missing platform evidence and its cheap rehearsal, not a permanent inventory
of what CI runs.

Until that gap is eliminated, when a release's PRs add or change Desktop or
client tests, the release lane runs the hand-started `macos-tests.yml` at the
release-prep head over those test files **before tagging**, and reads the
result as CI evidence. The source's workflow accepts a ref and at most ten
files per run; split a larger set across runs. This is selected-file
coverage, not a full macOS suite or proof of untested platform paths. Check
the current workflow's coverage rather than assuming this dated gap remains.
This release-time rehearsal is the residual catch for what reached main; it
does not relax the review-time rule that affected platform paths absent from
PR CI are run before hand-over
([evidence outside PR CI](/nodes/oats-maintainer/stewardship/review-protocol.md)).

If the tag run nevertheless fails **before publication**, the release lane
immediately freezes main with a hold issue so unrelated merges cannot enter
the repair release. The source reports holding main while 0.69.1 carried
0.69.0's content plus the fix. This containment rule does not decide whether
to recut an unpublished version or use a fresh patch: the existing
publication boundary above still applies. The fresh patch chosen for this
incident is not a new prohibition on pre-publication recuts.

This manual rehearsal is temporary release-verification debt. The preferred
elimination route is macOS Desktop/client test coverage in PR CI, with the
release gate requiring evidence for the candidate being tagged. That is not
a claim such coverage has landed. Keep the remaining release judgment in
the existing release skill, and remove the workaround only when the
relevant platform path is actually covered before the tag.

## A step both workflows run can pass on every PR and fail on the tag (2026-11-10)

The PR-time installer build (`build-installers.yml`) and the tag's release
workflow (`release.yml`) are separate workflows that set their jobs up
differently. A green installer build on every PR therefore proves only that a
step passes **in the installer job's setup**; the same step can fail on the tag
when the release job installs or configures less before it. This narrows the
opening rule of this section: a path need not be tag-only to be unrehearsed.
What the PR run rehearses is the step inside its own job's environment, not
the step as the tag will run it.

- **In review**, when a PR adds or changes a step that both workflows run,
  compare what each job installs and sets up before that step, not only the
  step's text. A step that reaches outside its job's own install (a Desktop
  fixture that loads a root dependency, for example) is the case to look for.
- **At release prep**, read `release.yml`'s diff since the last tag the same
  way: which steps changed, and what each job that runs them provides first.
- **Which repair a failed tag takes.** A failure whose cause is in the tagged
  source needs a source change, as 0.69.13's did, and the fresh patch is the
  usual route; whether an unpublished version may be recut instead stays with
  [publish first, housekeep second](#publish-first-housekeep-second), which
  owns the publication boundary and the recut rule and is not narrowed here.
  A failure that is clearly timing on the runner, with nothing published, is
  **re-run from the same tag, failed jobs only**: the tagged source is
  exactly what a new version would re-ship, and re-running an unpublished
  attempt burns no version. A failed-jobs re-run repeats the revision it
  first ran ([as on PR runs](/nodes/oats-maintainer/lessons/a-rerun-does-not-pick-up-a-base-fix.md)),
  so it is the right repair only when nothing needs fixing.
  "Clearly timing" means the same checks are green on PR CI at the same tree
  and the failure is a wait or a capture window, not a missing input; when
  that is not clear, treat it as a source fault.

The elimination route is one job setup shared by both workflows (a reusable
workflow or composite action) so they cannot diverge, or a test that pins the
release job's setup to what its steps need. The source reports that
`test/release-workflow.test.mjs` now pins one such case (root dependencies
installed before the Linux launch check) and that other setup differences are
not pinned; this lesson delivers nothing beyond that reported case.

Evidence: OKF proposal from oats-maintainer/release-maintainer-pepe,
2026-11-10; notes/release-workflow-differs-from-pr-installers.md. The source
reports that v0.69.13's release run failed on the Desktop's Linux
packaged-window launch check added by
[oats#1757](https://github.com/oats-project/oats/pull/1757): the launch
fixture could not resolve a root dependency, because the installer build
installs root and Desktop dependencies while the release workflow's Desktop
job installed only the Desktop's, so publication was skipped. The fix,
[oats#1826](https://github.com/oats-project/oats/pull/1826), shipped as
0.69.14, keeping the Desktop-only install up to packaging and adding a
Linux-only root install before the launch; 0.69.14's first attempt then
failed two timing checks that were green on PR CI at the same tree, and a
failed-jobs re-run from the same tag passed and published. The harvest read
on the forge that both PRs are merged, that v0.69.13's release run failed and
has no release, and that v0.69.14's release run succeeded on its second
attempt and its release was published on 2026-11-10. The setup difference,
the dependency error and the timing nature of the second failure are
source-reported; the workflows and job logs were not read. The incident
confirmed the tag-is-the-version and never-retag decisions above and adds
no new rule to them.

Verified by the knowledge maintainer at review on 2026-11-10 from public
GitHub records: oats#1757 merged 2026-11-06 and oats#1826 on 2026-11-10; the
`v0.69.13` release run failed on its only attempt and no release exists at
that tag; the `v0.69.14` release run succeeded on attempt 2 and its release
was published on 2026-11-10; `release.yml` on `main` carries a Linux-only
root-dependency install before the packaged-window launch step, and
`test/release-workflow.test.mjs` exists. Job logs and the test's assertions
were not read.

## Rehearse newly taught commands before the package tag (2026-10-28)

Reviewing instructional prose and passing package CI do not establish that
its command examples work on the kernel agents will use. The source reports
that engineering 1.17.0 taught self-retirement without the required instance
name; the first parentless lead to follow it received a usage error, and
1.17.1 was needed to repair the already-tagged guidance. The same release
also exposed the separate
[package-versus-mirror neutrality gap](/nodes/oats-maintainer/lessons/engineering-layer-neutrality-needs-package-side-checks.md).
That gap has its own canonical lesson; a green check for either property
is not evidence for the other.

Until executable examples are covered at the package gate, check each newly
taught command against a current released kernel **before tagging the
package**. Use its help to check required arguments and, where supported,
a non-mutating plan of the taught invocation. A help response alone is not
evidence that the invocation is valid or that the real operation succeeds;
name what the check did and did not exercise. This is not permission to
rehearse retirement or other lifecycle effects on working instances.

The extra patch and late discovery are the release lesson, not a permanent
inventory of missing package tests. Prefer deriving examples from the CLI
contract where practical, with package CI exercising documented invocations
against a released kernel in disposable fixtures. Check current coverage
before carrying forward the manual guard. Remaining release judgment belongs
in the existing release skill; this harvest adds no skill or test and claims
no automation has landed.

Evidence: OKF proposal from oats-maintainer/pepe-release-maintainer,
2026-10-28; notes/check-engineering-mirrors-against-oats-before-tagging.md.
The source identifies [awebai/oats-engineering#28](https://github.com/awebai/oats-engineering/pull/28)
and [awebai/oats#1623](https://github.com/awebai/oats/pull/1623) as the
package and later kernel-prep context. The usage failure, package-CI gap
and repair releases are source-reported; this harvest did not run those
commands or audit their implementation.

## A package cut runs the kernel tests that read its mirror (2026-11-04)

Some kernel tests read or run a mirrored package's skills and injects, so a
mirror refresh can break them even when the package's own CI is green and
the pin PR is otherwise routine. Once the package is tagged, the
mirror-and-pin PR is the release's only route to deployments; a pin whose
CI then fails on a test that pinned the old text leaves the release waiting
on a test port that nobody planned and on that port's review.

Before tagging a package release that changes skill text or commands, the
release maintainer either runs the kernel tests that read that package's
mirror against the new payload (a trial refresh in a scratch kernel
checkout, not a hand copy into the real mirror) or names the port of those
tests in the cut's plan, so the pin PR carries it as planned work rather
than discovering it. The
[mirror-and-pin lesson](/nodes/integrations-expert/lessons/a-provider-release-is-mirrored-and-pinned-in-one-pr.md)
already places "any kernel tests the release reclassifies" in the one pin
PR; this section adds **when** that is known, before the package tag rather
than after it. It is a sibling of the newly-taught-commands rehearsal above:
that one checks the package's commands against the kernel, this one checks
the kernel's tests against the package. When what those tests exercise is a
component the release removes, the finding is not a port the pin PR can
carry:
[the pin rides the adoption PR](#a-provider-release-that-removes-a-component-is-pinned-inside-its-adoption-pr-2026-11-11).

The source reports two cases in the OATS 0.69.12 preparation (2026-11-04):
the oats.okf 5.8.0 pin,
[oats#1732](https://github.com/oats-project/oats/pull/1732), failed three
kernel tests that pinned the previous release's harvest publication commands
and placeholders, and the port went to another lane; and oats.aweb 1.36.0
removed a usage error that a kernel hook test pinned, caught at the package
PR's sign-off and fixed in the kernel preparation. The package's own release
guidance names moving the pins and mirrors, not the kernel tests that read
the mirror. The pin PR was read as merged during harvest; the failing tests,
their port and the sign-off catch are source-reported, from two packages in
one release.

The elimination route is for the package gate itself to run the kernel
tests that read its mirror, or for those tests to read the mirror's
contract rather than its text, so a text change cannot fail a pin. The
neutrality lesson's
[rejected route](/nodes/oats-maintainer/lessons/engineering-layer-neutrality-needs-package-side-checks.md#package-enforcement-retires-the-temporary-grep-2026-10-29)
notes the dependency cost of importing the kernel harness into package CI;
that tradeoff applies here too. Until either lands, the trial refresh or
the named port is release-planning debt, not automation delivered by this
lesson, and it adds no release authority.

Evidence: OKF proposal from oats-maintainer/release-maintainer-pepe,
2026-11-04; notes/a-package-cut-runs-the-kernel-tests-that-read-its-mirror.md.

# Verify the artifact, not the diff

- A parse error has **file-wide blast radius**: one bad character in a shared
  script disabled every hook of an integration while a grep-level check
  passed (2026-07-10). Everything shipped is syntax-checked.
- A **repo-local probe cannot see packaging**: the `files` whitelist, bin
  links and adapter resolution are exercised only by installing the packed
  artifact into a clean prefix outside the checkout. Without the whitelist
  the tarball would have shipped souls, instances and private knowledge
  (2026-07-10). When adapter or discovery behaviour changes, run a disposable
  *real harness session* from the packed artifacts — scaffold assertions
  cannot prove a harness loaded what was composed.
- A clean-room smoke that resolves through the live catalog is **networked**:
  green says nothing about a firewalled machine (2026-07-29), so the room
  publishes its own local package.

# Rehearse upgrades from released state

When a release changes remotes, locks or packages, a fresh-install smoke
cannot qualify the upgrade path. The source's 0.53.0 rehearsal addressed a
cache-fetch failure that depended on state left by earlier releases: a fresh
local remote in a test did not recreate that history.

Start with released kernels that real deployments use, let each build its
own cache and lock, and run the candidate artifact against what each left
behind, without hand repair between them. Isolation must come from explicit
disposable environment and storage inputs, not a promise not to touch the
host. Record both the candidate commit and what the rehearsal did not cover;
an upgrade run does not establish Desktop, real-spawn or service behavior it
never exercised.

**Gate qualification:** the note does not make an unfinished rehearsal an
automatic tag hold. Arrange it before the tag, read available evidence, and
have the maintainers explicitly decide if it is not finished. A regression
found in time affects the gate; an existing defect is not automatically a
blocker for the release that revealed it. Give that defect an owner and an
Upgrade-note remedy. The proposal's unconditional gate wording is narrowed
by this explicit qualification in its backing note.

The elimination route is a repeatable release-verification matrix that builds
state with outgoing releases before testing the candidate; keep the historical
fixture, not only a fresh-install test. This is an acceptance lesson, not a
claim that such a permanent matrix has landed. Operator-side prerequisite
sequencing has its canonical home in
[check the target provider's host requirements before sync](/nodes/oats-operator-expert/lessons/check-target-provider-host-requirements-before-sync.md).

# Source → tag → pin, proven from both sides

An official capability exists in three places that must agree: its
authoritative source repository, a published immutable tag there, and the pin
the framework's catalog and workspace carry. Any copy the framework carries is
a byte-for-byte **mirror**, not an authoring surface (decided 2026-09-05,
inverting the 2026-07 bundled-first order). Tests enforce it from both sides,
so a pin cannot advance before its tag exists. **A provider release is tagged
in its own repository first, then mirrored and pinned in ONE framework PR** —
payload, catalog and workspace pins and the version literals reviewed as one
diff; a provider PR that lands ahead of its tag or pin breaks `main` on merge.
Mirror bytes are written only by the parity checker from the tag, never by
hand — a hand copy is how a 2026-09 release had to be recut. The provider-side
order and why the gate includes the Desktop suite are the integration node's
[mirror-and-pin lesson](/nodes/integrations-expert/lessons/a-provider-release-is-mirrored-and-pinned-in-one-pr.md).
Catalog identity is discovery, not trust
([integrity, origin and consent](/nodes/oats-kernel-expert/decisions/trust-approval-and-consent-boundaries.md)).

## Plan the okf tag before the framework release that carries its pin (2026-10-27)

When a kernel cut includes both a new oats.okf and a framework release, plan
**the okf tag before framework release preparation**. The source reports
that onboarding names the catalog's okf version and a test keeps them equal:
advancing that pin changes packaged setup instructions, so it needs a
framework release too. While that coupling remains, a catalog pin is not
release-neutral text. Include it in the already-required mirror-and-pin PR
before cutting the framework tag, rather than discovering a second framework
patch after the first tag is immutable.

The observed cost was an extra framework tag and review cycle on the kernel
release's critical path. If okf's second read is not ready, either wait to
cut the framework release or deliberately budget the follow-up patch and
kernel re-pin. This is a scheduling choice, not permission to skip the second
read or to override the kernel-first compatibility rule above. The source
reports this ordering failure once; it is not evidence that every provider
pin always requires a framework release.

Treat the duplicated onboarding version as release-planning debt. Prefer
one reviewed version source for that text; while the coupling remains, make
it explicit in the release dependency plan and check it before the framework
tag. These are elimination targets, not automation delivered by this lesson.

Evidence: OKF proposal from oats-maintainer/pepe-release-maintainer,
2026-10-27; notes/okf-release-before-framework-release.md. The source reports
that [awebai/oats#1597](https://github.com/awebai/oats/pull/1597) cut the first
framework release before okf was ready, so
[#1607](https://github.com/awebai/oats/pull/1607) needed the follow-up and
[#1606](https://github.com/awebai/oats/pull/1606) re-pinned it. The ordering,
coupling and cost are source-reported, not independently audited release or
CI receipts.

## A provider release that removes a component is pinned inside its adoption PR (2026-11-11)

The one-PR rule above is normally met by the release lane's own prep PR:
mirror, catalog and workspace pins, literals, and any kernel tests the
release reclassifies. That shape holds for an additive provider release. It
does not hold when the release **removes** something the framework
repository's own kernel tests, docs or instructional texts still exercise.
The pin and the adoption of the removal are then one change, and neither
half can merge first:

- **Pin first** fails its own CI. The kernel tests read the package through
  its mirror, so every test that spawns or runs the removed component fails
  at once, and the link check fails on docs that point into the old mirror.
- **Texts first** leaves an interval in which a spawn receives instructions
  for the new release's route while its pinned release still ships the old
  one. This is the generalist's
  [dependent-text ordering](/nodes/oats-expert/lessons/soul-text-lands-with-its-capability-pin.md)
  with its "or after" closed as well: for a removal the texts land **with**
  the pin, in the same merge.

So at release planning the release lane reads the crossed CHANGELOG sections
of each package it is about to pin for removals; the
[mirror-test check](#a-package-cut-runs-the-kernel-tests-that-read-its-mirror-2026-11-04)
surfaces the same thing before the package tag. Where there is one, the pin
is not planned as a standalone prep PR:

- The release lane still **builds the pin as one commit**, by the route of
  any pin: the mirror generated from the tag, the catalog, the workspace
  pins and the literals. It hands that commit to the lead of the adoption
  work instead of opening its own PR.
- The **adoption PR carries that commit unchanged** and adds, on top of it,
  the texts and the kernel tests rewritten for the release. Its author does
  not hand-edit the generated files: mirror bytes stay the parity checker's.
- The release lane **signs off last**, and that sign-off includes that the
  pin commit in the PR is the one it built.
- When a **patch of the package is cut before the adoption PR merges**, the
  release lane builds a replacement pin commit on fresh `main` and the PR
  rebases onto it once. The framework then pins the patch directly, rather
  than pinning a superseded version and moving again.

This keeps tag first, generated mirror bytes and one reviewed diff for
mirror and pins; it changes only which PR carries them and who leads it.
It is not a reason to fold other work into an additive pin, which stays the
release lane's prep PR. Who else reads the adoption PR follows the lane map
and the
[one-second-reader rule](/nodes/oats-maintainer/stewardship/review-protocol.md#peer-maintainers-own-lanes-each-pr-gets-one-second-reader-2026-10-13),
which this section does not change. The source's plan for its one case
named the lane that owns the texts, and the product lane for the rewritten
kernel tests, ahead of the release lane's sign-off; that is one PR's
reported routing, not a standing rule for PRs that span lanes.

No check delivers this. The mirror-test section's routes would show the
removal before the package tag, but they do not remove the coupling: while
kernel tests, docs and texts in the framework repository exercise a mirrored
package, removing a component there is a framework change too. The planning
read for removals is release-planning judgement, not automation.

Evidence: OKF proposal from oats-maintainer/release-maintainer-pepe,
2026-11-11;
notes/a-provider-major-that-removes-a-component-pins-with-its-adoption.md.
One occurrence: oats.okf 6.0, which removed the knowledge harvester. Read on
the forge at harvest:
[oats#1853](https://github.com/oats-project/oats/pull/1853), the 6.0.0 pin
alone, was closed unmerged on 2026-11-11; its CI run 43016839006 failed in
five of six test shards, in the poisoned-session suites and in the schema
and public-link validation step; comments on that PR say the
pin commit will ride the coordination lead's adoption PR and name a
replacement 6.0.1 pin commit; and commit `949d0bda` (a 6.0.1 pin of
generated mirror, catalog, workspace and literals) exists in the repository
and belonged to no pull request yet. Source-reported and not read: the nine
failing tests across five files, the removed component's spawn hook
refusing with `E_REMOVED`, which docs link broke, and the coordination
lead's agreement to carry the pin. The adoption PR had not merged and was
not identified at harvest, so the unchanged carried commit, the single
rebase and the reader routing are the agreed plan, not a completed delivery.
The texts-first failure is reasoned from the pin dependency, not observed.

# Every version literal is a release step

Editing a capability the repository itself locks changes its integrity, so
version and lock move in the same commit (2026-07-24). A version sweep limited
to the test tree missed a pin in a release script and forced a recut
(2026-09-20); the sweep covers tests, release and smoke scripts, docs, mirrors
and CI workflows. Pinned-version tests are a feature — they catch silent
drift at the cost that every release touches them — and a leftover can fail
either the prep PR's CI or the later release lane. Either the sweep enumerates
them, or — the preferable elimination — they read the version from the catalog so
there is one literal to move. A post-publication probe carried from release to
release goes stale the same way: rebuild its expected versions from the tag
each time.

**Refinement, 2026-10-14:** a plain-literal sweep misses an escaped regular
expression representing the same version. The source reports two such pins
left in the 0.55.0 prep, caught by PR CI. Until the version is derived from one
source, cover both the plain and escaped forms, with expected replacement
counts checked before writing. This is temporary release-prep knowledge debt,
not a second canonical version source or a reason to weaken the pinned tests.

# A pin that can lag names its lag

Within a day of the 2026-09-21 kernel-first wave, three unrelated components
refused with what read as corruption and was **a pin lagging a release**: a
bundled catalog snapshot behind a newer framework tag, a provider manifest
field ahead of an older kernel's closed validator, a deployment profile pinned
to an older bridge release. All three refusals were correct — each pin exists
to refuse an unreviewed revision. The lesson is that **the message must name
the lag and the re-pin**: "X differs from Y" sends the reader hunting for
corruption; "pinned X (r1) lags installed Y (r2); re-review the pin" sends
them to the decision that owns it.

- **Upgrading one side is a review event for the other.** The change that
  moves a release lists the pins that reference the old one and either moves
  them in the same change or records why not.
- **A snapshot of a moving list is a design smell.** Prefer reading the
  reviewed list at the revision the consumer already names; keep the snapshot
  only as fallback. A profile that pins a release is deployment policy: the
  framework's job is a legible refusal and an obvious re-pin path.

# What a release claim needs

A release claim names the exact tag, the published artifact, the installed
version and execution evidence from the published artifact — never a read of
the diff ([adoption evidence](/nodes/oats-maintainer/lessons/adoption-evidence-and-approved-scope.md)).
Release notes state what is **not** in the cut when related work ships in
later provider releases, so an independent re-run starts from a correct
expectation. **State the tag's own commit, not the last code merge**: the tag
usually sits on the release-notes commit one after the last merge, and the
registry records that commit; a claim wrong by one commit fails a verifier who
compares them.

# Related

[Provider-pin upgrade coverage](/nodes/oats-maintainer/lessons/provider-pin-upgrade-notes-belong-in-the-kernel-release.md)
owns the prep author's responsibility to carry crossed provider releases'
operator-visible changes and upgrade steps into the kernel Upgrade section.
[Version-qualified claims](/nodes/oats-maintainer/lessons/a-re-dated-claim-must-be-re-verified-against-the-release-it-now-names.md)
owns the distinction between a shipped feature floor and a future planning
bound; neither mirror parity nor a version-literal sweep proves that claim.

[Scoped release approval includes package pins](/nodes/oats-maintainer/lessons/scoped-release-approval-includes-package-pins.md)
owns the authority check against everything a candidate delivers, not only
its kernel diff; the compatibility and adoption gates above remain separate.

[Engineering layer neutrality needs package-side checks](/nodes/oats-maintainer/lessons/engineering-layer-neutrality-needs-package-side-checks.md)
records why a package's green CI can miss a provider-specific instruction
that fails the later mirror-and-pin release gate.

[How the OATS project ships and reviews](/nodes/oats-maintainer/stewardship/review-protocol.md).
[Protect the last release blocker from merge churn](/nodes/oats-maintainer/lessons/protect-the-last-release-blocker-from-merge-churn.md)
records the scheduling remedy for repeated same-area base updates; it does
not relax the integration gate or replace the failed-tag containment rule.

# Citations

1. Migrated from agents/oats-expert/soul/knowledge @ 7838d3ca (release lessons 2026-07-10 → 2026-09-22, `decisions/desktop-public-release-contract` amendment, `decisions/desktop-is-built-for-workspace-v2`), agents/cli-dev/soul/knowledge @ 7838d3ca (release-lane lessons, 2026-07-21 → 2026-07-29) and agents/oats-coordinator/soul/knowledge @ 7838d3ca (`release-lane`, `payload-publication`).
2. Migrated from agents/oats-expert/soul/knowledge/stewardship @ 7838d3ca (delivery-log: the lead's 2026-09-24 release playbook entries; the 0.29.0 lockstep, stale-probe and shallow-clone lessons).
3. Mirror + pin in one PR as practised by [awebai/oats#264](https://github.com/awebai/oats/pull/264) and [#266](https://github.com/awebai/oats/pull/266).
4. [Stage-only npm tokens for safer automation](https://github.blog/changelog/2026-09-18-stage-only-npm-tokens-for-safer-automation/), GitHub Changelog, 2026-09-18: "npm is targeting January 2027 to remove direct publishing through bypass-2FA tokens."

Evidence: OKF proposal from oats-maintainer/polaris-oats-maintainer-pepe, 2026-10-14; notes/an-upgrade-is-rehearsed-from-released-kernels-before-the-tag.md; notes/a-published-tarball-can-lag-its-metadata.md; notes/a-release-prep-greps-escaped-version-pins.md.

The notes report the 0.53.0 rehearsal prompted by
[awebai/oats#1059](https://github.com/awebai/oats/issues/1059), the 0.55.0
publication (run 38546688491), and escaped pins in
[#1120](https://github.com/awebai/oats/pull/1120). These are source-reported
observations; this harvest did not reproduce the rehearsal or registry reads.

Evidence: OKF proposal from oats-maintainer/pepe-setup-maintainer,
2026-10-27; notes/injection-effort-scope-gate.md. Cross-package retirement
text and the release lane's paired plan are source-reported; no completed
release or mixed-version deployment failure was independently verified.

Evidence: OKF proposal from oats-maintainer/pepe-release-maintainer,
2026-10-27; notes/macos-desktop-tests-first-run-on-the-tag.md.

The source identifies the regression from
[awebai/oats#1564](https://github.com/awebai/oats/pull/1564), the repair
[#1591](https://github.com/awebai/oats/pull/1591), and the main hold
[#1590](https://github.com/awebai/oats/issues/1590). The platform coverage,
failed release, passing targeted run and repair shipment are source-reported;
this harvest did not audit the workflows or reproduce those runs.

Evidence for the shared-soul schema gate: OKF proposal from
oats-maintainer/polaris-oats-maintainer-kernel, 2026-10-27;
notes/background-instances-gate.md. The rule and launch-declaration precedent
are source-reported; this harvest did not inspect any deployment's installed
kernel or certify rollout readiness. The 2026-10-30 review read
[the other maintainer side's note on awebai/oats#1579](https://github.com/awebai/oats/issues/1579#issuecomment-6441887900),
which asks for this confirmation before a change to `souls/oats-maintainer`
lands and names the same precedent.

Evidence for the rename trap: OKF proposal from
oats-maintainer/haiku-oats-migration-maintainer, 2026-10-30;
notes/repo-move-is-a-contract-change.md. The `EEXIST` behaviour is the
source's local test with throwaway packages on npm 10.9.4; the January 2027
target is citation 4. This harvest did not repeat the install test.

Evidence for the rename correction: OKF proposal from
oats-maintainer/haiku-oats-migration-maintainer, 2026-11-04;
notes/uninstalling-the-old-kernel-is-clean-for-npm-only.md. The
`--force`-then-remove result is the generalist's isolated npm test; the
session and schedule-unit stranding was first read in the kernel and the
lifecycle hook and then measured by the generalist with real kernels and
sessions, all source-reported here and canonical in the linked lesson.
