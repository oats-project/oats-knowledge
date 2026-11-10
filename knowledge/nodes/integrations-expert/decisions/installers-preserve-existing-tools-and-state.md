---
type: Decision
title: Installers start from existing tools and preserve their ownership
description: An OATS installer reuses suitable existing tools, installs only missing ones, upgrades only its own installs, preserves user state for adoption, and filters bundled teaching from its runtime install path rather than merely documenting the composition leak.
about: [workstream/provider-integration]
id: dec-b26ecf33e9b3
tags: [integrations, installers, adoption, ownership, human-direction]
timestamp: 2026-11-03
---
# Direction and rationale

The source records the project's human owner directing this approach on
2026-10-23, relayed through the lane maintainer: an OATS installer starts
from what the person already has. A machine is not a blank environment for
the integration to normalize. Existing tools, identities, harness settings,
plugins and deployments are inputs to adoption, not debris to replace.

This is recorded human direction, not an inference from the installer's
current implementation. The rationale is that many adopters already have
the prerequisites and working state; installing another preferred toolchain
can silently change which executable runs, even without deleting the old
one. Preserve the person's ownership instead of treating file survival as
proof that nothing changed.

# Consequences for installer design

- Discover each tool through PATH and inspect its version before planning an
  install. Reuse an existing tool that meets the required floor; install
  only what is missing. Discovery does not grant authority to replace or
  shadow a present but unsuitable tool.
- Do not put a version manager's global shim ahead of an existing install.
  The reported Omarchy case was a global mise selection taking precedence
  over an npm, nvm or system installation. Creating a second install is not
  harmless if command resolution now bypasses the person's choice.
- Upgrade only tools the installer itself installed. Identify upgrade
  guidance by installation origin rather than prescribing one global
  upgrade command for every discovered tool.
- Keep existing identities, harness configuration, plugins and deployments.
  Hand their discovery to the onboarding agent for adoption; do not silently
  overwrite them or create replacements to make the installer look uniform.

This decision constrains installer ownership. It does not authorize
onboarding to mutate or re-enroll discovered state, nor make an unsupported
existing version acceptable. Such cases need an explicit resolution outside
the installer's automatic missing-tool path.

# Refinement: bundled teaching is an installation side effect (2026-11-03)

The accepted [messaging/task composition decision](/nodes/oats-maintainer/decisions/messaging-and-task-coordination-are-separate-choices.md#refinement-installation-must-preserve-the-composition-boundary-2026-11-03)
owns the rule that the OATS aweb installation supplies runtime pieces, not
machine-wide skills. Apply that boundary when reviewing an upstream plugin
or extension: installing a runtime dependency can also install teaching that
bypasses the capability, version and soul choices of composition.

The source reports a choice between leaving bundled skills as a documented
known gap and filtering them during installation, with readiness warning when
they still load. The directing human chose the latter. Documentation alone
leaves the unwanted teaching in the home's context; a correct explanation of
the leak does not preserve the composition boundary. The filter is an interim
integration measure, not a reason to make a parallel permanent skill system.
Prefer upstream packaging without the bundled teaching, or a supported
manifest-level resource filter, to a provider-specific settings edit.

The reported working filter was for Pi. The note separately identifies the
Claude channel plugin's own skill as an unresolved upstream gap; it does not
establish that the same filter works on both harnesses. Nor does the choice
supersede installer ownership above: it grants no automatic removal of a
person's pre-existing skills or alteration of an independently installed
plugin. aweb's own installation and the OATS-controlled installation remain
distinct paths.

Prevent regression with install and update tests that inspect which resources
actually load, paired with readiness cases for filtered and unfiltered
configurations. Keep the runtime extension present while excluding its
teaching. The source reports Pi 1.3.0 retaining its filter through installation
and updates; that is bounded evidence, not an indefinite compatibility
promise. Removing and reinstalling the dependency needs its own coverage.
The long-term elimination route is upstream separation or a declarative
resource filter, with tests rather than a recurring reviewer reminder.

Acceptance is **source-reported**: the directing human's choice was relayed
by the setup maintainer by mail on 2026-11-03. No private exchange or runtime
test was inspected by this harvest. The proposal names
[awebai/oats-aweb#188](https://github.com/awebai/oats-aweb/pull/188) and
[awebai/oats#1722](https://github.com/awebai/oats/pull/1722) as implementation
work, open at capture; these are evidence locators, not release or installation
receipts. No human-accepted decision is superseded.

Evidence: OKF proposal from integrations-expert/overdue-step-checkpoint-integrations-expert,
2026-11-03; notes/provider-install-path-installs-no-skills.md.

# Enforcement and related boundaries

The elimination route is an origin-aware install plan and regression
fixtures with pre-existing toolchains and user state: assert reuse, no
resolution shadowing, and no upgrades of tools the installer did not own.
Keep exact version floors, discovery rules and package-manager commands in
the implementation and its docs, not as a second specification here.

PATH discovery is distinct from the lifetime of a generated invocation:
[persisted launchers record verified executable paths](/nodes/integrations-expert/lessons/persisted-launchers-need-recorded-kernel-paths.md).
Finding a suitable tool also does not substitute for
[host-install consent](/nodes/oats-kernel-expert/decisions/trust-approval-and-consent-boundaries.md)
when something really is missing, or for the
[human persistence handoff](/nodes/integrations-expert/lessons/desktop-persistence-apply-is-a-human-handoff.md).

# Evidence and limits

Evidence: OKF proposal from integrations-expert/integrations-expert-omarchy-oats-standard, 2026-10-26; notes/installer-starts-from-what-is-installed.md.

The note records the human owner's direction and date through the lane
maintainer; no correspondence is reproduced. The proposal identifies
awebai/oats-omarchy#22 as its implementation. Acceptance, PATH precedence
and implementation are source-reported, not independently audited by this
harvest. The direction is for OATS installers generally; the reported
implementation evidence is limited to one integration.
