/**
 * list_helper.js file to handle helper
 * functions
 * 
 * 
 */
const lodash = require('lodash') // for Exercise 4.6

const dummy = (blogs) => {
  // ...
  return 1
}

// return total sum of likes in all blog posts
const totalLikes = (blogs) => {
  const sumOfLikes = blogs.reduce((sum, blog) => sum + blog.likes, 0)
  return sumOfLikes
}

// return blog with most likes
const favoriteBlog = (blogs) => {
  const firstBlog = (blogs.length !== 0) ? blogs[0] : []
  const reducedBlog = blogs.reduce((mostLiked, blog) => {
    return ((blog.likes > mostLiked.likes) ? blog : mostLiked)
  }, firstBlog)
  return reducedBlog
}

// Exercise 4.6 problem - get author with most blogs
const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }

  const authors = blogs.map(blog => blog.author)

  // count author names by number of times mapped from blog posts
  const authorsMap = lodash.countBy(authors)

  // convert dictionary entries into a 2D array of pairs
  const authorBlogPairs = lodash.entries(authorsMap)
  
  const authorWithMostBlogs = lodash.reduce(
    authorBlogPairs,
    (mostBlogs, author) => {
      return ((author[1] > mostBlogs[1]) ? author : mostBlogs)
    }
  )
  //console.log('Author with most blogs:\n', authorWithMostBlogs)

  // return object: { author: author_name, blogs: num_blogs }
  const result = {
    author: authorWithMostBlogs[0],
    blogs: authorWithMostBlogs[1]
  }

  return result
}

// Exercise 4.7 - get author with most likes
const mostLikes = (blogs) => {
  if (blogs.length === 0) return {}
  const authorsToLikesMap = blogs.map(blog => {
    return { author: blog.author, likes: blog.likes }
  })
  //console.log('Authors to Likes Map: ', authorsToLikesMap)

  // orderBy method could be useful later
  // const orderedAuthorsMap = lodash.orderBy(
  //   authorsToLikesMap,
  //   ['author', 'likes'],
  //   ['asc', 'desc']
  // )
  // console.log('Ordered Authors Map: ', orderedAuthorsMap)

  // group author-likes object pairs under each author's name
  const groupedMap = lodash.groupBy(authorsToLikesMap, 'author')
  //console.log('Grouped Map: ', groupedMap)
  
  // calculate and store authors' total likes in list of author-likes pairs
  const summedMap = lodash.map(
    groupedMap,
    (author => {
      let name = ''
      let authorLikes = 0
      // iterate over author-likes pairs under author's name to get their total likes
      author.forEach(alpair => {
        authorLikes += alpair.likes
        if (name === '') {
          name = alpair.author
        }
      })
      return { author: name, likes: authorLikes }
    })
  )
  //console.log('Summed Map: ', summedMap)

  // finally reduce map to the author object with highest number of likes
  const authorWithMostLikes = lodash.reduce(
    summedMap,
    (mostLikes, author) => (author.likes > mostLikes.likes)
      ? author
      : mostLikes
  )
  //console.log('Author with most likes:\n', authorWithMostLikes)

  return authorWithMostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}