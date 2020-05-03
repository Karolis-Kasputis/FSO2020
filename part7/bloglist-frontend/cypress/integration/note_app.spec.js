describe('Blog app', function () {
  Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', 'http://localhost:3001/api/login', {
      username: username,
      password: password,
    }).then(({ body }) => {
      localStorage.setItem('noteappUser', JSON.stringify(body))
      cy.visit('http://localhost:3000')
    })
  })

  Cypress.Commands.add('createBlog', (body) => {
    const token = JSON.parse(localStorage.getItem('noteappUser')).token
    console.log(body)
    cy.request({
      url: 'http://localhost:3001/api/blogs',
      method: 'POST',
      body: body,
      headers: {
        Authorization: `bearer ${token}`,
      },
    }).then(() => {
      cy.visit('http://localhost:3000')
    })
  })

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = { name: 'Karolis K', username: 'karolis', password: '123q' }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.get('button').contains('Login')
    cy.contains('Username')
    cy.contains('Password')
  })
  describe('Login', () => {
    it('succeeds with correct credentials', function () {
      cy.get('input:first').type('karolis')
      cy.get('input:last').type('123q')
      cy.get('#loginButton').click()
      cy.contains('logged in')
    })
    it('fails with wrong credentials', function () {
      cy.get('input:first').type('karolis')
      cy.get('input:last').type('123')
      cy.get('button').click()
      cy.get('#notification')
        .should('contain', 'Login Failed')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
  describe.only('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'karolis', password: '123q' })
      cy.createBlog({
        url: '15min.lt',
        title: 'Blog 1',
        author: 'Karolizz',
      })
      cy.createBlog({
        url: '15min.lt',
        title: 'Blog 2',
        author: 'Karolizz',
      })
      cy.createBlog({
        url: '15min.lt',
        title: 'Blog 3',
        author: 'Karolizz',
      })
    })

    it('A blog can be created', function () {
      cy.contains('New Blog').click()
      cy.get('#url').type('localhost3001')
      cy.get('#createNewBlog').get('button').contains('Create').click()

      cy.get('#blogList').contains('NEWZ SITE by Karolizz')
    })
    it('User can like a blog', function () {
      cy.contains('view').click()
      cy.contains('like').click()

      cy.contains('Likes: 1')
    })
    it('A blog can be deleted', function () {
      cy.contains('view').click()
      cy.contains('Remove').click()

      cy.get('html').should('not.contain', 'Blog 1')
    })
    it.only('Blogs are ordered by the amount of likes', function () {
      cy.contains('Blog 3')
        .contains('view')
        .click()
      cy.contains('Blog 3').contains('like').click()
      cy.contains('Blog 3').contains('like').click()
      cy.contains('Blog 3').contains('like').click()
      
      cy.get('#blog').contains('Blog 3')
  })
})