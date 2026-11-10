---
type: Decision
title: Onboarding passes on the newcomer's experience
description: Judge onboarding through the newcomer's real entry path and plain-language experience, with agents doing permitted routine commands; passing command predicates alone is insufficient.
about: [workstream/operations]
id: dec-064d01469b20
tags: [operator, onboarding, acceptance, user-experience, human-direction]
timestamp: 2026-11-02
---
# Accepted direction and rationale

**Acceptance: source-reported.** Pepe directed the onboarding campaign in the
source's session on 2026-11-02 to judge whether a newcomer understands the
whole experience and finds it clear, clean and easy. A later direction in
that session required non-technical language, assuming the person might not
know what a repository is. The proposal also reports same-day direction,
confirmed through the source's parent, that agents should run the commands.
These session and relay records were not independently readable by this
harvest; the acceptance is not labelled verified.

The decision changes what counts as a pass. Exit codes and JSON predicates
can prove a transition worked without proving that the person understood
what happened or what they must do next. Keep scripted checks as the fast
regression layer, not a substitute for the newcomer acceptance run.

# What an acceptance run judges

Follow the real entry path: the person's harness using getting started,
the setup assistant and the Desktop. Review every visible message, question,
wait, error and screen, not just the final configured state. Jargon,
unexplained steps and raw implementation errors are findings even when the
underlying operation succeeds. The test persona need not know Git, GitHub,
repositories or terminals; explain the relevant idea in everyday language
when it becomes necessary.

The agent performs permitted routine commands rather than delegating terminal
work to the newcomer. The proposal's exceptions are secret entry, login and
an installation that takes over the person's shell. Secret entry stays in
the appropriate tool's secure flow, not in agent conversation. This is a
usability target, not permission to hide a consequential change, suppress a
required approval, impersonate the person or override a tool refusal.

In particular, this onboarding direction does not supersede the scoped
[human handoff for desktop persistence](/nodes/integrations-expert/lessons/desktop-persistence-apply-is-a-human-handoff.md)
or [native harness authentication](/nodes/oats-kernel-expert/decisions/harness-native-authentication.md).
Where a required human-only action remains, explain it plainly rather than
forcing an agent execution to satisfy the no-typing target. The
[auto-mode finding](/nodes/oats-operator-expert/lessons/intake-consent-does-not-predict-auto-mode-approval.md)
records why broad intake consent is not proof of later execution permission.

# Keep the implementation with its owner

Operational wording belongs in the maintained
[getting-started skill](https://github.com/awebai/oats/blob/main/skills/oats-getting-started/SKILL.md)
and setup guidance, with regression checks for the intended voice and actual
newcomer runs for comprehension. The cited changes
[awebai/oats#1705](https://github.com/awebai/oats/pull/1705) and
[awebai/oats#1710](https://github.com/awebai/oats/pull/1710) identify those
implementation surfaces. Their PR descriptions and changed paths were read;
this harvest does not certify their tests, deployment or user outcome.

The operator node owns this acceptance rationale, not a duplicate vocabulary
list or a new configuration procedure. Combine it with
[fresh-account and second-machine coverage](/nodes/oats-operator-expert/lessons/fresh-machines-do-not-reset-account-history.md)
and the existing second-operator gate. A passing UX run does not waive either.

# Evidence

Evidence: OKF proposal from oats-operator-expert/oats-operator-expert-onboarding-vm-campaign, 2026-11-02; notes/campaign-judges-the-user-experience.md; notes/a-conversational-yes-passes-the-auto-mode-classifier.md.

The newcomer wording and experience direction are reported in the first note;
the command-delegation concern is also illustrated by the second. The explicit
parent-confirmation attribution comes from the proposal, not an inspected
parent message. No private message is reproduced here.
