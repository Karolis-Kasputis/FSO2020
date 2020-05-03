import React, { useEffect } from 'react'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'
import CreateNewBlog from './components/CreateNewBlog'
import UserList from './components/UserList'
import Blog from './components/Blog'
import Nav from './components/Nav'
import { useDispatch, useSelector } from 'react-redux'
import { initUserCreator } from './reducers/loginFormReducer'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Container from '@material-ui/core/Container'
const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((store) => store.user.user)
  useEffect(() => {
    dispatch(initUserCreator())
  }, [dispatch])
  const newBlogFormRef = React.createRef()

  return (
    <Container maxWidth='md' style={{ backgroundColor: '#cfe8fc' }}>
      <Router>
        <Nav />
        <h1>
          Blogs app
          <Notification />
        </h1>

        <div>
          <Switch>
            <Route path='/users'>
              <UserList />
            </Route>
            <Route path='/bloglist'>
              {user !== null && (
                <Togglable
                  viewText='New Blog'
                  hideText='hide'
                  ref={newBlogFormRef}
                >
                  <CreateNewBlog />
                </Togglable>
              )}
              {user !== null && <BlogList />}
            </Route>
            <Route path='/blogs/:id'>
              <Blog />
            </Route>
            <Route path='/'>{user === null && <LoginForm />}</Route>
          </Switch>
        </div>
        <footer>
          <h5>THIS AWESOME SITE HAS BEEN MADE BY KAROLIZ</h5>
        </footer>
      </Router>
    </Container>
  )
}

export default App
