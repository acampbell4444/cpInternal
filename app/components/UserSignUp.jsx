import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { required, maxLength15, email, minValue18 } from '../utilities/customValidations'

const SignUpForm = ({ handleSubmit, pristine, reset, submitting, valid, firstPassword, pwdMatch, noRptUserName, noRptUserEmail, didSignUpSucceed, closeSuccessBoxAndModal }) => {
  // local, custom validations
  const passwordMatch = value => pwdMatch() === value ? undefined : 'Your Paswords Do Not Match'
  const noRepeatUserName = value => noRptUserName().includes(value) ? 'That User Name Already Exists' : undefined
  const noRepeatUserEmail = value => noRptUserEmail().includes(value) ? 'That User Email Already Exists' : undefined

  return (
    <div className='center'>
      <form onSubmit={handleSubmit}>
        <Field name="username" type="text"
          component={renderField} label="Name"
          validate={ [maxLength15, required, noRepeatUserName] }
        />
        <Field name="email" type="email"
          component={ renderField } label="Email" type='email'
          validate={ [email, required, noRepeatUserEmail] }
        />
        <Field name="age" type="number"
          component={ renderField } label="Age"
          validate={ [required, minValue18] }
        />
        <Field name="createPassword" type="password"
          component={ renderField } label="Create a Password"
          validate={ [required] }
        />
        <Field name="passwordRepeat" type="password"
          component={ renderField } label="Confirm Your Password"
          validate={ [required, passwordMatch] }
        />
        <div className="userSignUpButtons">
          <button  id='submitSigninForm' className='btn btn-success' type="submit" disabled={!valid || didSignUpSucceed}>Submit</button>
          <button id='clearSignInVal' className='btn btn-warning' type="button" disabled={pristine || submitting} onClick={reset}>Clear All Input</button>
        </div>
      </form>
      <div>
        {
          didSignUpSucceed&&(
            <div className='signUpSuccess'>
              <div className="alert alert-success" onClick={closeSuccessBoxAndModal}>
                <a className="close" aria-label="close">&times;</a>
                <p className='center'>
                  <span className="glyphicon glyphicon-exclamation-sign center" aria-hidden="true"></span>
                  {' '} You Have Signed Up Successfully. Log In with your Email and Password. </p>
              </div>
            </div>
          )
        }
      </div>
    </div>
  )
}

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <div className='row'>
      <div className='col-12'><input className='signInput' {...input} placeholder={label} type={type}/>
        <div className='userSignUpErrors'>
          {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
      </div>
    </div>
  </div>
)

export default SignUpForm
