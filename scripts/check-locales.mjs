// Fails the build if vi / en / zh do not have exactly the same keys,
// or if any value is empty. vi.json is the reference.
import { readFileSync } from 'node:fs'

import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

// Optional arg: another locales folder (used to test the checker itself).
const dir = process.argv[2] ?? fileURLToPath(new URL('../src/i18n/locales/', import.meta.url))
const load = (l) => JSON.parse(readFileSync(join(dir, `${l}.json`), 'utf8'))
const flatten = (obj, prefix = '') =>
  Object.entries(obj).flatMap(([k, v]) =>
    v && typeof v === 'object' ? flatten(v, `${prefix}${k}.`) : [[`${prefix}${k}`, v]],
  )

const langs = ['vi', 'en', 'zh']
const maps = Object.fromEntries(langs.map((l) => [l, new Map(flatten(load(l)))]))
const ref = maps.vi
let errors = 0

for (const l of langs) {
  for (const key of ref.keys()) if (!maps[l].has(key)) (errors++, console.error(`✗ ${l}: missing "${key}"`))
  for (const key of maps[l].keys()) if (!ref.has(key)) (errors++, console.error(`✗ ${l}: extra "${key}" (not in vi)`))
  for (const [key, v] of maps[l]) if (v === '') (errors++, console.error(`✗ ${l}: empty "${key}"`))
}

if (errors) {
  console.error(`\ni18n check failed: ${errors} problem(s).`)
  process.exit(1)
}
console.log(`✓ i18n: ${ref.size} keys × ${langs.length} languages in sync`)
