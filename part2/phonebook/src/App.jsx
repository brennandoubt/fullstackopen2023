import { useState } from "react"

const Person = ({ name }) => <div>{name}</div>

const App = () => {
  const [persons, setPersons] = useState([
    {name: 'Arto Hellas'}
  ])

  // for controlling form input element
  const [newName, setNewName] = useState('')

  // executes when clicking form button
  const addPerson = (event) => {
    event.preventDefault()

    const isNotDuplicate = persons.every(person => (person.name != newName))
    console.log(isNotDuplicate);

    if (!isNotDuplicate) {
      alert(`${newName} is already added to phonebook`)  // browser pop-up alert w/ template string
      return
    }

    const personObject = {
      name: newName
    }

    setPersons(persons.concat(personObject))
    setNewName('')
  }
  const handlePersonChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePersonChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => <Person key={person.name} name={person.name} />)}
    </div>
  )
}

export default App