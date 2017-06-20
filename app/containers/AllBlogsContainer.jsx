import React, { Component } from 'react'
import { connect } from 'react-redux'
import AllBlogs from '../components/AllBlogs'
// import {  } from '../reducers/blog'

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => (
  {

  }
 )

const AllBlogsContainer = connect(mapStateToProps, mapDispatchToProps)(AllBlogs)

export default AllBlogsContainer
