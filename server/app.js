const express = require('express')
require('express-async-errors')
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const morgan = require('morgan')
const path = require('path')
const connectToDb = require('./utils/connect')

const app = express()

async function main() {
  await connectToDb()

  app.use(cors())
  app.use(express.json())

  morgan.token('request-body', (req) => JSON.stringify(req.body))
  app.use(morgan(':date :method :url :status :res[content-length] - :response-time ms :request-body'))

  app.use(middleware.tokenExtractor)

  // API routes
  app.use('/api/users', usersRouter)
  app.use('/api/blogs', blogsRouter)
  app.use('/api/login', loginRouter)
  if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing', testingRouter)
  }
  app.use('/api/*', middleware.unknownEndpoint)

  // Static content
  if (process.env.NODE_ENV === 'production') {
    app.get('/health', (req, res) => {
      res.send('ok')
    })
  }
  if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'test') {
    const DIST_PATH = path.resolve(__dirname, '../build')
    app.use(express.static(DIST_PATH))
    app.get('*', (request, response) => {
      response.sendFile('index.html', { root: DIST_PATH })
    })
  }

  app.use(middleware.errorHandler)
}

main()


module.exports = app