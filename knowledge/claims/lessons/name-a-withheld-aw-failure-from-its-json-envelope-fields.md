---
type: Lesson
title: Name a withheld aw failure from its --json envelope's code, http_status and reason, with per-call allow-lists from aw's maintainers
description: When a provider withholds a credential-handling aw call's output, its failure class comes from aw's --json envelope fields code (allow-list), http_status and reason (allow-list, else the status alone), never message or detail; a status wins over every text class; and the allow-lists for one call path are traced by aw's maintainers, not derived from server source alone.
about: [workstream/provider-integration, system/oats-aweb]
kind: lesson
id: ins-bc918c3e11d8
tags: [lesson, secrets, error-classification, aw, native-cli]
timestamp: 2026-11-25
---

# What was observed

The spawn mint (`aw init --join-from … --json`) withheld its output and said only "aw init failed (exit 1)" (awebai/oats-aweb#280). aw's `--json` refusal is `{"error":{code, message, http_status, detail, reason, classification}}`. A server refusal has `code: "http_error"`, and the server's own refusal code is in `reason`, so a list of codes alone can only say `http_error`. The older text classifier (`http NNN` and a redacted `detail`, awebai/oats-aweb#149 and #202) relays free server text: for one of the mint's refusals, `detail` names the alias another member holds.

# Rule

- Read three envelope fields only. Name `code` when the call's allow-list holds it: aw's codes are its published contract, so naming one relays nothing. Name `http_status`. Name `reason` only when the call's allow-list holds it: server reasons are an open vocabulary, so any other shows as the status alone. Never read `message` or `detail`.
- **A status wins over every text class.** Match the text classes (a missing local key in aw's own words, a network or TLS failure) only when there is no status. Otherwise words inside a refusal's free text give the operator a wrong cause, as round 1 of #280's review showed.
- **The allow-lists are per call path, and aw's maintainers trace them.** Reasons that merely exist in the server's source are not the list: the mint's list leaves out on purpose a reason that tells another holder's custody mode, and any reason this call does not reach or aw flattens. Ask through the aw maintainers' side.
- **The list is a display filter, not a settle decision.** A plain `error` or `http_error` can follow an applied write, so whether to keep a mint's intent is decided separately (awebai/oats-aweb#337).
- Make the stricter mode opt-in per call (`failureDetail: "fixed"`), so other callers' recorded decisions stay as they are.

This refines [classify a withheld CLI failure before the scrub](classify-a-withheld-failure-before-the-scrub.md): the same rule (classify the raw output, and only a fixed answer leaves), applied to aw's structured envelope instead of its prose.

Evidence: awebai/oats-aweb#280, awebai/oats-aweb PR #338 at ebc61aa (two rounds of the author's review loop; round 2 approved). aw v1.36.59 source: `cmd/aw/errors.go` errorEnvelope, `awid/error_detail.go` DescribeError.

Verified by the knowledge maintainer at review on 2026-11-25. At aw-v1.36.59 in awebai/aweb, `cli/go/cmd/aw/errors.go` defines the envelope's `code`, `message`, `http_status`, `detail`, `reason` and `classification`, and `cli/go/awid/error_detail.go` `DescribeError` gives a server refusal `code: "http_error"` with the server's code as `reason`; the server's `alias_active` and `alias_mismatch` refusal texts name an alias held by another agent or key. The maintainers' envelope facts and the ask for a reason allow-list are on awebai/oats-aweb#280. At ebc61aa, commit "Review round 1" makes a status decide the class before any text class; `lib/aw-failure-cause.mjs` holds `AW_MINT_ERROR_CODES` and `AW_MINT_REFUSAL_REASONS`, the latter's comment saying the lists are aweb's maintainers' trace of the mint and that a custody-mode reason is left out on purpose; the mint passes `failureDetail: "fixed"` while the other callers keep their own class. #337 records that `alias_conflict` can follow an applied issuance. PR #338 was open, not merged, at review.
