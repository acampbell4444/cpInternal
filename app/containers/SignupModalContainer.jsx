import React, { Component } from 'react'
import SignupModal from '../components/SignUpModal'
import { connect } from 'react-redux'
import { didSignUpSucceed, hideSignUpMod } from '../reducers/user'

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  changeLoginSuccessState() {
    dispatch(didSignUpSucceed(false))
  },
  hideMod(bool) {
    dispatch(hideSignUpMod(false))
  }
})

const SignupModalContainer = connect(mapStateToProps, mapDispatchToProps)(SignupModal)

export default SignupModalContainer
