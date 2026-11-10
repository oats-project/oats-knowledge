---
type: Reference
title: What OATS borrowed and where it diverges
description: The open standards and prior art OATS built on (OKF, Agent Skills, agents.md, Pi packages, plugin marketplaces), what was taken from each, and where OATS deliberately departs.
about: [workstream/oats-direction]
id: ref-18ce652ae382
tags: [genealogy, standards, okf, skills, packages]
timestamp: 2026-07-26
---
# Why this is recorded

Code shows the formats OATS uses; it does not show why they were chosen, what
was taken from each source, or where OATS knowingly departs. That genealogy
prevents two mistakes: re-inventing a format the ecosystem already reads, and
"correcting" a deliberate divergence back toward the source. Recorded from the
pattern's first documentation (2026-07-08) and the distribution-package
decision (2026-07-26).

# Open Knowledge Format (OKF v0.1, Google Cloud)

Taken: knowledge as a directory of markdown concepts with frontmatter,
reserved `index.md`/`log.md`, links as untyped edges, progressive disclosure
from the index, permissive consumption (unknown types and broken links never
reject a bundle).

Divergences: the spec registers **no type vocabulary**, so OATS's types are
producer-defined — `Playbook`/`Reference` are spec-exampled, `Lesson`/
`Decision` inherited from community practice, role-grown types minted as
needed. The spec's reference agent produces *regenerable projections* of data
catalogs; OATS bundles are **original records** — same format, different
stakes, which is why OATS insists on provenance, supersession and honesty rules
the spec does not. The spec ships no agent guidance; the OKF craft OATS
teaches was distilled from community repositories (maintenance flows and log
conventions, supersede-with-provenance trust model, conformance-errors versus
producer-lints), not from the vendor's product samples.

# Agent Skills (agentskills.io)

Taken: skill = directory with `SKILL.md`, the `description` carries **all**
triggering burden, body kept short with "read X when Y" progressive
disclosure. OATS's skill-authoring guidance distills the creator guides
(ground in real expertise, defaults not menus, trigger evaluations with
near-miss prompts, with/without comparison).

# agents.md

Taken: one predictable agent-facing operating document per root. OATS
position: **`AGENTS.md` is canonical everywhere** (souls, instances, workspace
roots) and `CLAUDE.md` is always a relative symlink to it, never an independent
file; likewise `.agents/skills` canonical and `.claude/skills` a symlink. The
alternative — maintaining harness-specific copies — was rejected because two
files drift and the agent acts on whichever it read.

# Pi packages and plugin marketplaces (2026-07-26)

Taken for the distribution layer: one package source may expose several
resource kinds; user and project scopes are separate with the closer scope
winning; Git, local and registry sources have normalized identities; project
packages install only after trust; resources can be filtered without mutating
the source. The plugin-marketplace convention of a payload subdirectory inside
a repository informed the package payload root.

Divergences OATS required and Pi does not solve for it: independently
targetable capabilities, exclusive fundamental layers, exact lock integrity
(commit and content per package version), workspace policy that a package
update can never rewrite, and every capability copied whole into each
instance rather than installed once and shared
([kernel view](/nodes/oats-kernel-expert/decisions/trust-approval-and-consent-boundaries.md),
[a package update never retargets a deployment](/nodes/oats-kernel-expert/decisions/soul-declares-kind-config-assigns-policy.md)).
Silent floating updates were explicitly not borrowed.

# Citations

1. [OKF SPEC.md](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md); community sources [okf-knowledge](https://github.com/sniperunder123/okf-knowledge), [agent-knowledge](https://github.com/stjbrown/agent-knowledge), [okf-conformance](https://github.com/Sudhakaran88/okf-conformance).
2. [Agent Skills specification](https://agentskills.io/specification) and creator guides (best practices, optimizing descriptions, evaluating skills).
3. [agents.md](https://agents.md); [Claude Code best practices](https://www.anthropic.com/engineering/claude-code-best-practices).
4. [Pi packages](https://github.com/earendil-works/pi-mono/blob/main/packages/coding-agent/docs/packages.md), cited in the 2026-07-26 distribution-package decision.
5. Migrated from agents/oats-expert/soul/knowledge @ 7838d3ca (`references/okf-spec`, `agent-skills-standard`, `agents-md-standard`, 2026-07-08; `architecture/knowledge-typology`; the 2026-07-26 distribution-package decisions).
