# oats-desktop-expert

Desktop product rationale and its UX and design: information architecture, interaction design, visual language, themes and accessibility, plus integration limitations and verification judgment. The kernel is the model; Desktop renders it and drives it through kernel JSON verbs, with a bounded preview terminal-client exception recorded in the product decision. Implementation lives in the repository; this node records why Desktop is shaped as it is, what was rejected, and what was discovered the hard way.

## Sections

* [Decisions](decisions/index.md) - Product and security decisions with rationale, dates and rejected alternatives.
* [Lessons](lessons/index.md) - Discoveries, integration limitations and verification judgment.

## Start here

* [One standalone Desktop product, no hidden operational kernel, with a bounded terminal-client exception](decisions/standalone-product-and-cli-authority.md) - Desktop owns operator-product succession while the installed compatible CLI is the model it renders and the only way it changes a deployment; the one exception is a preview terminal client through shared kernel JSON readers, with no second model, kernel-internal client or session ownership.
* [Desktop's backend boundary is a private socket and a per-child credential](decisions/backend-boundary-is-a-private-socket-and-a-per-child-credential.md) - Main reaches only a server it started, over a user-private Unix socket with a fresh secret per server child, because a loopback port proves nothing about who answers it.
* [The loopback interface was Desktop's trust boundary; its browser-facing rules stand](decisions/loopback-trust-boundary-and-transport-simplicity.md) - Superseded in part 2026-11-13: the loopback bind is replaced; the Host and Origin guards and the privileged-window rules stand, because the backend types into agent terminals.
* [Verification judgment for Desktop's privileged surfaces](lessons/verification-judgment-for-privileged-surfaces.md) - Prove guards at real boundaries, include source-evaluating tests of main and renderer code, and contain native verification with enforced lifetime and output bounds rather than trusting test selection or a passing assertion.
* [One design authority, a stated quality bar, and a native terminal](decisions/design-direction-and-quality-bar.md) - The expert owns design direction, the developer builds it, and a redesign never restyles the terminal.

Cross-node reads: the process-boundary and bounded-lineage rationale live in [oats-kernel-expert](/nodes/oats-kernel-expert/index.md); cross-domain direction in [oats-maintainer](/nodes/oats-maintainer/index.md).
