---
type: Reference
title: The kernel's provider readiness check wire
description: What the kernel sends a bound provider's binding check on the workspace model, the exact answer it decodes, the four statuses and how they are relayed, and the rules a provider's check must follow to be read as pass or fail rather than unknown.
about: [workstream/provider-integration, system/oats-kernel]
id: ref-7544d7d043fd
tags: [reference, integrations, readiness, providers, wire, kernel]
timestamp: 2026-09-24
---

The kernel's readiness view on the workspace model (since OATS 0.26.0)
carries a `providers` check: for every provider bound to the subject it runs
that provider's manifest `binding.check` and relays the answer verbatim. The
canonical, current wire is
[capabilities.md, "Readiness check"](https://github.com/awebai/oats/blob/main/docs/capabilities.md#readiness-check-bindingcheck);
this reference keeps the provider author's reading of it and the rules that
make a check read as pass or fail rather than unknown. A provider that departs
from the wire is reported as unknown, never as ready.

# What the kernel runs

- The manifest's `binding.check` command, as `node <module>/<script> <args>`
  with no shell, from the module directory: the home's module copy for a home
  subject, the deployment's verified module store for a soul subject. The
  script must resolve inside the module and be a regular file.
- Per-check timeout: the smaller of 30 seconds and what remains of a 60
  second budget for all providers of one subject; on timeout the process is
  killed with SIGKILL and the item is unknown. Once the budget is spent,
  remaining checks are not run and report `time-budget-exhausted`.

# What the provider receives

stdin, one JSON line:

```json
{"schemaVersion": 1, "phase": "check", "slot": "<layer>", "capability": "<id>",
 "settings": {"...": "the merged provider payload"},
 "input": {"context": {"kind": "workspace", "workspace": "<workspace key>",
                       "deployment": "<absolute deployment dir>", "soul": "<soul name>",
                       "team": "<team label or null>", "instance": "<name or null>",
                       "home": "<absolute home or null>"},
           "action": {"kind": "readiness"}}}
```

- A **soul subject** has `instance` and `home` null: the question is whether a
  spawn of that soul would be configured. A **home subject** has both set:
  the spawned identity exists.
- `team` is the soul's team label and is null for a soul without one. It is
  a label, not a team id; the provider resolves the id from its own settings
  and the team environment below.
- No captured binding is present in this shape. A provider that also serves
  the captured (pre-workspace) wire keeps that path unchanged and branches on
  `input.context.kind === "workspace"` with no `input.binding`.

Environment: every ambient `OATS_`, `OAS_` and `PI_` variable is stripped,
then the kernel sets `OATS_TEAM_SCOPE`, `OATS_TEAM_ID`, `OATS_TEAM_LABEL`,
`OATS_WORKSPACE_NAME`, `OATS_WORKSPACE_KEY`, `OATS_CAPABILITY`,
`OATS_SETTINGS` (the same payload), `OATS_CLI_BIN`, `OATS_WORKSPACE` (the
deployment directory), `OATS_AGENT`, `OATS_SOUL` when the soul directory is
known, and `OATS_INSTANCE` plus `OATS_INSTANCE_HOME` for a home subject.

# What the kernel decodes

Exit 0 and exactly one JSON document on stdout: the envelope echoing
`schemaVersion`, `phase`, `slot` and `capability`, `ok: true`, and a `result`
holding only `status`, `problems` and `warnings`. `ready` maps to pass,
`needs-configuration` and `authorization-required` (a step the human must
perform) to fail, `unavailable` to unknown; `ready` with problems, a second
document, prose on stdout, unknown keys or a non-zero exit make the item
unknown. Warnings never change the status. `ok: false` with an error is
relayed as unknown with the provider's code. Problem codes are the
provider's own; the kernel does not match them against `binding.reasons`.

# Rules for a provider's check

- **Read-only.** The check never writes, mints, starts, stops or deregisters
  anything, and never touches an instance's credential home. It answers from
  the merged settings plus host facts it can read (a directory, a config
  file, a local status probe).
- **Answer what the spawn hook would do.** The root and team resolution, and
  every remedy sentence, come from the same rule the spawn hook uses; a
  readiness verdict that disagrees with spawn sends the operator to the wrong
  fix (see
  [a fallback the contract defines is a warning](/nodes/integrations-expert/lessons/a-fallback-the-contract-defines-is-a-warning-not-a-readiness-problem.md)).
- **Only the three result keys.** A view the kernel does not decode goes in
  an operation, not in `result`
  ([a document a provider writes for the kernel passes the kernel's rule](/nodes/integrations-expert/lessons/a-provider-answer-is-validated-by-the-kernel-not-by-the-reviewer.md)).
- **Stay inside the timeout.** Any external probe the check makes gets its
  own cap well under 30 seconds, so a hung tool yields a typed problem rather
  than a killed process.
- **Nullable means nullable.** Validate `team`, `instance` and `home` as
  string-or-null; a validator that refuses null turns the common single-team
  setup into unknown (see
  [review a validator against every nullable field the wire spec names](/nodes/oats-maintainer/lessons/review-a-validator-against-every-nullable-field-the-wire-spec-names.md)).
- **Nothing else on stdout.** Diagnostics go to stderr; the JSON line is the
  whole of stdout.

# Manifest setting defaults

The kernel injects every manifest `settings.<key>.default` as the lowest
payload layer on the workspace-model path (since OATS 0.26.0); defaults reach
the merged payload, the recorded providers, the decision revision (bound by
value, so a changed default changes the revision) and the check request, and
each leaf's origin (`manifest-default` among them) reaches hooks and the check
as `OATS_SETTINGS_ORIGINS`. For a provider author:

- **Declare a default only if it equals what the hook already does when the
  key is absent.** The injection makes the implicit explicit; it must not
  change behaviour.
- **Only the workspace-model resolver injects defaults**, not the captured
  composition builder, so a captured-route phase that whitelists keys may
  still refuse a key that has a default (the messaging integration refuses
  `identity` there, because identity needs host facts the captured route
  never carries). The check phase accepts the full settings shape.
