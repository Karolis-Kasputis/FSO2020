import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateBlogCreator, deleteBlogCreator } from '../reducers/blogsReducer'
import { useParams } from 'react-router-dom'
import Comments from './Comments'

const Blog = () => {
  const { id } = useParams()
  const blog = useSelector(
    (store) => store.blogs.filter((blog) => blog.id === id)[0]
  )

  const dispatch = useDispatch() // Returns a reference to dispatch function in the !!<--store!!
  const handleLikeBlog = () => {
    const newBlogObj = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    dispatch(updateBlogCreator(newBlogObj))
  }
  const handleRemoveBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlogCreator(blog.id))
    }
  }

  const blogStyle = {
    padding: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  if (!blog) {
    return null
  }

  return (
    <div>
      <div id='blog' style={blogStyle}>
        <h2>{blog.title}</h2>
        <a href={blog.url}>{blog.url}</a>
        <div>
          {blog.likes} Likes{' '}
          <button onClick={() => handleLikeBlog()}> Like</button>
        </div>
        <div>Added by {blog.author}</div>
        <button type='submit' onClick={() => handleRemoveBlog()}>
          Remove blog
        </button>
      </div>
      <Comments comments={blog.comments} />
    </div>
  )
}

export default Blog
