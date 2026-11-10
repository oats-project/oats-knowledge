---
type: Lesson
title: A live Pi TUI does not prove provider readiness
description: Pi 1.3.0 could accept a prompt and remain silently running without a logged-in provider, so omitting a shared model pin avoids a portability assumption but does not establish an executable session.
about: [workstream/provider-integration]
kind: lesson
id: ins-fe9b17bd5b9d
tags: [integration, pi, harnesses, readiness, portability, testing]
timestamp: 2026-10-30
---
# A launch can succeed without useful execution

In the source's 2026-10-30 investigation of **Pi 1.3.0**, a TUI with no
provider logged in started, took its prompt and showed no error, while no
work followed. A scratch instance launched without a model therefore read
as running rather than exposing the missing provider. The source also
reports that print mode (`pi -p`) exited nonzero in that condition.

For integration acceptance, neither a live process nor the absence of an
on-screen error establishes provider readiness or model execution. Do not
assume that an unusable harness always exits at startup. The print-mode
contrast is a versioned observation, not a proven general-purpose readiness
probe or a guarantee about every authentication failure.

This differs from a deliberately instrumented
[credential-free harness probe](/nodes/integrations-expert/lessons/credential-free-harness-probes-have-bounded-proof.md):
a real TUI with a local provider stub can establish a particular consumption
boundary; an unconfigured TUI that merely stays up establishes no such
consumption evidence.

# Portability is not readiness

The same investigation reports a hard exit for a bare model identifier
matching more than one provider, including a test with none logged in.
Leaving the model unspecified avoids that particular ambiguity; qualifying
the model selects a provider whose availability must then be established on
the target host. These are different failure cases, not interchangeable
fixes.

For a reusable soul intended for hosts with **no shared provider/model
contract**, naming only the Pi harness avoids embedding one host's provider
choice into the shared default. That is a conditional design conclusion,
not a rule that souls can never name a model, and not a promise that a
harness-only launch works on every host. The setup-admin's
[host-specific model-selection lesson](/nodes/oats-setup-admin/lessons/a-host-wide-pi-model-is-one-launch-set-write.md)
already owns provider qualification and the host-fact route; this lesson
adds the reason an unpinned launch still needs independent readiness evidence.

# Elimination route

The silent no-provider failure is knowledge debt: expose an actionable
launch/readiness diagnostic and cover it with a real-runtime negative test,
rather than relying on every agent to notice missing work. The proposal
points to [awebai/oats#1683](https://github.com/awebai/oats/issues/1683) as work
addressing that failure; this harvest does not establish implementation,
release or deployment of a fix. Keep the unpinned/no-provider case separate
from the explicit ambiguous-model refusal in regression coverage.

Any external check must use the environment the launched process will
actually have, as required by the existing
[launch-environment decision](/nodes/oats-maintainer/decisions/checks-use-the-launch-environment.md),
not assume that the invoking hook's environment reaches the pane. This does
not authorize repairing login, substituting a profile or treating a
negative-case probe as authenticated end-to-end acceptance.

# Evidence and limits

Evidence: OKF proposal from integrations-expert/overdue-step-checkpoint-integrations-expert, 2026-10-30; notes/a-pi-reviewer-with-no-provider-is-silent.md.

The observations are source-reported from Pi 1.3.0 in a scratch agent
context and a scratch instance; the harvest did not rerun them. They do not
establish behavior in other Pi versions, every credential configuration or
every launch path. No human-accepted soul-default policy is claimed.

Maintainer review, 2026-10-30: [awebai/oats#1683](https://github.com/awebai/oats/pull/1683)
was an open, unmerged pull request, so its diagnostic was unreleased. Its
description says it warns and never refuses, acting only on Pi's own
"No models available" from `pi --list-models`; any other answer says nothing,
so the warning's absence is not readiness evidence either. It also states a
limit against the launch-environment decision above: a hook's environment is
not the pane's, so a provider set only through a launch configuration's `env`
can draw a false warning. Read from that description, not run; not human
acceptance.
