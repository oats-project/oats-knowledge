# claims log

## 2026-11-12

* **Creation**: [The Desktop backend's boundary is a private socket and a per-child credential, not the loopback interface](/claims/decisions/desktop-backend-boundary-is-a-private-socket-and-a-per-child-credential.md), proposed. It refines `dec-28db07ceee3a`, replacing its loopback-only boundary between main and its server.
* **Creation**: [A generation check at response headers does not cover the body](/claims/lessons/a-generation-check-at-headers-does-not-cover-the-body.md), proposed.
* **Creation**: [Keep a secret out of a server's replies at its single reply writer, not per route](/claims/lessons/secret-exclusion-at-the-reply-writer.md), proposed.
* **Creation**: [The Desktop's CLI ceiling is a tested bound, with an allowlist above it](/claims/decisions/desktop-cli-ceiling-is-a-tested-bound-with-an-allowlist.md), accepted as `dec-5d77a82fa031` by maintainer review of PR [#367](https://github.com/oats-project/oats-knowledge/pull/367), amended (decided on oats-project/oats#1879; implementation #1889 recorded as open and unmerged; routed-action condition added; two unsupported reasons softened; links added).
* **Creation**: [An older Desktop does worse against a newer kernel where it words the consequence itself](/claims/lessons/an-older-desktop-does-worse-where-it-words-the-consequence.md), accepted as `ins-52bdf31616b6` by maintainer review of PR [#367](https://github.com/oats-project/oats-knowledge/pull/367), amended (verification note and links added).

## 2026-11-11

* **Creation**: [A tested-aw bump rests on aw's own tag-to-tag diff, not on a relayed change list](/claims/lessons/a-tested-aw-bump-rests-on-the-tag-to-tag-diff.md), accepted as `ins-264b2558ea7c` by maintainer review of PR [#359](https://github.com/oats-project/oats-knowledge/pull/359), amended (CHANGELOG wording corrected, elimination route and verification note added).

## 2026-11-10

* **Creation**: Reserved node added by PR [#342](https://github.com/oats-project/oats-knowledge/pull/342).
