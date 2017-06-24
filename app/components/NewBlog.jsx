import { Field, reduxForm } from 'redux-form'
import React, { Component } from 'react';

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      file: '',
      imagePreviewUrl: ''
    }
  
    this._handleImageChange = this._handleImageChange.bind(this);
    this._handleImageSubmit = this._handleImageSubmit.bind(this);
  }

  _handleImageSubmit(e) {
    e.preventDefault()
    const { uploadImage } = this.props
    uploadImage(this.state.file)
    // TODO: do something with -> this.state.file
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  render() {


        let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    }


    const { handleSubmit, handleUploadSubmit } = this.props
    return (
      <div id="newBlogCanvas">
        <p id='newBlogHeader'>Create New Blog</p>
        <form onSubmit={handleSubmit}>
          <Field name="blogTitle" type="text" className='blogField'
                 component={renderField} label="Title"
                 // validate={ [maxLength15, required, noRepeatUserName] }
          />
          <Field name="blogContent" type="textarea" className='blogField'
                 component={ renderField } label="Content"
                 id='blogContent'
                 // validate={ [email, required, noRepeatUserEmail] }
          />
          <div>
            <button className='btn btn-success' id='submitBlog' type='submit'>Submit New Blog</button>
          </div>
        </form>
 <div>
        <form onSubmit={this._handleImageSubmit}>
          <input type="file" onChange={this._handleImageChange} />
          <button type="submit">Upload Image</button>
        </form>
        {$imagePreview}
      </div>

      </div>
    )
  }
}

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
