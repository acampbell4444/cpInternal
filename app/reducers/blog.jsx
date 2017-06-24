import axios from 'axios'

const initState = {
}

const reducer = (state=initState, action) => {
  const newState = Object.assign({}, state)

  switch (action.type) {
  case UPDATE_LAST_BLOG:
    newState.lastBlog = action.blog
    break

  default:
    return state
  }
  return newState
}

const UPDATE_LAST_BLOG = 'UPDATE_LAST_BLOG'
export const newBlogCreated = blog => ({type: UPDATE_LAST_BLOG, blog})

export const createNewBlog = blog => dispatch =>
  axios.post('/api/blogs', blog)
  .then((res) =>
    dispatch(newBlogCreated(blog))
  )
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
