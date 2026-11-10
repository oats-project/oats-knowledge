---
type: Decision
title: Harnesses start natively; OATS contributes skills and instructions and sandboxes nothing
description: Every harness (pi, Claude Code, Codex) starts with its own discovery, settings and permissions intact; OATS copies the resolved capability skills where the harness already looks and composes AGENTS.md, and adds permission-bypass flags only on an explicit yolo opt-in.
about: [system/oats-kernel]
id: dec-291b1999eb38
tags: [kernel, runtime, harnesses, claude-code, codex, pi, curriculum, permissions, supersession]
timestamp: 2026-09-18
---
# Decision

OATS is a **skill contributor, not a skill sandbox**. Every harness starts in
the instance home the way it starts anywhere: its own skill and context
discovery, settings, plugins, profiles and authentication stay in force. OATS
copies each resolved capability's skills into `<home>/.agents/skills/` (with
the `.claude/skills` and `CLAUDE.md` aliases) and composes `AGENTS.md`; that
is the whole of its contribution to what the agent sees.

# How it got here

1. **2026-07-26, universal strict curriculum.** The founder set an
   exclusive, OATS-only visible context as the target for every harness,
   with the test "two runtimes, an unrelated ancestor skill present, both see
   exactly the recorded set". Pi met it through a strict launch profile;
   Claude Code only approximately, through setting-source exclusion and
   ancestor suppression. The Claude probes (Claude Code 2.1.220, 2026-07-27)
   showed why that was fragile: authentication is bound to the config
   directory, so an isolated config home forces copying credentials; restoring
   the project source re-admits ancestor skills (not fail-closed); no flag
   adds a skills directory, and a session-only plugin namespaces skills,
   breaking literal `/skill` references; the bare mode silently switches to
   API-key-only auth.
2. **2026-09-18, human decision: Claude Code and Codex launch natively.**
   Native context there is expected, not a failed check; strict visibility
   became a Pi-profile claim only.
3. **2026-09-23, workspace model v2: Pi starts natively too.**
   Ambient-skill exclusion was removed for every harness. The reason is the
   trust model: suppression defended against content that membership now
   trusts, since a repository's committed `.agents/skills/` is exactly as
   trusted as its committed capabilities
   ([workspace model v2](/nodes/oats-maintainer/decisions/workspace-model-v2.md)).

Do not rebuild isolation adapters (per-instance config homes, HOME or profile
swaps, exclusion lists) to recover exclusivity; each was an option of the
retired route, and the [native authentication boundary](harness-native-authentication.md)
forbids the credential copying they require.

# What still holds

- **The OATS-managed set is exact and fails closed.** Two composed skills
  with one name are a spawn error naming both capabilities
  (`E_SKILL_DUPLICATE`); materialization is a transaction; `instance.json`
  records what was supplied. That is provenance of the OATS-managed subset,
  never a claim that everything visible inside the harness came from OATS.
  A composed skill versus an ambient one is the harness's own precedence.
- **Permission bypass is explicit opt-in.** OATS adds Claude Code's
  skip-permissions flag or Codex's `--yolo` (plus trust for the home) only
  when `--yolo` or a launch configuration's `yolo` asks. An unattended or
  scheduled launch is not consent, a missing setting is not "true", and
  `--no-yolo` removes only the flags OATS added; native settings stay.
- **Mainstream compatibility.** A spawn is never refused because a
  repository legitimately carries its own skills or instruction files.
- **Positioning.** "No skill noise" describes the OATS-composed selection,
  never the harness's whole visible context. Adapter tests verify what OATS
  composes for that harness, not an exclusivity it no longer claims.

# Launch argv is a per-harness contract (2026-08-13)

Native launch still means OATS writes each harness's command line, and two
facts from a Claude spawn that died before its session started (a blank
pane) hold for every harness:

- **The task is protected from contributed flags.** A capability's launch
  hook contributed a variadic Claude flag that swallowed the following task
  prompt as one more entry. Claude and Codex therefore get `--` before the
  task; pi has no `--`, so its task positional goes ahead of contributed
  options. A regression pins the rendered command shape, separator
  included, not merely the presence of the hook's arguments.
- **Model preferences are translated per harness, never passed raw.** A
  soul's pi-style `provider/id[:thinking]` preference reached Claude verbatim
  and was rejected at launch. For Claude, `anthropic/…` entries become the
  bare id and other providers' entries are dropped; Codex keeps only its own
  providers' ids; nothing usable means no `--model`, so the harness chooses
  its own default. The Desktop's model input stays free text; translation is
  the launcher's job.

# Related

[Report-only prompt recognition may use derived labels](report-only-prompt-recognition-may-use-derived-labels.md)
keeps its no-input evidence bar separate from captured full-screen gates for
keystrokes. [Resume selectors and notices are execution-only](resume-selector-and-notice-are-execution-only.md)
explains why a lost-session launch must not persist conversation-specific
arguments into later ordinary starts.

[Per-agent scopes are probe-guarded and execution-only](agent-scopes-are-probe-guarded-and-execution-only.md)
records resource-placement tradeoffs, not a skill sandbox or a change to native
settings. [A native start belongs to the launch, not each rendering of its command](/nodes/oats-kernel-expert/lessons/native-start-is-prepared-once-per-launch.md)
records why re-rendering must not allocate another recording receipt.

[Spawn probe telemetry can masquerade as Git cost](/nodes/oats-kernel-expert/lessons/spawn-probe-cost-is-claude-telemetry-flush.md)
records why the probe's telemetry optimization must not leak into the launch
environment; it does not change native-launch policy.

[The pi fresh-home signal comes from runtime sessions](pi-fresh-home-uses-runtime-sessions.md)
records why the startup resume nudge uses incarnation-filtered runtime history,
not provider prose, a home marker or kernel launch counts.

[A provider-declared launch variable is the provider's to decide](declared-launch-variable-is-the-providers.md)
records why an omitted declared name is removed at the launch boundary rather
than inherited; this is not general isolation of native harness settings.

[Pre-answer first-run offers through home-scoped native settings](first-run-offers-use-home-scoped-settings.md)
records a project scalar that can outrank a user-level preference through
Claude's own precedence. It is agent-lane direction, not a supersession of
this decision, and no human acceptance of that cost is recorded.

[Package probes must see the configuration used by the launch](package-probes-must-see-the-launch-configuration.md)
records why launch-config args are refused beside a package requirement. Its
operator-chosen `CLAUDE_CONFIG_DIR` route is a native choice, not an isolation
adapter of the kind forbidden above.

[The trust writer refuses metadata it cannot preserve](trust-writer-refuses-unpreserved-metadata.md)
records why a metadata-preservation refusal keeps atomic replacement intact
and directs trust acceptance through the harness's own dialog.

[Keep kernel responsibilities generic and capability runtimes complete](kernel-and-capability-responsibility.md);
[Harness authentication is native and user-managed](harness-native-authentication.md).

# Current contracts

- [Current execution-targets.md](https://github.com/awebai/oats/blob/main/docs/execution-targets.md)
- [Current souls-and-instances.md](https://github.com/awebai/oats/blob/main/docs/souls-and-instances.md#the-harness-starts-normally)
- [Simplified workspace model, "The harness starts normally" (superseded record)](https://github.com/awebai/oats/blob/7838d3ca70772f63854b198601fbc45437c2e999/docs/design/2026-09-23-simplified-workspace-model.md)

# Citations

1. Migrated from agents/oats-expert/soul/knowledge and agents/cli-dev/soul/knowledge @ 7838d3ca (claude-codex-native-launch, strict-instance-curriculum, claude-strict-launch-setting-sources, claude-project-skill-discovery-root-bound).
2. Migrated from agents/oats-desktop-engineer/soul/knowledge/lessons/claude-launch-argv-model-translation.md @ 7838d3ca.
