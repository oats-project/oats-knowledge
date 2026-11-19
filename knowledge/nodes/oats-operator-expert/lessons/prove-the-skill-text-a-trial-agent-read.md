---
type: Lesson
title: Prove from the transcript which skill text a trial agent read
description: To test an unmerged getting-started skill, hand the agent the head's file as the newcomer route allows, then rebuild the text it read from its transcript and hash it against the head.
about: [workstream/operations]
kind: lesson
id: ins-6da8546224d2
tags: [operator, onboarding, trials, evidence, skills]
timestamp: 2026-11-19
---
# The file's hash is not what the agent read

A newcomer's agent gets the getting-started skill as a file or as its URL,
and the URL points at the default branch. An unmerged change can only be
tested by handing the agent the file at the head under test, which the
skill's own "someone gives you this file" route allows. No DNS or TLS
redirection is needed.

Hashing the placed file does not prove what the agent read. The skill
tells an agent that holds only a summary to download the default branch's
copy, and an agent may read the file only in part. Prove it from the
transcript instead:

- rebuild the text from the transcript's file-read results (strip the line
  prefixes, require every line from first to last, and drop the trailing
  artefact line);
- hash it against the head's file, read from the repository at that exact
  commit;
- check that no tool call fetched the default branch's copy.

The source's runs reported the agent reading the file in two chunks, with
the rebuilt text hash-identical to the head both times. A file placed
outside the project folder made Claude Code ask before each read outside
the working directories. Label that prompt a rig artefact, not a step of
the skill.

The reviewer confirmed the skill text this rests on at
[oats-project/oats#1962](https://github.com/oats-project/oats/pull/1962)'s
head `1b0c47c0`: its description names the "someone gives you this file or
its URL" route, and both URLs it gives for a whole copy point at `main`. The
two-chunk read and the hash matches are source-reported.

# Limits

This proves what the agent was given, not what it followed: the run's
expectations still judge behaviour. The method assumes the harness records
whole read results. A truncated or summarised read is a failed proof, not
a pass.

# Elimination route

Make the rebuild, the hash against the head and the default-branch fetch
check a step of the trial driver's report, so a run without the proof is
labelled rather than silently passed. That is a proposed control, not an
implemented one.

Evidence: OKF proposal from oats-operator-expert/byot-vm-run-helper,
2026-11-19; notes/skill-under-test-reaches-the-vm-as-a-given-file.md.
