---
type: Lesson
title: A provider answer that a shipped skill reads is relied-on output
description: The lane map's contract list is not the whole set to check. A provider command's --json field, printed line or error code that a shipped skill tells agents to read is relied-on output too. Change it additively only, and land the skill's update no later than the pin that ships the change, worded so it still reads right on the provider pinned now.
about: [workstream/oats-direction]
kind: lesson
id: ins-c93673ea4b08
tags: [review, contracts, skills, capabilities, oats.aweb, errors]
timestamp: 2026-11-19
---
# What happened

On 2026-11-19, two direction reads in the setup lane each nearly called a
provider change "no contract change", because nothing on the contract list
(config keys, manifest fields, hook environment, the JSON answers the
Desktop reads, the lock format) covered it.

- **A JSON field.** A plan moved `oats aweb invite`'s token out of the
  default answer, behind an output file. The Desktop doesn't read that
  answer. But the getting-started skill and the provider's own
  member-invitation reference both tell agents to read `result.token`.
  Moving it would have broken every agent following them, with no error to
  tell them. The token stayed in the default answer, and the file became an
  option that changes the answer only when it's passed.
- **An error code.** Splitting one cause out of an existing setup error code
  into a new code is additive for the provider. But getting-started step 9
  routed on the old code to recover, so the skill would have stopped
  recovering. Its update was landed before the pin that ships the new code.

# The lesson

Before agreeing that a change to a command's output is no contract change,
search the skills in oats and in the package for the command and the field,
printed line or code.

- Where a shipped skill reads it, change it additively only, unless both
  sides decide otherwise. A new option that changes the answer only when
  it's passed is fine.
- A skill update that follows a changed code or line lands in the same
  release as, or before, the pin that ships the change. Landing before the
  pin is safe only when the update still reads right on the provider that
  is pinned now: the getting-started update taught the new code and kept
  the old code's recovery for an older provider. An update that works only
  against the new provider lands with the pin, as
  [dependent soul text does](/nodes/oats-expert/lessons/soul-text-lands-with-its-capability-pin.md).
- A skill that reads a provider's text answers pins those literals in its
  tests against the provider mirror. A pin bump that changes them then
  fails in CI instead of silently.

# Canonical boundaries

The [instruction-precedence section of the review protocol](/nodes/oats-maintainer/stewardship/review-protocol.md#instruction-precedence-needs-a-cross-side-decision-2026-10-27)
already holds that the named contract list is not exhaustive. This lesson
adds one class of consumer to check: a shipped skill that reads a
provider's answer. The release lane's
[kernel tests that read a package's mirror](/nodes/oats-maintainer/stewardship/release-traps.md#a-package-cut-runs-the-kernel-tests-that-read-its-mirror-2026-11-04)
are the release-time side of the same coupling. It complements
[a provider's spawn refusal reaches clients as its text](/nodes/oats-maintainer/lessons/a-provider-refusal-reaches-clients-as-text.md).
The pinned-literal tests in the third rule are the elimination route. They
catch a changed literal at pin time, but they do not replace the search at
the direction read.

# Evidence

Evidence: OKF proposal from oats-maintainer/setup-maintainer, 2026-11-19; notes/handover-from-setup-maintainer-pepe-v4/notes/a-skill-read-json-answer-is-relied-on-output.md.

Records read at review on 2026-11-19:

- [awebai/oats-aweb#285](https://github.com/awebai/oats-aweb/issues/285),
  finding 4, planned an `--out <file>` option whose hand-off names the file,
  not the token.
- [awebai/oats-aweb#286](https://github.com/awebai/oats-aweb/pull/286),
  merged, records the direction read (`--out` is additive), keeps
  `result.token` without `--out` because oats-getting-started and the
  member-invitation reference read it, adds `E_SETUP_USERNAME_UNAVAILABLE`
  for one cause of `E_SETUP_NATIVE`, and names getting-started step 9's
  update as a follow-up that must land with or before the oats.aweb pin.
- [oats-project/oats#1965](https://github.com/oats-project/oats/pull/1965),
  merged before #286, teaches step 9 the new code and still reads right on
  an oats.aweb that doesn't answer it yet.
- [oats-project/oats#1962](https://github.com/oats-project/oats/pull/1962)
  pins every provider literal the getting-started skill reads against
  `mirrors/oats-aweb`. It was still open at review, so the third rule is
  the practice that PR adopts, not one that has landed.

That either direction read nearly called its change "no contract change" is
source-reported; the records show only the outcome.
