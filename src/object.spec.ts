import { describe, it, expect, beforeEach } from 'vitest';
import README from './__fixtures__/SPEC.md?raw';
// #region import
import { fromString } from '@awesome-algorand/mdast/root';
import { fromRoots } from '@awesome-algorand/mdast/object';
const markdown = `
## Category with List

- [Item](https://example.com) - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque posuere aliquam semper. Nulla facilisis mollis dui ac aliquam.
- [Item](https://example.com) - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque posuere aliquam semper. Nulla facilisis mollis dui ac aliquam.
`;
let roots = fromString(markdown);
// #endregion import

describe('@awesome-algorand/mdast/object', () => {
  beforeEach(() => {
    roots = fromString(README);
  });
  it('(OK) snapshot', () => {
    // #region example
    // Map all Roots into AwesomeObjects
    const objs = fromRoots(roots);
    // #endregion example
    expect(objs).toMatchSnapshot();
  });
});
