const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})

  const saltRounds = 10
  const userObjectsPromiseArray = helper.testUsers.map(async user => {
    const passwordHash = await bcrypt.hash(user.password, saltRounds)
    return new User({
      username: user.username,
      name: user.name,
      passwordHash,
    })
  })

  const userObjects = await Promise.all(userObjectsPromiseArray)

  const promiseArray = userObjects.map(user => user.save())
  await Promise.all(promiseArray)
})

describe('GET users', () => {
  test('Returns correct amount of users', async () => {
    const response = await api.get('/api/users')
    expect(response.body.length).toBe(helper.testUsers.length)
  })
})

describe('POST user', () => {
  test('User count increases and new user is found', async () => {
    const newUser = {
      username: 'uusikayttaja',
      name: 'Uusi Kayttaja',
      password: 'sallisalasana',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(helper.testUsers.length + 1)

    // Password hashes are not returned
    const noIdUsers = usersAtEnd.map(user => ({
      username: user.username,
      name: user.name,
    }))

    const newUserNoPassword = {
      username: newUser.username,
      name: newUser.name,
    }
    expect(noIdUsers).toContainEqual(newUserNoPassword)
  })

  test('Too short username results in 400 Bad Request with username validation error msg', async () => {
    const newInvalidUser = {
      username: 'tt',
      name: 'Tiina Tuunari',
      password: 'salli',
    }

    const blogsAtStart = await helper.blogsInDb()

    const reply = await api
      .post('/api/users')
      .send(newInvalidUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(reply.body.error).toContain('User validation failed: username: Path `username`')
    expect(reply.body.error).toContain('is shorter than the minimum allowed length (3).')

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtStart.length).toBe(blogsAtEnd.length)
  })

  test('Too short password results in 400 Bad Request with password invalid error msg', async () => {
    const newInvalidUser = {
      username: 'ttuunari',
      name: 'Tiina Tuunari',
      password: 'sa'
    }

    const blogsAtStart = await helper.blogsInDb()

    const reply = await api
      .post('/api/users')
      .send(newInvalidUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(reply.body.error).toContain('password invalid, must be at least 3 chars long')

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtStart.length).toBe(blogsAtEnd.length)

  })

  test('User without username results in HTTP 400 with error msg', async () => {
    const newInvalidUser = {
      name: 'Tiina Tuunari',
      password: 'salasana'
    }

    const blogsAtStart = await helper.blogsInDb()

    const reply = await api
      .post('/api/users')
      .send(newInvalidUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(reply.body.error).toContain('User validation failed: username: Path `username` is required.')

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtStart.length).toBe(blogsAtEnd.length)
  })

  test('User without password results in HTTP 400 with error msg', async () => {
    const newInvalidUser = {
      username: 'ttuunari',
      name: 'Tiina Tuunari',
    }

    const blogsAtStart = await helper.blogsInDb()

    const reply = await api
      .post('/api/users')
      .send(newInvalidUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(reply.body.error).toContain('password invalid, must be at least 3 chars long')

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtStart.length).toBe(blogsAtEnd.length)
  })

  test('Nonunique username results in HTTP 400 with error msg', async () => {
    const newNonUniqueUser = {
      username: 'teemutest',
      name: 'Teemu Testeri',
      password: 'pass',
    }

    const blogsAtStart = await helper.blogsInDb()

    const reply = await api
      .post('/api/users')
      .send(newNonUniqueUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(reply.body.error).toContain('User validation failed: username: Error, expected `username` to be unique. Value:')

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtStart.length).toBe(blogsAtEnd.length)
  })


})

afterAll(() => {
  mongoose.connection.close()
})