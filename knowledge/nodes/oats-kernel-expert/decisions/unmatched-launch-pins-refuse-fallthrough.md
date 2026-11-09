---
type: Decision
title: Proven unmatched launch pins refuse fall-through; unchecked pins stay visible
description: An unmatched host launch pin blocks launches that would fall through, but incomplete discovery cannot prove a mismatch and must remain visibly unchecked.
tags: [kernel, launch, configuration, discovery, diagnostics]
timestamp: 2026-10-13
---
# Decision and rationale

The source reports this decision accepted in the 2026-10-12 launch-pin
review, with the missing-discovery-record rule settled on 2026-10-13 [1, 2].
A host's `souls.launch` pin expresses where a soul should run. If the kernel
can establish that a key names no offered soul, it must not silently fall
through to a different launch choice.

**Refuse the fall-through launches, not an inferred intended soul.** A
proven unmatched key blocks every new launch for which neither a soul-specific
entry nor an explicitly named command-line launch decides the choice. This
includes fall-through to the machine wildcard, the soul's own launch
preference or the host default. A soul with its own entry, or a launch
explicitly named on the command line, is not blocked by this check. The
kernel cannot identify which soul the unmatched key was intended to pin,
so it cannot prove that an otherwise unpinned launch is unrelated [1].

**A warning was rejected.** By the time an operator reads it, the soul may
already be running on the account the pin was intended to avoid. Visibility
after launch is not enforcement of launch intent [1].

**Two other scopes were rejected in the same decision [3].** Refusing only
a launch whose soul shares the unmatched key's bare name is a guess about
the typo: a misspelled bare name would still fall through. Refusing to load
the host file at all is too wide: a soul that moved to another package
after a sync would stop every command of the deployment, not only the
launches at risk.

# Prove mismatch per key, not per discovery run

A key absent from the offered-soul list is not necessarily unmatched: the
source that could contain its soul might not have been read. Only a proven
mismatch justifies this refusal. Otherwise the key is **unchecked**: it
blocks nothing under this check, but doctor reports the uncertainty as
information rather than silently implying that the pin was validated [1].

The proof boundary follows the key's possible source:

- **Bare key:** an unconfirmed member or a skipped member/external soul
  leaves the key unchecked, because any of those sources could contain it.
- **Package-qualified key:** a declared but unlocked package, or a skipped
  soul in that package, leaves that package's key unchecked. An unrelated
  unreadable member does not invalidate this key's proof.
- **Standalone view of an unreadable workspace host:** every key remains
  unchecked; that view cannot establish the workspace's offered set.

A whole-discovery cleanliness gate was rejected. Discovery deliberately
skips unreadable sources and continues. Requiring the entire read to be
clean would let one unreadable member disable even the independent check
of a package-qualified key—the failure case that motivated the decision.
The accepted cost is narrower but real: one unconfirmed member prevents a
misspelled bare key from being refused. Reporting unchecked status makes
that limit visible; it does not remove it [1].

# Missing completeness evidence is not a clean read

A discovery carrying no record of skipped souls leaves **every key
unchecked**. A member listing without its skipped-soul record counts as
having skipped a soul, leaving bare keys unchecked [2].

Absence of a newly introduced completeness field cannot mean that nothing
was missed: producers predating the field omit it too. Treating omission as
an empty skipped set invents positive evidence about the workspace and can
turn an unestablished mismatch into a refusal. The rejected fail-closed
alternative would therefore violate the very condition that authorizes
this check: refusal requires a demonstrated mismatch [2].

The older-producer case is the reasoning, not an observed path. The
implementing change states that the parsed discovery cache is kept per
kernel build, so another build's entries are never read [3]. The rule was
approved with that stated: it is an evidence rule, not a workaround for a
known stale producer.

This is an evidence rule, not a universal instruction to allow operations
on unknown inputs. In particular, it does not relax the separate
[recorded-process identity refusal](/nodes/oats-kernel-expert/lessons/process-identity-across-readers-and-hosts.md).
That operation requires proof before destructive recovery; this check
requires proof before classifying a launch pin as unmatched.

# Remedy and contract boundary

**Pin the intended soul first, then remove the unmatched key.** Removing
first ends the refusal while leaving the intended soul exposed to the same
fall-through the pin was meant to prevent [1]. This ordering is part of the
remedy's safety, not cosmetic diagnostic wording.

Adding tags to public discovery `problems` rows merely to carry this internal
distinction was also rejected: an internal evidence need does not justify
an incidental change to a public JSON contract [1]. The durable knowledge
is the proof obligation and the rejected alternatives, not a map of the
writer and reader functions. Enforcement belongs in the shared decision
and regression coverage for incomplete reads, absent records, unaffected
explicit choices and remedy ordering; a stored decision is not a substitute
for those checks.

# Current contract

The repository's [launch preferences documentation](https://github.com/awebai/oats/blob/main/docs/configuration.md#launch-preferences)
owns the current refused and unaffected launches, the unchecked cases and
the remedy commands. The cases above show where the proof boundary falls;
the documentation wins where they differ.

# Related

[The host supplies host-only facts](/nodes/oats-kernel-expert/decisions/soul-declares-kind-config-assigns-policy.md)
owns configuration placement, not this unmatched-pin policy.
[The CLI as a machine boundary](/nodes/oats-kernel-expert/lessons/machine-boundary-contract.md)
owns typed refusals and tested remedies.
[A refusal that needs the old bytes is a pre-commit gate](/nodes/oats-kernel-expert/lessons/refusal-belongs-before-commit.md)
owns refusal timing rather than the evidence that authorizes this one.
[A souls.disabled entry that names no soul is diagnosed by doctor, never refused](/nodes/oats-kernel-expert/decisions/stale-disabled-soul-entry-is-diagnosed-not-refused.md)
applies this proof boundary to the host's disabled-soul list without copying
the refusal, and records why that list is allowed to fail open.

# Citations

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-launch-pins, 2026-10-13; notes/unmatched-versus-unchecked.md; notes/unrecorded-read-is-unchecked.md.

1. The proposal attributes the refusal, scope and remedy decision to the maintainer on [awebai/oats#989, comment 6132760026](https://github.com/awebai/oats/issues/989#issuecomment-6132760026), dated 2026-10-12. The first named note supplies the per-key rationale and rejected public-row tagging, and reports acceptance of the contract in [comment 6133085132](https://github.com/awebai/oats/issues/989#issuecomment-6133085132). Warning rejection and remedy ordering are supplied by the proposal.
2. The second named note records the lead's missing-record decision after the [awebai/oats#1013 review, comment 6134144159](https://github.com/awebai/oats/pull/1013#issuecomment-6134144159). The proposal reports both maintainers' approval on 2026-10-13 in [awebai/oats#1020, comment 6135330102](https://github.com/awebai/oats/pull/1020#issuecomment-6135330102) and [comment 6135386118](https://github.com/awebai/oats/pull/1020#issuecomment-6135386118). These are source-reported acceptance references, not independently audited human acceptance, implementation or release evidence. No existing decision is superseded.
3. Verified by the knowledge maintainer at review of the harvest on 2026-10-13. On [awebai/oats#989](https://github.com/awebai/oats/issues/989), comment 6132760026 of 2026-10-12 states the refusal, its fall-through scope, the unaffected own-entry and command-line launches, the rejected warning, and two further rejected scopes: the same bare name only, and refusing to load the file. The kernel lead's specification on that issue the same day (comment 6132905319) gives the unmatched and unchecked cases by key source and the pin-then-remove order with its reason, and proposes the unchecked information line because a deployment with one unreadable member would otherwise hear nothing about a misspelled bare key. Comment 6133085132 accepts those cases as written, the order, and the line as information that refuses nothing. The issue reports a package-qualified key under the wrong package falling through to the wildcard. Comment 6134144159 on [awebai/oats#1013](https://github.com/awebai/oats/pull/1013) leaves open what a discovery without its skipped-soul record is taken for. [awebai/oats#1020](https://github.com/awebai/oats/pull/1020), merged on 2026-10-13 with both maintainer sides approving the head that merged, answers it as recorded here, rejects refusing on such a read, and states the per-build cache. The repository's `docs/configuration.md` documents the refusal, the remedy order and the unchecked cases. The rejected whole-discovery gate and the rejected tagging of public `problems` rows appear in none of these; they rest on the source's note, which this review did not read. The comments are maintainer-lane records posted from the two maintainers' accounts, not evidence of human acceptance, and no release was checked.
