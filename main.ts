import { micromark } from 'micromark';
import { toMarkdown } from 'mdast-util-to-markdown';

import { fromRoots } from '@awesome-algorand/mdast/object';
import { fromString } from '@awesome-algorand/mdast/root';

// Fetch the README
const README = await fetch(
  'https://raw.githubusercontent.com/awesome-algorand/awesome-algorand/refs/heads/main/README.md',
).then((res) => res.text());
// Get the Collection, removing the first 5 elements
const roots = fromString(README, 5);
// Render the collection
const collection = await Promise.all(
  roots.map((x) => micromark(toMarkdown(x))),
);
document.getElementById('app')!.innerHTML = collection.join('\n');
// Render the JSON Object
document.getElementById('json')!.innerHTML = JSON.stringify(
  fromRoots(roots),
  null,
  2,
);
