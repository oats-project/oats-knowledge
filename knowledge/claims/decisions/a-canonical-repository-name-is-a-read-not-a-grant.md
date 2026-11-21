---
type: Decision
title: A canonical repository name GitHub returns is a read, not a grant; publication writes to it only after it reads back with the same node id
description: When oats.okf publication resolves a bound owner/repo to GitHub's canonical name (after a rename or transfer), every later gh call names the canonical repository, but only after a second read of that name returns the same node id as the first; any other answer refuses E_GH before the push, and an answer with a JSON-scalar node id, a name with a `.` or `..` segment, or not exactly the fields asked for establishes nothing (E_GH_UNAVAILABLE, gh-failed).
about: [system/oats-okf, workstream/provider-integration]
kind: decision
id: dec-0468895993a6
tags: [decision, okf, publication, github, rename, transfer, identity, preflight, contract]
timestamp: 2026-11-21
---

# Status

Decided as a contract condition for the fix of
[oats-okf#123](https://github.com/oats-project/oats-okf/issues/123), and
built in [oats-okf#169](https://github.com/oats-project/oats-okf/pull/169).
At review on 2026-11-21 that PR was **open, not merged or released**; it
targets the next oats.okf after 6.3.0. Until it ships, the released helper
still compares the printed PR URL with the bound name.

# The decision

The publish preflight reads `gh api --hostname github.com repos/<bound> --jq '.permissions.push, .full_name, .node_id'`. If `full_name` differs from the bound name, it reads `repos/<full_name> --jq '.full_name, .node_id'` and requires exactly that name and the same node id. Then `create` names the canonical repository in the label, `pr create`, the URL check and the PR read-back, so no write goes through GitHub's redirect.

What establishes nothing, and refuses `E_GH_UNAVAILABLE` / `gh-failed` before the push:
- an answer that is not exactly the fields asked for;
- a node id that is a JSON scalar (`null`, `true`, `false`, a number). gh's `--jq` prints a missing field as the bare word `null`, which an id grammar like `[A-Za-z0-9_=-]+` accepts;
- a returned owner/repo with a `.` or `..` segment. It would make `repos/<name>` another API path. (A bound `--github` name with such a segment is refused earlier, as `E_GITHUB`.)

# Why

Both sides of the contract set this as a condition: an answer that mentions a name must not move writes to another repository. The node-id read-back ties the name to the repository the bindings led to. This follows the rule behind [the publish preflight passes only on an explicit true](/nodes/oats-okf-expert/decisions/the-publish-preflight-passes-only-on-an-explicit-rest-push-permission.md): a gate before an irreversible step passes only on a positive statement.

It builds on [a harvest is published only when the forge reads back an open PR](/nodes/oats-maintainer/decisions/publication-is-proven-by-the-forge-readback.md) (`dec-279ee8a255af`), which requires the confirmed PR to be on the canonical name the forge gives for the bound repository and rejects trusting any URL the forge returns. This decision adds where the writes go and what makes the canonical name trustworthy; it supersedes nothing there. The GitHub behaviour behind it is [GitHub answers a renamed repository's old name differently for reads and writes](/claims/lessons/github-answers-a-renamed-repositorys-old-name-differently-for-reads-and-writes.md).

# Rejected

Accepting any `https://github.com/<o>/<r>/pull/<n>` URL and confirming the PR by number. That leaves the writes going through the redirect, and the confirmation reads through it too.

# Limits

- The push still goes to the bindings' Git URL, through GitHub's Git redirect; `W_REPOSITORY_MOVED` tells the operator to update the bindings.
- A second rename between the pre-push gate and `create`'s own read is not covered ([oats-okf#168](https://github.com/oats-project/oats-okf/issues/168), open at review).

# Evidence

- [oats-okf#169](https://github.com/oats-project/oats-okf/pull/169), at head `dff96544a444`: `publishPreflight` reads the three fields, re-reads a differing `full_name` and refuses `E_GH` unless it answers the same name and node id; the node-id check rejects `null`, `true`, `false` and numbers, and the name check rejects `.` and `..` segments (verified at review). Its description records five review rounds and a delta read, with round 3 finding the `null` node id (source-reported: the rounds are not posted as PR reviews).
- The contract, and this condition, decided by Pepe's side (setup-maintainer) and Juan's side (oats-expert-juan) on 2026-11-20 and 2026-11-21. The decision itself is source-reported, from the mail relays the proposal names. Its acceptance at the built head is verified at two GitHub records on #169, both at `dff96544a444`, 2026-11-21: Juan's side's approval, under `juanre`, names "Condition 2: the canonical name is a read, not a grant" as one of its two conditions and finds it held ([comment](https://github.com/oats-project/oats-okf/pull/169#issuecomment-7067550574)); Pepe's side's green light, under `josep-reyero`, does the same ([comment](https://github.com/oats-project/oats-okf/pull/169#issuecomment-7067541262)).
- Evidence: OKF proposal from oats-engineering-expert/okf-moved-repo-publication-lead, 2026-11-21; notes/canonical-repository-name-is-a-read-not-a-grant.md.
