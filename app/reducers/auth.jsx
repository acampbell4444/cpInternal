import axios from 'axios'

const initState = {
  user: {},
  loginFail: false,
  loginDidSucceed: false
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

  case LOGIN_DID_SUCCEED:
    newState.loginDidSucceed = action.bool
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

const LOGIN_DID_SUCCEED = 'LOGIN_DID_SUCCEED'
export const loginDidSucceed = (bool) => ({
  type: LOGIN_DID_SUCCEED, bool
})

export const login = (username, password) =>
  dispatch =>
    axios.post('/api/auth/login/local',
      {username, password})
      .then(() => {
        dispatch(whoami())
        dispatch(loginDidSucceed(true))
      })
      .catch(() => {
        dispatch(loginFail(true))
        dispatch(whoami())
      })

export const logout = () =>
  dispatch =>
    axios.post('/api/auth/logout')
      .then(() => {
        dispatch(loginDidSucceed(false))
        dispatch(whoami())
      })
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
