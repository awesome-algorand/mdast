import { bench } from 'vitest';

import README from './__fixtures__/SPEC.md?raw';
import { fromString } from './root.js';
import { fromList } from './links';
import { toRoots } from './content';

import { fromMarkdown } from 'mdast-util-from-markdown';
const ast = fromMarkdown(README);
const roots = fromString(README);

bench(
  'toRoots',
  () => {
    toRoots(ast.children);
  },
  { time: 100, throws: false },
);

bench(
  'fromList',
  () => {
    fromList(roots[0].children[1]);
  },
  { time: 100, throws: false },
);
