import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(<App />)

/*
import axios from 'axios'

// promises = asynchronous operations (pending, fulfilled, or rejected)
const promise = axios.get('http://localhost:3001/notes')

// response object contains returns data, status code, and headers from promise
promise.then(response => {
  console.log(response)
})


axios.get('http://localhost:3001/notes').then(response => {
    // data returned as a string (plain text) but axios can parse into JavaScript array since its format is JSON
    const notes = response.data 
    console.log(notes)
})
*/