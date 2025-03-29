/**
 * @packageDocumentation
 * @document ./root.guide.md
 */

import type { Root } from 'mdast';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { AwesomeContent, toRoots } from './content.js';

/**
 * Represents the AwesomeRoot type, which extends the Root type with additional optional properties.
 */
export type AwesomeRoot = Root & {
  /**
   * Represents the children elements contained within a component or structure.
   * Each child is an instance of the AwesomeContent type, which defines the
   * specific structure and properties of each child.
   *
   * This variable is optional and may be undefined if no child elements are present.
   */
  children?: AwesomeContent[];
  /**
   * An optional object that represents data with an optional category field.
   */
  data?: {
    /**
     * Represents the category or classification of an item or entity.
     * This property is optional and may not always be defined.
     */
    category?: string;
  };
};

/**
 * Converts a **Markdown** string into an array of {@link AwesomeRoot} nodes
 * by processing it and trimming a specified number of elements.
 *
 * @param {string} markdown - The Markdown content to process.
 * @param {number} [trim=5] - The number of elements to trim from the parsed Markdown structure.
 * @return {Root[]} An array of root nodes created from the processed Markdown content.
 * @see {@link object.fromRoot | fromRoot}
 * @see {@link object.fromRoots | fromRoots}
 */
export function fromString(markdown: string, trim: number = 0): AwesomeRoot[] {
  return toRoots(fromMarkdown(markdown).children.slice(trim));
}
