import axios from 'axios'
import { createBoard } from '../utilities/slidePuzzle'

const initState = {
  boardState: createBoard(16)
}

const reducer = (state=initState, action) => {
  const newState = Object.assign({}, state)

  switch (action.type) {
  case UPDATE_BOARD:
    newState.boardState = action.board
    break

  default:
    return state
  }
  return newState
}

const UPDATE_BOARD = 'UPDATE_BOARD'
export const updateBoard = board => ({type: UPDATE_BOARD, board})

export default reducer
