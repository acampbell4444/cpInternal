import React from 'react'
import { browserHistory, Link } from 'react-router'
import { Button, Modal, Component } from 'react-bootstrap'
import AddWLogContainer from '../Containers/AddWLogContainer'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = { show: true, errorAlertShow: true }
    this.hideModal = this.hideModal.bind(this)
    this.handleSignUpClick = this.handleSignUpClick.bind(this)
  }

  hideModal() {
    this.setState({show: false})
    browserHistory.push('/weatherLog')
  }

  handleSignUpClick() {
    this.setState({ errorAlertShow: true })
    browserHistory.push('/weatherLog')
  }

  render() {
    const { user }= this.props
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
              <p id='logModHead' className='center'>Add Weather Log Entry</p>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div>
            <AddWLogContainer user={user}></AddWLogContainer>
          </div>
          </Modal.Body>
          <Modal.Footer>
            <div>
                <button id='closeLoginMod' onClick={this.hideModal}> Go Back</button>   
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
