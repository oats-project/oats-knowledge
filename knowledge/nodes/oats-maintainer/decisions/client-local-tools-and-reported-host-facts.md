---
type: Decision
title: A client reads reported host facts but may check its own local tool
description: Clients consume kernel-reported host capabilities rather than copying host rules, while a client-owned local tool may be checked locally with mirrored behavior pinned by a cross-owner test.
about: [workstream/oats-direction, system/oats-kernel]
id: dec-30b04a4473b0
tags: [clients, kernel, ownership, remote-hosts, testing]
timestamp: 2026-10-27
---
# Decision

The source reports a cross-client coherence agreement on 2026-10-27: decide
whether a check is legitimate by **whose mechanism and machine it describes**,
not by whether similar code exists in the kernel.

- **Reporting what a host supports:** consume the fact from that host's
  kernel, with its feature declaration and reported field. Remote-host
  facts must remain attributed to that host through the roster probe. A
  client must not reproduce the kernel's version check to answer for it;
  the client could be checking a different machine.
- **Operating a client-owned local tool:** the client may check the tool it
  actually runs. For the Desktop's own tmux viewer, a local version check is
  appropriate. Any mirrored version rule, binding or table name must be
  pinned against the kernel's counterpart by a test so the implementations
  cannot silently diverge.

# Why the local check is not a second host model

The kernel is authoritative about its host's session behavior. A client's
copy of that check would replace an observation with a prediction, and on a
remote connection could answer for the wrong host. The client's own viewer
is a different mechanism: it needs the capabilities of its own local tmux,
not a remote kernel's viewer capabilities.

The rejected alternative was requiring Desktop to obtain its local viewer's
binding decision through the CLI's session-viewer report. That adds a CLI
dependency without improving the local fact, and can conflate two different
viewers. The release-lane agreement had the TUI drop its copy of the host
rule; the Desktop second-read verdict then accepted the Desktop's own local
tmux check, reading the agreement's "drop their copies" as being about naming
keys per tab, with the viewer's binding tables pinned to the kernel's by test.

This is not permission to infer kernel support from a kernel version number,
parse deployment files or import private kernel behavior at runtime. The
existing [kernel-JSON authority decision](/nodes/oats-desktop-expert/decisions/standalone-product-and-cli-authority.md#the-kernel-is-the-model-desktop-renders-and-drives-it-phase-f-2026-09-24)
and [runtime/viewer ownership split](/nodes/oats-maintainer/decisions/runtime-messaging-viewer-ownership.md)
remain unchanged. The local-tool distinction interprets those boundaries;
it does not supersede their human-accepted direction.

# Enforcement and related judgment

Eliminate host-rule copies structurally by consuming the reported fact.
For the allowed local-tool mirror, keep a regression that compares the
client's relevant behavior with its kernel counterpart; a copied expected
literal that can drift with the implementation is not that guard. No
broader permission to duplicate kernel rules follows from this one case.

The [kernel-text testing lesson](/nodes/oats-desktop-expert/lessons/kernel-text-tests-own-the-client-reading.md)
addresses a different boundary: a client test must not accidentally freeze
the producer's incidental prose. Here, correspondence of the named local
viewer behavior is deliberate and is the agreement the test should enforce.

# Evidence and limits

Evidence: OKF proposal from oats-maintainer/polaris-oats-maintainer-desktop, 2026-10-27; notes/client-copies-of-kernel-rules.md.

The source cites the [scroll agreement](https://github.com/awebai/oats/issues/1502),
comments 6406130155 and 6406136989, and review verdicts on
[#1514](https://github.com/awebai/oats/pull/1514) (6431495681) and
[#1550](https://github.com/awebai/oats/pull/1550) (6431496032).
Agreement and enforcement are source-reported, not independently audited or
executed by this harvest. The concept records the accepted distinction and
its test requirement, not proof that the implementation or release passed.
