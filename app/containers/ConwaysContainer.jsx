import React, { Component } from 'react'
import Conways from '../components/Conways'
import { connect } from 'react-redux'
import { updateTable, togClass, clearBoard, resetRandom, autoPlay, frozeUp } from '../reducers/conway'

let tableObject, stepInterval, frozen

const mapStateToProps = state => {
  tableObject = state.conway.table.concat()
  frozen = state.conway.frozenTable
  return {
    tableObject,
    frozenTable: frozen,
    autoPlayOn: state.conway.autoPlay
  }
}

const mapDispatchToProps = dispatch => (
  {
    nextStep() {
      if (frozen) {
        clearInterval(stepInterval)
        stepInterval=null
        dispatch(autoPlay(false))
      }
      dispatch(updateTable(tableObject))
    },
    toggleClass(r, c, table) {
      dispatch(frozeUp(false))
      dispatch(togClass(r, c, tableObject))
    },
    clearTheBoard(h, w) {
      dispatch(frozeUp(false))
      dispatch(clearBoard(h, w))
    },
    resetRand(h, w) {
      dispatch(frozeUp(false))
      dispatch(resetRandom(h, w))
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
