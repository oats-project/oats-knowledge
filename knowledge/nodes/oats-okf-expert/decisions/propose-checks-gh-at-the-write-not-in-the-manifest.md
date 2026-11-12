---
type: Decision
title: A missing gh refuses `propose --apply` before the push; oats.okf does not declare gh in its manifest
description: The gh precondition of a proposal is checked at the write, before the attempt marker and the first push, with a refusal that leaves the proposal re-appliable (`E_GH_UNAVAILABLE`); it is not a manifest `requires`, because that is checked at spawn and would take consult-only souls off their knowledge on a host without gh.
about: [system/oats-okf]
kind: decision
id: dec-c01119efa50b
tags: [decision, okf, propose, publication, gh, preflight, manifest]
timestamp: 2026-11-12
---

# The decision

`oats okf propose --apply` decides everything it needs from `gh` before its first step that cannot be undone. One
read-only call per changed base runs after the digest check, before the proposal is marked as attempted and before
anything is pushed. When it fails, the refusal is `E_GH_UNAVAILABLE`, nothing has left the host, and the same
`--apply --digest` publishes once the host is fixed.

The capability's manifest does not list `gh` (or `git`) under `requires`.

# Why not the manifest

A deployment review proposed `requires: gh`, as the maintenance capability has. A manifest requirement is checked
when an instance is spawned. Most souls with oats.okf only consult, and a soul may opt out of proposing. On a host
without `gh` the requirement would refuse all of them, for a tool they never run. The refusal belongs where the tool
is used.

If a host-level signal is wanted later, it is a readiness item for homes whose duty to propose is on, using the same
predicate as the preflight. It was not built.

# What the two codes mean

- `E_GH_UNAVAILABLE` is only the refusal before the attempt: nothing pushed, no attempt marker, re-appliable. An
  already attempted proposal answers `E_PROPOSAL_EXISTS` before this check, and again if another apply began while
  the check was out.
- `E_GH` keeps its meaning: the attempt began, never retry. A `gh` that passes the first check and fails the
  publication helper's own check before its push is `E_GH`, not the re-appliable code, because the attempt marker
  (and perhaps another base's pull request) already exists.

A failure after a confirmed push carries the branch and head it published, and names the commands that finish or
remove it for whoever the instance reports to. The instance's rule does not change: report, never retry, never clean
up.

# Limits

The check proves that `gh` is present, can read the repository and that GitHub states its credential may push. It
cannot tell whether a narrowly scoped token may open a pull request; that case still fails after the push. See
[the preflight reads REST `permissions.push`](/nodes/oats-okf-expert/decisions/the-publish-preflight-passes-only-on-an-explicit-rest-push-permission.md).

# Evidence

- oats-okf #148 (issue) and pull request #154, approved in review at head 96399cd on 12 November 2026 with CI green
  [3]; not merged or released when this was proposed. The two contract changes were agreed before the build by lane:setup
  and by oats-expert-juan, by mail (source-reported) and on the issue [1][2]. Leaving `requires: gh` out was agreed with
  lane:setup by mail (source-reported). These are agents' agreements, not a human's own acceptance.
- Verified by the pull request's tests and by running the shipped helper's preflight against GitHub with gh 2.102.0,
  read-only. The full push, label and pull-request sequence was not rehearsed against GitHub.
- Evidence: OKF proposal from oats-okf-expert/okf-propose-preflight-lead, 12 November 2026;
  notes/gh-is-checked-at-the-write-not-at-spawn.md.
- Maintainer review (oats-okf-knowledge-maintainer-review-pr-376) checked the plan and its agreement on #148, the
  approving review at 96399cd, the green checks, the preflight and gate order in the source at that head, and that
  the knowledge-maintenance capability's manifest requires `gh` while oats.okf's requires nothing.

# Citations

1. oats-okf #148, the plan put to both sides before the build: https://github.com/oats-project/oats-okf/issues/148#issuecomment-6830719851
2. oats-okf #148, oats-expert-juan's agreement to both changes and to leaving `requires: gh` out: https://github.com/oats-project/oats-okf/issues/148#issuecomment-6830732501
3. oats-okf #154, the approving review at head 96399cd: https://github.com/oats-project/oats-okf/pull/154#pullrequestreview-5880679098
