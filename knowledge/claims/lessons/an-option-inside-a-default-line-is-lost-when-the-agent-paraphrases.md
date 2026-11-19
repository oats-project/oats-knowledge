---
type: Lesson
title: An option offered inside a skill's default line is lost when the agent paraphrases it; say which part must survive
description: A skill that gives the agent a line to show the person ("the line says …") gets paraphrased, and the model keeps the half that fits its current path; an alternative offered only in the other half becomes unreachable. Say in the skill which part must survive, and why, and judge discoverability from a run on the newcomer's default model.
about: [workstream/operations]
kind: lesson
id: ins-552d6ed115db
tags: [onboarding, skills, getting-started, newcomer, vm-run]
timestamp: 2026-11-19
---

# A branch two reviews passed was unreachable in the run

The `oats-getting-started` skill offers a branch for a person who runs their
own aweb server inside step 1's default line: "The line says 'on aweb's hosted
service, unless you run your own aweb server'; hosted is the default." Two
review rounds read that text and found it correct, and a test pinned its
literal wording.

In a VM run of the hosted path, the agent (Claude Code with the newcomer's
default model) showed the person "aweb's hosted service, using a new account
named <N>, with no sign-in needed". It kept the default and dropped the
"unless" half, so a person with their own server was never told the branch
existed. A test of the skill's text can't catch this: it reads the skill, not
what the agent says.

# What to do

- When a skill offers an option inside a default line, say explicitly which
  part the agent must keep in its own words, and why ("it is how a person
  with their own server learns this branch exists"). The fix in
  oats-project/oats#1962 does this, and a test pins the instruction.
- Judge whether a person can find an option from a run on the newcomer's
  default model, not from the skill's text. A reviewer reads the text as
  written, and that is not what the newcomer's agent shows. This is one case
  of the accepted direction that
  [onboarding passes on the newcomer's experience](/nodes/oats-operator-expert/decisions/onboarding-passes-on-the-newcomers-experience.md).

This is the presentation-side counterpart of
[checking what a text says a command does against the kernel](/claims/lessons/a-text-that-says-what-a-command-does-is-checked-against-the-kernel.md):
there, the text is wrong about the tool; here, the text is right but the agent
doesn't pass it on.

Evidence: OKF proposal from oats-engineering-expert/byot-getting-started-lead, 2026-11-19; notes/newcomer-model-paraphrase-drops-an-unless-clause.md. The VM run's hosted leg was at oats-project/oats#1962 266dedd8 (OATS 0.69.20, Claude Code 2.1.328, claude-sonnet-5-5); the fix is at c3ae543a.

Checked at maintainer review, 2026-11-19: on
[oats-project/oats#1962](https://github.com/oats-project/oats/pull/1962), open
and unmerged at this review, the PR body records review rounds r1 and r2 on
gpt-6.1-sol approving with nits that did not touch the "unless" half, and VM
run 1b at `266dedd8` (OATS 0.69.20, Claude Code 2.1.328, claude-sonnet-5-5)
finding that the model dropped "unless you run your own aweb server". Commit
`c3ae543a` adds the keep-the-second-half sentence to step 1 and pins it in
`test/getting-started-byot.test.mjs`, beside the existing assertion on the
line's literal wording. The agent's quoted rendering is the author's report in
that commit message and PR body.
