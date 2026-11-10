---
type: Lesson
title: Ask whether children follow when moving tree rows out of the way
description: When a tree-partitioning request leaves descendant placement unresolved, show the human the per-row and whole-subtree outcomes before specifying the clients.
about: [workstream/coordination]
kind: lesson
id: ins-2fad6f3f4560
tags: [planning, trees, product-intent, alternatives, cross-client]
timestamp: 2026-10-27
---
# A row's own flag does not settle the meaning of the request

A request to move rows of a tree into a section, filter them out or hide
them can mean either individual rows or whole subtrees. The existing
per-row state and the cheapest section helper do not establish which
outcome the human wants. A lead who silently chooses per-row placement can
produce a coherent implementation of the wrong product intent.

First [check the existing decision records](/nodes/oats-expert/lessons/ask-for-the-record-of-the-briefs-subject-before-designing.md).
Where descendant placement remains unresolved, ask the human explicitly
before the client spec fixes it. Work through a parent and child whose own
states differ, rather than asking about inheritance in the abstract:

- **Per-row placement:** moving the parent out of the main list leaves its
  otherwise unmarked child in that list.
- **Whole-subtree placement:** the child follows the parent's placement,
  even though the child's own state differs.

State who ends up where under each reading. Explain which reading existing
helpers make cheap, but keep implementation convenience separate from the
human's choice. Do not reopen an accepted decision as an unowned requester
choice; the linked record-check lesson owns that supersession boundary.

# What the observed case taught

In the source's 2026-10-27 background-instance design, the lead recommended
per-row placement so foreground experts under a background maintainer would
remain in the main list. The proposal reports that the product owner,
through the lane maintainer, instead selected subtree placement. The
question was resolved before the clients were specified; the source reports
no resulting client rework. The avoided rework is a counterfactual risk,
not a measured saving.

This is evidence for **asking the missing product question**, not a rule
that children must always follow, a new Background specification or a
claim that placement changes each child's stored value. The existing
[collapsed-parent attention decision](/nodes/oats-desktop-expert/decisions/needs-input-preserves-liveness-and-recognition.md)
remains separate and unchanged: choosing placement does not settle how a
hidden waiting descendant remains discoverable.

# Elimination route

Once chosen, express descendant placement in the responsible projection and
regression cases with differing parent/child states. Tests can preserve the
chosen behavior, but cannot infer unstated human intent. The remaining
prevention belongs in specification guidance: ask whether a tree operation
affects each row independently or its subtree, using a worked example.
This harvest changes no skill and claims no implementation or test result.

# Evidence and limits

Evidence: OKF proposal from oats-expert/oats-expert-background-instances,
2026-10-27; notes/ask-whether-children-follow-when-hiding-tree-rows.md.

One source-reported case, identified in the proposal as the
[background-instance effort](https://github.com/awebai/oats/issues/1579).
Only the captured proposal and named note were used as source evidence;
private correspondence, the implementation and client behavior were not
independently audited. Applying the question to other tree-shaped lists is
a planning lesson, not evidence that every such request is ambiguous.
