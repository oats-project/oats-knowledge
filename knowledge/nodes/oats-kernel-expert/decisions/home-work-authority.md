---
type: Decision
title: Separate operational home from granted work authority
description: Keeping lifecycle identity outside disposable work prevents work topology from silently becoming operational or knowledge authority.
about: [system/oats-kernel]
id: dec-c7393e557167
tags: [kernel, instances, work-modes, boundaries, custody]
timestamp: 2026-09-20
---
# Rationale

Accepted 2026-07-27 by the founder after a kernel hardening review. A source
worktree is disposable; the instance's operational identity and custody cannot
follow whatever directory a command happens to run from. The accepted boundary
therefore separates a canonical instance home from its explicit work view, and
distinguishes three things older code had conflated: the deployment root, the
invocation scope of a command, and the instance's work context.

This prevents a secondary worktree's removal from erasing lifecycle state and
prevents repository commands from accidentally resolving a different
deployment. The canonical soul is edited in its own repository under review;
the home records where its soul came from (`soulDir`, handed to hooks as
`OATS_SOUL`) and, since 0.26.0, carries no `soul` link that could invite
editing it in place.

A consequence discovered the hard way (2026-09-05): an instance home is
gitignored but can still sit *inside* an operator checkout. A bare
version-control command run from the home walks up into that checkout and can
move a shared branch. Being ignored does not put a directory outside the
repository; the work tree is reached only by being in it or naming it.

Work modes grant different repository discipline, not additional task
authority. A read-all/edit-none workspace mode exists for cross-repository
coordinators (2026-07-17); its read-only discipline is instructional, like every
other mode's. Permission-based enforcement was rejected because OATS is not a
sandbox, and pointing the soul's repository provenance at the workspace was
rejected because the boundary comes from the soul's declared work mode, not
from provenance. Work-mode briefings are kernel-owned and not overridable
(2026-07-17): they encode the safety discipline, and an override knob was rope.
An independent directory worker is a real non-Git execution case, not an
implicit checkout fallback or an OS sandbox. Its configured context supplies
policy without becoming a writable target. Knowledge files, capture and
publication mechanics belong to the selected capability, not to inferred
work-mode privileges.

# Related

[External knowledge needs source-independent custody](/nodes/oats-maintainer/decisions/external-knowledge-custody.md);
[Kernel-composed text is executable surface](../lessons/kernel-composed-text-is-executable-surface.md);
[Identity and location belong to the resolved object](../lessons/resolved-object-not-referring-string.md).

# Current contracts

- [Current souls-and-instances.md, work modes](https://github.com/awebai/oats/blob/main/docs/souls-and-instances.md#work-modes)
- [Current instance-boundary.md](https://github.com/awebai/oats/blob/main/injects/instance-boundary.md)
- [Current work-directory.md](https://github.com/awebai/oats/blob/main/injects/work-directory.md)

# Citations

1. Migrated from agents/oats-expert/soul/knowledge and agents/cli-dev/soul/knowledge @ 7838d3ca (canonical-instance-home-and-work-boundary, workspace-work-mode, marketplace-workmodes-runtime, instance-home-bare-git-cwd).
