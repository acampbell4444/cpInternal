import React, { Component } from 'react'
import SlidePuzzle from '../components/SlidePuzzle'
import { connect } from 'react-redux'
import { updateBoard, winningBoard, resetTheBoard, totalMovesPlusOne, totalMovesReset, updateSolutionArray } from '../reducers/slidePuzzle'
import { determineDraggable, manageTheDrop, manageJustClick, doArraysMatch } from '../utilities/slidePuzzle'
import { NPuzzleSolver } from '../utilities/puzzleSolver'
import { Puzzle } from '../utilities/puzzleSolver2'

let boardState, winBoard, winState, totalMoves, stepInterval, solutionArray, solved

const mapStateToProps = state => {
  boardState = state.slidePuzzle.boardState
  const draggableArray = determineDraggable(boardState)
  totalMoves = state.slidePuzzle.totalMoves
  winBoard = doArraysMatch(boardState)
  winState = state.slidePuzzle.winningBoard
  solutionArray = state.slidePuzzle.solutionArray.concat()
  solved = !state.slidePuzzle.solutionArray.length

  return {
    boardState,
    draggableArray,
    winBoard,
    totalMoves
  }
}

const mapDispatchToProps = (dispatch, ownProps) => (
  {
    handleDragStart(boardState, num, idx) {
      console.log('handling drag')
    },
    resetBoard() {
      dispatch(resetTheBoard())
      dispatch(totalMovesReset())
      if (stepInterval) {
        clearInterval(stepInterval)
        stepInterval = null
        dispatch(updateSolutionArray([]))
      }
    },
    handleJustClick(idx, cellNum, solvPuzz) {
      let index
      if (idx==='auto') {
        if (winBoard) {
          clearInterval(stepInterval)
          stepInterval = null
          return
        }
        cellNum = solutionArray.shift()
        index = boardState.indexOf(cellNum)
        dispatch(updateSolutionArray(solutionArray))
      } else {
        index = idx
      }
      if (index > 0) {
        const bS = manageJustClick(index, cellNum, boardState)
        dispatch(updateBoard(bS))
        dispatch(totalMovesPlusOne(totalMoves))
      }
    },
    solvePuzzle(handClick) {
      // // This method uses the A-Star algorithm with the Manhattan Distance Implementation-
      // // It returns the solution with the least amount of moves, but can time out occasionally
      // let board = boardState.concat()
      // let offInd = board.indexOf('')
      // board[offInd]=0
      // var array = [board.slice(0,4), board.slice(4,8), board.slice(8,12), board.slice(12,16) ]
      // console.log(array)
      // let puzzle = new Puzzle(4)
      // puzzle.board = array
      // let solved = puzzle.solve()
      // console.log(solved)
      if (!stepInterval) {
        const board = boardState.concat()
        const array = [board.slice(0, 4), board.slice(4, 8), board.slice(8, 12), board.slice(12, 16)]
        const solver = new NPuzzleSolver(array)
        const solutionArray = solver.solve().map(state => state.number)
        dispatch(updateSolutionArray(solutionArray))
        stepInterval = setInterval(handClick.bind(this, 'auto'), 500)
      } else {
        clearInterval(stepInterval)
        stepInterval = null
      }
    },
    onDrop(data) {
      const bS = manageTheDrop(data, boardState)
      dispatch(updateBoard(bS))
      if (winBoard) {
        dispatch(winningBoard(true))
      } else if (winState) {
        dispatch(winningBoard(false))
        dispatch(totalMovesReset())
      }
      dispatch(totalMovesPlusOne(totalMoves))
    }
  }
)

const SlidePuzzleContainer = connect(mapStateToProps, mapDispatchToProps)(SlidePuzzle)

export default SlidePuzzleContainer
