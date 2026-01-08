import Logic from "./TreeLogic.js";
let tree;

function clearTree() {
  tree = new Logic();
}

function insertFromInput() {
  const raw = document.getElementById("værdier").value;

  const nums = raw
    .split(",")
    .map((s) => Number(s.trim()))
    .filter((n) => Number.isFinite(n));

  nums.forEach((n) => tree.TreeLogic(n));
  console.log("indsæt:", nums);
}

function drawNode(node, x, y, gap) {
  if (!node) return;

  stroke(200);
  if (node.left) line(x, y, x - gap, y + 80);
  if (node.right) line(x, y, x + gap, y + 80);

  fill(30);
  stroke(255);
  circle(x, y, 40);

  noStroke();
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(14);
  text(node.value, x, y);

  drawNode(node.left, x - gap, y + 80, gap * 0.6);
  drawNode(node.right, x + gap, y + 80, gap * 0.6);
}

window.setup = function () {
  createCanvas(900, 600);
  clearTree();

  document.getElementById("indsæt").onclick = insertFromInput;
  document.getElementById("reset").onclick = clearTree;
};

window.draw = function () {
  background(15);

  if (tree?.tree) {
    drawNode(tree.tree, width / 2, 60, 200);
  }
};
