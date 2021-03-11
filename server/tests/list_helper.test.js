const listHelper = require('../utils/list_helper')

const testBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

test('Dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('Total likes', () => {

  test('Empty list returns zero', () => {
    const blogs = []

    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(0)
  })

  test('Whole blog list returns correct value', () => {
    const result = listHelper.totalLikes(testBlogs)
    expect(result).toBe(36)
  })

  test('List with single blog returns correct value', () => {
    const blogs = [testBlogs[0]]

    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(7)
  })
})

describe('Favorite blog (blog with most likes)', () => {

  test('Empty list returns undefined', () => {
    const blogs = []

    const result = listHelper.favoriteBlog(blogs)
    expect(result).toBe(undefined)
  })

  test('Whole blog list returns correct blog', () => {
    const correct = testBlogs[2]

    const result = listHelper.favoriteBlog(testBlogs)
    expect(result).toEqual(correct)
  })

  test('Blog list with one blog returns the same blog', () => {
    const blogs = [testBlogs[0]]

    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(testBlogs[0])

  })
})

describe('Most blogs (number of blogs for single author)', () => {

  test('Empty list returns undefined', () => {
    const blogs = []

    const result = listHelper.mostBlogs(blogs)
    expect(result).toBe(undefined)
  })

  test('Whole blog list returns correct author and amount of blogs', () => {
    const correct = {
      author: 'Robert C. Martin',
      blogs: 3,
    }

    const result = listHelper.mostBlogs(testBlogs)
    expect(result).toEqual(correct)
  })

  test('Blog list with one blog returns the blog\'s author and amount of blogs', () => {
    const correct = {
      author: 'Michael Chan',
      blogs: 1,
    }

    const blogs = [testBlogs[0]]

    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual(correct)
  })
})

describe('Most likes (for author\'s blogs combined)', () => {

  test('Empty list returns undefined', () => {
    const blogs = []

    const result = listHelper.mostLikes(blogs)
    expect(result).toBe(undefined)
  })

  test('Whole blog list returns correct author and amount of likes', () => {
    const correct = {
      author: 'Edsger W. Dijkstra',
      likes: 17
    }

    const result = listHelper.mostLikes(testBlogs)
    expect(result).toEqual(correct)
  })

  test('Blog list with one blog returns the blog\'s author and amount of likes', () => {
    const correct = {
      author: 'Michael Chan',
      likes: 7
    }

    const blogs = [testBlogs[0]]

    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual(correct)
  })
})