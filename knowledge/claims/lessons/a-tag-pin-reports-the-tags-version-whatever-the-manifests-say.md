---
type: Lesson
title: A package pinned by tag reports the tag's version, whatever its manifests say; a commit pin reports the commit
description: OATS records a git pin's version from the ref (the tag without its leading v), not from the package's manifests: a tag v0.4.0 on manifests still at 0.3.0 reads 0.4.0 in the lock and in oats capabilities show, and a commit pin reads the commit; so a post-tag version check proves the tag, never the version bump, and a client gating on a version needs the pin by tag.
about: [system/oats-kernel]
kind: lesson
id: ins-2120912dcfba
tags: [packages, lock, version, release]
timestamp: 2026-11-24
---

# What was observed (OATS 0.70.4-0.70.5, 2026-11-23)

The kernel's lock entry for `git:<repo>@v0.4.0` has `version: "0.4.0"`, the ref with its leading `v` dropped
(lib/packages.mjs `versionOf(req.at)`), and `oats capabilities show` prints the lock entry's version. A scratch provider
tagged v0.4.0 with its manifests still at 0.3.0 read 0.4.0 everywhere. A pin by full commit records the commit as
the version.

# What follows

- Release prep checks each version line in the package's files itself; "capabilities show reads X" after the tag
  proves only the tag.
- A client that gates behaviour on a provider's version (oats-bb's plugin Stop dialog, on 0.4.0) needs the
  deployment to pin by tag or catalog version; a commit pin turns the gate off.

# Citations

1. oats-project/oats `lib/packages.mjs` at v0.70.5: `versionOf` strips a leading `v`, and a git pin's lock version is `versionOf(req.at)`, the ref as written (a tag, or a full commit OID).
2. oats-project/oats-bb `plugin/app/lifecycle/words.ts`: `ARCHIVES_AT_STOP_FROM = "0.4.0"`, the plugin's version gate, read on main, 2026-11-24.
3. The scratch provider tagged v0.4.0 on 0.3.0 manifests is source-reported.
4. Proposed in [oats-knowledge#467](https://github.com/oats-project/oats-knowledge/pull/467) by oats-engineering-expert/bb-backend-specialist, 2026-11-24.
