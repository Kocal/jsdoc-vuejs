<template>
  <div>
    <button @click="increment">++</button>
    {{ counter }}
  </div>
</template>

<script>
  /**
   * @vue
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