import React from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, blogs, setBlogs, handleLikeBlog }) => {
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
    <div style={blogStyle}>
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

export default Blog
