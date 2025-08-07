//Genrating the grid
const gridWidth = 2025;
const gridHeight = 1150;
const cellSize = 46;

//44 col and 25 rows
const cols = Math.floor(gridWidth / cellSize);
const rows = Math.floor(gridHeight / cellSize);

const grid = document.querySelector(".grid");

// Set the grid template dynamically repeat-col/rows
grid.style.gridTemplateColumns = `repeat(${cols}, ${cellSize}px)`;
grid.style.gridTemplateRows = `repeat(${rows}, ${cellSize}px)`;

// Generate the grid cells
for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.id = `${i}-${j}`; //most important: all operation will be performed from this id
    grid.appendChild(cell);
    // console.log(cell.id);
  }
}

/*Problem:How will i know which cell is clicked - as cells are stored not on basis of rows or coloum(i,j) rather
grid.children[i] ?
Solution: and add even listnrer to each cell

Problem:how will i find adjcanent node  of a node  as cell are not stored as [i][j] ->but grid.children[i](i is increasing)
solution:assign cell id to each cell based on repeating rows and col
when a cell is clicked ,we get the target cell as - grid.children[i]
find adjcacent node by grid.children[i].cell_id ,cell_id="i-j"
so from 'i-j' do `${i+1}-{j} ` or `${i-1}-{j} ` or `${i}-{j+1} ` or `${i}-{j-1} `
*/
// ********************************************************************************************************************

//update the algorithm choosen in select tag
let curr_algo = "Dijkastra";
function update_algo() {
  curr_algo = document.getElementById("algo_menu").value;
  console.log(curr_algo);

  let content = document.getElementById("content");

  let weight_btn = document.getElementById("wtBtn"); //only visible for dijkastra and A*

  if (curr_algo == "Dijkastra") {
    content.innerHTML = "";
    content.innerHTML =
      '<p id="dfs_content">Complexity: <span style="color: rgb(60, 157, 242); font-weight: bold;">0( V+E )</span><br> Dijkstra\'s algorithm is a single-source shortest path algorithm used to find the shortest paths from a starting node to all other nodes in a weighted graph</p>';
    weight_btn.style.visibility = "visible";
  } else if (curr_algo == "A*") {
    content.innerHTML = "";
    content.innerHTML =
      '<p id="a*_content" ">A* (pronounced "A-star") is a graph traversal and path search algorithm, which is often used in computer science due to its completeness, optimality, and optimal efficiency. One major practical drawback is its O(b^d) space complexity, as it stores all generated nodes in memory. Thus, in practical travel-routing systems, it is generally outperformed by algorithms which can pre-process the graph to attain better performance, as well as memory-bounded approaches; however, A* is still the best solution in many cases.</p>';
    weight_btn.style.visibility = "visible";
  } else if (curr_algo == "Depth First") {
    content.innerHTML = "";
    content.innerHTML =
      '<p id="dfs_content">Complexity: <span style="color: rgb(60, 157, 242); font-weight: bold;">0( V+E )</span><br>DFS is unweighted & doesn\'t guarantee shortest path</p>';
    weight_btn.style.visibility = "hidden";
  } else if (curr_algo == "Breadth First") {
    content.innerHTML = "";
    content.innerHTML =
      '<p id="dfs_content">Complexity: <span style="color: rgb(60, 157, 242); font-weight: bold;">0( V+E )</span><br>  BFS is unweighted & gives shortest path</p>';
    weight_btn.style.visibility = "hidden";
  }
}

// ********************************************************************************************************************

//Set start cell, target cell, walls

let isDragging = false;
/*(Problem:let isDragging = false; was declared inside the if block, so each event listener got its own separate copy, breaking the logic.
 Fix:Moved let isDragging = false; outside the if block so all event listeners share the same variable — now the dragging behavior works correctly.)
*/

let addWeights = false; //if weights are being added/removed you cant add or remove anyhting

let src_cell = -1;
let src_cell_id = -1;
let target_cell = -1;
let target_cell_id = -1;

let cells = grid.children; //all the cells inside the grid
for (let i = 0; i < cells.length; i++) {
  let cell = grid.children[i];

  let isWeight_cell = false; //tells is an wieght op is performed so no operation are performed beside it

  cell.addEventListener("click", () => {
    //REMOVING WEIGHTS
    if (cell.style.backgroundImage == "url('/images/weight.png')") {
      cell.style.backgroundImage = "";
      cell.style.backgroundSize = "";
      weights.set(cell.id, 1); //set weight to as 1(default) after removing  weight block
      isWeight_cell = true;
      return; //dont perform any other operation on curr cell
    }

    //ADDING WEIGHTS
    if (
      //if curr cell is not target/src/wall and addWeight btn is clciked
      addWeights == true &&
      cell.id != src_cell_id &&
      cell.id != target_cell_id &&
      cell.style.backgroundColor != "black"
    ) {
      cell.style.backgroundImage = "url('/images/weight.png')";
      cell.style.backgroundSize = "43.5px";
      weights.set(cell.id, 5); //set weight to as 5 for each weight blok
      isWeight_cell = true;
      return; //dont perform any other operation on curr cell
    }

    //ADDING SOURCE/TARGET
    if (src_cell == -1 && target_cell != i) {
      src_cell = i;
      src_cell_id = cell.id;
      cell.style.backgroundImage = "url('/images/start.png')";
      cell.style.backgroundSize = "43.5px";
    } else if (target_cell == -1 && src_cell != i) {
      target_cell = i;
      target_cell_id = cell.id;
      cell.style.backgroundImage = "url('/images/target.png')";
      cell.style.backgroundSize = "cover";
    } //REMOVING SOURCE/TARGET
    else {
      if (src_cell != -1 && src_cell == i) {
        src_cell = -1;
        cell.style.backgroundImage = "";
        src_cell_id = -1;
      } else if (target_cell != -1 && target_cell == i) {
        target_cell = -1;
        cell.style.backgroundImage = "";
        target_cell_id = -1;
      }

      //agr hum prev walls m src ya target ko add krre to first clik m src ayega ya wall htegi
    }
  });

  //OPERATION ON WALL

  cell.addEventListener("click", () => {
    //REMOVING A WALL
    if (cell.style.backgroundColor == "black") {
      //if curr cell is already a wall ->remove it
      cell.style.backgroundColor = "";
      visited.set(cell.id, false); //mark the wall visited=false so its can be  traversed later
    } else if (
      //curr cell is not a wall and src and target are already set
      src_cell != -1 &&
      target_cell != -1 &&
      src_cell != i &&
      target_cell != i &&
      isWeight_cell != true //if weight operation was performed on curr cell leave it
    ) {
      cell.style.backgroundColor = "black";
      visited.set(cell.id, true); //mark the wall as visited so its not traversed later
    }
  });

  //Drag and Draw walls
  cell.addEventListener("mousedown", () => {
    if (
      src_cell != -1 &&
      target_cell != -1 &&
      src_cell != i &&
      target_cell != i &&
      isWeight_cell != true
    ) {
      isDragging = true;
      visited.set(cell.id, true);
    }
  });
  cell.addEventListener("mousemove", () => {
    if (
      src_cell != -1 &&
      target_cell != -1 &&
      src_cell != i &&
      target_cell != i &&
      isWeight_cell != true
    ) {
      if (isDragging) {
        cell.style.backgroundColor = "black";
        visited.set(cell.id, true);
      }
    }
  });
  cell.addEventListener("mouseup", () => {
    if (
      src_cell != -1 &&
      target_cell != -1 &&
      src_cell != i &&
      target_cell != i &&
      isWeight_cell != true
    ) {
      isDragging = false;
    }
  });
}

// **********************************************************************************************************************************

//to wait an operation
function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ********************************************************************************************************************************
// PATHFINDING ALGORITHM

// let rows=25;
// let cols=44;

//Adjancey map : keeps all neighbors cell_id  of a  curr_cell
const adj = new Map();
for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    const key = `${i}-${j}`;
    const neigh = []; //store all neighbors in array
    if (i + 1 < rows) neigh.push(`${i + 1}-${j}`);
    if (j + 1 < cols) neigh.push(`${i}-${j + 1}`);
    if (i - 1 >= 0) neigh.push(`${i - 1}-${j}`);
    if (j - 1 >= 0) neigh.push(`${i}-${j - 1}`);
    adj.set(key, neigh); //map all neigh  to curr cell
  }
}

const weights = new Map();
for (let i = 0; i < cells.length; i++) {
  let cell = grid.children[i];
  weights.set(cell.id, 1);
}

const parent = new Map(); //track parent_id of each cell, **Useful for backtracking(dest to src->green color)
const visited = new Map();

//Breadth First Search
async function BFirst(src_id) {
  const q = new Array(); //to perfoem Bfs->** equivalent of queue(c++)

  q.push(src_id);
  visited.set(src_id, true);

  while (!q.length == 0) {
    let temp = q[0];
    if (temp == target_cell_id) {
      //reached dest ->break the loop
      console.log("reached");
      break;
    }
    q.shift(); //delete front element

    for (let neigh of adj.get(temp)) {
      if (!visited.get(neigh)) {
        q.push(neigh);
        parent.set(neigh, temp);
        visited.set(neigh, true);
        document.getElementById(neigh).style.backgroundColor = "lightblue"; //visited node as blue
        await wait(2);
      }
    }
  }
  //backtrack from dest to src
  let target = target_cell_id;
  while (parent.get(target) != src_id) {
    target = parent.get(target);
    document.getElementById(target).style.backgroundColor = "green"; //path from dest to src =Green
  }
  document.body.classList.remove("overlayer"); //remove overlayer after visualization is finished so we can click again
}

//Depth First Search
async function DFirst(src_id) {
  // ** to mimic stack using array -> start of arr->bottom of stack, end of arr->top of stack
  //push new entry at last and pop from last using .pop()
  const stack = new Array();

  stack.push(src_id);

  while (stack.length != 0) {
    let temp = stack.pop(); //delete last element ->top of stack
    if (temp == target_cell_id) {
      //reached dest ->break the loop
      console.log("reached");
      break;
    }
    //if already visited
    if (visited.get(temp)) continue;

    visited.set(temp, true);

    document.getElementById(temp).style.backgroundColor = "lightblue";
    await wait(2);

    for (let neigh of adj.get(temp)) {
      if (!visited.get(neigh)) {
        stack.push(neigh);
        parent.set(neigh, temp);
      }
    }
  }
  //backtrack from dest to src
  let target = target_cell_id;
  while (parent.get(target) != src_id) {
    target = parent.get(target);
    document.getElementById(target).style.backgroundColor = "green";
  }
  document.body.classList.remove("overlayer"); //remove overlayer after visualization is finished
}

async function dijkastra(src_id) {
  //Set implementation
  const dist = new Map(); //to store dist of each node from src
  for (let i = 0; i < cells.length; i++) {
    let cell = grid.children[i];
    dist.set(cell.id, Number.MAX_SAFE_INTEGER); //intially dist is INFINITE
  }
  dist.set(src_id, 0); //dist from src to src =0

  let arr = new Array(); //[dist, cell_id]
  //arr is let because its chnages(delted entries later)
  arr.push([0, src_id]);

  while (arr.length != 0) {
    arr.sort((a, b) => a[0] - b[0]); //syntax to sort array of pair by 1st elment->sort by dist
    let temp = arr[0];
    let node = temp[1];
    let wt = temp[0];
    arr.shift();

    if (node == target_cell_id) {
      console.log("reached");
      break;
    }

    for (let neigh of adj.get(node)) {
      let newDist = wt + weights.get(neigh); //from node to neigh
      if (visited.get(neigh) != true) {
        //if it is not a wall  consider cell  -> **only use  of visited in dijkastra
        if (dist.get(neigh) > newDist) {
          //if a shorter path exist for node(id=neigh_id)
          if (dist.get(neigh) != Number.MAX_SAFE_INTEGER) {
            //if a greater path which is not INF exits in arr->delte it

            arr = arr.filter(([wt, id]) => id !== neigh);
          }
          dist.set(neigh, newDist);
          arr.push([newDist, neigh]);
          parent.set(neigh, node);
        }
        await wait(2);
        document.getElementById(neigh).style.backgroundColor = "lightblue";
      }
    }
  }

  let target = target_cell_id;
  while (target !== src_id) {
    target = parent.get(target);
    if (!target) break; // safety check
    document.getElementById(target).style.backgroundColor = "green";
  }
  document.body.classList.remove("overlayer"); //remove overlayer after visualization is finished
}

//Bellman-Ford ->Button Add Negative Weight
async function bford(src_id) {
  //future
}

//astar
async function astar(src_id) {
  //future
}

//***************************************************************************************** */
// Buttons

let visualized = false; //check if an algo is already implemented

//Clear Button
let clear_btn = document.getElementById("clear_btn");
let angle = 0; //
clear_btn.addEventListener("click", () => {
  angle += 360; //rotate:360 at every click  **Problem:normal rotate(360)->rotate only once after this it is already 360
  for (let i = 0; i < cells.length; i++) {
    let cell = grid.children[i];
    cell.style.transition = "transform 1s";
    cell.style.transform = `rotate(${angle}deg)`;
    src_cell = -1;
    src_cell_id = -1;
    target_cell = -1;
    target_cell_id = -1;
    cell.style.textContent = "";
    cell.style.backgroundColor = "";
    cell.style.backgroundImage = "";
    visited.clear();
    weights.set(cell.id, 1); //default wt of each node
    weight_btn.classList.remove("wt_clicked"); //make weight_btn clickable
    addWeights = false;
    visualized = false;
  }
});

//Visualize Button
let visualize = document.getElementById("visualize");
visualize.addEventListener("click", () => {
  //stop any operation from being clicked until the visualization is over
  document.body.classList.add("overlayer");

  //if there is an algo implemented already
  if (visualized == true) {
    // let cells = grid.children;
    for (let i = 0; i < cells.length; i++) {
      let cell = grid.children[i];
      //remove all cell value except the  walls(black) and weight
      if (
        cell.style.backgroundColor != "black" &&
        cell.style.backgroundImage != "url('/images/weight.png')"
      ) {
        cell.style.backgroundColor = "";
        visited.delete(cell.id); //remove  cell_id as visited to restart the visualization again
        //keeps the walls and weights as it is
      }
    }
    parent.clear(); //remove parent value,new value will be calulated
  }

  if (curr_algo == "Breadth First") {
    BFirst(src_cell_id);
  } else if (curr_algo == "Depth First") {
    DFirst(src_cell_id);
  } else if (curr_algo == "Dijkastra") {
    dijkastra(src_cell_id);
  } else if (curr_algo == "A*") {
    astar(src_cell_id);
  }

  visualized = true; //we have viusalized the algo
  addWeights = false; //to add weights again click btn manually again
  weight_btn.classList.remove("wt_clicked");
});

//Add Weight Button
let weight_btn = document.getElementById("wtBtn");
weight_btn.addEventListener("click", () => {
  if (addWeights == true) {
    addWeights = false;
    weight_btn.classList.remove("wt_clicked");
  } else {
    addWeights = true;
    weight_btn.classList.add("wt_clicked");
  }
});

// cancel button
//hide the popup
let cancel = document.getElementById("cancel");
let popup = document.querySelector(".popup");
cancel.addEventListener("click", (event) => {
  popup.style.display = "none";
});
