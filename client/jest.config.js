module.exports = {
  globals: {
    'BACKEND_URL': true
  },
  setupFilesAfterEnv: ['./setupTests.js'],
  testEnvironment: 'jsdom',
}