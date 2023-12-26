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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}