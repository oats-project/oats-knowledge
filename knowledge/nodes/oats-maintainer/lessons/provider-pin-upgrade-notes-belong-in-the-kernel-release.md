---
type: Lesson
title: A provider pin carries its upgrade consequences into the kernel release
description: Carry crossed provider releases' operator-visible changes and upgrade steps into the kernel Upgrade section, and check prescribed installs against registry selection, upgrade commands against their platform paths, and each prescribed step against who may run it before tagging.
about: [workstream/oats-direction, workstream/provider-integration]
kind: lesson
id: ins-878b04ec0e03
tags: [release, providers, pins, upgrade, review]
timestamp: 2026-11-06
---

# The author owns upgrade coverage

A kernel release can change an operator's experience through a provider pin
without changing kernel code. During release preparation, read the provider's
CHANGELOG across the entire old-to-new version interval, not just the final
patch. Carry each operator-visible behavior change and each Upgrade step into
the kernel release's `## Upgrade`, preserving the provider's conditions and
scope. A clause under Changed does not replace the consequence or action an
operator needs to find before upgrading.

Do this in the author's preparation, before the tag, rather than relying on
the second reader to discover an omission. The source's rationale is that
operators use the kernel's release notes without reading every provider's
CHANGELOG, and released notes are not edited. This complements the existing
[semantic second read](/nodes/oats-maintainer/stewardship/review-protocol.md#release-prep-second-reads-check-hand-written-claims-2026-10-28),
not a replacement for it or a new release-approval authority.

# What exposed the gap

The source reports that OATS 0.69.9 advanced oats.aweb from 1.32.1 to 1.33.1.
The prep mentioned joined-team polling under Changed but omitted its effect
on idle Claude homes and the provider's paused-home upgrade step from
Upgrade. A second reader returned the prep for that omission. The risk was
an operator finding that an idle agent no longer answered joined-team mail,
not merely an incomplete list of changed files.

This is one reported release-prep failure, not evidence that an operator
actually suffered the outage. The provider's release artifacts own its
runtime behavior and exact upgrade procedure; this lesson keeps neither a
second procedure nor a current-version ledger. The existing
[mirror-and-pin lesson](/nodes/integrations-expert/lessons/a-provider-release-is-mirrored-and-pinned-in-one-pr.md)
owns payload parity, which cannot establish complete operator guidance.

# A prescribed step must reach its promise (2026-11-04)

Carrying a step into the notes is necessary, not sufficient. Before the tag,
the release maintainer checks the prescribed upgrade against the state it
must reach, rather than leaving that check to the second reader. This
applies to the provider's own release notes as well as the kernel notes
that carry them forward:

- **Registry selection:** for an npm prerequisite, inspect
  `npm view <pkg> dist-tags`. If the required release is not `latest`, name
  the exact versioned install rather than assuming a bare install reaches
  it. Check a range-based install's actual selection against the required
  floor; the existence of a higher published version alone proves neither
  that the command selects it nor that every range stops short.
- **Platform path:** read the code the prescribed command runs on each
  supported platform, including the upgrade of an existing installation,
  as code under review. A command named "restart" or an unchanged service
  definition does not establish that a replaced executable will run.
  Code review is not platform execution evidence.
- **Who can run it:** check who may run each prescribed step,
  not only what it does. Some commands refuse inside an OATS instance
  because the result would be wrong from there, and belong in the operator's
  own terminal. Deploys here are run by agents: the release maintainer's own
  instance, and operator instances briefed on other hosts. A step only the
  human may run, missed in planning, stops a deploy halfway or tempts a
  shortcut around the guard. The deploy brief and the deploy report name
  such a step as the human's, not as a failure; an agent never routes
  around the refusal with a manual service restart, because the refusal is
  the guard.

The source reports that the oats.aweb 1.37.0 prep required aw 1.36.54 while
npm's `latest` still named 1.36.53 and `next` named 1.36.54. Sign-off caught
the install-selection gap; a later second read caught a prescribed wake
broker restart that could leave the service down after binary replacement.
The [launchd binary-upgrade lesson](/nodes/integrations-expert/lessons/launchd-binary-upgrades-can-need-rebootstrap.md)
owns that failure and recovery judgment. Do not reproduce its platform
procedure or maintain a current package-version ledger here. When the same
risk appears in a code change under review, the
[restart review section](/nodes/oats-maintainer/stewardship/review-protocol.md#a-restart-that-can-leave-the-service-down-blocks-approval-2026-11-04)
makes it a blocker rather than an approved follow-up.

Evidence: OKF proposal from oats-maintainer/release-maintainer-pepe,
2026-11-04; notes/a-prescribed-upgrade-step-is-verified-before-the-tag.md.
This is one source-reported release, npm and launchd; the exact macOS
version was not established. No registry state, platform run or shipment
was independently verified by this harvest. The finding supports checking
the promised outcome, not a universal npm-resolution or macOS guarantee.

The source reports that the OATS 0.69.12 deploy (2026-11-04) prescribed an
aw upgrade followed by a rerun of the host wake-broker install. From the
release maintainer's instance the upgrade went through, but the install
rerun refused with the provider's inside-an-instance error, because the
service unit would record the session's environment. Another host's
operator brief, which would have met the same refusal, was corrected before
it was sent. Until the human reran the install, the broker went on running
the old binary; the
[launchd binary-upgrade lesson](/nodes/integrations-expert/lessons/launchd-binary-upgrades-can-need-rebootstrap.md)
owns why the old binary may also not be respawned there. One refused
command backs this check; the guard it illustrates is general to any
prescribed host-service command. The refusal, the brief correction and
the broker state are source-reported; this harvest ran no deploy.

Evidence: OKF proposal from oats-maintainer/release-maintainer-pepe,
2026-11-04; notes/a-prescribed-step-names-who-can-run-it.md.

# Prevention route

Prefer release tooling that enumerates the crossed provider versions and
carries their upgrade entries into the candidate notes, with checks for an
omitted release or Upgrade entry. Extend executable release checks to the
prescribed install's selected version versus the required floor. Put
platform recovery fixes and regression coverage in the provider, using
[released-state upgrade rehearsals](/nodes/oats-maintainer/stewardship/release-traps.md#rehearse-upgrades-from-released-state)
for runtime evidence, with that lesson's existing scope and gate
qualifications intact. A command-sequence fake cannot prove the service
manager will admit a replacement executable.

Whether a changelog entry changes what an operator sees or must do still
needs semantic judgment in the existing release-preparation guidance.
Until enforced, these manual checks are release-process debt, not
automation delivered here; no new release authority or skill is created.

# Evidence

Evidence: OKF proposal from oats-maintainer/release-maintainer-pepe,
2026-11-02; notes/a-pin-carries-its-providers-upgrade-lines.md.

The [second read of oats#1709](https://github.com/awebai/oats/pull/1709#issuecomment-6575948203)
was read during harvest and corroborates the omission and before-tag return
at `ba09ef12`. It is a maintainer-instance review record, not independently
verified human acceptance, runtime behavior or release execution. No new
human decision or supersession of the release gates is claimed.
