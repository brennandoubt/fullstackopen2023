/**
 * list_helper.test.js file to implement unit tests
 * for functions in list_helper.js with Jest
 * 
 * Use toBe to verify same values, toEqual
 * to verify same object properties
 */
const listHelper = require('../utils/list_helper')

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const listWithManyBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0
  }
]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has many blogs, equals all their likes combined', () => {
    const result = listHelper.totalLikes(listWithManyBlogs)
    expect(result).toBe(36)
  })
})

describe('favorite blog', () => {
  test('of empty list is an empty list', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toEqual([])
  })
  test('when list has only one blog, is that blog', () => {
    const result = listHelper.favoriteBlog(listWithOneBlog)
    expect(result).toEqual(listWithOneBlog[0])
  })
  test('when list has many blogs, is the most-liked one', () => {
    const result = listHelper.favoriteBlog(listWithManyBlogs)
    expect(result).toEqual(listWithManyBlogs[2])
  })
})

describe('author with most blogs', () => {
  test('in an empty list, equals an empty object', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toEqual({})
  })
  test('in a list with one blog, is the author of that', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    const expectedResult = {
      author: listWithOneBlog[0].author,
      blogs: 1
    }
    expect(result).toEqual(expectedResult)
  })
  test('in a list with many blogs, is calculated correctly', () => {
    const result = listHelper.mostBlogs(listWithManyBlogs)
    const expectedResult = {
      author: "Robert C. Martin",
      blogs: 3
    }
    expect(result).toEqual(expectedResult)
  })
})

describe('author with most likes', () => {
  test('in an empty list, equals an empty object', () => {
    const result = listHelper.mostLikes([])
    expect(result).toEqual({})
  })
  test('in a list with one blog, is the author of that', () => {
    const result = listHelper.mostLikes(listWithOneBlog)
    expect(result).toEqual({
      author: listWithOneBlog[0].author,
      likes: listWithOneBlog[0].likes 
    })
  })
  test('in a list with many blogs, is calculated correctly', () => {
    const result = listHelper.mostLikes(listWithManyBlogs)
    expect(result).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17
    })
  })
})