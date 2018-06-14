JSDoc for VueJS
===============

[![npm version](https://badge.fury.io/js/jsdoc-vuejs.svg)](https://badge.fury.io/js/jsdoc-vuejs)
[![Build Status](https://travis-ci.org/Kocal/jsdoc-vuejs.svg?branch=master)](https://travis-ci.org/Kocal/jsdoc-vuejs)
[![Coverage Status](https://coveralls.io/repos/github/Kocal/jsdoc-vuejs/badge.svg?branch=master)](https://coveralls.io/github/Kocal/jsdoc-vuejs?branch=master)

> A wobbly JSDoc plugin for listing props, data, computed data, and methods from *.vue files.

> WARNING: Actually, it's only working with the default JSDoc template.

## [Demo](https://kocal.github.io/jsdoc-vuejs-demo-docs/)

## Installation

```bash
$ yarn add jsdoc-vuejs -D
# $ npm i jsdoc-vuejs -D
```

## Usage

Update your JSDoc configuration

```json
{
  "plugins": [
    "node_modules/jsdoc-vuejs"
  ],
  "source": {
    "includePattern": "\\.(vue|js)$"
  },
  "jsdoc-vuejs": {}
}
```

Update your .vue files:

```vue
<template>
  <div>Foo</div>
</template>

<script>
  /**
   * Add the @vue tag here
   * @vue 
   */
  export default {
    data () {
      return {}
    }
  }
</script>
```

## Tests

Before running tests, you should generate a JSDoc documentation inside `example` folder:

```bash
$ cd example
$ yarn && yarn docs
# $ npm install && npm run docs
$ $ cd ..
```

Then run:

```bash
$ yarn test
# $ npm test
```
