import React, { Component } from 'react'

export default class extends Component {
  render() {
  	const { currentBlog } = this.props
  	console.log(currentBlog)
    return (
      <div className='displayBlog'>
        <p>This is Blog Display</p>
      </div>
    )
  }
}
