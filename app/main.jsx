'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import NotFound from './components/NotFound'

import HomeNavContainer from './containers/HomeNavContainer'
import SplashContainer from './containers/SplashContainer'
import HomeContainer from './containers/HomeContainer'
import LoginModalContainer from './containers/LoginModalContainer'
import SignUpModalContainer from './containers/SignUpModalContainer'
import WLogIndexContainer from './containers/WLogIndexContainer'

import ConwaysContainer from './containers/ConwaysContainer'
import SlidePuzzleContainer from './containers/SlidePuzzleContainer'

import PartitionContainer from './containers/PartitionContainer'

import { whoami , updateCurrentComponent} from './reducers/auth'
import { fetchAllUsers } from './reducers/user'
import { fetchWeatherLogs } from './reducers/weatherLog'

const CaliParasail = connect(
  ({ auth }) => ({ user: auth })
)(
  ({ user, children }) =>
    <div>
      <HomeNavContainer user={user}/>
      {children}
    </div>
)

const onHomeEnter = () => {
  store.dispatch(whoami())
  store.dispatch(updateCurrentComponent('home'));
}

const onWLogIndexEnter = () => {
  store.dispatch(whoami())
  store.dispatch(updateCurrentComponent('weatherLog'));
  store.dispatch(fetchWeatherLogs())
}

const onSplashEnter = () => store.dispatch(whoami())
const onUserSignUpEnter = () => store.dispatch(fetchAllUsers())
const onLoginEnter = () => store.dispatch(fetchAllUsers())
const onConwayEnter = () => store.dispatch(whoami())
const onSlidePuzzleEnter = () => store.dispatch(whoami())

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={CaliParasail}>
        <IndexRedirect to="/home" />
        <Route path="/splash" component={SplashContainer} onEnter={onSplashEnter} />
        <Route path='/weatherLog' component={WLogIndexContainer} onEnter={onWLogIndexEnter} />
        <Route path="/home" component={HomeContainer} onEnter={onHomeEnter} />
        <Route path='/showLoginModal' component={LoginModalContainer} onEnter={onLoginEnter}/>
        <Route path='/showSignUpModal' component={SignUpModalContainer} onEnter={onUserSignUpEnter} />
        <Route path='/conways' component={ConwaysContainer} onEnter={onConwayEnter} />
        <Route path='/slidePuzzle' component={SlidePuzzleContainer} onEnter={onSlidePuzzleEnter} />
        <Route path='/partition' component={PartitionContainer} />

      </Route>
      <Route path='*' component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('main')
)
