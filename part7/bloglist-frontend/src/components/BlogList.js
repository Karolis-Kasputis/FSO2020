import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { List, ListItem, ListItemText } from '@material-ui/core'

const BlogList = () => {
  const blogs = useSelector((store) => store.blogs)
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  return (
    <List>
      {sortedBlogs.map((blog) => (
        <ListItem button divider component={Link} to={`/blogs/${blog.id}`}>
          <ListItemText primary={`${blog.title} by ${blog.author}`} />
        </ListItem>
      ))}
    </List>
  )
}

export default BlogList
