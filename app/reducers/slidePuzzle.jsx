import axios from 'axios'
import { createBoard } from '../utilities/slidePuzzle'

const initState = {
  boardState: createBoard(16),
  winningBoard: false,
  totalMoves: 0,
  solutionArray: []
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

  case MOVES_PLUS:
    newState.totalMoves = action.moves
    break

  case MOVES_RESET:
    newState.totalMoves = action.moves
    break

  case UPDATE_SOLUTION_ARRAY:
    newState.solutionArray = action.array
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

const MOVES_PLUS = 'MOVES_PLUS'
export const totalMovesPlusOne = currMoves => ({type: MOVES_PLUS, moves: ++currMoves})

const MOVES_RESET = 'MOVES_RESET'
export const totalMovesReset = () => ({type: MOVES_RESET, moves: 0})

const UPDATE_SOLUTION_ARRAY = 'UPDATE_SOLUTIONS_ARRAY'
export const updateSolutionArray = array => ({type: UPDATE_SOLUTION_ARRAY, array})

export const resetTheBoard = () => {
  const board = createBoard(16)
  return {type: UPDATE_BOARD, board}
}

export const puzzleIsWinner = bool => dispatch => dispatch(winningBoard(bool))

export default reducer
