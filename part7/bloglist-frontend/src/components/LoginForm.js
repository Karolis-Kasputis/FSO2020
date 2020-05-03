import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  loginCreator,
  formUsernameCreator,
  formPasswordCreator,
} from '../reducers/loginFormReducer'
import { TextField, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
const LoginForm = () => {
  const dispatch = useDispatch()
  const credentials = useSelector((store) => store.user.fields)
  const handleLogin = async (e) => {
    e.preventDefault()
    dispatch(loginCreator(credentials))
  }

  return (
    <form onSubmit={handleLogin}>
      <h1>Login to application</h1>
      <div>
        <TextField
          type='text'
          value={useSelector((store) => store.user.fields.username)}
          label='Username'
          onChange={({ target }) => dispatch(formUsernameCreator(target.value))}
        />
      </div>
      <div>
        <TextField
          type='password'
          value={useSelector((store) => store.user.fields.password)}
          label='Password'
          onChange={({ target }) => dispatch(formPasswordCreator(target.value))}
        />
      </div>
      <Button variant='contained' color='primary' type='submit'>
        Login
      </Button>
    </form>
  )
}
export default LoginForm
