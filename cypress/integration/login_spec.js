const appPort = Cypress.env('APP_PORT') // Port is set with plugin
const baseUrl = `http://localhost:${appPort}`


it('Login request', function () {
  // Global intercept
  // cy.intercept('GET', '*').as('getEverything')

  // API login intercept
  cy.intercept('POST', '/api/login').as('loginUser')

  // Reset DB
  cy.request('POST', `${baseUrl}/api/testing/reset`)
  const user = {
    username: 'tiinatest',
    name: 'Tiina Testeri',
    password: 'pass',
  }
  // Create user
  cy.request('POST', `${baseUrl}/api/users`, user)
  cy.visit(baseUrl)

  // Wait GET loads
  //cy.wait('@getEverything')
  cy.wait(10000)

  cy.get('[data-cy=login-username]').type('foobar')
  cy.wait(1000)
  cy.get('[data-cy=login-password]').type('foobaz')
  cy.wait(1000)
  cy.get('[data-cy=login-button]', { timeout: 10000 }).click()

  // cy.request({
  //   method: 'POST',
  //   url: '/api/login',
  //   body: { username: 'foobar2', password: 'foobaz2' },
  //   failOnStatusCode: false,
  // }).then((response) => {
  //   cy.log(response)
  // })
  cy.wait('@loginUser').then((interception) => {
    cy.log('logging interception')
    cy.log(interception)
  })
})

