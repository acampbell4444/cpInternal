import React from 'react'
import chai, {expect} from 'chai'
chai.use(require('chai-enzyme')())
import {shallow} from 'enzyme'
import {spy} from 'sinon'
chai.use(require('sinon-chai'))

import {Login} from './Login'

/* global describe it beforeEach */
describe('<Login />', () => {
  let root
  beforeEach('render the root', () =>
    root = shallow(<Login/>)
  )

  it('shows a login form', () => {
    expect(root.find('Field[name="userEmail"]')).to.have.length(1)
    expect(root.find('Field[name="password"]')).to.have.length(1)
  })

  it('has a login button', () => {
    const submit = root.find('button[type="submit"]')
    expect(submit).to.have.length(1)
  })

  describe('when submitted', () => {
    const login = spy()
    const root = shallow(<Login login={login}/>)
    const submitEvent = {
      preventDefault: spy(),
      target: {
        userEmail: {value: 'bones@example.com'},
        password: {value: '12345'},
      }
    }

    beforeEach('submit', () => {
      login.reset()
      submitEvent.preventDefault.reset()
      root.simulate('submit', submitEvent)
    })

    it('calls props.login with credentials', () => {
      expect(login).to.have.been.calledWith(
        submitEvent.target.userEmail.value,
        submitEvent.target.password.value,
      )
    })

    it('calls preventDefault', () => {
      expect(submitEvent.preventDefault).to.have.been.called
    })
  })
})
