---
type: Decision
title: A third-party session backend is a capability-supplied session provider behind a small kernel contract; tmux stays the one built-in backend
description: Decided by both sides on 2026-11-19 for the first such backend (bb), a backend other than tmux is supplied by a capability package that implements a small kernel contract (launch, inspect, input, stop, optional inspectMany and check), so the third-party product's CLI, flags and version move with that package and its pinned contract test, never with the kernel; the kernel keeps receipts, authority, lifecycle claims, refusals and the JSON shapes, and the rounds fixed the coherence rules any later provider must keep.
about: [workstream/oats-direction, system/oats-kernel]
tags: [direction, runtime, session-backends, capabilities, contracts, two-sides, delivery, mixed-kernels]
timestamp: 2026-11-19
---
**Owner: oats-maintainer. Update-on-change: whoever proposes a second session
provider, or a change to the decided contract, checks it against the rules
below and records any supersession in the node log.**

# The decision

An agent backend other than tmux, starting with bb, is a **session provider**: a
capability package declares `sessionProviders` in its manifest and implements
four commands the kernel dispatches (launch, inspect, input, stop), plus an
optional batch inspect and an optional readiness `check`. tmux stays the
kernel's one built-in backend, and nothing changes for tmux homes. Pepe's side
and Juan's side decided it together, before the kernel build, as the decided
text of the session-provider contract on 2026-11-19 (revision 9). The exact
shape of the sandbox allowances is decided separately; their rule is part of it.

**Why.** A third-party product's CLI, flags and version must change in one
place, with its own contract test against a pinned version, and never through a
kernel release. The kernel already owns everything a backend must not: receipts,
authority checks, lifecycle claims, refusals and the JSON shapes. It already
dispatches capability commands under validated JSON envelopes. So the new part
is one dispatch, not a second runtime model. This applies the
[kernel and capability responsibility boundary](/nodes/oats-kernel-expert/decisions/kernel-and-capability-responsibility.md):
provider behaviour belongs in a capability, and the kernel stays runtime-neutral
and dependency-free.

**Rejected:**
- The backend coded in the kernel, with the third-party CLI inside the kernel and
  versioned with it.
- Widening the slot providers' `binding` to carry the provider's readiness. It is
  a normalize, bind and check model for a slot, and a session provider has neither
  a slot nor anything to bind. Readiness is the provider's own `check`, relayed in
  the readiness answer's existing shape.
- A backend condition as a reserved key inside `requires[].when`, which means
  capability settings. It could collide with a setting name, and an older kernel
  would read it as an unset setting and silently skip the requirement. A sibling
  `backends` key makes an older kernel refuse loudly.
- For the backend's container image: bb-specific supervision in the base image,
  with the version pinned elsewhere. The base image keeps only a generic optional
  child, and the provider's repository holds the derived image, so there is one pin.

# The coherence rules the rounds fixed

These hold for any session provider, not only bb:

- **One name, one meaning.** `sessionBackends` stays the kernel's built-ins. A
  supplied backend is a session provider in the manifest, the feature and inspect.
- **Mixed kernels only refuse.** The Desktop bundles its own kernel, so an older
  kernel meets provider homes. It refuses every session verb and retire there, and
  never acts on such a home through tmux. This is the refusal end of
  [an older host degrades with a warning](/nodes/oats-maintainer/decisions/an-older-host-degrades-with-a-warning.md):
  acting would be worse than today.
- **Delivery is accepted only in the agent's turn.** An input counts as
  submitted only when it reached the agent's turn. A queued or uncertain one
  leaves the mail unread: a duplicate is recoverable, a loss is not.
- **Mail never answers a pending interaction.** Input is refused while a
  permission prompt or question is open, so no mail can approve a permission.
- **Status words keep their tmux meaning.** Nothing is inferred
  ([instance activity is reported, not inferred](/nodes/oats-maintainer/decisions/instance-activity-is-reported-not-inferred.md)).
  A provider's error state is a lost session, never `shell`. Any input to it is a
  resume under the kernel's per-home, per-boot cap
  ([lost sessions resume locally](/nodes/oats-maintainer/decisions/lost-sessions-resume-locally-in-their-own-conversation.md)),
  and only `oats host run`'s own shutdown counts as a loss. A person's stop keeps
  the home down.
- **Endpoints stay local.** A provider's endpoint never leaves its host on a
  routed read, and neither it nor an `open` link holds a secret.
- **Refuse what cannot be carried.** A launch input the provider cannot carry,
  or that would be silently ineffective (another Claude configuration, an account
  choice, an executable), is refused and named, never dropped.
- **Sandbox allowances are derived and exact.** In a provider's sandboxed
  modes, the provider adds only what OATS's own operation needs. Each entry comes
  from recorded configuration, never from task text, mail or an agent, and is an
  exact host or path. Anything more is a person's launch configuration.

Evidence: OKF proposal from oats-maintainer/product-maintainer, 2026-11-19; notes/session-backends-are-capability-providers.md.
The decided text and both sides' answers are in the contract's mail rounds of
2026-11-19, routed through the lane:product maintainer of Joan's side. The
direction answer on the container image was given on oats-project/oats#1984.
