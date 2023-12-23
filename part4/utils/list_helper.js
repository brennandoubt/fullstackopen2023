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

// return blog with most likes
const favoriteBlog = (blogs) => {
  const firstBlog = (blogs.length !== 0) ? blogs[0] : []
  const reducedBlog = blogs.reduce((mostLiked, blog) => {
    return ((blog.likes > mostLiked.likes) ? blog : mostLiked)
  }, firstBlog)
  return reducedBlog
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}