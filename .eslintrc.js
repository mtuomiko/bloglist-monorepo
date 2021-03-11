module.exports = {
  "env": {
    "es6": true,
    "node": true,
    "jest": true,
    "cypress/globals": true,
  },
  "extends": 'eslint:recommended',
  "parserOptions": {
    "ecmaVersion": 9,
  },
  "ignorePatterns": [
    '/build/',
    '/cypress/',
    '!/cypress/integration/',
  ],
  "plugins": [
    "cypress",
  ]
}