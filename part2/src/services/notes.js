/**
 * Can't change URL due to same-origin policy because
 * source HTML sent from backend server has refs unique
 * to the URL it was fetched from
 * 
 * Use CORS to enable cross-origin requests for restricted
 * resources (e.g. fonts)
 * 
 * (npm run build) at root of frontend project to create
 * production build of app in 'dist' directory
 * 
 * (cp -r dist ../[backend_directory_name]) on Linux/Mac to copy frontend 
 * production build to root of backend
 * 
 * Use 'static' middleware from Express in backend to
 * make express show static content, such as page
 * 'index.html' and JavaScript, etc.
 * 
 * Use relative URL path without declaring server if
 * frontend and backend are at same address, then make
 * new production build of frontend and copy to root
 * of backend. App can now be used from backend address
 * http://localhost:3001.
 */
import axios from 'axios'
const baseUrl = '/api/notes' // connect frontend to backend

// user auth token to attach to post requests for new notes
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
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default { getAll, create, update, setToken }