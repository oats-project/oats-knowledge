---
type: Lesson
title: Onboarding evidence follows the installed client, provider and live service
description: A newcomer onboarding result must name the client resolved by the ordinary install, the selected catalog provider and the observed live service release, because those versions can move independently.
about: [workstream/operations]
kind: lesson
id: ins-ad641471f401
tags: [operator, onboarding, acceptance, versions, hosted-services, pins]
timestamp: 2026-11-10
---
# The release a newcomer gets is part of the test

For an onboarding route using an unqualified npm install, select the client
from the registry's `latest` tag at the run's start, not the newest published
tag or `next`. Record the tag resolution and the version actually installed,
the selected catalog provider version, and the hosted service's observed
release. In the reported aweb campaign, the service observation was its
`/health` `release_tag` and commit SHA.

The catalog pin alone cannot freeze a hosted service or establish which
client the registry gives a newcomer. These are three necessary coordinates
of the tested combination, not a complete environment specification: retain
the kernel, platform, account-state and harness context relevant to the
proof as well. This refines the operator's test design under
[second-operator acceptance](/nodes/oats-maintainer/lessons/second-operator-acceptance.md);
it does not replace the independent-verifier or published-combination gates.

If `latest` moves during a run, finish with the starting installed client
and label that result rather than silently attributing it to the new tag.
If the hosted service changes account or team setup, rerun the
[scripted provider pre-check](/nodes/oats-operator-expert/lessons/scripted-provider-checks-separate-product-from-harness.md)
and the affected newcomer acceptance path on the new combination. A prior
pass is not evidence for an untested deployment. A start-of-run service
observation is not proof that the service stayed unchanged throughout a run.

# Why this was needed

The source's 2026-11-05 campaign reports that aw's newest build was briefly
on `next` while `latest` stayed behind awaiting a service deployment, then
`latest` moved. It also reports that the hosted service changed new-account
setup between the pre-check and the full run without that change being a
client update. Reading one repository or the catalog could not establish
which combination a newcomer met at that moment.

This is a version-drift finding, not a current release inventory or evidence
that the later deployment passed. Combine it with
[fresh-account and same-workspace second-machine coverage](/nodes/oats-operator-expert/lessons/fresh-machines-do-not-reset-account-history.md):
matching versions alone does not reproduce service-side account history.

# A pinned client is checked against the client the path was proven on

When the install pins the client to a provider's published tested bound
instead of taking `latest`, as the customer-run (BYOT) onboarding branch does
under
[the tested aw version is published by oats.aweb and pinned only for a customer-run server](/nodes/oats-maintainer/decisions/tested-aw-is-published-by-oats-aweb-and-pinned-only-for-byot.md),
the bound is a coordinate too: record the value read and the provider ref it
was read at, not only the version installed.

Before accepting such a pin, compare the bound with the client the onboarding
path was actually proven on. A tested bound can lag the registry: the source
reports that on 2026-11-09 the provider's tested aw was 1.36.53 while npm
`latest` was 1.36.56, and the customer-run create fix had been proven on
1.36.56. Pinning to the unchanged bound would have installed a client the
path was not built on, with every acceptance check reading green. The remedy
is to raise the bound in the provider's own release, with the real-client
evidence its matrix requires, before the consumer pins to it; never to loosen
the pin, read the bound from a moving branch, or hard-code the newer version
in the skill. The source reports that the provider release did raise `tested`
to 1.36.56 together with publishing the bounds file; this harvest confirmed on
the forge that [awebai/oats-aweb#211](https://github.com/awebai/oats-aweb/pull/211)
merged on 2026-11-09 with that title, and read nothing else of it.

The pin decision, its rejected alternatives and the hosted-versus-customer-run
split are owned by the maintainer decision above; why a newer-than-tested
client warns rather than refuses is owned by
[newer-than-tested warnings follow the service's release authority](/nodes/integrations-expert/decisions/newer-than-tested-warnings-follow-release-authority.md).
This section adds only the operator's check, and the version values are a
dated example, not a current compatibility table.

# Elimination route and evidence

Make version capture part of the trial driver and bind each result to that
record. Check at reporting time for observed tag or service changes and
label untested combinations explicitly rather than reusing an old pass.
Collector tests can catch missing or mismatched records; they cannot certify
an unobserved service state. This is proposed acceptance automation, not an
implemented detector or a second provider API specification.

Evidence: OKF proposal from oats-operator-expert/oats-operator-expert-onboarding-vm-campaign, 2026-11-05; notes/newcomer-version-is-what-a-plain-install-gets.md.
The pinned-client check: OKF proposal from oats-operator-expert/oats-operator-expert-onboarding-vm-campaign, 2026-11-10; notes/byot-aw-pin-reads-provider-file-at-catalog-ref.md.

The release movement and account-setup change are source-reported. This
harvest read the captured note, not service logs or the trial driver, and did
not rerun onboarding. The capture does not give the pre-check's complete
provider/kernel combination; none is inferred from an earlier campaign.
