import ReactDOM from 'react-dom'
import React, { useState } from 'react'

const Button = ({text, handleClick}) => <button onClick= {handleClick}>{text}</button>

const Statistics = ({ good, neutral, bad }) => {
    
    const total =  0 + good + neutral + bad
    const average = (good + bad )/ total
    const positive = ((good / total) * 100) + '%'
    
     if (total < 1) {
         return (
            <p>No feedback given</p>
         )
     }
    return (   
        <>
        <h1>Statistics</h1>
        <table>
            <tbody>
                <Statistic name='good' value = {good}/>
                <Statistic name='neutral' value = {neutral}/>
                <Statistic name='bad' value = {bad}/>
                <Statistic name='total' value = {total}/>
                <Statistic name='average' value = {average}/>
                <Statistic name='positive' value = {positive}/>
            </tbody>
        </table>
        </>
    )
}

const Statistic = ({ name, value }) => {
    return (
        <tr>
            <td>{name}</td> 
            <td>{value}</td>
        </tr>
                   
    )
}



const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  

  return (
    <div>
        <h1> Give feedback</h1>
        <p>
            <Button text='good' handleClick = {()=> setGood(good+1)} />
            <Button text='neutral' handleClick = {()=> setNeutral(neutral+1)} />
            <Button text='bad' handleClick = {()=> setBad(bad+1)} />
        </p>
        <Statistics good={good} neutral={neutral} bad={bad}/>
   
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)