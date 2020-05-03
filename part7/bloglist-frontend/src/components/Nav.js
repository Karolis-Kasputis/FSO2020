import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutCreator } from '../reducers/loginFormReducer'
import { AppBar, Toolbar, IconButton, Button } from '@material-ui/core'

const Nav = () => {
  const dispatch = useDispatch()
  const user = useSelector((store) => store.user.user)
  return (
    <AppBar position='static'>
      <Toolbar>
        <IconButton edge='start' color='inherit' aria-label='menu'></IconButton>
        <Button color='inherit' component={Link} to='/users'>
          Users
        </Button>
        <Button color='inherit' component={Link} to='/bloglist'>
          Bloglist
        </Button>
        {user !== null ? (
          <div style={{ textAlign: 'right' }}>
            <em>logged in as {user.name}</em>
            <Button
              color='inherit'
              component={Link}
              to='/'
              onClick={() => dispatch(logoutCreator())}
            >
              logout
            </Button>
          </div>
        ) : (
          <Button color='inherit' component={Link} to='/login'>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}
export default Nav
