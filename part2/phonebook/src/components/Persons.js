import React from 'react'
import Person from './Person'

const Persons = ({ persons, handleDelete }) => 
    persons.map(p =>(<Person key={p.name} p={p} handleDelete={handleDelete}/>))

export default Persons