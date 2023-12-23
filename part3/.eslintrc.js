module.exports = {
  'env': {
    'node': true,
    'commonjs': true,
    'es2021': true,
    'jest': true
  },
  'extends': 'eslint:recommended',
  'parserOptions': {
    'ecmaVersion': 'latest'
  },
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ],
    // check if equality is checked with === operator
    'eqeqeq': 'error',
    // no trailing spaces at end of lines
    'no-trailing-spaces': 'error',
    // always a space before/after curly braces
    'object-curly-spacing': [
      'error', 'always'
    ],
    // consistent whitespace use in arrow function parameters
    'arrow-spacing': [
      'error', { 'before': true, 'after': true }
    ],
    // disable no-console rule about console.log
    'no-console': 0
  }
}
