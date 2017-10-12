<template>
  <div>
    <button @click="increment">++</button>
    {{ counter }}
  </div>
</template>

<script>
  import {fooBar} from '@alias/non-existant-file'

  /**
   * No @vue tag, will not be documented.
   */
  export default {
    data() {
      return {
        counter: 0
      }
    },
    methods: {
      /**
       * Increment counter.
       */
      increment() {
        this.counter += 1;
      },
    }
  };
</script>
