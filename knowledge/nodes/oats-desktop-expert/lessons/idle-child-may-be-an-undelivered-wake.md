---
type: Lesson
title: An idle child may be an undelivered wake, not an idle agent
description: Under broker delivery, a child that stopped to wait on its coordinator's mail can stay idle because its broker registration never delivered; the coordinator checks the registration and nudges, and a wedged registration clears by re-registering, not by pause and resume.
about: [system/oats-desktop, workstream/messaging]
kind: lesson
id: ins-696e59aef3a1
tags: [coordination, messaging, wake, delivery, diagnostics]
timestamp: 2026-10-08
---
# What happened

Observed 2026-10-07/08 while coordinating Desktop developers under session
(broker) delivery. A developer finished a step, stopped to wait for its
expert's decision, and stayed idle. The expert's reply was sent, and so was
its reviewer's verdict. Neither ever reached its session. The human noticed
first ("they keep getting stuck"). The work moved only when the expert typed
a pointer into the child's session directly.

The broker's status for that home showed **positive evidence of a wedge**.
Its delivery child had no successful delivery ever, it was still waiting on
the pre-input safety inspect it started at spawn, and mail sat queued. The
same inspect answered in milliseconds when run by hand. Pausing and resuming
the home did not clear it. Deregistering and re-registering that one home,
with the same delivery settings, did: the first successful delivery followed
within seconds, and wakes worked from then on. A later child's registration
stayed pending with a runtime-authority mismatch at startup. It still read
its mail and later became active, so a pending startup error is not, by
itself, a wedge.

# Lesson

- **After mailing a child a decision it is waiting on, check that it moved.**
  A sent message is not a delivered one
  ([separate owners; a wake is a hint](/nodes/oats-maintainer/decisions/runtime-messaging-viewer-ownership.md)).
  Look at its terminal, or at the broker's status for its home.
- **A healthy-looking status row is not proof of delivery**: the daemon's log
  is the diagnosis
  ([readiness reports the wake daemon's version](/nodes/integrations-expert/decisions/the-messaging-integrations-readiness-reports-the-host-wake-daemons-version.md)).
  But a home with *no successful delivery ever*, stuck waiting on its first
  inspect, is positive evidence that its registration is wedged.
- **Fix the narrowest thing, with the human's consent.** Re-register only that
  home. Pause and resume did not help. Restarting the whole broker touches
  every instance on the host.
- **Brief children not to idle on mail:** if blocked, say so on screen, mail,
  and check the inbox yourself when an expected answer is late.

The broker fault itself belongs to the messaging service and its integration.
This lesson is the coordinator's side: notice early, and do not mistake an
undelivered wake for a finished or lazy agent.

# Related

- [Runtime, messaging and viewers have separate owners](/nodes/oats-maintainer/decisions/runtime-messaging-viewer-ownership.md)
- [The messaging integration's readiness reports the host wake daemon's version](/nodes/integrations-expert/decisions/the-messaging-integrations-readiness-reports-the-host-wake-daemons-version.md)

# Citations

1. Desktop expert's coordination, 2026-10-07/08: the broker status before and after re-registration, and the human's report that children kept stalling.
