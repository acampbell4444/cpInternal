import axios from 'axios'

const initState = {
  allBlogs: [],
  currentBlog: {}
}

const reducer = (state=initState, action) => {
  const newState = Object.assign({}, state)

  switch (action.type) {
  case UPDATE_LAST_BLOG:
    newState.lastBlog = action.blog
    break

  case GET_ALL_BLOGS:
    newState.allBlogs = action.blogs
    break

  case GET_ONE_BLOG:
    newState.currentBlog = action.blog
    break

  default:
    return state
  }
  return newState
}

const GET_ALL_BLOGS = 'GET_ALL_BLOGS'
export const getAllBlogs = blogs => ({type: GET_ALL_BLOGS, blogs})

const GET_ONE_BLOG = 'GET_ONE_BLOG'
export const getOneBlog = blog => ({type: GET_ONE_BLOG, blog})

const UPDATE_LAST_BLOG = 'UPDATE_LAST_BLOG'
export const newBlogCreated = blog => ({type: UPDATE_LAST_BLOG, blog})

export const fetchAllBlogs = blog => dispatch =>
  axios.get('/api/blogs')
  .then((res) =>
    dispatch(getAllBlogs(res.data))
  )
  .catch(err =>
    console.error(err)
  )

export const createNewBlog = blog => dispatch =>
  axios.post('/api/blogs', blog)
  .then((res) =>
    dispatch(newBlogCreated(blog))
  )
  .catch(err =>
    console.error(err)
  )

export const fetchBlog = id => dispatch =>
  axios.get('/api/blogs/' + id)
  .then((res) => {
    dispatch(getOneBlog(res.data))
  })
  .catch(err =>
    console.error(err)
  )

export const uploadBlogPhoto = photo => dispatch => {
  const FormData = window.FormData
  const imageFormData = new FormData()
  imageFormData.append('imageFile', photo)
  axios.post('/api/blogs/photos', imageFormData)
  .then((res) =>
    console.log('photoUploaded')
  )
  .catch(err =>
    console.error(err)
  )
}

export default reducer
