---
type: Lesson
title: A loose schema's line with no reader of its parsed value may be the contract check for a reader of the raw document
description: Before a field is deleted from a parsing schema as dead, ask who reads the raw document and what stops being refused; removing a line can turn an answer that was refused whole into one that is drawn wrongly.
about: [workstream/provider-integration]
kind: lesson
tags: [schema, contract, adapter, kernel-json, dead-code]
timestamp: 2026-11-26
---

# What was observed

A piece set out to delete seven fields from the schema an adapter uses to parse a kernel's JSON answer, on a reviewer's note that only a deleted summary read them. That was true of the PARSED values. Six of the seven were drawn on a screen by another reader that takes the same raw document, and the schema's lines were what refused a malformed answer whole. With them gone the screen drew something false: a list of warnings that were no sentences as "[object Object]"; a model that was no text as "default model". The piece's fresh reviewer found it by feeding the reader a wrong shape, not by searching for readers.

# The rule

- Before a schema line is deleted as dead: who reads the DOCUMENT (not the parsed value), and what stops being REFUSED?
- Only a key nothing reads may leave, and each such removal is a behaviour change (an answer once refused is now answered) that is said and tested.
- Where a schema is the contract check for another reader, say so in a comment at the schema and pin it with a table of wrong shapes, each refused whole.
- The same holds the other way: do not hold to a shape a key you do not draw; a whole read failed when the kernel answered a string where a list was assumed for a key nothing showed.

# Citations

1. Evidence: OKF proposal from oats-engineering-expert/bb-plugin-specialist, 2026-11-26; notes/schema-line-is-a-contract-check.md.
2. oats-project/oats-bb#112 (merged 2026-11-26): its body tells the first attempt and how it was found; plugin/kernel/spawn.ts's schema comment; plugin/test/spawn/kernel.test.ts's table.
