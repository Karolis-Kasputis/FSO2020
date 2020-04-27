const Blog = require('../models/Blog')
const User = require('../models/User')

const Router = require('express').Router()

Router.post('/reset', async (req, res) => {
  console.log('evil fucktion that reset shit', 666)
  await Blog.deleteMany({})
  await User.deleteMany({})
  res.status(204).json('job well dun')
})

module.exports = Router
