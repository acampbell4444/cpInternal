import React, { Component } from 'react'
import { Draggable, Droppable } from 'react-drag-and-drop'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = { }
  }

  render() {
    const { boardState, handleDragStart, draggableArray, onDrop } = this.props
    const draggableArrayOfStrings = draggableArray.map(n => n.toString())
    return (
      <div className='puzzleBoard'>
        <div className='row' id='rowOfCells'>
          {
            boardState.map((cell, idx) => (
              <div className='col-xs-3' key={idx} onDragStart={e => handleDragStart(boardState, cell, idx)}>
                <Droppable types={draggableArrayOfStrings} onDrop={onDrop}>
                {
                  draggableArray.includes(idx)&&(
                    <Draggable type={idx} className={'dragCell'} data={cell}>{cell} </Draggable>
                  )
                }
                {
                  !draggableArray.includes(idx)&&(
                    <div className={'dragCell ' + 'slide' + cell}>{cell}</div>
                  )
                }
                </Droppable>
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}
