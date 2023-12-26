import axios from 'axios'
const baseUrl = '/api/blogs'

// private token variable
let token = null
const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  // set token to Authorization header
  const config = {
    headers: { Authorization: token }
  }
  console.log(`Creating new blog post object:\n ${newObject.toString()}`)
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

export default { getAll, create, setToken }