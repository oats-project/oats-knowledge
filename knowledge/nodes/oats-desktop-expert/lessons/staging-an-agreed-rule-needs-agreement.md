---
type: Lesson
title: Splitting an agreed rule across PRs also needs agreement
description: A Desktop implementation plan cannot silently narrow an agreed rule; obtain agreement on omitted cases before building a staged delivery and verify every included case through its actual defaults.
about: [system/oats-desktop]
kind: lesson
id: ins-ff8d85afd3dc
tags: [desktop, planning, review, contracts, deadlines]
timestamp: 2026-10-14
---
# A private staging plan does not amend the decision

The source reports an agreed lifecycle rule covering both applies and starts:
the waiting deadline must not end the child, and each operation runs in its
own session. The expert staged starts into a later PR because of another
dependency. The first PR nevertheless claimed the rule while a detached
start still inherited a shared helper's child-killing timeout. The second
reader returned it and the staging was rejected.

The failure was not merely a missed timeout. The expert's implementation
plan had silently reduced the agreed scope. When a PR claims an agreed rule,
reviewers reasonably check all cases named by that rule, not the author's
private slice of it. If delivery must be split, put the proposed split on the
issue before the build, identify what each part leaves undone, and obtain the
relevant decision-makers' agreement. Otherwise keep the named cases together.
This lesson does not grant a new release or merge exception.

# Verify cases, not only the new lines

Map each case in the decision to its actual path, including inherited helper
defaults. A detached child can still be killed by an adapter's default even
when the new code contains no explicit kill. The separate
[nested-deadline lesson](nested-deadlines-must-let-the-inner-outcome-arrive.md)
owns whether an inner answer can reach a view; this lesson owns agreement on
scope and the missed start case, not a universal deadline policy.

The elimination route is explicit operation-specific lifetime semantics and
regressions for each named apply/start path, including default arguments.
Tests can expose the omitted case; they cannot decide that shipping it later
was authorized. Make the agreed case-to-PR mapping part of the specification
and handback rather than relying on the expert to remember the discussion.

# Evidence

Evidence: OKF proposal from oats-desktop-expert/oats-desktop-expert-REDACTED-desktop-queue, 2026-10-14; notes/a-decided-rule-is-not-staged-across-prs-without-saying-so.md.

The source identifies [awebai/oats#855](https://github.com/awebai/oats/issues/855)
section 5a(a), the start-lock rationale in
[#889](https://github.com/awebai/oats/issues/889), and the reported correction in
[#1164](https://github.com/awebai/oats/pull/1164). Agreement, rejection and the
fix are source-reported, not independently audited acceptance or test evidence.
