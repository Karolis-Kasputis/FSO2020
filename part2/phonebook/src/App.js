import React, { useState, useEffect } from 'react'
import phonebook from './services/phonebook'

const Filter = ({ search, handleSearch }) => {
  return (
    <form>
        <div>
          search: <input value={search} onChange={handleSearch} />
        </div>
      </form>
  )

}

const PersonForm = ({ newName, handleName, newNumber, handleNumber, handleAdd }) => {
  return (
    <form>
        <div>
          name: <input value={newName} onChange={handleName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumber} />
        </div>
        <div>
          <button type="submit" onClick={handleAdd}>add</button>
        </div>
    </form>
  )
}

const Persons = ({ persons, handleDelete }) => 
    persons.map(p =>(<Person key={p.name} p={p} handleDelete={handleDelete}/>))
  

const Person = ({ p, handleDelete }) => <div>{p.name} {p.number} <button onClick={()=>handleDelete(p)}>delete</button></div>
   
const Notification = ({ notification, setNotification }) => {
  const negativeStyle= {
    color: 'red',
    fontStyle: 'bold',
    fontSize: '30px',
    backgroundColor: '#ffcccb',
    border: '3px solid red',
    borderRadius: '15px',
    padding: '10px',
    margin: '10px'
  }

  const positiveStyle= {
    color: 'green',
    fontStyle: 'bold',
    fontSize: '30px',
    backgroundColor: '#90ee90',
    border: '3px solid green',
    borderRadius: '15px',
    padding: '6px', 
    paddingLeft: '10px',
    margin: '10px'
  }
  if (notification === null)
    return <div></div>
  
  else if (notification.type === 'positive') 
    return <div style={positiveStyle}>{notification.message}</div>
    
  else if (notification.type === 'negative')
      return <div style={negativeStyle}>{notification.message}</div>
    

}

const App = () => {
  
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('Arto Hellz')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search , setSearch ] = useState('')
  const [ notification, setNotification ] = useState(null)

const handleName= (e) => setNewName(e.target.value)
const handleNumber = (e) => setNewNumber(e.target.value)
const handleSearch = (e) => setSearch(e.target.value)

const handleUpdate = (id, newPerson) => {
  phonebook.update(id, newPerson)
  .then(()=>{
    phonebook.getAll()
    .then(r => setPersons(r))
  })
}

const handleDelete = (p) => {
  if (window.confirm(`do you really want to delete ${p.name}?`)){
    phonebook.remove(p.id).then(r => {
      if (r.status === 204) {
        console.log(r)
        setPersons(persons.filter(person=>person.id !== p.id))
        setNotification({type: 'positive', message: 'Person has been deleted.'})
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      }
    })
    .catch(err => {
        console.log(err)
        setPersons(persons.filter(person=>person.id !== p.id))
        setNotification({type: 'negative', message: 'Person had already been deleted.'})
        setTimeout(() => {
        setNotification(null)
        }, 5000)
      }
    )

    
      
  
  }
  else console.log('keke')

}
const handleAdd = (e) => {
  e.preventDefault()
  
  const newPerson =  {
    name: newName,
    number: newNumber
  }

  if ( persons.some( (person) => (person.name === newName)))
    if (window.confirm( `${newName} is already added to phonebook, reaplce the old number with a new one?`)){
      const personToUpdate = persons.find(p => p.name === newName)
      handleUpdate(personToUpdate.id, newPerson)
      setNotification({type: 'positive', message: 'Number has been changed.'})
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
    else {setNotification({type: 'positive', message: 'Number has been changed.'})
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } 
  else  {   
      phonebook.create(newPerson)
        .then( p => {
            setPersons(persons.concat(p))
            setNotification({type: 'positive', message: 'A person has been added'})
            setTimeout(() => {
              setNotification(null)
            }, 5000);
        }
        )
        .catch(err => {
          console.log(err)
        })
    }   
}
  
const filterPersons = (personsData) => (personsData.filter(p=> p.name.toLowerCase().includes(search.toLowerCase())))

useEffect(() => {
    phonebook.getAll()
    .then(data => setPersons(data))
  },[])

filterPersons(persons)
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} handleSearch={handleSearch} />
      <h2>Add a new</h2>
      <PersonForm newName={newName} handleName={handleName} newNumber={newNumber} handleNumber={handleNumber} handleAdd={handleAdd} />
      <h2>Numbers</h2>
      <Persons persons={filterPersons(persons)} handleDelete={handleDelete} />
      <Notification notification={notification} setNotification={setNotification} />
    </div>
  )
}

export default App