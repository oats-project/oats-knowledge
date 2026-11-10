---
type: Decision
title: The messaging integration's readiness reports the host wake daemon's version, read from the daemon's own status answer
description: Because the host wake daemon is a long-running process whose version the PATH floor gate cannot see, readiness asks the daemon for its version through its status command and compares it with the client floor, reporting an outdated or stopped daemon as a problem and an unknown version as a warning; no process inspection. A missing wake is diagnosed from the daemon's own log, never from its status rows.
about: [workstream/provider-integration, workstream/messaging]
id: dec-665fafcba485
tags: [decision, integrations, messaging, wake, readiness, grants, versioning, diagnostics]
timestamp: 2026-09-25
---

Decided 2026-09-25 by the integrations lane with the framework lead and the
messaging service; implemented in oats.aweb and current in 1.16.1.

# Context

A hosted grant rehearsal registered a grant identity home with the host's
wake broker and it never woke. The broker's status row read active with no
pending hints and no attempt, and the first report blamed the server. The
daemon's own service log said otherwise: a stream-unavailable line for the
grant home every ten seconds, "directory not initialized". The daemon was an
older client binary a service manager had started weeks earlier; the newer
client on PATH, which the launch hook used to pass the floor, mint and send,
read the same home without complaint. (The service later found that no client
release of that date streamed grant homes at all, so a restart alone would
not have fixed it.)

The provider's floor gate checks the client on PATH. Nothing checked the
daemon, whose status answer reported a pid but no version.

# Options

1. Resolve the daemon's executable from its pid and run its version command:
   exact, but platform-specific; the pid may be a service-manager wrapper, a
   shim or a symlinked cache.
2. Have the service add a version to the daemon's status answer and compare
   it with the floor: exact, portable, and owned by the party that knows what
   the daemon can do.
3. Only document "restart the daemon after upgrading": cheapest, and silent
   for every operator who misses the note.

# Decision

Option 2, with option 3's upgrade step in release notes. The daemon's status
answer carries `daemon_version`, `daemon_commit` and `daemon_version_state`
(`reported`, `unknown`, `not_running`). When the home's delivery relies on the
broker (oats.aweb: `delivery: session`), readiness reads it and reports:

- `reported` below the floor: problem `wake-daemon-outdated`, naming running
  and required versions and "upgrade, then restart the daemon";
- `not_running`: problem `wake-daemon-not-running`;
- `unknown` or no answer: warning `wake-daemon-version-unknown`
  (compatibility unproven, not a claim about any specific version).

No process inspection. The wake floor is an exported constant; in oats.aweb
1.16.1 it is the single client floor `AW_MIN` (aw 1.36.13), which replaced
the separate custody and wake floors of earlier releases.

# Diagnosing a missing wake

- A status row proves absence of delivery, never its cause. Before attributing
  a missing wake to the server, read the daemon's log for the home's identity
  path: stream-connected versus stream-unavailable lines.
- The daemon's version is that of the binary its service manager started, not
  the client on PATH. A wake report records the daemon's pid, binary, version
  and start time, and no positive wake claim is written until the leg is rerun
  after a daemon restart.
