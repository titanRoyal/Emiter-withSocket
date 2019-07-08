function prepare() {
  B_pices["rook2"] = new Block(7, 0, "B", "B_rook");
  B_pices["knight1"] = new Block(6, 0, "B", "B_knight");
  B_pices["bishop1"] = new Block(5, 0, "B", "B_bishop");
  B_pices["king"] = new Block(4, 0, "B", "B_king");
  B_pices["queen"] = new Block(3, 0, "B", "B_queen");
  B_pices["bishop2"] = new Block(2, 0, "B", "B_bishop");
  B_pices["knight2"] = new Block(1, 0, "B", "B_knight");
  B_pices["rook1"] = new Block(0, 0, "B", "B_rook");
  B_pices["sold1"] = new Block(0, 1, "B", "B_sold");
  B_pices["sold2"] = new Block(1, 1, "B", "B_sold");
  B_pices["sold3"] = new Block(2, 1, "B", "B_sold");
  B_pices["sold4"] = new Block(3, 1, "B", "B_sold");
  B_pices["sold5"] = new Block(4, 1, "B", "B_sold");
  B_pices["sold6"] = new Block(5, 1, "B", "B_sold");
  B_pices["sold7"] = new Block(6, 1, "B", "B_sold");
  B_pices["sold8"] = new Block(7, 1, "B", "B_sold");
  for (var rr in B_pices) {
    B_pices.push(B_pices[rr])
  }
  W_pices["rook2"] = new Block(7, 7, "W", "W_rook");
  W_pices["knight2"] = new Block(6, 7, "W", "W_knight");
  W_pices["bishop2"] = new Block(5, 7, "W", "W_bishop");
  W_pices["king"] = new Block(4, 7, "W", "W_king");
  W_pices["queen"] = new Block(3, 7, "W", "W_queen");
  W_pices["bishop1"] = new Block(2, 7, "W", "W_bishop");
  W_pices["knight1"] = new Block(1, 7, "W", "W_knight");
  W_pices["rook1"] = new Block(0, 7, "W", "W_rook");
  W_pices["sold1"] = new Block(0, 6, "W", "W_sold");
  W_pices["sold2"] = new Block(1, 6, "W", "W_sold");
  W_pices["sold3"] = new Block(2, 6, "W", "W_sold");
  W_pices["sold4"] = new Block(3, 6, "W", "W_sold");
  W_pices["sold5"] = new Block(4, 6, "W", "W_sold");
  W_pices["sold6"] = new Block(5, 6, "W", "W_sold");
  W_pices["sold7"] = new Block(6, 6, "W", "W_sold");
  W_pices["sold9"] = new Block(7, 6, "W", "W_sold");
  for (var rr in W_pices) {
    W_pices.push(W_pices[rr])
  }
  for (var i = 0; i < 8; i++) {
    Block.board[i] = []
    if (i % 2 == 0) {
      turn = 1
    } else {
      turn = -1
    }
    for (let i1 = 0; i1 < 8; i1++) {
      if (turn == 1) {
        Block.board[i][i1] = "#BC8F8F"
      } else {
        Block.board[i][i1] = "#D2B48C"
      }
      turn *= -1;
    }
  }
}
