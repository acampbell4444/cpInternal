import UserSignUp from '../components/UserSignUp'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'

const mapstateToProps = state => {
  const firstPassword = state.form.UserSignUp ? state.form.UserSignUp.values ? state.form.UserSignUp.values.createPassword ? state.form.UserSignUp.values.createPassword : null : null : null
  return {state, firstPassword}
}

const mapDisptachToProps = dispatch => ({})

const SignUpForm = reduxForm({
  form: 'UserSignUp',
})(UserSignUp)

export default connect(mapstateToProps, mapDisptachToProps)(SignUpForm)
