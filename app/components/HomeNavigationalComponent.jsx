import React from 'react'
import {Link} from 'react-router'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Component, FormGroup, FormControl, Button } from 'react-bootstrap'

export default function HomeNavigationalComponent() {
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
            <NavDropdown eventKey={1} title="Blog" id="basic-nav-dropdown">
              <MenuItem eventKey={1.1}>Adventure Blog</MenuItem>
              <MenuItem eventKey={1.2}>Tech Blog</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={1.3}>All Blogs</MenuItem>
            </NavDropdown>
            <NavDropdown eventKey={2} title="Tech Creations" id="basic-nav-dropdown">
              <MenuItem eventKey={2.1}>Random Widgets</MenuItem>
              <MenuItem eventKey={2.2}>Games</MenuItem>
              <MenuItem eventKey={2.3}>Tech Demos</MenuItem>
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={2} href="#">Link1</NavItem>
            <NavItem eventKey={3} href="#">Link2</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}
