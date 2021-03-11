var _ = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return (blogs.length === 0)
    ? 0
    : blogs.reduce((accumulator, item) => {
      return accumulator + item.likes
    }, 0)
}

const favoriteBlog = (blogs) => {
  return (blogs.length === 0)
    ? undefined
    : blogs.reduce((favorite, item) => {
      return ((favorite.likes || 0) > item.likes)
        ? favorite
        : item
    })
}

const mostBlogs = (blogs) => {
  return (blogs.length === 0)
    ? undefined
    : _.chain(blogs)
      .countBy(blog => blog.author)
      .map((value, key) => ({
        author: key,
        blogs: value
      }))
      .maxBy('blogs')
      .value()
}

const mostLikes = (blogs) => {
  return (blogs.length === 0)
    ? undefined
    : _.chain(blogs)
      .groupBy('author')
      .map((value, key) => ({
        author: key,
        likes: value.reduce((likeSum, item) => {
          return likeSum + item.likes
        }, 0)
      }))
      .maxBy('likes')
      .value()

}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}