---
type: Decision
title: Retire Git reads preserve the spawn baseline's configuration semantics
description: Retire keeps operator global and system Git configuration to remain comparable with the spawn baseline, so its read profile must not be unified with fully isolated observation without an explicit baseline transition.
about: [system/oats-kernel]
id: dec-3656709c4e5f
tags: [kernel, retire, recovery, git, security, compatibility]
timestamp: 2026-10-08
---
# Decision

Retirement's Git reads deliberately retain the operator's global and system
configuration, unlike the fully isolated instance Git observation API. Do not
consolidate the two profiles merely because both read an agent's work tree.
The distinction preserves the meaning of the stored spawn baseline, not a
preference for less isolation.

The source records this decision on 2026-10-08 and reports acceptance by both
maintainers during the implementation review. That acceptance is
source-reported, not independently established by this harvest.

# Rationale

The spawn baseline was taken under the operator's global configuration.
Dropping that configuration only at retirement can change what status reports:
global ignore rules, line-ending conversion and filters can affect the result.
For an instance whose status depends on those settings, the comparison can
classify unchanged work as changed and introduce an unnecessary recovery copy.
A copy attempt is fallible and can refuse retirement. More isolation is not a
semantics-preserving substitution when it changes one side of a stored
comparison.

The chosen retirement read profile suppresses optional index writes and the
helper paths covered by its explicit guards, while dropping inherited
repository-local Git environment variables. It retains operator configuration
to preserve baseline comparability. The security concern is the repository
configuration the retired agent could write; retaining the operator's global
configuration does not make that repository configuration trusted.

# Rejected alternatives and residual

- **Reuse the fully isolated observation profile unchanged:** loses the
  configuration semantics under which existing spawn baselines were captured.
- **Use ambient Git without guards:** repository-named helpers can execute in
  the operator's context; an argv-safe invocation is not a helper-free read.
- **Neutralize every filter during retirement status:** can change status
  semantics too. A filter driver named by repository-local configuration and
  selected by `.gitattributes` can still run during status. This is a recorded
  residual of this decision, not a claim that retirement reads
  are a sandbox or fully helper-free.

The distinction is scoped to retirement reads that feed the baseline
comparison. It does not authorize weakening the observation API's isolation
or changing the policy for mutating Git operations.

# Revisit explicitly

A future baseline version captured under isolation could support a different
retirement profile, but that requires an explicit transition for existing
baselines and a superseding decision. Unifying the runners alone does not
perform that transition.

# Related

- [Version baseline digests independently of baseline authority](/nodes/oats-kernel-expert/decisions/baseline-digests-have-an-independent-version.md) explains why digest evolution must not invalidate lifecycle authority; it does not supersede this configuration-profile decision.
- [Observation must not harm the observer](/nodes/oats-kernel-expert/lessons/observation-must-not-harm-the-observer.md) owns the observation API's isolation rationale.
- [Preserve recovery authority until the outcome is proven](/nodes/oats-kernel-expert/decisions/preserve-authority-until-cleanup-is-proven.md) owns the fail-closed recovery and retention rule.

# Citations

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-retire-recovery, 2026-10-08; notes/decision-retire-git-read-profile.md.

The proposal identifies [awebai/oats#809](https://github.com/awebai/oats/pull/809)
as the implementation review; its merge and approval history were not
independently audited by this harvest.

Verified by the knowledge maintainer at review of the harvest: awebai/oats#809
merged on 2026-10-08 with APPROVE verdicts from both maintainers posted on the
PR. Its description records keeping global and system configuration because
the spawn baseline was taken under them, documents the filter-driver
residual, and lists turning off filter drivers and isolating retire from
global configuration as out of scope.
