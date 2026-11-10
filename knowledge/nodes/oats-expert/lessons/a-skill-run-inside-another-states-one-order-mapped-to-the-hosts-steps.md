---
type: Lesson
title: A skill run inside another skill's steps states one order and maps each step onto the host's
description: When a procedure skill is loaded from inside a host skill's steps, write its order once, name the host step each part runs in and have the host name the nested steps it runs, point every other mention at that order, and write down what applies while a person has not answered; in one effort the timing contradictions between a nested skill and its host cost two of three adversarial review rounds.
about: [workstream/coordination]
kind: lesson
id: ins-afef72b617fd
tags: [instructions, skills, review, planning, cross-area]
timestamp: 2026-11-09
---
# A nested skill's timing is where the drafts contradicted themselves

A procedure skill that another skill loads mid-procedure (onboarding,
tailoring a workspace, landing, review) has two orders to keep straight:
its own steps, and where each of them sits in the host's steps. The source
reports that in the effort adding `oats.coordination-setup`, the nested
`/adapt-to-the-organisation` runs inside `/oats-tailor-workspace`: its reads
and questions in the host's one question round, its design, proposals and
writes in the host's next step. The first drafts said in several places
when the person is asked, when a proposal card goes out and when the
sub-agent writes, and each place said it slightly differently.

Of three adversarial review rounds, two went to this class of finding.
Round two found the flow contradicting itself (asking after writing,
writing before the yes). Round three still found timing and ownership gaps:
who approves parts shared between people, what applies while one person has
not answered, and where that interim rule lives. The merged skill shows
only the converged result; the cost of reaching it is not in the text.

# Write the order and the mapping first

What converged it, and what a lead writing or specifying such a skill does
before any other prose:

- **One fixed order, stated once** at the top of the nested skill (there:
  ask, design, propose, write).
- **A two-way mapping.** Each nested step names the host step it runs in,
  and the host skill's step names the nested steps it runs. A mapping
  written on one side only lets the two drift.
- **Every other mention points at the order** instead of restating it. A
  restatement is a second copy that can disagree with the first.
- **The open state is written down:** what applies while a person has not
  answered (there, that person's lanes land as they are today under an
  interim rule, marked open and listed in the brief), and where that
  interim rule lives.

Ask for these four in the spec and check them in the first review round,
before the reviewer reads for anything else. A reviewer who finds the order
restated in several places is reading a draft that has not done this yet.

# Canonical boundaries and prevention

This refines [the composed-review lesson](/nodes/oats-expert/lessons/rule-changes-need-cross-capability-composed-review.md):
that lesson reviews neighbouring capability text for a rule that
contradicts the change; this one prevents the timing class between a
nested skill and the host that loads it, inside the text being written.
[Condensing instructions](/nodes/oats-expert/lessons/condensing-instructions-preserves-load-triggers.md)
owns the question of whether a skill is loaded when needed; this lesson
assumes the load and concerns what the loaded text says about when. The
kernel's [composed-text lesson](/nodes/oats-kernel-expert/lessons/kernel-composed-text-is-executable-surface.md)
owns the general principle that individually defensible blocks can
disagree.

The lasting home for the four rules is the guidance that teaches skill
authoring and its review, so that every nested skill is checked for them
without anyone remembering this lesson. That is a prevention route named
here, not a delivered check; this harvest changes no skill and claims no
new enforcement.

# Evidence and limits

Evidence: OKF proposal from oats-expert/oats-expert-coordination-rethink,
2026-11-09; notes/a-skill-run-inside-another-states-one-order-mapped-to-the-hosts-steps.md.

The source reports review rounds one to three of
[oats-project/oats#1762](https://github.com/oats-project/oats/pull/1762)
and its merge on 2026-11-09 after the setup lane's approval. This harvest
did not read the pull request, its review comments or the merged skill
text; the round count and the attribution of two rounds to timing are the
source's. One effort, prose skills only: it establishes neither a measured
review cost for nested skills nor a rule for skills that drive code or
tools, and it does not say how a host should load a nested skill.
