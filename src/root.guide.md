---
title: Overview
slug: overview
---

# Overview

Tools and utilities to manage the Awesome Algorand list as an [mdast](https://github.com/syntax-tree/mdast).

- Converts a **Markdown** string into an array of {@link AwesomeRoot} nodes
- Allows trimming a specified number of elements.

### Use cases

- Render only a specific section of the Markdown
- Serialize the AST into an Object using {@link object.fromRoot | fromRoot}
- Allow for sorting and augmenting the data collection (programmatic access to the list)

### Get Started

{@includeCode ./root.spec.ts#import,example}

### Full Example

{@includeCode ../main.ts}
