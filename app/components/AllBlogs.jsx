import React from 'react'
import { Link } from 'react-router'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = { }
  }

  render() {
    return (
      <div>
        <p>All Blogs</p>
        <Link to='/blogs/new'>
          Create a New Blog
        </Link>
      </div>
    )
  }
}
