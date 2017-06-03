import axios from 'axios'
import { tableChange } from '../utilities/conway'

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
    newState.table = action.tableCopy
    break

  case TOGGLE_CLASS:
    newState.table = action.tableCopy
    break

  default:
    return state
  }
  return newState
}

const TOGGLE_CLASS = 'TOGGLE_CLASS'
export const togClass = (row, col, table) => {
  const tableCopy = table.concat()
  tableCopy[row][col] = table[row][col]==='off' ? 'on' : 'off'
  return {type: TOGGLE_CLASS, tableCopy}
}

const UPDATE_TABLE = 'UPDATE_TABLE'
export const updateTable = tab => {
  const tableCopy = tableChange(tab).concat()
  return {type: UPDATE_TABLE, tableCopy}
}

export default reducer
