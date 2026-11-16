---
type: Decision
title: The owning human is the first Lineage fact of the instance panel, and a roster fact never waits on another read
description: The Desktop shows the kernel's attributedHuman as "Owning human", the first row of the instance panel's Lineage section, only when it is set; instance names stay every label, and a fact the roster reports goes where the roster alone decides its visibility, never into a section an asynchronous read gates.
about: [system/oats-desktop]
kind: decision
id: dec-ef3883f898b6
tags: [desktop, instance-panel, human-attribution, lineage, roster]
timestamp: 2026-11-16
---

# The decision

On 2026-11-16 the product owner asked for instances to keep showing by their instance name, and
for the instance panel to get a field for the owning human when there is one. The Desktop reads
the kernel's existing `attributedHuman` (feature `spawn-attribution`) as it is, on local status
rows and on relayed server rows. No contract changes.

- **Where:** the instance panel's Instance tab, the Lineage section, first row, labelled
  **Owning human**, above Parent and Sibling. The human is the top of the instance's trace back,
  which is what [human attribution](/nodes/oats-maintainer/decisions/human-attribution-is-an-optional-messaging-contract.md)
  exists to show.
- **When:** only when the value is set. Null, absent (an older kernel or host) and malformed all
  read as no human: no row, no empty section, and nothing that reads as an error or a warning.
  That keeps a deployment without human IDs looking exactly as before.
- **Labels:** the instance name stays the label of every row, tab, palette entry and the panel's
  header. Only the panel reads the field.
- **Validation:** the shared client reads the label under the contract's own rule (a waiting
  claim's message rule) once on local rows and again on relayed rows. Presence follows the
  validated value, never the displayed text, so a label that reads like the panel's own
  placeholder is still shown.

# The general rule

A fact the roster reports goes in a section whose visibility the roster alone decides. The
Messaging & Teams section was rejected for this reason: it appears only once its asynchronous
teams read reports something, so a blocked or failed read would hide a fact the roster already
had. Lineage hides an unreported row and hides itself when nothing in it is reported, with no
other read involved.

# Rejected

- **A part of Messaging & Teams**, beside the messaging ID: tied to the teams read, as above.
- **The panel's identity header:** it holds the name and the soul, and has no room for a third
  fact without crowding the name.
- **The sidebar row or its hover card:** the request keeps rows by name, and agent-centered
  navigation keeps the roster answering "which agent is this?"
  ([Agent-centered navigation](/nodes/oats-desktop-expert/decisions/agent-centered-navigation.md)).

# Evidence

Evidence: OKF proposal from oats-engineering-expert/desktop-owning-human-expert, 2026-11-16;
notes/owning-human-panel-placement.md. Implemented in
[oats-project/oats#1942](https://github.com/oats-project/oats/pull/1942), merged as `571e5539`
on 2026-11-16 after the product lane's
[approval](https://github.com/oats-project/oats/pull/1942#issuecomment-6923148909) and the
release lane's [second read and sign-off](https://github.com/oats-project/oats/pull/1942#issuecomment-6923180361).
The product owner's request is **source-reported (relay at
[the product lane's approval](https://github.com/oats-project/oats/pull/1942#issuecomment-6923148909))**:
that comment reports it as relayed by two agents and quotes it. It is an agent's report, not
the human's own record. The rejections of the panel header and the sidebar row are the source's
design reasoning; the PR records only the Messaging & Teams rejection. What the panel shows is
described in the repository's
[docs/desktop.md, "An instance's owning human"](https://github.com/oats-project/oats/blob/main/docs/desktop.md#an-instances-owning-human);
this concept keeps the placement rule and the rejected alternatives. No live Electron run was
made, and no deployment has an attributed human yet.
