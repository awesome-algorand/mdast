/**
 * @packageDocumentation
 * @document ./object.guide.md
 */
import { select } from 'unist-util-select';
import { toRoots } from './content.js';
import { AwesomeLink, fromList } from './links.js';
import { AwesomeRoot } from './root.js';

/**
 * Represents an AwesomeObject, which contains a title, optional description, subcategories, and links.
 */
export type AwesomeObject = {
  /**
   * The title of the object, derived from the `heading`
   */
  title: string;
  /**
   * Represents an optional description, derived from the `blockquote`
   */
  description?: string;
  /**
   * An optional property representing an array of AwesomeObject instances.
   * Each element in the array corresponds to a `heading` at a lower depth than the current.
   */
  subcategories?: AwesomeObject[];
  /**
   * Represents an optional array of AwesomeLink objects.
   * Each link in the array corresponds to a `list` of `url` and `text` items.
   *
   * @type {AwesomeLink[] | undefined}
   */
  links?: AwesomeLink[];
};

/**
 * Converts an array of AwesomeRoot objects into a mapped array using the fromRoot transformation.
 *
 * @param {AwesomeRoot[]} roots - Array of AwesomeRoot objects to be transformed.
 * @return {any[]} A new array resulting from applying the fromRoot transformation to each AwesomeRoot object.
 */
export function fromRoots(roots: AwesomeRoot[]) {
  return roots.map((x) => fromRoot(x));
}

/**
 * Converts an AwesomeRoot object into an AwesomeObject by extracting and transforming its properties.
 *
 * @param {AwesomeRoot} root - The root object containing structured data to be transformed.
 * @return {AwesomeObject} - The transformed object containing title, description, links, and subcategories (if available).
 */
export function fromRoot(root: AwesomeRoot): AwesomeObject {
  const obj: AwesomeObject = {
    // @ts-expect-error we know it is a text value
    title: select('text', root.children[0])!.value,
  };

  // Remove the first heading
  let children = root.children.slice(1);

  if (children.length && children[0].type === 'blockquote') {
    // @ts-expect-error we know it is a text value
    obj.description = select('text', root.children[1])!.value;
    children = children.slice(1);
  }

  if (children.length && children[0].type === 'list') {
    obj.links = fromList(children[0]);
    children = children.slice(1);
  }

  if (children.length && children[0].type === 'heading') {
    obj.subcategories = toRoots(children, children[0].depth).map((x) =>
      fromRoot(x),
    );
  }

  return obj;
}
