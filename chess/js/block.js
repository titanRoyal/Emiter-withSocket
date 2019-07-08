class Block {
  constructor(x, y, c, str) {
    Block.board = []
    this.pos = createVector(x, y);
    this.colo = c;
    this.isDead = false;
    this.isSelected = false;

    this.fcolo = color(random(255), random(255), random(255));
    this.scolo = color(random(255), random(255), random(255));
    this.rate = 0
    this.name = str.split("_")[1]

    this.img = loadImage("meta/img/" + str + ".png")
  }
  show() {
    push()
    if (this.isSelected) {
      strokeWeight(7);
    } else {
      strokeWeight(4)
    }
    noFill()
    this.rate += 0.02
    let colo = lerpColor(this.fcolo, this.scolo, this.rate)
    if (this.rate >= 1) {
      this.fcolo = this.scolo;
      this.scolo = color(random(255), random(255), random(255));
      this.rate = 0
    }
    stroke(colo);
    translate(this.pos.x * width / 8, this.pos.y * height / 8)
    image(this.img, 0, 0, width / 8, height / 8);
    ellipse(width / 16, height / 16, width / 8)
    pop()
  }
  validmove(x, y) {
    if (x < 0 || x >= 8 || y < 0 || y >= 8) {
      return false;
    } else {
      return true
    }
  }
  possible_move() {
    if (this.colo == "B") {
      switch (this.name) {
        case "sold":
          var moves = [];
          if (this.validmove(this.pos.x, this.pos.y + 1)) {
            let test = true;
            for (var i = 0; i < W_pices.length; i++) {
              if (W_pices[i].pos.x == this.pos.x && W_pices[i].pos.y == this.pos.y + 1) {
                test = false;
                break;
              }
            }
            for (var i = 0; i < B_pices.length; i++) {
              if (B_pices[i].pos.x == this.pos.x && B_pices[i].pos.y == this.pos.y + 1) {
                test = false;
                break;
              }
            }
            if (test) {
              moves.push({
                action: "move",
                position: {
                  x: this.pos.x,
                  y: this.pos.y + 1
                }
              })
              if (this.validmove(this.pos.x, this.pos.y + 2) && this.pos.y == 1) {
                let test = true;
                for (var i = 0; i < W_pices.length; i++) {
                  if (W_pices[i].pos.x == this.pos.x && W_pices[i].pos.y == this.pos.y + 2) {
                    test = false;
                    break;
                  }
                }
                for (var i = 0; i < B_pices.length; i++) {
                  if (B_pices[i].pos.x == this.pos.x && B_pices[i].pos.y == this.pos.y + 2) {
                    test = false;
                    break;
                  }
                }
                if (test) {
                  moves.push({
                    action: "move",
                    position: {
                      x: this.pos.x,
                      y: this.pos.y + 2
                    }
                  })
                }
              }
            }
          }
          if (this.validmove(this.pos.x + 1, this.pos.y + 1)) {
            let test = true;
            for (var i = 0; i < B_pices.length; i++) {
              if (B_pices[i].pos.x == this.pos.x + 1 && B_pices[i].pos.y == this.pos.y + 1) {
                test = false;
                break;
              }
            }
            if (test) {
              for (var i = 0; i < W_pices.length; i++) {
                if (W_pices[i].pos.x == this.pos.x + 1 && W_pices[i].pos.y == this.pos.y + 1) {
                  test = false;
                  moves.push({
                    action: "kill",
                    position: {
                      x: this.pos.x + 1,
                      y: this.pos.y + 1
                    }
                  })
                  break;
                }
              }
            }
            if (this.validmove(this.pos.x - 1, this.pos.y + 1)) {
              let test = true;
              for (var i = 0; i < B_pices.length; i++) {
                if (B_pices[i].pos.x == this.pos.x - 1 && B_pices[i].pos.y == this.pos.y + 1) {
                  test = false;
                  break;
                }
              }
              if (test) {
                for (var i = 0; i < W_pices.length; i++) {
                  if (W_pices[i].pos.x == this.pos.x - 1 && W_pices[i].pos.y == this.pos.y + 1) {
                    test = false;
                    moves.push({
                      action: "kill",
                      position: {
                        x: this.pos.x - 1,
                        y: this.pos.y + 1
                      }
                    })
                    break;
                  }
                }
              }
            }
          }
          return moves;
          break;
        case "knight":
          moves = []
          if (this.validmove(this.pos.x + 1, this.pos.y + 2)) {
            let test = true;
            for (var i = 0; i < B_pices.length; i++) {
              if (B_pices[i].pos.x == this.pos.x + 1 && B_pices[i].pos.y == this.pos.y + 2) {
                test = false;
                break;
              }
            }
            if (test) {
              for (var i = 0; i < W_pices.length; i++) {
                if (W_pices[i].pos.x == this.pos.x + 1 && W_pices[i].pos.y == this.pos.y + 2) {
                  test = false;
                  moves.push({
                    action: "kill",
                    position: {
                      x: this.pos.x + 1,
                      y: this.pos.y + 2
                    }
                  })
                  break;
                }
              }
            }
            if (test) {
              moves.push({
                action: "move",
                position: {
                  x: this.pos.x + 1,
                  y: this.pos.y + 2
                }
              })
            }
          }
          if (this.validmove(this.pos.x - 1, this.pos.y + 2)) {
            let test = true;
            for (var i = 0; i < B_pices.length; i++) {
              if (B_pices[i].pos.x == this.pos.x - 1 && B_pices[i].pos.y == this.pos.y + 2) {
                test = false;
                break;
              }
            }
            if (test) {
              for (var i = 0; i < W_pices.length; i++) {
                if (W_pices[i].pos.x == this.pos.x - 1 && W_pices[i].pos.y == this.pos.y + 2) {
                  test = false;
                  moves.push({
                    action: "kill",
                    position: {
                      x: this.pos.x - 1,
                      y: this.pos.y + 2
                    }
                  })
                  break;
                }
              }
            }
            if (test) {
              moves.push({
                action: "move",
                position: {
                  x: this.pos.x - 1,
                  y: this.pos.y + 2
                }
              })
            }
          }
          if (this.validmove(this.pos.x + 1, this.pos.y - 2)) {
            let test = true;
            for (var i = 0; i < B_pices.length; i++) {
              if (B_pices[i].pos.x == this.pos.x + 1 && B_pices[i].pos.y == this.pos.y - 2) {
                test = false;
                break;
              }
            }
            if (test) {
              for (var i = 0; i < W_pices.length; i++) {
                if (W_pices[i].pos.x == this.pos.x + 1 && W_pices[i].pos.y == this.pos.y - 2) {
                  test = false;
                  moves.push({
                    action: "kill",
                    position: {
                      x: this.pos.x + 1,
                      y: this.pos.y - 2
                    }
                  })
                  break;
                }
              }
            }
            if (test) {
              moves.push({
                action: "move",
                position: {
                  x: this.pos.x + 1,
                  y: this.pos.y - 2
                }
              })
            }
          }
          if (this.validmove(this.pos.x - 1, this.pos.y - 2)) {
            let test = true;
            for (var i = 0; i < B_pices.length; i++) {
              if (B_pices[i].pos.x == this.pos.x - 1 && B_pices[i].pos.y == this.pos.y - 2) {
                test = false;
                break;
              }
            }
            if (test) {
              for (var i = 0; i < W_pices.length; i++) {
                if (W_pices[i].pos.x == this.pos.x - 1 && W_pices[i].pos.y == this.pos.y - 2) {
                  test = false;
                  moves.push({
                    action: "kill",
                    position: {
                      x: this.pos.x - 1,
                      y: this.pos.y - 2
                    }
                  })
                  break;
                }
              }
            }
            if (test) {
              moves.push({
                action: "move",
                position: {
                  x: this.pos.x - 1,
                  y: this.pos.y - 2
                }
              })
            }
          }
          if (this.validmove(this.pos.x + 2, this.pos.y + 1)) {
            let test = true;
            for (var i = 0; i < B_pices.length; i++) {
              if (B_pices[i].pos.x == this.pos.x + 2 && B_pices[i].pos.y == this.pos.y + 1) {
                test = false;
                break;
              }
            }
            if (test) {
              for (var i = 0; i < W_pices.length; i++) {
                if (W_pices[i].pos.x == this.pos.x + 2 && W_pices[i].pos.y == this.pos.y + 1) {
                  test = false;
                  moves.push({
                    action: "kill",
                    position: {
                      x: this.pos.x + 2,
                      y: this.pos.y + 1
                    }
                  })
                  break;
                }
              }
            }
            if (test) {
              moves.push({
                action: "move",
                position: {
                  x: this.pos.x + 2,
                  y: this.pos.y + 1
                }
              })
            }
          }
          if (this.validmove(this.pos.x - 2, this.pos.y + 1)) {
            let test = true;
            for (var i = 0; i < B_pices.length; i++) {
              if (B_pices[i].pos.x == this.pos.x - 2 && B_pices[i].pos.y == this.pos.y + 1) {
                test = false;
                break;
              }
            }
            if (test) {
              for (var i = 0; i < W_pices.length; i++) {
                if (W_pices[i].pos.x == this.pos.x - 2 && W_pices[i].pos.y == this.pos.y + 1) {
                  test = false;
                  moves.push({
                    action: "kill",
                    position: {
                      x: this.pos.x - 2,
                      y: this.pos.y + 1
                    }
                  })
                  break;
                }
              }
            }
            if (test) {
              moves.push({
                action: "move",
                position: {
                  x: this.pos.x - 2,
                  y: this.pos.y + 1
                }
              })
            }
          }
          if (this.validmove(this.pos.x + 2, this.pos.y - 1)) {
            let test = true;
            for (var i = 0; i < B_pices.length; i++) {
              if (B_pices[i].pos.x == this.pos.x + 2 && B_pices[i].pos.y == this.pos.y - 1) {
                test = false;
                break;
              }
            }
            if (test) {
              for (var i = 0; i < W_pices.length; i++) {
                if (W_pices[i].pos.x == this.pos.x + 2 && W_pices[i].pos.y == this.pos.y - 1) {
                  test = false;
                  moves.push({
                    action: "kill",
                    position: {
                      x: this.pos.x + 2,
                      y: this.pos.y - 1
                    }
                  })
                  break;
                }
              }
            }
            if (test) {
              moves.push({
                action: "move",
                position: {
                  x: this.pos.x + 2,
                  y: this.pos.y - 1
                }
              })
            }
          }
          if (this.validmove(this.pos.x - 2, this.pos.y - 1)) {
            let test = true;
            for (var i = 0; i < B_pices.length; i++) {
              if (B_pices[i].pos.x == this.pos.x - 2 && B_pices[i].pos.y == this.pos.y - 1) {
                test = false;
                break;
              }
            }
            if (test) {
              for (var i = 0; i < W_pices.length; i++) {
                if (W_pices[i].pos.x == this.pos.x - 2 && W_pices[i].pos.y == this.pos.y - 1) {
                  test = false;
                  moves.push({
                    action: "kill",
                    position: {
                      x: this.pos.x - 2,
                      y: this.pos.y - 1
                    }
                  })
                  break;
                }
              }
            }
            if (test) {
              moves.push({
                action: "move",
                position: {
                  x: this.pos.x - 2,
                  y: this.pos.y - 1
                }
              })
            }
          }
          return moves
          break;
        case "king":
          moves = []
          if (this.validmove(this.pos.x, this.pos.y + 1)) {
            let test = true;
            for (var i = 0; i < B_pices.length; i++) {
              if (B_pices[i].pos.x == this.pos.x && B_pices[i].pos.y == this.pos.y + 1) {
                test = false;
                break;
              }
            }
            if (test) {
              for (var i = 0; i < W_pices.length; i++) {
                if (W_pices[i].pos.x == this.pos.x && W_pices[i].pos.y == this.pos.y + 1) {
                  test = false;
                  moves.push({
                    action: "kill",
                    position: {
                      x: this.pos.x,
                      y: this.pos.y + 1
                    }
                  })
                  break;
                }
              }
              if (test) {
                moves.push({
                  action: "move",
                  position: {
                    x: this.pos.x,
                    y: this.pos.y + 1
                  }
                })
              }
            }
          }
          if (this.validmove(this.pos.x, this.pos.y - 1)) {
            let test = true;
            for (var i = 0; i < B_pices.length; i++) {
              if (B_pices[i].pos.x == this.pos.x && B_pices[i].pos.y == this.pos.y - 1) {
                test = false;
                break;
              }
            }
            if (test) {
              for (var i = 0; i < W_pices.length; i++) {
                if (W_pices[i].pos.x == this.pos.x && W_pices[i].pos.y == this.pos.y - 1) {
                  test = false;
                  moves.push({
                    action: "kill",
                    position: {
                      x: this.pos.x,
                      y: this.pos.y - 1
                    }
                  })
                  break;
                }
              }
              if (test) {
                moves.push({
                  action: "move",
                  position: {
                    x: this.pos.x,
                    y: this.pos.y - 1
                  }
                })
              }
            }
          }
          if (this.validmove(this.pos.x + 1, this.pos.y)) {
            let test = true;
            for (var i = 0; i < B_pices.length; i++) {
              if (B_pices[i].pos.x == this.pos.x + 1 && B_pices[i].pos.y == this.pos.y) {
                test = false;
                break;
              }
            }
            if (test) {
              for (var i = 0; i < W_pices.length; i++) {
                if (W_pices[i].pos.x == this.pos.x + 1 && W_pices[i].pos.y == this.pos.y) {
                  test = false;
                  moves.push({
                    action: "kill",
                    position: {
                      x: this.pos.x + 1,
                      y: this.pos.y
                    }
                  })
                  break;
                }
              }
              if (test) {
                moves.push({
                  action: "move",
                  position: {
                    x: this.pos.x + 1,
                    y: this.pos.y
                  }
                })
              }
            }
          }
          if (this.validmove(this.pos.x + 1, this.pos.y + 1)) {
            let test = true;
            for (var i = 0; i < B_pices.length; i++) {
              if (B_pices[i].pos.x == this.pos.x + 1 && B_pices[i].pos.y == this.pos.y + 1) {
                test = false;
                break;
              }
            }
            if (test) {
              for (var i = 0; i < W_pices.length; i++) {
                if (W_pices[i].pos.x == this.pos.x + 1 && W_pices[i].pos.y == this.pos.y + 1) {
                  test = false;
                  moves.push({
                    action: "kill",
                    position: {
                      x: this.pos.x + 1,
                      y: this.pos.y + 1
                    }
                  })
                  break;
                }
              }
              if (test) {
                moves.push({
                  action: "move",
                  position: {
                    x: this.pos.x + 1,
                    y: this.pos.y + 1
                  }
                })
              }
            }
          }
          if (this.validmove(this.pos.x + 1, this.pos.y - 1)) {
            let test = true;
            for (var i = 0; i < B_pices.length; i++) {
              if (B_pices[i].pos.x == this.pos.x + 1 && B_pices[i].pos.y == this.pos.y - 1) {
                test = false;
                break;
              }
            }
            if (test) {
              for (var i = 0; i < W_pices.length; i++) {
                if (W_pices[i].pos.x == this.pos.x + 1 && W_pices[i].pos.y == this.pos.y - 1) {
                  test = false;
                  moves.push({
                    action: "kill",
                    position: {
                      x: this.pos.x + 1,
                      y: this.pos.y - 1
                    }
                  })
                  break;
                }
              }
              if (test) {
                moves.push({
                  action: "move",
                  position: {
                    x: this.pos.x + 1,
                    y: this.pos.y - 1
                  }
                })
              }
            }
          }
          if (this.validmove(this.pos.x - 1, this.pos.y)) {
            let test = true;
            for (var i = 0; i < B_pices.length; i++) {
              if (B_pices[i].pos.x == this.pos.x - 1 && B_pices[i].pos.y == this.pos.y) {
                test = false;
                break;
              }
            }
            if (test) {
              for (var i = 0; i < W_pices.length; i++) {
                if (W_pices[i].pos.x == this.pos.x - 1 && W_pices[i].pos.y == this.pos.y) {
                  test = false;
                  moves.push({
                    action: "kill",
                    position: {
                      x: this.pos.x - 1,
                      y: this.pos.y
                    }
                  })
                  break;
                }
              }
              if (test) {
                moves.push({
                  action: "move",
                  position: {
                    x: this.pos.x - 1,
                    y: this.pos.y
                  }
                })
              }
            }
          }
          if (this.validmove(this.pos.x - 1, this.pos.y + 1)) {
            let test = true;
            for (var i = 0; i < B_pices.length; i++) {
              if (B_pices[i].pos.x == this.pos.x - 1 && B_pices[i].pos.y == this.pos.y + 1) {
                test = false;
                break;
              }
            }
            if (test) {
              for (var i = 0; i < W_pices.length; i++) {
                if (W_pices[i].pos.x == this.pos.x - 1 && W_pices[i].pos.y == this.pos.y + 1) {
                  test = false;
                  moves.push({
                    action: "kill",
                    position: {
                      x: this.pos.x - 1,
                      y: this.pos.y + 1
                    }
                  })
                  break;
                }
              }
              if (test) {
                moves.push({
                  action: "move",
                  position: {
                    x: this.pos.x - 1,
                    y: this.pos.y + 1
                  }
                })
              }
            }
          }
          if (this.validmove(this.pos.x - 1, this.pos.y - 1)) {
            let test = true;
            for (var i = 0; i < B_pices.length; i++) {
              if (B_pices[i].pos.x == this.pos.x - 1 && B_pices[i].pos.y == this.pos.y - 1) {
                test = false;
                break;
              }
            }
            if (test) {
              for (var i = 0; i < W_pices.length; i++) {
                if (W_pices[i].pos.x == this.pos.x - 1 && W_pices[i].pos.y == this.pos.y - 1) {
                  test = false;
                  moves.push({
                    action: "kill",
                    position: {
                      x: this.pos.x - 1,
                      y: this.pos.y - 1
                    }
                  })
                  break;
                }
              }
              if (test) {
                moves.push({
                  action: "move",
                  position: {
                    x: this.pos.x - 1,
                    y: this.pos.y - 1
                  }
                })
              }
            }
          }
          return moves
          break;
        case "bishop":
          moves = []

          var x = this.pos.x + 1,
            y = this.pos.y + 1
          while (true) {
            if (this.validmove(x, y)) {
              let test = true;
              for (var i = 0; i < B_pices.length; i++) {
                if (B_pices[i].pos.x == x && B_pices[i].pos.y == y) {
                  test = false;
                  break;
                }
              }
              if (test) {
                for (var i = 0; i < W_pices.length; i++) {
                  if (W_pices[i].pos.x == x && W_pices[i].pos.y == y) {
                    test = false;
                    moves.push({
                      action: "kill",
                      position: {
                        x,
                        y
                      }
                    })
                    break;
                  }
                }
              }
              if (test) {
                moves.push({
                  action: "move",
                  position: {
                    x,
                    y
                  }
                })
              } else {
                break;
              }
            } else {
              break;
            }
            x++;
            y++;
          }
          x = this.pos.x - 1,
            y = this.pos.y - 1
          while (true) {
            if (this.validmove(x, y)) {
              let test = true;
              for (var i = 0; i < B_pices.length; i++) {
                if (B_pices[i].pos.x == x && B_pices[i].pos.y == y) {
                  test = false;
                  break;
                }
              }
              if (test) {
                for (var i = 0; i < W_pices.length; i++) {
                  if (W_pices[i].pos.x == x && W_pices[i].pos.y == y) {
                    test = false;
                    moves.push({
                      action: "kill",
                      position: {
                        x,
                        y
                      }
                    })
                    break;
                  }
                }
              }
              if (test) {
                moves.push({
                  action: "move",
                  position: {
                    x,
                    y
                  }
                })
              } else {
                break;
              }
            } else {
              break;
            }
            x--;
            y--;
          }
          x = this.pos.x - 1,
            y = this.pos.y + 1
          while (true) {
            if (this.validmove(x, y)) {
              let test = true;
              for (var i = 0; i < B_pices.length; i++) {
                if (B_pices[i].pos.x == x && B_pices[i].pos.y == y) {
                  test = false;
                  break;
                }
              }
              if (test) {
                for (var i = 0; i < W_pices.length; i++) {
                  if (W_pices[i].pos.x == x && W_pices[i].pos.y == y) {
                    test = false;
                    moves.push({
                      action: "kill",
                      position: {
                        x,
                        y
                      }
                    })
                    break;
                  }
                }
              }
              if (test) {
                moves.push({
                  action: "move",
                  position: {
                    x,
                    y
                  }
                })
              } else {
                break;
              }
            } else {
              break;
            }
            x--;
            y++;
          }
          x = this.pos.x + 1,
            y = this.pos.y - 1
          while (true) {
            if (this.validmove(x, y)) {
              let test = true;
              for (var i = 0; i < B_pices.length; i++) {
                if (B_pices[i].pos.x == x && B_pices[i].pos.y == y) {
                  test = false;
                  break;
                }
              }
              if (test) {
                for (var i = 0; i < W_pices.length; i++) {
                  if (W_pices[i].pos.x == x && W_pices[i].pos.y == y) {
                    test = false;
                    moves.push({
                      action: "kill",
                      position: {
                        x,
                        y
                      }
                    })
                    break;
                  }
                }
              }
              if (test) {
                moves.push({
                  action: "move",
                  position: {
                    x,
                    y
                  }
                })
              } else {
                break;
              }
            } else {
              break;
            }
            x++;
            y--;
          }
          return moves;
          break;
        case "rook":
          moves = []

          x = this.pos.x + 1,
            y = this.pos.y
          while (true) {
            if (this.validmove(x, y)) {
              let test = true;
              for (var i = 0; i < B_pices.length; i++) {
                if (B_pices[i].pos.x == x && B_pices[i].pos.y == y) {
                  test = false;
                  break;
                }
              }
              if (test) {
                for (var i = 0; i < W_pices.length; i++) {
                  if (W_pices[i].pos.x == x && W_pices[i].pos.y == y) {
                    test = false;
                    moves.push({
                      action: "kill",
                      position: {
                        x,
                        y
                      }
                    })
                    break;
                  }
                }
              }
              if (test) {
                moves.push({
                  action: "move",
                  position: {
                    x,
                    y
                  }
                })
              } else {
                break;
              }
            } else {
              break;
            }
            x++;
          }
          x = this.pos.x - 1,
            y = this.pos.y
          while (true) {
            if (this.validmove(x, y)) {
              let test = true;
              for (var i = 0; i < B_pices.length; i++) {
                if (B_pices[i].pos.x == x && B_pices[i].pos.y == y) {
                  test = false;
                  break;
                }
              }
              if (test) {
                for (var i = 0; i < W_pices.length; i++) {
                  if (W_pices[i].pos.x == x && W_pices[i].pos.y == y) {
                    test = false;
                    moves.push({
                      action: "kill",
                      position: {
                        x,
                        y
                      }
                    })
                    break;
                  }
                }
              }
              if (test) {
                moves.push({
                  action: "move",
                  position: {
                    x,
                    y
                  }
                })
              } else {
                break;
              }
            } else {
              break;
            }
            x--;
          }
          x = this.pos.x,
            y = this.pos.y + 1
          while (true) {
            if (this.validmove(x, y)) {
              let test = true;
              for (var i = 0; i < B_pices.length; i++) {
                if (B_pices[i].pos.x == x && B_pices[i].pos.y == y) {
                  test = false;
                  break;
                }
              }
              if (test) {
                for (var i = 0; i < W_pices.length; i++) {
                  if (W_pices[i].pos.x == x && W_pices[i].pos.y == y) {
                    test = false;
                    moves.push({
                      action: "kill",
                      position: {
                        x,
                        y
                      }
                    })
                    break;
                  }
                }
              }
              if (test) {
                moves.push({
                  action: "move",
                  position: {
                    x,
                    y
                  }
                })
              } else {
                break;
              }
            } else {
              break;
            }
            y++;
          }
          x = this.pos.x,
            y = this.pos.y - 1
          while (true) {
            if (this.validmove(x, y)) {
              let test = true;
              for (var i = 0; i < B_pices.length; i++) {
                if (B_pices[i].pos.x == x && B_pices[i].pos.y == y) {
                  test = false;
                  break;
                }
              }
              if (test) {
                for (var i = 0; i < W_pices.length; i++) {
                  if (W_pices[i].pos.x == x && W_pices[i].pos.y == y) {
                    test = false;
                    moves.push({
                      action: "kill",
                      position: {
                        x,
                        y
                      }
                    })
                    break;
                  }
                }
              }
              if (test) {
                moves.push({
                  action: "move",
                  position: {
                    x,
                    y
                  }
                })
              } else {
                break;
              }
            } else {
              break;
            }
            y--;
          }
          return moves;
          break;
        case "queen":
          moves = []

          x = this.pos.x + 1,
            y = this.pos.y
          while (true) {
            if (this.validmove(x, y)) {
              let test = true;
              for (var i = 0; i < B_pices.length; i++) {
                if (B_pices[i].pos.x == x && B_pices[i].pos.y == y) {
                  test = false;
                  break;
                }
              }
              if (test) {
                for (var i = 0; i < W_pices.length; i++) {
                  if (W_pices[i].pos.x == x && W_pices[i].pos.y == y) {
                    test = false;
                    moves.push({
                      action: "kill",
                      position: {
                        x,
                        y
                      }
                    })
                    break;
                  }
                }
              }
              if (test) {
                moves.push({
                  action: "move",
                  position: {
                    x,
                    y
                  }
                })
              } else {
                break;
              }
            } else {
              break;
            }

            x++;
          }
          x = this.pos.x - 1,
            y = this.pos.y
          while (true) {
            if (this.validmove(x, y)) {
              let test = true;
              for (var i = 0; i < B_pices.length; i++) {
                if (B_pices[i].pos.x == x && B_pices[i].pos.y == y) {
                  test = false;
                  break;
                }
              }
              if (test) {
                for (var i = 0; i < W_pices.length; i++) {
                  if (W_pices[i].pos.x == x && W_pices[i].pos.y == y) {
                    test = false;
                    moves.push({
                      action: "kill",
                      position: {
                        x,
                        y
                      }
                    })
                    break;
                  }
                }
              }
              if (test) {
                moves.push({
                  action: "move",
                  position: {
                    x,
                    y
                  }
                })
              } else {
                break;
              }
            } else {
              break;
            }
            x--;
          }
          x = this.pos.x,
            y = this.pos.y + 1
          while (true) {
            if (this.validmove(x, y)) {
              let test = true;
              for (var i = 0; i < B_pices.length; i++) {
                if (B_pices[i].pos.x == x && B_pices[i].pos.y == y) {
                  test = false;
                  break;
                }
              }
              if (test) {
                for (var i = 0; i < W_pices.length; i++) {
                  if (W_pices[i].pos.x == x && W_pices[i].pos.y == y) {
                    test = false;
                    moves.push({
                      action: "kill",
                      position: {
                        x,
                        y
                      }
                    })
                    break;
                  }
                }
              }
              if (test) {
                moves.push({
                  action: "move",
                  position: {
                    x,
                    y
                  }
                })
              } else {
                break;
              }
            } else {
              break;
            }
            y++;
          }
          x = this.pos.x,
            y = this.pos.y - 1
          while (true) {
            if (this.validmove(x, y)) {
              let test = true;
              for (var i = 0; i < B_pices.length; i++) {
                if (B_pices[i].pos.x == x && B_pices[i].pos.y == y) {
                  test = false;
                  break;
                }
              }
              if (test) {
                for (var i = 0; i < W_pices.length; i++) {
                  if (W_pices[i].pos.x == x && W_pices[i].pos.y == y) {
                    test = false;
                    moves.push({
                      action: "kill",
                      position: {
                        x,
                        y
                      }
                    })
                    break;
                  }
                }
              }
              if (test) {
                moves.push({
                  action: "move",
                  position: {
                    x,
                    y
                  }
                })
              } else {
                break;
              }
            } else {
              break;
            }
            y--;
          }
          x = this.pos.x + 1,
            y = this.pos.y + 1
          while (true) {
            if (this.validmove(x, y)) {
              let test = true;
              for (var i = 0; i < B_pices.length; i++) {
                if (B_pices[i].pos.x == x && B_pices[i].pos.y == y) {
                  test = false;
                  break;
                }
              }
              if (test) {
                for (var i = 0; i < W_pices.length; i++) {
                  if (W_pices[i].pos.x == x && W_pices[i].pos.y == y) {
                    test = false;
                    moves.push({
                      action: "kill",
                      position: {
                        x,
                        y
                      }
                    })
                    break;
                  }
                }
              }
              if (test) {
                moves.push({
                  action: "move",
                  position: {
                    x,
                    y
                  }
                })
              } else {
                break;
              }
            } else {
              break;
            }
            x++;
            y++;
          }
          x = this.pos.x - 1,
            y = this.pos.y - 1
          while (true) {
            if (this.validmove(x, y)) {
              let test = true;
              for (var i = 0; i < B_pices.length; i++) {
                if (B_pices[i].pos.x == x && B_pices[i].pos.y == y) {
                  test = false;
                  break;
                }
              }
              if (test) {
                for (var i = 0; i < W_pices.length; i++) {
                  if (W_pices[i].pos.x == x && W_pices[i].pos.y == y) {
                    test = false;
                    moves.push({
                      action: "kill",
                      position: {
                        x,
                        y
                      }
                    })
                    break;
                  }
                }
              }
              if (test) {
                moves.push({
                  action: "move",
                  position: {
                    x,
                    y
                  }
                })
              } else {
                break;
              }
            } else {
              break;
            }
            x--;
            y--;
          }
          x = this.pos.x - 1,
            y = this.pos.y + 1
          while (true) {
            if (this.validmove(x, y)) {
              let test = true;
              for (var i = 0; i < B_pices.length; i++) {
                if (B_pices[i].pos.x == x && B_pices[i].pos.y == y) {
                  test = false;
                  break;
                }
              }
              if (test) {
                for (var i = 0; i < W_pices.length; i++) {
                  if (W_pices[i].pos.x == x && W_pices[i].pos.y == y) {
                    test = false;
                    moves.push({
                      action: "kill",
                      position: {
                        x,
                        y
                      }
                    })
                    break;
                  }
                }
              }
              if (test) {
                moves.push({
                  action: "move",
                  position: {
                    x,
                    y
                  }
                })
              } else {
                break;
              }
            } else {
              break;
            }
            x--;
            y++;
          }
          x = this.pos.x + 1,
            y = this.pos.y - 1
          while (true) {
            if (this.validmove(x, y)) {
              let test = true;
              for (var i = 0; i < B_pices.length; i++) {
                if (B_pices[i].pos.x == x && B_pices[i].pos.y == y) {
                  test = false;
                  break;
                }
              }
              if (test) {
                for (var i = 0; i < W_pices.length; i++) {
                  if (W_pices[i].pos.x == x && W_pices[i].pos.y == y) {
                    test = false;
                    moves.push({
                      action: "kill",
                      position: {
                        x,
                        y
                      }
                    })
                    break;
                  }
                }
              }
              if (test) {
                moves.push({
                  action: "move",
                  position: {
                    x,
                    y
                  }
                })
              } else {
                break;
              }
            } else {
              break;
            }
            x++;
            y--;
          }
          return moves;
          break;
      } //switch
    } else {
      switch (this.name) {
        case "sold":
          var moves = [];
          if (this.validmove(this.pos.x, this.pos.y - 1)) {
            let test = true;
            for (var i = 0; i < W_pices.length; i++) {
              if (W_pices[i].pos.x == this.pos.x && W_pices[i].pos.y == this.pos.y - 1) {
                test = false;
                break;
              }
            }
            for (var i = 0; i < B_pices.length; i++) {
              if (B_pices[i].pos.x == this.pos.x && B_pices[i].pos.y == this.pos.y - 1) {
                test = false;
                break;
              }
            }
            if (test) {
              moves.push({
                action: "move",
                position: {
                  x: this.pos.x,
                  y: this.pos.y - 1
                }
              })
              if (this.validmove(this.pos.x, this.pos.y - 2) && this.pos.y == 6) {
                let test = true;
                for (var i = 0; i < W_pices.length; i++) {
                  if (W_pices[i].pos.x == this.pos.x && W_pices[i].pos.y == this.pos.y - 2) {
                    test = false;
                    break;
                  }
                }
                for (var i = 0; i < B_pices.length; i++) {
                  if (B_pices[i].pos.x == this.pos.x && B_pices[i].pos.y == this.pos.y - 2) {
                    test = false;
                    break;
                  }
                }
                if (test) {
                  moves.push({
                    action: "move",
                    position: {
                      x: this.pos.x,
                      y: this.pos.y - 2
                    }
                  })
                }
              }
            }
          }
          if (this.validmove(this.pos.x + 1, this.pos.y - 1)) {
            let test = true;
            for (var i = 0; i < W_pices.length; i++) {
              if (W_pices[i].pos.x == this.pos.x + 1 && W_pices[i].pos.y == this.pos.y - 1) {
                test = false;
                break;
              }
            }
            if (test) {
              for (var i = 0; i < B_pices.length; i++) {
                if (B_pices[i].pos.x == this.pos.x + 1 && B_pices[i].pos.y == this.pos.y - 1) {
                  test = false;
                  moves.push({
                    action: "kill",
                    position: {
                      x: this.pos.x + 1,
                      y: this.pos.y - 1
                    }
                  })
                  break;
                }
              }
            }
          }
          if (this.validmove(this.pos.x - 1, this.pos.y - 1)) {
            let test = true;
            for (var i = 0; i < W_pices.length; i++) {
              if (W_pices[i].pos.x == this.pos.x - 1 && W_pices[i].pos.y == this.pos.y - 1) {
                test = false;
                break;
              }
            }
            if (test) {
              for (var i = 0; i < B_pices.length; i++) {
                if (B_pices[i].pos.x == this.pos.x - 1 && B_pices[i].pos.y == this.pos.y - 1) {
                  test = false;
                  moves.push({
                    action: "kill",
                    position: {
                      x: this.pos.x - 1,
                      y: this.pos.y - 1
                    }
                  })
                  break;
                }
              }
            }
          }
          return moves;
          break;

        case "knight":
          moves = []
          if (this.validmove(this.pos.x + 1, this.pos.y + 2)) {
            let test = true;
            for (var i = 0; i < W_pices.length; i++) {
              if (W_pices[i].pos.x == this.pos.x + 1 && W_pices[i].pos.y == this.pos.y + 2) {
                test = false;
                break;
              }
            }
            if (test) {
              for (var i = 0; i < B_pices.length; i++) {
                if (B_pices[i].pos.x == this.pos.x + 1 && B_pices[i].pos.y == this.pos.y + 2) {
                  test = false;
                  moves.push({
                    action: "kill",
                    position: {
                      x: this.pos.x + 1,
                      y: this.pos.y + 2
                    }
                  })
                  break;
                }
              }
            }
            if (test) {
              moves.push({
                action: "move",
                position: {
                  x: this.pos.x + 1,
                  y: this.pos.y + 2
                }
              })
            }
          }
          if (this.validmove(this.pos.x - 1, this.pos.y + 2)) {
            let test = true;
            for (var i = 0; i < W_pices.length; i++) {
              if (W_pices[i].pos.x == this.pos.x - 1 && W_pices[i].pos.y == this.pos.y + 2) {
                test = false;
                break;
              }
            }
            if (test) {
              for (var i = 0; i < B_pices.length; i++) {
                if (B_pices[i].pos.x == this.pos.x - 1 && B_pices[i].pos.y == this.pos.y + 2) {
                  test = false;
                  moves.push({
                    action: "kill",
                    position: {
                      x: this.pos.x - 1,
                      y: this.pos.y + 2
                    }
                  })
                  break;
                }
              }
            }
            if (test) {
              moves.push({
                action: "move",
                position: {
                  x: this.pos.x - 1,
                  y: this.pos.y + 2
                }
              })
            }
          }
          if (this.validmove(this.pos.x + 1, this.pos.y - 2)) {
            let test = true;
            for (var i = 0; i < W_pices.length; i++) {
              if (W_pices[i].pos.x == this.pos.x + 1 && W_pices[i].pos.y == this.pos.y - 2) {
                test = false;
                break;
              }
            }
            if (test) {
              for (var i = 0; i < B_pices.length; i++) {
                if (B_pices[i].pos.x == this.pos.x + 1 && B_pices[i].pos.y == this.pos.y - 2) {
                  test = false;
                  moves.push({
                    action: "kill",
                    position: {
                      x: this.pos.x + 1,
                      y: this.pos.y - 2
                    }
                  })
                  break;
                }
              }
            }
            if (test) {
              moves.push({
                action: "move",
                position: {
                  x: this.pos.x + 1,
                  y: this.pos.y - 2
                }
              })
            }
          }
          if (this.validmove(this.pos.x - 1, this.pos.y - 2)) {
            let test = true;
            for (var i = 0; i < W_pices.length; i++) {
              if (W_pices[i].pos.x == this.pos.x - 1 && W_pices[i].pos.y == this.pos.y - 2) {
                test = false;
                break;
              }
            }
            if (test) {
              for (var i = 0; i < B_pices.length; i++) {
                if (B_pices[i].pos.x == this.pos.x - 1 && B_pices[i].pos.y == this.pos.y - 2) {
                  test = false;
                  moves.push({
                    action: "kill",
                    position: {
                      x: this.pos.x - 1,
                      y: this.pos.y - 2
                    }
                  })
                  break;
                }
              }
            }
            if (test) {
              moves.push({
                action: "move",
                position: {
                  x: this.pos.x - 1,
                  y: this.pos.y - 2
                }
              })
            }
          }
          if (this.validmove(this.pos.x + 2, this.pos.y + 1)) {
            let test = true;
            for (var i = 0; i < W_pices.length; i++) {
              if (W_pices[i].pos.x == this.pos.x + 2 && W_pices[i].pos.y == this.pos.y + 1) {
                test = false;
                break;
              }
            }
            if (test) {
              for (var i = 0; i < B_pices.length; i++) {
                if (B_pices[i].pos.x == this.pos.x + 2 && B_pices[i].pos.y == this.pos.y + 1) {
                  test = false;
                  moves.push({
                    action: "kill",
                    position: {
                      x: this.pos.x + 2,
                      y: this.pos.y + 1
                    }
                  })
                  break;
                }
              }
            }
            if (test) {
              moves.push({
                action: "move",
                position: {
                  x: this.pos.x + 2,
                  y: this.pos.y + 1
                }
              })
            }
          }
          if (this.validmove(this.pos.x - 2, this.pos.y + 1)) {
            let test = true;
            for (var i = 0; i < W_pices.length; i++) {
              if (W_pices[i].pos.x == this.pos.x - 2 && W_pices[i].pos.y == this.pos.y + 1) {
                test = false;
                break;
              }
            }
            if (test) {
              for (var i = 0; i < B_pices.length; i++) {
                if (B_pices[i].pos.x == this.pos.x - 2 && B_pices[i].pos.y == this.pos.y + 1) {
                  test = false;
                  moves.push({
                    action: "kill",
                    position: {
                      x: this.pos.x - 2,
                      y: this.pos.y + 1
                    }
                  })
                  break;
                }
              }
            }
            if (test) {
              moves.push({
                action: "move",
                position: {
                  x: this.pos.x - 2,
                  y: this.pos.y + 1
                }
              })
            }
          }
          if (this.validmove(this.pos.x + 2, this.pos.y - 1)) {
            let test = true;
            for (var i = 0; i < W_pices.length; i++) {
              if (W_pices[i].pos.x == this.pos.x + 2 && W_pices[i].pos.y == this.pos.y - 1) {
                test = false;
                break;
              }
            }
            if (test) {
              for (var i = 0; i < B_pices.length; i++) {
                if (B_pices[i].pos.x == this.pos.x + 2 && B_pices[i].pos.y == this.pos.y - 1) {
                  test = false;
                  moves.push({
                    action: "kill",
                    position: {
                      x: this.pos.x + 2,
                      y: this.pos.y - 1
                    }
                  })
                  break;
                }
              }
            }
            if (test) {
              moves.push({
                action: "move",
                position: {
                  x: this.pos.x + 2,
                  y: this.pos.y - 1
                }
              })
            }
          }
          if (this.validmove(this.pos.x - 2, this.pos.y - 1)) {
            let test = true;
            for (var i = 0; i < W_pices.length; i++) {
              if (W_pices[i].pos.x == this.pos.x - 2 && W_pices[i].pos.y == this.pos.y - 1) {
                test = false;
                break;
              }
            }
            if (test) {
              for (var i = 0; i < B_pices.length; i++) {
                if (B_pices[i].pos.x == this.pos.x - 2 && B_pices[i].pos.y == this.pos.y - 1) {
                  test = false;
                  moves.push({
                    action: "kill",
                    position: {
                      x: this.pos.x - 2,
                      y: this.pos.y - 1
                    }
                  })
                  break;
                }
              }
            }
            if (test) {
              moves.push({
                action: "move",
                position: {
                  x: this.pos.x - 2,
                  y: this.pos.y - 1
                }
              })
            }
          }
          return moves
          break;
        case "king":
          moves = []
          if (this.validmove(this.pos.x, this.pos.y + 1)) {
            let test = true;
            for (var i = 0; i < W_pices.length; i++) {
              if (W_pices[i].pos.x == this.pos.x && W_pices[i].pos.y == this.pos.y + 1) {
                test = false;
                break;
              }
            }
            if (test) {
              for (var i = 0; i < B_pices.length; i++) {
                if (B_pices[i].pos.x == this.pos.x && B_pices[i].pos.y == this.pos.y + 1) {
                  test = false;
                  moves.push({
                    action: "kill",
                    position: {
                      x: this.pos.x,
                      y: this.pos.y + 1
                    }
                  })
                  break;
                }
              }
              if (test) {
                moves.push({
                  action: "move",
                  position: {
                    x: this.pos.x,
                    y: this.pos.y + 1
                  }
                })
              }
            }
          }
          if (this.validmove(this.pos.x, this.pos.y - 1)) {
            let test = true;
            for (var i = 0; i < W_pices.length; i++) {
              if (W_pices[i].pos.x == this.pos.x && W_pices[i].pos.y == this.pos.y - 1) {
                test = false;
                break;
              }
            }
            if (test) {
              for (var i = 0; i < B_pices.length; i++) {
                if (B_pices[i].pos.x == this.pos.x && B_pices[i].pos.y == this.pos.y - 1) {
                  test = false;
                  moves.push({
                    action: "kill",
                    position: {
                      x: this.pos.x,
                      y: this.pos.y - 1
                    }
                  })
                  break;
                }
              }
              if (test) {
                moves.push({
                  action: "move",
                  position: {
                    x: this.pos.x,
                    y: this.pos.y - 1
                  }
                })
              }
            }
          }
          if (this.validmove(this.pos.x + 1, this.pos.y)) {
            let test = true;
            for (var i = 0; i < W_pices.length; i++) {
              if (W_pices[i].pos.x == this.pos.x + 1 && W_pices[i].pos.y == this.pos.y) {
                test = false;
                break;
              }
            }
            if (test) {
              for (var i = 0; i < B_pices.length; i++) {
                if (B_pices[i].pos.x == this.pos.x + 1 && B_pices[i].pos.y == this.pos.y) {
                  test = false;
                  moves.push({
                    action: "kill",
                    position: {
                      x: this.pos.x + 1,
                      y: this.pos.y
                    }
                  })
                  break;
                }
              }
              if (test) {
                moves.push({
                  action: "move",
                  position: {
                    x: this.pos.x + 1,
                    y: this.pos.y
                  }
                })
              }
            }
          }
          if (this.validmove(this.pos.x + 1, this.pos.y + 1)) {
            let test = true;
            for (var i = 0; i < W_pices.length; i++) {
              if (W_pices[i].pos.x == this.pos.x + 1 && W_pices[i].pos.y == this.pos.y + 1) {
                test = false;
                break;
              }
            }
            if (test) {
              for (var i = 0; i < B_pices.length; i++) {
                if (B_pices[i].pos.x == this.pos.x + 1 && B_pices[i].pos.y == this.pos.y + 1) {
                  test = false;
                  moves.push({
                    action: "kill",
                    position: {
                      x: this.pos.x + 1,
                      y: this.pos.y + 1
                    }
                  })
                  break;
                }
              }
              if (test) {
                moves.push({
                  action: "move",
                  position: {
                    x: this.pos.x + 1,
                    y: this.pos.y + 1
                  }
                })
              }
            }
          }
          if (this.validmove(this.pos.x + 1, this.pos.y - 1)) {
            let test = true;
            for (var i = 0; i < W_pices.length; i++) {
              if (W_pices[i].pos.x == this.pos.x + 1 && W_pices[i].pos.y == this.pos.y - 1) {
                test = false;
                break;
              }
            }
            if (test) {
              for (var i = 0; i < B_pices.length; i++) {
                if (B_pices[i].pos.x == this.pos.x + 1 && B_pices[i].pos.y == this.pos.y - 1) {
                  test = false;
                  moves.push({
                    action: "kill",
                    position: {
                      x: this.pos.x + 1,
                      y: this.pos.y - 1
                    }
                  })
                  break;
                }
              }
              if (test) {
                moves.push({
                  action: "move",
                  position: {
                    x: this.pos.x + 1,
                    y: this.pos.y - 1
                  }
                })
              }
            }
          }
          if (this.validmove(this.pos.x - 1, this.pos.y)) {
            let test = true;
            for (var i = 0; i < W_pices.length; i++) {
              if (W_pices[i].pos.x == this.pos.x - 1 && W_pices[i].pos.y == this.pos.y) {
                test = false;
                break;
              }
            }
            if (test) {
              for (var i = 0; i < B_pices.length; i++) {
                if (B_pices[i].pos.x == this.pos.x - 1 && B_pices[i].pos.y == this.pos.y) {
                  test = false;
                  moves.push({
                    action: "kill",
                    position: {
                      x: this.pos.x - 1,
                      y: this.pos.y
                    }
                  })
                  break;
                }
              }
              if (test) {
                moves.push({
                  action: "move",
                  position: {
                    x: this.pos.x - 1,
                    y: this.pos.y
                  }
                })
              }
            }
          }
          if (this.validmove(this.pos.x - 1, this.pos.y + 1)) {
            let test = true;
            for (var i = 0; i < W_pices.length; i++) {
              if (W_pices[i].pos.x == this.pos.x - 1 && W_pices[i].pos.y == this.pos.y + 1) {
                test = false;
                break;
              }
            }
            if (test) {
              for (var i = 0; i < B_pices.length; i++) {
                if (B_pices[i].pos.x == this.pos.x - 1 && B_pices[i].pos.y == this.pos.y + 1) {
                  test = false;
                  moves.push({
                    action: "kill",
                    position: {
                      x: this.pos.x - 1,
                      y: this.pos.y + 1
                    }
                  })
                  break;
                }
              }
              if (test) {
                moves.push({
                  action: "move",
                  position: {
                    x: this.pos.x - 1,
                    y: this.pos.y + 1
                  }
                })
              }
            }
          }
          if (this.validmove(this.pos.x - 1, this.pos.y - 1)) {
            let test = true;
            for (var i = 0; i < W_pices.length; i++) {
              if (W_pices[i].pos.x == this.pos.x - 1 && W_pices[i].pos.y == this.pos.y - 1) {
                test = false;
                break;
              }
            }
            if (test) {
              for (var i = 0; i < B_pices.length; i++) {
                if (B_pices[i].pos.x == this.pos.x - 1 && B_pices[i].pos.y == this.pos.y - 1) {
                  test = false;
                  moves.push({
                    action: "kill",
                    position: {
                      x: this.pos.x - 1,
                      y: this.pos.y - 1
                    }
                  })
                  break;
                }
              }
              if (test) {
                moves.push({
                  action: "move",
                  position: {
                    x: this.pos.x - 1,
                    y: this.pos.y - 1
                  }
                })
              }
            }
          }
          return moves
          break;
        case "bishop":
          moves = []

          var x = this.pos.x + 1,
            y = this.pos.y + 1
          while (true) {
            if (this.validmove(x, y)) {
              let test = true;
              for (var i = 0; i < W_pices.length; i++) {
                if (W_pices[i].pos.x == x && W_pices[i].pos.y == y) {
                  test = false;
                  break;
                }
              }
              if (test) {
                for (var i = 0; i < B_pices.length; i++) {
                  if (B_pices[i].pos.x == x && B_pices[i].pos.y == y) {
                    test = false;
                    moves.push({
                      action: "kill",
                      position: {
                        x,
                        y
                      }
                    })
                    break;
                  }
                }
              }
              if (test) {
                moves.push({
                  action: "move",
                  position: {
                    x,
                    y
                  }
                })
              } else {
                break;
              }
            } else {
              break;
            }
            x++;
            y++;
          }
          x = this.pos.x - 1,
            y = this.pos.y - 1
          while (true) {
            if (this.validmove(x, y)) {
              let test = true;
              for (var i = 0; i < W_pices.length; i++) {
                if (W_pices[i].pos.x == x && W_pices[i].pos.y == y) {
                  test = false;
                  break;
                }
              }
              if (test) {
                for (var i = 0; i < B_pices.length; i++) {
                  if (B_pices[i].pos.x == x && B_pices[i].pos.y == y) {
                    test = false;
                    moves.push({
                      action: "kill",
                      position: {
                        x,
                        y
                      }
                    })
                    break;
                  }
                }
              }
              if (test) {
                moves.push({
                  action: "move",
                  position: {
                    x,
                    y
                  }
                })
              } else {
                break;
              }
            } else {
              break;
            }
            x--;
            y--;
          }
          x = this.pos.x - 1,
            y = this.pos.y + 1
          while (true) {
            if (this.validmove(x, y)) {
              let test = true;
              for (var i = 0; i < W_pices.length; i++) {
                if (W_pices[i].pos.x == x && W_pices[i].pos.y == y) {
                  test = false;
                  break;
                }
              }
              if (test) {
                for (var i = 0; i < B_pices.length; i++) {
                  if (B_pices[i].pos.x == x && B_pices[i].pos.y == y) {
                    test = false;
                    moves.push({
                      action: "kill",
                      position: {
                        x,
                        y
                      }
                    })
                    break;
                  }
                }
              }
              if (test) {
                moves.push({
                  action: "move",
                  position: {
                    x,
                    y
                  }
                })
              } else {
                break;
              }
            } else {
              break;
            }
            x--;
            y++;
          }
          x = this.pos.x + 1,
            y = this.pos.y - 1
          while (true) {
            if (this.validmove(x, y)) {
              let test = true;
              for (var i = 0; i < W_pices.length; i++) {
                if (W_pices[i].pos.x == x && W_pices[i].pos.y == y) {
                  test = false;
                  break;
                }
              }
              if (test) {
                for (var i = 0; i < B_pices.length; i++) {
                  if (B_pices[i].pos.x == x && B_pices[i].pos.y == y) {
                    test = false;
                    moves.push({
                      action: "kill",
                      position: {
                        x,
                        y
                      }
                    })
                    break;
                  }
                }
              }
              if (test) {
                moves.push({
                  action: "move",
                  position: {
                    x,
                    y
                  }
                })
              } else {
                break;
              }
            } else {
              break;
            }
            x++;
            y--;
          }
          return moves;
          break;
        case "rook":
          moves = []

          x = this.pos.x + 1,
            y = this.pos.y
          while (true) {
            if (this.validmove(x, y)) {
              let test = true;
              for (var i = 0; i < W_pices.length; i++) {
                if (W_pices[i].pos.x == x && W_pices[i].pos.y == y) {
                  test = false;
                  break;
                }
              }
              if (test) {
                for (var i = 0; i < B_pices.length; i++) {
                  if (B_pices[i].pos.x == x && B_pices[i].pos.y == y) {
                    test = false;
                    moves.push({
                      action: "kill",
                      position: {
                        x,
                        y
                      }
                    })
                    break;
                  }
                }
              }
              if (test) {
                moves.push({
                  action: "move",
                  position: {
                    x,
                    y
                  }
                })
              } else {
                break;
              }
            } else {
              break;
            }
            x++;
          }
          x = this.pos.x - 1,
            y = this.pos.y
          while (true) {
            if (this.validmove(x, y)) {
              let test = true;
              for (var i = 0; i < W_pices.length; i++) {
                if (W_pices[i].pos.x == x && W_pices[i].pos.y == y) {
                  test = false;
                  break;
                }
              }
              if (test) {
                for (var i = 0; i < B_pices.length; i++) {
                  if (B_pices[i].pos.x == x && B_pices[i].pos.y == y) {
                    test = false;
                    moves.push({
                      action: "kill",
                      position: {
                        x,
                        y
                      }
                    })
                    break;
                  }
                }
              }
              if (test) {
                moves.push({
                  action: "move",
                  position: {
                    x,
                    y
                  }
                })
              } else {
                break;
              }
            } else {
              break;
            }
            x--;
          }
          x = this.pos.x,
            y = this.pos.y + 1
          while (true) {
            if (this.validmove(x, y)) {
              let test = true;
              for (var i = 0; i < W_pices.length; i++) {
                if (W_pices[i].pos.x == x && W_pices[i].pos.y == y) {
                  test = false;
                  break;
                }
              }
              if (test) {
                for (var i = 0; i < B_pices.length; i++) {
                  if (B_pices[i].pos.x == x && B_pices[i].pos.y == y) {
                    test = false;
                    moves.push({
                      action: "kill",
                      position: {
                        x,
                        y
                      }
                    })
                    break;
                  }
                }
              }
              if (test) {
                moves.push({
                  action: "move",
                  position: {
                    x,
                    y
                  }
                })
              } else {
                break;
              }
            } else {
              break;
            }
            y++;
          }
          x = this.pos.x,
            y = this.pos.y - 1
          while (true) {
            if (this.validmove(x, y)) {
              let test = true;
              for (var i = 0; i < W_pices.length; i++) {
                if (W_pices[i].pos.x == x && W_pices[i].pos.y == y) {
                  test = false;
                  break;
                }
              }
              if (test) {
                for (var i = 0; i < B_pices.length; i++) {
                  if (B_pices[i].pos.x == x && B_pices[i].pos.y == y) {
                    test = false;
                    moves.push({
                      action: "kill",
                      position: {
                        x,
                        y
                      }
                    })
                    break;
                  }
                }
              }
              if (test) {
                moves.push({
                  action: "kill",
                  position: {
                    x,
                    y
                  }
                })
              } else {
                break;
              }
            } else {
              break;
            }
            y--;
          }
          return moves;
          break;
        case "queen":
          moves = []

          x = this.pos.x + 1,
            y = this.pos.y
          while (true) {
            if (this.validmove(x, y)) {
              let test = true;
              for (var i = 0; i < W_pices.length; i++) {
                if (W_pices[i].pos.x == x && W_pices[i].pos.y == y) {
                  test = false;
                  break;
                }
              }
              if (test) {
                for (var i = 0; i < B_pices.length; i++) {
                  if (B_pices[i].pos.x == x && B_pices[i].pos.y == y) {
                    test = false;
                    moves.push({
                      action: "kill",
                      position: {
                        x,
                        y
                      }
                    })
                    break;
                  }
                }
              }
              if (test) {
                moves.push({
                  action: "move",
                  position: {
                    x,
                    y
                  }
                })
              } else {
                break;
              }
            } else {
              break;
            }
            x++;
          }
          x = this.pos.x - 1,
            y = this.pos.y
          while (true) {
            if (this.validmove(x, y)) {
              let test = true;
              for (var i = 0; i < W_pices.length; i++) {
                if (W_pices[i].pos.x == x && W_pices[i].pos.y == y) {
                  test = false;
                  break;
                }
              }
              if (test) {
                for (var i = 0; i < B_pices.length; i++) {
                  if (B_pices[i].pos.x == x && B_pices[i].pos.y == y) {
                    test = false;
                    moves.push({
                      action: "kill",
                      position: {
                        x,
                        y
                      }
                    })
                    break;
                  }
                }
              }
              if (test) {
                moves.push({
                  action: "move",
                  position: {
                    x,
                    y
                  }
                })
              } else {
                break;
              }
            } else {
              break;
            }
            x--;
          }
          x = this.pos.x,
            y = this.pos.y + 1
          while (true) {
            if (this.validmove(x, y)) {
              let test = true;
              for (var i = 0; i < W_pices.length; i++) {
                if (W_pices[i].pos.x == x && W_pices[i].pos.y == y) {
                  test = false;
                  break;
                }
              }
              if (test) {
                for (var i = 0; i < B_pices.length; i++) {
                  if (B_pices[i].pos.x == x && B_pices[i].pos.y == y) {
                    test = false;
                    moves.push({
                      action: "kill",
                      position: {
                        x,
                        y
                      }
                    })
                    break;
                  }
                }
              }
              if (test) {
                moves.push({
                  action: "move",
                  position: {
                    x,
                    y
                  }
                })
              } else {
                break;
              }
            } else {
              break;
            }
            y++;
          }
          x = this.pos.x,
            y = this.pos.y - 1
          while (true) {
            if (this.validmove(x, y)) {
              let test = true;
              for (var i = 0; i < W_pices.length; i++) {
                if (W_pices[i].pos.x == x && W_pices[i].pos.y == y) {
                  test = false;
                  break;
                }
              }
              if (test) {
                for (var i = 0; i < B_pices.length; i++) {
                  if (B_pices[i].pos.x == x && B_pices[i].pos.y == y) {
                    test = false;
                    moves.push({
                      action: "kill",
                      position: {
                        x,
                        y
                      }
                    })
                    break;
                  }
                }
              }
              if (test) {
                moves.push({
                  action: "move",
                  position: {
                    x,
                    y
                  }
                })
              } else {
                break;
              }
            } else {
              break;
            }
            y--;
          }
          x = this.pos.x + 1,
            y = this.pos.y + 1
          while (true) {
            if (this.validmove(x, y)) {
              let test = true;
              for (var i = 0; i < W_pices.length; i++) {
                if (W_pices[i].pos.x == x && W_pices[i].pos.y == y) {
                  test = false;
                  break;
                }
              }
              if (test) {
                for (var i = 0; i < B_pices.length; i++) {
                  if (B_pices[i].pos.x == x && B_pices[i].pos.y == y) {
                    test = false;
                    moves.push({
                      action: "kill",
                      position: {
                        x,
                        y
                      }
                    })
                    break;
                  }
                }
              }
              if (test) {
                moves.push({
                  action: "move",
                  position: {
                    x,
                    y
                  }
                })
              } else {
                break;
              }
            } else {
              break;
            }
            x++;
            y++;
          }
          x = this.pos.x - 1,
            y = this.pos.y - 1
          while (true) {
            if (this.validmove(x, y)) {
              let test = true;
              for (var i = 0; i < W_pices.length; i++) {
                if (W_pices[i].pos.x == x && W_pices[i].pos.y == y) {
                  test = false;
                  break;
                }
              }
              if (test) {
                for (var i = 0; i < B_pices.length; i++) {
                  if (B_pices[i].pos.x == x && B_pices[i].pos.y == y) {
                    test = false;
                    moves.push({
                      action: "kill",
                      position: {
                        x,
                        y
                      }
                    })
                    break;
                  }
                }
              }
              if (test) {
                moves.push({
                  action: "move",
                  position: {
                    x,
                    y
                  }
                })
              } else {
                break;
              }
            } else {
              break;
            }
            x--;
            y--;
          }
          x = this.pos.x - 1,
            y = this.pos.y + 1
          while (true) {
            if (this.validmove(x, y)) {
              let test = true;
              for (var i = 0; i < W_pices.length; i++) {
                if (W_pices[i].pos.x == x && W_pices[i].pos.y == y) {
                  test = false;
                  break;
                }
              }
              if (test) {
                for (var i = 0; i < B_pices.length; i++) {
                  if (B_pices[i].pos.x == x && B_pices[i].pos.y == y) {
                    test = false;
                    moves.push({
                      action: "kill",
                      position: {
                        x,
                        y
                      }
                    })
                    break;
                  }
                }
              }
              if (test) {
                moves.push({
                  action: "move",
                  position: {
                    x,
                    y
                  }
                })
              } else {
                break;
              }
            } else {
              break;
            }
            x--;
            y++;
          }
          x = this.pos.x + 1,
            y = this.pos.y - 1
          while (true) {
            if (this.validmove(x, y)) {
              let test = true;
              for (var i = 0; i < W_pices.length; i++) {
                if (W_pices[i].pos.x == x && W_pices[i].pos.y == y) {
                  test = false;
                  break;
                }
              }
              if (test) {
                for (var i = 0; i < B_pices.length; i++) {
                  if (B_pices[i].pos.x == x && B_pices[i].pos.y == y) {
                    test = false;
                    moves.push({
                      action: "kill",
                      position: {
                        x,
                        y
                      }
                    })
                    break;
                  }
                }
              }
              if (test) {
                moves.push({
                  action: "move",
                  position: {
                    x,
                    y
                  }
                })
              } else {
                break;
              }
            } else {
              break;
            }
            x++;
            y--;
          }
          return moves;
          break;
      } //switch
    } //black or white pices
  } //possible move function
  dragged() {
    let x = floor(mouseX / (width / 8))
    x = constrain(x, 0, Pices / 2 - 1)
    let y = floor(mouseY / (height / 8))
    y = constrain(y, 0, Pices / 2 - 1)
    let possible = this.possible_move();
    for (var i = 0; i < possible.length; i++) {
      if (possible[i].position.x == x && possible[i].position.y == y) {
        if (possible[i].action == "kill") {
          if (this.colo == "B") {
            W_pices.forEach((data, index) => {
              if (data.pos.x == x && data.pos.y == y) {
                W_pices[index].isDead = true;
                W_pices.splice(index, 1);
              }
            })
          } else {
            B_pices.forEach((data, index) => {
              if (data.pos.x == x && data.pos.y == y) {
                B_pices[index].isDead = true;
                B_pices.splice(index, 1);
              }
            })
          }
        }
        socket.emit("move", {
          color: this.colo,
          status: possible[i].action,
          oldPos: {
            x: this.pos.x,
            y: this.pos.y
          },
          newPos: {
            x,
            y
          }
        })
        this.pos.x = x;
        this.pos.y = y;
        global_turn *= -1;
        break;
      }
    }
  }
} //class
