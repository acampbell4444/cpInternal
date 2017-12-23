import { Field, reduxForm } from 'redux-form'
import React, { Component } from 'react'
import {connect} from 'react-redux'
import { maxLength15, required } from '../utilities/customValidations'

export class AddBlog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      file: '',
      imagePreviewUrl: ''
    }
    this._handleImageChange = this._handleImageChange.bind(this)
    this._handleImageSubmit = this._handleImageSubmit.bind(this)
  }

  _handleImageSubmit(e) {
    e.preventDefault()
    const { uploadImage } = this.props
    uploadImage(this.state.file)
  }

  _handleImageChange(e) {
    e.preventDefault()
    const FileReader = window.FileReader
    const reader = new FileReader()
    const file = e.target.files[0]
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      })
    }

    reader.readAsDataURL(file)
  }

  render() {
    const {imagePreviewUrl} = this.state
    let $imagePreview = null
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl}
                        id='uploadPicPreview'
                      />)
    }

    const { handleSubmit, handleUploadSubmit, valid } = this.props
    return (
      <div id="newBlogCanvas">
        <p id='newBlogHeader'>Create New Blog</p>
        <form onSubmit={handleSubmit}>
          <Field name="blogTitle" type="text" className='blogField'
                 component={renderField} label="Title"
                 validate={ [maxLength15, required] }
          />
          <Field name="blogContent" type="textarea" className='blogField'
                 component={ renderField } label="Content"
                 id='blogContent'
                 validate={ [required] }
          />
          <div>
            <form onSubmit={this._handleImageSubmit}>
            <input type="file" onChange={this._handleImageChange} />
            <button type="submit">Upload Image</button>
            </form>
          </div>
          <div>
            {$imagePreview}
          </div>
          <div>
            <button className='btn btn-success' 
                    id='submitBlog' 
                    type='submit' 
                    disabled={!valid}>Submit New Blog 
            </button>
          </div>
        </form>
      </div>
    )
  }
}

const BlogForm = reduxForm({
  form: 'AddBlog'
})(AddBlog)

export default connect(
  state => ({}),
  {AddBlog},
)(BlogForm)

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div className='blogRender'>
    {
      label==='Title'&&(
        <div>
        <div className='blogLabels'>{label}</div>
          <input {...input} type={ type }/>
          {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
      )
    }
    {
      label==='Content'&&(
        <div>
        <div className='blogLabels'>{label}</div>
          <textarea {...input} type={ type }/>
          {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
      )
    }
  </div>
)
