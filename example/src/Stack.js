const Node = require('./Node')

class Stack {
  /**
   * Initialize a new Stack.
   */
  constructor () {
    /**
     * @type {Node|null}
     */
    this.top = null

    /**
     * @type {number}
     */
    this.size = 0
  }

  /**
   * Push data to the Stack.
   * @param {*} data Data to push
   */
  push (data) {
    const node = new Node(data)

    node.previous = this.top
    this.top = node
    this.size += 1

    return node
  }

  /**
   * Pop data from the Stack.
   * @return {null|*}
   */
  pop () {
    const tmpNode = this.top

    this.top = tmpNode.previous
    this.size -= 1

    return tmpNode
  }
}

module.exports = Stack
