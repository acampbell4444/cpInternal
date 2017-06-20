import React, { Component } from 'react'
import { Link } from 'react-router'
import { DropdownButton, MenuItem } from 'react-bootstrap'

export default class extends Component {
  render() {
    const { nextStep, toggleClass, tableObject, clearTheBoard, resetRand, autoPl, autoPlayOn, frozenTable, changeActiveSize, boardSize, allOff } = this.props
    console.log('=>', allOff)
    return (
      <div className='conwayCanvas'>
      <div id='conwayFrame'>
        <h1 id='conwayTitle'>Conway's Game of Life</h1>
        <p id= 'conwaySubtitle'>(via React/Redux)</p>
        <table className='center' id='theBoard'>
          <tbody>
            {
              tableObject.map((row, rIdx) =>
                <tr key={rIdx}>
                  {
                    row.map((col, cIdx) =>
                      <td key={cIdx} className={'cell ' + col }
                          onClick={e => toggleClass(rIdx, cIdx, tableObject) }>
                     </td>
                    )
                  }
                </tr>
              )
            }
          </tbody>
        </table>
        <div className='center' id='buttons'>
          <button className='btn btn-success conButt'
            onClick={ nextStep }
            disabled={frozenTable||allOff}
          >Next Frame
          </button>
          {
            !autoPlayOn&&(<button className='btn btn-info conButt' disabled={frozenTable||allOff} onClick={e => autoPl(true, nextStep) }>Enable Auto-Play</button>)
          }
          {
            autoPlayOn&&(<button className='btn btn-danger conButt' disabled={frozenTable} onClick={e => autoPl(false) }>Turn Auto-Play Off</button>)
          }
          <button className='btn btn-warning conButt'
            onClick={e => resetRand(tableObject.length, tableObject[0].length) }>Reset Random
          </button>
          <button className='btn btn-primary conButt'
                  onClick={e => clearTheBoard(tableObject.length, tableObject[0].length) }
                  disabled={allOff}
          >Clear Board
          </button>
          <DropdownButton title="Resize the Board" className='btn btn-danger' id='resizeDropdown'>
            <MenuItem eventKey="1" active={boardSize==='small'} onClick={e => changeActiveSize('small', tableObject)}>Small (12 X 12)</MenuItem>
            <MenuItem eventKey="2" active={boardSize==='medium'} onClick={e => changeActiveSize('medium', tableObject)}>Medium (24 X 24)</MenuItem>
            <MenuItem eventKey="3" active={boardSize==='large'} onClick={e => changeActiveSize('large', tableObject)}>Large (36 X 36)</MenuItem>
          </DropdownButton>
        </div>
      </div>
      </div>
    )
  }
}
