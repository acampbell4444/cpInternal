import React from 'react'
import {Link} from 'react-router'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Component, FormGroup, FormControl, Button } from 'react-bootstrap'

export default function NavigationalComponent() {
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
            <NavItem eventKey={1} href="#">Portfolio</NavItem>
            <NavDropdown eventKey={3} title="Blog" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Adventure Blog</MenuItem>
              <MenuItem eventKey={3.2}>Tech Blog</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>All Blogs</MenuItem>
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="#">Link Right</NavItem>
            <NavItem eventKey={2} href="#">Link Right</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}
