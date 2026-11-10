---
type: Lesson
title: GPU restart recovery follows the shared glyph atlas's scope
description: Recover xterm's shared atlas across all live terminals in one debounced pass, because independent terminal clears can corrupt a resource shared by the window.
about: [system/oats-desktop]
kind: lesson
id: ins-c262e5390ff5
tags: [desktop, terminal, xterm, webgl, gpu, recovery, verification]
timestamp: 2026-10-14
---
# Finding and failed alternatives

The source's 2026-10-14 xterm 5.5 investigation found blank terminal text after
Chromium replaced its GPU process, observed around sleep or a Space switch.
WebGL contexts were lost and restored, but visible restoration was not proof
that the shared glyph resource was coherent. xterm's atlas cache shares a
TextureAtlas between terminals with the same configuration. In the reported
failure, restore cleared the atlas canvases while glyph-cache entries still
claimed their contents existed, leaving terminals drawing blank text.

The plausible local fixes were misleading:

- Refreshing the terminal did not repair the stale atlas contents.
- Replacing the WebGL addon did not help: the new addon joined the same stale
  shared atlas.
- Clearing independently from each terminal's own restore event garbled
  glyphs in two of the three terminals in the reported experiment.

The important limitation is the mismatch between a per-terminal event and a
shared resource. A renderer instance is not an independent recovery boundary
merely because it owns a context or addon.

# Recovery that worked

The reported successful recovery coalesces restoration into one window-wide
pass. Listen for `webglcontextrestored` in the document's capture phase
(the event does not bubble), debounce the restore burst, then call
`clearTextureAtlas()` on every live terminal, including hidden tabs, in one
synchronous pass. Isolate each call so one failure does not prevent the
remaining terminals from recovering. The renderer's own post-loss recovery
requests the same pass, not a separate single-terminal clear.

The observed pass used a 250 ms debounce and passed three of three reported
reproductions. That interval is experimental context, not a universal GPU
recovery constant. The reusable conclusion is to coordinate recovery at the
shared resource's scope and avoid interleaving independent clears with other
terminals' rendering. Recheck the workaround when the xterm version or atlas
ownership changes rather than assuming every renderer needs it forever.

# Elimination and evidence limits

The architectural fix belongs at the shared atlas's invalidation boundary:
restoration must invalidate cached glyph claims and notify all consumers
coherently. Until the dependency provides that guarantee, the shared recovery
coordinator is the workaround. Tests should drive a burst of restore/loss
notifications through that coordinator with multiple live consumers, including
hidden and failing ones, and assert one synchronous all-consumer pass.
Importable, injected test seams are preferable to another source-sliced copy.

Such tests prove scheduling and coverage, not the actual GPU pixels. The
source's ordinary tests did not expose this failure; that is not evidence
that automated GPU-loss coverage is impossible. Real loss/restore evidence
needs a permitted, bounded multi-terminal renderer test on an affected setup,
under the existing [verification safety rules](verification-judgment-for-privileged-surfaces.md).
This harvest did not reproduce the failure and does not generalize the
reported success to every GPU, platform or xterm version.

# Related

[Terminal viewers](../decisions/terminal-viewers-not-session-owners.md) owns
native interaction and session boundaries; shared renderer recovery grants
no authority to restart the agent's session.

# Evidence

Evidence: OKF proposal from oats-desktop-expert/oats-desktop-expert-linux-shell, 2026-10-14; notes/gpu-restart-shared-atlas.md. The source reports [awebai/oats#1190](https://github.com/awebai/oats/issues/1190), fixed by [#1192](https://github.com/awebai/oats/pull/1192) at `684cf127`, and maintainer approval citing the reproduction. Mechanism, results and approval are source-reported, not independently audited. The current workaround lives in [terminal-atlas-recovery.mjs](https://github.com/awebai/oats/blob/main/packages/desktop/renderer/terminal-atlas-recovery.mjs); its code owns the implementation details.
