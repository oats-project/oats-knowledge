---
type: Lesson
title: A local publish command binds what it publishes to immutable objects
description: Six rules keep `oats okf propose --apply` publishing only what `--check` showed, although other processes of the same user can change the proposal directory and clone between the two steps: bind by immutable ids, keep Git state inside the clone, pass no file-read value to Git as an option, validate stored blobs not a checkout, carry no tool output in errors, and share one grammar between the provenance writer and parser.
about: [system/oats-okf]
kind: lesson
id: ins-d23d6404d9a8
tags: [lesson, okf, propose, publication, digest, race, custody, review]
timestamp: 2026-11-10
---

# The problem

`oats okf propose` splits publication into `--check` (show the complete outgoing diff and a digest) and `--apply`
(publish exactly that). Between the two steps the proposal directory and its clone sit on disk where any process of
the same user can change them. Each of the following rules was found and fixed in a separate review round while
building 6.0; they are recorded so that the next change to `propose`, the shared publication helper or the
maintainer's provenance parser is checked against them before review, not re-derived one round at a time.

# The six rules

1. **Bind by immutable ids.** The digest covers the tree and the generated commit text and PR body; `--apply`
   re-screens its own snapshot of the texts, and compares the immutable commit's tree with the checked tree before
   the push. `create` pushes `<oid>:<ref>`, never HEAD, the index or a branch.
2. **Git state stays inside the clone.** No symlink or hard link under `.git`, no commondir, alternates or gitfile;
   the clone is made with hooks disabled and `--` before the URL.
3. **Values read from files never reach Git as options.** Full object ids, aliases in the bindings' identifier
   grammar, paths after `--`.
4. **Validate stored blobs, never a checkout.** Ident, working-tree-encoding and clean filters make a checkout differ
   from what is committed; the validator and the screen read the stored bytes. The subject layout's preparation, write
   surface and verdict lanes keep the same rule: [propose prepares, judges and publishes one tree of stored blobs](/nodes/oats-okf-expert/lessons/propose-judges-and-publishes-stored-blobs-not-a-checkout.md).
5. **Errors carry no tool output.** Git's and gh's stderr can echo paths, remotes and tokens; the error names the
   step and the cause class only.
6. **One grammar for writer and parser.** The proposer's provenance writer and the maintainer's parser share the
   identifier and note-path grammar (spaces and parentheses allowed in note paths, either case and up to 96
   characters in identifiers), else a valid proposal is refused at review.

# Why it outlives the fixes

The regressions in the propose test suite (`test/okf6-propose.test.mjs`) guard the code paths that exist today. A new
Git call, a new value read from the proposal directory or a new provenance field is not covered by them; that is what
this lesson is for. A rule that can be turned into a test over every call (for example, that no Git argument read
from a file starts with `-`) retires that rule from this lesson.

# Evidence

- Verified by the maintainer review on 2026-11-11 against oats-project/oats-okf#131 (merged 2026-11-10, first released
  in oats.okf 6.0.0): its fix commits are titled by review round (round 2 "Git state custody", round 3 "no hard links
  under .git", round 4 "validate stored bytes, identifier grammar end to end", round 7 "apply publishes its own
  snapshot", round 8 "--apply refuses E_DIGEST unless the committed tree"), and each rule is in the released code:
  the digest and committed-tree checks in `lib/propose.mjs` (`E_DIGEST`), the `.git` custody checks (symlinks, hard
  links, commondir, alternates), the clone with `--` before the URL, blobs read through `git cat-file --batch`, and
  the shared identifier grammar (letters of either case, at most 96 characters) and note grammar in the maintainer's
  `lib/provenance.mjs`.
- Source-reported (the proposer's backing notes): each finding was reproduced by its reviewer, and the race, raw-byte
  and stderr guards were mutation-checked (the test fails with the guard removed). The per-round findings are not on
  the GitHub record of #131. Limit, also source-reported: no model-run proposer was exercised in the build; the
  released path was rehearsed by hand against a scratch base afterwards.
