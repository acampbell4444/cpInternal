import React, { Component } from 'react'
import { Draggable, Droppable } from 'react-drag-and-drop'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = { }
  }

  render() {
    const { boardState, handleDragStart, handleJustClick, draggableArray, onDrop, winBoard, resetBoard, totalMoves, solvePuzzle } = this.props
    const draggableArrayOfStrings = draggableArray.map(n => n.toString())
    return (
      <div>
        <div className='puzTitleRow'>
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
                      <Draggable type={idx} className={'dragCell'} data={cell} onClick={e => handleJustClick(idx, cell, solvePuzzle)}>
                        <p className='puzzleNumber'>{cell}</p>
                      </Draggable>
                    )
                  }
                  {
                    !draggableArray.includes(idx)&&(
                      <div className={'dragCell ' + 'slide' + cell}>
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
              <div>
                <button onClick={e => solvePuzzle(handleJustClick)} className='btn btn-success' id='solveSlideButton'>Solve</button>
                <button className='btn btn-primary' id='slidePuzzleReset' onClick={resetBoard}>Reset</button>
              </div>
            )
          }
          {
            winBoard&&(
              <div id='puzzleWinBubble'>
                <p id='puzzleBubbleText'>You Win!</p>
                <button className='btn btn-primary btn-xs' id='slidePuzzleResetWin' onClick={resetBoard}>Reset</button>
              </div>
            )
          }
        </div>
      </div>
    )
  }
}
