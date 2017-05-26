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
            <NavItem eventKey={1} href="/blogs">Blogs</NavItem>
            <NavDropdown eventKey={2} title="Tech Creations" id="basic-nav-dropdown">
              <MenuItem eventKey={2.1}>Random Widgets</MenuItem>
              <MenuItem eventKey={2.2}>Games</MenuItem>
              <MenuItem eventKey={2.3}>Tech Demos</MenuItem>
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={3} href="#">Link1</NavItem>
            <NavItem eventKey={4} href="#">Link2</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}
