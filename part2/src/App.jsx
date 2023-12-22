/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'
import noteService from './services/notes'

// eslint-disable-next-line react/prop-types
const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }
  return (
    <div style={footerStyle}>
      <br />
      <em>Note app, Department of Computer Science, University of Helsinki 2023</em>
    </div>
  )
}
/*
<Note
    key={note.id}
    note={note}
    toggleImportance={() => toggleImportanceOf(note.id)
*/

const App = (props) => {
  const [errorMessage, setErrorMessage] = useState(null)

  const [notes, setNotes] = useState([])

  // for storing user-submitted input in form
  const [newNote, setNewNote] = useState('')
  
  // for keeping track of which notes should be displayed
  const [showAll, setShowAll] = useState(true)

  // fetching notes data from server with an effect hook
  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])   // effects run after every render by default, but can be set to run after certain values have changed

  const toggleImportanceOf = (id) => {
    console.log(`importance of ${id} needs to be toggled`)  // template string

    const note = notes.find(n => n.id === id)  // finds note to modify and assigns it to 'note' variable
    const changedNote = { ...note, important: !note.important }  // make a copy of the note but with its important property flipped

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {  // error handling for when promise is "rejected"
        setErrorMessage(
          `Note '${note.content}' was already deleted from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })

    /*
    // PUT request sent to backend to replace note data, then component's notes state set to new array containing the updated version of note
    axios.put(url, changedNote).then(response => {
      setNotes(notes.map(n => n.id !== id ? n : response.data))
    })
    */
  }
  
  // conditional operator ?: condition true = val1, condition false = val2
  const val1 = 1
  const val2 = 2
  const condition = true

  // true -> val1
  const result = condition ? val1 : val2

  // false -> filter by important notes
  const notesToShow = showAll
    ? notes
    : (notes && notes.length > 1)
      ? notes
      : [notes].filter(note => note.important === true)  // === safer than == in JS


  // event triggers call to event handler function
  const addNote = (event) => {
    event.preventDefault()  // default action would reload page (+ other stuff)
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }

    /*
    // note object sent to the server
    axios
      .post('http://localhost:3001/notes', noteObject)
      .then(response => {
        console.log(response)

        // then updated on the browser
        setNotes(notes.concat(response.data))
        setNewNote('')
      })
    */
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })

    //setNotes(notes.concat(noteObject))
    //setNewNote('')
  }

  console.log(`notes to show:\n ${JSON.stringify(notesToShow)}, notes:\n ${JSON.stringify(notes)} `)
  let noteslist = (notesToShow.length === 1)
    ? [notesToShow]
    : notesToShow

  console.log(`notes list: ${JSON.stringify(noteslist)}`)

  const handleNoteChange = (event) => {
    console.log(event.target.value)  // no default action occurs on input change, unlike form submission
    setNewNote(event.target.value)
  }

  // need key values for mapping note elements, can use their indices (note, i) but not recommended
  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      {/* <ul>
        <li>{notes[0].content}</li>
        <li>{notes[1].content}</li>
        <li>{notes[2].content}</li>
      </ul> */}
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {showAll
          ? noteslist.map(n => <Note key={n.id} note={n} toggleImportance={() => toggleImportanceOf(n.id)} />)
          : noteslist.filter(n => (n.important)).map(n => <Note key={n.id} note={n} toggleImportance={() => toggleImportanceOf(n.id)} />)}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  )
}

export default App