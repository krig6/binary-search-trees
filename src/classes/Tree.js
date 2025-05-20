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

  inner(value) {
    this.root = this._insert(value, this.root)
  }

  _insert(value, current) {
    if (current === null) {
      return new Node(value)
    }

    if (value === current.data) {
      return current
    }

    if (value < current.data) {
      current.left = this._insert(value, current.left)
    }

    if (value > current.data) {
      current.right = this._insert(value, current.right)
    }

    return current
  }

  delete(value) {
    this.root = this._deleteItem(value, this.root)
  }

  _deleteItem(value, current) {
    if (current === null) return null

    if (value < current.data) {
      current.left = this._deleteItem(value, current.left)
    } else if (value > current.data) {
      current.right = this._deleteItem(value, current.right)
    } else {
      if (current.left === null && current.right === null) return null
      if (current.left === null) return current.right
      if (current.right === null) return current.left

      let successor = this._findMin(current.right)
      current.data = successor.data
      current.right = this._deleteItem(successor.data, current.right)
    }

    return current
  }

  _findMin(node) {
    while (node.left !== null) {
      node = node.left
    }
    return node
  }

  levelOrder(callback, current = this.root) {
    if (current === null) return null
    if (!callback) throw new Error("Callback is required.")

    let queue = [current]

    while (queue.length > 0) {
      let item = queue.shift()
      callback(item)

      if (item.left !== null) queue.push(item.left)
      if (item.right !== null) queue.push(item.right)
    }
  }

}
