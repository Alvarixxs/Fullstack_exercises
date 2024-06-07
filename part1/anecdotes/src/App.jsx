import { useState } from 'react'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      quote: 'If it hurts, do it more often.',
      votes: 0
    },
    {
      quote: 'Adding manpower to a late software project makes it later!',
      votes: 0
    },
    {
      quote: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
      votes: 0
    },
    {
      quote: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      votes: 0
    },
    {
      quote: 'Premature optimization is the root of all evil.',
      votes: 0
    },
    {
      quote: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
      votes: 0
    },
    {
      quote: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
      votes: 0
    },
    {
      quote: 'The only way to go fast, is to go well.',
      votes: 0
    }
  ])

  const [selected, setSelected] = useState(0)

  function randomize() {
    let random = Math.floor(Math.random() * anecdotes.length)
    setSelected(random)
  }

  function vote() {
    const copy = [...anecdotes]
    copy[selected].votes++
    setAnecdotes(copy)
  }

  const max = Math.max(...anecdotes.map((obj)=>obj.votes))

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected].quote}</p>
      <p>has {anecdotes[selected].votes} votes</p>
      <button onClick={vote}>vote</button>
      <button onClick={randomize}>next anecdote</button>
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes.find((obj)=>obj.votes===max).quote}</p>
    </div>
  )
}

export default App