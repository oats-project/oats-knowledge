---
type: Lesson
title: Readiness reads the setting source its consumer uses
description: A readiness check predicting a live consumer must use that consumer's setting source, because a spawn capture can miss a later enable or keep a stale enable after disable; captured settings still describe the home's composition.
about: [workstream/provider-integration]
kind: lesson
id: ins-4d7ac7489658
tags: [integrations, readiness, settings, resolver, testing]
timestamp: 2026-11-02
---

# Why the convenient input was wrong

The source's 2026-11-02 onboarding-VM investigation found a messaging
provider warning gated on a home's captured health-publishing setting.
The observer counting unread mail instead read the kernel's current
resolved payload. A home spawned before the host enabled publishing did
not warn when unread counts were unavailable; a home spawned with it
enabled could keep warning after the host disabled it. The two readers
agreed at spawn and diverged later in both directions.

This is a finding about one provider and one host-mutable setting, not a
rule to replace every captured input with live configuration.

# Choose by the behavior being predicted

Before choosing a readiness input, identify the consumer whose behavior
the check predicts and where that consumer obtains the setting:

- A check about what the home was composed with, such as its captured argv
  or instruction inject, still needs the composition's captured settings.
  A later host edit does not establish that the home changed.
- A check about a consumer that reads current resolved settings needs that
  same current source. A captured value being present does not establish
  freshness, even when it was valid at spawn.

The reported repair asks the public resolver through `oats inspect` at the
selected soul and deployment scope. It does not read the host-local file
itself. The existing [host-only setting rule](/nodes/integrations-expert/lessons/a-merged-provider-payload-cannot-enforce-host-only-keys.md)
owns layering and provenance enforcement; this lesson adds the separate
question of which point in time the consumer uses.

The [defined-fallback lesson](/nodes/integrations-expert/lessons/a-fallback-the-contract-defines-is-a-warning-not-a-readiness-problem.md)
requires readiness to match spawn when predicting spawn. Matching a live
observer instead is the same consumer-alignment principle, not permission
to change that fallback or to reinterpret frozen home state.

# Rejected shortcuts

- **Read the local file in the provider.** That duplicates resolution and
  can omit other applicable layers. The resolver remains the authority,
  including for the host-only constraint; the provider does not become a
  second configuration interpreter.
- **Query current settings only if the capture lacks the key.** This fixes
  the missing-enable case but leaves the reverse case broken: an explicit
  captured `on` survives a later disable. Test disagreement in both
  directions, not just absence.
- **Memoize per deployment inside the readiness process.** The source
  reports one process per home in the investigated health tick, so that
  cache would not share the query across homes. This is not a general
  rejection of caching or batching. The messaging expert's
  [measured-cache decision](/nodes/oats-aweb-expert/decisions/readiness-cache-needs-measured-cost.md)
  remains the home for publisher performance judgment.

# Eliminate the mismatch in code

Keep readiness and its runtime consumer on the same authoritative
resolution boundary, rather than maintaining a second file reader. Add
regressions where the home's capture disagrees with current resolution in
both directions, including a present stale value, and a control showing
that composition-only checks continue to use captured inputs. Resolver
failure must not be interpreted as evidence that the feature is enabled,
disabled or healthy. These are enforcement targets, not claims that this
harvest verified those tests or introduced a new readiness status policy.

Price the extra resolver query on the implementation PR and measure the
actual process topology before proposing a cache. Correct source selection
does not make repeated process startup free.

# Evidence and limits

Evidence: OKF proposal from integrations-expert/overdue-step-checkpoint-integrations-expert,
2026-11-02; notes/readiness-reads-what-the-consumer-reads.md.

The source identifies [awebai/oats-aweb#179](https://github.com/awebai/oats-aweb/pull/179),
through head `1503e65`, as the repair and reports reviewer approval. The PR
was open and unmerged at proposal time. The failure, repair and process
model are source-reported; this harvest did not inspect the implementation,
rerun the VM trial or establish release or deployment. The retained lesson
is the input-selection rationale and rejected shortcuts, not a CI or
shipment receipt.
