/**
 * @packageDocumentation
 * @protected
 */

import { AwesomeContent } from './content.js';
import { select } from 'unist-util-select';

/**
 * Represents a link with a URL and a description.
 * @protected
 */
export type AwesomeLink = {
  /**
   * Represents the URL to be used within the application.
   * This should be a valid string formatted as a URL.
   */
  url: string;
  /**
   * A brief textual explanation or representation of an object, entity, or concept.
   * This variable stores descriptive information in the form of a string.
   */
  description: string;
};

/**
 * Converts an AwesomeContent object into an array of AwesomeLink objects.
 *
 * @param {AwesomeContent} content - The content object containing children to transform into links.
 * @return {AwesomeLink[]} An array of AwesomeLink objects constructed from the children of the given content.
 * @protected
 */
export function fromList(content: AwesomeContent): AwesomeLink[] {
  return content.children.map((item) => {
    const link = select('link', item);
    const text = select('text', item);
    return {
      //@ts-expect-error it is always a link
      url: link!!.url,
      //@ts-expect-error it is always a text value
      description: text!!.value,
    };
  });
}
