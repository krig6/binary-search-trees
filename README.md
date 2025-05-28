# Project: Binary Search Trees

![Language](https://img.shields.io/badge/language-JavaScript-yellow)
![Project Status: Stable](https://img.shields.io/badge/status-stable-brightgreen)

This project presents a straightforward implementation of a Binary Search Tree (BST) in JavaScript, including fundamental operations such as node insertion, value lookup, and structured traversal.

## Features

- **Efficient Tree Construction:** Automatically builds a balanced Binary Search Tree from a given array of values.

- **Core BST Operations:** Supports insertion, deletion, and search with proper value validation and duplicate handling.

- **Traversal Methods:** Includes inOrder, preOrder, postOrder, and levelOrder traversal with optional callback support.

- **Tree Analysis:** Provides methods to calculate a node’s height and depth, check if the tree is balanced, and rebalance it when needed.

- **Modular and Maintainable:** Clean, node-based design allows for easy extension and integration into larger applications.

- **User-Friendly Output:** Includes a **prettyPrint** method (sourced from The Odin Project) to display the tree structure in a clear, readable format.

## Getting Started

Follow these steps to get started with the Binary Search Tree project:

### 1. Clone the Repository

Start by cloning the repository to your local machine:

```bash
git clone <repository-url>
cd <repository-name>
```

### 2. Install Dependencies

To install the necessary dependencies, run:

```bash
npm install
```

### 3. Run the Driver Script

To test and interact with the Binary Search Tree methods, run the driver script:

```bash
npm run start
```

This executes the `index.js` file, which contains example usage and test cases demonstrating the functionality of the `Tree` class.

## Project Structure

```
.
├── src/                     # Source files
│   ├── classes/             # Contains the Tree and Node classes
│   │   ├── Tree.js          # Implements the Tree class (BST logic)
│   │   └── Node.js          # Defines the Node structure used by the Tree
│   ├── index.js             # Entry point to run and test Tree methods
│   └── styles/              # (Optional) CSS or styles for a UI/visualizer
├── .eslintrc.json           # ESLint configuration for code linting
├── .gitignore               # Specifies files/folders to exclude from Git tracking
├── .prettierrc.json         # Prettier configuration for consistent code formatting
├── README.md                # Project documentation and instructions
├── package.json             # Project metadata, scripts, and dependencies
└── webpack.config.js        # Configuration for bundling with Webpack
```

## Methods

`insert(inputValue)`: Inserts a new node with the given `inputValue` into the tree. Throws an error if the value is a duplicate or invalid.

`delete(deleteValue)`: Removes the node containing `deleteValue` from the tree. Throws an error if the value is not found.

`find(findValue)`: Returns the node containing `findValue`, or `null` if not found.

`levelOrder(callback, startingNode)`: Traverses the tree in level-order (BFS), starting from `startingNode` (defaults to root if not provided). Applies `callback` to each node and returns collected results.

`preOrder(callback, startingNode, results)`: Performs a pre-order traversal from `startingNode` (defaults to root), applying `callback` to each node. Returns a list of results.

`inOrder(callback, startingNode, results)`: Performs an in-order traversal from `startingNode` (defaults to root), applying `callback` to each node. Returns a list of results.

`postOrder(callback, startingNode, results)`: Performs a post-order traversal from `startingNode` (defaults to root), applying `callback` to each node. Returns a list of results.

`height(findValue)`: Returns the height of the node containing `findValue`. Returns `-1` if the node is not found.

`depth(findValue)`: Returns the depth of the node containing `findValue`. Returns `-1` if the node is not found.

`isBalanced(node)`: Checks if the subtree rooted at `node` (defaults to root) is balanced. Returns `true` or `false`.

`rebalance()`: Rebalances the tree to ensure optimal height based on in-order traversal.

`prettyPrint(node, prefix, isLeft)`: Prints a visual representation of the tree starting from `node` (defaults to root). Parameters `prefix` and `isLeft` are used internally for formatting. *(This method was adapted from The Odin Project.)*

## Customization

You can enhance the `Tree` class by implementing additional methods or modifying the current ones to better fit your specific use cases. Feel free to extend or adjust the `Node` class as well, or add new features to improve functionality and performance.

## Contributing

Contributions, issues, and feature requests are welcome! Feel free to check out the issues page if you want to contribute.

