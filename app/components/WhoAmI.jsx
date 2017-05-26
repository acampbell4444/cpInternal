import React from 'react'
import { Link } from 'react-router'

export const WhoAmI = ({ user, logout }) => (
  <div className="whoami">
    <span className="whoami-user-email">{user.user.email && user.user.email}</span>
    <a href='#' onClick={logout}>Logout </a>
  </div>
)

import {logout} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect(
  ({ auth }) => ({ user: auth }),
  {logout},
)(WhoAmI)
