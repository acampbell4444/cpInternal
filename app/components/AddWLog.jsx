import React from 'react'
import {login} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { addNewWeathLogEntry } from '../reducers/weatherLog'
import store from '../store'
var dateFormat = require('dateformat')
const required = value => (value ? undefined : 'Required')

export class AddWLog extends React.Component {

  //const { user, initialValues } = this.props
  //const emailExists = value => !userEmailList.includes(value) ? 'Email Address Not Found. Sign Up to Create an Account.' : undefined
  render() {
  const { user , initialValues, handleLogSubmit, valid } = this.props
  return (
  <div className='center'>
    <form onSubmit={evt => {
      evt.preventDefault()
      let user_Name = user.name
      let date = evt.target.date.value
      let time = evt.target.time.value 
      let location = evt.target.location.value 
      let windSpeed = evt.target.windSpeed.value
      let windDirection = evt.target.windDirection.value
      let conditions = evt.target.conditions.value
      let completedEntry = { user_Name, date, time, location, windSpeed, windDirection, conditions, user_id: user.id}
      return store.dispatch(addNewWeathLogEntry(completedEntry))

      //login(evt.target.userEmail.value, evt.target.password.value)
    } }>
      <Field name="date" type="date" label='Date' validate={[required]}
        component={renderField}
        //validate={ emailExists}
      />
      <Field className='col-12 wLogInput' name="time" label='Time' component='select' >
          <option value='8 am'>8 am</option>
          <option value='9 am'>9 am</option>
          <option value='10 am'>10 am</option>
          <option value='11 am'>11 am</option>
          <option value='12 pm'>12 pm</option>
          <option value='1 pm'>1 pm</option>
          <option value='2 pm'>2 pm</option>
          <option value='3 pm'>3 pm</option>
          <option value='4 pm'>4 pm</option>
          <option value='5 pm'>5 pm</option>
          <option value='6 pm'>6 pm</option>
          <option value='7 pm'>7 pm</option>
          <option value='8 pm'>8 pm</option>
      </Field>
      <Field className='col-12 wLogInput' name="location" label='Location' component='select'>
          <option value='Catalina'>Catalina</option>
          <option value='Balboa'>Balboa</option>
          <option value='Tahoe'>Tahoe</option>
          <option value='Oceanside'>Oceanside</option>
      </Field>
      <Field name="windSpeed" type="number" label='Wind Speed' validate={[required]}
        component={renderField}
      />
      <Field className='wLogInput' name="windDirection" label='Wind Direction' component='select'>
          <option value='N'>N</option>
          <option value='NE'>NE</option>
          <option value='E'>E</option>
          <option value='SE'>SE</option>
          <option value='S'>S</option>
          <option value='SW'>SW</option>
          <option value='W'>W</option>
          <option value='NW'>NW</option>
      </Field><div></div>
      <Field name="conditions" type="text" label='Conditions'
        component={renderField}
      />
      <button id='submitWLog' className='btn btn-success' type="submit" disabled={!valid}
      >Submit</button>
    </form>
  </div>
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
      <div><input className='wLogInput' {...input} placeholder={label} type={type} />
        <div className='userSignUpErrors'>
          {touched && ((error && <span className='errWarn'>{error}</span>) || (warning && <span className='errWarn'>{warning}</span>))}
        </div>
      </div>
    </div>
  </div>
  )