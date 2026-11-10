---
type: Decision
title: Source-supplied prose is an attributed quote, not Desktop's voice
description: Display prose from trigger sources, trigger files and capability manifests as visibly attributed text so untrusted words cannot impersonate Desktop's own explanation.
about: [system/oats-desktop]
id: dec-d4f71013d984
tags: [desktop, trust, attribution, accessibility, triggers]
timestamp: 2026-10-09
---
# Decision and rationale

The proposal records a maintainer condition of 2026-10-08 for capability
trigger sources: untrusted text is data and is marked as the source's words.
The Desktop design gives source-supplied prose one attributed quote
treatment. This adds a distinction of **speaker**, not merely a sanitising
rule, to the existing [privileged-window input boundary](loopback-trust-boundary-and-transport-simplicity.md).

A safe text node can still impersonate the product. Appending a source's
reason to Desktop's own explanation makes the whole sentence read as
Desktop's claim. A hostile source can exploit that apparent endorsement
without injecting any markup. Attribution must survive both visual reading
and accessible navigation.

# Presentation boundary

For prose supplied by a trigger source, a workspace's trigger file or a
capability's manifest:

- Use a Desktop-authored lead-in naming the speaker or origin, followed by
  the source's text as one filtered display line in a quote style.
- Set it as text, never markup, a link, a button or a tooltip-only disclosure.
- Keep the lead-in and quote in one labelled group. Colour alone cannot
  carry the difference between product speech and quoted data.

Kernel-validated identifiers such as subjects, keys and event names remain
data rather than attributed prose. This is not permission to interpret
them as markup. The kernel's own messages remain kernel text; the reported
source-failure message belongs in that category only because it carries
none of the source's words. The distinction follows where words originate,
not merely which JSON envelope transported them.

Retain the Desktop display filter even when the kernel sanitises current
answers: older recorded state is not covered by that producer-side
protection. The two safeguards address different paths to the same surface.

# Rejected alternatives and enforcement

- **Source prose inside a Desktop sentence:** grants apparent product
  endorsement to words the product did not author.
- **Kernel sanitising as the only defence:** leaves older stored text
  outside the guarantee and does not itself identify the speaker.

The implementation route is one reusable attributed-text treatment, with
rendering and accessibility regressions proving that hostile markup, URLs
and placeholders stay literal and that speaker and quote remain one labelled
group. These tests protect the design; the durable knowledge is why safe
text still needs visible attribution. See also
[informed manual actions](informed-manual-actions-match-cli-authority.md)
for the consent surface that prompted this decision.

# Citations

Evidence: OKF proposal from oats-desktop-expert/oats-desktop-expert-desktop-parity-049, received 2026-10-09.

The proposal identifies [awebai/oats#850](https://github.com/awebai/oats/pull/850)
and reports the maintainer condition, the rejected inline wording and a
keyboard-only run in which hostile parameter text stayed literal. Those are
source-reported, not independently audited or rerun by this harvest. The
single named backing note supports the manual-action decision, not this
separate attribution claim; this decision relies on the proposal itself.
