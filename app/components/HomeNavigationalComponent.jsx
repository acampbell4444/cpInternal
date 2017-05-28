import React from 'react'
import {Link} from 'react-router'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Component, FormGroup, FormControl, Button } from 'react-bootstrap'
import WhoAmI from './WhoAmI'

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
            { !user.user&&(<NavItem eventKey={3}> <Link to='/showLoginModal'><p>Login</p> </Link></NavItem>) }
            { !user.user&&(<NavItem eventKey={4}> <Link to='/showSignUpModal'><p>Sign Up</p> </Link></NavItem>) }
            { user.user&&(<NavItem eventKey={5}> <WhoAmI user={user.user}/></NavItem>) }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}
