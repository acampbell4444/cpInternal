export const tableChange = (tab) => {
  let freezeCheck = 0
  const table = tab.map(arr => arr.slice())
  for (let row = 0; row < table.length; row++) {
    for (let col = 0; col < table[row].length; col++) {
      const upLeft = table[row-1]&&table[row-1][col-1] ? table[row-1][col-1] : null
      const up = table[row-1] ? table[row-1][col] : null
      const upRight = table[row-1]&&table[row-1][col+1] ? table[row-1][col+1] : null
      const left = table[row][col-1] ? table[row][col-1] : null
      const right = table[row][col+1] ? table[row][col+1] : null
      const lowLeft = table[row+1]&&table[row+1][col-1] ? table[row+1][col-1] : null
      const low = table[row+1] ? table[row+1][col] : null
      const lowRight = table[row+1]&&table[row+1][col+1] ? table[row+1][col+1] : null
      const arrayOfNeighbors = [upLeft, up, upRight, left, right, lowLeft, low, lowRight]
      const aliveNeighbors = arrayOfNeighbors.filter(cellState => cellState==='on').length
      const deadNeighbors = arrayOfNeighbors.filter(cellState => cellState==='off').length
      if (tab[row][col]==='on') {
        if (aliveNeighbors<2||aliveNeighbors>3) {
          tab[row][col]='off'
          freezeCheck++
        }
      } else {
        if (aliveNeighbors===3) {
          tab[row][col]='on'
          freezeCheck++
        }
      }
    }
  }
  return [tab, freezeCheck]
}

export const tableCreate = (h, w) => {
  const array = []
  for (let a = 0; a < h; a++) {
    array[a]=[]
    for (let b = 0; b < w; b++) {
      array[a].push('off')
    }
  }
  return array
}

export const tableResetRandom = (h, w) => {
  const array = []
  for (let i = 0; i < h; i++) {
    array[i] = []
    for (let x = 0; x < w; x++) {
      const num = Math.random(1)
      if (num > 0.5) {
        array[i].push('off')
      } else {
        array[i].push('on')
      }
    }
  }
  return array
}

export const lastStOns = table => table.map(row => row.filter(col => col ==='on').length).reduce((a, b) => a+b, 0)

export const resizeBoard = (size, board) => {
  let newSize
  if (size==='small') { newSize = 12 }
  if (size==='medium') { newSize = 24 }
  if (size==='large') { newSize = 36 }
  const array = []
  for (let i = 0; i < newSize; i++) {
    array[i] = []
    for (let x = 0; x < newSize; x++) {
      if (board[i]&&board[i][x]) {
        array[i].push(board[i][x])
      } else {
        array[i].push('off')
      }
    }
  }
  return array
}
