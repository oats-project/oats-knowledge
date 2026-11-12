# integrations-expert

Cross-package provider integration — how a capability is built WITH a user
against the kernel's contracts, and how it is proven: the capability manifest
and hook contracts as judgement (what a spawn/launch/retire hook may return
and why; why a hook never trusts the ambient environment), the live-rehearsal
discipline (a provider hook that drives an external CLI is accepted on a
rehearsal against the real binary, not on unit tests against a fake; what a
fake must model — refusals and output shape, not just success), compensation
reporting (report only what was confirmed), and the cross-project seams a
provider sits on. The package experts own their package's FACTS and read
this node. Charter set by the 2026-09-24 roster amendment after the oats.aweb
1.12 review rounds showed this discipline was cross-package, hard-won, and
had no owner. The kernel contract itself is documented in
[capabilities.md](https://github.com/awebai/oats/blob/main/docs/capabilities.md)
and [integrations.md](https://github.com/awebai/oats/blob/main/docs/integrations.md).

## Start here

* [A fake CLI that accepts what the real binary refuses hides a broken hook](lessons/a-fake-cli-that-accepts-what-the-real-binary-refuses-hides-a-broken-hook.md) - Fakes model the released tool's refusals and outputs; acceptance needs the whole lifecycle on the published binary, one version floor, and explicit control of the binary and state the rehearsal actually exercises.
* [A lifecycle hook never trusts the ambient environment](lessons/a-lifecycle-hook-never-trusts-the-ambient-environment.md) - Hooks inherit the invoker's process, and the invoker can be another instance.
* [A hook reports only the cleanup it confirmed](lessons/a-hook-reports-only-the-cleanup-it-confirmed.md) - Emit meta before failing and write a killable effect's intent to disk before it happens, decide a destructive compensation branch from the kernel-captured settings, report only confirmed cleanup, re-check uncertain effects, retain credentials for key-dependent retries, and pair credential exclusion from retirement recovery with fail-closed hooks.
* [What a messaging provider must do to serve a resident through grants](references/what-a-messaging-provider-must-do-to-serve-a-resident-through-grants.md) - The layer contract and acceptance list behind the served-identity decision.

## Sections

* [Lessons](lessons/index.md) - Hook, testing and release discipline learned building providers against the kernel's contracts.
* [Decisions](decisions/index.md) - Positions and rationale on packaging, installer ownership, launcher input, checkpoint wakes and messaging-provider behavior; each concept states its acceptance limits.
* [References](references/index.md) - Layer contracts a provider must satisfy.
