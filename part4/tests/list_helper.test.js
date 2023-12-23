/**
 * list_helper.test.js file to implement unit tests
 * for functions in list_helper.js with Jest
 */
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})