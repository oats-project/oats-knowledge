---
type: Playbook
title: "A kernel cutover is sequenced per deployment: retire under the kernel that made the homes, rebuild on fresh provider state, and hold the previous kernel until the last deployment has moved"
description: When a new kernel generation shares no files with the previous one nothing forces the move, so the operator orders it deployment by deployment. Each deployment's instances retire under the kernel that spawned them, the rebuild starts on a fresh provider state directory while the old one is frozen as custody, and the previous kernel stays installed until the last deployment you care about is rebuilt.
about: [workstream/operations]
id: pb-daaf7d97c667
tags: [playbook, operator, cutover, rebuild, migration, kernel-generation, provider-state, custody, sequencing]
timestamp: 2026-09-23
---

Judgement formed 2026-09-23/24 by the OSS coordinator while operating a real
two-team cutover and rebuild; restated for the 0.26+ line, where the classic
path is removed rather than flagged.

# Rule

When a kernel generation is a clean break — it reads only its own schema,
refuses the old files by name and shares no state with its predecessor — the
cutover is **sequenced per deployment**:

1. **Keep the previous kernel installed** until the last deployment you still
   care about has been rebuilt. Do not upgrade a machine wholesale because
   "the new version is out".
2. **Retire each deployment's instances under the kernel that spawned them,
   before anything moves.** The new kernel refuses to start or restart a home
   an earlier kernel made, and retires it without running its retire hooks, so
   every self-custodial identity in it is stranded (see
   [self-custodial identities retire from inside the home](/nodes/oats-operator-expert/lessons/self-custodial-identity-retires-from-inside-the-home.md)).
3. **Settle the shared declarations first** — members, packages, defaults —
   then the host facts, then per-instance facts
   ([place each fact at the scope that owns it](/nodes/oats-operator-expert/lessons/place-each-fact-at-the-scope-that-owns-it.md)).
4. **Give the rebuild fresh provider state.** New knowledge state directory
   and, if the old bindings file names the old state, a new bindings file.
   Check in the spawn preview that the merged provider settings point at the
   new paths before the first spawn creates anything.
5. **Freeze the previous state directory as custody.** Read it for history;
   never edit it and never re-point it at the rebuilt deployment. It is
   authority to preserve, not garbage to clean — the posture of
   [preserve authority until cleanup is proven](/nodes/oats-kernel-expert/decisions/preserve-authority-until-cleanup-is-proven.md).
6. **Accept a rebuild on commit → sync → re-spawn,** not on one clean spawn:
   a second spawn of a knowledge-owning soul after a member commit must keep
   the same owner and the same state.

# Why

**Nothing pushes the operator forward.** The old kernel keeps running its own
deployments indefinitely and the new one fails closed on their files, so a
half-moved estate can persist for months. The order is the operator's
decision, and "per deployment" is the only unit at which it is complete: a
deployment is rebuilt or it is not, whereas a machine hosts several
deployments at different stages.

**The kernel that made a home is the only one that retires it fully.** A
retire hook de-registers an identity from inside the home; a kernel that does
not recognise the home cannot run that hook. Retiring after the upgrade is
retiring without the credential's cooperation. (In the 0.25 line the risk ran
the other way: a newer launcher would start an old home with new launch
semantics. Since 0.26 old homes are refused at start, which turns the per-home
decision into a retire-first rule.)

**Fresh state loses nothing that matters.** Accepted knowledge lives in the
knowledge bases and is consulted remotely at its accepted state; the provider
state directory holds per-source capture evidence, custody of captured notes
and registration bookkeeping for *one* deployment. Re-pointing it at a rebuilt
deployment produces a directory that half-describes two deployments and
destroys the only record of what the old one captured and scheduled.

**Identity must survive a move of the soul's files.** Under the workspace
model a soul is fetched per commit into a cache directory inside the
deployment, so its path changes with every member commit and never equals the
old deployment's path. Anything keyed to that path is correct for one
deployment at one commit. oats.okf now names a soul's ownership by the stable
owner id its `okf.json` declares; the acceptance run still exercises a member
commit, because a one-spawn test cannot tell an identity key from a path key.

# What goes wrong

- **Wholesale upgrade.** The operator replaces the kernel on a host; every
  classic home on it can no longer start, and retiring them now strands their
  identities, which must be revoked by hand with the provider's tooling.
- **Rebuilding by machine.** One deployment ends up half on each generation
  across two hosts, and nobody can say which kernel produced which instance.
- **Reusing the old state directory,** or "fixing" a refusal by editing it:
  custody becomes an unreviewable mutation and the real defect is hidden.
- **Accepting on a mixed pair.** A new kernel with an old provider (or the
  reverse) proves nothing about what deployments will install; accept only the
  published combination (see
  [second-operator acceptance](/nodes/oats-maintainer/lessons/second-operator-acceptance.md)).

# Consequences

- The cutover plan is a list of deployments with, for each, its hosts, the
  instances to retire under the old kernel, the new state paths, and the old
  state directories named as frozen custody.
- "Both kernels installed" is a normal intermediate state; the smell is having
  no written order of which deployment moves next.
- Retiring an instance from a rebuilt deployment should leave no provider
  schedule behind; dead rows accumulating are a sign retirement is not
  settling, not a cleanup chore.
- Messaging-root placement is a pre-spawn step of the rebuild, after the fresh
  state is laid down
  ([messaging root placement decides the team](/nodes/oats-operator-expert/lessons/messaging-root-placement-decides-the-team.md)).

# Routed

- State-file keys, capture custody and inspection commands → the knowledge
  package expert. The per-commit soul cache and soul identity → the kernel
  node. The onboarding procedure → the `oats.setup` skills
  ([oats-onboarding](https://github.com/awebai/oats/tree/main/oats-package/capabilities/oats-setup/skills/oats-onboarding)).

# Citations

- [Release notes 0.26.0](https://github.com/awebai/oats/blob/main/docs/release-notes/v0.26.0.md),
  "Removed" (homes from an earlier kernel refused at start; retire runs no
  hook) and "Upgrading from 0.25" (retire classic instances first).
- [knowledge.md](https://github.com/awebai/oats/blob/main/docs/knowledge.md)
  (bindings file and `stateDir`, remote consultation, `okf.json` owner).
- Original rationale: [`docs/rebuild-to-v2.md` at v0.25.9](https://github.com/awebai/oats/blob/v0.25.9/docs/rebuild-to-v2.md)
  §0, §7b, §8 (removed by the 0.26.0 legacy sweep).
