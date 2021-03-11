module.exports = {
  "env": {
    "es6": true,
    "browser": true,
    "jest/globals": true,
    "node": true
  },
  "globals": {
    "BACKEND_URL": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "plugins": [
    "react", "jest",
  ],
  "rules": {
    "react/prop-types": 0
  }
}