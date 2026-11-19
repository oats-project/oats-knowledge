---
type: Lesson
title: A blanket version bump in a template also rewrites citations of a sibling template's release
description: Sibling templates share version strings, so a search-and-replace of the old release corrupts provenance lines that cite another template; bump only the template's own version places, and a provenance line only where its passage was retaken, to the source's release.
about: [workstream/coordination]
kind: lesson
id: ins-686b7f2a5602
tags: [templates, release, provenance, review]
timestamp: 2026-11-12
---

# What happened

The research and science coordination templates carry provenance lines
("taken from the engineering template, template-vX") for passages they share.
A template's own release and a cited release of another template can be the
same string. Bumping the research template to template-v2.1.1 with a blanket
replace moved three citations of the engineering template to a release that
template never had; review of that PR caught it.

# What to do

Bump a template's own version only in its manifests, changelog, package file
and the tests that pin it. Touch a provenance line only where the passage it
names was retaken in this release, and to the source template's release. A
reviewer can check provenance only if it can read the source template at the
cited tag, so the brief says where that is.

Evidence: OKF proposal from oats-engineering-expert/coordination-build-lead, 2026-11-19; notes/handover-from-oats-engineering-expert-coordination-remainder/notes/handover-coordination-remainder/notes/a-blanket-version-bump-rewrites-other-templates-citations.md.

Checked at maintainer review, 2026-11-19: the round-1 fix of
[oats-project/oats-research-coordination#10](https://github.com/oats-project/oats-research-coordination/pull/10)
(commit `85adb426`, "provenance lines name the release each passage was taken
at") moves three citations from template-v2.1.1, which the engineering
template never released, back to template-v2.1.0.
