import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const User = () => {
  const { id } = useParams()
  const user = useSelector(
    (store) => store.userlist.filter((user) => user.id === id)[0]
  )

  if (user) {
    return (
      <div>
        <h2>Added blogs:</h2>
        <ul>
          {user.notes.map((note, i) => (
            <li key={i}>{note.title}</li>
          ))}
        </ul>
      </div>
    )
  }
  return null
}

export default User
