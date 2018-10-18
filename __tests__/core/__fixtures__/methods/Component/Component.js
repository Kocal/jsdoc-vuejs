
/**
 * @vue-prop {String} test - test description
 * @vue-data {String} [foo=bar] - Foo description
 */
export default ({
  name: 'component',
  props: {
    test: {
      type: String,
    },
  },
  data() {
    return {
      foo: 'bar',
    };
  },
  methods: {},
  computed: {},
});
