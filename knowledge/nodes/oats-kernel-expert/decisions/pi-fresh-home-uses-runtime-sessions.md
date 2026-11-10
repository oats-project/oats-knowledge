---
type: Decision
title: The pi fresh-home signal comes from runtime sessions filtered to the incarnation
description: The pi bridge uses earlier filed sessions for the current home incarnation to gate its startup resume nudge, avoiding provider-template coupling, home markers and a new kernel-history dependency.
about: [system/oats-kernel]
id: dec-6e9d23cfcea0
tags: [kernel, runtime, pi, bridges, lifecycle, incarnation]
timestamp: 2026-10-15
---
# Decision and rationale

For the pi bridge's startup resume nudge, use pi's own persisted session
history as the signal that this home has worked. Do not infer it from
knowledge-provider prose, create a bridge marker in the home, or add a
kernel launch-history reader for this purpose.

The source reports that first launch and restart use the same launch argv,
so both reach pi as `startup`. Startup alone cannot distinguish a fresh
home. The selected signal is an earlier session file in the directory pi
reports for the current session, excluding the current session's own file,
with a header `cwd` matching the current cwd. When the home's birth time is
reliable, the earlier session's header timestamp must be at or after it.
The time boundary distinguishes incarnations, not just pathnames: pi groups
sessions by cwd, and a reused instance name can recreate the same path.

These constraints record why the signal was chosen; current implementation
details belong with the bridge and its tests. This is a resume-prompt
heuristic, not lifecycle authority or proof of successful task completion.

# Rejected alternatives

- **Knowledge-provider template text in STATE.md.** The old check silently
  inverted when providers seeded different text, giving fresh homes a
  resume nudge. Provider-authored content is not a stable runtime-history
  contract.
- **A bridge marker in the home.** A start marker records launch rather than
  work and changes retirement's preservation input. The general consequence
  and deferred declaration/test routes are canonical in [Bridge home markers
  change retirement](/nodes/oats-kernel-expert/lessons/bridge-home-markers-change-retirement.md).
- **Unfiltered pi history.** Matching cwd alone inherits the sessions of an
  earlier incarnation at the same address. The birth-time boundary is
  deliberate, not redundant filtering to remove during simplification.
- **The kernel events log's launch count.** A new bridge consumer would make
  that kernel surface a dependency to maintain. The current launch event
  also races pi startup, and a launch still does not prove work. Reuse the
  runtime's existing evidence rather than introduce that coupling for a
  prompt decision.

# Evidence limits and accepted approximation

The source's pi 0.80.3 `SessionManager` probe filed nothing after a user
message and filed a session after an assistant message; the header carried
the cwd. That supports the signal on the probed version, not a universal
claim that a filed session means an assistant turn completed.

The proposal corrects the older note's unqualified assistant-message rule:
the reviewer read pi 1.1/1.2 source as filing on **any message**. No pi 1.x
probe or test of that filing rule is reported. Under that behavior, a first
launch that submitted its task and died before any reply counts as having
worked on its next startup. Preserve this limitation rather than silently
promote the older note's stronger meaning.

The reused-name filter is unavailable when home birth time is unknown or
unreliable. The source specifically flags a zero birth time and libuv's
no-`statx` ctime fallback, including indistinguishable birthtime/ctime values
on second-granularity filesystems after a quick spawn. Without a reliable
birth time, earlier sessions at a reused path can satisfy the signal; the
chosen heuristic does not promise incarnation isolation on every host.

The regression route is to exercise fresh/restarted and reused-path cases,
current-file exclusion, cwd matching, reliable/unreliable birth time and
supported pi versions' actual filing behavior. This is an enforcement target,
not a claim that the supplied evidence proves that coverage already exists.

# Related

- [Resume lookup uses the recorded incarnation and exact home](/nodes/oats-kernel-expert/decisions/resume-lookup-uses-recorded-incarnation-and-exact-home.md) explains why recovery selection uses recorded creation time rather than this approximate birth-time signal; it does not change the bridge heuristic.
- [Pi bridge holds must not wait for their own run](/nodes/oats-kernel-expert/lessons/pi-bridge-holds-must-not-wait-for-their-own-run.md) distinguishes opening-task arrival from a welcome turn that makes the home appear healthy; it does not change this resume-nudge heuristic.
- [Native harness launch](/nodes/oats-kernel-expert/decisions/harness-native-launch.md) retains the runtime's own discovery and settings; this decision does not restore an isolated pi profile.
- [Kernel and capability responsibilities](/nodes/oats-kernel-expert/decisions/kernel-and-capability-responsibility.md) owns the generic boundary; the resume signal does not create a kernel knowledge-state convention.

# Citations

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-pi-fresh-state, 2026-10-15; notes/fresh-home-signal.md.

The source identifies [awebai/oats#1251](https://github.com/awebai/oats/issues/1251)
and [#1254](https://github.com/awebai/oats/pull/1254), reporting the latter
merged on 2026-10-15 at `990cc76b`. The named note supplies the initial
rationale and 0.80.3 probe; the proposal supplies the later pi-version and
birth-time qualifications. These are source-reported evidence, not an
implementation audit or repeated probe by this harvest. No explicit human
acceptance is supplied or inferred, and no accepted base decision is
superseded.

Verified by the knowledge maintainer at review of the harvest, 2026-10-15,
by reading [awebai/oats#1254](https://github.com/awebai/oats/pull/1254), its
discussion and the bridge at `990cc76b`; nothing was run. It merged on
2026-10-15 at `990cc76b` from head `398781d3`, with APPROVE verdicts from two
maintainer lanes posted as comments and CI reported green. Its diff changes
only the pi package: the startup nudge needs STATE.md to exist and an earlier
`*.jsonl` that is not the current file, has a `session` header with the
current cwd, and is timestamped at or after the home's birth time; a birth
time of 0 or equal to ctime turns that filter off. Its description rejects the
home marker and the kernel's launch count for the reasons above. Its tests
cover fresh and restarted homes, the current file, another cwd, an earlier
instance at the same path and pi 0.80.3's real `SessionManager`. The final
review notes that no test exercises pi 1.x's user-message filing and that
the reused-path tests skip where birth time equals ctime, so those two cases
remain the enforcement target above. The verdicts establish maintainer
review, not human acceptance.
