---
type: Decision
title: Host-bound automation is declared in the workspace with explicit execution selectors
description: Declare shared host-bound automation in the workspace with its required host and account selectors, retaining host-local consent rather than hiding the automation locally or redesigning the binding contract merely to omit those names.
about: [workstream/oats-direction]
id: dec-e10156fd61fc
tags: [workspace, automation, review, consent, privacy, rejected-alternatives]
timestamp: 2026-10-29
---
# Decision and acceptance

Declare shared automation that must run on one host in the workspace's
member-owned automation definition, rather than adding an invisible local
trigger by hand. Keep the required literal `runsOn` host and `owner` account
selectors in that committed definition. Shared visibility and rebuildability
do not require the automation to run on every host.

The source reports Pepe's direct acceptance of this option on 2026-10-29,
followed by approval of the cutover. The forming case was the OKF
harvest-review trigger. This records the accepted choice and the maintainer's
rationale, not independent verification of the private acceptance exchange
or the deployed result.

# Why this choice, rather than the alternatives

- **A local-only trigger** hides a shared responsibility from other workspace
  readers and leaves a rebuild dependent on remembering an uncommitted setup.
  Host-specific execution is not a reason to keep the declaration invisible.
- **A neutral host name** hides only the machine name while still naming the
  account, and requires renaming a host fact that other settings refer to.
  It was rejected as a partial disguise with unrelated configuration cost.
- **A new host-local binding for both selectors** would change the contract
  for the shared declaration and its host-side consumer. That was rejected
  as disproportionate to this effort, not as a prohibition on all future
  binding designs.

The chosen tradeoff deliberately exposes the execution selectors in the
operational declaration. The source's rationale was that the selected
account and host labels were already publicly visible in project activity;
that observation is not blanket permission to publish another deployment's
identities, private paths or credentials.

# Review boundary: a declaration is not explanatory documentation

This decision explicitly rejects applying the [deployment-specifics
lesson](/nodes/oats-expert/lessons/design-records-name-no-deployment-specifics.md)
as a blanket ban on a workspace automation's required `runsOn` and `owner`
fields. That lesson still governs design records, release prose and shared
knowledge. No concrete host or account value belongs in this concept.

For the automation declaration, review the intended execution scope and
host-local consent rather than returning the required names merely because
they identify one execution host and account. The rationale relies on the
host's own name, forge login and `automations.trust` selection agreeing with
the declaration: committing the file is not itself the host's consent.
This is the decision's consent boundary, not a second specification of every
runtime eligibility check.

The operator's [scope-placement
lesson](/nodes/oats-operator-expert/lessons/place-each-fact-at-the-scope-that-owns-it.md)
remains intact: shared intent and a host's local authorization are different
facts. Declaring the intended executor does not move credentials, custody
locations or the host's trust choice into shared configuration. Nor does it
change the [workspace model](/nodes/oats-maintainer/decisions/workspace-model-v2.md)'s
trust rule for member capabilities into automatic permission for host-bound
execution.

# Evidence and limits

Evidence: OKF proposal from oats-maintainer/setup-maintainer-pepe,
2026-10-29; notes/host-bound-automation-declared-in-workspace.md.

The proposal identifies [awebai/oats#1645](https://github.com/awebai/oats/pull/1645)
as the implementation and review record. Acceptance, review and cutover
results are source-reported; this harvest did not audit the implementation
or test a host. The current declaration syntax and execution checks belong
in [Workspace triggers and schedules](https://github.com/awebai/oats/blob/main/docs/schedules.md#workspace-triggers-and-schedules),
not in a copied operational recipe here. Cutover ordering and first-poll
dedup behavior are outside this decision.
