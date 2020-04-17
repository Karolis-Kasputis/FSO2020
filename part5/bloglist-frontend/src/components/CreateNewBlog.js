import React, { useState } from 'react'
import PropTypes from 'prop-types'

const CreateNewBlog = ({ handleNewBlog }) => {
  const [newBlog, setNewBlog] = useState({
    url: 'delfi.lt',
    title: 'NEWZ SITE',
    author: 'Karolizz',
  })

  const createNewBlog = (event) => {
    event.preventDefault()
    handleNewBlog(
      {
        url: newBlog.url,
        title: newBlog.title,
        author: newBlog.author,
      },
      'positive',
      `A new Blog : ${newBlog.title} by ${newBlog.author}`
    )
    setNewBlog({
      url: '',
      title: '',
      author: '',
    })
  }

  return (
    <div id='createNewBlog'>
      <h2>Create new blog:</h2>
      <form onSubmit={createNewBlog}>
        <div>
          Url :
          <input
            id='url'
            type='text'
            value={newBlog.url}
            name='url'
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, url: target.value })
            }
          />
        </div>
        <div>
          Title :
          <input
            id='title'
            type='text'
            value={newBlog.title}
            name='title'
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, title: target.value })
            }
          />
        </div>
        <div>
          Author :
          <input
            id='author'
            type='text'
            value={newBlog.author}
            name='author'
            onChange={({ target }) =>
              setNewBlog({ ...newBlog, author: target.value })
            }
          />
        </div>
        <button type='submit'>Create</button>
      </form>
    </div>
  )
}

CreateNewBlog.propTypes = {
  handleNewBlog: PropTypes.func.isRequired,
}

export default CreateNewBlog
