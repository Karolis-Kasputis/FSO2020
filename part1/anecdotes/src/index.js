import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const NextAnecdote = ({ maxAnecdotes, setSelected }) => {
    const selectRandom = () => Math.floor(Math.random()*maxAnecdotes)
    return (
        <button onClick= { () => setSelected(selectRandom())}>next</button>
    )
}

const Vote = ({ votes, setVotes, selected }) => {
    const addScore = () => {
        const newVotes = [...votes]
        newVotes[selected]++
        return setVotes(newVotes)
        }

    return (
        <>
            <button onClick= {() =>addScore()}>Vote</button> <br/>
            Current votes: {votes[selected]}
        </>
        
    )
}

const FavouriteAnecdote = ({ votes, anecdotes }) => {
    const indexOfFavourite = votes.indexOf(Math.max(...votes))
    console.log(indexOfFavourite)
    return (
        <div>
            <h1>Anecdote with the most votes</h1>
            <p>{anecdotes[indexOfFavourite]}</p>
        </div>
    )
}

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

    return (
        <div>
             {props.anecdotes[selected]} <br/>
            <NextAnecdote maxAnecdotes={anecdotes.length} setSelected={setSelected}/>
            <Vote votes={votes} setVotes={setVotes} selected={selected}/>
            <FavouriteAnecdote votes={votes} anecdotes={anecdotes}/>
        </div>
   
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)