import React, { Component } from 'react'
import { Link } from 'react-router'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
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
                      onClick={e => { e.preventDefault(); toggleClass(rIdx, cIdx, tableObject); this.forceUpdate() }}>
                     </td>
                    )
                  }
                </tr>
              )
            }
          </tbody>
        </table>
        <button className='btn btn-success'
                onClick={e => { e.preventDefault(); sendTblState(tableObject); this.forceUpdate() }}>Next Frame
        </button>
      </div>
    )
  }
}
