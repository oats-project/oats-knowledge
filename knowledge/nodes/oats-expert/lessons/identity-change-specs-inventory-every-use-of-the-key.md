---
type: Lesson
title: When two spellings become one identity, the spec inventories every use of the key, not only the equality checks
description: A spec that lists the literal compare sites to fix misses the Map keys, group-bys, cache keys and id hashes that also treat the key as an identity; name the behaviour that must hold and ask for every identity use, each converted or left literal with a reason.
about: [workstream/coordination]
kind: lesson
id: ins-6fbda5634a91
tags: [planning, specification, identity, keys, migration, review, contracts]
timestamp: 2026-10-30
---
# Equality is one use of a key among several

When a change makes two spellings of an identifier denote one thing (an old
and a new repository owner, a renamed package, a moved scope), the obvious
inventory is the `===` sites. The source found three in the Desktop and
specified them. Fixing those alone would not have fixed the failure: the
Desktop grouped its workspace views by the literal key, so a host under the
other spelling got a second view and its instances were not in the window.
A reviewer found it on the third round, by following the path from the host
to the screen rather than reading the list of compares.

A grep for compares is an inventory of one operation. A key is used as an
identity wherever it decides that two things are the same: compares, Map
and Set keys, group-by and partition keys, cache keys, sort tie-breakers,
id hashes, deduplication. Each of those produces a split when the two
spellings arrive together, and none of them contains an equality operator
to find.

# What the spec says instead

- State the **behaviour that must hold** ("one workspace, one view; a host
  under either spelling lands in the same view"), not the list of sites.
  The behaviour is what the reviewer can test from the outside.
- Ask the implementer for **every place the key is used as an identity**,
  by category, and for each a disposition: converted to the canonical
  identity, or left literal with the reason it is safe.
- Have the reviewer **read the path from input to surface** at least once,
  because the inventory is the implementer's and the behaviour check finds
  what the inventory missed.

This is the identity-change case of
[enumerating what a behaviour held up](/nodes/oats-expert/lessons/enumerate-what-a-removed-behaviour-held-up.md):
there, a removed side effect did more than its name says; here, a key does
more than compare. The Desktop's own rule that rosters key by a qualified
identity is the Desktop expert's
[legibility lesson](/nodes/oats-desktop-expert/lessons/identity-and-relationship-legibility.md);
this lesson is about how the lead writes and reviews the spec.

# Evidence and limits

Evidence: OKF proposal from oats-expert/oats-org-migration-expert,
2026-10-30; notes/compare-inventory-must-include-grouping.md.

One review round of one bridge change, source-reported. The category list
above generalises from the one grouping miss; it is a checklist to ask
with, not proof that those are the only identity uses in any client. This
harvest did not read the Desktop change.
