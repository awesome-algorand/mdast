<a href="https://github.com/awesome-algorand/awesome-algorand"><img style="width:100%;" src="https://ipfs.algonode.xyz/ipfs/QmfTGB4EFu1FypcZEWWgs3jCmFw75MrqezVV7oQbnbQPyQ" /></a>

[![CI](https://github.com/awesome-algorand/mdast/actions/workflows/CI.yml/badge.svg)](https://github.com/awesome-algorand/mdast/actions/workflows/CI.yml)
[![Publish Package](https://github.com/awesome-algorand/mdast/actions/workflows/CD.yml/badge.svg)](https://github.com/awesome-algorand/mdast/actions/workflows/CD.yml)
[![codecov](https://codecov.io/gh/awesome-algorand/mdast/branch/main/graph/badge.svg?token=5JDzXc4yyM)](https://codecov.io/gh/awesome-algorand/mdast)
[![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](CODE_OF_CONDUCT.md)

`@awesome-algorand/mdast` contains methods for parsing the Awesome Algorand List specification

## Get Started

Installing

```bash
npm install @awesome-algorand/mdast --save
```

Generating the Collection

```typescript
import { micromark } from 'micromark';
import { toMarkdown } from 'mdast-util-to-markdown';

import { fromString } from '@awesome-algorand/mdast/root';
import { fromRoots } from '@awesome-algorand/mdast/object';

// Fetch the README
const README = await fetch(
  'https://raw.githubusercontent.com/awesome-algorand/awesome-algorand/refs/heads/main/README.md',
).then((res) => res.text());
// Create the array of Roots. This represents the top level nodes
const roots = fromString(README);
// Render the Collection
const collection = await Promise.all(
  fromString(README).map((x) => micromark(toMarkdown(x))),
);
// Get the JSON Object
const obj = fromRoots(roots);
```

## Specification

- Heading contents are the `title`.
- Block quote contents are treated as `descriptions`
- List items are converted into `links`
- `category` is any heading at a depth of 2
  - `subcategories` are dependent on depth (recursively)

#### Example Markdown:

```markdown
## Category with List

- [Item](https://example.com) - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque posuere aliquam semper. Nulla facilisis mollis dui ac aliquam.
- [Item](https://example.com) - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque posuere aliquam semper. Nulla facilisis mollis dui ac aliquam.

## Category with Block Quote and List

> Sed sit amet sollicitudin dolor. Donec scelerisque sed tortor sed elementum.

- [Item](https://example.com) - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque posuere aliquam semper. Nulla facilisis mollis dui ac aliquam.
- [Item](https://example.com) - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque posuere aliquam semper. Nulla facilisis mollis dui ac aliquam.

## Category with Subcategories

### SubCategory with List

- [Item](https://example.com) - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque posuere aliquam semper. Nulla facilisis mollis dui ac aliquam.
- [Item](https://example.com) - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque posuere aliquam semper. Nulla facilisis mollis dui ac aliquam.

### SubCategory with Block Quote and List

> Sed sit amet sollicitudin dolor. Donec scelerisque sed tortor sed elementum.

- [Item](https://example.com) - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque posuere aliquam semper. Nulla facilisis mollis dui ac aliquam.
- [Item](https://example.com) - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque posuere aliquam semper. Nulla facilisis mollis dui ac aliquam.

## Category with Block Quote and Subcategories

> Sed sit amet sollicitudin dolor. Donec scelerisque sed tortor sed elementum.

### SubCategory with List

- [Item](https://example.com) - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque posuere aliquam semper. Nulla facilisis mollis dui ac aliquam.
- [Item](https://example.com) - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque posuere aliquam semper. Nulla facilisis mollis dui ac aliquam.

#### Deep Category with Block Quote and List

> Sed sit amet sollicitudin dolor. Donec scelerisque sed tortor sed elementum.

- [Item](https://example.com) - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque posuere aliquam semper. Nulla facilisis mollis dui ac aliquam.
- [Item](https://example.com) - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque posuere aliquam semper. Nulla facilisis mollis dui ac aliquam.
```

#### Example JSON Object

```json
[
  {
    "title": "Development Tools",
    "description": "Awesome client libraries, tools, and community utilities.",
    "subcategories": [
      {
        "category": "cli",
        "links": [
          {
            "url": "https://github.com/algorandfoundation/algokit-cli",
            "description": "AlgoKit CLI"
          },
          {
            "url": "https://github.com/Hipo/tealinspector",
            "description": "tealinspector"
          }
        ]
      },
      {
        "title": "AlgoKit Templates",
        "description": "AlgoKit templates are a set of starter and production-ready baseline templates for developing and deploying Algorand applications. They are designed to be used as a starting point for developers to quickly bootstrap their projects and focus on the business logic of their applications. Refer to ",
        "subcategories": [
          {
            "title": "Official",
            "links": [
              {
                "url": "https://github.com/algorandfoundation/algokit-beaker-default-template",
                "description": "algokit-beaker-default-template"
              },
              {
                "url": "https://github.com/algorandfoundation/algokit-python-template",
                "description": "algokit-python-template"
              },
              {
                "url": "https://github.com/algorandfoundation/algokit-react-frontend-template",
                "description": "algokit-react-frontend-template"
              },
              {
                "url": "https://github.com/algorandfoundation/algokit-fullstack-template",
                "description": "algokit-fullstack-template"
              }
            ]
          },
          {
            "title": "Community",
            "links": [
              {
                "url": "https://github.com/aorumbayev/algokit-tealish-template",
                "description": "algokit-tealish-template"
              },
              {
                "url": "https://github.com/GoracleNetwork/algokit_default_template",
                "description": "algokit-goracle-template"
              }
            ]
          }
        ]
      }
    ]
  }
]
```
