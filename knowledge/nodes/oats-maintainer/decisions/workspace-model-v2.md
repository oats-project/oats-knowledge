---
type: Decision
title: Workspace model v2 — membership is trust, location is not version, every capability is copied whole into the instance
description: One workspace per organisation whose reciprocal membership is the whole trust decision for member capabilities; a soul says where each capability comes from and never which version, packages are the only versioned thing, nothing is installed, every capability is copied whole into the instance at spawn, and harnesses start normally. Supersedes the revision-pinned import model of 2026-09-20 and the classic per-deployment activation surface.
about: [workstream/oats-direction, system/oats-kernel]
id: dec-052c18aad32c
tags: [workspace, membership, capabilities, packages, provenance, materialization, teams, harness, supersession]
timestamp: 2026-09-24
---
# Decision

Accepted by the human 2026-09-23 on the redesign lead's proposal. The model
it replaced declared provenance per soul per capability, had three files each
knowing about versions, a workspace file importing its own members' souls,
and a deployment configuration repeating activation for every capability.
Refinements came from a team review the same day, the first patch's review
(2026-09-23) and an operator's first real rebuild (2026-09-24). One human
decision followed on 2026-09-24: package approval was removed (OATS 0.26.0).
The normative text lives in the framework's reference pages; this concept is
the record of *what was decided and why*.

**Supersedes** the revision-pinned membership of
[a workspace definition is not a package](/nodes/oats-maintainer/decisions/workspace-definition-is-not-a-package.md)
(members are no longer imported by pinned revision; the four-responsibility
split itself stands) and the "workspace pins reviewed source revisions"
clause of
[official development dogfoods the workspace](/nodes/oats-maintainer/decisions/official-development-dogfoods-the-workspace.md).
**Amends** point 2 of
[operating OATS is capability content](/nodes/oats-maintainer/decisions/official-capabilities-and-reviewed-marketplace.md)
— see "Official capabilities under v2" below.

# The rule

Every capability an instance runs is copied whole into that instance at
spawn. A capability comes from one of two kinds of source, and only one kind
is versioned:

| Source kind | Versioned | Trust |
|---|---|---|
| A member repository (or the soul's own repository) | no — always the member's latest state | membership |
| A package | yes — the version pinned once, in the workspace; the lock records exact commit and integrity | the declaration in the workspace's `packages:` |

A soul names each capability **with where it comes from — a location, never
a version**. The workspace says which package version; materialization
*records* the exact state (source, commit, content hash) on the instance.
Resolution is a handshake check plus a lookup.

# The decisions, as rationale

## Membership is the trust decision

1. **Reciprocal membership is a hard gate**: the workspace lists the
   repository *and* the repository's own membership file names the
   workspace. One file per side of the handshake; the member-side file
   replaces the earlier export index and carries only the backlink plus an
   optional default team label.
2. **Membership is the whole trust decision for member capabilities.** The
   model is the one every team already accepts for a repository's committed
   agent skills: who can push is the boundary, the branch's latest state is
   what runs. No per-operator trust lists, no per-capability approval for
   members. Every layer of approval stacked on a team's own code was
   ceremony; the model spends its rigour where the boundary actually is —
   packages from outside, the handshake, integrity. Packages at first kept a
   one-time executable approval per version; the human removed it on
   2026-09-24 (0.26.0): declaring a package *is* the trust decision, and the
   lock keeps commit and integrity so a moved tag or an edited payload is
   refused.
3. **Discoverable by default.** Every soul and capability definition in a
   member is a workspace item; an item that wants to stay internal says so in
   its own definition. No export lists anywhere.
4. **The handshake is observed with the operator's own read access to both
   halves, in one access context.** An unreadable half is *unconfirmed*,
   never a half-success — reading the workspace repository *is* being in the
   workspace. A repository without a backlink is a schema error; the
   standalone view is a **member** whose workspace host cannot be read *for
   access reasons*, marked as such on everything it produces. A network
   failure is surfaced as-is: an offline laptop must never be silently
   downgraded to "public contributor", and a remote is fetched in the form it
   was written so a private repository is never degraded by an unintended
   transport.
5. **Mixed public/private organisations host the workspace file in a private
   repository that is not a public member.** The workspace file is readable
   by everyone who may see the member *list*; public contributors then get
   the standalone case (hence the default in "Official capabilities under
   v2"). Onboarding lists the host as a member like any other and names a
   standalone view as such. The setup knowledge states this rule; the
   deployment-side judgement of applying it belongs to the operator node.

## Location, never version

6. **Every capability reference says where it comes from** — a member
   repository, the soul's own repository, or "package". Two members may
   export the same bare name; each reference says which it meant.
7. **No revision on members.** A member is always its latest state; a team
   that wants frozen capabilities publishes them as a package. "Where does
   this come from" is a fact worth reading in a soul; "which version" is a
   team decision that belongs in one place.
8. **A repository can be a member and a package publisher; the roles never
   collapse.** What it exports as capabilities is member tier; what it
   publishes as a package is package tier; membership never turns a package
   into a latest-state member capability. The official capability
   repositories are members of the project's own workspace *and* consumed as
   packages, so the framework's own souls declare the official core as a
   package even though its repository is a member.
9. **The official marketplace stays** as the reviewed list of official
   packages: it is the only way a package becomes *pinnable by id*; a
   package outside it is written as a Git reference with a ref
   ([official capabilities decision](/nodes/oats-maintainer/decisions/official-capabilities-and-reviewed-marketplace.md)).

## Full materialization; a running instance never changes under itself

10. **Every module is copied whole into the instance** — skills, injects,
    scripts, hooks. A member moving or a package pin being bumped affects
    only new spawns; there is no shared modules directory. The instance
    records source, commit and hash per module, so "how far behind" is
    visible. This invariant is what everything downstream already relies on
    (retire baselines, confirmed apply, Desktop-reported facts); full copies
    make it free.
11. **The invariant covers the soul body too** (2026-09-23): each instance
    uses the soul exactly at the commit it was spawned from, so a preview that
    fetches a newer commit changes nothing a running instance relies on, and
    path-pinned provider state stays valid per instance. The refresh is a new
    spawn, never an in-place recompose.
12. **Drift is shown, not prevented.** Status and roster show, per instance,
    each module's and the soul's source and commit, and whether the member
    has moved since or the capability is gone, *with a cause*, so a
    settings-only change on a machine is not mistaken for a member that
    moved. A moved soul is information about *new* spawns, never a change
    under a running one.

## Nothing is installed; no migration

13. **Nothing is installed.** A package is a place to fetch from with a
    version attached; a member is a place to fetch from without one. No
    installed-capability directory, no activation step; a fetch cache may
    exist as invisible plumbing. The lock records the commit and integrity
    of each package version; a moved tag or a tampered payload fails
    integrity, and the check that matters runs at spawn, not when the lock
    was written. (The 0.25 per-version executable approval was removed by
    human decision on 2026-09-24.)
14. **No migration; the previous line keeps working.** v1 declaration files
    are errors naming the schema, not fallbacks — the
    [pre-adoption precedent](/nodes/oats-maintainer/decisions/clean-contract-precedent.md)
    applied. "No migration" means no converter and no dual-schema reader: the
    previous kernel line spawns its deployments indefinitely, the new line
    reads only v2 files, and an operator rebuilds when ready from the written
    reference. The init/use/install/restore verbs and the deployment
    activation file go away.

## Remotes, not clones; the layout is the operator's

15. **Discovery and resolution work against Git remotes, never local
    clones.** The only thing that needs a clone is a soul's work target.
    This makes a workspace usable from any laptop layout and makes "who can
    see what" identical to Git's own answer. Annotated tags are peeled; only
    commit ids are recorded.
16. **The deployment layout is the operator's.** Onboarding *asks for* (or
    accepts) the directory where agents will live — usually the folder
    already holding the member clones — and adds what the kernel needs
    there. There is no named folder convention: a taught folder name worked
    against this very sentence. The clone lookup has one taught, enforced
    order, a miss names its remedies, and a directory whose remotes name
    another repository is a mismatch, not a match.

## Teams are labels; providers own what a label means

17. **One workspace per organisation; teams are labels.** The workspace
    declares team names so labels cannot drift; a soul or capability carries
    a team, else its repository's default, else "unassigned". Per-team
    workspace defaults may add capabilities additively. A label never gates,
    restricts, changes trust or partitions any store; the messaging
    provider's own notion of team moves under its payload so "team" means
    one thing.
18. **Per-team provider payload is kernel semantics** (2026-09-23, from a
    review of a mixed public/private deployment with two messaging teams):
    the workspace's provider payload may carry a per-label section; the
    kernel merges base with the soul's label, strips the per-label key, and
    the provider never sees a key it must interpret. Clarified the same day:
    the per-label key is **reserved** — legal only at the workspace's top
    level, refused at any depth in any other payload layer. Corrected in
    scope 2026-09-24 (operator rebuild): the kernel *delivers* the merged
    result; **whether a provider honours what arrives is the provider's
    contract**, and the kernel adds no environment shim to compensate for a
    provider that does not yet read it. The messaging package's actual
    behaviour at each version is that package expert's fact.
19. **A store names a repository; the root inside it is the provider's.**
    A repository reference names one thing everywhere in the model, so a
    store never grows a path fragment. Corrected in its example 2026-09-24:
    the knowledge provider at the time had no soul-payload key for the root
    — its binding file owns it and the soul's ownership document is read
    from the soul directory — so the docs' example was removed. The rule
    stands; the fact belongs to the knowledge package expert.

## Three homes for provider payloads

20. **Provider payloads live where the thing is true.** Soul level = true of
    every instance of the soul. Operator level = host-owned values (absolute
    paths, state roots), which the workspace file's schema refuses. Instance
    level = given at spawn (the Desktop's confirmed apply carries the same
    map), recorded on the instance — for example a retained messaging seat
    taken by exactly one spawn while other instances mint fresh identities.
    The per-soul blocks of the deployment configuration disappear; their
    per-instance content moves to spawn time. The binding validation contract
    runs unchanged over the merged payload
    ([kernel view of payloads](/nodes/oats-kernel-expert/decisions/soul-declares-kind-config-assigns-policy.md)).
    The merged payload is **inspectable before it is bound** (the spawn
    preview shows what each provider receives), and a provider command run
    before any instance exists resolves exactly as a spawn of that soul
    would.
21. **Slot emptiness resolves in one direction.** A soul's "none" for a slot
    empties it and drops whatever layer-bearing capability the *workspace
    defaults* contributed; only a soul contradicting *itself* is an error.
    The workspace proposes; the soul answers.

## Harnesses start normally

22. **OATS is a skill contributor, not a skill sandbox.** The working
    directory is the instance home, the harness's own skill discovery stays
    intact, capability skills are copied into the instance's skills
    directory, and machine-level and repository-level skills resolve exactly
    as without OATS. OATS keeps composing instructions and pinning
    model/provider settings; ambient-skill exclusion at launch is removed for
    every launch
    ([native launch](/nodes/oats-kernel-expert/decisions/harness-native-launch.md)).
23. **Duplicate skill names.** Within the OATS-composed set a duplicate is a
    spawn error naming both capabilities. Between a composed skill and an
    ambient one the harness's own precedence decides and OATS does not
    intervene; the spawn preview lists composed skill names so a clash is
    visible.

## Official capabilities under v2

24. **Every repository of the project's own workspace is converted to the
    new format; the kernel reads nothing else.** Not optional — the project
    dogfoods the model it offers
    ([dogfooding decision](/nodes/oats-maintainer/decisions/official-development-dogfoods-the-workspace.md)).
25. **Every package repository carries a member soul that is the expert in
    that capability** — an ordinary member soul, global team, discoverable
    and spawnable by anyone in the workspace, the natural owner of its
    package's changes. This is the per-package expert the
    [roster amendment of 2026-09-24](/nodes/oats-maintainer/decisions/domain-expert-rebuild.md)
    later admitted.
26. **The official core is the kernel's default, in the standalone case
    too.** A soul spawned from a member whose workspace cannot be read gets
    its own-repository capabilities *plus* the official core from the
    catalog, resolved through the operator's lock like any package; without
    it the standalone spawn is the hollow agent the framework already
    refuses. Clarified 2026-09-23: the default is a default, not an addition
    — *any* mention of the core in a soul (any source, or off) suppresses it
    and the soul's own line is what resolves. This **amends** the 2026-09-20
    rule that the kernel never adds the core silently: the core is now a
    kernel default visible in the preview and suppressible by one line,
    rather than a line tooling writes into the file. With the core resolved
    as a module, the kernel's own "you run on OATS" briefing is suppressed:
    the module's inject is the briefing, because that knowledge is the
    core's to own.
27. **The core and setup capabilities are rewritten, not patched, for this
    architecture.** The core must let an agent work well inside an instance
    under the new model from its seat; setup must teach the whole
    architecture and its best practices — the handshake and why, member tier
    versus package tier and the non-collapse rule, packages and the lock,
    catalog versus Git references, the deployment directory with no naming
    convention, private/external/standalone cases, the three payload homes,
    and what is deliberately not versioned. Skills are snapshot-tested
    against the shipped CLI so they cannot drift from the commands.

# The governing rule of the rebuild round (2026-09-24)

**The rebuild guide is a contract the kernel honours.** Where the guide
promised behaviour the kernel lacked, the kernel changed; where the guide
described keys no provider consumed, the guide changed. This is the
stewardship stance for every operator-facing document under v2, and the
reason clarifications above cite the operator's run rather than a design
session.

# What is removed and what is kept

Removed: per-soul versioned source lines and the source grammar in souls;
imports of member souls; export lists; the old member index file; the
installed-capability tier and the deployment activation file entirely
(activation is derived from workspace defaults plus soul declarations;
per-instance content moves to spawn); the init/use/install/restore verbs;
per-soul store inheritance (stores are declared once in the workspace);
ambient-skill exclusion at launch.

Kept: kernel-neutral provider payloads and the binding validation contract;
the lock (commit and integrity per package version —
[integrity, origin and consent are different proofs](/nodes/oats-kernel-expert/decisions/trust-approval-and-consent-boundaries.md));
decision revisions and the confirmed-apply contract;
the official catalog as discovery; every published Desktop CLI contract
(previews report what was materialized from where, at which commit); the
canonical-plus-alias instance construction.

# Routing

The mechanics named above only as far as the decision needs them — clone
lookup order, per-commit soul cache, spawn-time integrity verification,
remote-form fetching, error taxonomy — are kernel contract and belong to the
kernel node as constraints once recorded there; the rebuild guide's
judgement (deployment directory, cutover, mixed public/private hosting,
per-team messaging identities in practice) belongs to the operator node; what
each provider version actually reads from its payload belongs to that
package's expert.

# Current contracts

- [workspaces.md](https://github.com/awebai/oats/blob/main/docs/workspaces.md)
- [packages.md](https://github.com/awebai/oats/blob/main/docs/packages.md)

# Citations

1. Migrated from agents/oats-expert/soul/knowledge @ 7838d3ca (`decisions/workspace-model-v2`, 2026-09-23, appended 2026-09-23/24).
2. Design records [simplified workspace model](https://github.com/awebai/oats/blob/7838d3ca70772f63854b198601fbc45437c2e999/docs/design/2026-09-23-simplified-workspace-model.md) and [workspace module contracts](https://github.com/awebai/oats/blob/main/docs/design/2026-09-23-workspace-module-contracts.md) in awebai/oats.
