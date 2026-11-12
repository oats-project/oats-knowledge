---
type: Decision
title: The Desktop's CLI ceiling is a tested bound, with an allowlist above it
description: A Desktop accepts a released oats CLI of a later minor or major than its own and flags it aboveTested. Only an explicit allowlist (reads, terminals, Spawn, Start, Restart, colour, background) stays on; every other operation, future ones included, is refused at the backend's entry before any CLI runs, with one notice naming the Desktop to install.
about: [system/oats-desktop, system/oats-kernel]
kind: decision
id: dec-5d77a82fa031
tags: [desktop, cli-ceiling, version-skew, tested-bound, contract, release-lane]
timestamp: 2026-11-12
---

# The decision

Both maintainer sides decided this on [oats-project/oats#1879](https://github.com/oats-project/oats/issues/1879) (option 3 of five). It is implemented in [oats-project/oats#1889](https://github.com/oats-project/oats/pull/1889), which was approved but not yet merged when this was accepted (see the end). This concept records the decision and its rationale, not shipped behaviour.

- **The bound.** The upper bound is the minor of the client's own release version. It is derived at run time: the Desktop reads its own manifest, and `oats tui` reads its kernel's `package.json`. Nothing hand-bumps it. `ACCEPT_RANGE` keeps only the floor, which stays hand-set. A test fails if an upper bound is spelled anywhere in the source.
- **Above the bound,** a CLI with the same `desktopApi` is accepted with `aboveTested`.
  - **Stays on:** an allowlist, each entry with its reason. That covers reads; terminals; Spawn, which applies only the decision its preview showed (`--expect-decision`); Start and Restart, which count only on the full receipt the Desktop knows; and the instance's colour and background.
  - **Everything else is held back.** An operation added later is held back too, until someone names it in the allowlist with a reason.
  - **Enforcement.** The backend refuses an operation by (route, action) at its entry, and main refuses its own CLI runs, before any CLI process starts. The renderer only reads the table.
  - **The inventory test.** It fails on any POST route or CLI-executing module that has no class.
- **One sentence.** A single sentence names what is off and the Desktop version to install, linking its release. `oats update` prints the same core sentence on a minor jump. The sentence is written in both the client and the kernel, and a test holds them equal.
- **Unchanged.** A newer `desktopApi` and a CLI below the floor still get the blocking card. `oats tui` is unchanged: it judges its kernel against that kernel's own version.
- **The release lane** drops the per-minor bump. Its Upgrade-order line says either order works, except where a Desktop that still has the hard ceiling is installed. The last of those is named in one constant in the kernel.

# Why

- It applies the skew rule to the Desktop: degrade with a warning, and refuse only where the old side would do worse than today. The record shows "worse" only in Stop, Remove and schedule writes ([the traced cases](../lessons/an-older-desktop-does-worse-where-it-words-the-consequence.md)).
- It needs no new kernel promise.
- Deny by default keeps the fail-closed property for operations that don't exist yet. That was one side's condition for agreeing.
- A tested bound is evidence, not a refusal ceiling. This is the same shape as [the integrations decision on provider bounds](/nodes/integrations-expert/decisions/newer-than-tested-warnings-follow-release-authority.md).

# Rejected

- **Keep the hard ceiling and tell people sooner.** Every Desktop still loses every action at every minor until it is reinstalled.
- **Drop the bound silently.** The traced cases show an older Desktop making false statements about destructive actions.
- **A kernel promise to fence each surface,** by bumping its API integer or retiring its feature name on a change of meaning. That is deferred as its own decision, because its cost falls on kernel review and shape checks can't catch a change of meaning under the same JSON. With it, the held-back surfaces could open too.
- **An update channel.** macOS auto-update needs Developer ID signing, which a person decides ([what ad-hoc signing cannot fix](/nodes/oats-desktop-expert/lessons/macos-adhoc-signing-decision.md)). Even with one, the CLI and servers still skew.

# Limits

- **The local CLI only.** A server's relayed probe carries `features` but no version, so a newer server behind an in-bound local CLI goes undetected, as under the old ceiling. A host version on the relayed probe belongs with the per-surface fence. Routed actions to a server keep exactly the per-surface API integers and feature names they had, failing closed: nothing about a server becomes more permissive. That was the other side's condition for the narrowing.
- **Installed Desktops.** Those of 0.69.17 or older can't be changed, and they still refuse a newer minor. The rule reaches only Desktops installed from the release that carries it.

Relates to: [newer-than-tested warnings follow release authority](/nodes/integrations-expert/decisions/newer-than-tested-warnings-follow-release-authority.md) (same shape, for provider clients); [one standalone Desktop product and CLI authority](/nodes/oats-desktop-expert/decisions/standalone-product-and-cli-authority.md) (the Desktop drives the installed CLI and bundles no kernel, which is why skew happens at all; its accepted version band now has a soft upper end above which this allowlist applies); [retired kernel codes need no client list](/nodes/oats-maintainer/decisions/retired-kernel-codes-need-no-client-list-until-required.md) (reviewing against a client's whole accepted band).

Evidence: OKF proposal from oats-engineering-expert/oats-engineering-expert-desktop-cli-ceiling, 2026-11-12; notes/desktop-tested-bound-with-allowlist.md, notes/desktop-ceiling-is-the-de-facto-break-gate.md.

Maintainer review of oats-knowledge#367 on 2026-11-12 checked on GitHub:
- the decision records on #1879: [6807590643](https://github.com/oats-project/oats/issues/1879#issuecomment-6807590643) (`josep-reyero`) and [6807596746](https://github.com/oats-project/oats/issues/1879#issuecomment-6807596746) (`juanre`), each a yes to option 3 with the conditions above. Each presents itself as a lane's maintainer agent (the first on its human's delegation of 2026-11-10), so the humans' agreement is source-reported, not their own record;
- the local-CLI narrowing, [stated](https://github.com/oats-project/oats/issues/1879#issuecomment-6807653018) and [confirmed](https://github.com/oats-project/oats/issues/1879#issuecomment-6807656454) with the routed-action condition;
- #1889: open and unmerged, with approvals at `17396ebe5` from the product maintainer and the release lane, and the lead's verification at `5ff920808` carried to `17396ebe5`. Until it merges and ships in a 0.69.x patch, the behaviour above is not released.

No accepted concept is superseded: the hard ceiling had no concept of its own.
