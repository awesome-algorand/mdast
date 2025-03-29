/**
 * @packageDocumentation
 * @protected
 */

import { toString } from 'mdast-util-to-string';
import type { RootContent } from 'mdast';
import Slugger from 'github-slugger';
import type { AwesomeRoot } from './root.js';

const slugs = new Slugger();

/**
 * Represents an AwesomeContent type that extends RootContent.
 * It serves as a structured object supporting hierarchical content with optional metadata and child relationships.
 * @protected
 */
export type AwesomeContent = RootContent & {
  /**
   * An optional property representing an array of `AwesomeContent` elements.
   * It is typically used to store or handle child components, elements, or items related
   * to a parent structure or entity.
   */
  children?: AwesomeContent[];
  /**
   * Represents an optional data object with a parent attribute.
   */
  data?: {
    parent?: string;
  };
};

/**
 * Converts an array of content items into a structured hierarchy of Markdown root objects,
 * categorized by headings of a specified depth.
 *
 * @param {AwesomeContent[]} content - The array of content items to be organized into Markdown roots. Each item can represent a heading or other types of content.
 * @param {number} [depth=2] - The heading depth to be considered as top-level categories for grouping the content.
 * @return {AwesomeRoot[]} Returns an array of root objects, each containing a category (derived from heading slugs) and its associated child content.
 * @protected
 */
export function toRoots(
  content: AwesomeContent[],
  depth: number = 2,
): AwesomeRoot[] {
  let index = 0;
  slugs.reset();
  // Reduce the content into Roots, adding metadata about the category
  return content.reduce((prev, current) => {
    if (current.type === 'heading') {
      // On the first run, there is no index
      const isFirstRun = typeof prev[index] === 'undefined';
      const slug = slugs.slug(toString(current, { includeImageAlt: false }));

      // Select Handle the heading depths
      if (current.depth === depth) {
        // Select the element position
        const selection = isFirstRun ? index : index + 1;

        // Add category to heading
        if (typeof current.data === 'undefined') {
          current.data = { parent: slug };
        } else {
          current.data.parent = slug;
        }

        // Create a top-level Root item
        prev[selection] = {
          type: 'root',
          data: {
            category: slug,
          },
          children: [current],
        };
      } else {
        // Push This heading to the previous category
        if (typeof current.data === 'undefined') {
          current.data = { parent: prev[index].data?.category };
        } else {
          current.data.parent = prev[index].data?.category;
        }
        prev[index].children.push(current);
      }

      // Increment future heading indexes by 1
      if (!isFirstRun && current.depth === depth) {
        index++;
      }
      return prev;
    }

    // Handle Content
    if (typeof current.data === 'undefined') {
      current.data = { parent: prev[index].data?.category };
    } else {
      current.data.parent = prev[index].data?.category;
    }
    prev[index].children.push(current);
    return prev;
  }, [] as AwesomeRoot[]);
}
