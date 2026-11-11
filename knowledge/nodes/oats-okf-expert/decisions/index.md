# Decisions

Accepted positions on how the knowledge package behaves.

* [The package's retired 4.x source admission ignores non-soul removed harvest keys and decides the soul opt-out first](retired-4x-host-harvest-keys-carry-no-authority.md) - For a source resolved through its retirement recovery, the knowledge package ignores the removed 4.x keys `harvest`, `harvest-runtime` and `harvest-model` when the host, spawn or workspace recorded them, decides the opt-out first from the recorded soul.yaml text, keeps refusing live 4.x records and refuses any soul `harvest:` value other than `off`; the decision and its rationale are canonical in the oats-maintainer node.

* [Personal-data exclusion is one shared instruction, not a publication guarantee](personal-data-exclusion-is-not-a-publication-guarantee.md) - The personal-data exclusion uses one shared wording to preserve lessons without identifying outsiders, while a pre-push hold was rejected as a guarantee unless publication authority is separated.

* [Consult explores accepted knowledge remotely; instances get no knowledge copy](consult-explores-accepted-knowledge-remotely-no-per-instance-copy.md) - Read-only consult commands serve a base's accepted commit from one host cache with receipts; no instance holds a copy.

* [Readers tolerate a stale generated index and a missing id on a bridged base; writers' gates refuse them](readers-tolerate-a-stale-index-and-a-missing-id-writers-refuse-them.md) - Spawn, the subject verbs and (6.0.2) `bases` warn W_INDEX_STALE / W_ID_MISSING and read; strict validation, `okf-reindex --check`, migration and publication refuse; the 6.0 view format is final.
