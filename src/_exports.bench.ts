import { bench } from 'vitest';

import README from './__fixtures__/SPEC.md?raw';
import { fromString } from '@awesome-algorand/mdast/root';
import { fromRoots } from './object.js';
const roots = fromString(README);
bench(
  'fromString',
  () => {
    fromString(README);
  },
  { time: 100, throws: false },
);

bench(
  'fromRoots',
  () => {
    fromRoots(roots);
  },
  { time: 100, throws: false },
);
