import userService from '../services/users'

export const initUsersCreator = () => {
  return async (dispatch) => {
    const users = await userService.getAll()
    dispatch({
      type: 'INIT_USERS',
      users: users,
    })
  }
}

const userListReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_USERS':
      return action.users
    default:
      return state
  }
}

export default userListReducer
