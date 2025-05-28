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

  insert(inputValue) {
    let validatedValue = this._validateValue(inputValue)
    let insertResult = this._insert(validatedValue, this.root)

    if (insertResult === false) {
      throw new Error("Duplicate value.")
    }

    this.root = insertResult
  }

  _insert(valueToInsert, currentNode) {
    if (currentNode === null) {
      return new Node(valueToInsert)
    }
    if (valueToInsert < currentNode.data) {
      currentNode.left = this._insert(valueToInsert, currentNode.left)
    } else if (valueToInsert > currentNode.data) {
      currentNode.right = this._insert(valueToInsert, currentNode.right)
    } else {
      return false
    }

    return currentNode
  }

  _validateValue(value) {
    if (value === undefined || value === null) {
      throw new Error("Value cannot be null or undefined.")
    }

    if (typeof value === 'number') return value

    if (typeof value === 'string') {
      let trimmedValue = value.trim()
      if (trimmedValue === "") {
        throw new Error("Value cannot be empty.")
      }
      const numeric = Number(trimmedValue)
      if (isNaN(numeric)) {
        throw new Error("Value must be a valid number.")
      }
      return numeric
    }
    throw new Error("Value must be a number or a string.")
  }

  delete(deleteValue) {
    let validatedValue = this._validateValue(deleteValue)
    const { node, deleted } = this._delete(validatedValue, this.root)

    if (!deleted) {
      throw new Error("Value not found.")
    }

    this.root = node
  }

  _delete(valueToDelete, currentNode) {
    if (currentNode === null) return { node: null, deleted: false }

    if (valueToDelete < currentNode.data) {
      const { node, deleted } = this._delete(valueToDelete, currentNode.left)
      currentNode.left = node
      return { node: currentNode, deleted }
    } else if (valueToDelete > currentNode.data) {
      const { node, deleted } = this._delete(valueToDelete, currentNode.right)
      currentNode.right = node
      return { node: currentNode, deleted }
    } else {
      if (currentNode.left === null && currentNode.right === null) {
        return { node: null, deleted: true }
      }
      if (currentNode.left === null) {
        return { node: currentNode.right, deleted: true }
      }
      if (currentNode.right === null) {
        return { node: currentNode.left, deleted: true }
      }

      let successor = this._getMinNode(currentNode.right)
      currentNode.data = successor.data
      const { node: newRight } = this._delete(successor.data, currentNode.right)
      currentNode.right = newRight
      return { node: currentNode, deleted: true }
    }
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

  find(findValue, currentNode = this.root) {
    const validatedValue = this._validateValue(findValue)

    while (currentNode !== null) {
      if (validatedValue === currentNode.data) return currentNode
      currentNode = validatedValue < currentNode.data ? currentNode.left : currentNode.right
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

  height(findValue) {
    const validatedValue = this._validateValue(findValue)

    let targetNode = this.find(validatedValue)
    if (targetNode === null) return -1

    return this._calculateHeight(targetNode)
  }

  _calculateHeight(targetNode) {
    if (targetNode === null) return -1
    let leftSubtreeHeight = this._calculateHeight(targetNode.left)
    let rightSubtreeHeight = this._calculateHeight(targetNode.right)
    return 1 + Math.max(leftSubtreeHeight, rightSubtreeHeight)
  }

  depth(findValue) {
    const validatedValue = this._validateValue(findValue)

    return this._calculateDepth(validatedValue)
  }

  _calculateDepth(searchValue, current = this.root, depth = 0) {
    if (current === null) return -1
    if (searchValue === current.data) return depth
    if (searchValue < current.data) {
      return this._calculateDepth(searchValue, current.left, depth + 1)
    } else if (searchValue > current.data) {
      return this._calculateDepth(searchValue, current.right, depth + 1)
    }
    return -1
  }

  isBalanced(node = this.root) {
    if (node === null) return true
    let balanceHeight = this._checkBalanceHeight(node)
    return balanceHeight !== -1
  }

  _checkBalanceHeight(node) {
    if (node === null) return 0
    let leftSubtreeHeight = 0
    let rightSubtreeHeight = 0
    if (node.left !== null) {
      leftSubtreeHeight = this._checkBalanceHeight(node.left)
    }
    if (node.right !== null) {
      rightSubtreeHeight = this._checkBalanceHeight(node.right)
    }
    if (leftSubtreeHeight === -1 || rightSubtreeHeight === -1) return -1
    if (Math.abs(leftSubtreeHeight - rightSubtreeHeight) > 1) return -1
    return 1 + Math.max(leftSubtreeHeight, rightSubtreeHeight)
  }

  rebalance() {
    let sortedValues = this.inOrder(value => value)
    this.root = this.buildTree(sortedValues)
    return this.root
  }

  prettyPrint(node, prefix, isLeft) {
    if (node === undefined) node = this.root
    if (prefix === undefined) prefix = ""
    if (isLeft === undefined) isLeft = true

    if (node === null) return
    if (node.right !== null) {
      this.prettyPrint(node.right, prefix + (isLeft ? "│   " : "    "), false)
    }
    console.log(prefix + (isLeft ? "└── " : "┌── ") + node.data)
    if (node.left !== null) {
      this.prettyPrint(node.left, prefix + (isLeft ? "    " : "│   "), true)
    }
  }

}

export default Tree
