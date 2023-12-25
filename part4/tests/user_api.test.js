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
})