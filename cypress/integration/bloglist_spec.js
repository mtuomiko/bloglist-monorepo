const appPort = Cypress.env('APP_PORT') // Port is set with plugin
const baseUrl = `http://localhost:${appPort}`

describe('Blog app', function () {
  beforeEach(function () {
    cy.intercept('POST', '/api/login').as('loginUser')

    cy.request('POST', `${baseUrl}/api/testing/reset`)
    const user = {
      username: 'tiinatest',
      name: 'Tiina Testeri',
      password: 'pass',
    }
    cy.request('POST', `${baseUrl}/api/users`, user)
    cy.visit(baseUrl)
  })

  it('Front page can be opened', function () {
    cy.contains('Blog app login')
  })

  it('Login fail', function () {
    cy.get('[data-cy=login-username]').type('user')
    cy.get('[data-cy=login-password]').type('notpass')
    cy.get('[data-cy=login-button]').click( { force: true })

    cy.wait('@loginUser')

    cy.contains('Login failure')
    cy.contains('logged in').should('not.exist')
  })

  describe('Logged in', function () {
    beforeEach(function () {
      cy.get('[data-cy=login-username]').type('tiinatest')
      cy.get('[data-cy=login-password]').type('pass')
      cy.get('[data-cy=login-button]').click( { force: true })

      cy.wait('@loginUser')
    })

    it('Name of the user is shown', function () {
      cy.contains('Tiina Testeri logged in')
    })

    it('Userlist contains user', function () {
      cy.contains('Users').click()
      cy.get('[data-cy=userlist-table]')
        .contains('Tiina Testeri')
    })

    it('Logout', function () {
      cy.contains('Logout').click()
      cy.contains('Logged out as tiinatest')
      cy.contains('Tiina Testeri logged in').should('not.exist')

    })

    it('Add blog, like, comment and remove', function () {
      cy.contains('Add blog').click()
      cy.get('[data-cy=blogform-title]').type('React patterns')
      cy.get('[data-cy=blogform-author]').type('Michael Chan')
      cy.get('[data-cy=blogform-url]').type('https://reactpatterns.com/')
      cy.get('[data-cy=blogform-save]').click()

      cy.contains('Added new blog: React patterns')

      cy.get('[data-cy=bloglist-table]')
        .contains('React patterns')
        .click()

      cy.contains('Michael Chan')
      cy.contains('Blog added by Tiina Testeri')
      cy.contains('https://reactpatterns.com/')

      cy.get('[data-cy=blog-like-button]').click()

      cy.contains('1 likes')

      cy.get('[data-cy=blog-like-button]').click()

      cy.contains('2 likes')

      cy.get('[data-cy=commentform-comment]').type('Best blog evah')
      cy.get('[data-cy=commentform-button]').click()

      cy.get('[data-cy=blog-commentlist-table]').contains('Best blog evah')

      cy.contains('Remove blog').click()

      cy.contains('Removed React patterns')
    })
  })
})