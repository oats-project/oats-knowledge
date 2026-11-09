---
type: Lesson
title: A failed turn's claim splits by error class, and Claude's hook matchers are not a partition
description: Only a usage-limit text opens Claude's menu and only rate_limit carries one, while a provider's refusal lands in class unknown, so a failed-turn claim reads attention for classes measured to open no dialog and question for the rest, decided in one hook entry that parses its input because every matcher entry runs for an empty class.
tags: [kernel, harnesses, claude, claims, dialogs, input-safety]
timestamp: 2026-10-30
---
# Finding

The [withholding decision](../decisions/waiting-claims-may-only-withhold-automated-input.md)
holds a wake on every claim except `attention`, so `attention` must never
mark a screen an Enter answers. The [dialog-coverage lesson](dialog-claims-do-not-enumerate-all-dialogs.md)
established that Claude's usage-limit screen is such a menu. The open
question for the failed-turn producer was which error classes can leave
that menu behind. The source reports, from Claude Code 2.1.308 and 2.1.78
source and real interactive panes on 2.1.308 with an API key against a
loopback provider, on 2026-10-30:

- **The menu is a text match, not a class check.** It opens from the
  rendered message matching a list of usage-limit prefixes. Every such text
  comes out of the classifier's 429 branch, which assigns `rate_limit`.
- **Text under `unknown` always starts "API Error:"**, so the prefix match
  cannot hit it. A 400 or 422 refusal, a 402 and the generic classifier
  fallback all report `unknown`.
- **A real provider's refusal is therefore class `unknown`**: the case that
  started the failed-turn work. Sending `unknown` to `question` would hold
  wakes on the commonest failure, so `unknown` stays `attention`. "Can't
  tell means question" applies to classes that could not be provoked, not
  to one whose text is known not to open the menu.
- Classes the source could not provoke (`overloaded`, `account_on_hold`,
  `verification_required`, `cloud_credential_error`) take `question` under
  the decided rule. `overloaded` is in Claude's matcher list but the
  2.1.308 classifier does not emit it.
- On 2.1.78 a plain 429 on an API key is not `rate_limit`; harmless there,
  because the menu needs a subscription. An API-key session shows no
  subscribed menu at all, so the subscribed menu itself rests on two
  source reads, not a live limit.

# Claude's hook matchers are not a partition

A second finding from review: a pair of complementary matcher regexes does
not divide the inputs. 2.1.78 skips matcher filtering when the query is
empty, and a hook input with no class skips it on 2.1.308 too, so **every
entry runs**. A decision that must hold for any input, including one with
no class or an unreadable one, belongs in **one entry that parses the
input itself** and defaults to the safe answer. The failed-turn producer
therefore has a single `StopFailure` entry with no matcher: known
no-dialog classes read `attention`; `rate_limit`, any other class, a new
one included, and unreadable input read `question`.

# What a kernel expert does differently

- Decide a claim's reason from what the **screen** does per class, not from
  the error's name or severity; the safe direction for an unmeasured class
  is `question`, and the measured direction for `unknown` is `attention`.
- Treat a matcher as a filter that may not run, never as the sole guard of
  a safety decision.
- Keep the class table as dated evidence on the versions read and run; the
  classifier, its classes and the menu's text list are Claude's to change.

# Elimination route and limits

The one-entry parsing producer and the generated-settings tests per Claude
version are the fix in place. The residual limits stand: the menu fires no
hook of its own, a trial-expiry dialog opens the same way at startup with
no failed turn behind it, and an API-key `rate_limit` still holds a wake
until a person acts. Those are reasons the coverage field says
`on-claims`, not `protected`. This lesson changes no kernel contract and
adds no reason.

# Evidence

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-failed-turn-reported, 2026-10-30; notes/failed-turn-classes-and-dialogs.md.

The harvest read the [rate_limit/attention decision](https://github.com/oats-project/oats/issues/1670#issuecomment-6526356580)
on oats-project/oats#1670 and the follow-up
[implementation PR #1672](https://github.com/oats-project/oats/pull/1672),
merged on 2026-10-30 at head `a6752ec06`, whose body carries the per-class
table and the one-entry change. The source reads, pane runs and tests are
source-reported; this harvest exercised no Claude version and no
subscribed limit.
