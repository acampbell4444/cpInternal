import React, { Component } from 'react'
import Conways from '../components/Conways'
import { connect } from 'react-redux'
import { updateTable, togClass, clearBoard, resetRandom, autoPlay } from '../reducers/conway'

let tableObject, stepInterval

const mapStateToProps = state => {
  tableObject = state.conway.table.concat()
  return {
    tableObject,
    autoPlayOn: state.conway.autoPlay
  }
}

const mapDispatchToProps = dispatch => (
  {
    nextStep() {
      return dispatch(updateTable(tableObject))
    },
    toggleClass(r, c, table) {
      return dispatch(togClass(r, c, tableObject))
    },
    clearTheBoard(h, w) {
      return dispatch(clearBoard(h, w))
    },
    resetRand(h, w) {
      return dispatch(resetRandom(h, w))
    },
    autoPl(bool, nS) {
      if (!stepInterval) {
        stepInterval = setInterval(nS.bind(this), 500)
      } else {
        clearInterval(stepInterval)
        stepInterval=null
      }
      return dispatch(autoPlay(bool))
    }
  }
)

const ConwaysContainer = connect(mapStateToProps, mapDispatchToProps)(Conways)

export default ConwaysContainer
