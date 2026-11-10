---
type: Decision
title: The human alias's host part is read from the deployment's local settings, not the hook environment, by one exported derivation
description: The kernel's hook environment carries no host name, so the provider derives the human alias `<os-user>-<host>` by reading `host.name` from the deployment's `oats-local.yaml` with its own block-style reader, falling back to the short OS hostname, with the real OS user from `os.userInfo()`; one exported function serves the spawn brief and the later mint so a re-mint yields the same alias.
about: [system/oats-aweb]
id: dec-9b1b22ef2b59
tags: [oats.aweb, threads, human-identity, alias, hooks, oats-local, determinism]
timestamp: 2026-10-26
---

Decided 2026-10-26 in stage 1 of the threaded human channel, the provider's
side of
[humans address long-lived agents through threads](/nodes/oats-maintainer/decisions/humans-address-long-lived-agents-through-threads.md).
That record's design document defines the human's alias as `<os-user>-<host>`
with the host "the host's recorded name (`host.name` in `oats-local.yaml`,
else the hostname)".

# What was decided

- **The host part is read by the provider itself** from `host.name` in
  `<OATS_WORKSPACE>/oats-local.yaml`, the deployment directory the kernel's
  payload names, with a small block-style reader (the package carries no YAML
  dependency), and falls back to the short OS hostname (cut at the first
  dot, so a fully qualified and a short hostname agree) when the key is absent.
- **The user part is the process's real user** (`os.userInfo()`), with `$USER`
  only as a fallback when that call throws (no passwd entry in some
  containers). An inherited `$USER` is ambient environment, which a hook does
  not trust
  ([a lifecycle hook never trusts the ambient environment](/nodes/integrations-expert/lessons/a-lifecycle-hook-never-trusts-the-ambient-environment.md)).
- **One exported function derives the alias** and is used both by the spawn
  brief (stage 1) and by the human mint (stage 2): the design record wants a
  re-mint after a lost directory to yield the same name, so the derivation
  must have exactly one home.

# Why

The source reports that OATS 0.67.1's hook-environment list
(`docs/capabilities.md`) carries `OATS_WORKSPACE` but no host-name variable.
A future instance building the mint, or any feature needing the host's name,
would otherwise search the hook environment or ask the kernel; recording the
derivation's home and fallback order keeps alias determinism single-sourced.

The read goes to the deployment the payload names, never to the current
working directory or the ambient environment: the invoker of a hook can be
another instance.

# What would supersede this

A kernel-supplied host name (an `OATS_HOST_NAME` hook variable) would remove
the YAML read. That is a kernel ask, not something this package works around
further; when it exists, the derivation keeps its single home and reads the
variable from the payload instead.

# Citations

Evidence: OKF proposal from oats-aweb-expert/threaded-channel-aweb-expert,
2026-10-26; notes/human-alias-host-source.md. The source reports the stage 1
branch, its tests and a live rehearsal with aw 1.36.49 in which the brief
named the deterministic alias; stage 2 (the mint) was not built when this was
recorded. This harvest did not read the kernel's hook-environment list or run
the branch.
