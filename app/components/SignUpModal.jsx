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
    browserHistory.goBack()
  }

  render() {
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
              <div className='center'>Sign Up</div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className='center'>
              <UserSignUpContainer />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button className='button btn btn-danger' onClick={this.hideModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
