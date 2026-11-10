---
type: Lesson
title: Interim docs create migration inputs for the later command
description: When interim docs teach a manual artifact that a later command will manage, name those copies in the command spec, justify adoption or refusal from their authorship and ownership, and plan the migration text with the command's docs follow-up.
about: [workstream/coordination]
kind: lesson
id: ins-fd87abe8897b
tags: [planning, documentation, migration, ownership]
timestamp: 2026-10-15
---
# Docs-first changes the command's starting state

A plan that publishes manual setup instructions before a managing command
can create an installed population through its own documentation. Copies made
that way are migration inputs, not merely generic foreign files. Name them
explicitly among the command's inputs at specification time, even when the
spec already covers foreign artifacts in general.

Choose whether the command adopts or refuses them, and record why. An
operator-authored copy may contain intentional customizations; silently
replacing it can lose work even when it occupies the expected path and
started from the project's example. Earlier generated copies present a
different ownership question: recognition may need to cover a pre-marker
format. Generated origin is not blanket takeover permission, and the
expected name alone proves neither origin nor ownership.

Plan the migration paragraph at the same time as the command contract, so
it ships with the command's documentation follow-up rather than being found
in later review. Explain how an operator moves from the previously taught
state to the managed state, including the reason for any refusal. This is
not a reason to delay all interim documentation; it is a consequence that
the docs-first plan must own.

# Distinct from service policy and wording review

The maintainer's [capture-service decision](/nodes/oats-maintainer/decisions/capture-service-is-package-owned-and-bounded.md)
is canonical for that service's migration and recognition of pre-marker
files. This lesson does not reverse it or impose the wake service's refusal
policy on other services. It preserves the generalist's earlier planning
question: what installed state did our own interim instructions create,
and what makes adoption or refusal appropriate for that state?

[Rechecking dictated wording against the build](/nodes/oats-expert/lessons/recheck-dictated-words-against-the-build.md)
addresses a later gap. Accurate final command docs alone do not ensure the
spec considered artifacts created by earlier instructions.

# Elimination route

Enforce the chosen ownership boundary in the command, with regression
fixtures for copies made from the earlier published instructions and for
operator-customized variants. Exercise the documented transition against
those fixtures where practical. Specification guidance should explicitly
ask about artifacts taught by interim docs and assign the migration text
in the delivery plan. These are proposed prevention routes, not claims that
such tests or guidance have shipped; this lesson changes no soul skill or
release authority.

# Evidence and limits

Evidence: OKF proposal from oats-expert/oats-expert-onboarding-channels, 2026-10-15; notes/interim-docs-before-a-managing-command.md.

The source reports one occurrence: the [onboarding plan](https://github.com/awebai/oats/issues/1224)
allowed docs to precede the managing command; [oats.setup 2.6.0](https://github.com/awebai/oats/pull/1232)
taught a hand-written wake service unit, while [oats.aweb 1.28.0](https://github.com/awebai/oats-aweb/pull/119)
refused unmarked copies. The spec covered foreign units but did not name
those taught by the interim docs. A maintainer raised that gap after the
provider merge, and [oats.setup 2.6.1](https://github.com/awebai/oats/pull/1234)
added the transition guidance. The source's rationale for refusal was
preserving possible operator edits, rather than silently adopting them.

The proposal and captured note support the sequencing lesson; this harvest
did not audit those implementation discussions or reproduce the migration.
One reported occurrence does not establish how often this happens, that
operators actually lost edits, or a universal adopt/refuse policy.
