import anecdoteService from '../services/anecdotes'

export const anecdoteCreator = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    console.log(newAnecdote)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: { ...newAnecdote, votes: 0 },
    })
  }
}

export const voteCreator = (anecdote) => {
  return async (dispatch) => {
    const likedAnecdote = await anecdoteService.update({
      ...anecdote,
      votes: anecdote.votes + 1,
    })
    dispatch({
      type: 'VOTE',
      data: { id: likedAnecdote.id },
    })
  }
}

export const initializationCreator = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    case 'VOTE':
      const updatedVotes = state.map((anecdote) =>
        anecdote.id === action.data.id
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      )
      return updatedVotes
    default:
      return state
  }
}

export default reducer
