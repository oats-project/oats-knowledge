---
type: Lesson
title: Send a relay's own reading to the maintainer before offering a remedy
description: Submit a relay's own remedy to the maintainer first, then preserve the accepted answer's wording and attribution without adding fix-version promises or making general setup advice host-specific.
about: [workstream/coordination]
kind: lesson
id: ins-52232ff81b82
tags: [coordination, adoption, relay, authority]
timestamp: 2026-10-27
---
# A relay's advice can become the project's answer

An expert acting as the OATS side's single contact for another workspace
must distinguish its own reading from the maintainer's answer. Send an
original diagnosis or proposed workaround to the maintainer for acceptance
before offering it to the adopter as a remedy. Relay the accepted answer as
given, retaining its limits and holds rather than adding an inferred fix.
This is a boundary on the relay's advice, not a claim that every ordinary
expert answer requires a new approval round.

The adopter's agents can treat the contact's advice as the project's answer
and turn it into pin changes or host operations. Qualifying a suggestion as
an expert's reading does not remove that downstream risk. A plausible
technical diagnosis is not authority to recommend the corresponding change.

# What the reported contrast taught

The source reports offering a pin move for a cache defect before the release
lane answered. The maintainer withheld remedy advice, and the expert had to
retract its recommendation the same day. In a later host-refusal case, the
expert instead submitted its analysis and proposed answer to the maintainer.
The maintainer reportedly checked it against the release tag and approved
the text before the expert relayed it. The useful contrast is the order of
acceptance and advice, not either incident's version or workaround.

# Name the issue, not a release commitment

When drafting an answer that cites a known bug, name its tracking issue
without promising a fix version. A version supplied by the relay becomes a
commitment the release lane never made; release timing belongs to that lane.
Describe how a setup works in terms of the setup, not the adopter's named
machine, so a general answer does not read as host-specific advice.

This is about the answer's scope and authority, not a ban on attributed
host facts in diagnostic evidence. The related [deployment-specifics
lesson](/nodes/oats-expert/lessons/design-records-name-no-deployment-specifics.md)
covers design records and release notes; here the risk is what the adopter
understands the project's answer to promise.

# Preserve the words and identify the reader

An accepted answer may contain lines addressed to the relay rather than
the adopter. Keep the words unchanged and mark those lines with an explicit
relay annotation, such as `[to the relay]`, distinguished from the quoted
text. Otherwise the adopter can read an instruction or promise addressed to
the relay as addressed to itself. Substituting neutral words hides that
ambiguity by changing whose words the adopter receives.

If the answer misattributes a source, leave the quoted wording intact and
add a separate correction after the quote, naming the evidence for that
correction. Keep the maintainer's text and the relay's sourced addition
visibly distinct. This clarifies the existing as-given rule; it does not
permit adding a remedy or changing the answer's limits and holds.

# Scope and elimination route

The [maintainer's review and scope rules](/nodes/oats-maintainer/stewardship/review-protocol.md)
remain authoritative; this lesson neither grants release authority nor
changes them. The generalist owns the judgment at the communication boundary.
[Host-read evidence](/nodes/oats-expert/lessons/date-host-read-facts-before-an-adoption-gate.md)
answers what is installed; it does not authorize a remedy either.

Fixing the underlying defect and testing the remedy eliminates that specific
workaround. Code or CI cannot decide whether a relay is authorized to offer
an original recommendation as the project's answer. If this role recurs,
make the maintainer-first boundary explicit in the role's coordination skill
through a separately reviewed change; this harvest changes no skill. The
lesson preserves why that boundary matters, not a second messaging recipe.
A recurring relay skill could also require a distinct annotation area and
source-labelled corrections. Quote-preservation checks can catch changed
words, but cannot decide the intended addressee or grant release authority;
those judgments remain at the communication boundary.

# Evidence and limits

Evidence: OKF proposal from oats-expert/polaris-oats-expert-lfx-support,
2026-10-14; notes/relay-own-reading-goes-to-maintainer-not-adopter.md.

The note dates both incidents to 2026-10-13. The retraction, release-tag
check and maintainer acceptance are source-reported, not independently
verified by this harvest. No human acceptance is inferred and no product
decision is superseded. Third-party message text and incident-specific
remedies are not reproduced.

Evidence: OKF proposal from oats-expert/polaris-oats-expert-lfx-support,
2026-10-27; notes/relay-answers-name-issues-not-fix-versions.md;
notes/verbatim-relay-marks-lines-addressed-to-the-relay.md.

The later proposal reports a maintainer's two wording edits on 2026-10-15:
cite the issue without a fix version and remove the host name. It also
contrasts a phrase substitution disclosed as a deviation on 2026-10-15
with a 2026-10-16 relay that marked the relay-addressed lines and appended
a correction attributing a version comparison to its actual source.
These are source-reported communication lessons, not independently audited
correspondence or proof of a release. No human acceptance is inferred;
no product decision is superseded. The incidents' names, versions and
message text are not reproduced.
