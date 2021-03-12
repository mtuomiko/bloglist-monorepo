const appPort = Cypress.env('APP_PORT') // Port is set with plugin
const baseUrl = `http://localhost:${appPort}`


it('Login request', function () {
  cy.intercept('POST', '/api/login').as('loginUser')
  cy.visit(baseUrl)

  // cy.get('[data-cy=login-username]').type('foobar')
  // cy.get('[data-cy=login-password]').type('foobaz')
  // cy.get('[data-cy=login-button]').click()

  cy.request({
    method: 'POST',
    url: '/api/login',
    body: { username: 'foobar2', password: 'foobaz2' },
    failOnStatusCode: false,
  }).then((response) => {
    cy.log(response)
  })
  // cy.wait('@loginUser').then((interception) => {
  //   cy.log(interception.response.body)
  // })
})

