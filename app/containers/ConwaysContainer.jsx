import React, { Component } from 'react'
import Conways from '../components/Conways'
import { connect } from 'react-redux'
import { updateTable, togClass } from '../reducers/conway'

let tableObject
const mapStateToProps = state => {
  tableObject = state.conway.table.concat()
  return {
    tableObject
  }
}

const mapDispatchToProps = dispatch => (
  {
    sendTblState() {
      return dispatch(updateTable(tableObject))
    },
    toggleClass(r, c, table) {
      return dispatch(togClass(r, c, tableObject))
    }
  }
)

const ConwaysContainer = connect(mapStateToProps, mapDispatchToProps)(Conways)

export default ConwaysContainer
