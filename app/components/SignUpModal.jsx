import React from 'react'
import { browserHistory, Link } from 'react-router'
import { Button, Modal, Component } from 'react-bootstrap'
import Login from './Login'
import UserSignUpContainer from '../containers/UserSignUpContainer'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = { show: true }
    this.hideModal = this.hideModal.bind(this)
  }

  hideModal() {
    this.setState({show: false})
    this.props.changeLoginSuccessState()
    const {didSignUpSucc} = this.props
    if (didSignUpSucc) {
      browserHistory.push('/showLoginModal')
    } else {
      browserHistory.push('/home')
    }
  }

  render() {
    const {didSignUpSucc} = this.props
    console.log('========>',didSignUpSucc)
    return (
      <div>
        <Modal
          show={this.state.show}
          onHide={this.hideModal}
          bsSize="large"
          aria-labelledby="contained-modal-title-lg"
        >
          <Modal.Header>
            <Modal.Title>
              <div id='signModHead' className='center'>Sign Up</div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='center'>
              <UserSignUpContainer closeSuccessBox={this.hideModal} />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button id='closeLoginMod' onClick={this.hideModal}>Go Back</button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
