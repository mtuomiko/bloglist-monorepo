# Full Stack Open bloglist app

Part 11 Pokedex repository found at [full-stack-open-pokedex](https://github.com/mtuomiko/full-stack-open-pokedex).

Monorepository for [Full Stack Open](https://fullstackopen.com/) course [exercise 11.21](https://fullstackopen.com/en/part11/expanding_further#exercises-11-20-11-22).

App served by Heroku at <https://morning-dusk-24998.herokuapp.com/>. Note that free Heroku dynos (containers) might take some time to start.

## Environment variables

The app uses three environment variables that need to be defined in `.env` file or some other way. The file `.env.example` contains the variable names.

`MONGODB_URI` which contains the URI for the MongoDB production database.
`TEST_MONGODB_URI` which contains the URI for the MongoDB test database.
`SECRET` which contains the secret used in signing the JSON Web Tokens generated by the backend.

## Usage

`npm install` to install dependencies.


`npm run start` starts the app in production. `express` serves the frontend content from `build/`

`npm run start:test` starts the app in `test` environment which uses the test database

`npm run start:dev-client` starts only the React frontend in development mode with `webpack`

`npm run start:dev-server` starts only the Express backend in development mode with `nodemon`

`npm run build` builds using `webpack` into `build/`

`npm run lint` run linting

`npm run test` run tests on whole project

`npm run test:client` run frontend tests

`npm run test:server` run backend tests

`npm run test:e2e` run `cypress` tests without GUI (assumes front- and backend are running in `test` environment)

`npm run cypress` runs `cypress` with GUI using `cypress open`

## Based on

Original [frontend](https://github.com/mtuomiko/full-stack-open/tree/master/part7/bloglist-frontend) and [backend](https://github.com/mtuomiko/full-stack-open/tree/master/part7/bloglist-backend)

The app structure borrows from <https://github.com/fullstack-hy2020/create-app> and <https://github.com/UniversityOfHelsinkiCS/toskaboiler>
