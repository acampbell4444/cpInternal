import React from 'react'
import {login} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'
import { Field, reduxForm } from 'redux-form'

export const Login = ({ login, userEmailList, valid }) => {
  const emailExists = value => !userEmailList.includes(value) ? 'Email Address Not Found. Sign Up to Create an Account.' : undefined

  return (
  <form onSubmit={evt => {
    evt.preventDefault()
    login(evt.target.userEmail.value, evt.target.password.value)
  } }>
    <Field name="userEmail" type="email" label='Email'
      component={renderField}
      validate={ emailExists}
    />
    <Field name="password" type="password" label='Password'
      component={renderField}
    />
    <button id='submitLoginForm' className='btn btn-success' type="submit" value="Login" disabled={!valid}>Submit</button>
  </form>
  )
}

const LoginForm = reduxForm({
  form: 'UserLogIn'
})(Login)

export default connect(
  state => ({}),
  {login},
)(LoginForm)

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <div className='row'>
      <div><input className='loginInput' {...input} placeholder={label} type={type}/>
        <div className='userSignUpErrors'>
          {touched && ((error && <span className='errWarn'>{error}</span>) || (warning && <span className='errWarn'>{warning}</span>))}
        </div>
      </div>
    </div>
  </div>
)
