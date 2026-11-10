---
type: Lesson
title: A repository move's inventory follows what each consumer reads at run time and who writes it; a hand-kept per-host file never follows the declaration and needs its own step per host
description: When a repository moves or a contract changes, inventory the places that name it by the file each consumer actually reads and by who writes that file, not by what the declarations say; a hand-kept per-host file that no command rewrites never follows a change to the declaration, so it gets a named step per host in the runbook, and a fix is chosen only after a trace through the code shows which source the consumer reads.
about: [workstream/coordination, workstream/knowledge]
kind: lesson
id: ins-179070d48a99
tags: [planning, migration, repositories, inventory, configuration, hosts, runbook, knowledge]
timestamp: 2026-11-04
---
# A declaration can be read by nobody

A move plan inventories what names the repository: workspace members,
backlinks, the catalog, the workspace's declared stores, the triggers, and
the per-host keys such as the local override file and the clones. Every
entry on that list is a *declaration*: a key the plan can see in a file and
change. What the list does not show is whether anything reads each key, and
what a consumer reads instead when it does not.

The day after the OATS knowledge repository moved to its new organisation,
the source found the gap. The workspace's `stores:` block was on the
inventory; the per-host knowledge bindings file was not. The knowledge
provider reads the bindings file for the repository's clone locator and PR
repository, and the workspace's own comment beside `stores:` says the
provider does not read that block. No OATS command writes the bindings
file: not sync, not spawn, not a hook. It is provisioned by hand on each
host, so it never follows a change to the workspace, however many declared
keys the move flips.

The consequence was not a refused read but a half-finished publication.
Every harvest from a host whose bindings still named the old owner opened
its PR, then reported the result as uncertain, because the forge answered
with the repository's canonical URL under the new owner and the provider's
literal prefix check refused it. Each of those harvesters stayed up, as a
publication failure requires, with nothing wrong in the base.

# What a move plan does with it

- **Inventory by consumer, not by declaration.** For each provider or
  client that names the repository, ask two questions: *which file does it
  read at run time*, and *who writes that file*. A key that no consumer
  reads is noise on the list; a file a consumer reads that no declaration
  feeds is the entry the list was missing. The list is complete when every
  consumer's read source has an owner and a step.
- **A hand-kept file gets a named step per host.** When the writer of a
  read source is a person, the plan cannot flip it once; it names the edit
  for each host, with who does it and how it is checked, beside the shared
  declaration changes. The operator's rule that
  [a setting has effect only if the installed provider reads it](/nodes/oats-operator-expert/lessons/the-installed-provider-is-the-authority-for-a-setting.md)
  is the same fact seen from the configuring side; here it bounds what a
  move plan may count as done. For the knowledge bindings file, how the
  edit is checked is the operator's
  [spawned-home bindings check](/nodes/oats-operator-expert/lessons/check-local-knowledge-bindings-from-a-spawned-home.md):
  an edited file is not by itself a receipt that an existing home's
  effective binding changed.
- **Trace before choosing the fix.** The first fix decided for this gap
  assumed the declared `stores:` line fed the harvester, and a trace
  through the provider's code corrected it before a pull request claimed a
  fix it would not have made. The declared change was still made, for the
  declaration's own sake, but the pull request says only that, and names
  the per-host edit as what repairs publication. Separate "declared" from
  "read" in the trace itself, the way
  [a "done" item is traced to the code that produces it](/nodes/oats-expert/lessons/trace-done-items-to-owning-code-before-accepting-repo-list.md):
  a declaration that looks authoritative may be read by nobody.

This is a second inventory dimension beside the one the
[attestation lesson](/nodes/oats-expert/lessons/a-transfer-leaves-attestations-with-the-old-org.md)
added for the same move: that one lists a redirect-dependent *path* the
rehearsal never exercised; this one lists a *read source* whose writer is
a person. Neither is visible from the declared keys. Both refine the
inventory step of the maintainer's
[staged move decision](/nodes/oats-maintainer/decisions/oats-moves-to-its-own-org-in-stages.md),
whose finding that "a transfer alone is invisible" held for every
consumer whose read source a command or the forge keeps current; that
decision is that node's owner's to update.

# Elimination route

Two routes remove the failure, both the knowledge provider's owner's to
decide and neither delivered at harvest time: the provider accepting the
forge's canonical URL for a repository it created, tracked as
[oats-project/oats-okf#123](https://github.com/oats-project/oats-okf/issues/123);
and the bindings file deriving from, or being checked against, the
workspace's declared store, which would remove the drift itself. The
declaration change is [oats-project/oats#1740](https://github.com/oats-project/oats/pull/1740),
open at harvest time. The planning rule (inventory by read source and
writer; a per-host step for a hand-kept file) has no code home and lives
here until a move runbook or planning skill carries it.

# Evidence and limits

Evidence: OKF proposal from oats-expert/oats-org-migration-expert,
2026-11-04; notes/a-move-must-list-hand-kept-host-files.md.

One move, one provider, observed on the day after the OATS knowledge
repository transferred. The failed harvests, the comment beside `stores:`,
the absence of a writer for the bindings file and the trace through the
provider's code are source-reported; this harvest did not read the
provider's code or the failed harvesters' reports. It ran from a host
whose bindings had been edited by hand to name the new owner, so its own
publication exercises the per-host step once; it is not a test of the
provider fix.
