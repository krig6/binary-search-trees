import Node from "./Node.js";

class Tree {
  constructor(array) {
    this.root = this.buildTree(array)
  }

  buildTree(array, start = 0, end = array.length - 1) {
    if (start > end) return null

    const middle = Math.floor((start + end) / 2)
    const rootNode = new Node(array[middle])
    rootNode.left = this.buildTree(array, start, middle - 1)
    rootNode.right = this.buildTree(array, middle + 1, end)

    return rootNode
  }

  insert(value, current = this.root) {
    if (current === null) {
      return new Node(value)
    }

    if (value === current.data) {
      return current
    }

    if (value < current.data) {
      current.left = this.insert(value, current.left)
    }

    if (value > current.data) {
      current.right = this.insert(value, current.right)
    }

    return current
  }

  deleteItem(value, current = this.root) {
    if (current === null) return null

    if (value < current.data) {
      current.left = this.deleteItem(value, current.left)
    } else if (value > current.data) {
      current.right = this.deleteItem(value, current.right)
    } else {
      if (current.left === null && current.right === null) return null
      if (current.left === null) return current.right
      if (current.right === null) return current.left

      let successor = this._findMin(current.right)
      current.data = successor.data
      current.right = this.deleteItem(successor.data, current.right)
    }

    return current
  }

  _findMin(node) {
    while (node.left !== null) {
      node = node.left
    }
    return node
  }
}

