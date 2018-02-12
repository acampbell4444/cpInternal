import React, { Component } from 'react'
import { browserHistory } from 'react-router'

export default class Splash extends Component {
  componentWillMount() {
    let { user } = this.props
    document.body.style.backgroundColor = "#2D3338"
  }

  render() {
    return (
      <div className="container-fluid">
        <h1 id='splashTitle'>California Parasail</h1> 
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6" id='loginContainer'>
            <div id='splashLogin' onClick={e => browserHistory.push('/showLoginModal')}> Log In </div>
          </div>
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6" id='signUpContainer'>
            <div id='splashSignUp' onClick={e => browserHistory.push('/showSignUpModal')}> Sign Up </div>
          </div>
        </div>
      </div>
    )
  }
}



