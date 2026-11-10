---
type: Decision
title: A souls pattern key is judged against discovered souls and reuses team-soul-unknown
description: A souls <prefix>/* key that matches no discovered soul gets the exact key's team-soul-unknown warning with the same severity and fields and only its own message and fix, the prefix compared with its slash; a new warning code and matching the prefix against declared package ids and member names were rejected.
about: [system/oats-kernel]
id: dec-5249df21e477
tags: [kernel, teams, configuration, readiness, diagnostics, error-codes, rejected-alternatives]
timestamp: 2026-11-09
---
# Decision and rationale

Kernel decision of 2026-11-09, taken for item 4 of the package-identity
defect report
[oats-project/oats#1759](https://github.com/oats-project/oats/issues/1759) [1].
The `souls:` typo guard warned `team-soul-unknown` for an exact key that
named no soul the workspace offers, but skipped every `<prefix>/*` key, so a
pattern whose prefix was a typo, or a member or package that had been renamed
or dropped, was ignored without a word.

**A pattern key is judged the way an exact key is, against the discovered
souls.** A `<prefix>/*` key whose prefix starts no discovered soul key warns
`team-soul-unknown`: the same code, severity and fields (`key`, `at`) as the
exact form, shown where the exact form shows (`oats teams` and readiness).
Only the message and the fix differ, naming a pattern that matches no soul
and asking that the prefix be corrected or the key removed; the exact key's
text is unchanged. The prefix is compared **with its trailing `/`**, so
`oats.eng/*` does not pass on an `oats.engineering/x` soul. `"*"` never
warns, and a pattern that matches a soul stays silent [1, 2].

The decision is worth more than its code because the next typo guard over a
key that selects by prefix faces the same two choices.

**What to judge against: what the key can select.** A pattern selects souls,
so it is judged against the discovered souls, exactly as the exact form is.
Matching the prefix against the declared package ids and member names instead
was rejected: it would judge patterns by a different rule from exact keys,
and a declared package that ships no souls would pass a key that can never
apply [2].

**Which code: the exact form's.** A pattern that matches nothing is the same
typo the guard already reports for exact keys, so it takes the same code. A
new warning code was rejected because a new code is a new contract that needs
a lane decision, and no consumer must tell the pattern case apart from the
exact-key case; reusing an existing code with its own message is not a new
contract [2]. This is the same rule the sibling decision from the same report
applied to a refusal:
[extend a family when the new case has the family's meaning and no consumer needs a separate code](declaration-checks-run-at-sync-under-the-integrity-family.md).

# Generality

Any typo guard over a key that selects by prefix: judge it against what the
key can actually select, the same way the exact form is judged, and under the
exact form's code.

# Limits

- The change ([oats-project/oats#1764](https://github.com/oats-project/oats/pull/1764))
  merged on 2026-11-09 at `ce8f698d560d8451e6d9d313a3f2d741a5adfefe` with
  all ten main checks green [3]. Its evidence is the repository's unit and
  CLI tests in CI; the source reports no deployment run, and this harvest
  did not audit the code or rerun the tests.
- The guard keeps the limits it had for exact keys:
  [the disabled-soul decision](stale-disabled-soul-entry-is-diagnosed-not-refused.md)
  records that it has no per-entry proof boundary and offers no nearest
  soul, which is why it was not reused for a machine-local list. This
  decision widens what the guard judges, not how it proves.
- No human-accepted decision is superseded; the exact-key warning's contract
  is extended to patterns, not changed.

# Related

[A souls.disabled entry that names no soul is diagnosed by doctor, never refused](stale-disabled-soul-entry-is-diagnosed-not-refused.md)
rejected this same guard for a host-local list and records its proof limits.
[A declaration-versus-content check runs at sync and reuses the integrity family](declaration-checks-run-at-sync-under-the-integrity-family.md)
is item 1 of the same report and owns the reuse-a-family-over-a-new-code
rule for refusals.
[Proven unmatched launch pins refuse fall-through; unchecked pins stay visible](unmatched-launch-pins-refuse-fallthrough.md)
is the other check of soul-name keys against discovered souls.
The repository's
[workspaces documentation](https://github.com/oats-project/oats/blob/main/docs/workspaces.md)
owns the current warning text and the readiness row; the documentation wins
where they differ.

# Citations

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-package-id-truth,
2026-11-10; notes/souls-pattern-typo-guard-judges-discovered-souls.md.

1. [oats-project/oats#1759](https://github.com/oats-project/oats/issues/1759)
   item 4, read by the harvester on 2026-11-10: the `/*` keys were skipped by
   the typo guard, and the warning asked for was the exact keys'
   `team-soul-unknown`.
2. [oats-project/oats#1764](https://github.com/oats-project/oats/pull/1764),
   read by the harvester on 2026-11-10: its description states the reuse of
   `team-soul-unknown` with the same severity, `key` and `at`, the
   pattern-specific message and fix, the slash comparison, the silence of
   `"*"` and matching patterns, and the places the warning shows. The two
   rejected alternatives and their reasons are the source's record; the PR
   does not restate them.
3. The merge at `ce8f698d560d8451e6d9d313a3f2d741a5adfefe` on 2026-11-09 and
   its ten successful checks were read by the harvester on 2026-11-10. The
   documentation on `main` at that reading states the pattern rule in
   `docs/workspaces.md`.
