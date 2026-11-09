---
type: Lesson
title: When writing or adopting agent skills, take a few focused rules and targeted context, not packs or procedures
description: A 2026-11-09 survey for the engineering template found no community skill pack with published evidence of better code, while measured results favoured focused skills over exhaustive bundles, telling the agent which tests a change affects over test-first procedure (which alone made regressions worse), and quality guidance re-applied on every change; so the lead takes individual permissively licensed rules in its own words, points at each skill from the always-loaded text, and never installs a pack whole.
tags: [skills, instructions, research, developers, cross-area]
timestamp: 2026-11-09
---
# The tempting choices are the ones the evidence is against

A lead asked to give the developers "good skills" has two obvious moves:
vendor a popular community pack whole, or write a procedure-heavy
test-driven skill. Both look right. The source's 2026-11-09 survey for the
engineering template found that neither has evidence behind it, and that
the procedure on its own measured worse than no procedure. The template
carries the outcome of that survey; this lesson carries the reasons, so
that the next lead does not redo the survey or reverse the choice without
new evidence.

# What the measured results favour

The source reports these results from reading the abstracts, not the full
papers; the figures are the source's, and this harvest did not open them.

- **Keep each skill focused.** SkillsBench (arXiv 2602.12670) reports
  focused skills of about three modules beating exhaustive bundles, with a
  +16.6-point overall gain for skills; the source says the
  software-engineering split was not verified. Write a skill as a few
  sections on one job, not as a complete handbook.
- **Lead with targeted context, not procedure.** TDAD (arXiv 2603.17973,
  small open models) reports that test-first instructions alone raised
  regressions from 6.08% to 9.94%, while telling the agent which existing
  tests a change affects cut them to 1.82%. A test-first skill therefore
  starts by finding the affected tests; the ritual without the context is
  worse than nothing. The lead's own
  [affected-test inventory check](/nodes/oats-expert/lessons/check-affected-test-inventory-at-handback.md)
  owns verifying, at handback, that those tests were found and run.
- **Re-apply quality guidance on every slice.** SlopCodeBench (arXiv
  2603.24755) reports that quality guidance cut first-draft verbosity and
  erosion by up to a third but did not slow degradation over later changes.
  Guidance applied once at the start of an effort fades; it goes with every
  change.
- **Point at each skill from the always-loaded text.** An agent skips a
  skill nothing points it at. [Condensing instructions](/nodes/oats-expert/lessons/condensing-instructions-preserves-load-triggers.md)
  owns the general rule that an available skill is not a loaded one; here
  it means every skill the template adds gets its trigger in the inject.

# Take rules, never a pack

The source reports that none of the popular packs it surveyed publishes
evidence that it produces better code; what is measured is practices, not
packs. Two kinds of pack conflict with how this project works even where
their rules are good:

- a pack whose routing skill tells the agent to invoke it on the slightest
  chance a task matches, overriding the project's own routing;
- a pack that runs a single-agent pipeline (plan, build, review in one
  session), which conflicts with the project's checks run as calls to a
  fresh reviewer on another model (see [hand-offs by message](/nodes/oats-expert/lessons/send-a-hand-off-by-message-to-every-waiter-at-an-exact-head.md)
  and, on why independence matters, the research node's
  [verifier-evidence lesson](/nodes/market-research-expert/lessons/verification-needs-independent-evidence.md)).

So the rule the source adopted for the template, and the one this lesson
keeps: take individual rules from permissively licensed sources (MIT, with
their notices kept), rewritten in the project's own words and sized as
above; reject a pack whose licence is share-alike for text the project
will rework; and never install a pack whole. A pack is a set of
candidates to read, not a dependency to add.

# Canonical boundaries and prevention

This lesson is about what a skill meant to improve an agent's work should
contain and how it is adopted. [A nested skill's order](/nodes/oats-expert/lessons/a-skill-run-inside-another-states-one-order-mapped-to-the-hosts-steps.md)
owns the authoring rule for a skill run inside another, and
[condensing instructions](/nodes/oats-expert/lessons/condensing-instructions-preserves-load-triggers.md)
owns load coverage. The research node's verifier lesson owns the evidence
on reviewer independence; this lesson only applies it to pack selection.

The lasting home for these rules is the guidance that teaches skill
authoring, so that a skill is checked for focus, targeted context and a
trigger without anyone remembering this lesson. That is a prevention
route named here, not a delivered check; this harvest changes no skill.

# Evidence and limits

Evidence: OKF proposal from oats-expert/oats-expert-coordination-rethink,
2026-11-09; notes/agent-skills-evidence-favours-focused-rules-and-targeted-context.md.

The source reports a survey on 2026-11-09 for the engineering template
([oats-project/oats-engineering-coordination#4](https://github.com/oats-project/oats-engineering-coordination/pull/4),
an open pull request when harvested; the maintainer's review found it
merged later on 2026-11-09, so the template now carries the adopted
skills), in which it read the three abstracts, checked the packs' licences through
GitHub's API, and surveyed the packs superpowers, mattpocock/skills,
addyosmani/agent-skills, compound-engineering and HumanLayer RPI; it
rejected installing superpowers whole for its routing override and Trail
of Bits' skills for their share-alike licence. This harvest did not read
the survey, the papers, the packs or their licences; the figures, the
licence readings and the absence of published pack evidence are the
source's, as of that date.

Limits the source states: TDAD used small open models; SkillsBench is one
benchmark and its software-engineering split is unverified; the pack
evidence is practitioner reports. None of this is a measured result for
this project's models or repositories, and the template's adopted rules
were merged into one template; they are not a project-wide policy.
