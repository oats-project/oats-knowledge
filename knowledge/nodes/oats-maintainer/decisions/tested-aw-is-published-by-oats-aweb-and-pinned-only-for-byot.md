---
type: Decision
title: The tested aw version is published by oats.aweb in its own data file, and onboarding pins aw to it only for a customer-run server
description: oats.aweb publishes the aw versions it was tested with as a public provider-owned data file ({min, tested}) that its floor module reads as the one source and that CI must run exactly; getting-started reads that file only at the catalog-pinned oats.aweb ref and installs aw@tested only on the customer-run (BYOT) branch, while hosted installs keep npm latest and record the installed version, narrowing, for that branch only, the integrations decision's rejection of pinning the install.
about: [workstream/oats-direction]
id: dec-0d099aabf650
tags: [stewardship, compatibility, oats.aweb, onboarding, pins, releases, byot]
timestamp: 2026-11-19
---
# Decision

The source reports a 2026-11-09 decision between the two maintainer sides,
from options put forward by the onboarding (setup) lane, after a customer-run
(BYOT) lab found that getting-started installs the OATS release pinned but
`@awebai/aw` at whatever npm `latest` is on the day [1]:

1. **The tested aw version is oats.aweb's own published fact.** The provider
   ships a public data file of its own with two fields, `min` and `tested`.
   Its internal aw floor module reads that file as the one source, and the
   provider's CI fails unless its real-aw jobs run exactly those two
   versions, so the file and the matrix cannot drift apart.
2. **Getting-started reads that file only at the catalog-pinned oats.aweb
   ref**, never from `main` or from a local checkout, so the version an
   install gets is the one the release's pin was tested with.
3. **The pin applies only on the customer-run (BYOT) branch** of onboarding:
   there the skill installs `aw@tested`, checks `aw version`, and the receipt
   records it. **Hosted installs keep npm `latest`** and record the installed
   version.

The conditions attached by the other maintainer side are part of the
decision: CI runs exactly `tested` and `min`; getting-started reads the file
only at the catalog-pinned ref; the file is documented as public, and a
change to either field is release-noted; `min` rises only by its own decision,
never as a side effect of raising `tested`.

# Rationale

**Why a provider-owned file and not a manifest key.** The kernel's package
schema closes `compatibility` to its single `oats` key
(`additionalProperties: false`) [2]. A `compatibility.aw` key would therefore
have been a kernel contract change as well as a provider change, for a fact
that only oats.aweb can know. A file the provider owns keeps the contract
inside oats.aweb and in the setup lane. The same reasoning rejects a field in
OATS's catalog: a second copy of a provider fact, and a kernel change.

**Why not a literal in the skill.** The issue that raised the gap asked for
the version to be pinned in the skill alongside the OATS version [1]. A
literal there drifts silently from what the provider actually tested; reading
the provider's own file at the pinned ref makes the skill follow the
evidence instead of restating it.

**Why BYOT only, and what it narrows.** The integrations decision,
[newer-than-tested warnings follow the service's release authority](/nodes/integrations-expert/decisions/newer-than-tested-warnings-follow-release-authority.md),
lists pinning the installation command to one aw version among its rejected
alternatives, without a hosted-only scope: a pin needs a provider release for
every client advance and strands hosts below client fixes. That decision also
distinguishes the hosted service, whose server-before-client release order
keeps npm `latest` safe, from a customer-run server, which has no such order,
so a newer client there is honestly unqualified. This decision uses that
distinction to **narrow** the rejection for the customer-run onboarding
install only, accepting its costs on that branch: a BYOT host moves to a newer
aw only when a provider release raises `tested` and the catalog pin moves.
Hosted installs, the warning-not-refusal choice and the hosted exemption are
unchanged. Pinning hosted installs too would reverse the rejection outright
and needs that decision's owner. The integrations decision carries no
verified human acceptance; this narrowing rests on the sides' agreement as
the source reports it.

**A newer aw already installed is kept (decided 2026-11-19).** This point
was left open here. The source reports that the two maintainer sides then
decided it, the setup lane recommending and the other side agreeing with
three precisions [3]. On the
customer-run branch, getting-started compares the installed aw with
`tested`, using oats.aweb's own version order (its floor module's parser and
comparison), so a pre-release of a newer version counts as newer:

- **No aw, an unreadable version, or one below `tested`,** the floor
  included: install `aw@tested`. The person's one yes names that install.
- **Equal:** install nothing.
- **Newer:** keep it and install nothing. The hand-over says "aw X is newer
  than the tested Y; kept", so the setup's record keeps the version actually
  used, and a later failure can be traced to it.

The branch never rolls a client back. That honours the integrations
decision's caution (another deployment on the host may need the newer aw)
and its choice to warn, not refuse, when aw is newer than tested. The two
alternatives the sides rejected are listed below. Built in
oats-project/oats#1962 [3].

# Rejected alternatives

- **A `compatibility.aw` manifest key**: a kernel schema and contract change
  for a provider fact.
- **A literal tested version in the getting-started skill**: drifts silently.
- **An `aw` field in OATS's catalog**: a second copy plus a kernel change.
- **Pinning hosted installs as well**: reverses the integrations decision's
  rejection of an install pin outright, and its owner has not been asked.
- **Always replacing an installed aw with `tested`** on the customer-run
  branch (rejected 2026-11-19): it rolls a newer client back.
- **Stopping the customer-run branch on a newer aw** (rejected 2026-11-19):
  it refuses where the integrations decision's stance is to warn.

# How to apply it

A future maintainer asked to "pin the client" or "say where the tested
version lives" should take the provider file at the catalog-pinned ref as the
answer and keep the pin to the customer-run branch; reopening the manifest
route collides with the kernel schema, and pinning every install collides
with a recorded decision. A release that moves the oats.aweb pin carries the
file's `tested` change into the kernel release's upgrade notes, as
[a provider pin carries its upgrade consequences into the kernel release](/nodes/oats-maintainer/lessons/provider-pin-upgrade-notes-belong-in-the-kernel-release.md)
requires. Why a tested bound must stay coupled to real-client jobs is owned by
the integrations decision and
[real-binary tests that skip give no cover](/nodes/integrations-expert/lessons/real-binary-tests-that-skip-give-no-cover.md);
why real-aw pins age with the installed client is the
[messaging package expert's lesson](/nodes/oats-aweb-expert/lessons/real-aw-pins-age-with-the-installed-client.md).
The file's name, location and exact shape belong to the provider and its
expert's node, not here.

# Limits

Not yet built at the time of recording: the provider change was reported as a
pending oats-aweb PR, and the getting-started change as open setup-lane
issues [1]. This records the decision and its rationale, not shipped
behaviour, a current compatibility table, or a certification of the
provider's CI. Both sides' agreement and the four conditions are
source-reported from the lanes' exchange; this harvest read the two issues and
the schema, not the exchange. The getting-started side, the newer-aw case
included, was later built and merged in oats#1962 (2026-11-19) [3]; the
2026-11-19 agreement is likewise source-reported, relayed by the setup lane
on that PR, not a human's own record.

# Citations

1. [oats-project/oats#1775](https://github.com/oats-project/oats/issues/1775)
   (unpinned aw install) and
   [oats-project/oats#1774](https://github.com/oats-project/oats/issues/1774)
   (no BYOT branch), both `lane:setup`, opened 2026-11-09 from the BYOT lab.
   Read by this harvest on 2026-11-09: both open, no comments; #1775 asks
   for a pin in the skill, which is the rejected literal route. The decision
   itself is not recorded on either issue.
2. `docs/oats-package.schema.json` in oats-project/oats, read by this harvest
   on 2026-11-09 at its latest change (2026-09-28): `compatibility` has the
   single property `oats`, is `required: ["oats"]`, and sets
   `additionalProperties: false`.
3. [oats-project/oats#1962](https://github.com/oats-project/oats/pull/1962)
   (getting started on the person's own aweb server), `lane:setup`, merged
   2026-11-19 as `b25111fb` from head `1b0c47c0`. Read at review on
   2026-11-19: the setup lane's ESCALATE at `c3ae543a`
   ([issuecomment-7016642633](https://github.com/oats-project/oats/pull/1962#issuecomment-7016642633))
   quoting this concept's open point, and its answer
   ([issuecomment-7017032491](https://github.com/oats-project/oats/pull/1962#issuecomment-7017032491))
   reporting both sides' option (b) and the other side's three precisions;
   the merged `skills/oats-getting-started/SKILL.md` step 4 carries the
   INSTALL, EQUAL and NEWER outcomes and the hand-over line as stated above.

Evidence: OKF proposal from oats-maintainer/setup-maintainer-pepe,
2026-11-09; notes/tested-aw-is-published-by-oats-aweb-and-pinned-only-for-byot.md.
The newer-aw paragraph: OKF proposal from oats-maintainer/setup-maintainer,
2026-11-19; notes/byot-keeps-a-newer-installed-aw.md.
