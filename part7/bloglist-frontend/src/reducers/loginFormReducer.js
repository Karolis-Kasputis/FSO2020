import loginService from '../services/login'
import { notifNewCreator } from '../reducers/notificationReducer'
import blogService from '../services/blogs'

export const loginCreator = (credentials) => {
  return async (dispatch) => {
    try {
      const loginData = await loginService.login(credentials)
      blogService.setToken(loginData.token)
      window.localStorage.setItem('noteappUser', JSON.stringify(loginData))
      dispatch({
        type: 'USER_LOGIN',
        user: loginData,
        fields: { username: '', password: '' },
      })
      dispatch(notifNewCreator({ type: 'positive', message: 'Logged in' }))
    } catch (err) {
      dispatch(
        notifNewCreator({ type: 'negative', message: 'failed to login' })
      )
    }
  }
}

export const initUserCreator = () => {
  const user = JSON.parse(window.localStorage.getItem('noteappUser'))
  if (user) {
    blogService.setToken(user.token)
  }

  return {
    type: 'USER_LOGIN',
    user: user,
    fields: { username: '', password: '' },
  }
}

export const logoutCreator = () => {
  return (dispatch) => {
    window.localStorage.setItem('noteappUser', null)
    dispatch({
      type: 'USER_LOGOUT',
      user: null,
      fields: { username: '', password: '' },
    })
  }
}

export const formUsernameCreator = (username) => {
  return {
    type: 'FORM_USERNAME',
    data: username,
  }
}
export const formPasswordCreator = (password) => {
  return {
    type: 'FORM_PASSWORD',
    data: password,
  }
}

const initialState = { user: null, fields: { username: '', password: '' } }
const loggedInUserReducer = (
  state = initialState,
  { type, user, fields, data }
) => {
  switch (type) {
    case 'USER_LOGIN':
      return { user, fields }
    case 'USER_LOGOUT':
      return { user, fields }
    case 'FORM_USERNAME':
      return {
        ...state,
        fields: { ...state.fields, username: data },
      }
    case 'FORM_PASSWORD':
      return {
        ...state,
        fields: { ...state.fields, password: data },
      }
    default:
      return state
  }
}

export default loggedInUserReducer
