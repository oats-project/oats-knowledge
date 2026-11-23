---
type: Lesson
title: GitHub answers a renamed or transferred repository's old name with a 301 for reads and a 307 for writes, so publication must not write through the old name
description: After a rename or transfer, REST GETs to the old name follow a 301 to the canonical repository, GraphQL resolves the old name, and `gh pr create` prints the PR URL under the canonical name; but an empty-body REST POST to the old name got a 307 to /repositories/<id>/..., which `gh api` did not follow (other writes have since been carried, so the 307 is not every write's answer), so a check that compares GitHub's URL with the bound name fails and a write through the old name depends on each gh subcommand's redirect handling.
about: [system/oats-okf, workstream/provider-integration]
kind: lesson
id: ins-822c3d82cbe9
tags: [lesson, github, gh, rename, transfer, redirect, publication]
timestamp: 2026-11-21
---

# What was observed

Read-only probes on 2026-11-20, gh 2.102.0, against `awebai/oats-knowledge`, which had moved to `oats-project/oats-knowledge`:
- `gh api repos/<old> --jq .full_name` answers the canonical name, with the same node id.
- GraphQL `repository(owner, name)` resolves the old name.
- `gh api -i -X POST repos/<old>/labels` with an empty body answers `HTTP/2.0 307`, with `Location: https://api.github.com/repositories/<id>/labels`, and gh does not follow it. GitHub refuses before writing anything.
- `gh pr create --repo <old>` prints `https://github.com/<canonical>/pull/<n>`.

Narrowed on 2026-11-23: [REST writes through awebai/oats were carried](/claims/lessons/rest-writes-through-a-renamed-repositorys-old-name-were-carried-for-oats.md). POSTs with fields and a PUT merge through that old name succeeded, so the 307 above is what this empty-body probe got, not GitHub's answer to every write; which writes it hits is not established. The rule below is unchanged.

# What it cost

Five oats.okf proposals and harvests opened PRs and reported `E_PR_UNCERTAIN` (oats-knowledge #307, #407, #416, #417, #421): the URL check compared against the old name. One run on 2026-11-20 pushed its branch, got `E_GH` and opened no PR. The 307 is the likely cause, not proven: the helper's errors carry no gh output.

This is the mechanism under the move lessons' "reads do; publication does not": [a transfer rehearsal must check what the forge returns](/nodes/oats-maintainer/lessons/a-transfer-rehearsal-must-check-what-the-forge-returns.md) and [a repository move's inventory follows what each consumer reads](/nodes/oats-expert/lessons/a-moves-inventory-follows-what-each-consumer-reads.md) hold the incident and the planning rule; this lesson adds which calls a redirect carries and which it does not.

# How to apply

- Resolve the canonical name once, read-only, before the irreversible step, and name it in every write: see [a canonical repository name is a read, not a grant](/claims/decisions/a-canonical-repository-name-is-a-read-not-a-grant.md).
- Recovery commands printed after a push name the repository the branch went to, and pin the host: `gh api --hostname github.com …`, `--repo github.com/<owner>/<repo>`. Never route them through a clone's `origin`: that is the bindings' URL as written, and after a move it can be stale even when `pr.repository` was corrected.

# Elimination route

The rule is code in oats.okf's publication helper, [oats-okf#169](https://github.com/oats-project/oats-okf/pull/169) (open at review on 2026-11-21, for the release after 6.3.0). The lesson stays for any other tool that writes to GitHub by a bound name.

# Evidence

- [oats-okf#123](https://github.com/oats-project/oats-okf/issues/123): its body names #307 and the canonical URL `gh pr create` printed; [comment 7024835174](https://github.com/oats-project/oats-okf/issues/123#issuecomment-7024835174) names #407, #416, #417 and #421 as `E_PR_UNCERTAIN` with their PRs open; [comment 7034226769](https://github.com/oats-project/oats-okf/issues/123#issuecomment-7034226769) records the pushed branch with `E_GH` and no PR (all verified at review).
- At review, an unauthenticated GET of the old name's REST repository answered 301 to `/repositories/<id>`. The 307 on a POST, the GraphQL resolution and gh's handling are the source's probes, repeated in #169's description; an unauthenticated POST answers 401 before any redirect, so the 307 was not reproduced here.
- Evidence: OKF proposal from oats-engineering-expert/okf-moved-repo-publication-lead, 2026-11-21; notes/github-renamed-repo-redirects-get-not-post.md.
