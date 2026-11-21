---
type: Lesson
title: A bb plugin's openTab at mount is declined; retry until it is accepted
description: In bb 0.50.1 `openTab` called once from a thread header row's mount effect returns false on every first load and thread switch, because the panel lists only bb's own tab at that moment. The same call 250 ms later is accepted, on desktop and at phone width.
about: [workstream/provider-integration]
kind: lesson
id: ins-ae07668867eb
tags: [bb, plugin, side-panel, timing, verification]
timestamp: 2026-11-21
---

# What was tried

In bb-app 0.50.1 (plugin SDK 0.6.157), `experimental_useAppPanel().openTab({ tab })` for the
plugin's fixed thread tab, called from an effect of an `experimental_threadHeaderRow` component:

- One call at mount returned false in every case: the first load of a thread URL and each switch
  between threads, at 1280x800 and at 390x800. The panel listed only bb's Info tab at that moment.
- The second try, 250 ms later, was accepted in every case. With a tab whose `useVisible` turns
  true late, every try before that was declined.
- Waiting until `experimental_usePanelTabs()` lists the tab works on a first load and fails on a
  thread switch: for a moment the list is still the previous thread's.

# What follows

- Call it with a bounded retry until it returns true. A decline is a return value, never a
  throw, so a single call fails without a trace.
- An earlier trial had read the decline as a limit of the compact layout, because its effect
  happened to run after a server call answered on desktop. A host call that is accepted in one
  layout and declined in another is first a timing question: log the host's state at the call.
- Opening the tab on every thread view takes the person's own tab choice away each time, and at
  phone width it covers the conversation. bb keeps each thread's panel state on its server, so a
  guard kept in the browser session lets the tab be taken again in the next session.

# Related

- [The OATS view inside bb never acts on its own](/claims/decisions/a-view-inside-a-third-party-runner-reads-the-kernels-json-and-never-acts-on-its-own.md)
  (`dec-0a818525cc9d`) is the plugin whose thread header row opens its tab this way.

# Citations

1. Evidence: OKF proposal from oats-engineering-expert/bb-plugin-reach-try-probe, 2026-11-21;
   notes/host-call-at-mount-is-declined-until-the-plugins-pieces-are-registered.md. The return
   values per load, switch and width, and the 250 ms acceptance, are the source's report; review
   ran no bb.
2. get-bb/bb at `desktop-v0.50.1` (`a08e1165`, plugin SDK 0.6.157), read at maintainer review
   2026-11-21: `packages/plugin-sdk/src/app-contract.ts` documents `openTab` as returning false
   when the host declines (among other reasons, a tab not registered for the surface or hidden)
   and says a decline is never thrown; `apps/server/src/routes/threads/tabs.ts` stores each
   thread's panel tabs on bb's server.
3. oats-project/oats-bb at `5c7c57a`, read at maintainer review 2026-11-21:
   `plugin/app/IdentityRow.tsx` still skips `openTab` at a compact viewport, the reading this
   lesson corrects.
