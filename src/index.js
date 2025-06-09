import Tree from './classes/Tree.js';

const randomArray = (minLength, maxLength = 100, maxValue = 100) => {
  if (minLength < 5) {
    throw new Error('Minimum length must be at least 5.');
  } else if (minLength > maxLength) {
    throw new Error('Minimum length must be less than or equal to the maximum length.');
  }

  const arrayLength = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;

  return Array.from({ length: arrayLength }, () =>
    Math.floor(Math.random() * maxValue) + 1);
};

// Create a random array with length between 5 and 10, values 1-100
const arr = randomArray(5, 10, 100);
console.log('Random array:', arr);

// Create the tree from the array
const tree = new Tree(arr);

// Helper to collect traversal results
function collectTraversal(tree, methodName) {
  const result = [];
  tree[methodName](value => result.push(value));
  return result;
}

// Check if balanced
console.log('Is the tree balanced?', tree.isBalanced());

// Print traversals
console.log('Level order:', collectTraversal(tree, 'levelOrder'));
console.log('Preorder:', collectTraversal(tree, 'preOrder'));
console.log('Postorder:', collectTraversal(tree, 'postOrder'));
console.log('Inorder:', collectTraversal(tree, 'inOrder'));

// Unbalance the tree by adding values > 100
[101, 102, 150, 200, 250].forEach(val => tree.insert(val));

console.log('\nAfter inserting large values to unbalance:');

// Check balance again
console.log('Is the tree balanced?', tree.isBalanced());

// Balance the tree
tree.rebalance();

console.log('\nAfter rebalancing:');

// Check balance again
console.log('Is the tree balanced?', tree.isBalanced());

// Print traversals again
console.log('Level order:', collectTraversal(tree, 'levelOrder'));
console.log('Preorder:', collectTraversal(tree, 'preOrder'));
console.log('Postorder:', collectTraversal(tree, 'postOrder'));
console.log('Inorder:', collectTraversal(tree, 'inOrder'));
