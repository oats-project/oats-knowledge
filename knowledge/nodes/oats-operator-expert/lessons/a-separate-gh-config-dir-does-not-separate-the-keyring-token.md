---
type: Lesson
title: A separate GH_CONFIG_DIR does not separate the keyring token
description: A gh auth login under its own GH_CONFIG_DIR reportedly stored its token in the system keyring under the same host and account key as the person's everyday login, replacing it and narrowing its scopes, so a scoped second gh credential on a host needs --insecure-storage or a separate token, and must never be logged out.
tags: [operator, github, gh, credentials, keyring, trials, least-privilege]
timestamp: 2026-11-09
---
# The config directory is separate; the keyring entry is not

When the GitHub CLI stores a token in the system keyring, the source
reports it keys the entry by host and account, not by configuration
directory. A `gh auth login` run under a separate `GH_CONFIG_DIR`, meant to
give a trial or an agent pool its own credential, therefore wrote into the
same keyring entry as the person's everyday login for that account and
replaced it. The replacement carried only the scopes the new flow asked
for: the source observed the everyday login drop from seven scopes to four,
losing scopes the person's own work relied on. From then on the person's
terminal, every agent on the host and the trial machines reading that
keyring shared one token.

The source also reports that `gh auth logout` from either configuration
removes the shared token, so a trial teardown that logs out "its own"
credential logs the person out too. That consequence is reported in the
proposal and was not separately recorded in the backing note; treat it as
the natural reading of a shared entry, not a verified teardown test.

# Decision for a second gh identity on a host

Give a separate configuration its own storage: pass `--insecure-storage`
so the token lives in that directory's `hosts.yml`, or have the person
create a separate token for it. Before any `gh auth login`, `logout` or
`refresh` on someone's machine, read `gh auth status` and look for a
keyring-stored token on the same account; if one exists, the planned
command will touch it. Never log out of the scoped configuration while the
person's login may share its entry.

This complements the accepted [unattended-credentials decision](/nodes/oats-operator-expert/decisions/host-git-credentials-must-work-unattended.md),
which already records that a later `gh auth refresh` can move a
deliberately file-stored token back into the keychain unless the storage
choice is repeated. That decision concerns one shared host account; this
lesson concerns the attempt to create a *second*, separate credential on
the same host, which the configuration directory alone does not achieve.
The [forge-custody decision](/nodes/oats-maintainer/decisions/forge-connection-is-a-workstation-fact.md)
remains authoritative: the forge CLI owns its credential store, and OATS
does not take tokens into its configuration.

# Limits and elimination route

The source observed one login by device flow on one Linux host in early
November 2026 and compared `gh auth status` before and after; it did not
test other operating systems, keyring backends or GitHub CLI releases, and
this harvest did not reproduce it. The storage key behaviour is the CLI's
and may change; the durable lesson is that a configuration directory is
not a credential boundary and the storage choice must be made explicitly.

The elimination route is in whatever provisions the scoped identity: a
trial kit or setup skill that creates a second gh configuration should
pass `--insecure-storage` (or install a supplied token) by default and
refuse, or warn, when `gh auth status` already shows a keyring token for
the same account. A preflight that names the person's existing scopes and
checks them again after the login makes the overwrite visible on the spot.

# Evidence

Evidence: OKF proposal from oats-operator-expert/coord-workspace-trial-kit-expert,
2026-11-09; notes/gh-device-login-shares-keyring.md.

The note records the before/after scope comparison and the recommended
`--insecure-storage` remedy; the location of the trial's configuration
directory is omitted here as a private path.
