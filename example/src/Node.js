class Node {

  /**
   * @param {*} data
   */
  constructor(data) {
    /**
     * @type {*}
     */
    this.data = data;

    /**
     * @type {Node|null}
     */
    this.previous = null;
  }
}

modules.exports = Node;