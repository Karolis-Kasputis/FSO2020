const initialState = {
  url: '',
  title: '',
  author: '',
}

export const formResetCreator = () => {
  return {
    type: 'RESET',
    data: { url: '', author: '', title: '' },
  }
}

export const formUpdateCreator = (obj) => {
  return {
    type: 'UPDATE_FORM',
    data: obj,
  }
}

const blogFormReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RESET_FORM':
      return action.data
    case 'UPDATE_FORM':
      return action.data
    default:
      return state
  }
}

export default blogFormReducer
