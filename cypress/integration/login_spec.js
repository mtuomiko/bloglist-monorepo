const appPort = Cypress.env('APP_PORT') // Port is set with plugin
const baseUrl = `http://localhost:${appPort}`


it('Login request', function () {
  cy.intercept('POST', '/api/login').as('loginUser')
  cy.visit(baseUrl)

  cy.get('[data-cy=login-username]').type('foobar')
  cy.get('[data-cy=login-password]').type('foobaz')
  cy.get('[data-cy=login-button]').click()

  cy.wait('@loginUser').then((interception) => {
    cy.log(interception.response.body)
  })
})

