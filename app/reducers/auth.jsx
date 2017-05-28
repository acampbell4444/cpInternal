import axios from 'axios'

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
