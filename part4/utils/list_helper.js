/**
 * list_helper.js file to handle helper
 * functions
 */
const dummy = (blogs) => {
  // ...
  return 1
}

// return total sum of likes in all blog posts
const totalLikes = (blogs) => {
  const sumOfLikes = blogs.reduce((sum, blog) => sum + blog.likes, 0)
  return sumOfLikes
}

module.exports = {
  dummy,
  totalLikes
}