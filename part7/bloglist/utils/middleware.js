const logger = require('./logger')

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  logger.info('Method:', response.method)
  logger.info('Path:  ', response.path)
  logger.info('Body:  ', response.body)
  logger.info('---')

  next()
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  switch (error.name) {
    case 'ValidationError':
      return response.status(400).json({ error: error.message })
    case 'CastError':
      return response.status(400).end()
  }
  next(error)
}
const parseAuthorizationToRequestToken = (request, response, next) => {
  const tokenFromRequest = (req) => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    }
    return null
  }
  request.token = tokenFromRequest(request)
  next()
}

module.exports = {
  requestLogger,
  errorHandler,
  parseAuthorizationToRequestToken,
}
