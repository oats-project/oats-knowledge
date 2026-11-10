---
type: Decision
title: A local schedule's soul check reuses spawn without narrowing legacy acceptance
description: Check newly admitted local schedule souls through spawn preview with the run's selectors, retaining the existing local-directory fast path rather than adding a second resolver or new refusals for previously accepted jobs.
about: [system/oats-kernel]
id: dec-508212de4c5e
tags: [kernel, schedules, spawn, resolution, compatibility]
timestamp: 2026-11-03
---
# Decision and rationale

The source's 2026-11-03 local-schedule fix chose to retain save-time soul
checking at add/update while delegating resolution of souls absent from the
local agent directory to `oats spawn <soul> --preview --json`. Carry the
scheduled run's own launch-config, harness, model, backend and repository
selectors into that preview. Keep the pre-existing local-directory hit as
an accept-without-child fast path.

This is a compatibility choice for the local schedule save check, not a
rule that every validator must run a spawn preview. In a workspace
deployment, the source identifies `agents/<soul>/soul` as spawn's per-commit
cache, not the catalog of offered souls. Making that directory necessary
would reject an offered soul merely because it had never been spawned.
Keeping it sufficient for the old save-time fast path does not make it the
authority for runtime resolution or prove that the eventual launch is ready.

The deliberate asymmetry preserves existing acceptance, including offline
adds, while allowing newly admitted names to receive spawn's own refusals.
It does not promise that saving a schedule proves a future launch will work.
The source selected this design; no human acceptance is recorded here.

# Rejected alternatives

- **Match against the automations snapshot's soul index.** That introduces
  a second resolver and makes acceptance depend on a snapshot that can be
  stale or missing, rather than on the resolver that will launch the run.
- **Run a soul-only preview.** Preview performs full spawn preflight, not
  just name lookup. Omitting the run's selectors can produce a missing-clone
  or ambiguous-launch-config refusal even when the actual job supplies the
  needed selection. The reported examples were `E_CLONE_MISSING` and
  `E_LAUNCH_CONFIG_AMBIGUOUS`, not a permanent catalog of relevant errors.
- **Filter preview failures through a list of soul-related error codes.**
  That creates another classification to maintain as spawn evolves.
- **Remove save-time checking, following local triggers.** The source
  reports that the requested behavior was to surface spawn's refusals when
  adding the schedule; deferring all checking would abandon that choice.
- **Use preview for every add, removing the fast path.** That would newly
  refuse previously accepted local/offline adds because of preflight work
  they had not needed before.

# Enforcement and related judgment

Keep the check at spawn's resolution boundary and exercise both branches:
previously accepted local souls still save without a child preview;
never-spawned offered souls reach preview with their actual run selectors;
unknown names remain refused. These are regression targets, not a claim
that this harvest executed or audited them. Current syntax and naming rules
belong to the implementation, not a second resolver table in knowledge.

The general [single-authority CLI lesson](/nodes/oats-kernel-expert/lessons/per-command-enumerations-drift-from-the-dispatch.md)
owns the duplication principle. The integrations
[consumer-input lesson](/nodes/integrations-expert/lessons/readiness-reads-what-the-consumer-reads.md)
addresses a different captured-versus-current setting problem. Neither
supplies this schedule-specific compatibility exception. Expanding the
accepted names also requires checking the downstream
[derived-name absence proof](/nodes/oats-kernel-expert/lessons/derived-name-absence-needs-producer-identity.md).

# Evidence and limits

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-local-schedule-soul,
2026-11-03; notes/local-schedule-save-check-and-reconcile.md.

The source identifies [awebai/oats#1715](https://github.com/awebai/oats/pull/1715)
at `d2b3f093c0c937ffcc3ad552876a42e0830e4430` as the implementation, open
at proposal time. It reports a live-deployment comparison: the baseline
refused an offered, never-spawned soul at add; the branch accepted it and
schedule test reported resolution; an unknown name still received spawn's
`E_SOUL_UNKNOWN`. The rationale, trial and CI result are source-reported.
This harvest did not inspect that implementation or rerun those checks, and
makes no merge, release, completed scheduled-run or deployment guarantee.
