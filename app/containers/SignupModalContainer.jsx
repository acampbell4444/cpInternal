import React, { Component } from 'react'
import SignupModal from '../components/SignUpModal'
import { connect } from 'react-redux'
import { didSignUpSucceed } from '../reducers/user'

const mapStateToProps = state => ({
	didSignUpSucc: state.user.didSignUpSucceed
})

const mapDispatchToProps = dispatch => ({
  changeLoginSuccessState() {
    dispatch(didSignUpSucceed(false))
  }
})

const SignupModalContainer = connect(mapStateToProps, mapDispatchToProps)(SignupModal)

export default SignupModalContainer
