import { useState, useEffect } from 'react'
import axios from 'axios'
import Entry from './components/Entry'
import List from './components/List'
import Filter from './components/Filter'
import phonebookService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])

  // for controlling form input element
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [showName, setShowName] = useState('')  // for filtering by search

  useEffect(() => {
    console.log('effect')

    phonebookService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
    
    /*
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
    */

  }, [])
  console.log('fetched', persons)

  // executes when clicking form button
  const addPerson = (event) => {
    event.preventDefault()
    
    // check if name already in phonebook
    const isNotDuplicate = persons.every(person => (person.name != newName))
    if (!isNotDuplicate) {
      const isConfirmed = confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)  // browser pop-up alert w/ template string
      if (!isConfirmed) {
        return
      }

      const person = persons.find(p => (p.name === newName))
      console.log(person, 'duplicate in phonebook here')
      const updateId = person.id

      const updatedPersonObject = {
        ...person,
        number: newNumber
      }

      phonebookService
        .update(updateId, updatedPersonObject)
        .then(returnedPerson => {
          setPersons(persons.map(p => p.name !== newName ? p : returnedPerson))
        })
        .catch(error => {
          alert(`Error occurred while trying to update number`)
        })


      //const id = -1
      //const nameAlreadyInBook = persons.reduce(p => (p.name === newName) ? p.id : id)
      //console.log(nameAlreadyInBook, id, 'checking these values')

      return
    }

    const personObject = {
      name: newName,
      number: newNumber,
    }

    /*
    // saving new phonebook entries to backend server via POST request
    axios
      .post(`http://localhost:3001/persons`, personObject)
      .then(response => {
        console.log(response)
      })
    */
    
    phonebookService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        alert(`Could not add entry`)
      })
  }
  const deletePerson = (event) => {
    event.preventDefault()
    const isConfirmed = confirm(`Delete this entry?`)
    if (!isConfirmed) {
      console.log(isConfirmed, 'boolean value')
      return
    }

    console.log('delete pressed', event.target.id)
    let copy = persons
    console.log(copy)
    const id = event.target.id
    console.log('delete id', id)

    phonebookService
      .remove(event.target.id)
      .then(response => {
        console.log(response.data)
        console.log('curr persons', persons)
        const updatedPersons = persons.filter(p => p.id != id)
        setPersons(updatedPersons)
        console.log('updated persons', updatedPersons)
      })
  }

  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  // filter people by name using search field
  let personsToShow = persons.filter(person => person.name.toLowerCase().includes(showName.toLowerCase()))

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    const updatedShowName = event.target.value
    personsToShow = persons.filter(person => person.name.toLowerCase().includes(updatedShowName.toLowerCase()))
    setShowName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter showName={showName} handleFilterChange={handleFilterChange} />
      <h2>add a new entry</h2>
      <Entry
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handlePersonChange={handlePersonChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <List personsToList={personsToShow} handleDeleteClick={deletePerson} />
    </div>
  )
}

export default App