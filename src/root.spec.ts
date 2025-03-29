import { describe, it, expect, beforeEach } from 'vitest';
import README from './__fixtures__/SPEC.md?raw';
// #region import
import { fromString } from '@awesome-algorand/mdast/root';
let markdown = `
## Category with List

- [Item](https://example.com) - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque posuere aliquam semper. Nulla facilisis mollis dui ac aliquam.
- [Item](https://example.com) - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque posuere aliquam semper. Nulla facilisis mollis dui ac aliquam.
`;
// #endregion import
describe('@awesome-algorand/mdast/root', () => {
  beforeEach(() => {
    markdown = README;
  });
  it('(OK) snapshot', () => {
    // #region example
    // Map all headings at depths of 2 into Roots
    const roots = fromString(markdown);
    // #endregion example
    expect(roots).toMatchSnapshot();
  });
});
