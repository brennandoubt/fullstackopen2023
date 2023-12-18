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

  // filter countries shown by search field input
  let countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(searchedCountry.toLowerCase()))
  const handleFilterChange = (event) => {
    console.log(event.target.value)
    const updatedCountryName = event.target.value
    countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(updatedCountryName.toLowerCase()))
    setSearchedCountry(event.target.value)
  }

  // limits countries listed to 10, otherwise asks user to be more specific
  let listedCountries = (countriesToShow.length > 10)
    ? <div>Too many matches, specify another filter</div>
    : countriesToShow.map(country => <div key={country.name.common}>{country.name.common}</div>)

  return (
    <div>
      <p>find countries <input value={!searchedCountry ? `` : searchedCountry} onChange={handleFilterChange} /></p>
      {listedCountries}
    </div>
  )
}

export default App