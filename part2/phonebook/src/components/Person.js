import React from 'react'

const Person = ({ p, handleDelete }) => <div>{p.name} {p.number} <button onClick={()=>handleDelete(p)}>delete</button></div>

export default Person