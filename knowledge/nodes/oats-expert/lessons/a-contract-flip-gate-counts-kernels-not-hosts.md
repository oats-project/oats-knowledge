---
type: Lesson
title: A gate on "every host is updated" counts kernels, not hosts
description: One host can run several kernels, one per node version, and its schedule unit records its own kernel path, so before a contract flip read every install and the unit's path and check a capability the update adds rather than a version number.
about: [workstream/coordination]
kind: lesson
id: ins-84a8c632e5e0
tags: [planning, migration, contracts, gates, hosts, kernels, schedule, evidence]
timestamp: 2026-10-30
---
# A host is not one kernel

A gate that says "every host runs the new kernel" assumes one kernel per
host. That is not what a host is. Where a version manager gives each node
version its own global npm prefix, each has its own kernel install, and a
user-level bin directory can hold another. `oats --version` from a home reports the kernel that home's
shim names and says nothing about the others.

The schedule unit is the install that matters most and is the easiest to
miss. The unit records its own kernel path, written only when the schedule
host is installed. Nothing an update does to the homes rewrites it. After a
contract flip, that older kernel keeps running triggered spawns unattended
and fails them with nobody watching, while every reading taken from a home
says the host is updated.

The source reports one host whose homes ran one release under one node
version while its schedule tick ran an older release under another; this
is the reported case, not a survey of hosts.

# What the gate reads instead

Before a flip that an old kernel cannot follow:

- Enumerate every install on the host: each node prefix, the user-level
  bin directory, and the path the schedule unit itself names. Treat the
  unit's path as a separate install even when it resolves into a prefix
  already listed.
- **Ask each install itself.** Run the unit's recorded node and CLI paths
  directly: an answer taken through a home's `oats` is that home's kernel,
  whatever the check reads.
- Check a **capability the bridge release adds**, not a version number. The
  gate's question is whether this install can follow the flip; a field or
  behaviour only the bridge produces answers that directly, where a version
  string has to be mapped to what it contains. The source's bridge adds a
  `package` field to `oats version --json` and uses its presence as the
  check.
- Count the gate as passed per kernel, never per host.

This extends [dating host-read facts](/nodes/oats-expert/lessons/date-host-read-facts-before-an-adoption-gate.md):
that lesson makes a version reading name its host and observation time;
this one says a host has several readings, and the one nobody takes is
the schedule unit's. [Persisted launchers](/nodes/integrations-expert/lessons/persisted-launchers-need-recorded-kernel-paths.md)
is the same mechanism for what an integration leaves behind: a recorded path
outlives the install that wrote it. Upgrade sequencing for a deployment
remains the operator's [host-requirements lesson](/nodes/oats-operator-expert/lessons/check-target-provider-host-requirements-before-sync.md).

# Elimination route

`oats schedule host status` already reports a unit whose recorded node or
CLI is gone. It does not report a unit whose recorded CLI still exists and
is an older kernel, which is the case here. The lasting fix extends that
check to report when the unit runs a different kernel from the homes on the
same host, so a gate can read one answer instead of enumerating prefixes.
Until that exists, the lesson stands and the enumeration is manual.

# Evidence and limits

Evidence: OKF proposal from oats-expert/oats-org-migration-expert,
2026-10-30; notes/flip-gate-is-per-kernel.md.

Observed while preparing one repository move for one team's hosts. The
host's kernel and node versions, and the unit's recorded path, are
source-reported; this harvest did not inspect the host. Maintainer review
checked the kernel at awebai/oats@c542bc3 (0.69.6): only `oats schedule host
install` writes the unit, with the installing kernel's own path, and the
status check is as described above. The bridge
([awebai/oats#1679](https://github.com/awebai/oats/pull/1679)) was unmerged
and unreleased at that review, so its `package` field is not yet something
a gate can read on any released kernel.
