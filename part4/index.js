/**
 * index.js file to handle starting application
 * 
 * Imports actual application from app.js, then
 * starts application.
 */
const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})