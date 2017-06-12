const Direction = {
  LEFT: 'left',
  RIGHT: 'right',
  UP: 'up',
  DOWN: 'dow'
}

const Algorithm = {
  BFS: 'BFS',
  AMisplaced: 'A*: Misplaced tiles',
  AManhattan: 'A*: Manhattan distance'
}

export function Puzzle(dimension, solveFunc) {
  this.board = []
  this.path = []
  this.dimension = dimension
  this.solveFunc = solveFunc
  this.lastMove = null
  for (var i = 0; i < dimension; i++) {
    this.board.push([])
    for (var j = 0; j < dimension; j++) {
      if (i === this.dimension - 1 && j === this.dimension - 1) {
        this.board[i].push(0)
      } else {
        this.board[i].push(dimension * i + j + 1)
      }
    }
  }
}

// Get the (x, y) position of the blank space
Puzzle.prototype.getBlankSpacePosition = function() {
  for (var i = 0; i < this.dimension; i++) {
    for (var j = 0; j < this.dimension; j++) {
      if (this.board[i][j] === 0) {
        return [i, j]
      }
    }
  }
}

// Swap two items on a bidimensional array
Puzzle.prototype.swap = function(i1, j1, i2, j2) {
  var temp = this.board[i1][j1]
  this.board[i1][j1] = this.board[i2][j2]
  this.board[i2][j2] = temp
}

// Return the direction that a piece can be moved, if any
Puzzle.prototype.getMove = function(piece) {
  var blankSpacePosition = this.getBlankSpacePosition()
  var line = blankSpacePosition[0]
  var column = blankSpacePosition[1]
  if (line > 0 && piece === this.board[line-1][column]) {
    return Direction.DOWN
  } else if (line < this.dimension - 1 && piece === this.board[line+1][column]) {
    return Direction.UP
  } else if (column > 0 && piece === this.board[line][column-1]) {
    return Direction.RIGHT
  } else if (column < this.dimension - 1 && piece === this.board[line][column+1]) {
    return Direction.LEFT
  }
}

// Move a piece, if possible, and return the direction that it was moved
Puzzle.prototype.move = function(piece) {
  var move = this.getMove(piece)
  if (move != null) {
    var blankSpacePosition = this.getBlankSpacePosition()
    var line = blankSpacePosition[0]
    var column = blankSpacePosition[1]
    switch (move) {
    case Direction.LEFT:
      this.swap(line, column, line, column + 1)
      break
    case Direction.RIGHT:
      this.swap(line, column, line, column - 1)
      break
    case Direction.UP:
      this.swap(line, column, line + 1, column)
      break
    case Direction.DOWN:
      this.swap(line, column, line - 1, column)
      break
    }
    if (move != null) {
      this.lastMove = piece
    }
    return move
  }
}

Puzzle.prototype.isGoalState = function() {
  for (let i = 0; i < this.dimension; i++) {
    for (let j = 0; j < this.dimension; j++) {
      const piece = this.board[i][j]
      if (piece !== 0) {
        const originalLine = Math.floor((piece - 1) / this.dimension)
        const originalColumn = (piece - 1) % this.dimension
        if (i !== originalLine || j !== originalColumn) return false
      }
    }
  }
  return true
}

// Return a copy of current puzzle
Puzzle.prototype.getCopy = function() {
  const newPuzzle = new Puzzle(this.dimension)
  for (let a = 0; a < this.dimension; a++) {
    for (let j = 0; j < this.dimension; j++) {
      newPuzzle.board[a][j] = this.board[a][j]
    }
  }
  for (let i = 0; i < this.path.length; i++) {
    newPuzzle.path.push(this.path[i])
  }
  return newPuzzle
}

// Return all current allowed moves
Puzzle.prototype.getAllowedMoves = function() {
  const allowedMoves = []
  for (let i = 0; i < this.dimension; i++) {
    for (let j = 0; j < this.dimension; j++) {
      const piece = this.board[i][j]
      if (this.getMove(piece) != null) {
        allowedMoves.push(piece)
      }
    }
  }
  return allowedMoves
}

Puzzle.prototype.visit = function() {
  const children = []
  const allowedMoves = this.getAllowedMoves()
  for (let i = 0; i < allowedMoves.length; i++) {
    const move = allowedMoves[i]
    if (move !== this.lastMove) {
      const newInstance = this.getCopy()
      newInstance.move(move)
      newInstance.path.push(move)
      children.push(newInstance)
    }
  }
  return children
}

Puzzle.prototype.solveBFS = function() {
  const startingState = this.getCopy()
  startingState.path = []
  let states = [startingState]
  while (states.length > 0) {
    const state = states[0]
    states.shift()
    if (state.isGoalState()) {
      return state.path
    }
    states = states.concat(state.visit())
  }
}

Puzzle.prototype.g = function() {
  return this.path.length
}

Puzzle.prototype.getManhattanDistance = function() {
  var distance = 0
  for (let i = 0; i < this.dimension; i++) {
    for (let j = 0; j < this.dimension; j++) {
      const piece = this.board[i][j]
      if (piece !== 0) {
        const originalLine = Math.floor((piece - 1) / this.dimension)
        const originalColumn = (piece - 1) % this.dimension
        distance += Math.abs(i - originalLine) + Math.abs(j - originalColumn)
      }
    }
  }
  return distance
}

Puzzle.prototype.countMisplaced = function() {
  let count = 0
  for (let i = 0; i < this.dimension; i++) {
    for (let j = 0; j < this.dimension; j++) {
      const piece = this.board[i][j]
      if (piece !== 0) {
        const originalLine = Math.floor((piece - 1) / this.dimension)
        const originalColumn = (piece - 1) % this.dimension
        if (i !== originalLine || j !== originalColumn) count++
      }
    }
  }
  return count
}

Puzzle.prototype.h = function() {
  if (this.solveFunc === Algorithm.AMisplaced) {
    return this.countMisplaced()
  } else {
    return this.getManhattanDistance()
  }
}

Puzzle.prototype.solveA = function() {
  const states = new MinHeap(null, function(a, b) {
    return a.distance - b.distance
  })
  this.path = []
  states.push({puzzle: this, distance: 0})
  while (states.size() > 0) {
    const state = states.pop().puzzle
    if (state.isGoalState()) {
      return state.path
    }
    var children = state.visit()
    for (var i = 0; i < children.length; i++) {
      var child = children[i]
      var f = child.g() + child.h()
      states.push({puzzle: child, distance: f})
    }
  }
}

Puzzle.prototype.solve = function() {
  if (this.solveFunc === Algorithm.BFS) {
    return this.solveBFS()
  } else {
    return this.solveA()
  }
}

function MinHeap(array, comparator) {
  this.heap = array || []
  this.compare = comparator || function(item1, item2) {
    return item1 === item2 ? 0 : item1 < item2 ? -1 : 1
  }
  this.left = function(i) {
    return 2 * i + 1
  }
  this.right = function(i) {
    return 2 * i + 2
  }
  this.parent = function(i) {
    return Math.ceil(i / 2) - 1
  }
  this.heapify = function(i) {
    const lIdx = this.left(i)
    const rIdx = this.right(i)
    let smallest
    if (lIdx < this.heap.length && this.compare(this.heap[lIdx], this.heap[i]) < 0) {
      smallest = lIdx
    } else {
      smallest = i
    }
    if (rIdx < this.heap.length && this.compare(this.heap[rIdx], this.heap[smallest]) < 0) {
      smallest = rIdx
    }
    if (i !== smallest) {
      var temp = this.heap[smallest]
      this.heap[smallest] = this.heap[i]
      this.heap[i] = temp
      this.heapify(smallest)
    }
  }
  this.siftUp = function(i) {
    const p = this.parent(i)
    if (p >= 0 && this.compare(this.heap[p], this.heap[i]) > 0) {
      const temp = this.heap[p]
      this.heap[p] = this.heap[i]
      this.heap[i] = temp
      this.siftUp(p)
    }
  }
  this.heapifyArray = function() {
    let i = Math.floor(this.heap.length / 2) - 1
    for (; i >= 0; i--) {
      this.heapify(i)
    }
    if (array != null) {
      this.heapifyArray()
    }
  }
}

MinHeap.prototype.push = function(item) {
  this.heap.push(item)
  this.siftUp(this.heap.length - 1)
}

MinHeap.prototype.insert = function(item) {
  this.push(item)
}

MinHeap.prototype.pop = function() {
  let value
  if (this.heap.length > 1) {
    value = this.heap[0]
    this.heap[0] = this.heap.pop()
    this.heapify(0)
  } else {
    value = this.heap.pop()
  }
  return value
}

MinHeap.prototype.remove = function() {
  return this.pop()
}

MinHeap.prototype.getMin = function() {
  return this.heap[0]
}

MinHeap.prototype.size = function() {
  return this.heap.length
}
