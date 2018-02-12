import React from 'react'
import {login} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { addNewWeathLogEntry } from '../reducers/weatherLog'
import store from '../store'

export class AddWLog extends React.Component {

  //const { user, initialValues } = this.props
  //const emailExists = value => !userEmailList.includes(value) ? 'Email Address Not Found. Sign Up to Create an Account.' : undefined
  render() {
  const { user , initialValues, handleLogSubmit, tacoSauce } = this.props
  console.log('h', handleLogSubmit, tacoSauce)
  console.log('p', initialValues)
  console.log('user?',user, 'initVal', initialValues)
  return (
  <form onSubmit={evt => {
    evt.preventDefault()
    console.log('fix this up')
    let user_Name = user.name
    let date = evt.target.date.value 
    let time = evt.target.time.value 
    let location = evt.target.location.value 
    let windSpeed = evt.target.windSpeed.value
    let windDirection = evt.target.windDirection.value
    let conditions = evt.target.conditions.value
    let completedEntry = { user_Name, date, time, location, windSpeed, windDirection, conditions, user_id: user.id}
    console.log('===>', completedEntry)
    return store.dispatch(addNewWeathLogEntry(completedEntry))

    //login(evt.target.userEmail.value, evt.target.password.value)
  } }>
    <Field name="date" type="string" label='Date'
      component={renderField}
      //validate={ emailExists}
    />
    <Field name="time" type="number" label='Time'
      component={renderField}
    />
    <Field name="location" type="text" label='Location'
      component={renderField}
    />
    <Field name="windSpeed" type="number" label='Wind Speed' 
      component={renderField}
    />
    <Field name="windDirection" type="text" label='Wind Direction'
      component={renderField}
    />
    <Field name="conditions" type="text" label='Conditions'
      component={renderField}
    />
    <button id='submitLoginForm' className='btn btn-success' type="submit" //disabled={!valid}
    >Submit</button>
  </form>
  )}
}

const LoginForm = reduxForm({
  form: 'AddWLog',
  enableReinitialize: true,
})(AddWLog)

export default connect(
  state => ({}),
  {login},
)(LoginForm)

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <div className='row'>
      <div><input className='loginInput' {...input} placeholder={label} type={type} />
        <div className='userSignUpErrors'>
          {touched && ((error && <span className='errWarn'>{error}</span>) || (warning && <span className='errWarn'>{warning}</span>))}
        </div>
      </div>
    </div>
  </div>
  )