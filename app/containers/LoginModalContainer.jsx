import React, { Component } from 'react'
import LoginModal from '../components/LoginModal'
import { connect } from 'react-redux'
import { loginFail } from '../reducers/auth'

const mapStateToProps = state => ({ didLoginFail: state.auth.loginFail })

const mapDispatchToProps = dispatch => (
  {
    loginFail(bool) {
      dispatch(loginFail(bool))
    }
  }
)

const LoginModalContainer = connect(mapStateToProps, mapDispatchToProps)(LoginModal)

export default LoginModalContainer
