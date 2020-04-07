const usersRouter = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('notes', { author: 1, url: 1, title: 1})
  res.status(200).send(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (req, res) => {
  const users = await User.find({})
  const usernames = users.map(u => u.username)
  if (usernames.includes(req.body.username)) {
    return res.status(400).json({ error: "username alraedy exists"})
  }
  
  if (req.body.password.length < 3) {
    return res.status(400).json({ error: "password is shorter than 3 letters"})
  }
  
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(req.body.password, saltRounds)
  const body = {
    name: req.body.name,
    username: req.body.username,
    passwordHash,
  }
  const user = new User(body)
  await user.save()
  res.status(201).json(user.toJSON())
})

module.exports = usersRouter