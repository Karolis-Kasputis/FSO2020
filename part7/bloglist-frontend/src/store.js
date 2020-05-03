import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import blogReducer from './reducers/blogsReducer'
import blogFormReducer from './reducers/blogFormReducer'
import notificationReducer from './reducers/notificationReducer'
import loginFormReducer from './reducers/loginFormReducer'
import userListReducer from './reducers/userListReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
const reducer = combineReducers({
  blogs: blogReducer,
  blogForm: blogFormReducer,
  notification: notificationReducer,
  user: loginFormReducer,
  userlist: userListReducer,
})
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store
