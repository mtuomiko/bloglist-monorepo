const appPort = Cypress.env('APP_PORT') // Port is set with plugin
const baseUrl = `http://localhost:${appPort}`


it('Can login', function () {
  cy.intercept('POST', '/api/login').as('loginUser')
  cy.intercept('GET', '/api/blogs').as('getBlogs')
  cy.intercept('GET', '/api/users').as('getUsers')

  cy.request('POST', `${baseUrl}/api/testing/reset`)
  const user = {
    username: 'tiinatest',
    name: 'Tiina Testeri',
    password: 'pass',
  }
  cy.request('POST', `${baseUrl}/api/users`, user)
  cy.visit(baseUrl)

  cy.wait('@getBlogs')
  cy.wait('@getUsers')

  cy.get('[data-cy=login-username]').type('tiinatest')
  cy.get('[data-cy=login-password]').type('pass{enter}')

  cy.wait('@loginUser')

  cy.contains('logged in')
  cy.contains('Login failure').should('not.exist')
})

