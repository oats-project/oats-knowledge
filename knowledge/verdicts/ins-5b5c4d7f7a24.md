---
type: Verdict
title: "Superseded: A restart runs the provider's check before it stops, but the check never sees the launch's model"
description: The model-blind planned launch of OATS 0.70.5 is superseded by the planned launch that carries the launch's model (oats-project/oats#2126), so a restart refuses a bad model before it stops.
verdict: superseded
claim-type: Lesson
claim-title: A restart runs the provider's check before it stops, but the check never sees the launch's model
claim-description: In OATS 0.70.5 a session restart runs the session provider's planned-launch check before stopping the old session, so an unready harness is refused with nothing stopped; but the planned launch carries no model, so a model the provider would refuse is refused only at the launch, after the old session was stopped, leaving a working agent stopped.
title-hash: 3e741e4530d5455d
canonical: ins-a351988a8d0f
reason: oats-project/oats#2126 (merged 2026-11-25, feature launch-model-and-check-warnings) adds model to the planned launch and relays a ready check's warnings, verified on the PR; the old lesson stays true of kernels without the feature.
pr: https://github.com/oats-project/oats-knowledge/pull/481
decided-by: knowledge maintainer
decided-on: 2026-11-25
---

[A restart runs the provider's check before it stops, but the check never sees the launch's model](/claims/lessons/a-restart-checks-before-it-stops-but-the-check-never-sees-the-model.md)
is superseded by [A session provider's planned-launch check sees the launch's model, so a restart refuses a bad model before it stops](/claims/lessons/a-restart-checks-the-launchs-model-before-it-stops.md).
The superseded concept stays as the record of OATS 0.70.5's behaviour and of kernels without the feature.
