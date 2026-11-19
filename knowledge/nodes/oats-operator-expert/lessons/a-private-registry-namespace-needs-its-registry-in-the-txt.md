---
type: Lesson
title: A namespace on a private AWID registry needs that registry in its TXT record
description: The controller's _awid TXT value names a registry, and preparing the controller without that registry produces a record for the public registry; check registry= before the record goes for publication.
about: [workstream/operations]
kind: lesson
id: ins-481cb6cf4075
tags: [operator, byot, aweb, awid, dns, namespaces]
timestamp: 2026-11-19
---
# The DNS record carries the registry

On aw 1.36.58, `aw id namespace prepare-controller --domain <ND>` writes the
controller key locally and prints the `_awid.<ND>` TXT value. With
`--registry <origin>` the value is `awid=v1; controller=<did>;
registry=<origin>;`. Without the flag the registry is the public one, or an
ambient `AWID_REGISTRY_URL`, and a value for the public registry carries no
`registry=` field at all: only the human output's separate `Registry:` line
names it. A deployment's
`oats aweb setup --registry` setting (oats.aweb 1.43.0) does not reach this
step: it is plain aw, run as the person's own prerequisite before any team
exists. For a namespace on a private registry, pass `--registry <origin>`
and check that the value itself carries `registry=<that origin>` before
sending it for publication; a value with no `registry=` is the public form.

**Why it matters:** the record is a slow, reviewed, outward act, published
by whoever owns the domain's DNS. One published with the public registry
costs a review round, or points the namespace at the wrong registry.

In the source's run, the key's metadata kept the registry given at
creation. A rerun without the flag printed the public form for the same
key and left that metadata unchanged. `check-txt` then reported the
private registry and `status: matched`, and the own-server create
succeeded against it. These are single observations on one aw release,
not a contract: requalify on a newer aw.

The reviewer reproduced the local part on aw 1.36.58 with a throwaway home
and reserved example domains: the TXT forms above, and a rerun without the
flag printing the public form while the key's metadata kept the registry
given at creation. `check-txt` and the own-server create are
source-reported.

# Elimination route

oats.aweb 1.43.0's own remedy for a missing controller key prints
`aw id namespace prepare-controller --domain <domain>` with no `--registry`,
even when `settings.oats.aweb.registry` is set. Carrying the recorded
setting into that printed command, as the provider already does for the
cleanup command retire prints, would remove this trap for the setup path.
That is a proposed fix for the provider's owner, not an implemented one;
until it ships, this check stays manual.

Evidence: OKF proposal from oats-operator-expert/byot-vm-run-helper,
2026-11-19; notes/private-registry-txt-needs-registry-flag.md.
