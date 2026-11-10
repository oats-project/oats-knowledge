---
type: Decision
title: An uncertain publication refusal carries fixed diagnostic constants, never git's or the remote's text
description: The knowledge package's uncertain push and delete refusals carry a phase, exit code, allowlisted signal, timeout, elapsed time and an optional cause token from a fixed table matched only on git's own client-side stderr under a C locale; raw and redacted stderr were both rejected, because a gate that withholds output for safety still owes a fixed-vocabulary diagnosis of its own failures.
about: [workstream/oats-direction, workstream/knowledge]
id: dec-19bb83edf17a
tags: [knowledge, publication, diagnostics, security, review, okf]
timestamp: 2026-11-04
---
# Decision and acceptance evidence

The source reports that both directing humans' sides decided this together
on 2026-11-04, after the first live publication on the released knowledge
package refused as uncertain and the cause could not be recovered. The
build is reported merged in the package on 2026-11-06 after review by both
sides and the release lane's sign-off. The acceptance is source-reported
from the lane records the proposal names; this harvest read neither the
records nor the package change.

The publication helper deliberately discards every child process's stdout
and stderr, so remote text and credentials cannot leak into a refusal. The
first real failure showed the cost: the refusal could not say whether the
push itself failed or the check after it disagreed, and the retained record
held no cause. The decision adds diagnosis without giving up the no-leak
property:

- The error codes, the operational exit status, the no-automatic-retry rule
  and the retained artifacts are unchanged. The new fields are additive.
- A **phase** names where the operation stopped (the push, or a read-back
  that found the ref absent or found another value); the object id is never
  printed.
- The other values are fixed-form: exit code, an allowlisted signal name,
  whether a timeout fired, elapsed milliseconds.
- An optional **cause** is one constant from a fixed table (authentication
  required or denied, host unresolved, connection failed). It is matched
  **only on git's own client-side stderr lines**; `remote:` and
  `fatal: remote error:` lines, protocol tails and stdout are never inputs.
  The push child runs under `LC_ALL=C` so the table matches in any locale.
  Because the output is always a constant, a crafted line can at worst
  select a wrong token, never carry text through.

The exact constants, field names and table entries at each version are the
package's facts, kept in its code and tests and in the knowledge package
expert's node, not here.

# Why the cause is derived from stderr after all

One side first held that no hint may be derived from stderr: only git's
`--porcelain` status should speak. The other side showed why that fails for
the commonest cause. An authentication failure is exit 128 with empty
stdout, and a public repository reads anonymously, so a credential problem
would stay invisible to a porcelain-only diagnosis. Mapping client-side
lines to constants keeps the no-leak property while naming that cause.

This applies the kernel lesson that
[hook failures and error messages are output channels](/nodes/oats-kernel-expert/lessons/hook-and-error-channels-disclose.md):
suppression is for secrets the caller cannot know, and status plus fixed
context is then the whole diagnosis. It sits beside the display decision
that [references are rebuilt from recognized parts or withheld](/nodes/oats-maintainer/decisions/reference-display-is-rebuilt-or-withheld.md):
an allow-list vocabulary is accepted over stripping unknown text.

# Rejected alternatives

- **Raw stderr in the refusal.** It reintroduces the leak the gate exists to
  prevent: remote banners and credential-bearing URLs reach reports,
  notifications and the retained record.
- **Redacted stderr.** Redaction is for secrets the caller knows; a remote's
  text can carry what no pattern anticipated. Review must not accept
  redacted remote text in an error result as equivalent to a constant.
- **An operator capturing diagnostics by hand around one approved attempt.**
  Ad hoc, and every later failure would be as blind as the first.

# Rule for review

A gate that withholds a child's output for safety still owes a
fixed-vocabulary diagnosis of its own failures. Check for it before the
first live run of the gate, not after. A proposed error result that carries
tool text, raw or redacted, is returned.

# Evidence

Evidence: OKF proposal from oats-maintainer/setup-maintainer-pepe,
2026-11-06; notes/uncertain-push-refusals-carry-fixed-diagnostics.md.

# Citations

1. Source-reported joint decision of 2026-11-04 (lane records 260d1810 and
   3d6b1e79 in the proposal's words) and the package build
   [oats-okf#126](https://github.com/oats-project/oats-okf/pull/126),
   reported merged 2026-11-06. Neither the records nor the merge were read by
   this harvest.
