import React, { Component } from 'react'
import LoginModal from '../components/LoginModal'
import { connect } from 'react-redux'
import { loginFail } from '../reducers/auth'

const mapStateToProps = state => (
  { didLoginFail: state.auth.loginFail,
    loginDidSucceed: state.auth.loginDidSucceed,
    userName: state.auth.user.name
  }
)

const mapDispatchToProps = dispatch => (
  {
    loginFail(bool) {
      dispatch(loginFail(bool))
    }
  }
)

const LoginModalContainer = connect(mapStateToProps, mapDispatchToProps)(LoginModal)

export default LoginModalContainer
