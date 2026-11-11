---
type: Lesson
title: GitHub branch-protection reads answer in three ways, and only two successful reads mean no protection
description: The rulesets read never shows classic protection and the classic read tells "unprotected" from "unreadable" only by its 404 body, so a branch can be concluded unprotected only when both reads succeed and neither gates; a failed read means unknown, never none.
about: [system/oats-okf]
kind: lesson
id: ins-805976e4ce00
tags: [lesson, okf, github, branch-protection, rulesets, bases, api]
timestamp: 2026-11-10
---

# What the two reads say

- **Rulesets** (`repos/<o>/<r>/rules/branches/<b>`): lists the rules a ruleset applies to the branch. It never
  shows classic protection. Public repositories answer it without admin rights; a private repository on a plan
  without rulesets answers 403 ("Upgrade to GitHub Pro or make this repository public").
- **Classic** (`repos/<o>/<r>/branches/<b>/protection`): 200 with an object when the branch has classic protection;
  404 with body `{"message":"Branch not protected"}` when readable and unprotected; 404 `{"message":"Not Found"}` or
  403 when the caller has no admin read. Telling "unprotected" from "unreadable" needs the message text; `gh api`
  prints the body on stdout with a non-zero exit.

# What follows

Neither read alone can show that a branch is unprotected: the rulesets read is blind to classic protection, and a
404 from the classic read may only mean the caller cannot see it. "No protection" is a conclusion from two
successful reads, neither showing a rule that requires a pull request or restricts who may push. Classic protection
with status checks only counts as none: it gates no direct push. A failed read, a private repository on a plan
without rulesets included, leaves the answer unknown.

`oats okf bases` reports `protection: enforced | none | unknown` on exactly this basis and checks nothing finer
(approval counts, bypass lists, the admin-bypass setting); the package README's `protection` section is the
authoritative statement of its rule. Whoever changes that report, or advises a deployment from it, keeps `none`
for two successful reads and never reads `unknown` as unprotected.

# Evidence

- Verified by the maintainer review on 2026-11-11: the rule is `protection()` in `lib/consult.mjs` of oats.okf (from
  oats-project/oats-okf#131, first released in 6.0.0), and the README and CHANGELOG state it, including the private-
  plan 403 reading `unknown` (6.0.2). Re-probed: the classic read of oats-okf's `main` with admin access answered 404
  `Branch not protected` on stdout with a non-zero `gh` exit, and its rulesets read answered `[]`.
- Source-reported (the proposer's backing notes): on 10 November 2026 a public third-party trunk read without admin
  access answered `Not Found` on the classic read with readable rulesets, and the private scratch base of the 6.0.0
  rehearsal (11 November) answered 403 on rulesets and read `unknown`.
