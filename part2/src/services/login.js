/**
 * Module to handle post requests sent to log in users
 * 
 * Save user login details to local storage (key-value database
 * in browser) so user stays logged in on browser refresh.
 * Local Storage is origin-specific for each web app and
 * values saved to storage are DOMstrings.
 * 
 */
import axios from 'axios'
const baseUrl = '/api/login'

const login = async credentials => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }