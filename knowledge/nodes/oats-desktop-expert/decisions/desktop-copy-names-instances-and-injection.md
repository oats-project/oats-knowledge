---
type: Decision
title: Desktop copy names a soul's instances and instruction injection
description: Say a soul's instances rather than its agents, and describe capability instructions as injected into the instance's composed AGENTS.md so explanations preserve the definition/runtime and authored/injected distinctions.
about: [system/oats-desktop]
id: dec-7228ee560fc3
tags: [desktop, copy, souls, instances, capabilities, composition]
timestamp: 2026-10-23
---
# Decision

The source reports two product-owner corrections on 2026-10-23 that apply
beyond the About-capabilities dialog:

- When describing what a soul's running agents receive or do, say **a soul's
  instances**, not **a soul's agents**.
- Describe capability instructions as **injected into the instance's
  composed AGENTS.md**, after the soul's own instructions. Avoid vague
  alternatives such as added to or sent to.

This is not a ban on the generic noun **agent**. A soul defines a kind of
agent; each running agent is an instance of a soul. The wording matters where
an explanation must distinguish the durable definition from the running
incarnation.

# Rationale and boundary

The definition/runtime distinction is easy to blur in introductory copy.
Likewise, vague wording about adding instructions hides the separation
between a soul's authored part and capability-provided injects. Explanations
and the inspection UI should teach the same model: **Composed for an
instance** and **Injected by** name the distinction rather than leave users
to infer it.

The [soul-instruction inspection decision](soul-instructions-own-and-composed.md)
owns how that separation is displayed and obtained. This vocabulary decision
does not change its layout or inspect contract. The
[workspace-defaults explanation](workspace-defaults-show-scope-and-purpose.md)
is one application, not the limit of the wording choice.

# Evidence

Evidence: OKF proposal from oats-desktop-expert/oats-desktop-expert-capabilities-workspace-defaults, 2026-10-23; notes/desktop-copy-soul-instances-vocabulary.md.

The note reports the product-owner corrections and the follow-up review
change from vague addition wording to explicit injection. It identifies
[awebai/oats#1489](https://github.com/awebai/oats/pull/1489) and the Desktop
documentation as implementation references. These are source-reported
acceptance and implementation, not independently audited receipts; no
verbatim correspondence is reproduced here.
