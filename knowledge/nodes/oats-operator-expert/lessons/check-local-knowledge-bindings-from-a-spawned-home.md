---
type: Lesson
title: Check local knowledge bindings from a spawned home
description: An oats.okf 5.7.0 trial failed to read a local Git base through a file URL and recovered with a plain path after respawn, so binding acceptance must include a spawned-home read rather than a configuration edit alone.
about: [workstream/operations, workstream/knowledge]
kind: lesson
id: ins-fcdb480589f6
tags: [operator, onboarding, knowledge, bindings, verification]
timestamp: 2026-11-03
---
# A valid Git locator is not necessarily an accepted binding

A 2026-11-02 scratch trial on OATS 0.69.8 with oats.okf 5.7.0 bound a local
Git knowledge repository using a `file://` URL. The source reports that the
provider treated it as a bindings-relative filesystem locator, producing a
malformed path rather than reaching the repository. Reads failed with
`E_BASE_UNAVAILABLE`; workers refused to propose because they could not read
accepted knowledge to check for duplicates.

The reported recovery used a plain filesystem path and respawned the affected
homes. The important onboarding failure was not Git's ability to clone local
repositories, but the gap between the operator's locator assumption and the
binding consumed by the spawned worker.

# Operator consequence

For this affected package version, use the plain local repository path and
check `oats okf bases` from a spawned home before depending on consultation
or a harvest checkpoint. An edited bindings file alone is not a receipt that
an existing home's effective binding has changed. The source reports that a
restart was insufficient because the binding was captured at spawn; the
capture documents success after path correction plus respawn, not a separate
controlled comparison of restart and respawn.

Use the selected version's supported lifecycle to obtain and verify the new
binding. Do not turn this one recovery into a universal instruction to
respawn every home after every binding edit. The
[installed-provider authority lesson](/nodes/oats-operator-expert/lessons/the-installed-provider-is-the-authority-for-a-setting.md)
owns the general delivery-versus-effect rule; this is its local-base
onboarding failure case.

# Limits and elimination route

The observation is limited to oats.okf 5.7.0 on one host. It does not define
Git's URL support, certify other locator forms or establish later package
behavior. The [knowledge-package owner](/nodes/oats-okf-expert/index.md)
owns the binding contract and refresh semantics, not this operator node.

The elimination route is provider-side locator validation or normalization
with local-path and file-URL tests, and an onboarding check that exercises
the effective binding from a newly composed home. A clear early refusal is
better than discovering an unreadable base at the first checkpoint. Keep the
current binding grammar and lifecycle procedure in package documentation and
setup tooling rather than maintaining a second schema here.

# Evidence

Evidence: OKF proposal from oats-operator-expert/coord-brain-knowledge-trials-expert, 2026-11-02; notes/okf-local-base-binding-is-a-plain-path.md.

Source-reported failure and recovery; this harvest did not inspect the
provider implementation, clone the trial's local repository or rerun the read.
