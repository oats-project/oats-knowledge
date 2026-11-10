---
type: Lesson
title: Binary replacement can require re-bootstrapping a launchd job
description: A reported post-upgrade launchd refusal needed re-bootstrap rather than kickstart, so upgrade handling must distinguish loaded from runnable and wait for confirmed job absence between bootout and bootstrap.
about: [workstream/provider-integration]
kind: lesson
id: ins-d1f53cd03050
tags: [integrations, launchd, services, upgrades, acceptance]
timestamp: 2026-11-04
---
# An unchanged job can stop being runnable

The source reports a macOS field failure after an upgrade to aw 1.36.54
replaced the native executable. The wake broker's loaded launchd job would
not run: `launchctl print` reported exit 78 (EX_CONFIG) and the diagnostic
`needs LWCR update`. `launchctl kickstart -k` left it down; removing the job
with `launchctl bootout` and loading its plist again with
`launchctl bootstrap` restored service.

This is **source-reported**, relayed from a host operator rather than
reproduced by the proposer or this harvest. The exact macOS version was not
established. The source attributes the refusal to a job code requirement
retained from bootstrap becoming incompatible with the replacement binary's
signature. That is the reported explanation, not an independently verified
launchd-internals contract or a claim about every binary replacement.

# Reject kickstart as the complete upgrade strategy

For a provider that promises “rerun install after upgrading the program,”
restarting an unchanged loaded job is not sufficient evidence of recovery.
The reported failure kept the path and job while changing the executable;
comparing only the plist or treating “loaded” as “healthy” misses that
boundary. For this post-upgrade refusal, use bootout, confirm the job has
unloaded, then bootstrap the provider-owned job rather than repeating
kickstart, and verify that the resulting service actually runs.

A long-running KeepAlive process can also hide the upgrade boundary while
it continues using its old executable. The source identifies its next exit
and attempted respawn as the delayed-failure risk; the capture does not
establish a separate custody-service reproduction. Include a loaded but
non-running job in upgrade recovery, but do not classify every idle launchd
job as broken or diagnose every exit 78 as a signature problem.

The [persisted-launcher lesson](/nodes/integrations-expert/lessons/persisted-launchers-need-recorded-kernel-paths.md)
owns executable-location lifetime. This is a different failure: a surviving
path does not prove that the service manager will admit its replacement
executable. Neither lesson grants permission to modify foreign jobs or to
perform host service operations from an unauthorized instance.

# Wait for unload, not merely for bootout to return

A second source-reported macOS measurement on 2026-11-04 exposed a race in
back-to-back bootout/bootstrap. A disposable job took three seconds to
handle SIGTERM; an immediate bootstrap failed with error 5 (input/output
error) in four of six rounds. In the other two, bootout exited 3 and the
subsequent bootstrap succeeded. The report attributes this to asynchronous
unloading and warns that a failed bootstrap can leave the job unloaded.
These six rounds establish a reported failure mode, not a general failure
rate or the meaning of every error 3 or 5.

**Bootout's return is not proof that the job is gone.** Refine the earlier
“bootout followed by bootstrap” guidance for a provider-owned GUI job:

1. Request bootout and retain its diagnostics; neither success nor a
   nonzero exit alone establishes unload completion.
2. Wait, within a finite bound, for `launchctl print gui/<uid>/<label>` to
   positively report that the job is not found. An unrelated print failure
   is uncertainty, not absence.
3. Only after that absence result, bootstrap once and verify the service.
4. If the bound expires without confirmed absence, stop before bootstrap
   and report the unresolved unload with the manual bootstrap recovery step;
   do not claim a successful reload or automatically retry bootstrap.

Choose the bound with launchd's own stop allowance in view, not an arbitrary
ten-second wait. The source attributes a twenty-second default `ExitTimeOut`
when the plist sets none to the maintainer's review, and reports choosing a
thirty-second bound for those jobs. The rationale is to wait longer than the
applicable finite stop allowance; thirty seconds is not a universal value
for every plist or service. Neither the default nor a sufficient bound for
all platforms was independently established by this harvest.

The capture explicitly lacks a real-Mac observation of the exact not-found
exit code modeled by the fake. Confirm that classifier against the supported
platform before treating its numeric code as a contract. This does not
license treating every failed print as absence.

# Eliminate the reliance on operator memory

Put the reload into the provider's service-upgrade lifecycle, not just a
troubleshooting note. Regression coverage should distinguish job-file
changes from executable replacement at the same path and cover loaded-but-down
recovery. Model a job that remains visible after bootout returns and rejects
bootstrap while unloading; assert no bootstrap before confirmed absence.
Cover nonzero bootout with eventual absence, unrelated print failures,
bound expiry with no bootstrap, and slow termination with descendants.
Where an operator step remains necessary, name the wait between the two
operations rather than an ambiguous “restart.” These are implementation and
review targets, not checks implemented or run by this harvest.

A command-sequence fake cannot establish which macOS versions enforce the
reported requirement. Apply the existing
[real-binary rehearsal discipline](/nodes/integrations-expert/lessons/a-fake-cli-that-accepts-what-the-real-binary-refuses-hides-a-broken-hook.md)
to an authorized macOS upgrade-and-restart rehearsal, including the delayed
respawn case. Record the actual platform and signature transition before
extending the finding's scope. The initial proposal said a provider fix was
being built. The refinement reports a merged fix in
[awebai/oats-aweb#198](https://github.com/awebai/oats-aweb/pull/198), commit
`61be2fb0`, with a thirty-second wait and lingering-job fake coverage. That
is the reported elimination route, not independent implementation, CI,
release or deployment verification; passing fake tests do not close the
real-Mac not-found-classifier gap.

# Evidence

Evidence: OKF proposal from integrations-expert/overdue-step-checkpoint-integrations-expert, 2026-11-04; notes/launchd-restarts-need-bootout-after-a-binary-upgrade.md.

The initial harvest in
[oats-knowledge#301](https://github.com/awebai/oats-knowledge/pull/301)
recorded the failed kickstart and successful bootout/bootstrap recovery.
The same-day refinement adds the reported asynchronous-unload measurement,
wait rationale and classifier evidence gap, using the updated captured note.
Both observations remain source-reported, not reproduced by the proposer or
this harvest. They do not establish
that this is the only possible recovery, that all macOS releases behave the
same way, or that another service manager cannot have an analogous upgrade
failure. No Linux comparison was reproduced here.
