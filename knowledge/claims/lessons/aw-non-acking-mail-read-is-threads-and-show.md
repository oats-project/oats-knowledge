---
type: Lesson
title: aw's non-acking mail read is mail threads plus mail show; the local interaction log is not a mail record
description: To observe an identity's mail, received and sent, without acknowledging it, use `aw mail threads` (aw 1.36.53+) and `aw mail show`, both server reads that ack nothing; `aw mail inbox` acks what it shows even with --show-all, and aw's local communication and interaction logs record received mail only when an acking aw verb (`aw mail inbox`, or a beads-mail or gc-mail read) presented it on that machine, so mail a channel delivers without them never appears there.
about: [workstream/messaging]
id: ins-7d4da5d8b923
kind: lesson
tags: [aweb, aw, mail, acknowledgement, desktop, read-only]
timestamp: 2026-11-19
---

# The claim

An observation-only read of an aweb identity's mail (what it received and what it
sent) is:

- `aw mail threads --json` (from aw 1.36.53): the identity's mail conversations,
  newest activity first, with unread counts. Its help says listing marks nothing
  read; it issues only a GET.
- `aw mail show --conversation-id <id> --json` for a conversation's messages, both
  directions, each with `read_at`, and `aw mail show --message-id <id>` for one
  message, including legacy mail without a conversation. Both are GETs; the server
  routes behind them only select.

What is **not** such a read:

- `aw mail inbox`, with or without `--show-all`: it acknowledges every unread
  message it presents. Only `--count-only` is read-only, and it yields a count.
- `aw mail reply`: it acknowledges the message it answers.
- aw's local logs (`aw log`, the per-identity communication log, the directory's
  interaction log): they are written only by aw CLI verbs run on that machine, and
  a received mail enters them only when an acking verb presented it: `aw mail
  inbox`, or the beads-mail and gc-mail delegates' verbs that mark a message read.
  Mail a channel delivers without them (the pi extension, for one, acks over HTTP
  itself and writes no aw log) never appears, so the log is partial and per
  machine.

Limits as of aw 1.36.58: these reads always hit the server (nothing complete is
offline); `mail show --conversation-id` returns the oldest messages (default 200,
cap 500), although the server route accepts newest-first paging that aw does not
yet use.

# Why it matters

A Desktop design assumed the interaction log was the non-acking source for an
agent's mail. It would have shown only a fraction of the mail, differently on each
machine, and a client reading `.aw` state breaks coherence rule 2 of
[humans address long-lived agents through threads](/nodes/oats-maintainer/decisions/humans-address-long-lived-agents-through-threads.md):
a client reads mail through a capability verb, which needs an aw read guaranteed
not to ack and names it. This claim names that read. A provider wrapping it must
call only these verbs (never `inbox` beyond the count, `reply`, `ack` or `send`).

This also supplies the supported inspection surface that
[a measurement must not change the state under test](/nodes/integrations-expert/lessons/a-measurement-must-not-change-the-state-under-test.md)
asks for: its 2026-10-30 remark that a non-acking conversation read was "not a
command available today" no longer holds from aw 1.36.53.

# Evidence

aw v1.36.58 source (commit a3223c1): `cmd/aw/mail.go` lines 704-720 (inbox acks
what it presents), 800-827 (inbox logs the received mail it presents), 882-960 (show),
1045-1075 (threads); `awid/mail.go` 703-776 (GET-only clients); `mail threads`
first tagged in v1.36.53. Received mail is also logged by the delegate read paths
(`cmd/aw/mail_delegate_participants.go` 148-164, called from
`cmd/aw/beads_mail_read.go` 264 and `cmd/aw/gc_mail_ops.go` 288, each paired
with an ack of that message). aweb server at ecb9d82: `routes/messages.py` 307-394
and 591-623 (select-only conversation and message reads). @awebai/pi 0.5.0 acks
delivered mail over HTTP (`POST /v1/messages/<id>/ack`) and writes no aw log (only
its own undelivered-message record). The source reports a check against the
probe's own identity: threads, log and the count answered without effect.

Checked by the knowledge maintainer at review on 2026-11-19 against aw at
`a3223c1` (v1.36.58), aweb at `ecb9d82` and the published @awebai/pi 0.5.0
bundle: every cited line supports the claim, except that the delegate read paths
above also log received mail, which narrowed "only `aw mail inbox`". No live
probe was repeated.

Evidence: OKF proposal from oats-engineering-expert/redesign-mail-read-probe, 2026-11-19; notes/aw-non-acking-mail-read.md.
