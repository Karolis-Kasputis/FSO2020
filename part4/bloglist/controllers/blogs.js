const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { name: 1})
  response.json(blogs.map(b => b.toJSON()))
  })


blogsRouter.post('/',async (request, response) => {
  const body = request.body
  const token = request.token
  if (!token) {
    return response.status(401).json({ error: 'missing token'})
  }
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'invalid token'})
  }
  
  const user = await User.findById(decodedToken.id)
  if (body.title !== undefined && body.url !== undefined && user !== null) {
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      user: user._id
    })
    const savedNote = await blog.save()
    user.notes = user.notes.concat(savedNote)
    await user.save()
    response.status(201).json(savedNote.toJSON())

  } else {
    response.status(400).end()
  }
})

blogsRouter.delete(`/:id`, async (request, response) => {
  const id = request.params.id
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token && !decodedToken.id){
    return response.status(401).json({ error: "missing token or invalid"})
  }
  const blog = await Blog.findById(id)
  
  if (blog.user.toString() === decodedToken.id) {
    await Blog.findByIdAndRemove(id)
    return response.status(204).json('person  has been removed')
  }
  else response.status(401).json({ error: "no permission"})

})

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const newObject = request.body
  Blog.findByIdAndUpdate(id, newObject)
  response.status(200).end()
})
  module.exports = blogsRouter