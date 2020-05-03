import axios from 'axios'
const baseUrl = '/api/blogs'
// eslint-disable-next-line
let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (blogObj) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, blogObj, config)

  return response.data
}

const update = async (id, updatedObj) => {
  const noteappUser = JSON.parse(window.localStorage.getItem('noteappUser'))
  setToken(noteappUser.token)
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${id}`, updatedObj, config)
  return response.data
}

const remove = async (id) => {
  const noteappUser = JSON.parse(window.localStorage.getItem('noteappUser'))
  setToken(noteappUser.token)
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

const addComment = async (id, comment) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, {
    comments: comment,
  })
  return response.data
}

export default { getAll, setToken, create, update, remove, addComment }
