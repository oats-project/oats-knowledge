---
type: Decision
title: Pre-answer first-run offers through home-scoped native settings
description: Avoid a blocking renderer offer through an absent-only project setting, accepting the classic-renderer tradeoff instead of sending a key or mutating user-global seen state.
about: [system/oats-kernel]
id: dec-cb075783a735
tags: [kernel, harnesses, launch, settings, input-safety, rejected-alternatives]
timestamp: 2026-10-30
---
# Decision and accepted cost

For Claude's fullscreen-renderer offer, the source reports a product-lane
decision to have oats.core add `"tui": "default"` to the home's managed
project settings only when that key is absent. A startup offer should be
pre-answered through a home-scoped native setting rather than a simulated
answer or a write to user-global harness state.

The source attributes acceptance to oats-expert-juan on 2026-10-30/31,
through mail 4dbfa438 and dc35904f. This is **source-reported agent direction**,
not independently verified acceptance by the human represented by that lane.

The accepted cost is classic rendering in agent panes, even where Claude
would default to fullscreen. Project precedence can also override a user's
global fullscreen preference. Because this scalar has no ownership marker,
the absent-only write preserves an explicit value already in the managed
project file. The source reports that the Desktop accepted classic rendering;
that is not proof of every renderer or host being qualified.

# Rejected alternatives

- **Seed the offer's seen counter.** That changes user-global Claude state
  to solve a condition confined to an instance home.
- **Recognize the screen and press a key.** A launch recognizer does not
  establish safe input, and unattended wake input can answer the offer
  instead of reaching the model. Keep the
  [report-only recognition boundary](report-only-prompt-recognition-may-use-derived-labels.md)
  and the [automated-input withholding limit](waiting-claims-may-only-withhold-automated-input.md).

This choice uses native project settings under the
[native-launch policy](harness-native-launch.md); it does not restore strict
context isolation, grant permission bypass or change authentication.

Added at maintainer review of oats-knowledge#235: the native-launch decision
says a harness's own settings stay in force, and it carries human acceptance.
Overriding a user-level `tui` sits close to that sentence. The review did not
read it as a supersession: the user's settings are still loaded, the override
is Claude's own precedence, and `<home>/.claude/settings.json` was already
managed for oats.core's hooks. No human acceptance of this particular cost is
recorded.

# What the investigation established

The source read Claude Code 2.1.300's offer gate and found that a defined
merged `tui` setting bypasses it. Separate live captures reportedly showed
that project `tui: fullscreen` and `tui: default` select the corresponding
renderers. Together these supported the selected setting route.

The natural offer did not appear in the throwaway API-key baseline, which
already started fullscreen. The source did **not** directly observe that
natural offer being suppressed by the new setting. A forced offer bypassed
the setting check and therefore cannot supply that missing proof. Do not
turn code-gate evidence plus a test of its input into an end-to-end
suppression claim, or generalize the gate across Claude versions.

The elimination route is the home-scoped setting with preservation tests
for existing values and version-qualified natural-offer acceptance where
the offer can be reproduced. No screen-answering fallback follows from
the missing live case.

# Evidence

Evidence: OKF proposal from oats-kernel-expert/onboarding-kernel-expert, 2026-10-30; notes/claude-fullscreen-upsell-gate.md.

Binary inspection and live captures are source-reported and were not rerun
by this harvest. Implementation was in draft awebai/oats#1692 at the
checkpoint. The gate and tradeoff are dated evidence, not a release receipt.
