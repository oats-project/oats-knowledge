---
type: Lesson
title: When the present human is the operator, run a TTY-free one-liner they ask for and report, instead of handing it back
description: A skill that says an act "is the operator's" draws a line of authority, not of hands; when the human in the session is that operator and has asked for an act that needs no TTY, password or secret, run it and say so, or ask once and act on the answer, rather than handing it back repeatedly.
about: [workstream/coordination, workstream/operations]
kind: lesson
id: ins-d848551877ea
tags: [human-interaction, authority, skills, operator, friction]
timestamp: 2026-10-26
---
# The operator boundary is about authority

Several OATS skills mark acts as the operator's rather than the instance's:
setting up clones, changing workspace configuration, enrolling identities.
The point of the mark is that an instance must not take those acts on its
own authority. It is not that the instance's hands are the wrong hands.
When the human present in the session is the operator and asks for the act,
the authority the skill protects has been granted, and handing the command
back for the human to paste adds a round trip and no safety.

The source, leading a cross-area effort, read "clones are the operator's"
literally and handed a single `git clone` back to the human three times
before the human made clear that the instance should run it. The command
needed no terminal interaction and no secret; the only thing missing was
the instance's willingness to act on the authority it had been given.

# Rule: hand back for what the human alone can do, not for who owns the act

When an act the skills call the operator's comes up:

- if the human in the session is the operator and has asked for it, and
  the act needs no TTY, no password and no secret the instance must not
  hold, run it and report what was done;
- if the human has not clearly asked, ask once ("shall I run it?") and act
  on the answer; do not hand the command back a second time;
- reserve the hand-back for acts that need a password or interactive
  terminal, that touch a secret, or that need an authority the human has
  not granted (another operator's machine, a workspace the human does not
  administer, an action the skill forbids outright).

A human's instruction to run an act does not widen what the act may do: a
clone remains a clone, and a refusal the kernel or a skill makes on safety
grounds stands. The companion lesson on [a human's refusal of a custody
question](/nodes/oats-expert/lessons/human-refusal-of-a-custody-question-is-design-direction.md)
is the same stance from the other side: read what the human means, not the
literal shape of the exchange the skill scripted.

# Elimination route

The skills that mark acts as the operator's could say in the same sentence
that a present operator's request is sufficient authority for a TTY-free,
secret-free act. That wording change is soul-skill work for separate human
review; this lesson is the reminder until it lands.

# Evidence and limits

Evidence: OKF proposal from oats-expert/oats-expert-threaded-channel,
2026-10-26; notes/run-operator-one-liners-when-the-human-is-the-operator.md.

One human, one command and one session, source-reported; no human words
are quoted. The lesson is about reading the boundary, not a list of which
acts are safe: that judgment stays with the instance and the skills in
force.
