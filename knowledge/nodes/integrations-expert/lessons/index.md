# Lessons

Hook, testing and release discipline learned building providers against the kernel's contracts.

## Hooks and provider state

* [Admit failed-run leftovers by type, not name](admit-leftovers-by-type-not-name.md) - Widening a provider's directory admission to accept failed-run leftovers requires expected-type checks before effects, exclusive creation of new outputs, and collision checks across the whole output set.
* [A lifecycle hook never trusts the ambient environment](a-lifecycle-hook-never-trusts-the-ambient-environment.md) - Inputs come from the payload, persisted meta or the instance home, because the invoker may be another instance.
* [A hook reports only the cleanup it confirmed, and keeps the credential a retry needs](a-hook-reports-only-the-cleanup-it-confirmed.md) - Emit meta before failing and write a killable effect's intent to disk before it happens, decide a destructive compensation branch from the kernel-captured settings, report only confirmed cleanup, re-check uncertain effects, retain credentials for key-dependent retries, and pair credential exclusion from retirement recovery with fail-closed hooks.
* [A lifecycle hook ends its own children before the kernel kills it](a-lifecycle-hook-ends-its-own-children-before-the-kernel-kills-it.md) - One deadline of the hook's own, on a monotonic clock, enforced with SIGKILL on synchronous, background and early-exit paths, with compensation safe when it cuts the hook's rollback.
* [Settings reach hooks as a payload, and the brief tells the agent where they are](settings-reach-hooks-as-a-payload-and-the-brief-tells-the-agent-where-they-are.md) - One merged payload in, one brief line and persisted meta out; advisory hooks warn, required hooks fail.
* [Host-only settings are declared in the manifest and refused by the resolver](a-merged-provider-payload-cannot-enforce-host-only-keys.md) - The node's one home for hostOnly: machine facts come only from the host file, and the resolver, not the provider, refuses them elsewhere.
* [A provider that owns an in-life lifecycle owns its state file and its verbs](a-provider-command-never-rewrites-the-kernels-instance-record.md) - Keep in-life state in a provider file mirrored through hook meta, never in instance.json, teach the provider's verbs, and use reported identity locations rather than derived paths or a silent default for an unavailable explicit task destination.

## Kernel contracts

* [Readiness reads the setting source its consumer uses](readiness-reads-what-the-consumer-reads.md) - A readiness check predicting a live consumer must use that consumer's setting source, because a spawn capture can miss a later enable or keep a stale enable after disable; captured settings still describe the home's composition.
* [A document a provider writes for the kernel passes the kernel's own rule](a-provider-answer-is-validated-by-the-kernel-not-by-the-reviewer.md) - Vendor the kernel's validator on the provider's stage; a new key is a wire question; operation keys are bare names.
* [A provider test that fakes the kernel's payload proves nothing about the kernel](a-provider-test-that-fakes-the-kernel-payload-proves-nothing-about-the-kernel.md) - Read the kernel's merge for a key before giving it meaning, and change the kernel rather than guess in the provider.
* [A fallback the contract defines is implemented in every path and is a warning](a-fallback-the-contract-defines-is-a-warning-not-a-readiness-problem.md) - Every mode and readiness take the defined default and warn; readiness derives the value exactly as spawn does.
* [Type availability failures, but rethrow domain errors untouched](type-availability-failures-but-rethrow-domain-errors.md) - A typed availability wrapper catches only transport and unusable-source failures and lets custody, path and validation errors pass.

## Host config and persistent commands

* [Binary replacement can require re-bootstrapping a launchd job](launchd-binary-upgrades-can-need-rebootstrap.md) - A reported post-upgrade launchd refusal needed re-bootstrap rather than kickstart, so upgrade handling must distinguish loaded from runnable and wait for confirmed job absence between bootout and bootstrap.
* [Desktop persistence apply is a human handoff, not a classifier workaround](desktop-persistence-apply-is-a-human-handoff.md) - Agent-assisted desktop setup separates plan and check from the person's persistence-changing act, respects harness refusals, and limits each chosen option to its own effects.
* [Live config validation belongs after confirmation, not in a reusable preview cache](config-validation-belongs-after-confirmation.md) - Validate an isolated baseline and candidate after confirmation and just before an atomic guarded write, because unchanged copied bytes do not prove an executable config's dependencies stayed unchanged.
* [Persisted launchers need recorded kernel paths, not the installer's PATH](persisted-launchers-need-recorded-kernel-paths.md) - Record and verify absolute CLI and Node paths for commands an integration leaves behind, reject instance shims, and detect paths lost to upgrades rather than promising that absolute means permanent.

## Acceptance against the real tool

* [A skipped real-binary test gives no compatibility evidence](real-binary-tests-that-skip-give-no-cover.md) - Real-binary coverage needs installed floor and newer-version runs that fail on skipped required cases and prove the intended paths executed, not just a matrix or a green suite.
* [A live Pi TUI does not prove provider readiness](a-live-pi-tui-does-not-prove-provider-readiness.md) - Pi 1.3.0 could accept a prompt and remain silently running without a logged-in provider, so omitting a shared model pin avoids a portability assumption but does not establish an executable session.
* [A rehearsal's measurement must not change the state under test](a-measurement-must-not-change-the-state-under-test.md) - Establish that a diagnostic preserves the state being measured, and compare unexplained transitions with the observer's own actions before attributing them to the system under test.
* [Credential-free harness probes establish only the boundary they exercise](credential-free-harness-probes-have-bounded-proof.md) - A real TUI with a local stub provider can test input consumption without login, while real sandbox commands test particular permissions; neither substitutes for authenticated end-to-end acceptance.
* [Forge account attribution does not prove human authorship](forge-account-attribution-does-not-prove-human-authorship.md) - When agents share a person's forge account, an author check establishes the account record, not human authorship or independent approval.
* [A fake CLI that hangs must start a child of its own](a-fake-that-hangs-must-have-a-child.md) - A single-process hang fake hides descendant leaks, so timeout and reader-termination tests must observe both the fake and its child on every external-CLI call path.
* [A fake CLI that accepts what the real binary refuses hides a broken hook](a-fake-cli-that-accepts-what-the-real-binary-refuses-hides-a-broken-hook.md) - Fakes model the released tool's refusals and outputs; acceptance needs the whole lifecycle on the published binary, one version floor, and explicit control of the binary and state the rehearsal actually exercises.
* [A delivery acknowledgement must name the stage its receipt proves](acknowledgement-stage-must-match-receipt.md) - Delivery state is recorded only after the component that owns the agreed stage acknowledges that stage; callback completion and whole-turn waits can prove the wrong thing.
* [Integration guidance and local validation follow the real contract](guidance-names-only-verbs-the-target-cli-exposes.md) - Name only verbs the CLI exposes, read the manifest over prose, and validate a service-defined value the same way in every path.
* [A client view that contradicts the source of truth is a client defect](a-failing-readiness-diagnostic-is-not-a-missing-fact.md) - Read the authoritative source and the message-level envelope, and never rewrite a live identity to satisfy a view.
* [A grant is proven per path at the receiver](a-grant-home-needs-a-custody-reference-for-encrypted-receive.md) - Custody attachment is necessary, not sufficient; scopes do not name the endpoints a path calls, so rehearse each path and direction.

## Packaging and release

* [Provider guidance cannot depend on upstream skill pointers](provider-guidance-cannot-depend-on-upstream-skill-pointers.md) - A provider must teach its selected slot's minimum loop in its composed guidance because upstream skill pointers do not establish local availability, and an agreed wording-based opt-in must be expressed where that capability is selected.
* [Prove where a package's kernel floor refuses](package-kernel-floors-need-released-refusal-probes.md) - When a packaged soul gains a kernel key, probe the oldest supported released reader and distinguish locking, discovery and composition failures before choosing or describing the floor's protection.
* [A provider release is tagged first, then mirrored and pinned in one re-proven framework PR](a-provider-release-is-mirrored-and-pinned-in-one-pr.md) - Tag first, then review the tag-identical mirror and every pin as one diff; the gate keeps the Desktop suite, with the suites in CI and only named affected test files run locally, and a pin is re-proven after another shared-file change lands.
* [Prefer a narrow integration-owned wrapper, and document its support matrix](prefer-a-narrow-integration-owned-wrapper-over-a-third-party-cli.md) - Own a JSON-first wrapper with credentials from the environment, and state what is supported, human-only or unsupported.

## Messaging service seams

* [Presence-dependent floors follow the component serving each identity](presence-floors-follow-the-serving-component.md) - Before gating a presence-dependent feature, map each identity to its active heartbeat producer, keep task prerequisites in the task capability, and distinguish presence-only registration from message delivery.
* [A team per workspace needs a service primitive](a-team-per-workspace-needs-a-service-primitive.md) - The messaging service has no idempotent team create-or-return; its human-login conclusion is superseded by the default-team decision.
* [A global instance identity's address is released only by the authority that owns its lifecycle](a-global-instance-identity-leaves-a-permanent-address-behind.md) - Settle which authority releases a global identity's address and joins further teams before defaulting instances to global.
