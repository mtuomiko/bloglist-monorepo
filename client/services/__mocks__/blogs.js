const blogs = [
  {
    id: '5da864942dfbe304b4b6f86f',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: {
      id: '5daa150887221e54b80b0e9c',
      username: 'teemutest',
      name: 'Teemu Testeri'
    },
  },
  {
    id: '5da8529b5d4f7c0ac850289a',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: {
      id: '5daa150887221e54b80b0e9c',
      username: 'teemutest',
      name: 'Teemu Testeri'
    },
  },
  {
    id: '5da852ff314e0f154c17ce67',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    user: {
      id: '5daa150887221e54b80b0e9c',
      username: 'teemutest',
      name: 'Teemu Testeri'
    },
  },
  {
    id: '5db8944a1d2e420a70e28581',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    user: {
      id: '5daa150887221e54b80b0e9c',
      username: 'teemutest',
      name: 'Teemu Testeri'
    },
  },
  {
    id: '5daa153587221e54b80b0e9d',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    user: {
      id: '5da72027c646ff13a05999ed',
      username: 'etuunarix',
      name: 'Elisa Tuunari'
    },
  },
  {
    id: '5da9e9c987221e54b80b0e98',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    user: {
      id: '5da72027c646ff13a05999ed',
      username: 'etuunarix',
      name: 'Elisa Tuunari'
    },
  },
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = () => {

}

export default { getAll, setToken }