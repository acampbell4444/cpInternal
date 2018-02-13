import React, { Component } from 'react'
import {Link} from 'react-router'
import Splash from './Splash'


export default class Home extends Component {
  render() {
    const { user }= this.props
    return (
      <div className='container-fluid'>
        {user.user&&(
          <div>
            <div>
              <h1 id='homeTitle'>Home Screen</h1>
    
            </div>
          </div>
        )}
        {!user.user&&(
          <div>
            <Splash/>
          </div>
        )}
      </div>
    )
  }
}