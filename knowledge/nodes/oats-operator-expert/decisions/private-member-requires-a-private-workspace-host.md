---
type: Decision
title: If any workspace member is private, host the workspace definition in a dedicated private repository that is not itself a public member
description: The workspace definition names every member, so whoever can read its host sees the member list; with mixed public/private membership the only honest host is a dedicated private repository, chosen before the first sync because every deployment points at it.
about: [workstream/operations]
id: dec-d7aec9abc694
tags: [decision, operator, workspace, disclosure, privacy, membership, hosting]
timestamp: 2026-09-23
---

Decision formed 2026-09-23 by the OSS coordinator while laying out a mixed
public/private workspace.

# Rule

When a workspace has at least one private member, host `oats-workspace.yaml`
in a **dedicated private repository** that exists to hold the definition (and,
optionally, private souls) and is **not itself a public member**. Do not host
it in an existing public member, and do not host it inside the private member.

# Why

The definition lists every member and any member may host it. That freedom
reads as convenience — "put it in the repo we already have" — but the host is
a **disclosure decision**: whoever can read the host learns the full member
list, including the names of repositories they cannot otherwise see.

- **Hosting in a public member** publishes the private member's existence and,
  through the team labels beside it, often its purpose. The repository stays
  unreadable; its existence — usually the part that mattered — does not.
- **Hosting inside the private member** hides the workspace from every public
  contributor: a public member's membership backlink points at a repository
  they cannot read.

A dedicated private host gives **each reader exactly what they are entitled
to**. Insiders resolve the whole workspace. Outsiders who can read a public
member but not the host get the kernel's standalone view — that member's own
souls with their `from: here` capabilities plus `oats.core` — so a public soul
stays spawnable by someone who has never seen the workspace file.

The host is itself a member (it backlinks to itself), so it appears in its own
list. That is harmless only if the host is private; hence "not a public
member", not merely "private".

# Decide before the first sync

Every member's `oats-membership.yaml` and every machine's `oats-local.yaml`
point at the host by repo ref. Moving the host later touches every member
repository and re-points every deployment on every machine, sequenced per
deployment ([cutover is sequenced per deployment](/nodes/oats-operator-expert/playbooks/cutover-is-sequenced-per-deployment.md)).
Disclosure is also irreversible: a member name that spent a week in a public
host is in public history for good.

This is a case of
[place each fact at the scope that owns it](/nodes/oats-operator-expert/lessons/place-each-fact-at-the-scope-that-owns-it.md):
the member list is an organisation-level fact whose audience is the
organisation's insiders.

# Rejected

- Two half-hosts (a public one for outsiders, a private one for insiders): two
  workspaces for one organisation, forking every default.
- "Fixing" a leak by moving the definition into the private member: public
  contributors lose the workspace and file issues about unresolvable backlinks.

# Consequences

- A mixed workspace has one more repository than it has "real" members.
- Private souls may live in the host; public souls live in public members so
  the standalone view keeps them usable.
- An acceptance run should include an outside operator confirming that a
  public member discloses nothing beyond its own contents.

# Citations

- [workspaces.md](https://github.com/awebai/oats/blob/main/docs/workspaces.md)
  (membership handshake, the standalone case) and
  [first-team.md](https://github.com/awebai/oats/blob/main/docs/first-team.md)
  "The standalone case".
- Original rationale: [`docs/rebuild-to-v2.md` at v0.25.9](https://github.com/awebai/oats/blob/v0.25.9/docs/rebuild-to-v2.md),
  "Decide the one workspace".
