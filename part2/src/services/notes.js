import axios from 'axios'

/**
 * Can't change URL due to same-origin policy because
 * source HTML sent from backend server has refs unique
 * to the URL it was fetched from
 * 
 * Use CORS to enable cross-origin requests for restricted
 * resources (e.g. fonts)
 */
const baseUrl = 'http://localhost:3001/api/notes'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

export default { getAll, create, update }