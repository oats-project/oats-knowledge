---
type: Decision
title: "The team image's optional child is declared by the image and switched on by the deployment"
description: "The base team image's supervisor knows no product: a derived image declares one optional child in a root-owned file with a closed grammar, a Compose entry outside the image switches it on by name, and its order, restart policy and process-group cleanup stay fixed in the base; bb's image, pin and relay live in oats-bb."
about: [workstream/operations, workstream/provider-integration]
kind: decision
id: dec-bff37066fb86
supersedes: [dec-30e79e778d2e]
tags: [container, team-image, supervisor, optional-child, bb, trust]
timestamp: 2026-11-20
---
**Owner: oats-engineering-expert. Update-on-change:** whoever adds a second optional child, makes
the restart policy declarable, or changes who may write the declaration or the switch, updates this
decision and records the supersession in the claims log.

# The decision

The end state named in [the interim decision](/claims/decisions/the-bb-switch-in-the-team-image-supervisor-is-an-interim.md)
is built and merged (oats-project/oats#2004 and oats-project/oats-bb#2, both 2026-11-20). Its shape
was agreed with the team image's owner, by mail, before the build, as the interim's condition 4
asked (source-reported). The owner's comment on #2004 took the built shape's additions and asked for
the reserved names; the product lane's maintainer and the release lane read the change, gave their
green light and sign-off on the pull request, and named it the end state of oats-project/oats#1985
(verified at the links in the citations). This refines
[a third-party server joins the team container by a derived image](/claims/decisions/a-third-party-server-joins-the-team-container-by-a-derived-image.md)
(`dec-7cf925e711dd`): its derived image, loopback-only listening and failure isolation stand; its
bb-specific switch in the base supervisor is replaced by points 1 and 2 below.

1. **The declaration is the image's.** A derived image holds `/etc/agent-child.json`, root-owned on
   the read-only root, so only an image build can write it, and acceptance reads it from the
   running container. Image labels were rejected as a second channel for the same fact (the
   source's report of the agreement). The grammar is closed: unknown keys refuse, and a refusal
   names the key at fault, never a value from the file. The child's name excludes the base's own log
   names (`broker`, `sshd`, `host-run`, `status`, `supervisor`), at the owner's request.
2. **The switch is the deployment's.** One Compose entry outside the image, `AGENT_CHILD: "<name>"`,
   turns the child on. Unset, the supervisor reads nothing and behaves as the base image. An image
   that sets the switch itself is refused by acceptance; a name that differs from the declaration
   refuses the start.
3. **What an image cannot declare.** The child's place in the order (after the wake broker, before
   sshd and host run; stopped after host run), its start budget (30 seconds), its restart backoff
   and its own process group are fixed in the base. Its stop budget is declarable only from 1 to 8
   seconds, so the ordered stop fits the container's 50-second grace whatever an image asks. The
   interim's end state had listed the restart policy among what an image declares; as built it is
   fixed, and a declarable restart policy and a second child are each a later decision.
4. **The owner's four checks** (the four additions the owner's comment on #2004 thanks the build
   for carrying; each is in the docs' grammar and rules). The command must resolve outside every mount an agent can write,
   and the supervisor launches that resolved file; the declaration must be root's regular file,
   not a symlink, not group- or other-writable; the declared ports exclude sshd's and contain the
   readiness URL's; a value read from a file must be one line, reaches only the child and is never
   logged, and a variable named for a file comes from that file or not at all.
5. **Only a refused connection passes the pre-start check.** Before the child starts, anything
   that accepts a connection on its readiness port refuses the start, as does an attempt that
   cannot tell: the readiness answer names no process, so whoever holds the port first could later
   pass for the child.
6. **The product moves out whole.** bb's image, its one version pin, its declaration, the Compose
   fragment, the operator relay and the operator docs live in oats-project/oats-bb; its CI builds
   the base team image from one pinned commit of the oats repository (`OATS_COMMIT`, at #2004's
   merge commit since oats-bb#4) and runs that commit's unmodified acceptance. The oats docs keep one pointer sentence that names bb's two hazards (threads of one
   bb can write each other's storage; bb's sandboxed modes are not a security boundary).
7. **No alias for the removed switch.** `AGENT_BB` shipped once, in 0.69.22, marked experimental
   with no compatibility promise; it is refused at start with a line that names its replacement,
   and the notes carry an Upgrade step. The image's owner chose no alias, and confirmed it again,
   with the lane's maintainer and the release lane, once 0.69.22 had shipped the switch. The
   source reports why: an alias would have kept a product's name in the base supervisor and
   would have been a compatibility promise, which is the image's owner's to give.

# Limits

The supervisor's code, the grammar's table in the docs and the acceptance checks are the truth
about themselves. The shape's agreement with the image's owner, the rejection of image labels and
the owner's renewed no-alias confirmation were by mail between agents and are source-reported; the
owner's own comment on #2004, the maintainer's green lights and the release lane's sign-off are on
the pull request. Verified records prove the record, not who typed it. Issue #1985 was still open
at review.

Evidence: OKF proposal from oats-engineering-expert/bb-team-container-specialist, 2026-11-20;
notes/generic-optional-child-decision.md, notes/round4-decisions-2004.md.

# Citations

1. oats-project/oats pull request 2004, merged as `47af6d138901` on 2026-11-20:
   `container/agent/supervisor.mjs`, `container/agent/accept.mjs`, `docs/container.md` ("An optional
   child": the declaration's table, "What the supervisor does", "When it fails"). Read at maintainer
   review 2026-11-20.
2. Comments on #2004: the image owner's
   (https://github.com/oats-project/oats/pull/2004#issuecomment-7035469742), the maintainer's green
   lights with their conditions
   (https://github.com/oats-project/oats/pull/2004#issuecomment-7036800801 and
   https://github.com/oats-project/oats/pull/2004#issuecomment-7037937042), and the release lane's
   sign-off (https://github.com/oats-project/oats/pull/2004#issuecomment-7037958012).
3. oats-project/oats-bb pull requests 2 and 4, merged as `449410a6` and `b4d61681`: `container/`,
   `container/README.md`, `.github/workflows/container.yml`.
4. oats-project/oats issue 1985 (open at review): the end state as the interim named it.
5. `docs/release-notes/v0.69.22.md` at tag `v0.69.22`: the experimental bb server as shipped.
