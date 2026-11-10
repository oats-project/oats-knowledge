---
type: Lesson
title: A custody question the human refuses in the system's vocabulary is a design signal, not an input to collect
description: When a brief tells the lead to ask the human which identity is theirs or where a key should live and the human declines the question itself, take the refusal as direction: decide the mechanics with the domain experts and the maintainer, make the concept invisible in the product, and let the human review behaviour only.
about: [workstream/coordination]
kind: lesson
id: ins-9c410a70dc48
tags: [planning, human-direction, identity, custody, product]
timestamp: 2026-10-26
---
# The refusal is the answer

A brief can hand the lead a question for the human that is phrased in the
system's own vocabulary: which messaging identity is yours, where should its
key live, which custody arrangement do you want. When the human declines
the question itself rather than any one option, the lead has learned
something more useful than an answer. The human does not want the concept
to exist in their experience. Re-asking in other words, offering a menu, or
stalling the spec until the human chooses are all ways of not hearing it.

In the source's threaded-channel effort, the brief directed the lead to ask
the human which identity was theirs and where the key should live. The
human refused the question outright. The direction the lead took from that:
the human's identity is infrastructure. The product offers a composer on a
thread; the first send creates and holds whatever identity is needed, with
no dialog, no name to choose and no key to see. The custody mechanics
became the domain experts' and the maintainer's to decide and review; the
human reviews the experience only.

# What the lead does with it

- Record the refusal as direction, dated, in the spec: the concept is
  invisible to the human, and the product is judged on behaviour.
- Take the mechanics (where the key lives, who signs, how a remote client
  reaches the signer) to the owners of the identity and messaging layers
  and to the maintainer. Custody is a design decision with an owner, not a
  preference to collect; the operator's accepted position that
  [a resident's custody is a host fact](/nodes/oats-operator-expert/decisions/resident-custody-is-a-host-fact.md)
  is the kind of record that answers it.
- Give the human only what they can judge without the vocabulary: what
  happens when they send, what they see, what they never have to manage.

This is a lesson about reading human direction while planning. It does not
decide the custody mechanics themselves, which were still under review when
this was recorded and belong to the owning experts' and the maintainer's
records. The maintainer's accepted
[threads decision](/nodes/oats-maintainer/decisions/humans-address-long-lived-agents-through-threads.md)
holds the condition this lesson serves: a human identity used by the product
is a custody and trust contract decided with the messaging side before any
code signs as a human. It does not relax the messaging layer's ownership of identity
in the accepted
[runtime, messaging and viewer split](/nodes/oats-maintainer/decisions/runtime-messaging-viewer-ownership.md).

# Elimination route

A planning or specification skill can say that questions for the human are
asked in the human's vocabulary, and that a question the human cannot be
expected to care about is a design defect to resolve with experts. Until
the engineering skills carry that rule, this lesson is the reminder. The
design itself is eliminated by shipping the invisible behaviour and its
tests; the judgment about what the refusal meant cannot be.

# Evidence and limits

Evidence: OKF proposal from oats-expert/oats-expert-threaded-channel,
2026-10-26; notes/human-direction-identity-is-invisible.md.

The source reports the human's 2026-10-26 reply to the custody question and
the resulting design record, awebai/oats#1538, open and not accepted
knowledge at the time of the proposal. The human's words are not quoted;
the lesson is about the kind of answer, not its wording. One task and one
human: a different human may want to see and manage an identity, and this
lesson says only how to read a refusal, not that identity must always be
hidden. The chosen mechanics are source-reported and under review, not
accepted direction, and this harvest did not verify them.
