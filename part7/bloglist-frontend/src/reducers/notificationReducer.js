export const notifNewCreator = (obj) => {
  return async (dispatch) => {
    const id = await setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION',
      })
    }, 3000)

    dispatch({ type: 'NEW_NOTIFICATION', data: { ...obj, id: id } })
  }
}

const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'NEW_NOTIFICATION':
      console.log('state', state)

      console.log('action', action)

      if (state) {
        clearTimeout(state.id)
      }
      return action.data
    case 'REMOVE_NOTIFICATION':
      return null
    default:
      return state
  }
}

export default notificationReducer
