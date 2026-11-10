---
type: Lesson
title: "Respawn under 5.0 before harvesting" never carried a 4.x seat's notes
description: Respawn is retire-then-spawn, a record is never rewritten and the old notes survive only in the retirement recovery copy whose record carries the same removed 4.x keys, so respawn gives the soul a fresh 5.x seat with empty notes; the retired-source admission is the route to an old seat's notes, and hand-copying into a live 5.x seat that re-proposes under its own name is the only fallback.
about: [system/oats-okf]
kind: lesson
id: ins-f9d325bf7853
tags: [lesson, okf, harvest, retired-source, legacy, 4.x, respawn]
timestamp: 2026-11-06
---

The oats.okf 5.0.0 release
([PR 58](https://github.com/oats-project/oats-okf/pull/58)) told operators
that a 4.x home carrying explicit removed harvest keys "needs respawn before
5 harvest". Read against the 5.x gate, that route never reached the notes:

- A home's `instance.json` is never rewritten; respawn means retire, then
  spawn.
- The retired home's `notes/` survive only in the retirement recovery copy,
  and the harvester's retired-source path reads that copy's `instance.json`,
  which still records the removed keys (for example a host `harvest: on`),
  so the gate refused it with `E_SOURCE` just as it would the live home.
- The fresh 5.x seat of the soul starts with empty `notes/`.

So "respawn first" produces a new knowledge flow and strands the old notes.
This is why [issue 125](https://github.com/oats-project/oats-okf/issues/125)
was a real gap, not an operator error.

**What a future instance must do.** Never offer respawn as the route to an
old seat's notes. The route is the retired-source admission decided in
[a retired 4.x seat is harvested from its recovery](/nodes/oats-maintainer/decisions/a-retired-4x-seat-is-harvested-from-its-recovery.md)
and carried out as
[the package's retired 4.x source admission](/nodes/oats-okf-expert/decisions/retired-4x-host-harvest-keys-carry-no-authority.md):
retire the seat if it is still live, then propose from the recovery. That
route works only on an oats.okf release that ships the admission (on
2026-11-06 its build was still an open PR); check the installed version
before offering it. Re-proposing from a fresh 5.x seat was rejected as the
route in that decision. It remains only a fallback: copying the notes by
hand into a live 5.x seat of the same soul, which re-judges and re-proposes
them under its own name, at the provenance cost that implies (the harvest
then cites the copying seat, not the seat that learned the lesson).

Evidence: OKF proposal from oats-okf-expert/oats-okf-expert-retired-4x-harvest,
2026-11-06; notes/respawn-never-carried-4x-notes.md.
