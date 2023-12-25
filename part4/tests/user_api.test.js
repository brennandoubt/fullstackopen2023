/**
 * Test user API for blog list app
 * 
 * 
 */
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const testHelper = require('./test_helper')
const app = require('../app')

const api = supertest(app)
const User = require('../models/user')

describe('when there are no users in database', () => {
  beforeEach(async () => {
    await User.deleteMany({})
  })

  test('creating a new user succeeds', async () => {
    const usersAtStart = await testHelper.usersInDB()

    const newUser = {
      username: 'mruser',
      name: 'Mark Usher',
      password: 'ptest1'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await testHelper.usersInDB()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creating a user with no username/password fails correctly', async () => {
    const usersAtStart = await testHelper.usersInDB()

    const newUser = {
      name: 'James'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await testHelper.usersInDB()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('creating a user with a too short username/password fails correctly', async () => {
    const usersAtStart = await testHelper.usersInDB()

    const newUser = {
      username: 'jo',
      password: 'o1',
      name: 'Derek'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await testHelper.usersInDB()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

describe('when there is one user in the database', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('crescent', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creating a user with an already taken username fails correctly', async () => {
    const usersAtStart = await testHelper.usersInDB()

    const newUser = {
      username: 'root',
      name: 'Finch',
      password: 'lovef1'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    
    expect(result.body.error).toContain('username is already taken')

    const usersAtEnd = await testHelper.usersInDB()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
})