import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  formResetCreator,
  formUpdateCreator,
} from '../reducers/blogFormReducer'
import { newBlogCreator } from '../reducers/blogsReducer'
import { notifNewCreator } from '../reducers/notificationReducer'
import { Button, TextField } from '@material-ui/core'
const CreateNewBlog = () => {
  const dispatch = useDispatch()
  const form = useSelector((store) => store.blogForm)
  const createNewBlog = (event) => {
    event.preventDefault()
    dispatch(newBlogCreator(form))
    dispatch(
      notifNewCreator({
        type: 'positive',
        message: `A new blog has been created`,
      })
    )
    dispatch(formResetCreator())
  }

  return (
    <div id='createNewBlog'>
      <h2>Create new blog:</h2>
      <form onSubmit={createNewBlog}>
        <div>
          <TextField
            id='url'
            type='text'
            value={form.url}
            label='url'
            onChange={({ target }) =>
              dispatch(formUpdateCreator({ ...form, url: target.value }))
            }
          />
        </div>
        <div>
          <TextField
            id='title'
            type='text'
            value={form.title}
            label='title'
            onChange={({ target }) =>
              dispatch(formUpdateCreator({ ...form, title: target.value }))
            }
          />
        </div>
        <div>
          <TextField
            id='author'
            type='text'
            value={form.author}
            label='author'
            onChange={({ target }) =>
              dispatch(formUpdateCreator({ ...form, author: target.value }))
            }
          />
        </div>
        <Button variant='contained' color='primary' type='submit'>
          Create
        </Button>
      </form>
    </div>
  )
}

export default CreateNewBlog
