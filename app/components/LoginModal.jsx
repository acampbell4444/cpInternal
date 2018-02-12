import React from 'react'
import { browserHistory, Link } from 'react-router'
import { Button, Modal, Component } from 'react-bootstrap'
import Login from './Login'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = { show: true, errorAlertShow: true }
    this.hideModal = this.hideModal.bind(this)
    this.handleSignUpClick = this.handleSignUpClick.bind(this)
  }

  hideModal() {
    this.setState({show: false})
    this.props.loginFail(false)
    browserHistory.push('/home')
  }

  handleSignUpClick() {
    this.setState({ errorAlertShow: true })
    browserHistory.push('/showSignUpModal')
  }

  render() {
    return (
      <div>
        <Modal
          show={this.state.show}
          onHide={this.hideModal}
          bsSize="large"
          aria-labelledby="contained-modal-title-lg"
          id='loginMod'
        >
          <Modal.Header>
            <Modal.Title>
              <p id='logModHead' className='center'>Login</p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div
              onClick={ e => { this.props.loginFail(false); this.setState({ errorAlertShow: true }) } }
              className='center'
            >
              <Login userEmailList={this.props.userEmailList}/>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div>
             {
              this.props.didLoginFail&&this.state.errorAlertShow&&(
                <div className="alert alert-danger" onClick={ e => { this.setState({ errorAlertShow: false }) } }>
                  <a className="close" aria-label="close">&times;</a>
                    <p className='center'>
                    <span className="glyphicon glyphicon-exclamation-sign center" aria-hidden="true"></span>
                    {' '}Incorrect Password </p>
                </div>
              )
             }
             {
              this.props.loginDidSucceed&&(
                <div className="alert alert-success" onClick={this.hideModal}>
                  <a className="close" aria-label="close">&times;</a>
                    <p className='center'>
                    <span className="glyphicon glyphicon-exclamation-sign center" aria-hidden="true"></span>
                    {' '} Welcome {' ' + this.props.userName + '. '} You logged in Successfully. </p>
                </div>
              )
             }
             <div>
              {!this.props.loginDidSucceed&&(
                <button id='closeLoginMod' onClick={this.hideModal}> Go Back</button>
              )}
              {this.props.loginDidSucceed&&(
                <button id='enterAfterLogin' onClick={ e=> browserHistory.push('/home')}> Enter Now!</button>
              )}
            </div>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
