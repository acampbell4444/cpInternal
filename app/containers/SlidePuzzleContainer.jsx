import React, { Component } from 'react'
import SlidePuzzle from '../components/SlidePuzzle'
import { connect } from 'react-redux'
import { updateBoard } from '../reducers/slidePuzzle'
import { determineDraggable, manageTheDrop } from '../utilities/slidePuzzle'

let boardState
const mapStateToProps = state => {
  boardState = state.slidePuzzle.boardState
  const draggableArray = determineDraggable(boardState)

  return {
    boardState,
    draggableArray
  }
}

const mapDispatchToProps = dispatch => (
  {
    handleDragStart(boardState, num, idx) {
      console.log('handling drag')
    },
    onDrop(data) {
      const bS = manageTheDrop(data, boardState)
      dispatch(updateBoard(bS))
    }
  }
)

const SlidePuzzleContainer = connect(mapStateToProps, mapDispatchToProps)(SlidePuzzle)

export default SlidePuzzleContainer
