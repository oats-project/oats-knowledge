---
type: Lesson
title: Making one token Git's credential takes more than a credential helper, and a scan of the host's Git configuration must follow includes
description: Git with one credential helper still turns to core.askPass when the helper yields nothing, and is answered before any helper by a netrc, an http.extraHeader or a URL rewrite; a scan for those with `git config --global` or `--system` misses included files unless `--includes` is passed, and must read a conditional include's file as if its condition held.
about: [system/oats-okf]
kind: lesson
id: ins-651e297b7e97
tags: [lesson, okf, credentials, git, netrc, askpass, bring-up]
timestamp: 2026-11-16
---

# The lesson

Clearing the credential helpers and naming one of your own does not make that helper Git's only source of a
credential. Three more things have to be handled, and a check that looks for them has its own traps.

# What still answers

Established with the real `git` (2.55) and curl 8 against scratch homes, while reviewing the token-file mode of
oats.okf [1] and its bring-up check [2]:

- **Askpass is the fallback behind every helper.** When the helper yields nothing (the token file is missing,
  empty, or half-written by a refresher), Git asks `core.askPass` from the system or user configuration.
  Removing `GIT_ASKPASS` and `SSH_ASKPASS` from the environment does not stop that, and `GIT_TERMINAL_PROMPT=0`
  only disables the terminal. An empty `core.askPass=` at command scope does: the failure is then "could not read
  Username", an authentication failure, and no other credential stands in.
- **A netrc, an `http.extraHeader` and a `url.<base>.insteadOf` answer before any helper is asked,** as the
  accepted lesson on checking one credential says [3]. They cannot all be switched off from the command scope.
  An empty `http.extraHeader=` resets only the headers scoped no more narrowly than itself: an unscoped one leaves
  a URL-scoped header in place, while an empty value scoped to the repository's full URL clears it. A
  command-scope `insteadOf` that maps the full URL to itself undoes a shorter rewrite, but not one the host wrote
  for that same full URL. Git has no setting that turns a netrc off. Dropping the system and user configuration
  (`GIT_CONFIG_GLOBAL=/dev/null`, `GIT_CONFIG_NOSYSTEM=1`) closes the two configuration routes, but it also drops
  a host's proxy and certificate settings, and it leaves the netrc.

# What a scan for them must do

- **`git config --global` and `--system` do not follow includes.** A scope flag turns `include.path` and
  `includeIf` off, while Git at work follows both. Pass `--includes`.
- **A conditional include depends on the repository Git runs in,** so its condition cannot be evaluated from
  outside one. Refusing every `includeIf` fails any host with the common `gitdir:` include that sets only a
  name or an e-mail. Take the condition as true and read the file it names the same way
  (`git config --file <path> --includes`), resolving `~/` against the home and a relative path against the
  including file (`--show-origin` gives it).
- **Git's URL matching lets `*` stand for one host label,** so `http.https://*.com/.extraheader` applies to
  github.com. A prefix comparison misses it.
- **curl matches a netrc host without regard to case and accepts it quoted.** A netrc the user cannot read is no
  route: Git's curl cannot read it either.
- **Report kinds and scopes, never values.** A header value and a rewritten URL can hold a credential.

# What follows for a gate

A check that must judge one credential asks the forge directly and runs no Git [3]. A mode that hands Git one
credential states what on the host can still answer in its place, and has its bring-up check look for it.

# Citations

1. oats-okf #153, the reviews that proved the askpass fallback: https://github.com/oats-project/oats-okf/pull/153#issuecomment-6921997511
2. oats-okf #155, the reviews that proved the include, wildcard and netrc cases: https://github.com/oats-project/oats-okf/pull/155#issuecomment-6921990350 and https://github.com/oats-project/oats-okf/pull/155#issuecomment-6922294249
3. [A check of one GitHub credential asks GitHub directly](/nodes/oats-okf-expert/lessons/a-check-of-one-github-credential-asks-github-directly-not-through-git.md)

Both pull requests were open, not merged, when this was accepted; the code fixes and their real-git tests are
asked for in those reviews, and this lesson records the Git and curl behaviour, not what the package ships.

Evidence: OKF proposal from oats-okf-expert/container-knowledge-writes-lead, 2026-11-16; notes/git-askpass-and-scoped-config-reads.md, notes/file-mode-does-not-isolate-git-from-the-host.md.

Maintainer review (oats-okf-knowledge-maintainer-review-pr-392, 2026-11-16): read the three cited review comments
for each claim. The proposed text said a URL-scoped `http.extraHeader` and a rewrite cannot be reset from the
command scope; run with git 2.55 against a local server, an empty value scoped to the same URL or the full
repository URL did clear a URL-scoped header, and a full-URL self-mapping undid a shorter rewrite but not a
full-URL one, so the sentence was corrected to that. The id was stamped.
