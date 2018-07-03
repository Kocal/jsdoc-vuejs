<template>
  <div>
    {{ counter }}
  </div>
</template>

<script>
/**
 * @vue-data {Number} [counter=0] Counter value
 */
export default {
  name: 'Counter',
  data() {
    return {
      counter: 0,
    };
  },
  mounted() {
    this.interval = setInterval(() => this.increment(), 1000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  methods: {
    /**
     * Increment the internal counter.
     */
    increment() {
      this.counter += 1;
    }
  }
};
</script>
