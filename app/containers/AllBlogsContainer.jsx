import React, { Component } from 'react'
import { connect } from 'react-redux'
import AllBlogs from '../components/AllBlogs'
import { fetchBlog } from '../reducers/blog'

const mapStateToProps = state => {
  const allBlogs = state.blog.allBlogs
  return {
    allBlogs
  }
}

const mapDispatchToProps = dispatch => (
  {
    handleBlogClick(id) {
      dispatch(fetchBlog(id))
    },
  }
 )

const AllBlogsContainer = connect(mapStateToProps, mapDispatchToProps)(AllBlogs)

export default AllBlogsContainer
