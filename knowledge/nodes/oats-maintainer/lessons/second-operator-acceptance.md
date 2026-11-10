---
type: Lesson
title: Second-operator acceptance — what the gate is for, how to read its failures, and the contract-siblings rule
description: A published definition or operator guide is accepted only when an operator holding none of the authoring state reproduces it against the published combination and verifies by positive enumeration; its exit criterion is "every remaining item is named and owned", its failures fall into four owner-distinct classes, and its recurring finding — a contract adopted by one provider but not its siblings — is prevented by a same-release adoption rule.
about: [workstream/oats-direction]
kind: lesson
id: ins-47231c883f3c
tags: [acceptance, second-operator, outsider, verification, diagnostics, contracts]
timestamp: 2026-09-21
---
Learned 2026-09-20/21 by the redesign lead from an independent operator on a
fresh machine, and sharpened 2026-09-23/24 by four outsider runs of a
deployment rebuild on a scratch rig. Owner of the standing criteria:
oats-expert; the operator's method for running it on a rebuild belongs to the
[operator node](/nodes/oats-operator-expert/index.md).

# What the gate is for

Proving that a published definition works for somebody who has never seen it
is worth far more from a machine that holds **none of the authoring state**.
**Authors pass their own guides**: an author's rig carries what the guide
omits — a clone already in place, a lock already written, a provider at the
intended rather than the shipped version. And **no tooling checks a guide's
behavioural claims**: validators check examples against schemas, nothing
checks that a sentence about what the kernel or a provider *does* has a
consumer in code. The first outsider rebuild found a documented lookup order
the kernel did not honour and payload keys no shipped provider read. So the
guide is a contract, and the outsider is the only check that exists for its
claims.

A pass counts as **acceptance** only when three conditions hold at once:

1. **The verifier is not the author**, works from the published text alone,
   and does not acquire authoring state during the run.
2. **The combination is the published one** — kernel from the registry,
   packages from the catalog at their pinned commits, a lock written the way a
   real deployment writes it. A pass on working trees, or on a fix published
   in one half (kernel or provider) while the other half is still
   git-pinned, is a **rehearsal**: valuable, but labelled so, and it
   unblocks nothing that depends on the published combination.
3. **Verification is positive enumeration**, in order, before the first real
   spawn. Migration failures are silent omissions, not refusals: a soul left
   at an old path is invisible, a payload key can arrive and be ignored, a
   check that enumerates an old path keeps passing on an empty match. List
   what *should* exist — souls with their origin, capabilities with their
   origin, the merged payload each provider receives, a stable knowledge
   owner across a respawn, nothing left behind after retire — and confirm
   each item. "Nothing refused, so it worked" proves nothing.

Judgement for the run itself (the mechanical steps belong in an acceptance
skill): install the exact published version **locally in a throwaway
directory**, never by upgrading the machine's working install; check for
ambient configuration the tool could inherit; preserve the directory so every
later run repeats the same tree; record what was **not** touched as
explicitly as what was. The exit criterion is not "it works" but **"every
remaining item is named and belongs to an owner"** — and none of them is
disguised operator input. Record the combination that passed in the citation,
never in the rule.

# Four failure classes, four owners

Layered configuration makes very different failures look identical, and all of
them render as "needs configuration". Classify before reporting:

1. **Operator input** — an account, a team, a responsible human. Never guessed
   and never substituted; a deliberately **synthetic** value may be supplied to
   probe past it, labelled as synthetic in the result.
2. **Source defect** — the definition carries no declaration block for a
   provider it requires. **The tell is the phase**: providers normalise a
   declaration before they check readiness; a failure in normalise means the
   declaration was absent, a failure in check means the world is not ready.
   Count the published definitions carrying the block: zero across all of them
   is not a configuration problem. Report "no operator input can resolve
   this" with the exact predicate.
3. **Packaging defect** — a contract adopted by one provider and not its
   siblings (below).
4. **Kernel defect** — a refusal after selection that cannot say *where*
   (slot, capability) is a kernel defect by definition, whatever its wording
   ([the machine boundary contract](/nodes/oats-kernel-expert/lessons/machine-boundary-contract.md)).

# Methods that turn complaints into findings

- **Diff the output for a plausible input against a deliberately invalid
  one.** Byte-identical output for a correct and a garbage input is a fact
  about the interface, not an opinion. But an identical pair **can be correct
  output** when both inputs are refused for the same missing setting: trace
  the provider phase before demanding that outputs differ; the fix is
  specificity and attribution, never manufactured inequality.
- **Compare the host's own determinations with each plugin's.** If the host's
  failures read specifically while unrelated plugins fail with one templated
  sentence, the host is *discarding* messages at the boundary — a different
  fix from writing better text. A discarded diagnostic also hides the
  failure's class.
- **Ablate one key and watch which *other* component's verdict changes.** A
  component whose result depends on a key it does not own is reading foreign
  input; it appears only when both providers run together, and can be a true
  deadlock. Report it as a namespace defect with both fixes named
  ([kernel decision](/nodes/oats-kernel-expert/decisions/soul-declares-kind-config-assigns-policy.md)).
- **Do not strip a declared requirement to isolate a phase** on an acceptance
  route: the result no longer tests the route anyone takes.
- **When repinning after a provider release, check the soul that exercises
  that provider**; the one that never does is the wrong sample.

# The contract-siblings rule

Finding of 2026-09-21: a manifest contract the kernel refuses on absence had
been adopted by the provider that motivated it and by none of its siblings, so
no published soul could resolve — and the gap sat behind an operator-owned
requirement, invisible until the operator probed past it with a synthetic
value. It was the fourth finding of that family in one adoption wave; the
2026-09-24 rebuild found its cousin, a kernel faithfully delivering a payload
that a provider did not yet read.

- **Any new manifest contract a kernel refuses on absence is adopted by the
  framework's own capabilities in the same release that introduces the
  refusal, and a packaging test enforces it.**
- **Before publishing any cross-provider contract change, check every
  injecting or binding capability**, not only the one that motivated it. The
  kernel adds no shim for a provider that does not yet honour a contract; the
  provider grows its own contract and the docs say what each version honours.
- The code route is a release-time check; this lesson stays because the
  *sweep* is judgement the test cannot perform for contracts not yet written.

# Related

[Adoption evidence and approved scope](/nodes/oats-maintainer/lessons/adoption-evidence-and-approved-scope.md);
[fresh-install-first rollout](/nodes/oats-maintainer/decisions/fresh-install-first-rollout.md);
[the installed provider is the authority for a setting](/nodes/oats-operator-expert/lessons/the-installed-provider-is-the-authority-for-a-setting.md).

# Citations

1. Migrated from agents/oats-expert/soul/knowledge @ 7838d3ca (`lessons/diagnostic-diff-invalid-input`, `plugin-diagnostic-wrapper-discarded-message`, `shared-provider-input-namespace-misattribution`, `source-declaration-requirement-without-payload`, `playbooks/local-cli-fresh-operator-acceptance`, 2026-09-20; `decisions/helper-injection-policy-on-every-injecting-capability`, 2026-09-21).
2. Outsider rebuild method, merged from the operator node's former playbook "Outsider verification of a rebuild" (2026-09-24): four runs, ten disagreements found before the first PASS on kernel 0.25.5 with catalog oats.okf v2.1.4 and oats.aweb v1.12.0.
