import { useState } from "react"

const Person = ({ name, number }) => <div>{name} {number}</div>

const App = () => {
  const [persons, setPersons] = useState([
    {name: 'Arto Hellas', number: '040-1234567'}
  ])

  // for controlling form input element
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  // executes when clicking form button
  const addPerson = (event) => {
    event.preventDefault()
    
    // check if name already in phonebook
    const isNotDuplicate = persons.every(person => (person.name != newName))
    if (!isNotDuplicate) {
      alert(`${newName} is already added to phonebook`)  // browser pop-up alert w/ template string
      return
    }

    const personObject = {
      name: newName,
      number: newNumber
    }

    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <Person key={person.name} name={person.name} number={person.number} />)}
    </div>
  )
}

export default App