---
type: Lesson
title: Identity and location belong to the resolved object, never to the string that named it
description: Resolved-object checks need independent intended-object authority, including receipt-bound requested homes, native on-disk directory spelling and descriptor identity before reads.
about: [system/oats-kernel]
kind: lesson
id: ins-296ca0333459
tags: [kernel, security, containment, symlinks, identity, spawn, lifecycle]
timestamp: 2026-10-30
---
# Lesson

Consolidated from the spawn-placement and lock-hardening reviews of
2026-07-24 → 2026-07-29. A lexical path says nothing about where creation lands
once a symlink appears anywhere along it, and an instance name is unique only
within one agent's instance directory. A canonical-home guard that validated
the agents root lexically still created an instance inside a linked worktree
through a symlinked alias; a caller-controlled name joined onto a base and
checked for existence is not containment; and a redirect helper that only knew
about *one* kind of redirect passed every other one.

**A containment rule states where a path may go, not which known bad case it
avoids.** The durable form is equality against the object OATS intended to
create: resolve the nearest existing ancestor, re-append the uncreated
segments, and require the result to be exactly the intended destination under
an allowed base. Derived bases need containing too — anything OATS derives from
an operator-supplied anchor must remain under the anchor it claims to be under,
or a symlinked sibling directory becomes an allowed base. A path check expires
the moment it returns, so re-assert immediately before the side effect and
again after creation; if the created directory is not where it was meant to be,
remove only the empty directory OATS just made — an unexpected resolved
destination is not OATS-owned state.

Three outcomes must stay distinct: absent, present-but-dangling, and escaping.
A check with more outcomes than one system call distinguishes is a loop, not an
optimisation, and a broad catch around a probe swallows the deeper escape
errors it exists to find. Version control reports canonical paths, so an
identity it hands back is captured at creation and carried, never
reconstructed after arbitrary lifecycle code ran; compare realpaths and fail
closed rather than guess when no canonical root can be established. Path is
the identity proof; a name is recorded only after it round-trips to the same
object from every context that will read it. Writes into adopted local files
check their parents immediately before each write, not at command entry; a
backup is replaced by rename, never written through; and a backup that is not
journalled is a backup the operator never had.

**Accepted limit:** Node offers no relative, no-follow creation primitive, so a
narrow race between check and create remains. That residual is an operator
prerequisite (protect the deployment directory at the OS level) and is
documented where operators read, not implied away by a pathname check. This is
not a symlink ban: a symlinked agents root that resolves back inside the
checkout is legitimate and the deployment layout relies on such links.

The Desktop reached the same rule independently on 2026-07-24 for its
file-serving guard — canonicalise an admitted root once, hold it immutable,
resolve only the request, and contain by exact root or root-plus-separator
([Desktop's admitted-roots finding](/nodes/oats-desktop-expert/decisions/privileged-workspace-admission.md)).
Two products, two reviews, one conclusion: the convergence is evidence for
the rule, not a duplicate record of it.

**Guard the descriptor you read, not the path you checked** (2026-09-19).
A temporary ancestor redirect during open can leave a foreign descriptor even
when the named path is normal again; an earlier stat and a later root check
do not establish which opened file supplied the bytes. Bind the descriptor to
the physically contained source *before* reading, because a refusal after a
foreign read cannot undo it. For the same reason a path cannot back a promise
that a directory was not *replaced*: a path can name a different object after
deletion and recreation, and a marker inside the directory is replaced with
it. Such a promise needs a witness kept outside the protected root, and a
version constant that claims the guarantee must cover every dependent read and
write boundary, not only the writer.

**The disambiguator must reach every projection** (2026-09-05). Exact-home
retirement made the action pick the right one of two same-named remote
instances, while the roster that decides which row the operator may act on
still joined saved routes by name alone and gave the route to whichever twin
the host listed first. The exact-home retire refused the mismatch, but
routes that still addressed by name reached the other home, and the
name-keyed saved-route store could not even represent two colliding routes.
A guard's scope is the layer it lives in. Once a guard says "same name, not
the same thing", grep the name it disambiguates and check every join, cache
key, store and route keyed on it; fail-closed at the action does not rescue
a wrong offer. The roster now joins by name and home, and a colliding routed
spawn is refused or reported rather than overwriting.

# Case-insensitive directory identity needs native resolution

The source reports a 2026-10-14 macOS counterexample to treating any realpath
result as canonical directory spelling: Node's `fs.realpathSync` retained the
caller's letter case for two spellings of the same existing extra-tree
directory, while `fs.realpathSync.native` returned the same on-disk spelling
for both [3]. A child attached through the differently cased spelling was
missed by the owner lookup, and tree removal proceeded without the attached
child refusal. Resolving links alone had not closed the identity check.

For existing-directory ownership and attachment comparisons in this boundary,
use native realpath results rather than the caller's casing. This sharpens
"compare realpaths" above; it is not a claim that pathname equality proves
all filesystem object identity or that a path stays stable after a check.
Keep absent and dangling paths as distinct states. The source's retained
lexical comparison for vanished paths is not evidence of an existing object
and must not turn failed resolution into an affirmative ownership proof.

The elimination route is the kernel's shared path-identity logic plus
regressions that attach through differently cased aliases and exercise both
tree-removal guards and retirement-plan coverage. The reported regression
runs only on a case-insensitive filesystem: a green run that skips it on a
case-sensitive runner supplies no evidence for this failure mode. Obtain
and identify the case-insensitive run rather than relying on the host's OS
name alone. This preserves the descriptor and check-to-effect limits above.

# Canonical resolution must not replace requested-home authority

The 2026-10-30 start-claim review exposed a different way to choose the wrong
object [5]. Moving canonical resolution before the authority guard was needed
to claim the on-disk home, but a directory home exchanged for a link to another
home could then be claimed and started as that other home. A second check of
the requested path did not suffice: the link could select the other home
during resolution and the original home could be restored before the guard.
The two disk observations could each look legitimate without proving they
referred to the same authorized home.

**A resolved target is not its own authority to replace the requested home.**
For an owned directory home whose given spelling differs from its real path,
the selected fix checks the given home's own authority before taking either
claim. Bind the real path to the home recorded by that home's receipt, not to
agreement between two mutable disk reads. A mismatch refuses with
`E_WORK_INSPECTION_FAILED` before either home's claim is acquired. This
qualifies the earlier path-identity rule: canonicalization supplies location,
while an independent recorded binding establishes the intended home.

The elimination route is the shared requested-home guard, receipt-bound
comparison and deterministic regressions for both a persistent redirect and
a resolve-then-restore interleaving. A future specification that says to claim
the canonical home must also state what binds the requested spelling to it,
whether the caller is start, stop, upgrade or a new verb. This is a design
obligation, not evidence that every such command is currently vulnerable or
repaired. Preserve the descriptor and check-to-effect limits above; this is
not a universal race-free filesystem claim or a ban on legitimate aliases.

**Open limit as of 2026-10-30:** the source reports no equivalent receipt
binding for worktree-mode homes; that case remained outside the repair.
The kernel owner should update this finding when the binding or coverage
changes. The proposed directory-home fix must not be advertised as closing
all work modes. Review findings and regression results are source-reported;
the implementation was still open when checked [5].

The [whole-start claim decision](/nodes/oats-kernel-expert/decisions/retire-exclusion-is-a-whole-run-claim.md)
records why acquisition moved, and the one-claim restart and compatibility
constraints. This lesson owns the identity failure, not a duplicate lifecycle
policy.

# Related

[A consumer filter takes the identity the kernel already reported](/nodes/oats-kernel-expert/decisions/consumer-filter-takes-the-reported-identity.md) applies the identity distinction at the CLI boundary without adding a filesystem containment rule.

[Separate operational home from granted work authority](../decisions/home-work-authority.md);
[Live lineage is deliberately bounded](../decisions/bounded-live-lineage.md);
[Integrity, origin and consent are different proofs](../decisions/trust-approval-and-consent-boundaries.md).

# Citations

Evidence: OKF proposal from oats-kernel-expert/session-lifecycle-followups-kernel-expert, 2026-10-30; notes/canonical-home-needs-receipt-binding.md.

1. Migrated from agents/cli-dev/soul/knowledge and agents/oats-expert/soul/knowledge @ 7838d3ca (placement-guards-resolve-destination, names-are-not-identity, path-first-resolution-round-trip, symlink-containment-walker-throws, canonical-worktree-verification, adopted-writes-never-follow-a-symlink, captured-session-storage-identity; principle only).
2. Migrated from agents/cli-dev/soul/knowledge/lessons/guard-the-projection-not-just-the-action.md @ 7838d3ca.
3. Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-lifecycle, 2026-10-14; notes/compare-existing-paths-in-their-on-disk-spelling.md. The source attributes the reproduction to adversarial review of [awebai/oats#964](https://github.com/awebai/oats/issues/964), implemented in [#1186](https://github.com/awebai/oats/pull/1186), and reports second-round approval and macOS [run 38595416560](https://github.com/awebai/oats/actions/runs/38595416560). The run and repair are source-reported, not independently reproduced or audited by this harvest; no universal realpath behavior or current shipment status is certified.
4. Reproduced by the knowledge maintainer at review of the harvest on 2026-10-15, on macOS with Node v22.21.1: for an existing directory created as `TreeDir` and named as `treedir`, `fs.realpathSync` returned the caller's lowercase spelling and `fs.realpathSync.native` the on-disk spelling. One host and one Node version only; the kernel repair in [#1186](https://github.com/awebai/oats/pull/1186), open at this review, and the cited run were not checked.
5. The proposal and named note report two adversarial-review findings while implementing [awebai/oats#1602](https://github.com/awebai/oats/issues/1602): the link swap and resolve-then-restore race. [awebai/oats#1657](https://github.com/awebai/oats/pull/1657), read on 2026-10-30, was open and unmerged at `040ae659df10`; its description corroborates the directory-home receipt binding, refusal before either claim, unchanged worktree-mode limitation, and reported guard/receipt-binding mutation checks. No implementation audit, reproduction or test rerun was performed by this harvest.
