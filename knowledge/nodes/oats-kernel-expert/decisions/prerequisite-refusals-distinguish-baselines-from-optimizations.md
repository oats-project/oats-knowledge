---
type: Decision
title: Prerequisite refusals distinguish supported baselines from optimizations
description: Enforce the deliberately selected Node baseline with its real error preserved across consumers, while reporting an older Git's working whole-tree fallback instead of refusing it for a performance difference.
about: [system/oats-kernel]
id: dec-ea4489673b8c
tags: [kernel, prerequisites, compatibility, errors, rejected-alternatives]
timestamp: 2026-10-30
---
# Decision and rationale

The onboarding request paired a Node 22 floor with a Git 2.45 floor. The
source reports product-lane direction to separate them: enforce the
documented Node baseline, but keep older Git working through the whole-tree
fallback and report the performance difference in doctor.

Git 2.45 enabled the partial-cache behavior the investigation needed; it
was not the minimum for all kernel operation. A hard refusal would exclude
working installations merely because they fetch whole trees. The rejected
alternative is therefore a blanket Git 2.45 floor, not refusal of an actual
unsupported operation. Before enforcing a reported prerequisite, establish
whether it is a functional dependency, a supported baseline decision or
an optimization with a working fallback.

The Node choice is a deliberate support boundary. The release-lane record
explicitly could not establish that older kernels always fail on Node 20,
and accepts that a previously working user may now be refused. Do not
rewrite that cost into a discovery that every older runtime breaks. Release
guidance must state the action required by affected users.

# Preserve the reason at every consumer

The selected `E_NODE_UNSUPPORTED` refusal precedes kernel initialization
and uses the ordinary failure envelope for JSON, including the `found`
and `minimum` details. Release-lane clearance required three consumer
conditions:

1. A remote probe relays the host's actual failure instead of converting
   an unsuccessful envelope into `E_REMOTE_INCOMPATIBLE` and suggesting
   the wrong remedy.
2. The Desktop CLI locator retains the envelope's message as the rejected
   candidate's reason, while continuing discovery, instead of displaying
   only the failed process invocation.
3. `version --json` documents and handles this failure envelope even
   though its successful answer has a different shape.

These conditions preserve a diagnosis across the machine boundary, rather
than just adding a local version check. Qualify the early refusal and
consumer propagation with executable JSON/text and remote/Desktop cases;
the historical decision does not substitute for those tests. Apply the
existing [supported-adoption boundary](evidence-bounded-compatibility-and-migration.md)
when writing upgrade guidance.

# Evidence and limits

Evidence: OKF proposal from oats-kernel-expert/onboarding-kernel-expert, 2026-10-30; notes/prerequisite-floors-refuse-only-what-breaks.md.

The product-lane decision is source-reported, attributed to
oats-expert-juan in mail 68131900 on 2026-10-30/31. The harvest read the
[release-lane clearance](https://github.com/awebai/oats/pull/1692#issuecomment-6536006401)
of 2026-10-30. It is an agent's release-lane record, not direct human
acceptance. The record confirms the three conditions and the accepted working
Node 20 cost.

The implementation PR was still a draft when read. No tests were rerun,
and neither a merge nor installed enforcement is claimed.

# Related

- How the older-Git report is said, once per command and naming no
  repository, is [its own decision](notice-frequency-follows-the-facts-subject.md);
  it applies this boundary without changing it.
