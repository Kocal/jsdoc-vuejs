JSDoc for VueJS
===============

> A wobbly JSDoc plugin for listing props, data, computed data, hooks and methods from *.vue files.

> Actually only working with default template, and if your .vue files don't require other .vue files (plz help me!)

# [Demo](https://kocal.github.io/jsdoc-vuejs-demo-docs/)

# Installation

```bash
$ yarn add jsdoc-vuejs -D
# $ npm i jsdoc-vuejs -D
```

# Usage

Update your JSDoc plugins:

```json
{
  "plugins": [
    "node_modules/jsdoc-vuejs"
  ]
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