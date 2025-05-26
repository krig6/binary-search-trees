import Node from "./Node.js";

class Tree {
  constructor(array) {
    this.root = this.buildTree(array)
  }

  buildTree(array, start = 0, end = null) {
    if (end === null) {
      array = Array.from(new Set(array)).sort((a, b) => a - b)
      end = array.length - 1
    }

    if (start > end) return null

    const middle = Math.floor((start + end) / 2)
    const rootNode = new Node(array[middle])
    rootNode.left = this.buildTree(array, start, middle - 1)
    rootNode.right = this.buildTree(array, middle + 1, end)

    return rootNode
  }

  insert(value) {
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
    this.root = this._delete(value, this.root)
  }

  _delete(value, current) {
    if (current === null) return null

    if (value < current.data) {
      current.left = this._delete(value, current.left)
    } else if (value > current.data) {
      current.right = this._delete(value, current.right)
    } else {
      if (current.left === null && current.right === null) return null
      if (current.left === null) return current.right
      if (current.right === null) return current.left

      let successor = this._getMinNode(current.right)
      current.data = successor.data
      current.right = this._delete(successor.data, current.right)
    }

    return current
  }

  _getMinNode(node) {
    while (node.left !== null) {
      node = node.left
    }
    return node
  }

  levelOrder(callback, startingNode) {
    let results = []
    let queueIndex = 0

    if (startingNode === null) {
      return []
    } else if (startingNode === undefined) {
      startingNode = this.root
    }
    if (typeof callback !== 'function') throw new Error("Callback must be a function")

    let nodeQueue = [startingNode]

    while (queueIndex < nodeQueue.length) {
      let currentNode = nodeQueue[queueIndex]

      const callbackResult = callback(currentNode)
      if (callbackResult !== undefined) {
        results.push(callbackResult)
      }

      if (currentNode.left !== null) nodeQueue.push(currentNode.left)
      if (currentNode.right !== null) nodeQueue.push(currentNode.right)
      queueIndex++
    }

    return results
  }

  find(searchValue, currentNode = this.root) {
    if (searchValue === undefined || searchValue === null || searchValue === "" || searchValue === '')
      throw new Error("Value cannot be empty.")
    if (typeof searchValue !== 'string' && typeof searchValue !== 'number')
      throw new Error("Value must be a string or number.")

    if (currentNode === null) return null

    while (currentNode !== null) {
      if (searchValue === currentNode.data) return currentNode
      if (searchValue < currentNode.data) {
        currentNode = currentNode.left
      } else {
        currentNode = currentNode.right
      }
    }

    return null
  }

  preOrder(callback, startingNode = this.root, results = []) {
    if (typeof callback !== 'function') throw new Error("Callback must be a function")
    if (startingNode === null) return results

    const callbackResult = callback(startingNode.data)
    if (callbackResult !== undefined) {
      results.push(callbackResult)
    }

    this.preOrder(callback, startingNode.left, results)
    this.preOrder(callback, startingNode.right, results)

    return results
  }

  inOrder(callback, startingNode = this.root, results = []) {
    if (typeof callback !== 'function') throw new Error("Callback must be a function")
    if (startingNode === null) return results

    this.inOrder(callback, startingNode.left, results)

    const callbackResult = callback(startingNode.data)
    if (callbackResult !== undefined) {
      results.push(callbackResult)
    }

    this.inOrder(callback, startingNode.right, results)

    return results
  }

  postOrder(callback, startingNode = this.root, results = []) {
    if (typeof callback !== 'function') throw new Error("Callback must be a function")
    if (startingNode === null) return results

    this.postOrder(callback, startingNode.left, results)
    this.postOrder(callback, startingNode.right, results)

    const callbackResult = callback(startingNode.data)
    if (callbackResult !== undefined) {
      results.push(callbackResult)
    }

    return results
  }

  height(value) {
    let targetNode = this.find(value)
    if (targetNode === null) return null
    return this._getHeight(targetNode)
  }

  _getHeight(node) {
    if (node === null) return -1
    let leftSubtreeHeight = this._getHeight(node.left)
    let rightSubtreeHeight = this._getHeight(node.right)

    return leftSubtreeHeight > rightSubtreeHeight
      ? 1 + leftSubtreeHeight
      : 1 + rightSubtreeHeight
  }

  depth(value) {
    let targetNode = this.find(value)
    if (targetNode === null) return null
    return this._getDepth(targetNode)
  }

  _getDepth(node, current = this.root, depth = 0) {
    if (current === null) return depth
    if (node.data === current.data) return depth
    if (node.data < current.data) {
      return this._getDepth(node, current.left, depth + 1)
    } else if (node.data > current.data) {
      return this._getDepth(node, current.right, depth + 1)
    }
  }

  isBalanced(current = this.root) {
    if (current === null) return true
    let balanceHeight = this._checkBalanceAndHeight(current)
    return balanceHeight !== -1
  }

  _checkBalanceAndHeight(node) {
    if (node === null) return 0
    let leftHeight = this._checkBalanceAndHeight(node.left)
    let rightHeight = this._checkBalanceAndHeight(node.right)
    if (leftHeight === -1 || rightHeight === -1) return -1
    if (Math.abs(leftHeight - rightHeight) > 1) return -1
    return 1 + Math.max(leftHeight, rightHeight)
  }

  rebalance() {
    let sortedArray = []
    this.inOrder(value => sortedArray.push(value))
    this.root = this.buildTree(sortedArray)
    return this.root
  }

}
