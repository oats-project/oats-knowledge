---
type: Decision
title: A --repo that is not a repository key is refused with the key to pass, never with a Git remedy
description: When worktree add's --repo parses as no repository reference, the refusal keeps its codes and details and names the clone's matching remote as --repo <key> plus the clone's path, never a set-url, remote add or clones: hint built from the input; accepting member names, an E_BAD_ARGS member listing and changing the shared remedy helper were rejected.
tags: [kernel, cli, worktree, diagnostics, remedies, git, rejected-alternatives]
timestamp: 2026-11-10
---
# Decision

`oats worktree add --repo X`, where X parses as no repository reference (a
member's name such as `oats`, an `org/name`, a `name.git`), is **refused as
before, with the same codes and `details`**: `E_CLONE_MISMATCH` when a clone
sits at X's convention path or an `oats-local.yaml` `clones:` entry names
one, `E_CLONE_MISSING` when none does. Only the message changes:

- It names `--repo <key>` for each remote of that clone whose key is X or
  ends in `/X` (a trailing `.git` ignored on either side), and the clone's
  path as the other spelling that works. A remote that does not parse never
  matches. With no matching remote it says to pass a member's key
  (`<host>/<org>/<repo>`) or a clone path.
- It **never prints a Git remedy** (`git remote set-url` / `remote add`) or a
  `clones: { X: … }` hint built from X.

The general rule: **a refusal's remedy is built only from an input that
parses as what the remedy assumes.** A `set-url` built from a string that can
match no remote is always wrong and, pasted, repoints a correct clone at a
URL that does not exist. This applies the tested-remedy obligation of
[the CLI-boundary lesson](/nodes/oats-kernel-expert/lessons/machine-boundary-contract.md):
a diagnostic that names a remedy is behaviour contract.

# Why this shape

A fix confined to the message needs no contract decision: codes, `details`
shapes and what passes or fails are unchanged, so nothing that reads the JSON
answer moves. The shared clone check (used by spawn, `workspace status` and
the Desktop's setup facts, which show its message verbatim) is untouched, so
the Desktop's messages for member keys do not change.

# Rejected alternatives

- **Accepting a member's name as a `--repo` spelling.** A new accepted
  spelling is a contract question for both lane sides, and `worktree add`
  reads no workspace member list, so it would need a new resolution rather
  than a message fix.
- **Refusing with `E_BAD_ARGS` listing the member keys.** A refusal-code
  change, and it too needs the member list the command does not read.
- **Changing the shared remedy helper for every caller.** Its other callers
  pass only member keys, where the Git remedy is right, and the Desktop
  shows those messages verbatim.

The reporting issue's own recommendation was the first or second of these;
the product lane chose the message-only fix and kept both as a separate
contract question. A future instance asked to "accept member names" or to
tidy this refusal reopens that question deliberately, not by widening a
message fix into the Desktop-read paths.

# Known limit

A well-formed key that names no member (for example `github.com/acme/oats`)
still gets the `set-url` remedy: `worktree add` cannot tell membership, and
for a key that parses, the remedy's assumption holds. The one-matching-remote
transition aid of
[the organisation move](/nodes/oats-maintainer/decisions/oats-moves-to-its-own-org-in-stages.md)
is unaffected: moved-repository keys compare as one and are well-formed.

# Evidence and limits

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-worktree-member-name, 2026-11-10; notes/repo-non-key-refusal-names-the-key.md.

The harvest read public issue
[oats-project/oats#1781](https://github.com/oats-project/oats/issues/1781),
which reproduces the wrong remedy and recommends accepting names or
`E_BAD_ARGS`, and
[oats-project/oats#1782](https://github.com/oats-project/oats/pull/1782),
merged on 2026-11-10 at `93082f7875db`, whose description, lead
verification comment and product- and release-lane approvals state the
message-only scope, the unchanged codes and `details`, the untouched shared
helper and the out-of-scope well-formed non-member key. The approvals are
agent-lane records under team accounts, not human acceptance. The lead's
preview runs and the test file's coverage are source-reported; this harvest
inspected no implementation, reran no test and certifies no release. No
human-accepted decision is superseded.
