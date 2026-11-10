---
type: Decision
title: A human addresses a long-lived agent through threads that are aweb conversations; the soul declares an interaction kind in its messaging settings
description: Keep the deferred aweb-conversation design and current one-input-surface rule, with a later thread-inbox vision of curated mail and chat for depth as a design criterion after coordination rather than authorization to resume the build.
about: [workstream/oats-direction, system/oats-desktop, workstream/messaging]
id: dec-eb583151ef8c
tags: [desktop, messaging, aweb, threads, human-interaction, soul-settings, direction, deferred]
timestamp: 2026-11-02
---
# Status: deferred, not reversed (2026-10-26)

The lane's human cancelled the initiative for now on 2026-10-26, the same day
the direction was decided, after the design record had passed review and
stage 1 (the `interaction` setting and brief text in oats.aweb) had merged
unreleased. **Nothing is built or released**: the design record
([awebai/oats#1538](https://github.com/awebai/oats/issues/1538)) was closed at
the reviewed head, and a plain revert of stage 1 (awebai/oats-aweb#154) was
opened (awebai/oats-aweb#156) before any oats.aweb release, so that no release
ships a setting whose promised behaviour does not exist. At review on
2026-10-26 the revert was still open and no oats.aweb tag contained stage 1;
if oats.aweb is released before the revert merges, that release carries an
`interaction` setting that does nothing. Until the effort resumes:

- the human-accepted 2026-07-22 **one input surface** rule in
  [terminal tabs are viewers, not session owners](/nodes/oats-desktop-expert/decisions/terminal-viewers-not-session-owners.md)
  **is in effect** for every soul; Desktop implements it and nothing else;
- no soul sets `settings.oats.aweb.interaction: threads`, no Desktop thread
  view or inbox panel is built, and no one-line wake is shipped;
- the release lane's human's approval of the direction is **history**, not a
  current instruction to build.

The direction below is kept as the design to resume from, and its coherence
rules keep their value. **Resumption point** (source-reported): reopen the
design record at its closed head; redo stage 1 from the reverted diff; stage 2
waits on aweb's read-only conversation listing, accepted by the aweb project
as a non-acking read over the existing endpoint, while a non-acking
*presentation* (a wake that does not ack) waits on aweb's own design, because
presentation's ack is what stops redelivery and what session recovery relies
on. Whether the effort resumes is unknown. Resuming is the lane's human's
call, as cancelling was.

# Roadmap refinement: the human's inbox is threads (2026-11-02)

The source reports Pepe's direction that agents reach the human by mail,
with each inbox entry a thread of curated HTML or Markdown for a decision or
for visibility, and chat available for deeper discussion. This is a design
criterion for coordination and messaging: do not make that interaction model
impossible. The intended delivery follows the new coordination; it is **not
a dependency that blocks coordination**, a shipped feature, or a request to
resume the deferred implementation now.

This refines the design to resume from, not its current deferral. It is
compatible with a [front door that introduces an owner without brokering
every later message](/nodes/oats-maintainer/decisions/front-door-routes-and-introduces.md).
The current input-surface rule, messaging ownership, human-identity custody
and bilateral contract gates remain. In particular, future inbox visibility
is not an immediate replacement for the existing
[action-required lifecycle communication policy](/nodes/oats-maintainer/stewardship/coordination-policy-lives-in-capabilities.md#human-communication-is-for-required-action-2026-10-28).
A future change to that operating policy must name its scope and acceptance;
this roadmap supplies neither a new notification duty nor a second channel.

**Owner: oats-maintainer. Update-on-change:** when the human accepts a changed
inbox direction or resumes the build, update this dated refinement and its
status in the same session, preserving the earlier decision and any explicit
supersession. The delivery sequence alone does not establish resumption.

Acceptance is **source-reported**: Pepe in the coordination-rethink lead's
session on 2026-11-02, relayed to the source maintainer by that lead in mail
83131d00 that day. Neither the session nor the mail was inspected; no
completed implementation, release or trial is established.

Evidence: OKF proposal from oats-maintainer/release-maintainer-pepe,
2026-11-02; notes/thread-inbox-vision.md.

# Decision (2026-10-26; deferred the same day, see above)

Decided on 2026-10-26 by the lane's human (the shape, A–D below) and
confirmed the same day by the release lane's human, with the coherence
conditions below, on [awebai/oats#1103](https://github.com/awebai/oats/issues/1103).
The effort was launched and then paused the same day; the one merged stage
is being reverted, so there is no implementation to read as evidence.

- **A.** A human may address an agent through **threads** in Desktop, as an
  alternative to typing into the agent's terminal.
- **B.** Each thread is an **aweb mail conversation** between the human's own
  identity and the agent, rendered per instance. A **read-only mail panel**
  shows the agent's inbox.
- **C.** A soul declares **how it is addressed** with a small semantic field,
  not a layout: `settings.oats.aweb.interaction: terminal | threads`
  (default `terminal`). For `threads` souls the in-session wake is **one
  line** naming the recovery command, not the message body.
- **D.** First cut: Desktop only, the two predefined kinds, read-only inbox
  panel. Custom per-soul UIs are deferred.

The field name may still change in the spec, and the custody design for the
human identity (condition 2) was not decided when this was recorded.

# Why the terminal cannot carry this

The one-input-surface rule was taken for short-lived agents. A role that
carries several efforts at once (a maintainer, a lead) gets every feature,
every mail and every answer in one linear harness transcript. That transcript
cannot be made threaded by OATS: harnesses
[start natively](/nodes/oats-kernel-expert/decisions/harness-native-launch.md)
and OATS owns nothing inside them. A threaded view is therefore a layer
**beside** the terminal, never inside it.

# Why aweb conversations and not a new mechanism

aweb mail already has conversation ids and in-thread replies, every instance
already holds an identity, and the maintainer already tracks one effort per
row: one thread per effort is one conversation per effort. A Desktop-native
conversation store would be a second messaging channel with a second identity
story, which the direction gate refuses (no second way to do what the project
does one way).

# Coherence rules that hold whatever is built

1. **The interaction field lives in the messaging capability's soul
   settings** (`settings.oats.aweb.interaction`), never as a top-level kernel
   key. Threads exist only with a messaging capability, so a kernel key would
   import a messaging concept into the kernel contract. The provider validates
   the field and injects the agent behaviour; the composed instance record
   exposes it to clients. A top-level key is admissible only if it is defined
   capability-neutrally with a defined, refused meaning under `messaging: none`.
   This follows the existing split: the
   [messaging capability owns provider behaviour](/nodes/oats-kernel-expert/decisions/messaging-capability-owns-provider-behaviour.md)
   and [runtime, messaging and viewers have separate owners](/nodes/oats-maintainer/decisions/runtime-messaging-viewer-ownership.md).
2. **Desktop reads threads and the inbox through a capability JSON verb**,
   never by parsing `.aw` state
   ([the installed CLI is the model Desktop renders](/nodes/oats-desktop-expert/decisions/standalone-product-and-cli-authority.md)).
   Reading is observation: the panel never marks read, acks or replies as the
   agent; the agent consumes its own mail under its own identity. Reading
   without acking needs an `aw` read guaranteed not to ack, and the spec names
   that command and version.
3. **The human sends as the human's own identity**, never as the agent. A
   human identity used by Desktop is a new custody and trust contract (where
   the signing key lives, who unlocks it, what a remote Desktop may do); the
   spec decides it with the aweb side **before any code signs as a human**.
4. **The one-line wake is a messaging-capability delivery-contract change**:
   its own oats.aweb release and notes, the full-body wake kept for `terminal`
   souls, the line naming the recovery command.
5. Layout, panels and custom views stay client-side. A per-soul custom UI is a
   Desktop plugin contract, out of scope for the first cut.

# Rejected alternatives

- **Making the harness transcript threaded**: not ours to change (native
  launch).
- **A Desktop chat composer typing into the terminal**: that is the 2026-07-22
  one-input surface, still linear.
- **UI layout keys in `soul.yaml`**: presentation leaking into the kernel
  contract, which stays runtime- and client-neutral.
- **A Desktop-native conversation store**: a second messaging channel.

# What this would supersede, once resumed and built

When built, this supersedes, for souls that declare `threads`, the
human-accepted 2026-07-22 **one input surface** rule and the 2026-07-17 **the
app is the human's window, the messaging layer is the agents' channel**
position recorded in
[terminal tabs are viewers, not session owners](/nodes/oats-desktop-expert/decisions/terminal-viewers-not-session-owners.md).
The 2026-07-22 rule was the release lane's human's own direction, so only that
human supersedes it, and approved the direction on 2026-10-26. **With the
effort deferred the same day, that supersession is not in effect**: the
2026-07-22 rule stands for every soul, and the Desktop expert's concept
rightly still states it. Terminal souls keep the one input surface in any
case; the viewer-not-owner rule for terminals is untouched. The Desktop
expert's node owns that concept and records any future supersession there.

# Citations

Evidence: OKF proposal from oats-maintainer/oats-threaded-agent-ux-maintainer,
2026-10-26; notes/threaded-human-channel-direction.md. The note records the
analysis offered to the lane's human before the decision, the four answers,
and the release lane's coherence read (verified aweb mail, 2026-10-26) whose
conditions became rules 1–4 above. The source reports the release lane's
human's confirmation in a comment on
[awebai/oats#1103](https://github.com/awebai/oats/issues/1103). Acceptance,
the launched effort and the sequencing condition (nothing lands on main before
the pending release tag; one second reader per PR) are source-reported, not
independently verified by this harvest.

Deferral: OKF proposal from oats-maintainer/oats-threaded-agent-ux-maintainer,
2026-10-26 (second proposal, after the cancellation);
notes/threaded-channel-deferred.md and
notes/threaded-human-channel-direction.md. The source reports the lane's
human's cancellation in session on 2026-10-26, the release lane's request to
record the deferral (verified aweb mail, 2026-10-26), the closing of
awebai/oats#1538 after its review, the merge of awebai/oats-aweb#154 and its
revert in awebai/oats-aweb#156 (merge pending when proposed), and the aweb
project's acceptance of a read-only conversation listing. None of it is
independently verified by this harvest. The knowledge maintainer's review
(2026-10-26) verified on GitHub: the lane's human closed awebai/oats#1538 at
14:07Z on 2026-10-26 with a comment cancelling the initiative for now and
noting it can be reopened at the reviewed head; awebai/oats-aweb#154 merged at
13:30Z; awebai/oats-aweb#156 was open, unmerged, with the same human as
author; the latest oats.aweb tag (v1.31.0, 2026-10-23) predates #154.
