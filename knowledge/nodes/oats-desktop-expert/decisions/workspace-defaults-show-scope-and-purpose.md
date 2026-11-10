---
type: Decision
title: Workspace defaults show shared scope, Core and Additional groups, and purpose
description: Present workspace defaults above the capability catalogue with one visual grammar for Core and Additional groups, and explain their shared-working purpose without promising compulsory or automatic learning.
about: [system/oats-desktop]
id: dec-ca980407b0a0
tags: [desktop, capabilities, workspace-defaults, composition, copy, design]
timestamp: 2026-10-23
---
# Decision and rationale

The source reports product-owner direction and final copy approval on
2026-10-23: Workspace › Capabilities opens with **Workspace defaults**, not
with a copy of one soul's configuration. A plain scope sentence says these
are the capabilities souls start with unless they turn one off. Put the
workspace-wide defaults where they are set, before browsing the catalogue.

Use explicit **Core capabilities** and **Additional capabilities** groups.
Core says at most one of each per soul and orders its cells **Knowledge,
Messaging, Tasks**; Additional says any number per soul. Both use the same
cell anatomy—an icon tile, name and source chip—because cardinality differs,
not the kind of thing being shown. Do not make the two groups look like
unrelated systems.

The scope section is not filtered by catalogue search or pills: narrowing
available capabilities must not make the workspace's defaults appear to
change. Distinguish an explicitly empty defaults report from an unavailable
one; show the empty state for the former and no defaults section for the
latter. Do not add a workspace identity mark merely as decoration. This is a
choice about where a mark is useful, not a change to the
[two-letter mark grammar](two-letter-identity-marks.md).

# Rejected alternatives

- **The soul page's Core table.** Reuse would imply that the panel describes
  one soul's setup, precisely the reading the design brief excluded.
- **A three-column slot strip followed by extra-default chips.** Initially
  approved, then explicitly replaced on 2026-10-23: the product owner wanted
  Core versus Additional made explicit while keeping the same UI for both.
- **A workspace logo on this section.** It adds no needed identity context;
  scope is already carried in words.

The definition of capabilities, their sources and Core belongs in the
[tab's concept-explanation modal](technical-models-use-overview-and-developer-disclosure.md#tab-concepts-use-an-information-modal),
not another always-visible technical introduction. The
[workspace tab order](agent-centered-navigation.md#workspace-tab-order)
is recorded in the navigation decision rather than duplicated here.

# Defaults copy leads with purpose, knowledge first

The same review asked the explanation to start with what defaults are for:
an organisation can give its agents a shared way of working through common
knowledge, messaging and task capabilities. Keep that purpose to a sentence
or two; explaining only assignment mechanics misses the reason to configure
defaults at all.

Lead with knowledge and describe its benefit conditionally: **with a
knowledge capability**, useful learnings and written procedures can inform
later instances. Do not imply that every installation must choose knowledge
or that each session automatically teaches the next. Those limits come from
[Durable specialization](/nodes/oats-maintainer/decisions/durable-specialization.md),
which owns the product direction; this decision owns its concise Desktop
expression, not a second organisation-wide doctrine.

Replacement wording must also remain true to composition. Explain turning
off a default and naming another, or leaving a core capability empty; do not
suggest that merely choosing one's own silently displaces an active default.
The source reports a second-reader correction because the draft promised
replacement behavior the composer rejected, including an explicit empty
slot combined with a soul-supplied capability for that slot. Keep current
configuration syntax and conflict cases in the kernel contract and its
regressions, not a second resolver specification in knowledge.

Use the shared [soul/instance and injection vocabulary](desktop-copy-names-instances-and-injection.md)
when explaining what these capabilities give an agent.

# Evidence

Evidence: OKF proposal from oats-desktop-expert/oats-desktop-expert-capabilities-workspace-defaults, 2026-10-23; notes/capabilities-defaults-design.md; notes/workspace-defaults-purpose-product-direction.md.

The proposal and notes report product-owner direction on 2026-10-22/23 and
final approval on 2026-10-23, and identify
[awebai/oats#1489](https://github.com/awebai/oats/pull/1489) as the implementation.
The replacement-copy correction is reported by the proposal. Acceptance,
implementation and the review finding are source-reported; this harvest did
not inspect the source session, audit the implementation or run Desktop.

Maintainer check (2026-10-26, review of oats-knowledge#145): the Core and
Additional groups, the unfiltered scope section and the purpose-first,
knowledge-first copy are what awebai/oats#1489 merged on 2026-10-23. That PR's
description still shows the earlier slot-strip design; its later commits
replace it. The slot strip was never an accepted concept in this base.

Current composition and observation contracts:
[docs/desktop-cli-api.md](https://github.com/awebai/oats/blob/main/docs/desktop-cli-api.md).
