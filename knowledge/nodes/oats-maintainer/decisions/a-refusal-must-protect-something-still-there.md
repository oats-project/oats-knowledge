---
type: Decision
title: A refusal must protect something that is still there
description: A lifecycle refusal holds only while its guard, a live or unjudgeable process, exists. A debt alone (work still owed and recorded) never blocks an action; once the guard is gone the refusal releases and the debt stays readable in status and in the next start's refusal.
about: [workstream/oats-direction]
id: dec-5a823fc0fb82
tags: [lifecycle, refusal, retire, stop, supervisors, review]
timestamp: 2026-11-11
---
# The decision

Taken on 2026-11-11 (oats#1837, oats#1840), superseding the maintainer's own
first ruling on the same PR. A self-retire whose completion process was
killed leaves a pending marker. The first ruling kept `instance stop`
refusing such a home, so as not to change the documented `retiring` field
the Desktop reads.

The other side showed the cost: `oats host run` stops every running home on
SIGTERM, so every container stop would report a failed stop for that home,
and its harness would run on until the runtime killed it. A dead completion
carries no retire, so the refusal protected nothing. The stop now goes
through when the completion is gone, and `retiring` means a retire that is
being carried out. The debt is still recorded: the marker stays, status
reads `interrupted`, and `session start` refuses with the retire to run.

# The rule

Keep three things apart:

- **the debt:** work still owed, recorded where it can be read (status, a
  start refusal);
- **the guard:** a live process that must not be raced;
- **the block:** a refusal of an action.

Only a live or unjudgeable guard holds a block. A debt alone does not.

# Rejected

- **Keep the refusal and reword its message.** Supervisors would still fail
  on every shutdown, for no protection.

# Rule for review

When reviewing a refusal, ask what it protects and whether that process or
state still exists. Read the supervisors too: a refusal on stop is met by
whatever stops homes (`oats host run`, a parent's retire stopping its
children), not only by a person at the CLI.

# Evidence

Evidence: OKF proposal from oats-maintainer/product-maintainer-pepe,
2026-11-13; notes/a-refusal-must-protect-something-still-there.md. Pull
requests oats#1837 and oats#1840, 2026-11-11.
