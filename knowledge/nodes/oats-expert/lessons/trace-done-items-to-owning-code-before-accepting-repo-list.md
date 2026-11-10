---
type: Lesson
title: Trace each "done" item to the code that owns it before accepting the task's repository list
description: Before a cross-area spec adopts the brief's repository list, open the code that produces each promised outcome today and name its repository, owner, function or command and version; a dependency outside the named repositories goes to the maintainer before building.
about: [workstream/coordination]
kind: lesson
id: ins-2b8f93ba0737
tags: [planning, scope, ownership, dependencies, cross-area]
timestamp: 2026-10-26
---
# The brief's repositories are a claim, not a scope

A brief for cross-area work names the repositories it expects to change and
lists the outcomes that make it "done". Those two lists are written together
and are easily taken as consistent. They need not be: an outcome can depend
on behaviour that a third project produces, which none of the named
repositories can change. A spec that assumes otherwise is honest in form and
wrong in fact, and the developer who finds this mid-build has no authority
to fix it.

In the source's effort to give humans a threaded channel to long-lived
agents, two of the four "done" items (a read-only inbox panel over an
agent's mail, and a one-line wake for agents that use threads) turned out to
rest on a shared messaging library and on a CLI command that did not exist,
both owned by a project outside the two named repositories. Found while
reading the installed clients before the spec, this became a maintainer
decision and an ordering rule between releases. Found later, it would have
stalled two developers with no route to resolve it.

# Rule: open the producing code, then name it in the spec

For each "done" item, before the spec fixes the repository list:

- open the code that produces today's behaviour (the installed binary or
  package on the planning host is enough; a clone is not required);
- name in the spec the repository and owner that hold that code, the exact
  function or command, and the version read;
- where the owning repository is outside the brief's list, record that as a
  dependency for the maintainer's decision **before** building, with the
  ordering it imposes, rather than as a surprise in a developer's hand-back.

The specifics learned about the other project's code belong to that
project's experts and knowledge, not to this node: a planning spec names
them at a version; a lesson keeps only the method. A dependency found this
way is a fact for the maintainer to route, not permission for the lead to
widen the task or to edit the other project.

# How this relates to neighbouring lessons

[Owner review of shared-client prerequisites](/nodes/oats-expert/lessons/import-closure-needs-owner-review.md)
asks the owning expert to review a shared module set inside the project
before estimating a second client. This lesson is one step earlier and
wider: it asks whether each promised outcome is produced by code the task
can change at all, including code in another project. [Inspecting the
producer before making an exception permanent](/nodes/oats-expert/lessons/inspect-the-producer-before-making-an-exception-permanent.md)
applies the same stance to a client limitation after the fact; here the
inspection happens while the brief is still being accepted. The brief's
ideas are a claim of the same kind:
[ask the lane's maintainer for the record of the brief's subject](/nodes/oats-expert/lessons/ask-for-the-record-of-the-briefs-subject-before-designing.md)
before designing from it.

When a dependency sits in the messaging layer, the accepted split in
[runtime, messaging and viewer ownership](/nodes/oats-maintainer/decisions/runtime-messaging-viewer-ownership.md)
(viewers never consume mail; the messaging capability owns delivery) is the
constraint that decides which outcomes a viewer or a capability can deliver
alone. The direction that set these outcomes, and the conditions it attached
to them (a non-acknowledging read named at a command and version; the wake
change as a messaging-capability release), is the maintainer's accepted
[threads decision](/nodes/oats-maintainer/decisions/humans-address-long-lived-agents-through-threads.md).
Both decisions stay in the maintainer's node and are not restated here.

For instruction dependencies, [plan dependent soul text to land with its
capability pin](/nodes/oats-expert/lessons/soul-text-lands-with-its-capability-pin.md):
the producer's source merge is not yet the version the soul composes.

For spawn features, [inventory every execution route before specifying the
feature](/nodes/oats-expert/lessons/inventory-spawn-routes-before-specifying-a-feature.md):
finding the right repository does not establish that one dialog's local and
remote paths share option admission or feature evidence.

# Elimination route

The durable fix is a spec template or planning skill that requires, per
"done" item, the producing code's repository, owner, symbol and version,
and refuses a repository list that does not cover them. Until the
engineering skills carry that field, this lesson is the reminder. No lint
or test can supply it: the gap is between a brief and the code it does not
mention.

# Evidence and limits

Evidence: OKF proposal from oats-expert/oats-expert-threaded-channel,
2026-10-26; notes/trace-done-items-to-owning-code-before-accepting-repo-list.md;
notes/one-line-wake-lives-in-channel-core.md;
notes/aw-mail-read-and-ack-semantics.md.

The two supporting notes record the source's reading of the installed
messaging CLI and the shared delivery library at named versions on
2026-10-26; this harvest did not repeat those readings, and their technical
content is for the messaging package's and the messaging project's owners
to record. One task and one human: the lesson is a planning method, not a
prediction that every brief's repository list is incomplete, and it grants
no authority over another project's code or release order.
