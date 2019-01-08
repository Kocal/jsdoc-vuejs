<template>
  <div>
    {{ message }}
    <button @click="increment">+1</button>
    <button @click="decrement">-1</button>
    <button @click="showDialog(counter)">Show counter value in dialog</button>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  /**
   * @module better-components/BetterCounter
   * @desc BetterCounter component, like Counter component but better
   * @vue-prop {Number} initialCounter
   * @vue-prop {Number} [step=1] Step
   * @vue-data {Number} counter - Current counter's value
   * @vue-computed {Array.<String>} fooList - A list of foo
   * @vue-computed {Array.<String>} barList - A list of bar
   * @vue-computed {String} message A message
   * @vue-event {Number} increment - Emit value of counter after increment
   * @vue-event {Number} decrement - Emit value of counter after decrement
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
      ...mapState({
        fooList: state => state.$_foo.fooList,
        barList: state => state.$_foo.barList
      }),
      message() {
        return `Counter: ${this.counter}`
      }
    },
    methods: {
      /**
       * Increment counter and emit event 'increment'
       */
      increment() {
        this.counter += this.step;
        this.$emit('increment', this.counter);
      },

      /**
       * Decrement counter and emit event 'decrement'
       */
      decrement() {
        this.counter -= this.step;
        this.$emit('decrement', this.counter);
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
