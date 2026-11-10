---
type: Lesson
title: Rootless messaging needs the server's database extensions, not just PostgreSQL
description: A rootless aweb trial failed with the pgserver wheel because pgcrypto was absent and succeeded with a PostgreSQL 16 build including that extension.
about: [workstream/operations]
kind: lesson
id: ins-924972c1aa6f
tags: [operator, trials, rootless, postgresql, dependencies]
timestamp: 2026-11-02
---
# The failed shortcut and the working alternative

The source tried wheel-packaged PostgreSQL (`pgserver`) to avoid a privileged
installation for a disposable aweb stack. In the investigated aweb
`server-v1.27.38`, startup creates the `pgcrypto` extension; the wheel did
not supply it. A runnable PostgreSQL server was therefore not sufficient.
The reported working alternative was PostgreSQL 16 built from source with
`contrib/pgcrypto`.

This changes the operator's dependency check: qualify the extensions needed
by the selected server release before treating a rootless distribution as
usable. Do not retry service onboarding to repair a missing database
capability, or infer that rootless execution is impossible from one
incomplete distribution. The finding is about the wheel examined, not all
PostgreSQL wheels or a requirement to build PostgreSQL from source forever.

# Other limits of the successful local fixture

The same investigation used awid 0.5.34 and Redis 7.2. It reports:

- Local namespace setup used development mode and the explicit DNS-check
  bypass (`APP_ENV=development`, `AWID_SKIP_DNS_VERIFY=1`). These are bounded
  local-test concessions, not production deployment recommendations.
- awid refused a literal-IP delivery origin; a localhost origin outside
  development was also refused. Team delivery did not need that origin, so
  omitting the unnecessary surface avoided the refusal. Do not manufacture
  a delivery-origin configuration for a trial that does not exercise it.
- Claude's approved channel route worked with the local service in the
  reported smoke run. This does not waive its native admission prerequisites
  or prove that every channel version or hosted behavior is equivalent.

These are environment findings that made the
[local-versus-hosted trial choice](/nodes/oats-operator-expert/decisions/disposable-trials-prefer-local-messaging.md)
feasible, not a second reference for the messaging provider's CLI, identity
model or setup sequence. Those current facts remain with the tool's docs,
the installed setup skills and the
[messaging-package owner](/nodes/oats-aweb-expert/index.md).

# Elimination route and evidence

A reusable local-service fixture should pin the tested dependencies and
preflight the required extension before starting identity setup. Keep a
negative case for a server missing the extension and positive startup and
message-exchange coverage. Version-qualified development settings belong in
that fixture's maintained configuration, not an indefinitely copied recipe.
This harvest did not implement or verify those checks.

Evidence: OKF proposal from oats-operator-expert/coord-trial-kit-expert, 2026-11-02; notes/local-aweb-rootless.md.

The failures and successful rootless run are source-reported from one Linux
(Arch) machine. No build, live server check or hosted comparison was repeated
by this harvest. Memory/build-time measurements from that run are not a
portable sizing or performance budget.
