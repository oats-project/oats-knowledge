---
type: Lesson
title: "An end-to-end trial pairs a kernel and a provider by the wire they speak, not by 'main after the merge'"
description: "A contract that lands in pieces leaves intermediate default branches on which the consumer's head does not run: a trial told to use 'main once the kernel change has merged' met a provider that required a wire version that kernel did not have; ask the contract's owner for the pair before building."
about: [workstream/provider-integration, workstream/coordination]
kind: lesson
id: ins-e9849b74a288
tags: [trials, contracts, wire-version, session-providers, pairing]
timestamp: 2026-11-20
---

# What happened

An end-to-end trial of agents running through a session provider had been deferred until the
kernel's session-provider change merged. When it merged, the trial was started on the default
branch at that commit, with the provider at the head of its open pull request.

They did not run together. The kernel change had landed as the first of several pieces; the
provider's head already declared the wire version of the second piece and refused a request
without it, and the merged kernel's manifest grammar rejected the provider's manifest for an
unknown key. A version floor refused the pair before that.

The probe reported the mismatch at once instead of forcing it. The contract's owner named the
pairing in one message: the second piece's branch at an exact commit. The trial then ran twice:
on the default branch with a labelled trial-only patch of the provider, and on the named commit
with no patch of the provider. Only the second is what an operator will get.

# What to do

- Before an end-to-end trial across a kernel change and a provider, ask the contract's owner
  which commit of each side speaks the same wire. "The default branch after the merge" is a pair
  only when the contract lands in one piece.
- Have the probe keep the exact refusal it meets with the pieces as named, before any workaround:
  that refusal is what an operator on an intermediate release sees.
- Label every result with its kernel commit and its workarounds, side by side, so that a pass on
  a patched pair is never read as a pass on the released one.

This is the trial's side of [a provider wire ships before its version only behind a floor](/nodes/oats-maintainer/decisions/a-provider-wire-ships-before-its-version-only-behind-a-floor.md):
that decision says why the intermediate default branch and the provider's head differ; this lesson
says what an end-to-end trial does about it.

Evidence: OKF proposal from oats-engineering-expert/bb-team-container-specialist, 2026-11-20;
notes/rerun-conclusions.md.
Maintainer review of oats-knowledge#444 (2026-11-20) read the cited records: oats-project/oats#1991 (K1) merged, the branch commit b3221da7bf76 exists, and oats-bb#3 at dd6d238ec618 declares provider wire 1.3 with an OATS floor of 0.70.0 while the kernel at both commits is 0.69.23. The manifest-key refusal, the owner's pairing message and the two runs are the source's report.

# Citations

1. oats-project/oats pull request 1991 (the first piece, merged) and branch
   `agents/kernel-session-providers-developer-k2` at `b3221da7bf76` (the second, under review when
   the trial ran); oats-project/oats-bb pull request 3 at `dd6d238ec618`.
