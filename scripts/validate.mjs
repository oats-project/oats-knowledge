#!/usr/bin/env node
// Repository CI adapter, not an OATS runtime integration. No package install,
// private kernel imports, bindings, owner registration or lifecycle calls.
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { realpathSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

export const OKF_COMMIT = '01b48dfc9d763b5b8cc4606aea3e361bf2ef783d'; // public v2.1.1
export const BASE_ID = 'oats-knowledge';
export const REPO_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
// Accepted curation identity reservations. Changing this roster/map requires
// explicit ownership review; it must not be inferred from directory names.
export const OWNERS = Object.freeze({
  'oats-maintainer': '065e17c8-54eb-4f80-86b0-41ce59684922',
  'oats-expert': 'c448f593-9b2d-4c48-a679-1c468bda5beb',
  'oats-kernel-expert': '4f532e2d-72f6-4dd0-9743-c9eeab2809ba',
  'oats-desktop-expert': '76085278-3874-4382-9f7a-f11de3dbceb4',
  'market-research-expert': '2a073e37-2114-474d-917d-29cf3333932f',
  'oats-operator-expert': 'af5e5c72-824e-4c86-9b3c-a197b4eb6edd',
  'integrations-expert': 'e544038d-065f-477c-b19c-07dab58c68a3',
  'oats-okf-expert': '8ecb9837-b76c-498b-9989-9c3cc1179bac',
  'oats-aweb-expert': 'af0c2641-0345-43c7-8723-b58b133b7ec9',
  'oats-jira-expert': 'ed495570-5cd4-4328-b820-7f087ec96ca0',
  'oats-linear-expert': '307b0cef-7d93-40a7-8e2c-f0ad615e59e6',
  'oats-authoring-expert': 'a324f1de-0f6a-451c-8417-91ba1f402455',
  'oats-setup-admin': 'd9ccb5f0-1c69-406c-a4c8-0a2e0f41c76e',
  'oats-apps-expert': '6d8e9505-f2d2-4cd5-8a10-2beec836e733',
});
// The reserved nodes of the subject layout (a bridged version-1 base): path equal to the name, owned by
// the placeholder UUID, never by a soul. Same review rule as OWNERS.
export const PLACEHOLDER_OWNER = '00000000-0000-0000-0000-000000000000';
export const RESERVED = Object.freeze(['claims', 'subjects', 'verdicts']);

export async function loadOkf(source = process.env.OKF_SOURCE) {
  assert.equal(process.versions.node.split('.')[0], '22', 'Use Node 22');
  assert.ok(source, 'Set OKF_SOURCE to a clean checkout of the pinned public OKF commit');
  const root = realpathSync(source);
  const git = (...args) => execFileSync('git', ['-C', root, ...args], { encoding: 'utf8' }).trim();
  assert.equal(git('rev-parse', 'HEAD'), OKF_COMMIT, 'Unexpected OKF source revision');
  assert.equal(git('status', '--porcelain', '--untracked-files=all'), '', 'OKF source must be clean');
  const capability = join(root, 'oats-package/capabilities/oats-okf');
  // These pure validation helpers are pinned public source, not a stable API
  // dependency on a separately installed OATS runtime.
  const config = await import(pathToFileURL(join(capability, 'lib/config.mjs')));
  const { tree } = await import(pathToFileURL(join(capability, 'lib/io.mjs')));
  return { ...config, tree, validator: join(capability, 'skills/okf/scripts/okf-validate.mjs') };
}

export function validateOwnership(files, okf) {
  // Runtime metadata validation covers schema fields AND filesystem ownership:
  // canonical/nonoverlapping paths, required node index/log, no hidden/stray files.
  const base = okf.metadata(files, { id: BASE_ID });
  assert.deepEqual(Object.keys(base.nodes).sort(), [...Object.keys(OWNERS), ...RESERVED].sort(), 'Unreviewed node roster');
  assert.equal(new Set(Object.keys(OWNERS).map(name => base.nodes[name].owner)).size, Object.keys(OWNERS).length, 'Owner UUIDs must be distinct');
  for (const name of RESERVED) assert.deepEqual(base.nodes[name], { path: name, owner: PLACEHOLDER_OWNER }, `Reserved node drift: ${name}`);
  for (const [name, owner] of Object.entries(OWNERS)) {
    assert.deepEqual(base.nodes[name], { path: `nodes/${name}`, owner }, `Ownership drift: ${name}`);
    const declaration = okf.validateDeclaration({ version: 1, owner, owns: [`oats/${name}`], reads: [] });
    okf.resolveNodes(declaration, { bases: { oats: { id: BASE_ID } } }, { oats: base });
  }
  return base;
}

export function assertStrictResult(result) {
  assert.equal(result.conformant, true, 'Nonconformant OKF base');
  assert.deepEqual(result.errors, [], 'OKF errors');
  // Upstream v2's CLI does not fail for warnings by default. Never accept its
  // exit status alone as a strict pass.
  assert.deepEqual(result.warnings, [], 'Strict OKF warnings');
  return result;
}

export async function validate() {
  const okf = await loadOkf();
  const root = realpathSync(join(REPO_ROOT, 'knowledge'));
  const base = validateOwnership(okf.tree(root), okf);
  const result = assertStrictResult(JSON.parse(execFileSync(process.execPath,
    [okf.validator, root, '--strict', '--json'], { encoding: 'utf8' })));
  console.log(JSON.stringify({ ok: true, okfCommit: OKF_COMMIT, base: base.id,
    nodes: Object.keys(base.nodes).length, concepts: result.concepts,
    errors: result.errors, warnings: result.warnings }, null, 2));
}

if (process.argv[1] && realpathSync(process.argv[1]) === realpathSync(fileURLToPath(import.meta.url))) {
  try { await validate(); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
