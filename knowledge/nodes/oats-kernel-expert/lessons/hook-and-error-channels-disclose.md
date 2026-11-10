---
type: Lesson
title: Hook failures and error messages are output channels
description: Output safety requires caller-aware redaction or suppression, and a disclosure claim must exercise its real entry point rather than infer reachability from an unsafe renderer.
about: [system/oats-kernel]
kind: lesson
id: ins-f4fd4c506505
tags: [kernel, hooks, security, secrets, capabilities, logging, verification]
timestamp: 2026-10-13
---
# Lesson

Learned 2026-07-27 when a required spawn hook's failure text carried a
still-valid invite token into every operator log and the Desktop. Switching a
subprocess call from a shell string to an argument vector removes the
*injection* class and is worth doing — it does nothing about *disclosure*. A
subprocess failure carries its full argument list into its error, and a
required hook's fatal message is deliberately loud: it reaches every operator
log, the Desktop, and any human debugging the spawn, none of whom are
necessarily authorised to hold what the arguments held. Nor does an argument
vector prevent *option* injection: a value that crossed a trust boundary and
begins with a dash is still a flag to the program invoked.

**Any command whose arguments include a credential rebuilds its failure path
from scratch**: program, exit status, scrubbed diagnostics — never the
arguments. The caller is the only party that knows which argument was
sensitive, so the caller says so, and scrubs the tool's own echo of what it
rejected.

**Redaction is for secrets you know; suppression is for secrets you cannot
know.** Naming the secret works for the command that *spends* it. It cannot
work for the command that *mints* one: when creation fails after the fresh
secret was already printed, the caller has no value to scrub because the value
is precisely what it never received — and a structured-parse error quotes its
input, which *is* the credential. Credential-minting commands therefore run in
a mode that discards the child's output entirely, with status plus fixed
context as the whole diagnosis.

**The success path is a channel too.** Hardening every failure path still left
a token printable on a clean exit, because a reply field was copied straight
into the instance's durable metadata and briefing. Treat a command's output as
untrusted input, not as data already owned: validate each field as a plausible
value of its own kind, reject anything carrying a secret you hold, and fall
back to the value *you* requested — which you always know, because you asked
for it. That last point makes the check free of judgement calls.

Whatever a failing operation held, its exception holds too. Kernel↔capability
hook contracts inherit this: the kernel prints and stores hook failures by
design, so the disclosure discipline belongs on the capability side of the
boundary, and the kernel must not assume hook output is safe to persist.

# Establish reachability before filing or gating

An unsafe renderer and a reachable disclosure are different findings. A
constructor called directly proves what it does with that argument, not
whether a file or public command can supply it. Before filing or gating on
that downstream claim, trace the schema and parser in front of it and run
the disputed entry point. For a file-input claim, use the installed CLI on
an isolated scratch file; for a disputed parser admission, exercise the
parser with the alleged input. Inspect the first refusal's output too:
blocking the value from a later sink does not make that refusal safe.

The source reports two corrections on 2026-10-13 [2]. A hostile launch-pin
key was rejected by file validation before the unmatched-pin constructor,
but the schema refusal exposed the key through its diagnostic pointer. A
credential-bearing URL was refused by the reference parser before the
alleged remote-read failure, but the parser's own refusal repeated the
reference. Both downstream claims had already influenced decisions. An
explicit code-inspection-only caveat on an issue did not prevent that;
entry-point evidence changed which defect was being decided. These are
source-reported investigations, not experiments rerun by this harvest.

The second correction narrowed its downstream claim; it did not remove it.
The refused forms were the http(s) ones. The parser admits an `ssh://` URL
written with a password, and from some entry points that form reaches the
read failure's message and fields [3]. An entry-point run sorts input forms
between layers, so report which form each layer answered, not one verdict
for the whole claim.

**Upstream rejection does not settle an exported renderer's own promise.**
In the first case the source reports that the maintainer retained a small
constructor fix even after lifting the reachability gate: the exported
function documented safe rendering as its own guarantee [2]. Enforcing
that promise locally, with a direct hostile-argument test, avoids depending
on every caller's validation. Describe it as hardening the constructor's
contract, not as proof that the original file-driven defect was reachable.
This rationale is conditional on the function's promise and the small local
fix, not a blanket requirement to duplicate every upstream check.

The elimination route is shared safe rendering/redaction and regression
coverage at both boundaries: direct tests for an exported renderer's
promise, and entry-point tests that assert the actual accepting or rejecting
layer and the output it emits. Once a reproducer identifies the real
surface, fix and test that surface rather than leaving a warning in
knowledge. The remaining pre-filing evidence check belongs in verification
guidance; no such automation or skill change is claimed here.

# Related

[Retire warnings preserve event meaning and reader bounds](../decisions/retire-warnings-preserve-event-meaning-and-reader-bounds.md)
records the separate storage decision: enforce text bounds at the common
append boundary in the strict reader's units. That does not replace the
disclosure discipline above or make stored hook text authoritative.

[The CLI as a machine boundary](/nodes/oats-kernel-expert/lessons/machine-boundary-contract.md)
owns the output contract; the reachability check above establishes which
layer's output is actually under review.

[Narrow race evidence needs unpaused controls and bounded fixtures](/nodes/oats-kernel-expert/lessons/narrow-race-evidence-needs-unpaused-controls.md)
draws the same line for interleavings: a constructed failure shows that a
path can fail, not that the unmodified command reaches it.

[Integrity, origin and consent are different proofs](../decisions/trust-approval-and-consent-boundaries.md);
[A fail-closed guarantee is proven by its first real user](fail-closed-mechanism-proven-by-first-user.md).

# Citations

1. Migrated from agents/cli-dev/soul/knowledge @ 7838d3ca (execfile-error-secret-disclosure, public-refs-are-option-injection-vectors).

Evidence: OKF proposal from oats-kernel-expert/oats-kernel-expert-launch-pins, 2026-10-13; notes/schema-refuses-what-a-constructor-cannot-print.md; notes/look-for-the-existing-function-before-accepting-a-new-one.md.

2. The proposal and named notes attribute the launch-pin correction and constructor rationale to [awebai/oats#1064](https://github.com/awebai/oats/issues/1064), the earlier schema diagnostic surface to [#1069](https://github.com/awebai/oats/issues/1069), and the remote-reference correction to [#1077](https://github.com/awebai/oats/issues/1077). This harvest did not inspect those issues, audit the implementation, reproduce the runs or independently establish human acceptance; it preserves the investigation conclusion and source-reported rationale, not a current defect or release-status inventory.
3. Verified by the knowledge maintainer at review of the harvest on 2026-10-13. [awebai/oats#1064](https://github.com/awebai/oats/issues/1064) was filed from the Desktop lane on a direct call of the constructor, and says that the path from a file was read through the parser and not run through the CLI. Comment 6136093305 then made the fix a condition of the 0.53.0 tag and asked for a test that starts from a file. The kernel lead's run in comment 6136116150, on the installed 0.51.0 with the key pattern stated to be the same on main, got the schema refusal from `oats souls`, `oats doctor` and a spawn preview, and found the key raw in that refusal's pointer. Comment 6136177995 withdraws the gate and calls its own reason wrong. It keeps the function's change, because a function that renders a command does not rest on every caller having validated its input, and it keeps the file-driven test with its expectation changed to the schema refusal, so that a later widening of the key pattern shows. The promise at stake is the contract page's sentence about the refusal's texts, which the thread calls the constructor's documented sentence. [awebai/oats#1058](https://github.com/awebai/oats/pull/1058), merged on 2026-10-13 with both maintainer sides approving the head that merged, closes #1064 and describes both tests: the three commands on a file, and the constructors handed such keys directly. [awebai/oats#1069](https://github.com/awebai/oats/issues/1069), open at review, records the pointer finding as older than 0.53.0 and not a gate. [awebai/oats#1077](https://github.com/awebai/oats/issues/1077), open at review, was filed as read from the code and not run. Its first decision (comment 6136806788) asks for a run before the build and decides the direction on the reading. The author's correction (comment 6136869892) says the parser admits no http(s) URL with user information, that its refusal repeats the reference as written in the message and in a details field, and that an `ssh://` URL with a password is admitted; comment 6136880387 restates the scope on it. The fixture matrix in comment 6137105445 shows that form reaching the read failure from a catalog package source and from a direct read, while a configured workspace member is refused by the schema in either form. These comments are lead-lane and maintainer-lane records posted from the two maintainers' accounts, not evidence of human acceptance. This review did not read the source's notes, and checked no release.
