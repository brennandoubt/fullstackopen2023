/**
 * Module to handle all logging/printing
 * to console, such as uses of console.log
 * and console.error
 */

// handle printing normal messages
const info = (...params) => {
  // don't print to console in test mode
  if (process.env.NODE_ENV !== 'test') {
    console.log(...params)
  }
}

// handle printing error messages
const error = (...params) => {
  // don't print when in test mode
  if (process.env.NODE_ENV !== 'test') {
    console.error(...params)
  }
}

module.exports = {
  info, error
}