import blogService from '../services/blogs'
import { notifNewCreator } from './notificationReducer'
export const initCreator = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT',
      data: blogs,
    })
  }
}

export const newBlogCommentCreator = (id, comment) => {
  return async (dispatch) => {
    const response = await blogService.addComment(id, comment)
    dispatch({
      type: 'UPDATE_BLOG',
      data: response,
    })
  }
}

export const deleteBlogCreator = (id) => {
  return async (dispatch) => {
    try {
      await blogService.remove(id)
      dispatch({
        type: 'REMOVE_BLOG',
        id: id,
      })
    } catch {
      dispatch(notifNewCreator({ type: 'negative', message: 'Unauthorized' }))
    }
  }
}

export const updateBlogCreator = (newBlogObj) => {
  return async (dispatch) => {
    const resObj = await blogService.update(newBlogObj.id, newBlogObj)
    dispatch({
      type: 'UPDATE_BLOG',
      data: { ...resObj },
    })
  }
}

export const newBlogCreator = (newBlogObj) => {
  return async (dispatch) => {
    const createdBlog = await blogService.create(newBlogObj)
    dispatch({
      type: 'NEW_BLOG',
      data: createdBlog,
    })
  }
}

const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT':
      return action.data
    case 'NEW_BLOG':
      return [...state, action.data]
    case 'REMOVE_BLOG':
      return state.filter((blog) => (blog.id !== action.id ? blog : null))
    case 'UPDATE_BLOG':
      console.log('state', state)
      console.log('actiondata', action.data)
      return state.map((blog) =>
        blog.id === action.data.id ? action.data : blog
      )
    default:
      return state
  }
}

export default blogsReducer
