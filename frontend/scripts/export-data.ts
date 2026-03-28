/**
 * Writes backend/data/users.json and prizes.json from legacy TS sources.
 * Run: npm run export-data (from frontend/)
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { PRIZES } from '../src/data/prizes';
import { USERS } from '../src/data/users';

const here = dirname(fileURLToPath(import.meta.url));
const backendData = join(here, '..', '..', 'backend', 'data');
mkdirSync(backendData, { recursive: true });

writeFileSync(join(backendData, 'users.json'), JSON.stringify(USERS, null, 2));
writeFileSync(join(backendData, 'prizes.json'), JSON.stringify(PRIZES, null, 2));
console.log('Wrote backend/data/users.json and prizes.json');
