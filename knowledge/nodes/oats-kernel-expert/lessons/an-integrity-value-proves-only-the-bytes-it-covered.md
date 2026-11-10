---
type: Lesson
title: An integrity value proves only the exact bytes it covered, and nothing about who produced them
description: Digest the bytes a consumer will reproduce, never a leniently decoded string; and a content-derived id proves content matches its hash, not authorship, so capture calls native turns content-addressed and preserves source signatures rather than claiming to create them.
about: [system/oats-kernel]
kind: lesson
id: ins-5f6be75d15d4
tags: [kernel, integrity, encoding, record, signatures, provenance]
timestamp: 2026-09-05
---
# Lesson

Learned 2026-07-29 (a template digest) and 2026-09-05 (turn-record
documentation). Two opposite mistakes about the same kind of value: claiming
a digest covers bytes it never saw, and claiming it proves more than content.

**Hash the bytes, never a decoded string.** A lenient UTF-8 decode replaces
undecodable bytes with U+FFFD and strips a leading BOM, so a digest over the
decoded string describes bytes that are not on disk and that nobody can
reproduce from the file. It passes every ASCII fixture. The rule: the digest
is computed over the raw bytes, and when a value is both hashed and handed
back for reuse, hash the representation the consumer will write back.
Re-encoding a decoded string is safe only under a decoder that refuses
invalid input and keeps the BOM (`fatal: true, ignoreBOM: true`, where
`ignoreBOM` means *do not strip*). That is why the kernel's config-document
integrity can re-encode its decoded source: its decoder is exactly that one,
and a reviewer who "simplifies" the decoder breaks the digest. The test that
catches it is a round-trip over a fixture with a BOM, a multi-byte character,
a NUL and a lone CR, not equality against a hand-computed constant.

**A content-derived id is not authentication.** A turn id (`t1:` plus the
SHA-256 of the canonical core) proves the stored core matches its hash; it
says nothing about who produced that core. Natively captured turns are
therefore *content-addressed*, not signed. Signed messaging rows keep their
source signature and signed payload verbatim; capture preserves that
signature, it does not create authentication. Documentation and review hold
both words apart.

# Related

[Integrity, origin and consent are different proofs](../decisions/trust-approval-and-consent-boundaries.md);
[Identity and location belong to the resolved object](resolved-object-not-referring-string.md).

# Current contracts

- [Current digest.mjs](https://github.com/awebai/oats/blob/main/lib/digest.mjs)
- [Current record canonical.mjs](https://github.com/awebai/oats/blob/main/packages/record/lib/canonical.mjs)

# Citations

1. Migrated from agents/cli-dev/soul/knowledge/lessons/digest-file-bytes-not-decoded-strings.md and agents/docs-expert/soul/knowledge/lessons/content-addressed-turn-ids-not-authentication.md @ 7838d3ca.
