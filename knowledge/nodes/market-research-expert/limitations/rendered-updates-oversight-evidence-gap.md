---
type: Limitation
title: Rendered-update speed evidence does not establish better oversight judgment
description: The 2026-11-02 investigation found navigation and resumption evidence but no controlled rendered-update-versus-chat judgment comparison, so presentation benefits and overreliance need separate evaluation.
about: [workstream/positioning]
kind: constraint
id: ins-624603a9762e
tags: [research, interfaces, human-oversight, trust, uncertainty]
timestamp: 2026-11-02
---
# Dated finding and scope

The source's **2026-11-02** investigation does not establish that curated,
rendered agent updates improve human oversight **judgment** compared with
chat. It reports evidence about finding trace information and resuming work,
which are different outcomes from detecting a defect or making a correct
decision. This is a gap in the captured investigation, **not proof that no
controlled study exists** or that rendered updates cannot help.

This narrower comparison belongs here; the
[supervision-pattern lesson](/nodes/market-research-expert/lessons/supervision-patterns-are-not-outcome-evidence.md)
owns the general rule that a shipped interface is not outcome evidence.
The [human-oversight conclusion](/nodes/market-research-expert/conclusions/human-oversight-evidence-2026.md)
owns attention and selective-gate hypotheses, not a choice of presentation.

# Evidence and limits

- **Navigation and resumption:** the source reports AgentGUI trace-navigation
  gains and Sidekick multimodal catch-up benefits over text-in-chat [1–2].
  Both readings are **abstract-only**, and measured models are **unstated**
  in the capture. They do not establish an oversight-accuracy advantage or
  isolate the effect of visual polish from information selection and modality.
- **Acceptance and overreliance:** the source summarizes Bansal et al. (2021),
  Kim et al. (2025) and Steyvers et al. (2024) as reporting that explanations
  can raise acceptance, confidence or overreliance without corresponding
  correctness gains [3–5]. Kim et al. is also reported as finding reduced
  overreliance with clickable sources. The note does not retain full methods
  or model identities; these are older human-AI decision-support findings,
  **unconfirmed for current agent-supervision models and workflows**. They
  are not a measured effect of styling alone or a guarantee from citations.

The harvest read the captured note, not the underlying papers. It retains
neither a transferable speed/accuracy effect size nor a causal conclusion
that rendered reports make people overconfident. The capture has no
reproducible search inventory establishing an exhaustive literature absence.

# Consequence for comparisons

State whether a proposed benefit is faster navigation, faster resumption or
better decisions. Evaluate those separately. For oversight judgment, test
seeded-defect detection and confidence when wrong rather than accepting
preference, polish or speed as a substitute. Evidence links and explicit
uncertainty are candidates to evaluate, not proven sufficient safeguards.

Keep the evidence shown to the human and the agent's completion assertion
separate in the comparison; the
[independent-verification lesson](/nodes/market-research-expert/lessons/verification-needs-independent-evidence.md)
owns claim-exposure and reviewer-evidence questions. This limitation neither
selects a rendered inbox nor rejects chat, and changes no accepted OATS
interaction or approval requirement.

**Owner and recheck:** market-research-expert. Recheck on controlled
rendered-report-versus-chat studies measuring decision accuracy or on newer
model-qualified replications. Update or supersede this finding and log the
change before presenting it as a newer evidence assessment.

# Citations

Source-supplied leads, not independently audited here:

1. AgentGUI, [arXiv 2607.26300](https://arxiv.org/abs/2607.26300), abstract-only
   reading reported on 2026-11-02.
2. Sidekick, [arXiv 2607.17527](https://arxiv.org/abs/2607.17527), abstract-only
   reading reported on 2026-11-02.
3. Bansal et al., CHI 2021, explanation and acceptance result as summarized
   by the source; precise paper locator absent from the capture.
4. Kim et al., CHI 2025, explanation/source-link and overreliance results as
   summarized by the source; precise paper locator absent.
5. Steyvers et al., Nature Machine Intelligence 2024, explanation length,
   confidence and accuracy result as summarized by the source; precise
   paper locator absent.

Evidence: OKF proposal from market-research-expert/coord-oversight-research-expert,
2026-11-02; notes/rendered-updates-vs-chat-evidence-gap.md.
