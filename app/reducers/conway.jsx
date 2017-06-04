import axios from 'axios'
import { tableChange, tableCreate, tableResetRandom, lastStOns } from '../utilities/conway'

const initState = {
  table: tableCreate(12, 12), // remove hard code and add custom sizing form
  autoPlay: false,
  lastStateOns: 0,
  frozenTable: false
}

const reducer = (state=initState, action) => {
  const newState = Object.assign({}, state)

  switch (action.type) {
  case UPDATE_TABLE:
    newState.table = action.tableCopy
    newState.frozenTable = action.freezeCheck
    break

  case CLEAR_BOARD:
    newState.table = action.tableCopy
    break

  case TOGGLE_CLASS:
    newState.table = action.tableCopy
    newState.lastStateOns = action.lastStateOns
    break

  case RESET_RANDOM:
    newState.table = action.tableCopy
    break

  case AUTO_PLAY:
    newState.autoPlay = action.bool
    break

  case FROZEN_TABLE:
    newState.frozenTable = action.bool
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
  const lastStateOns = lastStOns(tableCopy)
  return {type: TOGGLE_CLASS, tableCopy, lastStateOns}
}

const UPDATE_TABLE = 'UPDATE_TABLE'
export const updateTable = tab => {
  const lastStateOns = lastStOns(tab)
  const tableChangeResult = tableChange(tab)
  let freezeCheck = tableChangeResult[1]
  const tableCopy = tableChangeResult[0]
  freezeCheck = freezeCheck < 1
  return {type: UPDATE_TABLE, tableCopy, freezeCheck}
}

const CLEAR_BOARD = 'CLEAR_BOARD'
export const clearBoard = (h, w) => {
  const tableCopy = tableCreate(h, w).concat()
  return {type: CLEAR_BOARD, tableCopy}
}

const RESET_RANDOM = 'RESET_RANDOM'
export const resetRandom = (h, w) => {
  const tableCopy = tableResetRandom(h, w).concat()
  return {type: RESET_RANDOM, tableCopy}
}

const AUTO_PLAY = 'AUTO_PLAY'
export const autoPlay = bool => ({type: AUTO_PLAY, bool})

const FROZEN_TABLE = 'FROZEN_TABLE'
export const frozeUp = bool => ({type: FROZEN_TABLE, bool})

export default reducer
