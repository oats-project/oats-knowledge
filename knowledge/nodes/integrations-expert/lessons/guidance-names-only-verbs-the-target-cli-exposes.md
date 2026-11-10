---
type: Lesson
title: Integration guidance and local validation follow the real contract — the manifest over prose, only verbs the target CLI exposes, every path that carries a service-defined value
description: A capability's setup text and remedies name only verbs the real CLI exposes, pinned by a test; what a setting requires is read from the manifest, not from prose; and a value the service defines (an alias rule) is validated identically in every provider path that carries it.
about: [workstream/provider-integration]
kind: lesson
id: ins-42f6947b845a
tags: [lesson, integrations, setup, guidance, manifest, validation, testing]
timestamp: 2026-09-24
---

Learned 2026-09-24 while hardening a messaging integration's setup command
after its shipped guidance recommended a team-creation command that no release
of the target CLI had ever exposed; extended the same day by a handed-over
example configuration whose placeholders read as human decisions, and by an
alias-rule release that fixed one of two validating paths.

# Rule

- **Every CLI verb the capability prints or runs is pinned by a test** that
  executes that verb's help against the real binary when it is on the path,
  and skips with a message naming the unverified verbs otherwise. Guidance
  offers the user only paths the CLI exposes today, however convenient a
  shortcut would be. The scan covers the capability's own texts (binaries,
  injections, README); vendored upstream skills are the upstream project's to
  verify.
- **The manifest, not prose, says what a setting requires.** Before telling
  anyone an input needs their decision, read the capability's declared
  settings: which keys exist, which have defaults, which are optional. A
  placeholder in example configuration is not a decision. Keep the
  distinction the manifest cannot make: a merely required setting is yours to
  fill; one that carries real identity (an account, a team, a credential)
  stays the human's even when the schema would accept a guess.
- **A service-defined value is validated the same way in every path.** When
  an alias or identifier bound changes, grep the whole payload for every
  expression that validates it (spawn hook, captured-execution adapters,
  setup) and change them together, with a test per path; leave expressions
  that bound a different identifier alone.

# Why

Guidance text has no consumer in code; nothing fails when it names a command
that does not exist, and the first person to find out is a new operator at
the moment they are least equipped to diagnose it. Prose is written from
memory and describes the fully specified case, while the manifest states what
the code enforces; wrongly declaring a choice "blocked on a human" stalls the
work and looks like diligence, so it tends not to get corrected. A release
that claims "the alias rule matches the service" is false if any provider
path still accepts what the service refuses: the service rejects the alias at
join time, after the kernel has committed to the name.

# Consequences

- A setup command that runs the CLI for the operator does so only through
  primitives that exist, one authority at a time, with secrets withheld from
  every output path including argument-parse errors (a `--flag=value` form is
  a token on stderr if the parser echoes unknown arguments).
- Settings that only the host may supply are a manifest declaration, not a
  guidance sentence: see
  [host-only settings are refused by the resolver](/nodes/integrations-expert/lessons/a-merged-provider-payload-cannot-enforce-host-only-keys.md).
- Readiness remedies follow the same rule as guidance, and readiness itself
  follows spawn:
  [a fallback the contract defines is a warning](/nodes/integrations-expert/lessons/a-fallback-the-contract-defines-is-a-warning-not-a-readiness-problem.md).
- Correct upstream guidance can still be an unavailable dependency:
  [provider guidance cannot depend on upstream skill pointers](/nodes/integrations-expert/lessons/provider-guidance-cannot-depend-on-upstream-skill-pointers.md)
  records why the composed provider must carry its own minimum loop.
- The operator node's counterpart:
  [the installed provider is the authority for a setting](/nodes/oats-operator-expert/lessons/the-installed-provider-is-the-authority-for-a-setting.md).
