# Lessons

Lessons learned operating and evolving the knowledge package.

* [A text check of a soul.yaml declaration must match a key position, not a word boundary](soul-yaml-text-check-anchors-to-a-key-position.md) - The harvester reads the source soul's soul.yaml as text on purpose, so every check of a declaration there is a regex over the whole file; anchor it to a key position (a line start, or after `{` or `,` in a flow mapping), never to `\b`, which sits between `-` and a letter and makes a bare-word setting match a capability id such as `oats.okf-harvest:`; and sweep the repository's real soul files when reviewing or testing a new text check, because a fixture without such a capability cannot catch it.

* ["Respawn under 5.0 before harvesting" never carried a 4.x seat's notes](respawn-never-carried-a-4x-seats-notes.md) - Respawn is retire-then-spawn, a record is never rewritten and the old notes survive only in the retirement recovery copy whose record carries the same removed 4.x keys, so respawn gives the soul a fresh 5.x seat with empty notes; the retired-source admission is the route to an old seat's notes, and hand-copying into a live 5.x seat that re-proposes under its own name is the only fallback.

* [A fetch inside the publication gate passes an empty --refmap= and reads the tip from FETCH_HEAD](a-fetch-inside-the-publication-gate-passes-an-empty-refmap.md) - A source-only fetch still applies the clone's configured refspec destinations and can overwrite a local branch before any compare-and-swap; every helper fetch passes an empty `--refmap=` and the gate reads the tip from `FETCH_HEAD^{commit}`.

* [A local Git base under the calling instance's home is refused as disposable source custody](a-local-git-base-under-the-instance-home-is-refused-as-disposable-custody.md) - From inside an instance the CLI (5.8, unchanged in 6.0.2) refuses a local `kind: git` base under that home (`E_PATH`); rehearse with a cleared environment and the repository outside any home.

* [The frontmatter scalar reader strips one leading and one trailing quote independently](the-frontmatter-reader-strips-one-leading-and-one-trailing-quote.md) - A title or description that begins or ends with a quoted phrase loses one quote in every reader and view; generators parse as the reader does, affected concepts get a content edit.

* [The OATS knowledge base's own CI pins the node roster, so a base-metadata change carries a CI change](the-oats-bases-own-ci-pins-the-node-roster.md) - The base's adapter asserts the exact node list and distinct owners beyond OKF's checks; a change to okf-base.json needs the adapter changed in the same PR.

* [A local publish command binds what it publishes to immutable objects](a-local-publish-command-binds-what-it-publishes-to-immutable-objects.md) - Six rules keep `oats okf propose --apply` publishing only what `--check` showed, although other processes of the same user can change the proposal directory and clone between the two steps: bind by immutable ids, keep Git state inside the clone, pass no file-read value to Git as an option, validate stored blobs not a checkout, carry no tool output in errors, and share one grammar between the provenance writer and parser.

* [GitHub branch-protection reads answer in three ways, and only two successful reads mean no protection](github-branch-protection-reads-answer-in-three-ways.md) - The rulesets read never shows classic protection and the classic read tells "unprotected" from "unreadable" only by its 404 body, so a branch can be concluded unprotected only when both reads succeed and neither gates; a failed read means unknown, never none.

* [Code that writes into a base checkout refuses links and non-regular files before its first read](code-that-writes-into-a-base-checkout-refuses-links-before-its-first-read.md) - The regenerator and `propose --check` walk the tree first and write through temp files; strict validation runs too late to protect a write.

* [Anything that newly parses a value every base carries must be linear in the input](new-parsing-on-every-base-must-be-linear.md) - New parsers run on every base inside a 30 s deadline; 5.8's comment-strip regex is quadratic on long whitespace; cursor scanners with equivalence tests.

* [A generated Markdown link must read back its own file through consult's path rules](a-generated-link-must-read-back-through-consults-path-rules.md) - Paths holding `?`, `#` or `%` are never linked (`E_PATH`), else an index entry resolves to a different claim.

* [On Node, a Map or Set keyed by long untrusted text is quadratic; key through a bounded key](long-untrusted-keys-make-a-map-quadratic-on-node.md) - V8 hashes strings over 16383 characters by length; key base text through a bounded key and filter against short trusted keys.

* [propose prepares, judges and publishes one tree of stored blobs, never a checkout](propose-judges-and-publishes-stored-blobs-not-a-checkout.md) - Git ident, working-tree-encoding and clean filters make checkout bytes differ from committed bytes; the accepted side is read from blobs and `--apply` stages the checked tree.
