export const notificationCreator = (message, duration) => {
  return async (dispatch, getState) => {
    const timeoutIDinStore = getState().notification.timeoutID
    if (timeoutIDinStore) {
      clearTimeout(timeoutIDinStore)
    }
    const timeoutID = setTimeout(() => {
      dispatch({
        type: 'NO_NOTIFICATION',
        message: null,
        timeoutID: null,
      })
    }, duration)

    dispatch({
      type: 'NEW_NOTIFICATION',
      message,
      timeoutID,
    })
  }
}

const initialState = {
  message: null,
  timeoutID: null,
}
const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW_NOTIFICATION':
      return {
        message: action.message,
        timeoutID: action.timeoutID,
      }
    case 'NO_NOTIFICATION':
      return {
        message: action.message,
        timeoutID: action.timeoutID,
      }
    default:
      return state
  }
}

export default notificationReducer
