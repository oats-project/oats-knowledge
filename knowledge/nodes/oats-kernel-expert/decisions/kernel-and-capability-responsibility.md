---
type: Decision
title: Keep kernel responsibilities generic and capability runtimes complete
description: The kernel discovers, resolves, copies and runs the lifecycle through generic seams; replaceable capabilities own concrete knowledge, messaging and tasks behaviour, and operating on OATS is itself capability content.
about: [system/oats-kernel]
id: dec-d4e7657427ec
tags: [kernel, capabilities, layers, composition, boundaries]
timestamp: 2026-09-21
---
# Rationale

Decided 2026-07-11 by the founder (kernel/provider split), extended since.
The split rejects both monolithic tool features and unrestricted competing
implementations of one fundamental responsibility. Soul and instance
lifecycle are the OATS pattern itself; knowledge, messaging and tasks are
exclusive slots, alongside additive capabilities. Exclusivity means one
source of truth per concern: the capability in a slot owns that concern and
the overlapping features of every non-selected tool stay off. The tool is the
adopter's choice, never the kernel's.

**The kernel composes capabilities only through generic seams** (2026-07-27):
declared resources (skills, inject), lifecycle hooks (`spawn`, `launch`,
`retire`), namespaced commands, operations, a readiness check and declared
launch environment. It never branches on a capability's identity. A slot's
spawn hook should stay offline where it can: spawn must not depend on a
tracker or broker being reachable, and a hook that must reach one declares
itself `required` so its failure rolls the spawn back instead of leaving a
half-configured instance. Cleanup that is human-visible work (closing a
tracker roster) is a skill-level protocol, not a retire hook.

**Composition is instance-local and fails closed.** Materializing at a shared
level and relying on harness discovery was rejected (2026-07-11): visibility
would differ by harness and unrelated souls would see the resources. Under
workspace model v2 every resolved capability is copied whole into the
instance home at spawn, in one transaction; composition derives the expected
set from the resolution and fails on a missing or conflicting OATS-managed
resource. "Copy what happens to exist" is not composition. It is not a
sandbox either: harness-native context remains
([harnesses start natively](harness-native-launch.md)). One accepted limit
stands: machines cannot detect contradictory natural-language instruction
blocks, so review, not a checker, adjudicates composed prose.

**Contracts versus capability functionality** (reaffirmed 2026-09-16 for
knowledge, mirroring the [messaging boundary](messaging-capability-owns-provider-behaviour.md)).
Kernel contracts are: slot selection, the copied modules and their recorded
provenance, the merged provider payload with per-leaf origins, hook ordering
and required outcomes, the hook environment, and cleanup obligations.
Capability functionality is: the knowledge model, storage and read views,
episodic conventions, the harvester and its prompts, promotion policy,
delivery and acceptance semantics. No universal kernel harvester, mandatory
state-file layout, node/store model or Git publisher follows from the
contracts ([layers](https://github.com/awebai/oats/blob/main/docs/layers.md)).

**Operating on OATS is explicit capability content** (decided 2026-09-20 with
the human; shipped in 0.26.0). The skills and the "You run on OATS" briefing
were kernel-owned and appeared in every instance by magic, invisible in the
soul's definition and impossible to remove or replace. They now ship as
`oats.core` in the `oats.framework` package, given through the workspace
default and removable per soul; a soul without it is a valid, deliberately
OATS-unaware soul, and `oats doctor --soul` says so. The kernel keeps only the
briefings that describe the layout it itself creates (`instance-boundary`,
the `work-*` blocks).

**Removed with the captured path (0.26.0): per-capability helper-injection
policy.** Helper compositions required every injecting capability to declare
inherit/omit/file, and a hook could opt into source-receipt inputs. Both went
with the captured path; the manifest keys `helperInjection` and hook `inputs`
are tolerated and ignored because the manifest schema is closed, and removing
them would reject every manifest that still carries them
([compatibility](evidence-bounded-compatibility-and-migration.md)). The rule
that came out of that adoption still holds: a manifest contract the kernel
refuses on absence is adopted by the framework's own capabilities in the same
release, with a packaging test.

# Related

[Bridge home markers change retirement](../lessons/bridge-home-markers-change-retirement.md)
records why a runtime bridge's bookkeeping does not acquire the disposable-home
declaration authority of a capability.

[Optional reference theory](/nodes/oats-maintainer/decisions/optional-reference-theory.md);
[A minimal process boundary avoids permanent private coupling](minimal-process-boundary.md);
[Soul declares identity; the workspace versions; the host supplies facts](soul-declares-kind-config-assigns-policy.md);
[Kernel-composed text is executable surface](../lessons/kernel-composed-text-is-executable-surface.md);
[Harness authentication is native and user-managed](harness-native-authentication.md).

# Current contracts

- [Current layers.md](https://github.com/awebai/oats/blob/main/docs/layers.md)
- [Current capabilities.md](https://github.com/awebai/oats/blob/main/docs/capabilities.md)
- [Current souls-and-instances.md](https://github.com/awebai/oats/blob/main/docs/souls-and-instances.md)

# Citations

1. Migrated from agents/oats-expert/soul/knowledge, agents/cli-dev/soul/knowledge and agents/integrations-expert/soul/knowledge @ 7838d3ca (kernel-and-providers, capability-extension-seams, capability-packages, jira-over-aweb-tasks, oats-jira-settings-contract, provider-neutral-knowledge-and-harvest, helper-injection-policy-on-every-injecting-capability, official-capabilities-oats-core-setup-and-marketplace).
2. [OATS 0.26.0 release notes](https://github.com/awebai/oats/blob/main/docs/release-notes/v0.26.0.md), "Removed".
