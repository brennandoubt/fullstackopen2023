import Note from './components/Note'


const App = ({ notes }) => {
  // map creates new array of items mapped from items in original array
  const result = notes.map(note => note.id)
  //console.log(result)

  // need key values for mapping note elements, can use their indices (note, i) but not recommended
  return (
    <div>
      <h1>Notes</h1>
      {/* <ul>
        <li>{notes[0].content}</li>
        <li>{notes[1].content}</li>
        <li>{notes[2].content}</li>
      </ul> */}
      <ul>
        {notes.map(note =>
          <Note key={note.id} note={note} />
        )}
      </ul>
    </div>
  )
}

export default App