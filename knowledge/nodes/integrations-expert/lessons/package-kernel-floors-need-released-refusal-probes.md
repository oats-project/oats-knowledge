---
type: Lesson
title: Prove where a package's kernel floor refuses
description: When a packaged soul gains a kernel key, probe the oldest supported released reader and distinguish locking, discovery and composition failures before choosing or describing the floor's protection.
about: [workstream/provider-integration]
kind: lesson
id: ins-18bca631d10f
tags: [integrations, compatibility, packaging, testing, release]
timestamp: 2026-10-28
---
# A floor's intent does not establish its effect

When adding a newly accepted key to a packaged soul, judge compatibility on
the released kernel at the bottom of the existing supported range, not only
on the accepting kernel or the declared floor. Establish **which operation
refuses, which users reach that check, and what remedy they see**. A successful
lock, an undiscoverable service soul and an incompatible working-soul spawn
are different outcomes, not interchangeable evidence that an old deployment
was kept off a release.

This extends the [real-binary acceptance lesson](/nodes/integrations-expert/lessons/a-fake-cli-that-accepts-what-the-real-binary-refuses-hides-a-broken-hook.md).
The hard-won correction was not that a closed schema rejects a new key;
[wire validation](/nodes/integrations-expert/lessons/a-provider-answer-is-validated-by-the-kernel-not-by-the-reviewer.md)
already covers that. It was that two plausible accounts of the floor's
benefit—preventing the lock, or turning silent feature loss into refusal—both
misdescribed the observed failure path.

# What the released-reader probe changed

On 2026-10-28 the source reports testing released OATS **0.68.1** against
disposable file-Git workspaces containing candidate oats.okf and oats.cloning
packages whose service souls declared `background: true`, with capability
floors raised and unchanged:

| Boundary | Reported result on 0.68.1 |
| --- | --- |
| Package sync | Locked the candidate with either floor choice; a raised floor did not prevent the lock. |
| Service-soul discovery and spawn preview | Discovery reported the unknown key and dropped the soul; spawn returned `E_SOUL_UNKNOWN` with either floor choice. This was diagnosed, not silent loss. |
| Working soul composing a package capability | The unchanged floor allowed composition; the raised floor refused with `E_CAPABILITY_INCOMPATIBLE` and a re-pin remedy. |

The resulting tradeoff is **earlier, clearer refusal for newly composed
working souls versus narrower but misleading service-spawn failures**.
A service-only capability floor cannot help a soul already dropped before
composition. Existing homes do not acquire protection from changing the
floor: their later attempts to spawn the incompatible service still fail.
Do not describe a floor as making the new key safe on the older reader or as
repairing existing homes.

This is integration acceptance judgment, not a new rollout policy. The
maintainer owns the [package-soul rollout gate](/nodes/oats-maintainer/stewardship/release-traps.md#a-package-souls-new-key-is-a-package-wide-rollout-decision-2026-10-27).
Its installation-evidence requirement is not replaced by a probe or by a
successful sync. The reported sync result qualifies that concept's earlier
release-exclusion wording; correction of the maintainer-owned text is left
to its owner.

# Eliminate assumptions with an executable boundary matrix

Prefer real-kernel regression coverage over a permanent reviewer checklist:
test the candidate's admitted floor and the previously supported reader,
with raised and unchanged floors, asserting sync, discovery, working-soul
composition and service-spawn outcomes separately. Include the user-visible
remedy, not merely a nonzero exit. Keep unsupported cases as negative tests
rather than implying they remain supported. These are prevention targets,
not a claim that this harvest delivered that matrix.

Re-establish the relevant spawn routes for each feature; the generalist's
[route-inventory lesson](/nodes/oats-expert/lessons/inventory-spawn-routes-before-specifying-a-feature.md)
already owns that planning obligation. Moving a request from a soul key to a
flag is not proof that the actual execution route can carry or admit it.

# Evidence and limits

Evidence: OKF proposal from integrations-expert/service-souls-background-integrations-expert,
2026-10-28; notes/a-package-floor-does-not-stop-sync-it-refuses-at-spawn.md.

Results are source-reported, not independently rerun by this harvest. Only
one older kernel, 0.68.1, was probed; behavior of other pre-0.69.2 releases
was inferred from source, not executed. The proposal also reports accepting
0.69.2 spawn tests. Those do not establish the old-reader failure path or a
completed package rollout. Candidate implementation PRs were still open at
capture. Exact schema keys and dispatch behavior remain in the kernel's
contracts, not in this lesson as a second API specification.
