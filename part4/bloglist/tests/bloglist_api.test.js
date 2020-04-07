const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('../utils/list_helper')
const Blog = require('../models/Blog')
const User = require('../models/User')
const api = supertest(app)
const bcrypt = require('bcrypt')

beforeEach(async ()=> {
  
  await Blog.deleteMany({})
  //await User.deleteMany({})
  const mongooseBlogs = helper.blogList.map(blog => new Blog(blog))
  //const mongooseUsers = helper.userList.map(user => new User(user))
  const mongooseSaveBlogPromises =  mongooseBlogs.map(b => b.save())
  //const mongooseSaveUserPromises =  mongooseUsers.map(u => u.save())
  await Promise.all(mongooseSaveBlogPromises)
  //await Promise.all(mongooseSaveUserPromises)
})

describe('testing blogs', () => {
  describe('testing POST', () => {
    test('/api/blogs returns correct amount of blog posts in JSON', async () => {
      const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
      
      expect(response.body).toHaveLength(helper.blogList.length)
    })
    
    test('has an unique identifier id', async () => {
      const response = await api.get('/api/blogs')
      const blogs = response.body
      blogs.forEach(blog => expect(blog.id).toBeDefined())
    }) 
    
    test('POST to /api/blogs works', async () => {
      const blogObject = {
        author: "Carl Carlington",
        title: "How to fail tests",
        url: "http://www.delfi.lt",
        user: "5e8a21396fa2455467b11a55"
      }
      const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikthcm9saXMiLCJpZCI6IjVlOGEyMTM5NmZhMjQ1NTQ2N2IxMWE1NSIsImlhdCI6MTU4NjExMjE2M30.LK03unW9ZYkMkeQs4fSn1Q883NWnOCoWs-46nulpR4I"
      await api
        .post('/api/blogs')
        .set({ Authorization: token })
        .send(blogObject)
        .expect(201)
      
      const updatedBlogs = await helper.blogsInDb()
    
      expect(updatedBlogs).toHaveLength(helper.blogList.length + 1)
      const updatedBlogsTitles = updatedBlogs.map(b=> b.title)
      expect(updatedBlogsTitles).toContain(blogObject.title)
    })
    
    test('is property likes missing from request', async () => {
      const blogObject = {
        author: "Carl Carlington",
        title: "How to fail tests",
        user: "5e8a21396fa2455467b11a55"
      }
      const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikthcm9saXMiLCJpZCI6IjVlOGEyMTM5NmZhMjQ1NTQ2N2IxMWE1NSIsImlhdCI6MTU4NjExMjE2M30.LK03unW9ZYkMkeQs4fSn1Q883NWnOCoWs-46nulpR4I"
      const response = await api
        .post('/api/blogs')
        .set({ Authorization: token })
        .send(blogObject)
        .expect(400)
      expect(response.error).toBeDefined()
    })
    
    test('if a title or url missing from request backend responds with 400', async () => {
      const blogObject = { author: 'Carlos Sanchez', likes: 5, user: "5e8a21396fa2455467b11a55"}
      const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikthcm9saXMiLCJpZCI6IjVlOGEyMTM5NmZhMjQ1NTQ2N2IxMWE1NSIsImlhdCI6MTU4NjExMjE2M30.LK03unW9ZYkMkeQs4fSn1Q883NWnOCoWs-46nulpR4I"
      const response = await api
        .post('/api/blogs/')
        .set({ Authorization: token })
        .send(blogObject)
        .expect(400)
      expect(response.body.url).not.toBeDefined()
      expect(response.body.title).not.toBeDefined()
    })
    test('adding a blog fails with proper status code 401 Unauthorized it token is not provided.', async () => {
      const blogObject = { author: 'Carlos Sanchez', likes: 5, user: "5e8a21396fa2455467b11a55"}
      const token = null
      const response = await api
        .post('/api/blogs/')
        .set({ Authorization: token })
        .send(blogObject)
        .expect(401)
    })

  })
  
  
  describe('Deleting entries from the /api/blogs', () => {
    test('deleting removes an object from the DB and responds with correct status', async () => {
      const blogs = await helper.blogsInDb()
      const idToDelete = blogs[0].id
      const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikthcm9saXMiLCJpZCI6IjVlOGEyMTM5NmZhMjQ1NTQ2N2IxMWE1NSIsImlhdCI6MTU4NjExMjE2M30.LK03unW9ZYkMkeQs4fSn1Q883NWnOCoWs-46nulpR4I"
      const res = await api
        .delete(`/api/blogs/${idToDelete}`)
        .set({ Authorization: token })
        .expect(204)
  
      const blogsAfterDeletion = await helper.blogsInDb()
      expect(blogsAfterDeletion).not.toContainEqual(blogs[0])
    })
    test('deleting with incorrect id responds with 400 bad request', async () => {
      const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikthcm9saXMiLCJpZCI6IjVlOGEyMTM5NmZhMjQ1NTQ2N2IxMWE1NSIsImlhdCI6MTU4NjExMjE2M30.LK03unW9ZYkMkeQs4fSn1Q883NWnOCoWs-46nulpR4I"
      await api
        .delete('/api/blogs/b4d1d')
        .set({ Authorization: token})
        .expect(400)
    })
  
  })
  
  describe('update entry', () => {
    test('Object updates with changed properties and on success returns status 200', async () => {
      const blogs = await helper.blogsInDb()
      const blogToUpdateId = blogs[0].id
      const updateObject = { likes: 100 }
      await api
        .put(`/api/blogs/${blogToUpdateId}`)
        .send(updateObject)
        .expect(200)
      const newBlogs = await helper.blogsInDb()
      
      expect(newBlogs).toEqual(
        expect.arrayContaining([
          expect.objectContaining(updateObject)
        ])
      )
  
    })
  
    test('returns 400 on update with non valid ID', async () => {
      const blogToUpdateId = '1007bad1D'
      const updateObject = { likes: 100 }
      await api
        .put(`/api/blogs/${blogToUpdateId}`)
        .send(updateObject)
        .expect(400)
    })
  })
})


describe('/api/users new user addition', ()=> {
  test('when POST request is correct', async() => {
    const newUserObject = {
      name: "Carlozz",
      username: "CarlAss1",
      password: "curl",
    }
    const initialUsers = await helper.usersInDb()
    await api
      .post('/api/users')
      .send(newUserObject)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const usersAfterAddition = await helper.usersInDb()
    expect(usersAfterAddition).toHaveLength(initialUsers.length + 1)
  })

  describe('when POST request data is incorrect', () => {
    test('when username is too short', async () => {
      const newUserObject = {
        name: "Carl",
        username: "Ca",
        password: "curl",
      }
      const initialUsers = await helper.usersInDb()
      await api
        .post('/api/users')
        .send(newUserObject)
        .expect(400)
        .expect('Content-Type', /application\/json/)
      const afterUsers = await helper.usersInDb()
      expect(afterUsers).toHaveLength(initialUsers.length)
    })
    test('when password is too short', async () => {
      const newUserObject = {
        name: "Carl",
        username: "Carlas",
        password: "cu",
      }
      const initialUsers = await helper.usersInDb()
      await api
        .post('/api/users')
        .send(newUserObject)
        .expect(400)
      const afterUsers = await helper.usersInDb()
      expect(afterUsers).toHaveLength(initialUsers.length)
    })
    test('when username isnt given', async () => {
      const newUserObject = {
        name: "",
        username: "Carlas",
        password: "cu",
      }
      const initialUsers = await helper.usersInDb()
      await api
        .post('/api/users')
        .send(newUserObject)
        .expect(400)
      const afterUsers = await helper.usersInDb()
      expect(afterUsers).toHaveLength(initialUsers.length)
    })
    
  })
})

afterAll(() => {
  mongoose.connection.close()
})
