import axios from 'axios'
import { browserHistory } from 'react-router'

const initState = {
  allWeatherLogs: [],
  lastLog: {}
}

const reducer = (state=initState, action) => {
  const newState = Object.assign({}, state)

  switch (action.type) {
  case GET_ALL_WEATHERLOGS:
    newState.allWeatherLogs = action.allWeatherLogs
    break

  case UPDATE_LAST_LOG:
    newState.lastLog = action.log
    break

  default:
    return state
  }
  return newState
}

const GET_ALL_WEATHERLOGS = 'GET_ALL_WEATHERLOGS'
export const getAllLogs = allWeatherLogs => ({
  type: GET_ALL_WEATHERLOGS, allWeatherLogs
})

const UPDATE_LAST_LOG = 'UPDATE_LAST_LOG'
export const updateLastLog = log => ({
  type: UPDATE_LAST_LOG, log
})

export const fetchWeatherLogs = () =>
  dispatch =>
    axios.get('/api/weatherLogs')
      .then(response => {
        console.log('res', response)
        const logs = response.data
        dispatch(getAllLogs(logs))
      })
      .catch(failed => console.log(failed)
    )


export const addNewWeathLogEntry = (logEntry) =>
  dispatch =>
    axios.post('/api/weatherLogs', logEntry)
      .then(() => {
        dispatch(updateLastLog(logEntry))
        browserHistory.push('/weatherLog')
      })
      .catch(() => {
        browserHistory.push('/weatherLog')
      })

// export const logout = () =>
//   dispatch =>
//     axios.post('/api/auth/logout')
//       .then(() => {
//         dispatch(loginDidSucceed(false))
//         dispatch(whoami())
//         browserHistory.push('/home')
//       })
//       .catch(() => dispatch(whoami()))

// export const whoami = () =>
//   dispatch =>
//     axios.get('/api/auth/whoami')
//       .then(response => {
//         const user = response.data
//         dispatch(authenticated(user))
//       })
//       .catch(failed => dispatch(authenticated(null))
//     )

export default reducer
