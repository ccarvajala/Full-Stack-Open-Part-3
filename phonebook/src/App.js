import React, { useState, useEffect } from 'react';
import Person from "./Person";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Communication from "./Communication";
import Notification from "./Notification";
import "./style.css";

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [showAll, setShowAll] = useState(true)
  const [search, setSearch] = useState("")
  const [message,setMessage] = useState(null)

  const hook = () => {
    Communication.getAll().then(initialPersons => setPersons(initialPersons))
  }


  useEffect(hook,[])

  const addNewPerson = (event) =>
  {
    event.preventDefault()
      const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    Communication.create(personObject)
    .then(createdPerson => {
      setPersons(persons.concat(createdPerson))
      setNewName('')
      setNewNumber("")
      setMessage("success")
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    })
    .catch(error => {
      setMessage(error.response.data.error)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    })
  }

  const removePerson = (id,person) =>{
    if(window.confirm(`Delete ${person}?`))
    Communication.remove(id)
    setPersons(persons.filter(p => p.id !== id))
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameFilter = (event) => {
    setSearch(event.target.value)
    setShowAll(false)
  }

  const namesToShow = showAll ? persons : persons.filter(person => person.name.toLowerCase().startsWith(search.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Filter search = {search} handleNameFilter={handleNameFilter}/>
      <PersonForm addNewPerson={addNewPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <ul>
        {namesToShow.map((person,index) =>
        <Person key={index} person={person.name} number = {person.number} id= {person.id} removePerson={removePerson} />
        )}
      </ul>
    </div>
  )
}

export default App