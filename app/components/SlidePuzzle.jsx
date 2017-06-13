import React, { Component } from 'react'
import { Draggable, Droppable } from 'react-drag-and-drop'

export default class extends Component {
  render() {
    const { boardState, handleDragStart, handleJustClick, draggableArray, onDrop, winBoard, resetBoard, resetMoves, totalMoves, solvePuzzle, classMaker, shuffle, shuffleAuto, isShuffling, isSolving } = this.props
    const draggableArrayOfStrings = draggableArray.map(n => n.toString())
    return (
      <div className='slidePuzzleCanvas'>
        <div className='puzzleBackground'>
          <div className='puzTitleRow center'>
            <p id='puzGameTitle' >Game of 15</p>
            <span id='puzGameReactTitle'> (via React/Redux)</span>
            <p id='puzzleMoveCounter'> Total Moves: {' '+ totalMoves}</p>
          </div>
          <div className='puzzleBoard'>
            <div className='row' id='rowOfCells'>
              {
                boardState.map((cell, idx) => (
                  <div className='col-xs-3' key={idx} onDragStart={e => handleDragStart(boardState, cell, idx)}>
                    <Droppable types={draggableArrayOfStrings} onDrop={onDrop}>
                    {
                      draggableArray.includes(idx)&&(
                        <Draggable type={idx} className={classMaker(idx, cell)} data={cell} onClick={e => handleJustClick(idx, cell)}>
                          <p className='puzzleNumber'>{cell}</p>
                        </Draggable>
                      )
                    }
                    {
                      !draggableArray.includes(idx)&&(
                        <div className={classMaker(idx, cell)}>
                          <p className='puzzleNumber'>{cell}</p>
                        </div>
                      )
                    }
                    </Droppable>
                  </div>
                ))
              }
            </div>
          </div>
          <div className='row center'>
            {
              !winBoard&&(
              <span>
                <button onClick={e => solvePuzzle(handleJustClick)}
                        className='btn btn-success' id='solveSlideButton'
                        disabled={isShuffling||isSolving}>Solve
                </button>
                <button className='btn btn-danger' id='slidePuzzleReset' onClick={resetBoard} disabled={isShuffling||isSolving}>Reset</button>
              </span>
              )
            }
            <button className='btn btn-info' id='slidePuzzleShuffle' onClick={e => shuffleAuto(shuffle)} disabled={isShuffling||isSolving}>Shuffle</button>
            {
              winBoard&&totalMoves>1&&(
                <button onClick={resetMoves} className='btn btn-warning' id='resetMoves'>Reset Total Moves</button>
              )
            }
          </div>
        </div>
      </div>
    )
  }
}
