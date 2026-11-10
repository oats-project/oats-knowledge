---
type: Lesson
title: Blocked live verification needs an owned handback
description: When an agent cannot run Desktop live, name what automated evidence leaves unproven and turn those gaps into concrete human checks rather than silently waive live verification.
about: [system/oats-desktop]
kind: lesson
id: ins-a9ec283f3f44
tags: [desktop, verification, handover, accessibility, operator-safety]
timestamp: 2026-10-14
---
# The missing evidence must acquire an owner

A restriction on launching the app changes who can gather live evidence,
not what passing DOM tests prove. The source reports a 2026-10-14 lane rule
that prohibited Electron on the build host, including dev builds. Its
replacement for the developer's live-verification item was an explicit
handback of unproven behavior; the Desktop expert turned that list into
post-deployment steps for the product owner. The useful lesson is this
transfer of evidence responsibility, not a new blanket ban on Electron.

Permitted DOM tests still carry assertions about keyboard handling, focus,
repaint, attribution and theme tokens. They do not establish the corresponding
native behavior or visual result. The developer identifies the remaining
gaps; the expert translates them into exact actions and expected observations
for a person in the real app, with the required environment and feature cases
made explicit. A green run list is not that handback, and a written human
check is not a completed check.

For the soul-skills change, the reported gaps covered real layout (ellipsis,
tooltips, sticky headings and scroll offsets), screen-reader browse mode,
unseen theme pixels, native key events and focus, external-link opening, and
answers from a deployed kernel including routed hosts with and without the
feature. These are examples of what DOM/unit-only evidence left open, not a
permanent checklist or a claim that integration automation can never cover
them.

# Boundaries and elimination route

The [live quality bar](../decisions/design-direction-and-quality-bar.md)
remains: important flows need live evidence. This lesson neither waives that
bar nor grants permission to deploy before existing acceptance gates are met.
Post-deployment timing was the source's reported arrangement, not a general
release-policy exception. Respect the actual lane restriction and the
[operator-machine safety rules](verification-judgment-for-privileged-surfaces.md#operator-machine-safety-is-part-of-verification-judgment);
a dev build is not a workaround for a rule that forbids Electron itself.

Move repeatable native and deployed-contract cases into effect-isolated,
throwaway integration/CI verification where authorized. The existing
[Linux packaged-shell finding](verification-judgment-for-privileged-surfaces.md#linux-can-exercise-the-packaged-shell-in-ci)
shows why a local prohibition is not proof that all runtime automation is
impossible; shell reach alone still does not prove a changed view. Residual
human-check ownership belongs in the existing Desktop verification guidance
(the source was composed with `oats.desktop-ui`'s
`electron-live-verification` skill), for separate review, not in an expanding
knowledge inventory of test steps. No skill or new automated gate is claimed
changed here.

The generalist's
[affected-test inventory lesson](/nodes/oats-expert/lessons/check-affected-test-inventory-at-handback.md)
owns whether selected tests cover a change's consumers. This lesson owns the
different gap: what even those permitted, passing tests cannot establish
without the real app and an identified live verifier.

# Evidence and limits

Evidence: OKF proposal from oats-desktop-expert/oats-desktop-expert-soul-skills, 2026-10-14.

The proposal associates the work with
[awebai/oats#1144](https://github.com/awebai/oats/issues/1144),
[#1178](https://github.com/awebai/oats/pull/1178) and
[#1201](https://github.com/awebai/oats/pull/1201). It reports the lane rule and
conversion of six classes of unproven items into human steps. No backing note
was named; this harvest did not inspect the developer's handback or run the
app. Neither the proposal nor this lesson establishes completion of those
human checks.

Maintainer check, 2026-10-30: #1201's description confirms the lane rule and
lists what was left for a person after deployment. It also reports one earlier
dev-build pass against an unreviewed kernel commit, and no live run on the
final kernel. #1144 reports the check on the real app as coming after
deployment, with steps from the lead. Neither shows that check was done.
