---
type: Decision
title: The trust writer refuses metadata it cannot preserve
description: The native trust writer retains verified atomic replacement rather than stripping or speculatively copying file metadata, with a check-specific refusal and the harness's own trust dialog as the supported alternative.
about: [system/oats-kernel]
id: dec-bfac46a44580
tags: [kernel, harness, trust, metadata, atomicity, refusal]
timestamp: 2026-10-14
---
# Decision and rationale

The kernel expert's source-reported decision of 2026-10-14 keeps
`oats harness trust` refusing configuration files with extended attributes
or ACLs that its atomic replacement cannot preserve. A writer that can
preserve the contents has not thereby proved it can preserve the file's
metadata. Keep that boundary rather than silently weaken replacement or
remove metadata to make the command succeed.

The motivating macOS report concerns `com.apple.provenance` on Claude Code's
configuration file. The source reports that native harness writes can attach
it and that hosts differed in whether it was present. That is evidence for
not assuming every host's file is equivalent, not qualification of how the
OS manages the attribute on a file written by OATS.

Rejected alternatives:

- **Copy attributes with the external `xattr` tool.** The attribute is
  OS-managed; whether userspace can write it or whether the OS reattaches it
  had not been qualified. Calling another tool does not supply that proof.
- **Rewrite the existing file in place.** Retaining metadata that way gives
  up the verified atomic replacement. It trades away one guarantee to avoid
  establishing the other.
- **Allowlist and drop this one attribute.** Selective stripping is still
  stripping, not metadata preservation; the source identifies the existing
  trust-writer contract as forbidding it.

Revisit the decision with macOS evidence of what happens to provenance on a
file written by the terminal-launched Node process, not merely evidence
that a different writer or host succeeds.

# A writer refusal is not a failed trust read

Name the check that refused in a closed set of fixed sentences, without
echoing file contents or attribute values. The useful remedy is to accept
the harness's own folder-trust dialog under the configuration directory the
launch will use, then confirm the `harness-trust` readiness result. The
source distinguishes that launch-time parser from the stricter writer:
native acceptance need not relax the writer's preservation checks.

This applies the existing [launch-environment decision](/nodes/oats-maintainer/decisions/checks-use-the-launch-environment.md),
not a second environment-selection policy. It also preserves
[native harness configuration](harness-native-launch.md); it does not
authorize stripping attributes or bypassing trust.

# Related contrasting decision

[Retire's lineage repair falls back on any atomic-write failure](/nodes/oats-kernel-expert/decisions/retire-lineage-repair-falls-back-on-any-atomic-write-failure.md)
chooses compatibility with an existing bookkeeping write inside retirement.
That context-specific fallback does not relax this trust writer's metadata
refusal or its verified atomic replacement; the supported native trust
alternative remains the distinction.

# Enforcement and evidence

The enforcement route is the writer's metadata refusal and verified
replacement, with regression coverage for unchanged bytes and metadata on
refusal, bounded diagnostics, and readiness after native acceptance. The
platform-specific preservation alternative needs real macOS qualification;
this record does not claim that coverage or an alternative writer has shipped.
The operational contract remains in the repository's
[harness-trust documentation](https://github.com/awebai/oats/blob/main/docs/harness-trust.md).

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-partner-kernel-bugs, 2026-10-14; notes/harness-trust-writer-keeps-refusing-xattrs.md.

The proposal and note attribute the incident and decision to
[awebai/oats#1109](https://github.com/awebai/oats/issues/1109). The proposal
additionally reports both maintainer sides' approval of
[#1138](https://github.com/awebai/oats/pull/1138) at `7b9b7d09`.
These are source-reported observations and review claims: this harvest did
not inspect those reviews, reproduce the macOS behavior or independently
establish human acceptance. No merge or release is asserted.

Verified by the knowledge maintainer at review of the harvest on 2026-10-14.
The description of [#1138](https://github.com/awebai/oats/pull/1138)
attributes the decision to the kernel expert and states the three rejected
alternatives and their reasons, the harness's own trust dialog with the
`harness-trust` readiness item as the way forward, and refusals named from a
closed set of fixed wording that never echoes file content. Both maintainer
sides posted APPROVE on the PR at `7b9b7d09` and carried it to a later head
after a conflict resolution; the lane approval relies on the separate
launch-time reader parsing the file only. A comment on #1109 adds that the
CI macOS runner does not set the attribute, so CI does not see the refusal.
These are maintainer-lane records, not evidence of human acceptance; #1109
and #1138 were open at this review and no release was checked.
