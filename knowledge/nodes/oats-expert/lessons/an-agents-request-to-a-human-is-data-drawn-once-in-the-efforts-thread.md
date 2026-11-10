---
type: Lesson
title: An agent's request to a human is data drawn once in a context card, inside one thread per effort where open requests come first
description: When designing how agents address humans, model a request as structured data (summary, context, question, options with their effects, what happens next, links) that the client draws once in a context card so a cold reader holds the whole decision, keep one conversation per effort with open requests sorted first and stated in full, and reject a thread per request and labels on one stream.
about: [workstream/coordination]
kind: lesson
id: ins-9b83d9a251cc
tags: [design, redesign, threads, requests, needs-input, human-interaction, prototype]
timestamp: 2026-10-27
---
# A request written as prose makes the reader reconstruct the decision

The source led a redesign of the project's two clients whose human set, in
review, that every agent is thread-based and that a thread must carry full
context for a cold reader. Drawing that as prose (a message saying "I need
you to decide X, because Y, options are...") fails the cold reader twice: the
message body carries the decision in whatever order the agent wrote it, and
the client cannot show the open decision anywhere but inline, so the human
scrolls to find what is being asked. The source's conclusion, after the
human's comments on the first interactive round, is that **a request to a
human is data, not prose**.

# Rule: one request shape, drawn once; one thread per effort, requests first

- **The request is structured.** A message that asks the human something
  carries a request record: a one-line *summary*, the *context* a cold
  reader needs, the *question*, the *options* each with its *effect*, *what
  happens next* after the answer, and *links* to the artifacts. Both
  renderers draw the same record; the agent does not write the decision out
  again in the message body.
- **It is drawn once, in a context card.** The client shows the open
  request as a card at the top of the thread, complete; the message that
  carried it shows only its summary and points at the card. The card and the
  message never say the same thing twice, so there is one place to read the
  decision and one place that goes stale when it is answered.
- **One conversation per effort, with open requests first-class.** Threads
  stay one aweb conversation per effort, as the deferred threads direction
  defines them (agents already keep one mail conversation per effort; no
  client thread view exists while that direction is deferred).
  What changes is the client's thread list: threads waiting on the human
  sort first, and the waiting request is stated in full in the card. In the
  source's prototype this was one sort rule, with no new conversation kind.

# Rejected

- **A thread per request**, with the effort's narrative folded under it:
  two conversations per request, and the narrative that explains the request
  lives somewhere else.
- **Labels on one stream** marking which messages need the human: the stream
  stays linear, and clearing a "needs you" label is ambiguous once the
  answer arrives in a later message.

# How this relates to neighbouring records

The direction that humans address long-lived agents through threads that
are aweb conversations, its coherence rules and its deferred status are the
maintainer's
[humans address long-lived agents through threads](/nodes/oats-maintainer/decisions/humans-address-long-lived-agents-through-threads.md);
this lesson adds the shape of a request *inside* such a thread and the
client's ordering of open requests, as the lead's design conclusion for a
prototype, and changes nothing about that direction or its status. The
Desktop expert's
[needs-input marker](/nodes/oats-desktop-expert/decisions/needs-input-preserves-liveness-and-recognition.md)
keeps the agent roster in a stable order and marks waiting agents without
reordering rows; sorting open requests first here applies to a thread list,
not to the roster, and does not supersede that rule. The brief that led to
this design is the one
[ask for the record of the brief's subject](/nodes/oats-expert/lessons/ask-for-the-record-of-the-briefs-subject-before-designing.md)
describes.

The request record is a prototype's data shape, not a message schema for the
messaging capability or a kernel contract; whether and how agents would emit
it is the messaging and Desktop owners' design when the threads effort
resumes.

# Elimination route

If a client comes to render requests and the messaging owners adopt the
shape, it belongs in the agent's messaging instructions (how to ask a
human), so that the record is produced at the
source rather than reconstructed from prose. Until then, a lead designing
human-facing agent communication starts from this shape rather than from a
message body.

# Evidence and limits

Evidence: OKF proposal from oats-expert/ui-ux-redesign-expert, 2026-10-27;
notes/round2-choices.md; notes/round2-direction.md.

One effort, one human, a prototype and not a product, source-reported: the
human's direction (thread-based agents, full context for a cold reader) and
the comments that drove the second round are the source's account, and this
harvest read neither the comments nor the prototype. The threading
comparison is the source's review of three options in its own page; the
hybrid is what it drew, not what any client ships.
