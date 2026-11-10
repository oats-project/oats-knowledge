---
type: Lesson
title: A template derived from another carries over the safety rules of the roles it drops
description: When a new template copies some of another template's roles and drops others, a safety rule that lived only in a dropped role's text (where fetched code runs, shared and read-only hosts, secrets) vanishes silently and neither the diff against the tag nor the read for granted authorities sees it; before specifying a derived template, list the source's safety rules by role, name where each lives in the new template or why it does not apply, put that list in the spec's "done when", and give a rule every role needs one shared home.
about: [workstream/coordination]
kind: lesson
id: ins-408d22b6239e
tags: [templates, derivation, specification, review, safety, hosts, secrets, cross-area]
timestamp: 2026-11-10
---
# A rule that lives only in a dropped role's text leaves with the role

Coordination ships as template repositories
([coordination policy lives in capabilities](/nodes/oats-maintainer/stewardship/coordination-policy-lives-in-capabilities.md)),
and a new template is often derived from an existing one: some roles are
copied, others are dropped and new roles written in their place. The
source's research template copied the engineering template's dispatcher,
landing rules and the lead's shared skills, and wrote a researcher and a
verifier in place of the developer and the maintainer.

The engineering template keeps its host-safety rule (run fetched code only
in a sandbox the brief names; no load on a shared host; customer and
production hosts read-only) and its full secrets rule (never a secret in a
message, brief, report, log or commit) in the developer's and maintainer's
injects, and nowhere else. The research template has neither role, so
nothing carried the rules over. Researchers download datasets, run
notebooks, install packages to reproduce a result and scrape, so they need
the host rule more than developers do.

Five review rounds and the lead's verification passed the template. The
other side's first read returned it with two blocking gaps: no host-safety
rule, and the secrets rule in the researcher's text only.

# Why the two accepted checks cannot catch this

[Verify a template adaptation twice](/nodes/oats-expert/lessons/verify-a-template-adaptation-by-its-diff-against-the-tag-and-the-authorities-it-grants.md)
gives a lead two checks for a copied template: diff each copied file
against the template at its tag, and read every authority the copied text
grants against the organisation's record. Both look at text that is
present. A rule that is absent because its role was dropped is in neither
the diff (the file was not copied) nor the granted authorities (nothing is
granted). This lesson adds the third check that a derived template needs;
it does not supersede that lesson, whose two checks still apply to the
copied files.

# Rule: list the source's safety rules by role before specifying

When specifying a template derived from another:

- list the source template's safety rules by role: hosts (where fetched
  code runs, shared hosts, read-only hosts), secrets, untrusted text,
  publishing, and one-way doors;
- for each rule, name where it lives in the new template, or say why it
  does not apply to the new roles;
- put that list in the spec's "done when", so the developer's reviewers
  and the lead's verification check it rather than the lead's memory;
- give a rule that every role needs one shared home (in the source's case
  the landing rules, under an adapt marker), not one copy per role. A rule
  with one home survives any change of roster; a rule copied per role is
  only as durable as the roles that carry it.

The last point is also the elimination route: a source template that keeps
its every-role rules in one shared file leaves nothing for a derived
template to drop. Until each template is laid out that way, the list is
the lead's step at specification, and the receiving reviewers remain the
final guard. This harvest changes no template or soul skill.

# Evidence and limits

Evidence: OKF proposal from oats-expert/oats-expert-coordination-rethink,
2026-11-10;
notes/a-template-derived-from-another-carries-the-safety-rules-of-the-roles-it-drops.md.

The source identifies
[oats-project/oats-research-coordination#1](https://github.com/oats-project/oats-research-coordination/pull/1)
(the research template at its first tag) as the derivation and the other
side's
[first read](https://github.com/oats-project/oats-research-coordination/pull/1#issuecomment-6753945376)
as the return. Checked at harvest on 2026-11-10: the repository is public,
the pull request is merged, and the return comment names exactly the two
blocking gaps above, asks for the host rule in both new roles' injects and
the landing rules under an adapt marker, and for the full secrets sentence
in the lead's, verifier's and landing-rules texts. The five review rounds,
the lead's verification, and where the engineering template keeps the two
rules are source-reported; this harvest read neither template's files.

One derivation in one organisation, caught before merge. The list of rule
kinds above is what that return caught plus the source's obvious
neighbours, not an exhaustive safety inventory for every template.
