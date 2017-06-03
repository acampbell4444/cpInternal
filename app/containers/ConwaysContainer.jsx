import React, { Component } from 'react'
import Conways from '../components/Conways'
import { connect } from 'react-redux'
import { updateTable, togClass } from '../reducers/conway'

const mapStateToProps = state => {
  const tableObject = state.conway.table
  return {
    tableObject
  }
}

const mapDispatchToProps = dispatch => (
  {
    sendTblState(table) {
      dispatch(updateTable(table))
    },
    toggleClass(r, c, table) {
      dispatch(togClass(r, c, table))
    }
  }
)

const ConwaysContainer = connect(mapStateToProps, mapDispatchToProps)(Conways)

export default ConwaysContainer
