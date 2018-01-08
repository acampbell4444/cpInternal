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
import SignUpModalContainer from './containers/SignUpModalContainer'
import ConwaysContainer from './containers/ConwaysContainer'
import SlidePuzzleContainer from './containers/SlidePuzzleContainer'
import AllBlogsContainer from './containers/AllBlogsContainer'
import NewBlogContainer from './containers/NewBlogContainer'
import BlogContainer from './containers/BlogContainer'
import PartitionContainer from './containers/PartitionContainer'

import { whoami } from './reducers/auth'
import { fetchAllUsers } from './reducers/user'
import { fetchAllBlogs } from './reducers/blog'

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
const onUserSignUpEnter = () => store.dispatch(fetchAllUsers())
const onLoginEnter = () => store.dispatch(fetchAllUsers())
const onConwayEnter = () => store.dispatch(whoami())
const onSlidePuzzleEnter = () => store.dispatch(whoami())
const onNewBlogEnter = () => store.dispatch(whoami())
const onBlogEnter = () => {
  store.dispatch(whoami())
  store.dispatch(fetchAllBlogs())
}

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={BlogFolio}>
        <IndexRedirect to="/home" />
        <Route path="/home" component={HomeContainer} onEnter={onHomeEnter} />
        <Route path='/showLoginModal' component={LoginModalContainer} onEnter={onLoginEnter}/>
        <Route path='/showSignUpModal' component={SignUpModalContainer} onEnter={onUserSignUpEnter} />
        <Route path='/conways' component={ConwaysContainer} onEnter={onConwayEnter} />
        <Route path='/slidePuzzle' component={SlidePuzzleContainer} onEnter={onSlidePuzzleEnter} />
        <Route path='/blogs' component={AllBlogsContainer} onEnter={onBlogEnter} />
        <Route path='/blogs/new' component={NewBlogContainer} onEnter={onNewBlogEnter} />
        <Route path='/partition' component={PartitionContainer} />
        <Route path='/blog' component={BlogContainer} />
      </Route>
      <Route path='*' component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('main')
)
