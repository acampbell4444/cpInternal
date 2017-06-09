import React, { Component } from 'react'
import SlidePuzzle from '../components/SlidePuzzle'
import { connect } from 'react-redux'
import { updateBoard, winningBoard, resetTheBoard } from '../reducers/slidePuzzle'
import { determineDraggable, manageTheDrop, manageJustClick, doArraysMatch } from '../utilities/slidePuzzle'

let boardState
let winBoard
let winState
const mapStateToProps = state => {
  boardState = state.slidePuzzle.boardState
  const draggableArray = determineDraggable(boardState)
  winBoard = doArraysMatch(boardState)
  winState = state.slidePuzzle.winningBoard

  return {
    boardState,
    draggableArray,
    winBoard
  }
}

const mapDispatchToProps = dispatch => (
  {
    handleDragStart(boardState, num, idx) {
      console.log('handling drag')
    },
    resetBoard() {
      dispatch(resetTheBoard())
    },
    handleJustClick(idx, cellNum) {
      const bS = manageJustClick(idx, cellNum, boardState)
      dispatch(updateBoard(bS))
    },
    onDrop(data) {
      const bS = manageTheDrop(data, boardState)
      dispatch(updateBoard(bS))
      if (winBoard) {
        dispatch(winningBoard(true))
      } else if (winState) {
        dispatch(winningBoard(false))
      }
    }
  }
)

const SlidePuzzleContainer = connect(mapStateToProps, mapDispatchToProps)(SlidePuzzle)

export default SlidePuzzleContainer
