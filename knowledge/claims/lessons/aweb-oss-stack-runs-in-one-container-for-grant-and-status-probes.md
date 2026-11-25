---
type: Lesson
title: aweb's open-source stack runs as plain processes in one container, enough to try a grant seat and the status publisher with no account
description: A probe of GLOBAL grant seats or of `oats aweb health` needs no hosted account or anyone's credentials; postgres, redis, awid and the aweb server run in one container, identities are made as the provider's real-stack journey test makes them, and the custody and wake broker are run by hand where there is no systemd.
about: [workstream/provider-integration]
kind: lesson
id: ins-eef48e72a4f7
tags: [aweb, probe, grant-seat, health-publisher, container]
timestamp: 2026-11-25
---

# What was observed

oats.aweb's README documents the route with Docker: its real-stack journey test (`test/resident-journey.test.mjs`)
runs against `docker compose -f docker-compose.e2e.yml up … postgres redis awid aweb` from an aweb checkout, and loads
its custody unit through systemd --user or launchd. A probe in a container with neither Docker nor a per-user service
manager found the same stack and seats work without them:

- The four services the journey test uses (postgres, redis, awid, aweb; the compose file's fifth, `library`, is not
  needed) ran as plain processes inside one container: distribution postgres and redis, `uv sync --frozen --no-dev` in
  `awid/` and `server/` with the repository's layout kept (`naapp-lib/` beside them), then `awid` and `aweb serve` on
  loopback with the compose file's environment and one public origin each.
- A GLOBAL identity was made as the journey test makes one: `aw id create --skip-dns-verify`, a team, `add-member`,
  `fetch-cert`, `aw init`. A second identity in the same namespace worked from the same user home, so one deployment
  can hold a minting root for LOCAL seats and a resident for grant seats.
- Without a per-user service manager `oats aweb resident create` cannot install its custody unit, and refuses when a
  custody already runs. `aw custody serve` in the resident's directory, `aw wake run` with `AW_WAKE_OATS_BIN`, and the
  `residents` setting written by hand stood in; seats then spawned, received, sent, renewed and retired as on a host.
- `oats aweb health publish` run by hand performs a tick without the host timer, once `enable` has recorded the setting.

# What it changes

- "Needs a real aweb account" is not a reason to leave a grant-seat or publisher question unprobed, and neither is a
  container without Docker or systemd. What the stack cannot show is hosted behaviour: an API-key init, the dashboard,
  a customer-held team.
- With session delivery, every home (tmux too) read `degraded` / `oats.receive_unproven` from about 30 seconds after
  the broker's last inspection of it, and `yes` just after a start: compare a provider's rows with a tmux control in
  the same deployment before calling a difference the provider's. The cause was later traced to the broker's
  inspection cadence: see [the freshness-check lesson](/claims/lessons/a-freshness-check-ages-against-the-cadence-its-producer-actually-has.md).

# Citations

1. Evidence: OKF proposal from oats-engineering-expert/kp-parity-facts-probe, 2026-11-25;
   notes/oss-aweb-stack-in-one-container.md. Container runs on 2026-11-25 (oats.aweb 1.49.1, aw 1.36.59, OATS 0.70.5);
   their outputs are the source's report and were not reproduced at maintainer review.
2. Read at maintainer review, 2026-11-25: awebai/oats-aweb `README.md` (the journey test's compose command and its
   custody unit through launchd or systemd --user), `test/resident-journey.test.mjs` (`aw id create … --skip-dns-verify`,
   `id team add-member`, `id team fetch-cert`, `init`) and `docs/wake-service.md` (`AW_WAKE_OATS_BIN`); awebai/aweb
   `docker-compose.e2e.yml` (postgres, redis, awid, aweb and library services); the `oats.receive_unproven` row in
   oats-aweb's `lib/health-vocabulary.mjs`.
