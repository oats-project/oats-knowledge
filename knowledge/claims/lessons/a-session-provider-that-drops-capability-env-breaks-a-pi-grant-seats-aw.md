---
type: Lesson
title: A session provider that drops a capability's launch env breaks plain aw in a pi grant seat
description: On bb a GLOBAL grant seat launches, receives its resident's mail through the host wake broker, renews at restart and revokes at retire, but a pi seat cannot act as the resident with plain aw, because the provider leaves AWEB_IDENTITY_HOME out of a pi thread and a grant seat's identity directory is not the one aw finds by working directory.
about: [workstream/provider-integration]
kind: lesson
id: ins-4028633378ab
tags: [bb, pi, grant-seat, aweb, session-provider, launch-env]
timestamp: 2026-11-25
---

# What was observed

oats.bb 0.4.0, oats.aweb 1.49.1, aw 1.36.59, OATS 0.70.5, bb-app 0.50.1, against aweb's open-source stack, with one
resident and its custody served by hand.

- `oats spawn … --backend bb --provider oats.aweb identity.mode=global --provider oats.aweb identity.resident=<name>`
  minted a grant and launched, for a pi soul and for a Claude soul. Mail to the resident arrived in each seat's bb
  thread as one turn within about two seconds, also when the thread's harness was not loaded (after a bb restart).
  A restart re-minted and revoked the old grant; a retire revoked the grant and archived the thread.
- The Claude seat's commands carried `AWEB_IDENTITY_HOME`, `AWEB_DELIVERY` and `AWID_REGISTRY_URL`, and plain `aw whoami`
  and `aw mail reply` acted as the resident.
- The pi seat's commands carried only `OATS_INSTANCE`, `OATS_INSTANCE_HOME` and bb's own variables. Plain `aw` answered
  "current directory is not initialized for aw": a grant seat's identity is `<home>/.aweb-identity`, which aw finds only
  through `AWEB_IDENTITY_HOME` or `--identity-home`, while a LOCAL seat's `<home>/.aw` is found by directory. With either
  of the two, the same commands worked. The seat's briefing and the broker's mail event both name plain `aw`.

# What it changes

- oats.bb's README says that, with a capability's env left out for pi, "`aw` works from the home all the same: it finds
  the home's identity by the directory it runs in". That holds for LOCAL seats only; do not rely on it for a grant seat.
  aw's lookup order is already recorded in
  [an unreleased aweb member certificate stays usable](/claims/lessons/an-unreleased-aweb-member-certificate-stays-usable-and-only-its-controller-revokes-it.md)
  (`ins-6d11c20a36b9`), and the grant home's location in
  [how oats.aweb attaches a grant home to custody](/nodes/oats-aweb-expert/references/how-a-grant-home-is-attached-to-custody.md)
  (`ref-deac1bd686b4`).
- A provider that cannot pass a capability's env to a harness must either pass the non-secret names a capability needs
  (here a path and a URL) or the capability must write an instruction that needs none of them. The fix is open in
  [oats-project/oats-bb#87](https://github.com/oats-project/oats-bb/issues/87); when it lands, this lesson is
  superseded or narrowed.
- When qualifying a session provider with a messaging capability, try every identity mode per harness with a command
  run by the agent's own tool: a spawn that succeeds and a delivered wake prove receiving, not sending.

# Citations

1. Evidence: OKF proposal from oats-engineering-expert/kp-parity-facts-probe, 2026-11-25;
   notes/bb-pi-grant-seat-plain-aw-fails.md. Container probe on 2026-11-25; its outputs are the source's report and
   were not reproduced at maintainer review.
2. Read at maintainer review, 2026-11-25: oats-project/oats-bb at `1b197fe` (0.4.0): `README.md` (a pi launch carries
   `OATS_INSTANCE`, `OATS_INSTANCE_HOME` and `PATH` only, and a capability's `AWEB_IDENTITY_HOME` is left out) and
   `oats-package/capabilities/oats-bb/lib/project-env.mjs` (`piLaunchEnv` skips every `capability`-sourced entry);
   [oats-project/oats-bb#87](https://github.com/oats-project/oats-bb/issues/87), open, which reports the same probe.
