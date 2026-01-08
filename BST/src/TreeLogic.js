import Node from "./Node.js";

export default class Logic {
  constructor() {
    this.tree = null;
  }

  TreeLogic(value) {
    if (this.tree === null) {
      this.tree = new Node(value);
      return;
    }

    const treePath = [];
    let currentNode = this.tree;

    while (true) {
      treePath.push(currentNode);
      if (value === currentNode.value) return;

      if (value < currentNode.value) {
        if (currentNode.left === null) {
          currentNode.left = new Node(value);
          treePath.push(currentNode.left);
          break;
        }
        currentNode = currentNode.left;
      } else {
        if (currentNode.right === null) {
          currentNode.right = new Node(value);
          treePath.push(currentNode.right);
          break;
        }
        currentNode = currentNode.right;
      }
    }

    for (let i = treePath.length - 2; i >= 0; i--) {
      let node = treePath[i];

      this.UpdateHeight(node);

      const bf = this.BalanceFactor(node);
      let newTreeNodeUp = node;
      let whichChange;

      if (bf > 1) {
        whichChange = value < node.left.value ? "LL" : "LR";
      } else if (bf < -1) {
        whichChange = value > node.right.value ? "RR" : "RL";
      }

      switch (whichChange) {
        case "LL":
          newTreeNodeUp = this.RotateRight(node);
          break;

        case "RR":
          newTreeNodeUp = this.RotateLeft(node);
          break;

        case "LR":
          node.left = this.RotateLeft(node.left);
          newTreeNodeUp = this.RotateRight(node);
          break;

        case "RL":
          node.right = this.RotateRight(node.right);
          newTreeNodeUp = this.RotateLeft(node);
          break;
      }

      let pastNode;

      if (i === 0) {
        pastNode = null;
      } else {
        pastNode = treePath[i - 1];
      }
      if (pastNode === null) {
        this.tree = newTreeNodeUp;
      } else if (pastNode.left === node) {
        pastNode.left = newTreeNodeUp;
      } else {
        pastNode.right = newTreeNodeUp;
      }

      treePath[i] = newTreeNodeUp;
    }
  }

  Height(x) {
    if (x === null) {
      return 0;
    }
    return x.height;
  }

  UpdateHeight(x) {
    x.height = 1 + Math.max(this.Height(x.left), this.Height(x.right));
  }

  BalanceFactor(x) {
    const leftHeight = this.Height(x.left);
    const rightHeight = this.Height(x.right);

    return leftHeight - rightHeight;
  }

  RotateRight(y) {
    const x = y.left;

    y.left = x.right;
    x.right = y;

    this.UpdateHeight(y);
    this.UpdateHeight(x);

    return x;
  }

  RotateLeft(x) {
    const y = x.right;

    x.right = y.left;
    y.left = x;

    this.UpdateHeight(x);
    this.UpdateHeight(y);

    return y;
  }
}
