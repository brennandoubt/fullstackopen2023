import { useState, useEffect } from "react"
import axios from 'axios'

const Filter = () => {

}

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchedCountry, setSearchedCountry] = useState(``)

  // RESTful API to get country data
  const baseUrl = `https://studies.cs.helsinki.fi/restcountries/`

  useEffect(() => {
    console.log('effect')

    axios
      .get((searchedCountry != ``) ? (baseUrl + `api/name/${searchedCountry}`) : (baseUrl + `api/all`))
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  let countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(searchedCountry.toLowerCase()))

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    const updatedCountryName = event.target.value
    countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(updatedCountryName.toLowerCase()))
    setSearchedCountry(event.target.value)
  }

  return (
    <div>
      <p>find countries <input value={!searchedCountry ? `` : searchedCountry} onChange={handleFilterChange} /></p>
      {countriesToShow.map(country => <div key={country.name.common}>{country.name.common}</div>)}
    </div>
  )
}

export default App