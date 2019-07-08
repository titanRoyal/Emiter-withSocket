let B_pices = [],
  W_pices = [];
const Pices = 16;
let global_turn = selected = next = 1;
let socket;

function preload() {
  prepare();
}

function setup() {
  createCanvas(windowHeight, windowHeight);
  select("canvas").position((windowWidth - width) / 2, (windowHeight - height) / 2)
  socket = io.connect("http://localhost:3000")
  socket.on("move", (data) => {
   // console.log(data);
    global_turn *= -1;
    if (data.color == "W") {
      W_pices.forEach((data1) => {
        if (data1.pos.x == data.oldPos.x && data1.pos.y == data.oldPos.y) {
          data1.pos.x = data.newPos.x;
          data1.pos.y = data.newPos.y;
        }
      })
      if (data.status == "kill") {
        B_pices.forEach((data1, index) => {
          if (data1.pos.x == data.newPos.x && data1.pos.y == data.newPos.y) {
            B_pices[index].isDead = true;
            B_pices.splice(index, 1);
          }
        })
      }
    } else {
      B_pices.forEach((data1) => {
        if (data1.pos.x == data.oldPos.x && data1.pos.y == data.oldPos.y) {
          data1.pos.x = data.newPos.x;
          data1.pos.y = data.newPos.y;
        }
      })
      if (data.status == "kill") {
        W_pices.forEach((data1, index) => {
          if (data1.pos.x == data.newPos.x && data1.pos.y == data.newPos.y) {
            W_pices[index].isDead = true;
            W_pices.splice(index, 1);
          }
        })
      }
    }
  })
}

function draw() {
  background("#0c2461");
  drawline()
  B_pices.forEach((data) => {
    data.show()
  })
  W_pices.forEach((data) => {
    data.show()
  })
}

function drawline() {
  push()
  // stroke("#203774")
  // strokeWeight(2)
  noStroke()
  noFill();
  for (var i = 0; i < 8; i++) {
    for (let i1 = 0; i1 < 8; i1++) {
      fill(Block.board[i][i1])
      rect(width / 8 * i /* + width / 16*/ , height / 8 * i1 /* + height / 16*/ , width / 8, width / 8)
    }
  }

  pop()
  if (next != 1) {
    selected.isSelected = true;
    next.forEach((data) => {
      push()
      noFill()
      strokeWeight(7)
      if (data.action == "move") {
        stroke("#39cd21")
      } else {
        stroke("#ee1b1b")
      }
      ellipse(data.position.x * width / 8 + width / 16, data.position.y * height / 8 + height / 16, width / 8, height / 8)
      pop()
    })
  }
}

function mousePressed() {
  let close = {
    dist: width * 2,
    obj: null
  }
  if (global_turn == 1) {
    for (var i = 0; i < W_pices.length; i++) {
      if (dist(mouseX, mouseY, W_pices[i].pos.x * (width / 8) + (width / 16), W_pices[i].pos.y * (height / 8) + (height / 16)) < close.dist) {
        close.dist = dist(mouseX, mouseY, W_pices[i].pos.x * (width / 8) + (width / 16), W_pices[i].pos.y * (height / 8) + (height / 16));
        close.obj = W_pices[i];
      }
    }
  } else {
    for (var i = 0; i < B_pices.length; i++) {
      if (dist(mouseX, mouseY, B_pices[i].pos.x * (width / 8) + (width / 16), B_pices[i].pos.y * (height / 8) + (height / 16)) < close.dist) {
        close.dist = dist(mouseX, mouseY, B_pices[i].pos.x * (width / 8) + (width / 16), B_pices[i].pos.y * (height / 8) + (height / 16));
        close.obj = B_pices[i];
      }
    }
  }
  if (selected == 1 && close.dist < width / 8) {
    selected = close.obj;
    next = close.obj.possible_move()
  } else if (selected != 1) {
    selected.dragged()
    selected.isSelected = false;
    selected = 1;
    next = 1;
  }
}
