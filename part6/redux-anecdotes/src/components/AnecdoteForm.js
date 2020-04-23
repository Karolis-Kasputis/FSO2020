import React from 'react'
import { connect } from 'react-redux'
import { anecdoteCreator } from '../reducers/anecdoteReducer'

const NewAnecdote = ({ anecdoteCreator }) => {
  const newAnecdote = async (e) => {
    e.preventDefault()
    const anecdote = e.target.anecdote.value
    e.target.anecdote.value = ''
    anecdoteCreator(anecdote)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={newAnecdote}>
        <div>
          <input name='anecdote' />
        </div>
        <button>create</button>
      </form>
    </>
  )
}
const mapDispatchToProps = {
  anecdoteCreator,
}
export default connect(null, mapDispatchToProps)(NewAnecdote)
