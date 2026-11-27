---
type: Lesson
title: A seat's "this needs the person" or "this is blocked on X" claim is checked against the tool or the code before a lead relays it
description: Seats report what they believe blocks them in the same confident register as their findings; a lead that forwards "only the person can do this", "we need this from the other side first" or "the frozen deployments call this" spends the person's attention on claims a short read of the tool's help or the code corrects. Check first, or pass it on labelled as the seat's claim, unchecked; and for a removal, find out what calls the thing and what it does before deciding.
about: [workstream/coordination]
kind: lesson
tags: [delegation, relaying, verification, needs-input, removal, cross-area]
---

Observed on 2026-11-27, three times in one day of leading a cross-team integration. Each claim came from another seat, went to the person unchecked, and was wrong or needless.

- **"Only the person can register these repositories, and the build is blocked until then."** The tool that makes a work tree takes a path to any local clone, registered or not; the lead's own home already held such a tree. Registration serves a different purpose, offering a repository's souls. The person's reply was "what?? how?".
- **"The measurement needs the other side's identifiers first."** The measurement reports callers by organisation, and the person recognises them in the result. Nothing had to be collected beforehand. The person's reply was "why do you need that at all?".
- **"The frozen deployments call this command, so its routes must stay."** The package only mentions the command in a skill. Reading what the command does showed its real use: it writes a team's shared text into agents' files. That changed the person's decision from removing it to keeping it.

**Why it happens.** A seat reports a block as a fact, and a lead under load forwards it. The cost lands on the person, who has the least context to dispute it.

**What to do.**
- Before a claim of the form "needs the person", "blocked on X" or "Y depends on this" reaches the person, read the tool's help or the code that would make it true.
- If it cannot be checked quickly, pass it on labelled as that seat's claim, unchecked.
- Before proposing a removal, find out what calls the thing and what it does. "Why is it called?" is a cheap question that surfaces uses nobody listed.
