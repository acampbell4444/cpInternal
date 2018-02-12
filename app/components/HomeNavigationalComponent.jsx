import React from 'react'
import { Link, browserHistory } from 'react-router'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Component, FormGroup, FormControl, Button } from 'react-bootstrap'
import WhoAmI from './WhoAmI'
import { logout } from '../reducers/auth'

export default class HomeNavigationalComponent extends React.Component {
  componentDidMount() {
  }
  componentWillUnmount() {
  }
  render() {
    const { user, currentComponent } = this.props
    return (
      <div>
        <Navbar inverse collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to='/home'> <p id={'navHomeText' + (currentComponent==='home')}>Home</p> </Link>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
          <Nav>
            {user&&(
              <NavItem eventKey={1} onSelect={e => browserHistory.push('/weatherLog')} 
                      id={'navWeathLogText' + (currentComponent==='weatherLog')}>Weather Logs
              </NavItem>
            )}
          </Nav>
          <Nav pullRight>
              { !user&&(<NavItem eventKey={4} onSelect={e => browserHistory.push('/showLoginModal')} > <p>Login</p> </NavItem>) }
              { !user&&(<NavItem eventKey={5} onSelect={e => browserHistory.push('/showSignUpModal')}> <p>Sign Up</p> </NavItem>) }
              { user&&(<WhoAmI user={user} />) }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )}
}
