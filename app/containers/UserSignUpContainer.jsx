import UserSignUp from '../components/UserSignUp'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { createNewUser } from '../reducers/user'

let firstPassword, userNameList, userEmailList

const mapstateToProps = state => {
  firstPassword = state.form.UserSignUp ? state.form.UserSignUp.values ? state.form.UserSignUp.values.createPassword ? state.form.UserSignUp.values.createPassword : null : null : null
  userNameList = state.user.userList.map(obj => obj.name)
  userEmailList = state.user.userList.map(obj => obj.email)
  const didSignUpSucceed = state.user.didSignUpSucceed

  return {state, firstPassword, userNameList, didSignUpSucceed}
}

const mapDisptachToProps = (dispatch, ownProps) => (
  {
    handleSubmit(e) {
      e.preventDefault()
      const name = e.target.username.value
      const email = e.target.email.value
      const age = e.target.age.value
      const password = e.target.createPassword.value
      dispatch(createNewUser({name, email, age, password}))
    },
    pwdMatch() {
      return firstPassword
    },
    noRptUserName() {
      return userNameList
    },
    noRptUserEmail() {
      return userEmailList
    },
    closeSuccessBoxAndModal() {
      return ownProps.closeSuccessBox()
    }
  }
)

const SignUpForm = reduxForm({
  form: 'UserSignUp',
})(UserSignUp)

export default connect(mapstateToProps, mapDisptachToProps)(SignUpForm)
