<script>
/**
 * @vue-data {String} [foo=bar] Foo description
 */
export default {
  name: 'ScriptBeforeTemplate',
  data() {
    return {
      foo: 'bar'
    };
  }
};
</script>

<template>
  <div>Hello world!</div>
</template>
