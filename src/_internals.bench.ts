import { bench } from 'vitest';

import README from './__fixtures__/SPEC.md?raw';
import { toRoots } from './content';

import { fromMarkdown } from 'mdast-util-from-markdown';
const ast = fromMarkdown(README);

bench(
  'toRoots',
  () => {
    toRoots(ast.children);
  },
  { time: 100, throws: false },
);
