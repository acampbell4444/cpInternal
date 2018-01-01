import React, { Component } from 'react'

export default class extends Component {
  render() {
    const {title, content, photoFileName} = this.props.currentBlog
    return (
      <div className='displayBlog'>
        <p>{title}</p>
        <p>{content}</p>
        <img src={'/images/'+photoFileName}
             id='uploadPicPreview'
        />
      </div>
    )
  }
}
