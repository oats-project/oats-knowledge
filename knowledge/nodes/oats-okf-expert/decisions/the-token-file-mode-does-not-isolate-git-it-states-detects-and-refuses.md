---
type: Decision
title: The token-file credential mode does not isolate Git from the host; it states the limit, detects it and refuses before publishing
description: With `github-token-file` oats.okf gives Git and gh one token but leaves the host's Git configuration and netrc in force; the limit is documented, `setup --check` reports what would answer for github.com, and a publication refuses on it, because isolating Git would drop a host's proxy and certificate settings and still leave the netrc.
about: [system/oats-okf]
kind: decision
id: dec-8655df38353b
tags: [decision, okf, credentials, github-token-file, git, publication, bring-up, container]
timestamp: 2026-11-16
---

# The decision

`github-token-file` (oats.okf 6.2, opt-in, host-only) names a file holding the deployment's proposer token. The
package gives that token to Git through its own credential helper and to gh in the child's environment. It does
**not** cut Git off from the host's own configuration. Instead:

1. **The limit is stated** wherever the mode is described: a netrc entry for github.com, an `http.extraHeader` or a
   rewrite of `https://github.com/` URLs in the system or user Git configuration answers before the token does, and
   a deployment that sets the token file keeps none of them in the agents' container.
2. **`oats okf setup --check` reports them** as a problem in this mode, by kind and scope and never by value.
3. **A publication refuses on them** (`E_HOST_CREDENTIAL`): `propose --apply` before its attempt marker, and each
   publishing command of the maintainer's helper run with `--token-file`. Reads are not refused: a host route
   there changes who reads, not what is published.
4. **What can be closed cheaply is closed:** `core.askPass` is switched off, and `http.extraHeader` is reset for
   the unscoped key and for `https://github.com/`.

The publish predicate itself runs no Git and judges the file's token directly, so it is not affected [1].

# Why not isolate

- Dropping the system and user Git configuration for the package's Git calls closes the two configuration routes,
  but it also drops a host's proxy and certificate settings, which a container behind a corporate proxy needs.
- It still leaves the netrc: Git has no setting that turns one off, only another home directory would.
- Not every route can be closed from the command scope either: a rewrite the host wrote for the full repository
  URL cannot be undone there, and an `http.extraHeader` is reset only for the scopes reset by name [2].
- The cost of not isolating is correctness, not secrecy: everything in the container is readable by every agent
  there anyway. The failure it would allow is a check that passes for the token and a push that goes out as
  someone else, which the refusal removes for publications.

# What it replaced

The contract first agreed for the mode said the package "uses that token and no other credential". Reviews of the
implementation showed that sentence false for the host routes above. Both sides of the project accepted the
narrower statement on 2026-11-16, recorded on oats-okf #153 by each side's maintainer instance [5][6] and in the
design's section 7 [4]. The deployment side's acceptance asked, as a follow-up that did not block #153, for the
refusal in item 3 and the header reset in item 4: the limit enforced at the point of use, not only at bring-up.

# Status

Items 1, 2 and the askpass part of 4 are merged (oats-okf #153, #155). Item 3 and the header reset are in
oats-okf #160, open at the time of writing. None of the mode has been run against GitHub with a write-role-only
credential: that rehearsal was skipped by the human's decision, and the release notes name what is unproven.

# Citations

1. [A check of one GitHub credential asks GitHub directly](/nodes/oats-okf-expert/lessons/a-check-of-one-github-credential-asks-github-directly-not-through-git.md)
2. [Making one token Git's credential takes more than a credential helper](/nodes/oats-okf-expert/lessons/a-git-credential-helper-is-not-the-only-thing-that-answers-for-a-host.md)
3. oats-okf #153: https://github.com/oats-project/oats-okf/pull/153 ; #155: https://github.com/oats-project/oats-okf/pull/155 ; #160: https://github.com/oats-project/oats-okf/pull/160
4. The design and its section 7, in the oats-okf repository: `docs/design/2026-11-12-container-knowledge-writes.md`
5. oats-okf #153, the setup lane's acceptance of the narrowing: https://github.com/oats-project/oats-okf/pull/153#issuecomment-6923423498
6. oats-okf #153, the deployment side's acceptance and its follow-up: https://github.com/oats-project/oats-okf/pull/153#issuecomment-6923469258

Evidence: OKF proposal from oats-okf-expert/container-knowledge-writes-lead, 2026-11-16; notes/file-mode-does-not-isolate-git-from-the-host.md, notes/forge-enforces-package-checks-and-records.md.

Maintainer review (oats-okf-knowledge-maintainer-review-pr-393, 2026-11-16): checked items 1 to 4 against #153 and
#155 (merged) and #160 (open at 6eec193) and the design's section 7; corrected the command-scope sentence to what
lesson [2] establishes; found both acceptances recorded on #153 (verified at [5] and [6]) rather than only by mail,
and that the refusal was asked as a non-blocking follow-up; stamped the id.
