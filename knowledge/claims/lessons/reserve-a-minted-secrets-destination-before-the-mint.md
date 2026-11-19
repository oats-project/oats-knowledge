---
type: Lesson
title: A command that mints a secret into a caller-named file creates the file, exclusively and owner-only, before the mint
description: Checking the destination and then minting finds an uncreatable path (a name too long, a directory it cannot write) only after the secret exists remotely, unprinted and lost, with the unwanted credential still live; create the file with O_EXCL at 0600 before the mint, hold it through the mint, remove it if the mint fails, and count only ENOENT as absence.
about: [workstream/provider-integration, system/oats-aweb]
kind: lesson
id: ins-7c022c20ba3f
tags: [lesson, secrets, invites, files, ordering]
timestamp: 2026-11-19
---

# What was observed

`oats aweb invite --out <file>` writes a freshly minted invite token to a new file, so
the token stays out of an agent's transcript. Its first version checked the path (lstat:
nothing there; the parent is a directory), minted, then opened the file. A 256-character
basename (ENAMETOOLONG) and a new name in a directory it could not write (EACCES) passed
the check, because every lstat error counted as "nothing there". Each minted once and
then failed to write: the invite was live, and its token was printed nowhere.

# Rule

- Only ENOENT is absence. Any other lstat error refuses before the mint.
- Create the file before the mint: exclusively (O_EXCL, so neither an existing file
  nor a link is followed), owner-only (0600). A path that cannot be created refuses with
  nothing minted.
- Hold the descriptor through the mint, and write the secret to it. If the mint or its
  output check fails, remove the file.
- A write failure after the mint says the secret was minted and that it is not printed:
  never print it in the file's place.
- A plan reads only: it names the file it would write, and creates nothing.

Evidence: OKF proposal from oats-engineering-expert/aweb-newcomer-findings-lead, 2026-11-19; notes/reserve-the-destination-before-the-mint.md. Review round 1 of awebai/oats-aweb PR 286 (issue 285).

Verified by the knowledge maintainer at review on 2026-11-19 against [awebai/oats-aweb#286](https://github.com/awebai/oats-aweb/pull/286), open at review: commit 0a46d5a ("Review round 1") states the defect and the fix; at head 1855cdc, the `--out` check refuses any lstat error but ENOENT, the file is opened `wx` at 0600 before the mint, a failed mint or write removes it, a write failure says the invite was minted and is not printed, and a plan returns before any file is created. The tests cover a 256-character basename, an unwritable directory, and failed mints leaving no file.
