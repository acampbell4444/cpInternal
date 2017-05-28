import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { required, maxLength15, email, minValue18 } from '../utilities/customValidations'

const SignUpForm = (props) => {
  const { handleSubmit, pristine, reset, submitting, valid, firstPassword } = props

  const passwordMatch = value => value !== firstPassword ? `Passwords Do Not Match` : undefined

  return (
    <form onSubmit={handleSubmit}>
      <Field name="username" type="text"
        component={renderField} label="Name"
        validate={ [maxLength15, required] }
      />
      <Field name="email" type="email"
        component={ renderField } label="Email" type='email'
        validate={ [email, required] }
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
        component={ renderField } label="Re-Enter Your Password"
        validate={ [required, passwordMatch] }
      />
      <div>
        <button className='btn btn-success' type="submit" disabled={!valid}>Submit</button>
        <button className='btn btn-warning' type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
      </div>
    </form>
  )
}

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <div>
      <input {...input} placeholder={label} type={type}/>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)

export default SignUpForm
