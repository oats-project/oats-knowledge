---
type: Decision
title: A live test against another party's BYOT lab uses a dedicated sub-namespace whose controller key is generated on the test VM
description: The test VM generates a fresh controller key for a sub-namespace kept for the run; only the public DID and the _awid TXT value leave it, the lab publishes the record, and the key is shredded with the VM. No key moves between hosts, and no outside party needs a route into the tester's host.
about: [workstream/provider-integration]
kind: decision
id: dec-7df874144914
tags: [byot, live-rehearsal, vm, keys, namespace, awid]
timestamp: 2026-11-19
---

# The decision

For a live run of a BYOT path against a lab someone else operates, the test VM
prepares a controller for a dedicated sub-namespace of the lab's domain
(`aw id namespace prepare-controller --domain <sub> --registry <RG>`). It sends
only the controller's public DID and the `_awid.<sub>` TXT value, through the
lab's team, and the lab publishes the record after its own DNS review. The
run's teams live in that sub-namespace. At teardown the VM user's controller
key and team keys are shredded, the VM is destroyed, and the tester tells the
lab in so many words ("keys shredded, VM down"), on which the lab takes the
record down.

# Why

The first plan had the lab's operator place the namespace's controller key on
the VM. The VM's ssh listened only on the tester's host, and that host was
reachable only on its owner's private network. So the plan needed the host
owner's decision about outside access, and a custody plan for a key crossing
hosts. Generating the key on the guest removes both. The sub-namespace keeps
the run's teams apart from the lab's own namespace and is cleared as a unit.
The lab (aweb) proposed this route, and it carried run 2 of
oats-project/oats#1962: both team forms created, `member: true`, spawned and
ready, with no key custody question.

# How to apply

- Ask for this route before planning any key transfer.
- On a private registry, the TXT value must name that registry: [a namespace on a private AWID registry needs that registry in its TXT record](/nodes/oats-operator-expert/lessons/a-private-registry-namespace-needs-its-registry-in-the-txt.md) is the canonical home of that check.
- Keep "no agent reads, copies or prints the key" in the helper's brief, and make the teardown report explicit.

Checked at maintainer review, 2026-11-19: run 2's report on
[oats-project/oats#1962](https://github.com/oats-project/oats/pull/1962#issuecomment-7017471565)
states that the controller key was generated on the guest and never left it,
that `aw id namespace check-txt` matched, that the committed-mapping form (on
oats.aweb `ad1f8ddd`) and the `localTeams: true` form (on v1.43.0) each
created the team with `member: true`, a spawned setup expert and readiness
11/11, and that keys were shredded and the VM destroyed after the run. The
report on
[oats-project/oats#1966](https://github.com/oats-project/oats/issues/1966#issuecomment-7017472134)
states that `prepare-controller` needs `--registry <RG>` on a private
registry, or the `_awid` TXT value names the public one; the detail is kept
in the operator lesson linked above, not repeated here. #1962's body, before
run 2, records the run as waiting on the host owner's decision about lab
access to the VM. Source-reported, not on those records: that the first plan
moved the lab's key onto the VM, that the lab proposed this route, and that
the lab published the record after its DNS review and removed it at teardown.

Evidence: OKF proposal from oats-engineering-expert/byot-getting-started-lead, 2026-11-19; notes/byot-live-test-generates-its-key-on-the-guest.md. Run 2 results on oats-project/oats#1962 (issuecomment-7017471565) and #1966 (issuecomment-7017472134).
