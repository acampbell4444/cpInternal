import axios from 'axios'

const tableObj = (h, w) => {
  const array = []
  for (let i = 0; i < h; i++) {
    array[i] = []
    for (let x = 0; x < w; x++) {
      array[i].push('off')
    }
  }
  return array
}

const initState = {
  table: tableObj(12, 12) // remove hard code and add custom sizing form
}

const reducer = (state=initState, action) => {
  const newState = Object.assign({}, state)

  switch (action.type) {
  case UPDATE_TABLE:
    newState.table = action.table
    break

  case TOGGLE_CLASS:
    newState.table = action.table
    break

  default:
    return state
  }
  return newState
}

const TOGGLE_CLASS = 'TOGGLE_CLASS'
export const togClass = (row, col, table) => {
  table[row][col] = table[row][col]==='off' ? 'on' : 'off'
  return {type: TOGGLE_CLASS, table}
}

const UPDATE_TABLE = 'UPDATE_TABLE'
export const updateTable = table => {
  table.forEach((row, rIdx, rArr) =>
    row.forEach((col, cIdx, cArr) => {
      const upLeft = table[rIdx-1]&&table[rIdx-1][cIdx-1] ? table[rIdx-1][cIdx-1] : null
      const up = table[rIdx-1] ? table[rIdx-1][cIdx] : null
      const upRight = table[rIdx-1]&&table[rIdx-1][cIdx+1] ? table[rIdx-1][cIdx+1] : null
      const left = table[cIdx-1] ? table[cIdx-1][rIdx] : null
      const right = table[cIdx+1] ? table[cIdx+1][rIdx] : null
      const lowLeft = table[rIdx+1]&&table[rIdx+1][cIdx-1] ? table[rIdx+1][cIdx-1] : null
      const low = table[rIdx+1] ? table[rIdx+1][cIdx] : null
      const lowRight = table[rIdx+1]&&table[rIdx+1][cIdx+1] ? table[rIdx+1][cIdx+1] : null
      const arrayOfNeighborStates = [upLeft, up, upRight, left, right, lowLeft, low, lowRight]
      const aliveNeighbors = arrayOfNeighborStates.filter(cellState => cellState==='on').length
      const deadNeighbors = arrayOfNeighborStates.filter(cellState => cellState==='off').length
      if (col==='on') {
        if (aliveNeighbors<2||aliveNeighbors>3) {
          table[rIdx][cIdx]='off'
        }
      } else {
        if (aliveNeighbors===3) {
          table[rIdx][cIdx]='on'
        }
      }
    })
  )

  return {type: UPDATE_TABLE, table}
}

export default reducer
