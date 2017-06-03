import React, { Component } from 'react'
import { Link } from 'react-router'

export default class extends Component {
  render() {
    const { sendTblState, toggleClass, tableObject } = this.props
    return (
      <div>
        <table className='center'>
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
        <button className='btn btn-success'
                onClick={ sendTblState }>Next Frame
        </button>
      </div>
    )
  }
}
