---
type: Lesson
title: Verification judgment for Desktop's privileged surfaces
description: Prove guards at real boundaries, include source-evaluating tests of main and renderer code, and contain native verification with enforced lifetime and output bounds rather than trusting test selection or a passing assertion.
about: [system/oats-desktop, workstream/coordination]
kind: lesson
id: ins-c2c8f7c69861
tags: [desktop, verification, security, review, testing-judgment, operator-safety, node-test, native-effects]
timestamp: 2026-11-06
---
# Lesson

Desktop's privileged surfaces — the loopback server, the main-process fetch
proxy, the guarded file viewers and terminal attach — repeatedly passed green
suites while the guard under test was inverted, unreachable or bypassed. In
every case the test had asserted a source string, or exercised a helper,
rather than the composition that carried the bug. Learned across review
rounds 2026-07-22 … 2026-07-25.

# The bar the expert holds reviewers to

1. **Drive the real boundary.** A guard is proven by a forged request
   arriving at the guarded surface and being refused with nothing crossing to
   the upstream side. Browser-grade `fetch` silently strips forbidden headers
   such as Host, so hostile cases must be sent raw; otherwise the "attack"
   arrives clean and a 403 assertion fails against a legitimate 200.
2. **Fail when the guard is removed.** Before a regression is accepted, the
   fix is mutated out — the guard, the ordering, the generation comparison —
   and the test must go red. A race test that survives its own guard's
   removal tests nothing; three security regressions once stayed green under
   reversion before this check was required. A race regression in particular
   needs two genuinely overlapping generations resolved out of order, not a
   sequence of settled requests.
3. **Test the layer that had the bug.** When a finding says "X happens in the
   wrong order in the composition root", a test of the helper it calls proves
   the helper, not the misordering. Code that cannot be extracted into a
   testable unit is where ordering bugs keep hiding; extraction is part of the
   fix, and the entry point should shrink to bindings so trivial that
   reverting them breaks an import.
4. **The scope ratchet.** Once a review round yields only test-strength
   findings (a test that does not fail under reversion, a fixture that does
   not actually hang), the loop has reached its natural end. Fix minimally,
   rescope re-review explicitly to product correctness and security, and stop
   adding speculative assertions. The operator stopped a five-round loop as
   excessive once it had become testing the tests (2026-07-24). Consumer-parity
   evidence — the published artifact behaving correctly — is a better
   late-slice confidence source than more unit tests.

# Additive acceptance is not operator-visible parity

Learned in the 2026-10-08 kernel-parity work: a kernel test can honestly prove
that Desktop accepts an additive JSON field while the operator sees none of
it. Allowlist projections rebuild known keys and silently omit the new one.
The source reports that `spawnInProgress` disappeared along that path, so an
in-progress spawn looked stopped and offered lifecycle actions, while the
retire receipt hid `spawnCompensation`. Parsing success was evidence of
non-rejection, not of a truthful display.

For each operator-relevant addition, trace the invocation and returned field
through every projection to the rendered state and available actions. Keep
the new field tolerant: an absent or malformed optional value drops that
field, not the whole document. Do not replace allowlisting with blind
passthrough to make parity tests green. Feature authority still comes from
[the kernel's declarations](../decisions/standalone-product-and-cli-authority.md).

The elimination route is composition-level regression coverage: carry a
representative kernel answer through the actual projections into the view,
assert the visible meaning and action availability, and cover absent and
malformed optional values. Such a test must fail if an intermediate
projection drops the field. Parser acceptance tests remain useful for
compatibility, but cannot stand in for that consumer proof. This is the
field-level form of the shell-reachability lesson below, not a permanent
inventory of projection function names.

# Launch diagnosis must reach the person's view

The source's 2026-11-06 investigation found a second gap beyond request
delivery: even proving that the renderer selected a roster row did not
explain a report that a launch appeared to do nothing. In its isolated Linux
packaged-AppImage probe, first and second launches selected the stopped row,
while the active instance stayed null and the main area remained on Workspace
overview. No notice appeared. These are source-reported observations, not a
reproduction of the original environment, which was no longer available.

For such a report, observe the selected row, main area, active terminal or
instance panel, and notices together at the packaged boundary. Request
delivery and selection alone cannot show whether the person reached the
content they expected. In this case the source attributed the mismatch to
D3's focus-only launch intent (the onboarding brief's Desktop launch
argument that only selects the named instance; it starts, attaches and
writes nothing): selecting a row did not expose the question displayed
above its terminal. That is diagnostic context, not a new launch
policy or approval to make a launch open a terminal. The proposed change to
running-instance behavior had no human decision in that earlier capture.
The later [launch-view decision](../decisions/launch-instance-opens-view-without-input-focus.md)
records source-reported human acceptance on 2026-11-06 and explicitly
supersedes D3's select-only/no-attach condition for running local instances:
open the terminal view without taking keyboard focus. Non-running rows stay
select-only. The old condition above is historical context, not the current
running-row rule; the diagnostic lesson still holds.

The elimination route is a packaged-launch regression that asserts those
visible outcomes together for first launch and handoff to an existing app,
using an isolated disposable CI environment. Make the expected outcome
explicit from the accepted product contract; a test cannot decide whether
focus-only behavior meets the intended experience. Retain the distinction
between a stopped-row probe and untested running-row behavior. Existing
native-verification containment and operator-machine restrictions still apply.

## A process listing does not settle an argv hypothesis

The same proposal reports that Linux `/proc/<pid>/cmdline` showed switches
ahead of loose values and prompted a parsing theory. That observation alone
did not establish what the first launch parsed or what a later launch handed
to the existing app. Before changing accepted argument forms or adding a
parser workaround, capture the actual arguments and parsed launch target at
the relevant main-process entry and compare them with the rendered outcome.
Keep first launch and second-instance handoff separate in that evidence. A
handoff can reach an older running app, so first establish
[the running version](check-running-version-before-debugging-behaviour.md).

This retains the source's diagnostic caution, not its stronger explanation
of Chromium process-title rewriting or a guarantee that first-launch argv
is unchanged: the captured note supplies no argument trace establishing
those mechanisms. Parser-entry diagnostics and corresponding packaged
regressions are the elimination route; a permanent log's presence or release
status must be checked in the current implementation.

Evidence: OKF proposal from oats-desktop-expert/desktop-platforms-expert, 2026-11-06; notes/launch-instance-is-focus-only.md.

The note backs the visible-state investigation; the process-listing caution
comes from the proposal. The source identifies
[CI run 42270573051](https://github.com/oats-project/oats/actions/runs/42270573051)
and [oats-project/oats#1757](https://github.com/oats-project/oats/pull/1757)
as investigation and diagnostic work. This harvest did not rerun the probe,
audit those changes or verify the source-reported D3 acceptance in
[oats-project/oats#1665](https://github.com/oats-project/oats/issues/1665).

Maintainer check (2026-11-06, review of oats-knowledge#321): #1665 is an
issue, the onboarding brief of record, not a pull request. Its comments
state D3 as a launch argument that only selects, and record the lane's
acceptance of D3 with lane:product's conditions; the record shows that, not
that a human typed it. This lesson cites D3 as diagnostic context and
supersedes nothing. The cited run succeeded, and #1757 merged on 2026-11-06
after capture; neither its log's presence in a release nor the probe's
result was checked by this review.

# Source-evaluating tests include renderer modules, not only main

Learned 2026-10-08: developer review and expert verification both missed a
failure that CI caught when a `main.mjs` block gained a new dependency.
Some tests slice the Electron entry point as text and execute blocks in
`node:vm` with hand-built contexts. A newly referenced symbol can be absent
from that context, making the block throw and the test fail far from the
change; helper-module tests do not exercise that seam.

The 2026-10-14 finding broadens this lesson's earlier main-process-only
scope. A renderer mutation test rebuilt `createTerminalTab` from source
with a hand-listed dependency object. A new module-scope import was absent
from that object, so the mutated copy threw before reaching its intended
assertion. Developer review, reviewer and expert verification missed it;
CI exposed the fixture failure. A red mutation run caused by a missing
dependency is not evidence that the intended guard was challenged.

This is verification debt, not a preferred testing architecture. The first
elimination route is point 3 above: extract logic into importable modules,
shrink entry points to bindings, and mutate through injected dependencies
rather than evaluating source text with a second hand-maintained scope.
Extraction alone does not close the seam if a test still rebuilds the
extracted renderer function as text. Until eliminated, a change to a
source-evaluated module, especially a new module-scope symbol, must inventory
its source readers and their evaluation contexts and include those tests in
permitted verification. Discover the current readers rather than preserving
a fixed file list or count. The generalist's
[affected-test inventory lesson](/nodes/oats-expert/lessons/check-affected-test-inventory-at-handback.md)
owns the handback coverage check; this section owns the specific VM-context
debt. The isolation rules below still apply: required coverage is not
permission to run native effects on the operator's machine.

# Operator-machine safety is part of verification judgment

Two separate incidents (2026-07-24) hung an operator's laptop with dozens of
packaged Desktop processes: a headless parity driver whose cleanup missed
detached descendants, and an orphaned smoke runner whose apps kept respawning
their bundled servers faster than one-shot kills. Process-group reaping is a
CI-harness requirement, not a licence to launch locally. The standing rule:

- Never launch the packaged GUI app from an agent session on an operator
  machine, headless or offscreen included. Packaged launch smoke belongs in
  CI on throwaway runners. Local evidence is static artifact checks, the
  loopback server run directly under plain Node, or at most one app instance
  the operator launches and closes.
- Never kill by application or process name machine-wide; scope destructive
  cleanup to an exact PID, an owned path, or an exact anchored multiplexer
  target. A terminal viewer only ever detaches its own client. A fix on main
  does not protect a stale worktree still running the old code.
- Quit callbacks and signal handlers cannot establish child-server lifetime
  across crashes or SIGKILL. The 2026-10-08
  [owner-lifetime decision](../decisions/bundled-server-owner-lifetime.md)
  replaces this lesson's earlier signal-handler remedy. Its no-child-signal
  rule governs application shutdown; scoped process-group reaping in a
  throwaway CI harness is a different authority, not an app cleanup strategy.

## A passing live terminal check can still exhaust the host

The source reports a distinct 2026-10-14 incident: a live tmux attach check
passed, but its `script` capture remained running and accumulated enough
output to exhaust host resources; systemd-oomd killed the developer's
session. Finishing the assertion was not finishing the experiment. An
isolated tmux server prevents session interference, not resource exhaustion.

Prefer recorded streams and injected fakes. When a live tmux/PTY check is
otherwise authorized, enforce both a hard lifetime deadline and a reader
that stops at a fixed byte budget, then verify by the exact owned PIDs that
its capture/client processes have ended. A time limit alone does not bound
high-rate output, and a byte limit alone does not end an idle producer.
Neither permission to run nor authority to kill unrelated processes follows
from these bounds; the packaged-app prohibition and native-effect isolation
rules remain unchanged.

The elimination route is a bounded capture harness that owns its processes,
enforces both limits and proves teardown on success, timeout and early
reader termination. This is a required protection, not a claim that such a
harness already ships. The kernel's
[bounded-fixture lesson](/nodes/oats-kernel-expert/lessons/narrow-race-evidence-needs-unpaused-controls.md#bound-the-experiment-not-just-the-last-cleanup)
owns the general experimental-resource principle; the added Desktop lesson
is that live terminal evidence can leave a growing capture after a passing
check. A reminder to clean up afterwards does not enforce either bound.

## Agent-free fixtures can prove Desktop input arrival

The source's 2026-10-27 workspace-switch check found a way to exercise real
focus and PTY input without running agents or using the operator's deployment:
two disposable deployments, each with a directory-mode fixture soul whose
launch executable runs `cat`. A bare shell was a misleading substitute: the
kernel correctly classified it as a shell rather than a running harness, so
Desktop offered Start instead of a terminal. The need to establish the
[intended runtime state](/nodes/oats-expert/lessons/real-terminal-waits-prove-the-observed-state.md)
is already canonical; `cat` is the reported Desktop fixture that stayed
eligible, not a change to the kernel's liveness rule or proof of bounded
teardown.

The useful verification choices were:

- Isolate HOME, XDG storage and OATS_HOME_DIR, with a private tmux server and
  Desktop user-data directory; select the test CLI and a dedicated Desktop
  port rather than inherit the operator's instance or tmux selectors. This
  applies [runner-owned isolation](/nodes/oats-expert/lessons/automatic-per-user-writes-need-runner-isolation.md),
  not a second policy for personal storage. The sweep finding below makes
  this an operator-session safety boundary, not just fixture hygiene.
- Budget the **complete socket path**, not just the temporary directory.
  The source's long scratch path exceeded its Unix socket limit; a short,
  private TMUX_TMPDIR worked. Shortening must still preserve
  [fixture cleanup evidence](/nodes/oats-kernel-expert/decisions/fixture-tmux-directory-preserves-cleanup-evidence.md),
  not move the socket beyond the runner's ownership or leftover guard.
- The reported check used unpackaged Electron with its own user-data
  directory, loopback-only CDP and a pre-seeded disposable workspace set.
  Drive actual input through CDP, then check a distinct typed marker in the
  intended pane using `tmux capture-pane` on the private socket. A DOM focus
  assertion or a successful input dispatch alone does not prove PTY arrival.

This is evidence of a feasible fixture, **not permission to launch Electron**.
The packaged-app prohibition, actual lane restrictions and authorized-run
boundary above remain unchanged; an unpackaged build is not a workaround for
a lane that forbids Electron itself. Isolation also does not replace hard
lifetime and output bounds or verified owned-process teardown. Window
closure or loss of OS focus interrupts the intended check; that step must
not count as successful evidence or by itself identify a product defect.
Re-establish the intended view and focus before drawing a conclusion.

The elimination route is a reusable, effect-isolated integration harness that
owns fixture launches, private storage/socket paths, marker assertions and
bounded teardown. Test the runtime eligibility and path-budget failures in
that harness instead of relying on a remembered manual recipe. Exact launch
flags, file formats and setup steps belong in repository verification code
and guidance, not a second operational runbook here. No such harness or skill
change is claimed by this harvest.

### A private socket does not isolate a client-triggered machine sweep

The source's later 2026-10-27 check exposed a stronger reason for the private
homes above. With a client that invokes the machine session-resume sweep,
a private TMUX_TMPDIR and Electron profile do not isolate the **inventory
being swept**. A plan run with only a private socket directory still found
the operator's deployments. Their homes were already running; no operator
restart was observed. The hazard is that an eligible lost operator session
could instead start on the probe's private server, outside the operator's
usual view. A private socket can hide interference rather than prevent it.

The reported mechanism crossed two storage boundaries: the deployments
list, seen-running history and sweep lock used OATS_HOME_DIR, while the
list's first-use legacy import consulted HOME independently. Redirecting
only one home therefore did not establish isolation. Nor did the reported
`fromEnv` launch-value digest check cover TMUX_TMPDIR: launch-value fidelity
was not a substitute for isolating the probe's inventory and server.

For an otherwise authorized Desktop or TUI probe, keep HOME, OATS_HOME_DIR
and TMUX_TMPDIR private **for the client and every command that builds,
starts or reads its fixture**, alongside the XDG/profile isolation above.
Open only fixture deployments, but do not mistake that selection for sweep
scope: the [recovery decision](/nodes/oats-maintainer/decisions/lost-sessions-resume-locally-in-their-own-conversation.md)
intentionally sweeps the machine inventory, not just open views. Stop
fixture instances through their lifecycle before removing their private
server, so cleanup records intentional stops rather than apparent losses.

A sweep `--plan` is not a harmless way to inspect the operator's environment.
The source reports that it started nothing but persisted seen-running
history while listing. Inspect only the probe's own machine state; a
no-start guarantee is not a no-write guarantee. This finding changes no
recovery trigger, eligibility or launch-environment policy, and grants no
permission to launch Electron or inspect the operator's sessions.

Extend the integration-harness elimination route above to enforce one
private environment across the whole fixture lifecycle. Regress the legacy
import and plan-write cases using disposable surrogate operator state, and
assert that only fixture deployments are discovered and acted on. The
existing generalist isolation lesson owns the broader runner obligation;
this refinement preserves the discovered client-sweep hazard and why socket
and profile isolation alone were insufficient. The operational rule, with
its exact environment, fixture and cleanup steps, now lives in the
repository's `electron-live-verification` skill ("Keep the probe off the
operator's sessions too", awebai/oats#1585); that skill is authoritative for
how, and this lesson keeps why. No completed harness coverage is claimed.

# Linux can exercise the packaged shell in CI

Learned 2026-10-09: the source reports that the existing packaged-app smoke's
launch phase ran under `xvfb-run` on a hosted Ubuntu runner and reached the
shell. A workflow that skips GUI launch on every platform must not be read
as proof that CI cannot exercise the renderer. Its macOS window-server
rationale does not establish a Linux limitation. For a packaged path, CSP or
import-map question, a throwaway Linux runner can supply runtime evidence
without launching on an operator's machine.

The observation was one launch of the **unpacked packaged app**, not the
AppImage's own launcher. Reaching the shell proves the shell's static module
graph loaded; it does not exercise on-demand views and says nothing about a
macOS window. Do not generalize one passing launch to all renderer paths or
runner configurations. This supplied the renderer-side evidence for the
[shared-code packaging decision](../decisions/shared-code-keeps-one-relative-path.md).

The elimination route is a permanent Linux packaged-launch gate in installer
and release workflows, with scoped CI cleanup and assertions for the paths
whose loading matters. The source recommended that change to maintainers;
this lesson does not assert it was adopted. Static artifact checks remain
useful but cannot substitute for execution of the packaged renderer. The
operator-machine prohibition above is unchanged.

# Selecting tests is not isolating their effects

Learned 2026-09-24 during terminal-ownership qualification. Desktop's suites
mix inert cases with live multiplexer and PTY cases, so which tests run is an
operator-safety question. The Node test runner matches `--test-name-pattern`
against the full test name, ancestors included, not the short label a
reporter prints. A negative-lookahead filter meant as "everything except the
live tmux cases" therefore selected and ran them, a PTY test among them. The
green result and a log named "pure" proved neither what ran nor that nothing
native happened.

- **A name pattern is a positive allowlist, not an exclusion.** Exclusion uses
  the runner's explicit skip pattern. Neither flag is an authorization or
  effect-isolation boundary, just as pinned file globs bound discovery but
  not the effects inside a file they select.
- **Isolation precedes execution.** If native work is forbidden, a mixed
  module is not loaded against real process and PTY dependencies at all. The
  elimination route is separate inert entrypoints with injected effects, with
  native cases confined to authorised CI or operator-owned acceptance jobs. A
  pre-dispatch tripwire may supplement it, but only if it covers direct,
  synchronous and promisified process calls. Live multiplexer tests run
  against an isolated server socket, never the operator's own server.
- **Read the actual selection before calling a run inert.** Check the
  reporter's selected names and counts. Checking afterwards is an audit, not
  prevention; it cannot undo a side effect.
- **On an unexpected native case, stop and report.** Preserve the truthful
  output. Do not re-run to explain the filter, and do not clean up
  speculatively. A similar session name or a present key table is not
  evidence of test residue, and establishing provenance and current use
  belongs to an authorised owner. Attribute any inspection of operator state
  to whoever actually made it. Closing the incident does not make the run a
  native acceptance of the reviewed head.

# A surface ships — or leaves — at the shell

Learned 2026-07-22 … 2026-07-25. A fully tested view was unreachable because
the production shell kept its own navigation list and special-cased the
route; module tests could not see it. A view is delivered only when a
shell-level test proves a user can reach it: the rail reads one importable
navigation manifest, every entry loads a mount-exporting module, and the
shared renderer harness is checked by enumerating every shipped view rather
than a hand-kept list, so the next view fails until it is wired. Removal is
the same property inverted. A removed or rolled-back surface leaves tendrils
in route families, harness tabs, styles, docs, every test root and the
user-facing recovery copy (one fallback still sent users to the view the same
change deleted), so a removal is an inventory, pinned by absence tests that
also assert one kept surface so they cannot pass on an empty scan, and the
reachability suite is inverted rather than deleted.

## Presentation removal includes reader states and suppression bookkeeping

The 2026-10-27 notice-cleanup finding extends the removal inventory beyond
renderers and words. A shared reader can retain distinctions that existed
only to decide whether or what to present, while repeat-suppression records
can look like control safeguards after their presentation has gone. Keeping
them without checking leaves a dormant mechanism; deleting them by their
names alone does not establish unchanged behavior.

Before removing such bookkeeping, establish **which copy of the answer each
control decision reads**: settlement, release and re-run decisions may use
the run's answer or a filtered presentation copy. If filtering only serves
the removed presentation and no remaining consumer needs it, remove the
suppression and presentation-only reader states with that surface. If a
control decision consumes the filtered copy, the bookkeeping is behavior:
retain it unless a separate behavior change is intended and reviewed. A
client's silence alone does not establish that a shared reader has no other
consumer.

The source reports that its feared re-settlement risk was resolved by this
trace: the suppression filtered only the reader's presentation input, while
settlement and completion used the unfiltered answer. The useful lesson is
where to establish the no-behavior-change claim, not a permanent map of those
functions. It applies the generalist's
[shared-behavior inventory](/nodes/oats-expert/lessons/enumerate-what-a-removed-behaviour-held-up.md)
to the boundary between presentation and control; the existing
[Desktop no-notice decision](../decisions/machine-notices-are-action-free-and-outcome-driven.md)
remains the product authority. This adds no TUI presentation decision or
change to recovery policy.

The elimination route is removal of unused distinctions and bookkeeping,
with regressions at the seam they occupied: the reader receives the run's
own answer, a repeated item still drives control as before, and an answer
containing only repeats still completes. Those cases preserve the former
control behavior rather than merely assert that the old notice words are
absent. They do not authorize deleting suppression whose control role has
not been established.

## Establish shipped reach before escalating a duplicated rule

The 2026-10-15 spawn extraction supplied the reverse counterexample: two
renderer rules disagreed, but the source found that the packaged shell always
supplied the store, leaving the dialog's alternate runner reachable only in
the view harness and tests. Reconciling those rules did not change what a
shipped user saw. The source reports that the maintainer consequently treated
that reconciliation as internal, without a release-note entry.

Before presenting duplicated behavior as a product decision, establish which
copy each shipped path reaches under its actual dependency wiring. A harness
can make a fallback look like a second product path; its existence and tests
do not establish user-visible disagreement. Conversely, no release note for
this reconciliation was not a finding that the whole extraction was inert:
[spawn session isolation](../decisions/preview-bounded-spawn-outcomes.md#a-separate-session-does-not-remove-spawns-deadline)
was a separate behavior change. Release scope follows the actual effect, not
the umbrella refactor's name.

The elimination route is one shared rule where possible, plus composition
coverage using the shipped dependency configuration. Test-only fallback
coverage should be identified as such. Keep the reachability check as
judgment before escalation, not a permanent map of renderer call sites or a
blanket exemption from release notes.

# Elimination route

Individual traps belong in tests and harness structure in the repository;
many here already have that protection. The source-slicing seam remains
explicit debt until entry-point logic is importable. What stays knowledge
is the judgment: which evidence counts, when a review loop is over, and what
may not be run on a human's machine.

# Related

[Delayed timing controls](slow-the-suspected-step-on-ci.md) applies the mutation-proof
bar to a rare terminal wait: deliberately slow the suspected step to expose
missed dependants and incomplete fixes, then measure ordinary timing margins
separately from the forced failure.

[Blocked live verification needs an owned handback](blocked-live-verification-needs-an-owned-handback.md)
records who carries the remaining evidence when an agent cannot launch the
app; it does not waive live acceptance or the safety rules above.

[Signal tests must contain even regressed cleanup](signal-tests-must-contain-regressed-cleanup.md)
adds the reparenting hazard: a test-owned child can acquire a foreign parent,
so signal tests and their negative controls need a runner/namespace boundary
and teardown that remains contained when the tested script regresses.

[Platform-keyed tests and native baselines](platform-keyed-tests-need-explicit-platforms.md)
adds the client-platform diagnosis case: explicit policy fixtures do not
replace whole-surface evidence on the OS whose real processes fail.

[The loopback interface is Desktop's trust boundary](../decisions/loopback-trust-boundary-and-transport-simplicity.md);
[Workspace admission is privileged and transactional](../decisions/privileged-workspace-admission.md);
[Async completion must still own the user's intent](asynchronous-intent-and-truthful-outcomes.md);
[Terminal tabs are viewers, not session owners](../decisions/terminal-viewers-not-session-owners.md).

# Citations

Evidence: OKF proposal from oats-desktop-expert/resume-notice-cleanup-expert, 2026-10-27; notes/removal-includes-presentation-only-reader-state.md; notes/answered-sweep-is-one-reading.md.

For the presentation-removal refinement, the source identifies
[awebai/oats#1605](https://github.com/awebai/oats/pull/1605), unmerged when
proposed, and reports the response-copy trace and three seam regressions.
This is one source-reported case, not an implementation audit or test run by
this harvest. No live run was made or claimed; no merge, shipment or broader
absence of control effects is inferred.

Evidence: OKF proposal from oats-desktop-expert/test-desktop-sweep-expert, 2026-10-27; notes/test-desktop-needs-private-home-and-oats-home.md.

For the sweep-isolation refinement, the source identifies
[awebai/oats#1585](https://github.com/awebai/oats/pull/1585), checking the client
sweep in [#1564](https://github.com/awebai/oats/pull/1564) over the kernel work
in [#1563](https://github.com/awebai/oats/pull/1563). It reports one Linux run
under Xvfb/X11 with private homes, a private socket and a guarded CLI wrapper:
only the fixture deployment was swept, its stand-in returned `fresh` on that
socket, the operator's window count was unchanged, and no probe window
reached the operator's compositor. These are source-reported observations,
not checks rerun by this harvest. They do not prove an operator-session
restart, conversation resumption with a real harness, macOS behavior or
complete host containment. The unsafe plan's history write is evidence of
the hazard, not a recommended experiment or cleanup procedure.

Evidence: OKF proposal from oats-desktop-expert/workspace-switch-focus-expert, 2026-10-27; notes/live-desktop-fixture-without-agents.md.

For the agent-free fixture finding, the proposal reports live click-switch,
previous/next and wrap checks of [awebai/oats#1560](https://github.com/awebai/oats/pull/1560).
Roster-row restoration was not checked live. Test-window closures on a shared
desktop had no established cause; no window-manager or operator attribution
is promoted. These are source-reported results, not a run by this harvest or
proof of packaged-app, cross-platform or every focus-path behavior.

1. Migrated from agents/oats-desktop-engineer/soul/knowledge @ 7838d3ca.
2. Migrated from agents/oats-desktop-engineer/soul/knowledge/lessons/shell-nav-reachability-manifest.md, shared-renderer-harness-enumeration-test.md, dormant-surface-removal-inventory.md, scope-rollback-absence-pins.md and agents/oats-expert/soul/knowledge/lessons/surface-removal-inventory-user-guidance.md @ 7838d3ca.

Evidence: OKF proposal from oats-desktop-expert/oats-desktop-expert-cursor-flicker, 2026-10-14; notes/renderer-source-slicing-deps.md; notes/live-tmux-checks-bounded.md. The source identifies the renderer fixture failure in [awebai/oats#1196](https://github.com/awebai/oats/pull/1196), [CI run 38605929920](https://github.com/awebai/oats/actions/runs/38605929920), and the capture incident during [#1193](https://github.com/awebai/oats/issues/1193). These are source-reported observations; this harvest did not rerun the tests or reproduce the host failure.

Evidence: OKF proposal from oats-desktop-expert/oats-desktop-expert-desktop-backlog, 2026-10-08; notes/main-mjs-source-tests.md; notes/698-server-owner-lifeline.md. The source records the missed VM-context dependency and CI failure in [awebai/oats#806](https://github.com/awebai/oats/pull/806); this harvest did not rerun the suite.

Evidence: OKF proposal from oats-desktop-expert/oats-desktop-expert-desktop-parity-049, 2026-10-08; notes/long-spawn-transport-decision.md. The source reports the additive-field display failures in the parity work associated with [awebai/oats#815](https://github.com/awebai/oats/pull/815) and [#819](https://github.com/awebai/oats/pull/819). This harvest did not audit those implementations; the composition-test guidance is the elimination route, not a claim that every seam already has coverage.

Evidence: OKF proposal from oats-desktop-expert/oats-desktop-expert-tui-readers, 2026-10-09; notes/packaged-window-launch-on-linux-ci.md; notes/spike-verdict-extraction-first.md. The source records one successful Linux launch in [Build Installers run 37978310828, job 113982106046](https://github.com/awebai/oats/actions/runs/37978310828/job/113982106046), from the unmerged spike [awebai/oats#857](https://github.com/awebai/oats/pull/857) at `f6d0ed7d`. This harvest did not rerun the launch. This later observation narrows the earlier packaging note's assumption that renderer reach had only static evidence in CI.

Evidence: OKF proposal from oats-desktop-expert/oats-desktop-expert-client-spawn, 2026-10-15; notes/a-renderer-copy-the-packaged-app-never-runs.md. The source identifies the reachability finding and internal-change disposition in [awebai/oats#855, comment 6191749055](https://github.com/awebai/oats/issues/855#issuecomment-6191749055), during the spawn extraction reported in [#1241](https://github.com/awebai/oats/pull/1241). Reachability and maintainer disposition are source-reported; this harvest did not inspect the implementation or run the packaged app.
