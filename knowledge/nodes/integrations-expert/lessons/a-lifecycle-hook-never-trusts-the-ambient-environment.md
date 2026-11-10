---
type: Lesson
title: A lifecycle hook never trusts the ambient environment — hooks inherit the operator's process, and the operator can be another instance
description: Spawn, launch and retire hooks run with the invoking process's environment; a hook that reads a locator, credential home or team from that environment can act for the wrong principal when the invoker is itself an instance, so every such input comes from the hook's own payload, its persisted meta or the instance home.
about: [workstream/provider-integration]
kind: lesson
id: ins-da1e231121de
tags: [lesson, integrations, hooks, environment, locator, custody, launch]
timestamp: 2026-11-02
---

Learned 2026-09-24 in the review of a messaging provider's launch hook; the
defect existed in two shapes in the same week.

# Rule

- **Inputs a hook acts on come from three places only**: the payload the
  kernel hands it, the meta it persisted at an earlier event, and the
  instance home it owns. Never from the ambient environment.
- **Strip the environment the hook's own tool would misread.** When the hook
  runs a CLI that resolves its identity from an environment variable, remove
  that variable from the child process, because the hook may be running
  inside a session that has it set for a different principal.
- **Record locators in meta at the event that creates them** (a credential
  directory, a grant identifier, a socket path) and read them back from meta
  at launch and retire, so a restart uses what this instance owns.

# Why

The kernel runs lifecycle hooks with the invoking process's environment plus
its own `OATS_*` variables (only the readiness check starts from a stripped
environment), and the invoker is often not a human shell: a coordinator instance restarting a
child runs the child's launch hook from inside its own environment. A launch
hook that read the identity-home variable to find "the current grant" would
hand the child its parent's credential, or, with renewal on, revoke the
parent's grant as the child's superseded one. The same mechanism made a mint
fail in the other direction: the CLI refused an inherited identity-home
variable as an external home, and the hook had passed it on without knowing.

# What goes wrong

- A child launched from a served instance acts as its parent; the roster
  shows two instances on one grant and nothing complains.
- A renewal revokes the wrong grant; the live one expires at its TTL while
  the instance reports healthy until then.
- A tool refuses a command because the hook forwarded an environment it
  never meant to set.

# A tool's refusal is not the hook's isolation boundary

The source's 2026-10-30 investigation reports that aw 1.36.43 removed its
external-identity-home command allowlist. Real-binary comparisons at
1.36.42 and 1.36.43, together with source inspection, changed the risk
assessment: commands such as `team join` and `team invite` no longer had the
old policy refusal between an inherited `AWEB_IDENTITY_HOME` and use of the
selected identity. A failure that once exposed an environment leak could
become an action as the wrong principal after a tool upgrade.

This reinforces, rather than replaces, the input-authority rule above.
Review every child-CLI invocation for deliberate identity selection: strip
an unintended inherited selector, build a restricted environment, or supply
the intended home explicitly from the hook's authoritative inputs. Clearing
an ambient selector alone is not proof that the remaining lookup selects
the right identity; control that context too. Never discard an intentional
selection to bypass a native refusal, or treat removal of a refusal as new
authority to act.

The elimination route is a shared child-process boundary that makes the
selected identity explicit, with regression cases that inherit a foreign
home and prove it is neither read nor mutated. Exercise both refusing and
non-refusing CLI behavior; tests must still protect the intended principal
when the tool permits the call. The
[real-binary execution lesson](/nodes/integrations-expert/lessons/real-binary-tests-that-skip-give-no-cover.md)
owns why those cases must run in required compatibility jobs rather than
silently skip. No implementation or completed invite acceptance is certified
by this finding.

Current aw lookup precedence and command behavior belong to the tool's
contract and the [messaging package expert](/nodes/oats-aweb-expert/index.md),
not a second reference here. The reported version boundary is retained only
as the evidence for why an accidental refusal must not be a provider's
identity guard.

# An authoritative locator is not automatically safe to hand on

Selecting the right input answers **whose value**, not **whether that value
is safe to disclose**. The source's 2026-11-02 review found this gap in a
provider handing on a service URL from the selected root's credential-bearing
workspace file. Parsing the URL and stripping userinfo, query and fragment
still left a path carrying a credential, including encoded or dot-segment
forms. The rejected sanitizer tried to enumerate where a secret might be;
it did not establish the narrow locator shape the recipient actually needed.

For this nullable service locator, the chosen boundary was to allowlist the
**raw value's expected shape** before emitting it, and return `null` for
anything else or for an absent value. The reported implementation allowed
http(s), a host, an optional port and only its narrowly supported bare API
paths, with a length bound. Those exact accepted forms belong in the
provider's contract and tests, not in a second URL specification here.
Redacting a rejected value was also rejected: it would still look like a
usable locator. Absence or rejection does not authorize an ambient fallback.

This is a bounded integration choice, not a universal rule that all URLs
share this shape or that syntactic validity proves arbitrary text
secret-free. Its elimination route is a single explicit output-validation
boundary with positive supported-locator cases and negative credential-bearing
cases, including userinfo, query, fragment, extra path material, encoded and
dot-segment forms. A missing value must stay absent even with an ambient
candidate present. The source reports the repair and regression tests in
[awebai/oats-aweb#172](https://github.com/awebai/oats-aweb/pull/172) at
`0e3f332`; they were not independently rerun by this harvest.

The kernel's [hook and error output-channel lesson](/nodes/oats-kernel-expert/lessons/hook-and-error-channels-disclose.md)
already owns general disclosure and caller-aware suppression. This refinement
preserves why stripping and redaction were rejected for an optional locator;
it neither changes that lesson's known-request fallback nor creates a generic
redaction policy. The input-authority rule above still applies first.

## Disclosure rejection is not service absence

The disclosure projection above intentionally returns `null` for both an
absent locator and a value it will not hand on. That is safe for its output
contract, but loses information a classifier needs. In a later review on
2026-11-02, the source reports that a compatibility warning reused this
projection and treated `null` as no configured service, hence the default
Cloud service. Valid self-hosted values involving IPv6, IDNs or a trailing
configuration comment then lost their warning. A value's non-disclosure had
silently become a claim about what it was.

Keep the two questions separate: **may this value be emitted?** and **which
service does the authoritative configuration select?** Classify from that
configuration's raw value, using its parsing rules for quotes and comments,
without emitting the raw value in results or diagnostics. Give an actually
absent service its own branch; disclosure rejection is not absence and does
not authorize a default or an ambient fallback. This does not widen the
existing disclosure allowlist.

The elimination route is separate classification and output-projection
interfaces that do not collapse these states for a decision-making caller,
plus end-to-end regression cases through every warning caller. Include valid
service forms rejected by the disclosure projection, true absence and
credential-bearing values; assert both the intended classification and the
absence of raw-value disclosure. The source attributes this repair to
[awebai/oats-aweb#175](https://github.com/awebai/oats-aweb/pull/175), review
round 1. The [tested-bound decision](/nodes/integrations-expert/decisions/newer-than-tested-warnings-follow-release-authority.md)
records the warning's rationale, not a second locator policy.

# Related filesystem boundary

[Admit failed-run leftovers by type, not name](/nodes/integrations-expert/lessons/admit-leftovers-by-type-not-name.md)
records why a provider widening directory admission must inspect the expected
object types before effects and create new output sets without overwriting
leftovers. Authoritative input selection does not establish write safety for
what is already on disk.

# Related lifetime boundary

[Persisted launchers need recorded kernel paths](/nodes/integrations-expert/lessons/persisted-launchers-need-recorded-kernel-paths.md)
applies this distrust to commands an integration leaves behind: a locator
that works in the installer may disappear at retirement or fail outside its
shell. It does not change the input-authority rules above.

# Consequences

- Tests set a foreign value in the hook's environment and assert the hook
  emits its own locator and touches nothing foreign.
- The kernel persists launch-hook meta for exactly this reason; a provider
  that renews credentials relies on that persistence
  ([the served identity is a messaging-layer fact](/nodes/oats-maintainer/decisions/served-identity-is-a-messaging-layer-fact.md)).

# Evidence

Evidence: OKF proposal from integrations-expert/overdue-step-checkpoint-integrations-expert,
2026-11-02; notes/a-disclosure-filter-is-not-a-classifier.md. The hidden-value
classification failure and repair are source-reported from one provider's
review, not independently reproduced or certified as released by this harvest.

Evidence: OKF proposal from integrations-expert/overdue-step-checkpoint-integrations-expert,
2026-11-02; notes/hand-on-a-url-by-allowlisted-shape.md. The URL-path failure,
rejected sanitizer and repair are source-reported from one provider; no
independent implementation, CI or release verification is claimed.

Evidence: OKF proposal from integrations-expert/overdue-step-checkpoint-integrations-expert,
2026-10-30; notes/aw-1-36-43-selection-order.md.

The source identifies aw source revision `14111b5b` and comparisons of real
binaries at 1.36.42 and 1.36.43. These observations are source-reported, not
independently reproduced by this harvest. They do not prove successful real
invite acceptance, every identity mode, or behavior of all future versions.

Maintainer review of 2026-10-30 read the release boundary on GitHub, not by
running a binary: revision
[`14111b5b`](https://github.com/awebai/aweb/commit/14111b5b0f58c7cb39a096bf614fdf337042fed0)
is in awebai/aweb, says it removes the allowlist, and is contained in tag
`aw-v1.36.43` but not `aw-v1.36.42`. The policy message is in the policy source
at `aw-v1.36.42` and absent at `aw-v1.36.43`.
