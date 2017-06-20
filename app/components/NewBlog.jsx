import React from 'react'
import { Field, reduxForm } from 'redux-form'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = { }
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <div id="newBlogCanvas">
        <p id='newBlogHeader'>New Blog</p>
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
      </div>
    )
  }
}

const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
  <div>
    <div className='row'>
      <div className='blogLabels'>{label}</div>
      <div><input {...input} type={type}/>
        <div>
          {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
      </div>
    </div>
  </div>
)
