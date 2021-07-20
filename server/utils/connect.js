const mongoose = require('mongoose')
const config = require('./config')
const logger = require('./logger')

const connectToDb = async () => {
  logger.info('Connecting to MongoDB at', config.MONGODB_URI)

  try {
    await mongoose.connect(config.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    })
    logger.info('Connected to MongoDB')
  } catch (error) {
    logger.error('Error connecting to MongoDB:', error.message)
  }
}

module.exports = connectToDb