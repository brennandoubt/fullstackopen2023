import { useState } from 'react'
import Note from './components/Note'


const App = (props) => {
  // map creates new array of items mapped from items in original array
  //const result = notes.map(note => note.id)

  const [notes, setNotes] = useState(props.notes)

  // for storing user-submitted input in form
  const [newNote, setNewNote] = useState('')
  
  // for keeping track of which notes should be displayed
  const [showAll, setShowAll] = useState(true)

  
  // conditional operator ?: condition true = val1, condition false = val2
  const val1 = 1
  const val2 = 2
  const condition = true

  // true -> val1
  const result = condition ? val1 : val2

  // false -> filter by important notes
  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)  // === safer than == in JS


  // event triggers call to event handler function
  const addNote = (event) => {
    event.preventDefault()  // default action would reload page (+ other stuff)
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1
    }

    setNotes(notes.concat(noteObject))
    setNewNote('')
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value)  // no default action occurs on input change, unlike form submission
    setNewNote(event.target.value)
  }

  // need key values for mapping note elements, can use their indices (note, i) but not recommended
  return (
    <div>
      <h1>Notes</h1>
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
        {notesToShow.map(note =>
          <Note key={note.id} note={note} />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default App