module.exports = {
  'env': {
    'es6': true,
    'node': true,
    'jest': true,
    'cypress/globals': true,
  },
  'extends': 'eslint:recommended',
  'parserOptions': {
    'ecmaVersion': 2018,
  },
  'ignorePatterns': [
    '/build/',
    '/cypress/*', // Ignore autogenerated files
    '!/cypress/integration/', // Except our own files
    '!/cypress/plugins/',
  ],
  'plugins': [
    'cypress',
  ],
  'rules': {
    'indent': ['error', 2, { 'SwitchCase': 1 }],
    'quotes': ['error', 'single'],
    'semi': ['error', 'never'],
    'eqeqeq': ['error', 'always'],
    'linebreak-style': ['error', 'unix'],
    'no-trailing-spaces': 'error',
  },
}