/**
 * logger.js module to handle printing
 * to console, such as uses of console.log
 * and console.error
 */
const info = (...params) => {
   console.log(...params)
}

const error = (...params) => {
   console.error(...params)
}

module.exports = {
   info, error
}