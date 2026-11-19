---
type: Lesson
title: A limit in coordination texts is checked before any fallback and binds the value actually used
description: A limit such as the model floor for children lives once in the shared rules, is checked before any preference and its fallbacks, binds the value a child would actually launch on (soul defaults and machine overrides included), and treats an unknown tier as below it; changing a rule's kind (relative to absolute) means re-reading every sentence that leaned on the old form.
about: [workstream/coordination]
kind: lesson
id: ins-eae2b8e0d55b
tags: [templates, model-floor, instructions, review, adaptation]
timestamp: 2026-11-12
---

# Three shapes failed before one held

The engineering template's model floor for children (template-v3.1.3) took
three review rounds after a lead launched a child on a weaker model:

1. A NEVER line in two role injects lost to skills elsewhere that said "if no
   different model is available, use the effective one", and other roles never
   saw it.
2. The rule in the landing rules, checked first, still exempted a soul's
   default or a machine's override, because the texts told the parent to let
   the machine's choice apply.
3. Accepted: one rule in the landing rules with one adapt marker; it comes
   before model diversity; it binds the model a child would launch on,
   wherever that comes from; a tier that can't be established is below the
   floor; skills that pick a model open with "the floor comes first"; a role
   that loads no landing rules (the code reviewer) carries its own sentence.

A limit stated beside a preference loses to the preference's fallback unless
the text says which is checked first, and a limit that exempts configuration
is not a limit on what runs.

# A copy that changes the rule's kind

The template's floor was relative ("no child on a weaker tier than its
parent's"), under which "otherwise use your own model" is always safe, so three
texts used it as the fallback. OATS answered the marker with an absolute floor
(named tiers) and ported the fallbacks unchanged: they now let a below-floor
parent spawn a below-floor child. Round 1 of that port's review
(oats-project/oats#1895) caught it before merge.

When an adapt-marker answer changes a rule's kind (relative to absolute, optional to required), list every sentence that
points at the rule and every role that does not load its text, re-read each
against the new form, and put that in the port's review brief as its own item.

Evidence: OKF proposal from oats-engineering-expert/coordination-build-lead, 2026-11-19; notes/handover-from-oats-engineering-expert-coordination-remainder/notes/handover-coordination-remainder/notes/a-floor-is-checked-before-any-fallback-and-binds-configured-values.md, notes/handover-from-oats-engineering-expert-coordination-remainder/notes/handover-coordination-remainder/notes/a-rule-relative-to-the-parent-breaks-when-a-copy-makes-it-absolute.md.

Checked at maintainer review, 2026-11-19: the three rounds and their findings
are in the description and review commits of
[oats-project/oats-engineering-coordination#20](https://github.com/oats-project/oats-engineering-coordination/pull/20)
(merged at `10d5577c`, template-v3.1.3); OATS's port is
[oats-project/oats#1895](https://github.com/oats-project/oats/pull/1895)
(merged at `06da3462`), whose round-1 commit `9770234b` makes the own-model
fallbacks hold only where they meet the absolute floor.
