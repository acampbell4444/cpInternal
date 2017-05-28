import axios from 'axios'
import { browserHistory } from 'react-router'
import store from '../store'

const initState = {
  user: {},
  loginFail: false
}

const reducer = (state=initState, action) => {
  const newState = Object.assign({}, state)

  switch (action.type) {
  case AUTHENTICATED:
    newState.user = action.user
    break

  case LOGINFAIL:
    newState.loginFail = action.bool
    break

  default:
    return state
  }
  return newState
}

const AUTHENTICATED = 'AUTHENTICATED'
export const authenticated = user => ({
  type: AUTHENTICATED, user
})

const LOGINFAIL = 'LOGINFAIL'
export const loginFail = (bool) => ({
  type: LOGINFAIL, bool
})

export const login = (username, password) =>
  dispatch =>
    axios.post('/api/auth/login/local',
      {username, password})
      .then(() => dispatch(whoami()))
      .then(() => {
        const actualName = store.getState().auth.user.name
        window.alert('Welcome. ' + actualName + ' has logged in Successfully.')  // change to better looking alert
        browserHistory.goBack()
      })
      .catch(() => {
        dispatch(loginFail(true))
        dispatch(whoami())
      })

export const logout = () =>
  dispatch =>
    axios.post('/api/auth/logout')
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()))

export const whoami = () =>
  dispatch =>
    axios.get('/api/auth/whoami')
      .then(response => {
        const user = response.data
        dispatch(authenticated(user))
      })
      .catch(failed => dispatch(authenticated(null))
    )

export default reducer
