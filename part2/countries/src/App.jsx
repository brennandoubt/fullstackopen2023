import { useState, useEffect } from "react"
import axios, { formToJSON } from 'axios'

const CountryData = ({ name, capital, area, languages, flag }) => {
  return (
    <div>
      <h2>{name}</h2>
      <div>capital {capital}</div>
      <div>area {area}</div>
      <p><b>languages:</b></p>
      <ul>
        {languages}
      </ul>
      {flag}
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchedCountry, setSearchedCountry] = useState(``)

  // RESTful API to get country data
  const baseUrl = `https://studies.cs.helsinki.fi/restcountries/`

  useEffect(() => {
    console.log('effect')

    axios
      .get(baseUrl + `api/all`)
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

  let languageData = countriesToShow.length === 1
    ? countriesToShow[0].languages
    : []

  return (
    <div>
      <p>find countries <input value={!searchedCountry ? `` : searchedCountry} onChange={handleFilterChange} /></p>
      {(countriesToShow.length === 1)
        ? <CountryData 
            name={countriesToShow[0].name.common}
            capital={countriesToShow[0].capital}
            area={countriesToShow[0].area}
            languages={[languageData].map(ls => (Object.values(ls).map(l => <li key={l}>{l}</li>)))}
            flag={countriesToShow[0].flag}
          />
        : listedCountries
      }
    </div>
  )
}

export default App