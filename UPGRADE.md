## Upgrade from 1.x to 2.x

### Configuration

You MUST remove `jsdoc-vuejs` configuration key inside JSDoc config file,
because it is not used anymore.

**Before:**
```json
{
  "plugins": [
    "node_modules/jsdoc-vuejs"
  ],
  "source": {
    "includePattern": "\\.(vue|js)$"
  },
  "jsdoc-vuejs": {
    "followImports": true // enable/disable require/import function 
  }
}
```

**After:**
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

### Usage

You SHOULD NOT use `@vue` tag anymore. 

Instead, you should use `@vue-prop`, `@vue-data`, and `@vue-computed` like this:

```vue
<template>
  <div>Hello world</div>
</template>

<script>
/**
* @vue-prop {Number} initialCounter
* @vue-prop {Number} [step=1] Step
* @vue-data {Number} counter - Current counter's value
* @vue-computed {String} message A message
*/
export default {
  // ...
}
</script>
``` 
