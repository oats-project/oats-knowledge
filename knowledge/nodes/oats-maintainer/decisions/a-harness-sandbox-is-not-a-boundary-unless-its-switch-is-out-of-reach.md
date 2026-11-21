---
type: Decision
title: A harness sandbox in a provider home is not a security boundary unless the agent cannot switch it off
description: OATS judges what a sandboxed agent can reach by one rule (nothing the agent can write is run, or read as configuration, outside its sandbox), builds the defences that rule asks for, and says bb's sandboxed modes would limit accidents only, because the agent can leave the sandbox and no provider can stop it; since a probe found the sandbox holds the shell only, no sandboxed mode is offered at all, and the provider's refusal lifts only by a later amendment that brings the hardened-host probe's receipts, the kernel's own module copy released and the defences in place; for a provider home the kernel runs only its own copy of the modules, kept outside the home, never a copy it checked in the home.
about: [workstream/oats-direction, system/oats-kernel, workstream/provider-integration]
id: dec-375435ce318a
tags: [security, sandbox, sessions, backends, bb, capabilities, rejected-alternatives]
timestamp: 2026-11-21
---
# Decision

Decided on 2026-11-20 by Pepe's side and Juan's side together, as part of the
[session-provider contract](/nodes/oats-maintainer/decisions/session-backends-are-a-kernel-contract-a-capability-implements.md),
for a session provider that runs its harness in a sandbox (bb's `auto` and
`accept-edits` modes are the first case). The agreement is source-reported:
both sides' answers were relayed by their maintainers, and no forge record of
them was read at review. It settles the point that contract left open (the
shape of a provider's sandbox allowances) within the rule the contract had
already decided: only the provider writes them, only exact hosts and paths
derived from recorded configuration, never more than the same launch gets on
tmux. One later point (the home's instruction files, below) was decided by
Pepe's side alone, under the delegation for Joan's bb work.

**The rule.** Nothing the agent can write is run, or read as configuration,
outside its sandbox. A new path is judged by this rule, never only by a list
of known paths.

**What the rule asks for.**

- The provider denies the agent's writes to what runs or configures outside
  the sandbox: the home's module copies and instance record, the harness's
  own settings and server definitions (in the home, in its ancestors and in
  the OS user's harness configuration), the identity's key files, the home's
  instruction files, and the
  work trees' git configuration and hooks. It rewrites that block from the
  deployment's configuration at every launch and never reads what the home
  holds.
- For every provider home, whatever its current mode, the kernel runs only
  its **own copy** of the home's modules, kept **outside** the home, and
  takes the home's capability settings and hook commands from the record it
  keeps there too (see "The kernel runs its own copy", below, which replaced
  the digest check first recorded here). A home whose kernel copy is missing
  reads as unavailable, never as stopped. A tmux home is unchanged: its agent
  already runs unsandboxed as the operator's user and can do directly anything
  a tampered module could, so the rule would promise nothing there.
- What the sandbox may reach (hosts, writable paths) is resolved at every
  launch from the deployment's configuration by an offline read, never from
  the home. A start needs no network that a tmux start does not. Hosts come
  only from the home's messaging, knowledge and tasks providers, by a
  reviewed manifest line; paths are the kernel's.
- Every git the kernel or a client runs over a provider home's trees ignores
  the tree's own monitor and hooks settings.

**What it does not buy.** These defences hold from inside the sandbox. The
first provider's harness lets a command ask to run unsandboxed, and in the
source's probes nothing the provider could write turned that off: in one mode
only the harness's own classifier stands in the way, in the other a person's
approved prompt. An unsandboxed command then writes past the deny rules. The
harness's documentation lets a closing value set on its command line or in
its managed policy hold; under bb the command line's settings block is the
launcher's own
([Claude Code's sandbox widens by exact entries](/claims/lessons/claude-codes-sandbox-widens-by-exact-entries-but-has-four-traps.md),
`ins-56c00f906965`), so the route left is the operator-level managed policy,
and OATS never writes that policy.

So the documentation says, permanently, that these modes limit accidents, not
a determined agent, and are not a security boundary between an agent and the
operator's account.

**The sandbox holds the shell only** (probed and decided 2026-11-20, after the
first record of this decision, by Pepe's side through the release lane;
source-reported). The first record assumed a sandboxed agent could write its
home and the allowed paths and nothing else, and several defences leaned on
"recorded outside the home". A probe in a disposable container, with a mock
model, withdrew that premise:

- The operating-system sandbox confined shell commands. The harness's own
  file tools were held only by deny rules, and with the listed deny set they
  wrote the deployment's configuration, the session receipt, the lock, a
  module in the store, another instance's home and the OS user's shell
  start-up file, which then ran unsandboxed at the next shell call.
- A tool the launcher pre-allows moved the session's working directory out of
  the home, after which the home's settings, deny rules and sandbox block no
  longer loaded.
- No deny pattern covers "everything outside the home". The harness has a
  default-deny setting for file-tool writes outside the working directory,
  and it held; it does not limit shell commands or the launcher's tools.

What follows. The deny rule adds that default-deny setting and a deny of the
directory-moving tool, and the provider's contract test pins the list of tools
the launcher pre-allows, so a new one is a decision before it ships. The
earlier exception for a host hardened by its operator's managed policy is
withdrawn until a probe shows, with every one of these settings in that
managed policy, that neither route gets out. Until then a provider home runs
only in the harness's unsandboxed mode, which claims no boundary in the docs
or in readiness (refined below: the probe alone no longer lifts this; see "What
lifts the unsandboxed-only rule"). "Recorded outside the home" protects nothing by itself: each
such record is safe only as far as every write path of the harness is shown
closed to it.

**What lifts the unsandboxed-only rule (refined 2026-11-20).** The release lane
read "full mode only" strictly, for Pepe's side: no sandboxed mode is offered at
all, not even one documented as limiting accidents only. A sandboxed mode
offered beside full mode would read as the safer choice while it has measured
escapes, and nothing needs it yet. The provider keeps refusing every launch that
is not unsandboxed. It may ship the defences the rule asks for behind that
refusal, unreachable and tested. Lifting the refusal is a later amendment,
brought to Pepe's side with three things in hand:
1. the hardened-host probe's receipts, showing that neither route gets out;
2. the kernel's own module copy released (first recorded as the
   module-digest check; see "The kernel runs its own copy"), so that no
   provider home exists before it;
3. the default-deny setting, the deny of the directory-moving tool, the pinned
   list of pre-allowed tools, and readiness reporting a home sandboxed only
   when both settings are present.
This supersedes in part the condition above, under which a probe alone lifted
the unsandboxed-only rule. The decision is **source-reported**: the release
lane gave Pepe's side's answer under
[Joan's bb effort is pre-approved on Pepe's side](/nodes/oats-maintainer/decisions/joans-bb-effort-is-pre-approved-on-pepes-side.md)
(`dec-155756953d6e`), which has the release lane give Pepe's side's contract
half for this work, and it was written into the session-provider contract's
text of record as an amendment. No forge record of it was found at review. The
merged provider (oats-project/oats-bb#3) refuses every launch that is not in
full mode, as this records (citation 5).

This supersedes in part the first record of this decision: its exception for
a host hardened by the operator's managed policy (kept, marked superseded,
under Rejected alternatives). The acceptance is **source-reported**: the
release lane's maintainer reported Pepe's side's decision to the source by
message on 2026-11-20, under
[Joan's bb effort is pre-approved on Pepe's side](/nodes/oats-maintainer/decisions/joans-bb-effort-is-pre-approved-on-pepes-side.md)
(`dec-155756953d6e`); no forge record of it was read at review, and the
probe is the contract specialist's report, not reproduced at review. The
harness's documentation, read at review, agrees on two points: its sandbox
covers shell commands only, its file tools following permission rules
instead; and it has a setting that makes the file-writing tools refuse paths
outside the working directories, unset by default (citation 4).

**The kernel runs its own copy** (decided 2026-11-20 and 2026-11-21 by Pepe's
side through the release lane, with Juan's side informed and its two points
taken). The acceptance is **source-reported (relay at
[the release lane's sign-off on oats#2048](https://github.com/oats-project/oats/pull/2048#issuecomment-7057379191))**:
it says the change builds the rule "as decided on Pepe's side", with Juan's
side's key shape, under
[Joan's bb effort is pre-approved on Pepe's side](/nodes/oats-maintainer/decisions/joans-bb-effort-is-pre-approved-on-pepes-side.md)
(`dec-155756953d6e`), which covers later changes to the session-provider
contract made for the bb work. The digest check above could not be made true. The
copy it checked is in the home, which the agent writes, so "hash, then run"
is a race: in the contract specialist's review a process that swapped a
provider script back and forth got its edited script run in 3 of 11 kernel
reads. The window is the command's start-up and, for a command that loads
other files of the copy, its whole run. What was decided instead:

- At a spawn, before the provider is asked anything and before any hook, the
  kernel makes its own copy of the home's modules outside the home, beside
  the home's session receipt. It runs every hook, provider command, readiness
  check and dispatched command of that home from there, and reads the
  manifests there. The copy in the home stays the agent's own.
- The receipt records which copy that is and the capability rows as the spawn
  resolved them from the deployment. The kernel reads settings and hook
  commands there, never from the home's record. The sandbox's allowances stay
  resolved live at each launch: settings have never reached a running home
  without an upgrade, allowances always have.
- An upgrade builds a new copy and names it, with its rows, in **one** write
  of the receipt; the pair it replaced is kept for an undo, and nothing is
  removed before a receipt write. An interrupted upgrade of such a home is
  not resumed, since its journal is in the home: the home is retired and
  spawned again. A retire removes the copies.
- Hooks find themselves by their location, so a path a hook hands the harness
  points into the kernel's copy. A provider that sandboxes keeps that copy
  readable and executable from the session, never writable, at that same
  path, or refuses to start the sandbox. This closed, with no change to the
  capability, an earlier finding that an agent could rewrite a script the
  harness then ran outside the sandbox.
- The kernel **tells** the provider which paths a sandboxed agent must never
  write (its own state beside the homes), in the launch input, and creates
  them first. The provider derives none of them from the home or from a
  naming convention.
- A status row of a provider home says which copy the kernel runs and
  whether the home's own record of its modules is the kernel's, from records
  alone. Whether the files differ is a diagnosis, reported by the readiness
  read only: an edit to the home's copy no longer changes what the kernel
  runs, and comparing trees on every status read costs too much.

Lifting the unsandboxed-only rule now also needs: every field of the home's
own record that still reaches a hook or the kernel outside the sandbox closed
or shown harmless; the kernel's state shown unwritable, and its module copy
readable and executable, from a sandbox at the paths hooks recorded; and a
dispatched command no longer taking the nearest home above its working
directory. Each is a filed issue (oats-project/oats#2046, #2047 and #2049).

**The home's instruction files are denied too** (decided 2026-11-20, after
the first record of this decision, by Pepe's side through the release lane,
on a point raised by Juan's side's maintainer). The acceptance is
**source-reported**: the release lane's maintainer reported it to the source
by message the same day, and the contract's specialist's finding that no
legitimate writer exists for these files is the source's report too; no forge
record of either was read at review. One side suffices because
[Joan's bb effort is pre-approved on Pepe's side](/nodes/oats-maintainer/decisions/joans-bb-effort-is-pre-approved-on-pepes-side.md)
(`dec-155756953d6e`) has the release lane give Pepe's side's contract half
for this work, without waiting on Juan's side. The files OATS composes from the soul, the task file the
kernel writes at spawn, and the harness's local memory file are all read at a
later launch. If that launch is unsandboxed, a file edited during a sandboxed
launch is read as configuration outside the sandbox, which is the rule's own
wording. No legitimate writer inside the agent's session exists for any of
them: an agent keeps its own memory in its state and notes files. Had one
existed, that file would stay writable and the documentation would say the
no-boundary statement covers it. This supersedes the earlier judgement in
this record that left those files writable as outside the rule (kept, marked
superseded, under Rejected alternatives).

# Why

A sandbox whose switch the sandboxed party can reach is a convenience. Calling
it a boundary would let an operator place trust in it that the code cannot
honour. The defences are still worth building: they stop accidents, and an
operator's own hardening could become a real boundary only with them in
place, which no probe has yet shown (see "The sandbox holds the shell only").

# Coherence rules a maintainer applies

- No change presents a harness sandbox as a boundary before the rule's
  defences are pinned by tests and the switch is shown to be out of the
  agent's reach.
- The first change that lets a sandboxed provider home exist carries the
  kernel's own module copy, or lands after it.
- A check of something the checked party can write, followed by its use, is
  a race for as long as the use lasts. Ask for a copy the party cannot
  write, not for a better check.
- The kernel names its own state to a provider; a provider that guesses a
  kernel path from the home or from a naming convention is returned.
- A probe with a mock model shows what the harness allows, not what a real
  model's classifier would refuse. Say which was run.
- A harness has several write paths (the shell, its file tools, a notebook
  tool, the launcher's own tools). Probe a sandbox claim on each path, and
  ask of every "outside the home" record which of them could still write it.

# Rejected alternatives

- **Recording the sandbox's allowances in the session receipt at spawn.** A
  second copy of reviewed configuration, and it would make the documented
  remedy (rerun the provider's setup) false for existing homes until a
  respawn.
- **Reading hosts or settings from the home.** The agent can write the home.
- **OATS writing the harness's managed policy.** It is the operator's machine
  policy; the docs name it as the operator's hardening.
- **Denying the home's own instruction files** (superseded 2026-11-20 by
  "The home's instruction files are denied too", above). First recorded as
  rejected because the harness reads them only inside the agent's own
  session, so they were judged outside the rule, and an agent was taken to
  keep its own notes there. A later unsandboxed launch reads them too, and
  the agent's notes live in its state and notes files.
- **A host hardened by its operator's managed policy as the one exception**
  (superseded 2026-11-20 by "The sandbox holds the shell only", above). First
  recorded as: the one exception to the no-boundary statement is a host whose
  operator set the managed policy, once the provider's contract test pins that
  hardened case, with readiness saying which case a host is in. Withdrawn
  because the probe found the file tools and a launcher-allowed tool get out
  of a home whatever closes the shell's switch.
- **Running the home's module copy when its digest matches a record outside
  the home** (superseded 2026-11-21 by "The kernel runs its own copy",
  above). First recorded as the rule: checked before every provider call,
  the deployment's lock or the receipt holding the digest. Withdrawn because
  the agent can exchange the copy between the hash and the run, and did in a
  review's test. Keeping it and documenting "holds for a copy at rest" would
  have left the hole open in the very case the rule is for.
- **Copying the module outside the home at every call, hashing and running
  that copy.** It keeps the old rule's words true, but breaks hooks that
  record their own location for the harness to run later.
- **A hook handing the harness the home's copy, with one variable for each
  copy.** Pepe's side's first answer, withdrawn the same day for Juan's
  side's wording: one copy that a sandbox keeps readable, executable and
  unwritable serves the kernel and the harness alike, so no second variable
  and no second path are needed.
- **A digest check for tmux homes.** It would read as an integrity guarantee
  the trust model does not give.

Exact keys, error codes and file names belong to the contract text and the
repository's documentation.

# Related

- [A session backend other than tmux is a session provider](/nodes/oats-maintainer/decisions/session-backends-are-a-kernel-contract-a-capability-implements.md)
  (`dec-faf9af131d69`): the contract this decision belongs to; its open
  point now links here.
- [Claude Code's sandbox widens by exact entries, with four traps](/claims/lessons/claude-codes-sandbox-widens-by-exact-entries-but-has-four-traps.md)
  (`ins-56c00f906965`) observed that a home's own harness settings can widen
  a launcher's sandbox; this decision is why a provider never reads them, and
  its traps (create directories first, keep the sandbox's git proxy, the
  advertised registry host) still apply to the allowances a provider writes.

# Citations

1. Evidence: OKF proposal from oats-maintainer/joan-product-maintainer,
   2026-11-20; notes/bb-backend-direction.md. The contract's revisions, both
   sides' answers and the four sandbox probes (three with a mock model) are
   the source's report; they were not reproduced at maintainer review.
2. Claude Code's sandboxing and settings documentation
   (code.claude.com/docs/en/sandboxing, code.claude.com/docs/en/settings),
   read at maintainer review 2026-11-20: the unsandboxed retry is disabled by
   `sandbox.allowUnsandboxedCommands: false`, and a `false` there in user
   settings, `--settings` or managed settings holds against a project's
   `true`; command-line settings rank below managed settings only.
3. Update of 2026-11-20 (the home's instruction files are denied): OKF
   proposal from oats-maintainer/joan-product-maintainer, 2026-11-20
   (oats-knowledge#426); notes/bb-backend-direction.md. The proposer's
   correction comment on oats-knowledge#425, read at review, states the same
   change; it is the source's own report, not a record of the decision.
4. Update of 2026-11-20 (the sandbox holds the shell only): OKF proposal
   from oats-maintainer/joan-product-maintainer, 2026-11-20
   (oats-knowledge#436); notes/bb-backend-direction.md. The probe (a
   disposable container, the launcher and harness at pinned versions, a mock
   model, one run per case and mode) and the decision are the source's
   report. Claude Code's sandboxing and settings documentation
   (code.claude.com/docs/en/sandboxing, code.claude.com/docs/en/settings),
   read at maintainer review 2026-11-20: the sandbox covers shell commands
   only and the file tools follow permission rules; a setting makes the
   write, edit and notebook-edit tools refuse paths outside the working
   directories, unset by default. No setting that stops the session moving
   its working directory was found in the pages read.
5. Update of 2026-11-20 (what lifts the unsandboxed-only rule): OKF
   proposal from oats-maintainer/release-maintainer, 2026-11-20
   (oats-knowledge#445); notes/bb-full-mode-only-reading.md. The release
   lane's answer and the contract amendment are the source's report. Checked
   at maintainer review 2026-11-20: oats-project/oats-bb#3 (merged
   2026-11-20) and its `lib/mode.mjs` on main refuse every launch that is not
   in bb's full mode (`E_BACKEND_SANDBOXED_MODE`), with nothing started.
6. Update of 2026-11-21 (the kernel runs its own copy): OKF proposal from
   oats-maintainer/joan-product-maintainer, 2026-11-21;
   notes/bb-backend-direction.md. The race, its 3-of-11 run and the release
   lane's answers are the source's report. The source read the change that
   builds it (oats-project/oats#2048, merged 2026-11-21) in full under `lib/`
   and `bin/`, and its tests by their names. Checked at maintainer review
   2026-11-21 (oats-knowledge#446): oats#2048 is merged and its description
   states the rule, the receipt's capability rows, the one receipt write per
   upgrade and no resume, `protected`, `moduleCopy` and `kernelCopies`, and the
   3-of-11 race as found in its first review round; the release lane's
   sign-off on it (the relay cited above) gives Pepe's side's yes to the rule
   and to the contract details; oats#2046, #2047 and #2049 are open. The
   code was not read at review.
