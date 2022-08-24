require('dotenv').config()
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  video: false,
  screenshotOnRunFailure: false,
  e2e: {
    specPattern: 'cypress/integration/*.cy.js',
    setupNodeEvents(on, config) {
      config.env.APP_PORT = process.env.PORT || 3000

      on('task', {
        log(message) {
          console.log(message)
          return null
        }
      })

      return config
    }
  }
})
