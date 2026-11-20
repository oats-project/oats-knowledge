---
type: Lesson
title: On a private AWID registry, a passing wake install plan is the broker check, and the registry is recorded before any other oats aweb act
description: oats aweb wake status shows a running broker but not its registry, so a setup path on a private registry gates on `oats aweb wake install --plan --json` answering ok and stops on every refusal; a hand-run `aw wake run` does not get the recorded registry; and `oats aweb setup --registry` runs before the first `--check-only`, which a non-public AWID_REGISTRY_URL in the environment refuses.
about: [workstream/operations, workstream/provider-integration]
kind: lesson
id: ins-7b330add2525
tags: [byot, awid, registry, wake-broker, onboarding, fail-closed]
timestamp: 2026-11-20
---

# A running broker is not a broker for this registry

On oats.aweb 1.45.0 a private AWID registry is admitted only by the host
setting `settings.oats.aweb.registry`, and the wake broker's unit carries it as
its registry pin. A setup path that hands the person `oats aweb wake install`
and then checks `oats aweb wake status --json` for `"daemon": { "running": true }`
can pass a broker that never got the registry:

- `wake status` reports the unit and the daemon, never a registry. An
  account whose existing wake unit is pinned to another registry, or carries
  no pin, refuses the install with `E_WAKE_REGISTRY_CONFLICT` in the person's
  terminal, while the old broker still reads running.
- Handling only the named codes and letting "anything else" go on lets the
  same through for a broker started by hand (`E_WAKE_RUNNING_UNSUPERVISED`)
  and for a unit the install didn't write (`E_WAKE_UNIT_CONFLICT`).
- With no service manager (`E_WAKE_UNSUPPORTED`), the fallback `aw wake run`
  does not get the recorded registry: the setting reaches the daemon only as
  the `AWID_REGISTRY_URL` that the unit oats.aweb writes carries, so a hand-run
  daemon has only what its own shell exports.

`oats aweb wake install --plan --json` runs every refusal the install makes,
read-only, so it is the check: only `"ok": true` goes on, every refusal stops
and goes to the person, and nobody stops, uninstalls or deregisters a broker
for them. On a private registry with no service manager there is no supported
broker; a setup expert on a channel harness (Claude, pi) needs none.

# Record the registry first

`oats aweb setup` checks the registry setting before any act, `--check-only`
included. With a non-public `AWID_REGISTRY_URL` already exported (aw's
`prepare-controller` defaults to it, so a person who prepared their namespace
may have it) and no setting recorded, the first check refuses
`registry-setting-required`. So `oats aweb setup --soul S --registry <origin>`
comes before every other `oats aweb` act of the deployment, never after a
check. Run it on its own: combined with `--check-only` or `--plan` it records
nothing.

# The general shape

When the check you have can't observe the property you need, use the dry run
of the act that enforces it, and treat every non-success as a stop. The
namespace side of a private registry, the TXT record naming it, is the
operator lesson
[a namespace on a private AWID registry needs that registry in its TXT record](/nodes/oats-operator-expert/lessons/a-private-registry-namespace-needs-its-registry-in-the-txt.md).

# Elimination route

For the getting-started BYOT path the rule is in the skill: oats-project/oats#2001
(open and unmerged at review) gates step 9's broker on the plan and records
the registry before item 1, with tests pinning both orders. The trap itself
would go if `oats aweb wake status` reported the unit's registry pin; that is
a proposed fix for the provider's owner, not an implemented one. Until it
ships, every other setup path (host delivery, onboarding, a rebuild) keeps
this check by hand.

# Evidence

The three fixes are oats-project/oats#2001's commits 2ec0face (round 1: the
conflicting or missing pin, and no service manager), d0fb9cff (round 2: only
`"ok": true` goes on) and 48bc0bee (round 3: the registry recorded before the
first check), each naming its finding as a major; verified. The review
reports themselves, and round 4's approval at 48bc0bee, are the source's
report. The provider behaviour was checked against oats.aweb v1.45.0's source
(`lib/wake-service.mjs`: `installWake` calls `prepareInstall` for the plan
and the install alike, `wakeStatus` returns no registry, and the unit carries
the registry as `AWID_REGISTRY_URL`; `lib/registry-setting.mjs`
`registryMigration`; `bin/oats-aweb.mjs` setup, which runs that check before
any act and records `--registry` only without `--check-only` or `--plan`),
not observed on a live host; requalify on a later oats.aweb.

Provenance: OKF proposal from oats-engineering-expert/private-registry-getting-started-lead, 2026-11-20; notes/private-registry-wake-broker-gate-is-the-install-plan.md. Accepted by maintainer review of [oats-knowledge#428](https://github.com/oats-project/oats-knowledge/pull/428).
