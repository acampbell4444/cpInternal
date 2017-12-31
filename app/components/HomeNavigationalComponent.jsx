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
            <Link to='/home'> <p id='navHomeText'>Home</p> </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} onSelect={e => browserHistory.push('/blogs')} id='navBlogText'>Blogs</NavItem>
            <NavDropdown eventKey={2} title="Tech Creations" id="basic-nav-dropdown">
              <MenuItem eventKey={2.1}>Random Widgets</MenuItem>
              <NavDropdown eventKey={3} title="Games" id="games-dropdown">
                <MenuItem eventKey={3.1} onSelect={e => browserHistory.push('/conways')}>Conway's Game of Life</MenuItem>
                <MenuItem eventKey={3.2} onSelect={e => browserHistory.push('/slidePuzzle')}>Slide Puzzle</MenuItem>
              </NavDropdown>

              <MenuItem eventKey={2.3}>Tech Demos</MenuItem>
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            { !user.user&&(<NavItem eventKey={4} onSelect={e => browserHistory.push('/showLoginModal')} > <p>Login</p> </NavItem>) }
            { !user.user&&(<NavItem eventKey={5} onSelect={e => browserHistory.push('/showSignUpModal')}> <p>Sign Up</p> </NavItem>) }
            { user.user&&(<WhoAmI user={user.user} />) }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}
