import React, { Component } from 'react'
import Blog from '../components/Blog'
import { connect } from 'react-redux'
import { didSignUpSucceed } from '../reducers/user'

const mapStateToProps = state => {
  const currentBlog = state.blog.currentBlog
  return {
    currentBlog
  }

}

const mapDispatchToProps = dispatch => ({})

const BlogContainer = connect(mapStateToProps, mapDispatchToProps)(Blog)

export default BlogContainer
