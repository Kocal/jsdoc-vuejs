<template>
  <div>
    {{ message }}
    <button @click="increment">+1</button>
    <button @click="decrement">-1</button>
    <button @click="showDialog(counter)">Show counter value in dialog</button>
  </div>
</template>

<script>
  /**
   * @vue
   */
  export default {
    props: {
      initialCounter: {type: Number, required: true},
      step: {type: Number, default: 1}
    },
    data() {
      return {
        counter: this.initialCounter
      }
    },
    computed: {
      message () {
        return `Counter: ${this.counter}`
      }
    },
    methods: {
      /**
       * Increment counter.
       */
      increment() {
        this.counter += this.step;
      },

      /**
       * Decrement counter.
       */
      decrement() {
        this.counter -= this.step;
      },

      /**
       * Show a dialog displaying counter value.
       * @param {Number} counter - Counter value
       */
      showDialog(counter) {
        alert(`Counter value is ${counter}.`);
      }
    },

    /**
     * Counter.vue `created` hook.
     */
    created() {
      console.info('Counter.vue: created()');
    },
    mounted() {
      console.info('Counter.vue: mounted()');
    }
  };
</script>