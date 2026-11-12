---
type: Lesson
title: Design records and release notes name no hosts, people, paths or personal repositories
description: Deployment specifics drift into a spec when its author reads the live deployment for facts; before hand-over, search the record for host names, the human's name, absolute paths and personal forge owners and replace them with neutral examples and "a pattern one deployment uses".
about: [workstream/coordination]
kind: lesson
id: ins-45bc7a4330dd
tags: [hand-over, specification, release-notes, review, provenance, privacy]
timestamp: 2026-11-12
---
# Where a spec's facts came from is not what the spec says

A lead writing a cross-area record learns many of its facts by reading the
live deployment: which host runs what, which identity alias the human uses,
where a file sits, which personal repository already does something
similar. Those facts are good provenance for the lead's own notes. Copied
into the record they become repository content: an example alias built
from a real person and host, an absolute path from one machine, a personal
repository named as precedent. The record then describes one deployment
rather than the design, publishes details about a person, and sends a
reader to code the project does not own.

The source's design record was approved on substance and returned by the
release lane for exactly these: an alias example made from a real user and
host, and a personal repository cited as precedent. The fixes were small
and would have cost nothing before hand-over.

# Rule: a hand-over check for deployment specifics

Before handing a design record, release note or other repository text to
review, search it for:

- host names and machine names;
- the human's name, aliases built from it, and personal contact details;
- absolute paths from any machine, including instance homes;
- personal forge owners and repositories, as opposed to the project's own.

Replace each with a neutral example (`alice`, `host-a`, `<instance-home>`)
or with a description of the pattern ("a pattern one deployment uses"),
keeping the fact that motivated it. The real values stay in the lead's
notes as provenance.

This is the repository-text counterpart of the rule that [host facts belong
in task evidence, not durable
knowledge](/nodes/oats-expert/lessons/date-host-read-facts-before-an-adoption-gate.md):
the same facts that must be dated and attributed as evidence must not
become anonymous content in a record. When the facts at risk are someone
else's private material handed to a child, the check moves to the brief:
[a brief that hands a child private material names every public destination](/nodes/oats-expert/lessons/a-brief-passing-private-material-names-every-public-destination.md).
When the search finds a name, whose it is comes before any report:
[check who a flagged name belongs to before reporting a privacy finding](/nodes/oats-expert/lessons/check-who-a-flagged-name-is-before-reporting-a-privacy-finding.md).

# Elimination route

A pre-review check on the record's repository (a deny-list of the
deployment's host names, the humans' names and absolute-path patterns,
run as a lint or a review-bot comment) would catch most of these before a
reviewer does. Until such a check exists, this lesson is the manual step at
hand-over. A reviewer in the release lane remains the final guard.

Refined 2026-11-12: a deny-list of host names and people's names committed to a public
repository publishes them, even hashed. Only the path pattern belongs in the repository, as an
allow-list of invented owners, and a personal deny-list stays outside it; see
[a guard against deployment specifics checks shapes, never a list of the names](/claims/lessons/a-deny-list-of-deployment-names-publishes-them.md).

# Evidence and limits

Evidence: OKF proposal from oats-expert/oats-expert-threaded-channel,
2026-10-26; notes/no-deployment-specifics-in-lane-docs.md.

One record and one review, source-reported; this harvest did not read the
record or the review. The list above is what that review caught plus the
obvious neighbours, not an exhaustive definition of deployment-specific
content.
