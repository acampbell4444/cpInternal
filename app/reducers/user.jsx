import axios from 'axios'

const initState = {
  userList: [],
  didSignUpSucceed: false
}

const reducer = (state=initState, action) => {
  const newState = Object.assign({}, state)

  switch (action.type) {
  case FETCH_USER_LIST:
    newState.userList = action.list
    break

  case DID_SIGNUP_SUCCEED:
    newState.didSignUpSucceed = action.bool
    break

  default:
    return state
  }
  return newState
}

const FETCH_USER_LIST = 'FETCH_USER_LIST'
export const fetchUserList = list => ({type: FETCH_USER_LIST, list})

const DID_SIGNUP_SUCCEED = 'DID_SIGNUP_SUCCEED'
export const didSignUpSucceed = bool => ({type: DID_SIGNUP_SUCCEED, bool})

export const fetchAllUsers = () => dispatch =>
  axios.get('/api/users')
  .then((res) =>
    dispatch(fetchUserList(res.data.map(obj => ({name: obj.name, email: obj.email}))))
  )
  .catch(err => console.error(err))

export const createNewUser = (user) => dispatch =>
  axios.post('api/users', user)
  .then((res) =>
    dispatch(didSignUpSucceed(true))
  )
  .catch(err => {
    dispatch(didSignUpSucceed(false))
    return console.error(err)
  })

export default reducer
