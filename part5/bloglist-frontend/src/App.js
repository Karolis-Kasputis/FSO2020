import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import CreateNewBlog from './components/CreateNewBlog'

const Notifications = ({ notifications }) => {
  const negativeStyle = {
    color: 'red',
    fontStyle: 'bold',
    fontSize: '30px',
    backgroundColor: '#ffcccb',
    border: '3px solid red',
    borderRadius: '15px',
    padding: '10px',
    margin: '10px',
  }
  const positiveStyle = {
    color: 'green',
    fontStyle: 'bold',
    fontSize: '30px',
    backgroundColor: '#90ee90',
    border: '3px solid green',
    borderRadius: '15px',
    padding: '6px',
    paddingLeft: '10px',
    margin: '10px',
  }
  const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max))
  }
  return notifications.map((n) => {
    if (n.type === 'positive') {
      return (
        <div id='notification' key={getRandomInt(100000)} style={positiveStyle}>
          {n.message}
        </div>
      )
    }
    if (n.type === 'negative') {
      return (
        <div id='notification' key={getRandomInt(100000)} style={negativeStyle}>
          {n.message}
        </div>
      )
    }
    return null
  })
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])
  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem('noteappUser'))
    if (user) {
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      window.localStorage.setItem('noteappUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
      newNotification('Positive', 'Logged in')
    } catch (exception) {
      newNotification('negative', 'Login Failed')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('noteappUser')
    setUser(null)
    setUsername('')
    setPassword('')
  }

  const handleNewBlog = (newBlog, notifType, notifMessage) => {
    newNotification(notifType, notifMessage)
    blogService
      .create(newBlog)
      .then((newBlog) => setBlogs(blogs.concat(newBlog)))
    newBlogFormRef.current.toggleShow()
  }

  const newNotification = (type, message) => {
    const newNotif = { type, message }
    const newArr = notifications.concat(newNotif)
    setNotifications(newArr)
    setTimeout(() => {
      setNotifications(notifications.filter((n, index) => index !== 0))
    }, 3000)
  }

  const loginForm = () => (
    // LOGIN FORM
    <form onSubmit={handleLogin}>
      <h1>Login to application</h1>
      <div>
        Username
        <input
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        Password
        <input
          type='password'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id='loginButton' type='submit'>
        Login
      </button>
    </form>
  )
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
  const blogList = () => {
    return (
      //BlogList FORM
      <div id='blogList'>
        <div>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
        </div>
        <br />
        {sortedBlogs.map((blog) => (
          <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} />
        ))}
      </div>
    )
  }
  const newBlogFormRef = React.createRef()

  const newBlogForm = () => {
    return (
      <Togglable viewText='New Blog' hideText='hide' ref={newBlogFormRef}>
        <CreateNewBlog handleNewBlog={handleNewBlog} />
      </Togglable>
    )
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notifications notifications={notifications} />
      {user === null && loginForm()}
      {user !== null && newBlogForm()}
      {user !== null && blogList()}
    </div>
  )
}

export default App
