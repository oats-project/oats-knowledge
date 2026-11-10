---
type: Decision
title: Operators reach agents in a Kubernetes team container through the existing SSH execution target, not a new kubectl-exec target
description: For Pepe's side, decided 2026-11-10 with Juan's side's agreement, operators reach agents in a Kubernetes team container through the kernel's existing SSH execution target (sshd in the pod, the operator's ssh configuration using a ProxyCommand over kubectl port-forward), so the kernel stays runtime-neutral with one execution route; a kubectl-exec execution target returns as a contract question for both sides only if a deployment forbids sshd in pods.
about: [workstream/oats-direction]
id: dec-74bd77342254
tags: [direction, kubernetes, containers, operators, execution-targets, contracts, two-sides]
timestamp: 2026-11-10
---
**Owner: oats-maintainer. Update-on-change: whoever learns that a deployment
forbids sshd in its pods, or that a kubectl-exec target has been proposed on
an issue, updates this decision and records the supersession in the node
log.**

# Decision

The source reports that on 2026-11-10 Pepe's lane:product maintainer, on
Pepe's delegation of that day, answered decision D2 of Juan's side's
team-container runtime design (awebai/aweb
`docs/design/team-container-runtime.md`, section 10, at `8b86e9ca`): how an
operator reaches an agent running in a Kubernetes pod.

**Chosen: the kernel's existing SSH execution target.** sshd runs in the
pod, and the operator's SSH configuration reaches it with a `ProxyCommand`
over `kubectl port-forward`. The kernel does not change. Kubernetes
specifics stay in the operator's SSH configuration, outside the kernel.

**Rejected for now: a new kernel `kubectl exec` execution target.** It is a
contract: a new target kind, its configuration and its errors, decided by
both sides. It is reopened, as a contract question on an issue, only if a
deployment forbids sshd in pods. That deployment fact was still open when
this was decided.

# Rationale

The kernel stays runtime-neutral: it knows SSH targets, not container
platforms. One execution route keeps one set of semantics for attach, the
start and identity checks, and the operator route being added for SSH
targets, instead of a second route that has to reproduce each of them.

# Limits

This records the route and why, not a Kubernetes recipe, a chart, an image
or a NetworkPolicy; those are the runtime design's and the deployment's. The
design document at the cited revision was read at harvest and poses D2 with
these two options and the same recommendation; the decision itself, Pepe's
delegation and Juan's side's agreement are source-reported (the session and
mail), not read on an issue. The operator route for SSH targets was open and
unmerged at harvest.

# Citations

1. awebai/aweb `docs/design/team-container-runtime.md` at `8b86e9ca`,
   section 10, decision D2 (read at harvest 2026-11-10).

Evidence: OKF proposal from oats-maintainer/product-maintainer-pepe,
2026-11-10; notes/k8s-operator-access-uses-ssh-route.md.
