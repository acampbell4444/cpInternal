import React, { Component } from 'react'
import { connect } from 'react-redux'
import AddWLog from '../components/AddWLog'

const mapStateToProps = state => {
  const user = state.auth.user ? state.auth.user : null
  const lastEntry = state.weatherLog.lastLog ? state.weatherLog.lastLog : {}
  return {
     initialValues: lastEntry
  }
}

const mapDispatchToProps = dispatch => (
  {}
  
)

const AddWLogContainer = connect(mapStateToProps, mapDispatchToProps)(AddWLog)

export default AddWLogContainer