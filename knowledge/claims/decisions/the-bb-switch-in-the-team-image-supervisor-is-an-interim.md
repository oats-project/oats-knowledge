---
type: Decision
title: "The bb switch in the team image's supervisor is an interim: the end state is a generic optional child, with bb's image and relay in bb's own repository"
description: "Pepe's side accepted the bb-specific supervisor switch, derived image and relay in the oats repository only as an experimental interim with no compatibility promise; the end state is a base supervisor that knows nothing of bb and runs a generic optional child a derived image declares, with the bb image, its pin and the relay beside the bb provider."
about: [workstream/operations, workstream/provider-integration]
kind: decision
id: dec-30e79e778d2e
tags: [container, team-image, supervisor, bb, session-providers, interim]
timestamp: 2026-11-19
status: superseded
---
**Superseded 2026-11-20** by [the team image's optional child is declared by the image and switched on by the deployment](/claims/decisions/the-team-images-optional-child-is-declared-by-the-image-and-switched-on-by-the-deployment.md): the end state below is built and merged.

**Owner: oats-engineering-expert. Update-on-change:** whoever builds the generic optional child,
moves the bb image, pin or relay (oats-project/oats#1985), or abandons the move, updates this
decision and records any supersession in the claims log.

# The decision

[A third-party server joins the team container by a derived image](/claims/decisions/a-third-party-server-joins-the-team-container-by-a-derived-image.md)
records what the team image's owner agreed for bb, including a bb-specific switch in the base
supervisor. When the change (oats-project/oats#1984) reached the product lane's maintainer
(joan-product-maintainer), it escalated one direction question to Pepe's side: where bb lives, given
that the session-provider contract keeps bb's CLI and version in a package of its own. Pepe's side's
answer is recorded on the pull request as relayed by that maintainer in its RETURN (source-reported,
relay at https://github.com/oats-project/oats/pull/1984#issuecomment-7022821777), and #1984 merged on
2026-11-19 with the conditions met:

1. **As built is accepted as an interim.** The switch, the derived image `container/agent-bb`, the
   Compose fragment and the operator relay ship in the oats repository, marked experimental in the
   docs and the release note: no compatibility promise on those paths, on the switch or on the
   image's recipe, so moving them later is not a breaking change.
2. **The end state is a base supervisor that knows nothing of bb.** It runs a generic optional child
   that a derived image declares: its command, readiness URL, stop budget, restart policy and
   env-from-file. The derived image, its bb pin and the relay live in the bb package repository,
   beside the provider. Not a split that leaves bb's flags and ports in the oats repository while
   its version moves away.
3. **Two pins, one check.** Until then bb's version is pinned twice, in the image's `package.json`
   and in the provider's `version` setting; the provider's version check at readiness and launch is
   what keeps them equal, and the docs say so.
4. **One tracked issue carries the move**, owned by the effort's lead (oats-project/oats#1985). The
   generic child's shape is agreed with the image's owner before any build.

# Why it matters beyond bb

The image's owner and the product lane's other side judge different things: the owner judged what
the base image carries and how it fails; the other side judged the design against a contract in
another lane's hands. A design agreed with a path's owner still needs checking against the
contracts its sibling work is deciding before it is built: here the question arrived only at the
maintainer's read of the finished pull request, and cost a return.

# Limits

Pepe's side's acceptance is source-reported: read as relayed in the maintainer's RETURN comment on
the pull request, which names the mail it came from; no record of Pepe's side's own was read. The
end state is a direction, not a design: no generic child exists yet, and #1985 was open at review.
This refines the derived-image decision; it supersedes nothing.

Evidence: OKF proposal from oats-engineering-expert/bb-team-container-specialist, 2026-11-19;
notes/bb-in-base-supervisor-is-interim.md.

# Citations

1. oats-project/oats pull request 1984, merged as `ba81ddb37eb5` on 2026-11-19: the maintainer's
   ESCALATE and RETURN comments at `f81858abf` (the question, and the answer with its conditions).
   Read at maintainer review 2026-11-19.
2. `docs/container.md`, "A bb server for the team", and
   `docs/release-notes/next/bb-team-container.md` at `ba81ddb37eb5`: the experimental paragraph, the
   two pins and the `E_BACKEND_VERSION` check at readiness and launch.
3. oats-project/oats issue 1985 (open at review): the move, the generic optional child, its owner
   (the bb effort's lead) and the agreement with the image's owner before any build.
