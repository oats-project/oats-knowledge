# Lessons

Lessons learned operating and evolving the knowledge package.

* [A text check of a soul.yaml declaration must match a key position, not a word boundary](soul-yaml-text-check-anchors-to-a-key-position.md) - The harvester reads the source soul's soul.yaml as text on purpose, so every check of a declaration there is a regex over the whole file; anchor it to a key position (a line start, or after `{` or `,` in a flow mapping), never to `\b`, which sits between `-` and a letter and makes a bare-word setting match a capability id such as `oats.okf-harvest:`; and sweep the repository's real soul files when reviewing or testing a new text check, because a fixture without such a capability cannot catch it.

* ["Respawn under 5.0 before harvesting" never carried a 4.x seat's notes](respawn-never-carried-a-4x-seats-notes.md) - Respawn is retire-then-spawn, a record is never rewritten and the old notes survive only in the retirement recovery copy whose record carries the same removed 4.x keys, so respawn gives the soul a fresh 5.x seat with empty notes; the retired-source admission is the route to an old seat's notes, and hand-copying into a live 5.x seat that re-proposes under its own name is the only fallback.

* [A fetch inside the publication gate passes an empty --refmap= and reads the tip from FETCH_HEAD](a-fetch-inside-the-publication-gate-passes-an-empty-refmap.md) - A source-only fetch still applies the clone's configured refspec destinations and can overwrite a local branch before any compare-and-swap; every helper fetch passes an empty `--refmap=` and the gate reads the tip from `FETCH_HEAD^{commit}`.
