import React from 'react'
import { Link, browserHistory } from 'react-router'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Component, FormGroup, FormControl, Button } from 'react-bootstrap'
import WhoAmI from './WhoAmI'
import { logout } from '../reducers/auth'

export default function HomeNavigationalComponent({user}) {
  return (
    <div>
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to='/home'> <p>Home</p> </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="/blogs">Blogs</NavItem>
            <NavDropdown eventKey={2} title="Tech Creations" id="basic-nav-dropdown">
              <MenuItem eventKey={2.1}>Random Widgets</MenuItem>
              <MenuItem eventKey={2.2}>Games</MenuItem>
              <MenuItem eventKey={2.3}>Tech Demos</MenuItem>
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            { !user.user&&(<NavItem eventKey={3} onSelect={e => browserHistory.push('/showLoginModal')} > <p>Login</p> </NavItem>) }
            { !user.user&&(<NavItem eventKey={4} onSelect={e => browserHistory.push('/showSignUpModal')}> <p>Sign Up</p> </NavItem>) }
            { user.user&&(<WhoAmI user={user.user} />) }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}
