import { bench } from 'vitest';

import README from './__fixtures__/SPEC.md?raw';
import { fromString } from '@awesome-algorand/mdast/root';

bench(
  'fromString',
  () => {
    fromString(README);
  },
  { time: 100, throws: false },
);
