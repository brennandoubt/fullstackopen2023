import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const Button = ({ text, handler }) => <button onClick={ handler }>{ text }</button>

const App = () => {
  const [blogs, setBlogs] = useState([])

  // implement frontend for user login
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log(`logging in with ${username} ${password}`)

    try {
      // token and user details saved to 'user'
      const user = await loginService.login({
        username, password
      })
      // store login info in local storage of web app
      window.localStorage.setItem(
        'loggedBloglistappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(`Error: exception ${exception} caught`)
    }
  }

  const handleLogout = async event => {
    event.preventDefault()
    console.log(`logging out ${username}...`)

    // remove logged user info from local storage + update user state
    window.localStorage.removeItem('loggedBloglistappUser')
    setUser(null)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  // fetch logged-in user info if present in local storage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])


  const loginForm = () => (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
  const blogList = () => (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} logged in <Button text='logout' handler={handleLogout} />
      </p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  return (
    <div>
      {!user && loginForm()}
      {user &&
        <div>
          {blogList()}
        </div>
      }
    </div>
  )
}

export default App