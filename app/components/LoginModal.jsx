import React from 'react'
import { Link } from 'react-router'
import { Button, Modal, Component } from 'react-bootstrap'
import { browserHistory } from 'react-router'
import Login from './Login'

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
          <Modal.Header closeButton>
            <Modal.Title className='center' id="contained-modal-title-lg"><p className='text-primary'>Login</p></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Login/>
          </Modal.Body>
          <Modal.Footer>
            <Button className='button btn btn-danger' id='closeModal' onClick={this.hideModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
