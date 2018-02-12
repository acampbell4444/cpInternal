import React, { Component } from 'react'
import { connect } from 'react-redux'
import AddWeathLogModal from '../components/AddWeathLogModal'

const mapStateToProps = state => {
  const user = state.auth.user ? state.auth.user : null
  return {
     user 
  }
}

const mapDispatchToProps = dispatch => (
  {}
  
)

const AddWeathLogContainer = connect(mapStateToProps, mapDispatchToProps)(AddWeathLogModal)

export default AddWeathLogContainer
