JSDoc for VueJS
===============

> A wobbly JSDoc plugin for listing props, data, computed data, hooks and methods from *.vue files.

> WARNING: Actually, it's only working with the default JSDoc template.

# [Demo](https://kocal.github.io/jsdoc-vuejs-demo-docs/)

# Installation

```bash
$ yarn add jsdoc-vuejs -D
# $ npm i jsdoc-vuejs -D
```

# Usage

Update your JSDoc configuration

```json
{
  "plugins": [
    "node_modules/jsdoc-vuejs"
  ],
  "source": {
    "includePattern": "\\.(vue|js)$"
  }
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