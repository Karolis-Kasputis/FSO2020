import React from 'react'
import { connect } from 'react-redux'
import { voteCreator } from '../reducers/anecdoteReducer'
import { notificationCreator } from '../reducers/notificationReducer'

const AnecdoteList = ({ anecdotes, voteCreator, notificationCreator }) => {
  const vote = (anecdote) => {
    notificationCreator(`LIKED ANECDOTE: ${anecdote.content}`, 5000)
    voteCreator(anecdote)
  }

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  )
}

const mapStateToProps = ({ anecdotes, filter }) => {
  const filterAnecdotes = (anecdotes) =>
    anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )
  const sortAnecdotes = (anecdotes) =>
    anecdotes.sort((a, b) => b.votes - a.votes)
  const sortedFilteredAnecdotes = sortAnecdotes(filterAnecdotes(anecdotes))

  return {
    anecdotes: sortedFilteredAnecdotes,
  }
}

const mapDispatchToProps = {
  voteCreator,
  notificationCreator,
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
