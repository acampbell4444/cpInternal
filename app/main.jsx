'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import NotFound from './components/NotFound'
import HomeNavigationalComponent from './components/HomeNavigationalComponent'

import HomeContainer from './containers/HomeContainer'
import LoginModalContainer from './containers/LoginModalContainer'
import SignUpModal from './components/SignUpModal'

import { whoami } from './reducers/auth'

const BlogFolio = connect(
  ({ auth }) => ({ user: auth })
)(
  ({ user, children }) =>
    <div>
      <HomeNavigationalComponent user={user}/>
      {children}
    </div>
)

const onHomeEnter = () => store.dispatch(whoami())

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={BlogFolio}>
        <IndexRedirect to="/home" />
        <Route path="/home" component={HomeContainer} onEnter={onHomeEnter}/>
        <Route path='/showLoginModal' component={LoginModalContainer} />
        <Route path='/showSignUpModal' component={SignUpModal} />
      </Route>
      <Route path='*' component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('main')
)
