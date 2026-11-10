---
type: Decision
title: Optional reference theory, capability-owned runtime
description: OATS offers an adoptable reference knowledge theory while each capability owns its runtime behavior and may choose a different model.
about: [workstream/oats-direction, workstream/knowledge]
id: dec-20d6d915ebfc
tags: [knowledge, architecture, capabilities]
timestamp: 2026-09-17
---
# Accepted direction

The OATS founder accepted this direction in the human scoping discussion on
2026-09-13: OATS should teach and exemplify an opinionated reference knowledge
theory without making it universal provider policy. Default OKF follows that
theory; another knowledge capability may adopt it, adapt it, or choose a
different knowledge model.

# Rationale and rejected alternative

The same-day amendment superseded an earlier interpretation requiring common
knowledge doctrine and runtime protocols across all integrations. That approach
would turn a preferred theory into a restriction on users choosing different
knowledge approaches. An optional reference retains useful guidance without
removing that choice.

Each capability owns its complete runtime package: instructions, skills, memory
and capture conventions, reader tools, harvesting where applicable, validation,
and delivery. Explicit reuse through supported packaging is allowed. A
compulsory shared theory-runtime dependency, or a silent runtime behavior change
when reference documentation changes, is not the intended contract.

# Consequences for future decisions

When authoring or reviewing a knowledge capability, distinguish the generic
kernel contract from the reference model's choices. Do not reject an alternative
capability merely for using different knowledge theory. Provider autonomy still
preserves layer selection, configuration, lifecycle, executable trust, work-mode
boundaries, and repository governance.

**Where the line runs (reaffirmed 2026-09-16/17, redesign lead with the
human).** Kernel contracts are: the selected provider, the instance context,
versioned opaque binding and invocation inputs, lifecycle ordering and
required outcomes, and custody obligations. Capability functionality is: the
knowledge model and schema, storage and read views, episodic conventions,
the harvester and its prompts, promotion policy, validation, retries,
delivery and acceptance semantics. **No universal kernel harvester, mandatory
state-file layout or Git publisher follows** from the kernel contracts, and
how a capability's own helpers are briefed is that capability's policy, never
reference-model policy hardcoded in the kernel (the per-capability
`helperInjection` manifest key that once expressed this is ignored since
0.26) ([kernel view](/nodes/oats-kernel-expert/decisions/kernel-and-capability-responsibility.md)).
The 2026-09-19 [flexible-knowledge decision](/nodes/oats-maintainer/decisions/flexible-knowledge-and-situated-instances.md)
extends this: capabilities own their learning model and placement, not only
their runtime.

The knowledge-theory-expert is an authoring aid: it is not a required live
dispatcher, universal harvester, or approval service. Operating a capability
should not depend on that expert being alive or on fetching mutable reference
documentation at runtime. This records accepted rationale, not implementation
completion or a particular deployment's configuration. Its framework-package
placement at the time of this record is addressed by the
[planned move to oats.authoring](/nodes/oats-maintainer/decisions/knowledge-theory-expert-moves-to-authoring.md)
recorded on 2026-11-02; that separate placement decision preserves this role
and is not a shipment claim.

# A lesson the reference theory carries forward

Memory contracts must be **symmetric** (discovered 2026-07-10 when the human
asked whether agents actually *use* their knowledge). The first knowledge
injection taught capture and harvest thoroughly and consultation in one
passing line; knowledge accumulated that nobody read, and only souls whose
own instructions said "consult first" compensated. Any knowledge capability —
default or alternative — that teaches writing without an equally explicit
index-first consult instruction is building an archive, not expertise.
Re-deriving what the base already knows is a defect.

**Cross-base corollary (2026-09-23).** "Consult first" does not stop at one's
own node. Three rounds of design about global identities for OATS instances
converged on a conclusion a sibling project had decided, written down and
shipped a month earlier — resident identities served through session grants —
and the record surfaced only when the human remembered it. Before redesigning
anything about identity, custody or lifecycle, read the other project's
recorded decisions and what its operating deployments already run; a live
capability in a neighbouring workspace is evidence of an existing decision
even when no catalog carries it. For the reference theory the consult
obligation is organisation-wide: a model that indexes only the local node
leaves cross-project decisions to be re-derived — the read-side gap one level
up. The roster consequence (seams named and read across bases) is in the
[roster decision](/nodes/oats-maintainer/decisions/domain-expert-rebuild.md); the
identity decision it produced is
[the served identity is a messaging-layer fact](/nodes/oats-maintainer/decisions/served-identity-is-a-messaging-layer-fact.md).

# Current contracts

- [knowledge-theory.md](https://github.com/awebai/oats/blob/main/docs/knowledge-theory.md)

# Citations

1. Founder acceptance and same-day amendment, 2026-09-13.
2. Migrated from agents/oats-expert/soul/knowledge @ 7838d3ca (`decisions/provider-neutral-knowledge-and-harvest` and its 2026-09-16/17 amendments; `lessons/okf-injection-read-side-gap`, 2026-07-10; `inbox/check-the-record-before-redesigning-identity`, 2026-09-23).
