import axios from 'axios'
import { createBoard } from '../utilities/slidePuzzle'

const initState = {
  boardState: createBoard(16),
  winningBoard: false
}

const reducer = (state=initState, action) => {
  const newState = Object.assign({}, state)

  switch (action.type) {
  case UPDATE_BOARD:
    newState.boardState = action.board
    break

  case WINNING_BOARD:
    newState.winningBoard = action.bool
    break

  default:
    return state
  }
  return newState
}

const UPDATE_BOARD = 'UPDATE_BOARD'
export const updateBoard = board => ({type: UPDATE_BOARD, board})

const WINNING_BOARD = 'WINNING_BOARD'
export const winningBoard = bool => ({type: WINNING_BOARD, bool})

export const resetTheBoard = () => {
  const board = createBoard(16)
  return {type: UPDATE_BOARD, board}
}

export const puzzleIsWinner = bool => dispatch => dispatch(winningBoard(bool))

export default reducer
