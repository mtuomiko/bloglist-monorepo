const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const morgan = require('morgan')

const app = express()

logger.info('Connecting to MongoDB at', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch((error) => {
    logger.error.log('Error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.json())

morgan.token('request-body', (req) => JSON.stringify(req.body))
app.use(morgan(':date :method :url :status :res[content-length] - :response-time ms :request-body'))

// Using morgan for logging
//app.use(middleware.requestLogger)

app.use(middleware.tokenExtractor)

app.use('/api/users', usersRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app