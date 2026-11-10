---
type: Decision
title: Reference display is rebuilt from recognized parts or withheld
description: One allow-list renderer serves messages and JSON alike, accepting the diagnostic cost of withholding unrecognized references rather than trying to strip every possible credential span.
about: [workstream/oats-direction]
id: dec-d9bacbf05afa
tags: [coherence, security, diagnostics, references, rendering]
timestamp: 2026-10-14
---
# Decision and rationale

The source reports agreement on 2026-10-13 that repository references and URLs
have one display function for messages and JSON fields alike. A field naming
a place for a person is an output channel, not a safe exception because it is
structured data. Keeping user information out of storage does not make the
refusal that echoes it safe.

The consequential choice was **construction rather than subtraction**:
recognize a reference unambiguously, rebuild its display from the allowed
scheme or scp form, host, optional port and path, and carry no user information.
An unrecognized value is replaced whole by fixed text. No branch returns an
unexamined remainder of its input. An exact command input is a different
contract: identify the reader that genuinely needs exact data before granting
such an exception to a display field.

Repeated probes had found credentials surviving in malformed and composed
references, even after a shared redactor replaced duplicated renderers.
Rejected alternatives were more matcher exceptions, a final check limited to
scheme URLs, and an ambiguity detector layered over the same matching problem.
The allow-list accepts losing harmless diagnostic detail when the value cannot
be safely recognized. One function alone is insufficient if its modes do not
share that invariant.

# Explicit refinement within the decision

The note records a partial supersession later on 2026-10-13: **bounded plain
text is shown as written** for refused references and rejected arguments,
rather than withholding every unparsable value. This exception does not apply
to pinned composite sources or Git's diagnostic lines. Clean mistyped
arguments had made ordinary refusals unhelpful. The accepted
exception is itself a positive recognition: a short bounded string from a
restricted harmless character set, excluding `@` and control characters.
The precise grammar belongs in the renderer's contract and tests, not a
second knowledge implementation.

Judge the original value once. A host or path fragment derived from a withheld
original must not gain permission to print just because the fragment alone
looks plain. Git's diagnostic prose has a separate whole-line rule; this
reference-value decision does not authorize tokenizing and selectively
returning fragments of arbitrary tool output.

# Enforcement and canonical boundary

The [kernel output-channel lesson](/nodes/oats-kernel-expert/lessons/hook-and-error-channels-disclose.md)
owns the general disclosure and real-entry-point evidence rule. This decision
adds the later maintainer tradeoff between strip-based redaction, construction,
withholding and useful plain diagnostics; it does not duplicate the earlier
reachability investigation.

Keep shared rendering and generated hostile-input regressions as the real fix,
covering every output route. Review clean documented inputs as well as hostile
ones: a confidentiality repair can still regress the useful answer. This
records the design rationale, not a certification of the current renderer or
an instruction to reconstruct its grammar from prose.

# Evidence

Evidence: OKF proposal from oats-maintainer/polaris-oats-maintainer-pepe, 2026-10-14; notes/a-url-is-printed-through-one-function.md.

The note attributes the output rule to [awebai/oats#1077](https://github.com/awebai/oats/issues/1077),
and the construction/withholding choice and its plain-value refinement to
[#1090](https://github.com/awebai/oats/pull/1090), comments 6151001698 and
6153342556 respectively. Acceptance and experiments are source-reported;
this harvest did not inspect those discussions or reproduce the probes.
