---
type: Lesson
title: A provider predicts a CLI's behaviour only where it can be exact, and otherwise passes the recorded input and lets the CLI decide
description: Re-implementing how a CLI resolves a value (its discovery, a path rule) diverges from it on every input the copy didn't foresee. Pass only what is recorded, and word the unknown case truthfully. Where a provider does predict a refusal, it uses the comparison of the exact code path it predicts, which may differ inside one CLI.
about: [workstream/provider-integration]
kind: lesson
id: ins-fdbcfe29a456
tags: [lesson, integrations, external-cli, readiness, resolution, review-loop]
timestamp: 2026-11-13
---

# Two failures, one cause

**A copied resolver.** A retire needed the registry the messaging CLI would use for a team, to
read the team's members and to print the controller's cleanup command. The first fix copied the
CLI's discovery (an HTTP GET of the service's discovery document). Each of four fresh review
rounds then found another difference from the CLI:
- a JSON null decodes to "" in the CLI's language;
- the CLI trims exactly one trailing slash;
- its JSON decoder matches keys case-insensitively, and the last duplicate wins;
- a bad value in another field fails the whole decode, so the CLI falls back to its default.

Each difference let retire conclude "nothing was registered" from the wrong registry.

**The decision:** pass the CLI only what is recorded (the registry URL when it is recorded and
plain, else no `--registry` flag), and let the CLI's own read discover the rest. Where a value
can't be known without the CLI, say so instead of guessing. The printed command omits the flag,
and the warning names where the CLI would discover it.

**One CLI, two equalities.** That CLI's canonical team id (lowercase, trim, strip one trailing
dot from the domain) is not the rule its connect step uses to find a team membership: trim, then
case-insensitive equality, with no dot stripping. A readiness check built on the canonical
helper would call `t:x.` the same team as `t:x`, which connect refuses, and so say "ready" for
a spawn that fails after its effects. The check got its own function, documented as that code
path's rule. Where Go's Unicode case folding and JavaScript's differ (non-ASCII ids), it makes
no decision rather than refuse what the CLI accepts. The same CLI's certificate file name was
yet another rule: the canonical id, with `__` doubled before `:` becomes `__`. A lookup that
skipped the doubling missed the file for any team name containing `__`.

# How to apply

- Before a provider computes something the CLI also computes, ask whether it can pass the input
  and let the CLI compute it. Prefer that.
- Where the provider must predict (readiness predicting a refusal, a lookup of the CLI's own
  file), cite the exact code path at the tested version, and copy only that path's rule as one
  named function. "The same team" or "the same URL" is not one rule inside a CLI.
- Where the provider can't be exact, make no decision and say what the CLI will decide, never
  "nothing was registered" or "ready".

Relates to [a fake CLI that accepts what the real binary refuses hides a broken hook](/nodes/integrations-expert/lessons/a-fake-cli-that-accepts-what-the-real-binary-refuses-hides-a-broken-hook.md)
(model the real binary, not a reading of it) and
[readiness reads the setting source its consumer uses](/nodes/integrations-expert/lessons/readiness-reads-what-the-consumer-reads.md)
(a prediction uses its consumer's input). This lesson adds the consumer's comparison and
resolution rule to its input. Same shape as
[a provider reads another tool's file by a closed grammar](/nodes/integrations-expert/lessons/read-another-tools-file-by-a-closed-grammar-of-its-writer.md).

# Evidence and limits

Evidence: OKF proposal from integrations-expert/aweb-container-followups-lead, 2026-11-13;
notes/let-the-cli-resolve-what-it-resolves.md, notes/aw-has-two-team-id-equalities.md. Observed
in awebai/oats-aweb#248 (closes #240, review rounds 4 to 7, then the redesign), #258 (closes
#256) and #265 (closes #262). The CLI rules were traced from its source at the version the
package tests against, not from a live run. It is one CLI.

Maintainer review of oats-knowledge#377: the commits of awebai/oats-aweb#248 record the copied
discovery's fixes for a null value and for the CLI's single trailing-slash trim, then its
replacement by "a recorded registry or none, with no copy of aw's discovery", and the PR body
says the copy "kept diverging from aw's" until round 8 approved. The case-insensitive and
duplicate keys and the whole-decode fallback are source-reported, not in the PR record. #258's
body and both sides' approvals record the membership match (trim, ASCII case-insensitive, no
decision for non-ASCII) kept apart from the canonical id, which drops a trailing dot. #265
records the certificate file name's two encoding steps in aw's order.
