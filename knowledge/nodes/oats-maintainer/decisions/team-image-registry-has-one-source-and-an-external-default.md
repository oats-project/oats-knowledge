---
type: Decision
title: The team image takes its registry from one operator source, and its route defaults to external
description: The team container image takes the AWID registry through one validated variable, derived from the single operator source team.registryUrl. A registry-only setting, team.registryRoute local | external, defaults to external, and guards refuse every inconsistent combination. Neither ever falls back silently to the default registry.
about: [workstream/oats-direction]
id: dec-104102fd98c9
tags: [direction, containers, registry, identity, contracts, two-sides]
timestamp: 2026-11-13
---
**Owner: oats-maintainer. Update-on-change:** whoever changes the image's registry input, the route setting or their refusals updates this decision and records the supersession in the node log.

# Decision

The source reports that both maintainer sides agreed these two contracts for the team container on 2026-11-13, by mail. Juan's side proposed them, with the deploy tool's and the image's owners agreeing. Pepe's lane:product maintainer agreed for Pepe's side, on a delegation from Pepe that the source dates 2026-11-10, and added the conditions below. The agreement and the delegation are source-reported; no forge record of either was read at review. The only delegation recorded in this base is the 2026-11-10 one in the [Kubernetes operator access decision](/nodes/oats-maintainer/decisions/kubernetes-operator-access-uses-the-ssh-target.md), which is also source-reported and doesn't say whether it reaches beyond that day's decisions.

**One registry input, from one source.**
- The image reads the registry from exactly one variable, `AWID_REGISTRY_URL`.
- The deploy tool derives it from `team.registryUrl`, which is also the source of the egress policy's registry origin. Because both come from one setting they cannot disagree, so the image does not cross-check the policy.
- The supervisor validates the variable at start and accepts an https origin only. Set but invalid, it refuses to start and names the variable. Unset, the messaging CLI keeps its default registry.
- The value reaches shells as validated data the profile re-validates, never sourced or evaluated.
- Pepe's side's condition: a present but invalid or unreadable value is reported by name. It never drops through to the default registry.
- Accepted limitation: agents in one container share a UID, so this guards against accidents and stale values, not against a subverted team member.

**The route, `team.registryRoute: local | external`, default external.** The default matches `team.registryUrl`'s default, the public registry.
- `external` refuses a registry service in the deployment, and a registry address the deployment owns.
- `local` refuses a missing registry service.
- The signer stays local in both modes.

Pepe's side's conditions on the route:
1. A deployment that runs a registry service and sets nothing is refused once the default is external. The refusal names `team.registryRoute: local`, and the release notes carry an Upgrade line.
2. Both directions are guarded. `local` refuses a registry address the local service doesn't serve.
3. The decision is recorded on its forge issue or PR, with its docs and release-notes entry in the same PR.

# Why

An operator who sets nothing gets the registry the URL already names. A local registry is an explicit choice. Every inconsistent combination is refused by name, which follows the version-skew rule's spirit: [a refusal that names the fix beats a silent fallback](/nodes/oats-maintainer/decisions/an-older-host-degrades-with-a-warning.md).

# Rejected

- Broad environment forwarding, generic SSH environment acceptance, and per-entry copies into the container. Each widens what reaches the container beyond the one value it needs.
- The image cross-checking the egress policy. It is redundant once both derive from one source.
- `local` as the default. An unset deployment would then need a registry service it never chose.

# Kernel fit

The kernel doesn't change for either contract. The variable and the route belong to the deploy tool and the image. Like the [Kubernetes operator access decision](/nodes/oats-maintainer/decisions/kubernetes-operator-access-uses-the-ssh-target.md), this keeps the team container's specifics out of the kernel.

Evidence: OKF proposal from oats-maintainer/product-maintainer-pepe, 2026-11-13; notes/awid-registry-image-input.md. The agreement was exchanged by mail between the two sides on 2026-11-13. Its forge record is the condition-3 PR, which wasn't open at review (2026-11-13). Whoever opens it links it here.
