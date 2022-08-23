const jwt = require('jsonwebtoken')
const morgan = require('morgan')
const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info(request.method, request.path, response.statusCode, request.body)

  next()
}

const tokenExtractor = (request, response, next) => {
  const auth = request.get('authorization')
  if (auth && auth.toLowerCase().startsWith('bearer')) {
    request.token = auth.substring(7)
  }
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).json({ error: 'Malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: 'invalid token' })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' })
  }

  next(error)
}

const tokenVerifier = (request, response, next) => {
  const token = request.token

  if (!token) {
    response.status(401).json({ error: 'token missing or invalid' })
    return
  }

  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!decodedToken.id) {
    response.status(401).json({ error: 'token missing or invalid' })
    return
  }

  request.verifiedToken = decodedToken
  next()
}

morgan.token('request-body', (req) => JSON.stringify(req.body))
const morganLogger = morgan(':date :method :url :status :res[content-length] - :response-time ms :request-body')

const morganMiddleware = (request, response, next) => {
  morganLogger(request, response, () => { })
  next()
}

module.exports = {
  requestLogger,
  tokenExtractor,
  unknownEndpoint,
  errorHandler,
  tokenVerifier,
  morganMiddleware,
}