import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  user: require('./user').default,
  form: formReducer
})

export default rootReducer
