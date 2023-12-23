/**
 * Module to handle all logging/printing
 * to console, such as uses of console.log
 * and console.error
 */

// handle printing normal messages
const info = (...params) => {
  console.log(...params)
}

// handle printing error messages
const error = (...params) => {
  console.error(...params)
}

module.exports = {
  info, error
}