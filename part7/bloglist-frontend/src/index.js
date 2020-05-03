import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import { initCreator } from './reducers/blogsReducer'
import { initUsersCreator } from './reducers/userListReducer'

import store from './store'

store.dispatch(initCreator())
store.dispatch(initUsersCreator())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
