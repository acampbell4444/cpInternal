import React from 'react'
import { Link } from 'react-router'
import { NavItem, NavDropdown, MenuItem } from 'react-bootstrap'

export const WhoAmI = ({ user, logout }) => (
  <NavDropdown eventKey={5} title={user.user && user.user.name + '  '} id="basic-nav-dropdown">
    <MenuItem eventKey={5.1}>Manage Your Account</MenuItem>
    <MenuItem eventKey={5.2} onSelect={logout}> <span>LogOut</span> </MenuItem>
  </NavDropdown>
)

import {logout} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect(
  ({ auth }) => ({ user: auth }),
  {logout},
)(WhoAmI)
