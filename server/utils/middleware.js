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
  }

  next(error)
}

module.exports = {
  requestLogger,
  tokenExtractor,
  unknownEndpoint,
  errorHandler
}