JSDoc for VueJS
===============

[![npm version](https://badge.fury.io/js/jsdoc-vuejs.svg)](https://badge.fury.io/js/jsdoc-vuejs)
[![Build Status (Travis)](https://travis-ci.org/Kocal/jsdoc-vuejs.svg?branch=master)](https://travis-ci.org/Kocal/jsdoc-vuejs)
[![Build Status (AppVeyor)](https://ci.appveyor.com/api/projects/status/a36pui6w1qhqq582?svg=true)](https://ci.appveyor.com/project/Kocal/jsdoc-vuejs)
[![codecov](https://codecov.io/gh/Kocal/jsdoc-vuejs/branch/master/graph/badge.svg)](https://codecov.io/gh/Kocal/jsdoc-vuejs)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/850b7601f2bf4e8787a6aadbafa8afef)](https://www.codacy.com/app/kocal/jsdoc-vuejs?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Kocal/jsdoc-vuejs&amp;utm_campaign=Badge_Grade)

> A JSDoc plugin for listing props, data, computed data, and methods from *.vue files.

## Installation

```bash
$ npm install --save-dev jsdoc-vuejs
```

## Usage

Your should update your JSDoc configuration to enable JSDoc-VueJS:

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

Update your .vue files with one of the following tags:

- `@vue-prop`
- `@vue-data`
- `@vue-computed`

All of those tags work the same way than [`@param` tag](http://usejsdoc.org/tags-param.html).

```vue
<template>
  <div>Hello world!</div>
</template>

<script>
  /**
   * @vue-prop {Number} initialCounter - Initial counter's value
   * @vue-prop {Number} [step=1] - Step
   * @vue-data {Number} counter - Current counter's value
   * @vue-computed {String} message
   */
  export default {
    props: {
      initialCounter: {
        type: Number,
        required: true,
      },
      step: {
        type: Number,
        default: 1,
      },
    },
    data () {
      return {
        counter: 0,
      }
    },
    computed: {
      message() {
        return `Current value is ${this.counter}`;
      }
    }
  }
</script>
```

## Supported templates

The rendering engine has been rewritten in v2, it can supports every JSDoc templates that exists.

Actually, it supports 4 templates:
- Default
- [Docstrap](https://github.com/docstrap/docstrap)
- [Minami](https://github.com/nijikokun/minami)
- [Tui](https://github.com/nhnent/tui.jsdoc-template)

If you use a template that is not supported, it will use the default one as a fallback.

Feel free to open an issue/pull request if your template is not supported!

<details>
<summary>Default</summary>

![](./screenshots/templates/default.png)

</details>

<details>
<summary>Docstrap</summary>

![](./screenshots/templates/docstrap.png)

</details>

<details>
<summary>Minami</summary>

![](./screenshots/templates/minami.png)

</details>

<details>
<summary>Tui</summary>

![](./screenshots/templates/tui.png)

</details>

## Testing

### Install Dependencies

```bash
$ git clone https://github.com/Kocal/jsdoc-vuejs
$ cd jsdoc-vuejs
$ yarn install

# For testing the example docs
$ cd example
$ yarn install
$ yarn docs # output in `docs` folder
```

### Unit

```bash
$ yarn test
```

### E2E

Before running integration tests with [Cypress](https://cypress.io), 
you should generate documentation with all renderers:

```bash
$ cd example
$ yarn install
$ yarn docs
$ yarn docs:docstrap
$ yarn docs:minami
$ yarn docs:tui
$ cd ..
```

And then run Cypress:

```bash
$ yarn cypress run
```

## License

MIT.
