---
type: Decision
title: An unreached host keeps Stop and Retire available through a fresh plan
description: Keep unknown remote rows actionable through the kernel's routed plan rather than hide Stop and Retire on the strength of an earlier failed roster read.
about: [system/oats-desktop]
id: dec-184f30c84c2a
tags: [desktop, lifecycle, remote, cli-authority, observation]
timestamp: 2026-10-14
---
# Decision and rationale

The source reports agreement on 2026-10-14 for Desktop and the terminal
client: a remote row whose host was not reached on this read keeps Stop and
Retire available. Show its state as unknown and offer no Open. Do not add a
client reachability gate before asking the kernel for the routed plan.

**Not reached describes a past read, not the host's state now.** A host can
return between roster refresh and the operator's action. Hiding or disabling
Stop and Retire on that old observation would block recovery and place a
second gate beside the installed CLI, which is authoritative about what the
operation would touch. Unknown does not establish that the instance stopped.

The routed `--plan` is the fresh reachability check. Under the reported
contract it probes the host first, returning `E_SSH` and no plan while the
host remains unreachable. With no plan, the client offers no apply. Keeping
the actions visible therefore does not mean enabling an unplanned mutation,
inventing a successful reach check or relaxing plan revalidation.

# Accepted cost and boundaries

The operator can incur a failed plan's wait. That wait is a read and may be
abandoned, ending the plan child; the separate rule that an apply/start wait
deadline must not end its child is not a rule that every read must continue.
Do not preserve timeout constants as a competing contract here.

This applies [CLI authority](standalone-product-and-cli-authority.md) and
[Stop's lifecycle semantics](/nodes/oats-maintainer/decisions/desktop-parity-lifecycle-and-policy.md#2-stop-is-a-first-class-recursive-lifecycle-action).
It complements, rather than reverses,
[kernel unknown is not client-probed](kernel-unknown-is-not-refined-by-a-client-probe.md):
requesting an authoritative action plan is not using a weaker client probe to
manufacture liveness or terminal eligibility. It also does not decide product
succession or authorize a second operational model for a terminal client.

# Enforcement

Carry an unreached row through menu, state and plan composition tests: Stop
and Retire remain available, Open does not, an unreachable plan yields no
apply, and a host that returns can supply a plan without waiting for the
roster to change. Exercise the actual routed-plan boundary as well as the
reader. These are regression targets, not claims of completed verification.

# Evidence

Evidence: OKF proposal from oats-desktop-expert/oats-desktop-expert-REDACTED-desktop-queue, 2026-10-14; notes/an-unreached-hosts-row-keeps-stop-and-retire-the-plan-checks-reach.md.

The source cites [awebai/oats#855](https://github.com/awebai/oats/issues/855),
comments 6169172718 and 6169179279, terminal-lead concurrence, and shipment in
[#1164](https://github.com/awebai/oats/pull/1164). These are source-reported
agreement and implementation references, not independently verified human
acceptance, code review or reachability measurements.
