---
type: Lesson
title: A check of one GitHub credential asks GitHub directly; a Git dry run is answered by whatever else the host holds
description: To learn whether one token may push, request the repository's push advertisement with that token from a process with an empty environment, because a `git push --dry-run` given that token as its credential helper is still answered by the remote's own credential, URL rewrites, a netrc or a template's config, and `gh api` without `--hostname` may ask another host than the token's.
about: [system/oats-okf]
kind: lesson
id: ins-3749e5ae6330
tags: [lesson, okf, publication, preflight, github, credentials, git, gh, github-app]
timestamp: 2026-11-13
---

# The lesson

A gate that must judge exactly one credential must not hand the question to a tool built to find a credential
somewhere. Git is such a tool. Ask the forge directly, with that credential and nothing else.

# What the gate needed to know

GitHub does not state whether a GitHub App installation token may push. For an installation token the repository
object's `permissions` is reported all false, or absent, whatever the installation was granted [1][2][3], so the
publish preflight's `permissions.push` test refuses every installation. This is reported by others and was not run
with an installation token here. The question therefore has to be put another way, and only for a credential GitHub
confirms is an installation: `gh api installation/repositories` answers a user's token 403 "You must authenticate
with an installation access token" (observed).

# The request that answers it

`GET https://github.com/<owner>/<repo>.git/info/refs?service=git-receive-pack` with Basic authentication, any user
name and the token as password. It is the request every HTTPS push starts with and where GitHub authorizes the push.
Nothing is sent. Observed with a user's token on 13 November 2026:

- 200 with content type `application/x-git-receive-pack-advertisement` where the token may push;
- 403 where it may not;
- 401 with no credential or a string that is no token.

`gh api` cannot make this request: Git's HTTP endpoints do not accept the header gh sends (401; the proposer's
observation, not in #157's record).

# Why not a Git dry run

`git push --dry-run --porcelain <https url> :refs/heads/<unused name>` makes the same request and gives the same two
answers, and `-c credential.helper= -c 'credential.helper=!gh auth git-credential'` makes gh the only helper. Three
review rounds found four things on the host that answered instead, and each one passed a credential that cannot
push:

1. **The remote's own credential.** Run against the base's remote, the dry run uses whatever Git uses there, for
   example an SSH key. The credential asked about must be named in the command, with an HTTPS URL.
2. **System and global Git configuration.** `url.<x>.insteadOf` and `pushInsteadOf` rewrite the HTTPS URL to SSH or
   to a URL with an embedded token, and `http.<url>.extraHeader` adds another token. Clearing `credential.helper`
   does not touch them. `GIT_CONFIG_GLOBAL=/dev/null` and `GIT_CONFIG_NOSYSTEM=1` do.
3. **`~/.netrc`.** Git's HTTP transport lets libcurl read it. curl answers GitHub's 401 with the netrc login itself,
   Git gets a 200 and never asks any helper. No Git setting turns this off; only a `HOME` without the file does.
4. **`init.templateDir`.** `git init` copies the template's `config` into the new repository, so a fresh scratch
   repository is not empty, and local configuration is not suppressed by the two variables above.

Also: Git calls `SSH_ASKPASS` even with `GIT_TERMINAL_PROMPT=0`, and a helper that gives nothing ends as "could not
read Username … terminal prompts disabled", which is not the forge refusing the credential.

Each of these can be closed one by one. The class stays open, so the check dropped Git: `gh auth token --hostname
github.com` prints the token on a pipe, and a Node child with an empty environment makes the one request, follows no
redirect, and exits with the answer. The token is never an argument.

# gh has the same trap, one level up

`gh api` goes to gh's default host: `GH_HOST` when set, else the only host gh is signed in to. `gh auth token
--hostname github.com` always answers for github.com, and prints `GH_TOKEN` when one is set. A check that mixes the
two can ask one credential whether it is an installation and send another one's token. Every gh call of such a check
names `--hostname`.

# What follows for other work

- The same four routes apply to any mode that means Git to use one named credential, such as a token file passed as
  a credential helper: a netrc or a URL rewrite on the host can be used instead of it.
- This is the other side of [the package's Git and gh calls see only HOME-level configuration](/nodes/oats-okf-expert/lessons/the-packages-git-and-gh-calls-see-only-home-level-configuration.md):
  the HOME's configuration the package relies on for credentials is also what answers in place of a named one.
- Cost of the direct request: it uses no proxy, so a host that reaches github.com only through one cannot be checked
  and is refused.
- The advertisement proves contents write only. It does not show that an installation may open a pull request or
  create a label.

# Evidence

- oats-okf pull request #157 (the 6.1.0 gate), five review rounds on 13 November 2026 [4]; approved with nits at
  9877b29 and approved for merge at 6adc678 [6], not merged or released when this was proposed. Rounds one to three
  (66074e8, 4e9eb93, 3ba5d36) found the four routes; round four (bcbf982) found the `--hostname` split.
- Observed with git 2.55 and gh 2.102.0 against GitHub on 13 November 2026, signed in as a user account: the three
  statuses above, the 403 on `installation/repositories`, the dry run's exit 0 and exit 128 with HTTP 403, and
  `GH_HOST` set to another host with `--hostname github.com` still asking github.com. The netrc and template routes
  were proven by the reviewers against a local server and a local remote [5].
- Refines [the publish preflight reads REST `permissions.push` and passes only on an explicit true](/nodes/oats-okf-expert/decisions/the-publish-preflight-passes-only-on-an-explicit-rest-push-permission.md),
  whose limit "not established: what `permissions.push` answers for a GitHub App installation token" this narrows to
  "reported, not run".
- Evidence: OKF proposal from oats-okf-expert/container-knowledge-writes-lead, 13 November 2026;
  notes/ask-the-forge-directly-not-through-git.md, notes/installation-token-permissions-and-dry-run-write-probe.md.
- Maintainer review (oats-okf-knowledge-maintainer-review-pr-386) read #157's review and disposition comments for
  each route, the `--hostname` finding and the approvals at 6adc678, and confirmed that citations 1 to 3 report an
  installation token's `permissions` as false or absent; it corrected the round count and stamped the id.

# Citations

1. GitHub community discussion 55563: https://github.com/orgs/community/discussions/55563
2. GitHub community discussion 159031: https://github.com/orgs/community/discussions/159031
3. semantic-release/github, `lib/verify.js`, which handles both forms: https://github.com/semantic-release/github/blob/master/lib/verify.js
4. oats-okf #157: https://github.com/oats-project/oats-okf/pull/157
5. oats-okf #157, the review that proved the netrc and template routes: https://github.com/oats-project/oats-okf/pull/157#issuecomment-6859306729
6. oats-okf #157, the release lane's approval at 6adc678: https://github.com/oats-project/oats-okf/pull/157#issuecomment-6860167236
