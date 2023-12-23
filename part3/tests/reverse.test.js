/**
 * reverse.test.js file to implement unit tests
 * for reverse function
 * 
 * Uses Jest testing library to implement
 * test suite.
 * (npm run test) after creating a test script
 * to run tests.
 */

// import function to be tested
const reverse = require('../utils/for_testing').reverse

// define individual test cases with test function
test('reverse of a', () => {
  // perform test to generate test result
  const result = reverse('a')

  // verify correctness of test result
  expect(result).toBe('a')
})

test('reverse of react', () => {
  const result = reverse('react')

  expect(result).toBe('tcaer')
})

test('reverse of releveler', () => {
  const result = reverse('releveler')

  expect(result).toBe('releveler')
})
