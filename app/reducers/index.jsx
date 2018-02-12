import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  user: require('./user').default,
  conway: require('./conway').default,
  slidePuzzle: require('./slidePuzzle').default,
  weatherLog: require('./weatherLog').default,
  form: formReducer
})

export default rootReducer
