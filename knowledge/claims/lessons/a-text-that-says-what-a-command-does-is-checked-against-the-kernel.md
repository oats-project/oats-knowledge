---
type: Lesson
title: A text that says what a command does in a case is checked against the kernel, not against help output
description: When an instruction text says a command refuses, accepts, keeps or removes something in a given case, the review brief makes that claim its own criterion, run read-only or traced to the code path; "the command and its flags exist" is not that check.
about: [workstream/coordination]
kind: lesson
id: ins-5ad603dd7e21
tags: [instructions, review, briefs, kernel, templates]
timestamp: 2026-11-16
---

# A branch nobody could reach passed two reads

A patch to the engineering coordination template's maintainer lookup
(template-v4.0.1) told an agent: when a spawn is refused because the name is
taken and that instance is retired, take another name. A fresh reviewer
approved it and the other side's expert said yes. It was wrong: the kernel
refuses a name only while a home or a live window holds it, so a retired name
is accepted and the branch can never be reached. The release lane found it by
reading the kernel's check, and returned the patch once.

The reviewers' criterion was that the command and its flags exist, read from
help output. Existence is not behaviour, and nothing in their brief asked
anyone to test a claim about when the command refuses.

# What to do

For every sentence of an instruction text that says what a tool does in a
case (refuses, accepts, keeps, removes, retains), write the check into the
review brief as its own "done when" item: run it read-only where that is
possible (for a name, `oats instance events <name>` for a retired name and a
never-used one), otherwise read the code path and cite the line. The second
brief of that patch did, and its reviewer ran both cases.

This is one of the mechanics a rework of instruction texts loses or invents;
see [the table a rework is reviewed against](/claims/lessons/a-rework-of-instruction-rules-is-reviewed-against-a-written-table.md).

Evidence: OKF proposal from oats-engineering-expert/coordination-build-lead, 2026-11-19; notes/handover-from-oats-engineering-expert-coordination-remainder/notes/handover-coordination-remainder/notes/a-text-that-teaches-what-a-refusal-means-is-checked-against-the-kernel.md.

Checked at maintainer review, 2026-11-19: the approvals and the release lane's
RETURN are on
[oats-project/oats-engineering-coordination#22](https://github.com/oats-project/oats-engineering-coordination/pull/22#issuecomment-6923159863)
(merged at `35cf1f93`), and the kernel's name check at oats `2982198e`
(`lib/core.mjs`, the `E_INSTANCE_NAME_TAKEN` refusals) refuses only a name a
home of this deployment or a live tmux window holds. That the first reviewers'
criterion was read from help output is the source's report.
