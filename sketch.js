let w = 5;
let r, c = 0;
let grid = [];

function Array2D(r, c) {
  let g = new Array(r);
  for (let i = 0; i < c; i++) {
    g[i] = new Array(c);
  }
  return g;
}

function setup() {
  createCanvas(round(document.body.clientWidth / w) * w, 220 * w);

  r = height/w;
  c = width/w;

  grid = Array2D(r, c);

  for (let i = 0; i < c; i++) {
    for (let j = 0; j < r; j++) {
      if(random(100) < 10){
        grid[i][j] = 1;
      }else{
        grid[i][j] = 0;
      }
    }
  }
}

function drawGridLines() {
  for (let i = 0; i < height / w; i++) {
    line(i * w, 0, i * w, height);
  }
  for (let j = 0; j < width / w; j++) {
    line(0, j * w, width, j * w);
  }
}

function drawLife() {
  for (let i = 0; i < c; i++) {
    for (let j = 0; j < r; j++) {
      if(grid[i][j] == 1){
        rect(i * w, j * w, w, w);
      }
    }
  }
}

function count(g, x, y) {
  let sum = 0;
  for(let i = -1; i < 2; i++){
    for(let j = -1; j < 2; j++){
      let col = (x + i + c) % c;
      let row = (y + j + r) % r;
      sum += g[col][row];
    }
  }
  sum -= g[x][y];
  return sum;
}

function draw() {
  background(0);

  stroke(0);
  drawGridLines();

  let next = Array2D(r, c);

  for (let i = 0; i < c; i++) {
    for (let j = 0; j < r; j++) {
      let state = grid[i][j];

      let sum = 0;
      let neighbors = count(grid, i, j);

      if(state == 0 && neighbors == 3){
        next[i][j] = 1;
      }else if(state == 1 && (neighbors < 2 || neighbors > 3)){
        next[i][j] = 0;
      }else{
        next[i][j] = state;
      }

      if(state == 0 && neighbors > 0){
        let rand = floor(random(100000));
        if(rand < 2){
          next[i][j] = 1;
        }
      }

    }
  }

  grid = next;

  fill(255);
  drawLife();
}
