import React from 'react'
import Togglable from './Togglable'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, blogs, setBlogs }) => {
  const handleLikeBlog = async () => {
    const newBlogObj = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    const response = await blogService.update(blog.id, newBlogObj)
    const updatedBlogs = blogs.map((oldBlog) =>
      oldBlog.id !== blog.id
        ? oldBlog
        : { ...response, likes: response.likes + 1 }
    )
    setBlogs(updatedBlogs)
  }

  const handleRemoveBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.name}`)) {
      await blogService.remove(blog.id)
      const newBlogs = blogs.filter((b) => b.id !== blog.id)
      setBlogs(newBlogs)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  return (
    <div id='blog' style={blogStyle}>
      {blog.title} by {blog.author}
      <Togglable viewText='view' hideText='hide'>
        <div>Url: {blog.url}</div>
        <div>
          Likes: {blog.likes}{' '}
          <button type='submit' onClick={() => handleLikeBlog()}>
            like
          </button>{' '}
        </div>
        <div>Added By: {blog.user.name}</div>
        <button type='submit' onClick={() => handleRemoveBlog()}>
          Remove
        </button>
      </Togglable>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
