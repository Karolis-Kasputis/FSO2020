import React from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { newBlogCommentCreator } from '../reducers/blogsReducer'

const Comments = ({ comments }) => {
  const dispatch = useDispatch()
  const { id } = useParams()

  const handleAddComment = (e) => {
    e.preventDefault()
    const comment = e.target.querySelector('input').value
    e.target.querySelector('input').value = ''
    dispatch(newBlogCommentCreator(id, comment))
  }

  return (
    <div>
      <h2>Comments</h2>
      <form onSubmit={(e) => handleAddComment(e)}>
        <input type='text' />
        <button type='submit'>Add comment</button>
      </form>
      <ul>
        {comments.map((comment, i) => (
          <li key={i}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Comments
