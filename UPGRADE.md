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
