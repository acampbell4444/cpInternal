import React, { Component } from 'react'
import { Link } from 'react-router'

export default class extends Component {
  render() {
    const { nextStep, toggleClass, tableObject, clearTheBoard, resetRand, autoPl, autoPlayOn } = this.props
    return (
      <div>
        <h1 id='conwayTitle'>Conway's Game of Life (via React/Redux)</h1>
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
          <button className='btn btn-success'
            onClick={ nextStep }>Next Frame
          </button>
          <button className='btn btn-primary'
            onClick={e => clearTheBoard(tableObject.length, tableObject[0].length) }>Clear Board
          </button>
          <button className='btn btn-warning'
            onClick={e => resetRand(tableObject.length, tableObject[0].length) }>Reset Random
          </button>
          {
            !autoPlayOn&&(<button className='btn btn-info' onClick={e => autoPl(true, nextStep) }>Enable Auto-Play</button>)
          }
          {
            autoPlayOn&&(<button className='btn btn-danger' onClick={e => autoPl(false) }>Turn Auto-Play Off</button>)
          }
        </div>
      </div>
    )
  }
}
