---
type: Lesson
title: "All souls on pi with this model" on one machine is one host-fact write, with the model resolved to pi's provider-qualified id first
description: A request to run every soul on pi with a named model on one machine is a `souls.launch` host fact written by `oats soul launch set`, not a PR, a launch-config or a hand edit; resolve the person's model nickname to pi's `provider/model-id` before writing, and verify with spawn previews, not the launch-config preview.
about: [workstream/workspace-administration]
kind: lesson
id: ins-45c0e2272ddb
tags: [lesson, setup-admin, launch, pi, model, host-fact, verification]
timestamp: 2026-10-26
---

Judgement formed 2026-10-26 by a setup-admin instance asked to put every soul
of one machine on pi with a particular model (OATS 0.67.1).

# The trap

The setup-admin's product is reviewed changes: diffs, pull requests, synced
workspace files. That habit misroutes this request. A harness-and-model
choice for one machine is a **host fact** ([place each fact at the scope
that owns it](/nodes/oats-operator-expert/lessons/place-each-fact-at-the-scope-that-owns-it.md)):
it is true of this machine and of nobody else's. Three routes that look
natural are wrong or unnecessary:

- **A PR to the workspace repository.** It would make one machine's
  preference everyone's policy, and it is not needed: nothing shared
  changes.
- **A launch-config.** Launch configurations are a separate explicit
  mechanism; the host-wide preference does not live there.
- **A hand edit of the uncommitted local file.** Legal, but the supported
  command writes the same `souls.launch` entry with validation and a plan,
  so there is nothing for a hand edit to gain.

The whole change is one supported write, `oats soul launch set '*'
--harness pi --model <provider>/<model-id>`, previewed with its plan flag
first. No sync, no PR. The command and the `souls.launch` grammar are owned
by the repository's launch-preferences documentation; this lesson is about
routing to it.

# Resolve the nickname to pi's provider-qualified id

A person names a model by nickname ("fable 5.1"). Pi's `--model` accepts a
bare pattern, but the pin should carry pi's **`provider/model-id`** form,
found with `pi --list-models <search>`:

- it is unambiguous where the same model is offered under several
  providers;
- it is the id a running pi session reports in `PI_PROVIDER` and
  `PI_MODEL`, so a later check of a live home compares like with like;
- it is the form the kernel's per-harness translation expects
  ([harnesses start natively](/nodes/oats-kernel-expert/decisions/harness-native-launch.md)):
  a bare or nicknamed value is not what that translation was designed
  around.

Resolve first, write second. Writing the nickname as given produces a pin
that may launch, or may not, and tells the person nothing either way.

# Verify with spawn previews; the launch-config preview did not show it

`oats spawn <soul> --preview` echoes the harness and model the launch would
use. Run it for at least one member soul and one package soul: the wildcard
key must reach both kinds, and the preview is the only cheap proof that it
did. In 0.67.1, `oats launch-config preview --soul` JSON did not surface the
preference fields, so a green launch-config preview is not evidence that the
pin took.

An unmatched pin is a different failure with its own rule
([proven unmatched launch pins refuse fall-through](/nodes/oats-kernel-expert/decisions/unmatched-launch-pins-refuse-fallthrough.md));
the wildcard key does not raise it.

# Tell the person what does not change

Running homes keep the launch recorded at their spawn until they are
respawned or restarted with `--reselect-launch`. An absence of errors after
the write does not move anything already running; say so when reporting the
change, or the person will look at an open session and conclude the pin
failed.

# Elimination route

The nickname step is knowledge debt: `oats soul launch set` could resolve
or validate a pi model against `pi --list-models` at write time, and the
launch-config preview could surface the resolved preference. Until either
exists, this lesson carries the check.

# Citations

Evidence: OKF proposal from oats-setup-admin/set-local-model-pi-admin,
2026-10-26; notes/pi-model-id-needs-provider-prefix.md. One host and one
model were observed; the preview behaviour is as reported by the source for
OATS 0.67.1 and was not re-run by the harvest.
