import Node from "./Node.js";

class Tree {
  constructor(array) {
    this.root = this.buildTree(array)
  }

  buildTree(array) {
    if (array.length === 0) return null

    const uniqueArray = Array.from(new Set(array)).sort((a, b) => a - b)
    const middleIndex = Math.floor(uniqueArray.length / 2)
    const rootNode = new Node(uniqueArray[middleIndex])
    rootNode.left = this.buildTree(uniqueArray.slice(0, middleIndex))
    rootNode.right = this.buildTree(uniqueArray.slice(middleIndex + 1))

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
}
