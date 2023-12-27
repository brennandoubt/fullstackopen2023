/**
 * Define frontend App component for notes app
 * part2: frontend source code
 * part3: backend source code
 * 
 */
import { useState, useEffect, useRef } from 'react'
import Note from './components/Note'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import NoteForm from './components/NoteForm'
import noteService from './services/notes'
import loginService from './services/login'

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

const App = () => {
  const [loginVisible, setLoginVisible] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [notes, setNotes] = useState([])
  
  // for keeping track of which notes should be displayed
  const [showAll, setShowAll] = useState(true)

  // implement front end for user login
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  // reference to Togglable component
  const noteFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      // saves server response with user details and token
      const user = await loginService.login({
        username, password
      })

      // save login info to web app's local storage
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  // fetching notes data from server with an effect hook
  useEffect(() => {
    // effects run after every render by default, but can be set to run after certain values have changed
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])

  // check if user info is present in local storage to keep user logged in on page re-render
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
    // log user out from console: .removeItem(key) / .clear()
  }, [])

  const toggleImportanceOf = (id) => {
    console.log(`importance of ${id} needs to be toggled`)

    const note = notes.find(n => n.id === id)
    // copy of note with 'important' property flipped
    const changedNote = { ...note, important: !note.important }

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
  }

  // false -> filter by important notes
  const notesToShow = showAll
    ? notes
    : (notes && notes.length > 1)
      ? notes
      : [notes].filter(note => note.important === true)  // === safer than == in JS


  // event triggers call to event handler function
  const addNote = (noteObject) => {
    // hide new note form after new note is created
    noteFormRef.current.toggleVisibility()
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
      })
  }

  let noteslist = (notesToShow.length === 1)
    ? [notesToShow]
    : notesToShow

  // helpers for login and note forms to conditionally render on page
  const loginForm = () => {
    // toggle login form with login/cancel buttons
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

  const noteForm = () => (
    <Togglable buttonLabel='new note' ref={noteFormRef}>
      <NoteForm createNote={addNote} />
    </Togglable>
  )

  // need key values for mapping note elements, can use their indices (note, i) but not recommended
  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {!user && loginForm()}
      {user &&
        <div>
          <p>{user.name} logged in</p>
          {noteForm()}
        </div>
      }

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
      <Footer />
    </div>
  )
}

export default App