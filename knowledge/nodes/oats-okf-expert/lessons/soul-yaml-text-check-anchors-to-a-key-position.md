---
type: Lesson
title: A text check of a soul.yaml declaration must match a key position, not a word boundary
description: The harvester reads the source soul's soul.yaml as text on purpose, so every check of a declaration there is a regex over the whole file; anchor it to a key position (a line start, or after `{` or `,` in a flow mapping), never to `\b`, which sits between `-` and a letter and makes a bare-word setting match a capability id such as `oats.okf-harvest:`; and sweep the repository's real soul files when reviewing or testing a new text check, because a fixture without such a capability cannot catch it.
about: [system/oats-okf]
kind: lesson
id: ins-6853946f2fea
tags: [lesson, okf, harvest, soul-yaml, opt-out, regex, review, test]
timestamp: 2026-11-06
---

# Why the check is text, and what that implies

The harvester's spawn hook reads the source soul's `soul.yaml` as text, with
no YAML parser, on purpose: the kernel's merged settings are later-wins, so a
host or spawn value can mask a soul value in the instance record but cannot
mask the soul file, and the opt-out is therefore defined by that file's own
text (see
[the package's retired 4.x source admission](/nodes/oats-okf-expert/decisions/retired-4x-host-harvest-keys-carry-no-authority.md),
"the only opt-out is the soul's, decided first"). The package will keep
reading it that way.

The consequence is that every check of a soul declaration there is a regular
expression over the **whole file**: keys at any depth, flow mappings,
capability ids, comments and prose all sit in the same text.

# The trap

`\b` is a word boundary, and it sits between `-` and a letter. A bare-word
match for a setting, `\bharvest\s*:`, therefore also matches a capability id
that ends in that word, such as `oats.okf-harvest: { ... }`, which every
knowledge-harvester soul declares, and any prose that uses the word before a
colon (`Before harvest: write notes`).

The fail-closed addition to the admission above ("a soul `harvest:` value
other than `off` refuses") was first written with `\b`. It would have refused
every valid source whose soul declares the `oats.okf-harvest` capability, with
a message naming a soul declaration the soul never made: a regression on
every 5.x source, not an edge case of the 4.x route.

# The shape to reuse

Anchor a text-level check of a YAML key to a **key position**: a line start
or, inside a flow mapping, the position after `{` or `,`, with optional
blanks. The merged fix uses `(?:^|[{,])[ \t]*harvest[ \t]*:` with the `m`
flag, and tests it both ways (a soul `harvest: on` refuses; a soul declaring
`oats.okf-harvest:` does not). Reuse that shape for any new declaration
check, and never `\b`.

The older `harvest: off` match keeps its word boundary deliberately: a false
match there honours an opt-out the soul may not have meant, which errs in the
direction the opt-out invariant protects (never harvest an opted-out soul),
and its `harvest: off` shape is narrow. The asymmetry is the rule: looseness
is tolerable only in the opt-out match itself; any other check that refuses
a source on a match must be anchored, because a false match refuses valid
sources with a wrong diagnosis, and here it fell on a token every harvester
soul carries.

# The review and test rule

A fixture whose souls carry no `-harvest` capability cannot catch this
class of bug; the harness passes while the real deployment refuses. What did
catch it was a reviewer running the proposed pattern against the
repository's own soul files, which include a knowledge-harvester soul. That
sweep belongs in the review of any new text check of `soul.yaml`, and the
elimination route is a test that runs each such pattern against the
repository's real soul files (positive and negative cases), so the lesson
does not have to be remembered.

# Evidence and status (2026-11-06)

Reported by the source: the lane maintainer's RETURN on
[oats-okf PR 128](https://github.com/oats-project/oats-okf/pull/128) at its
first review round demonstrated `/\bharvest\s*:/` matching
`oats.okf-harvest: { from: here }`; the fix landed in the same PR with the
key-position pattern and tests both ways. Verified by this harvest: PR 128
is merged on 2026-11-06 (merge commit `1d74816e`). The review exchange
itself is source-reported.

Evidence: OKF proposal from oats-okf-expert/oats-okf-expert-retired-4x-harvest,
2026-11-06; notes/word-boundary-is-not-a-yaml-key.md.
