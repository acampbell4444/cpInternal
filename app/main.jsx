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
import LoginModal from './components/LoginModal'

const BlogFolio = connect(
  ({ auth }) => ({ user: auth })
)(
  ({ user, children }) =>
    <div>
      <HomeNavigationalComponent user={user}/>
      {children}
    </div>
)

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={BlogFolio}>
        <IndexRedirect to="/home" />
        <Route path="/home" component={HomeContainer} />
        <Route path='/showLoginModal' component={LoginModal} />
      </Route>
      <Route path='*' component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('main')
)
