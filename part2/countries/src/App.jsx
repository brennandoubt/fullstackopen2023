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
  const [showCountry, setShowCountry] = useState(null)

  // RESTful API to get country data
  const baseUrl = `https://studies.cs.helsinki.fi/restcountries/`

  useEffect(() => {
    console.log('effect')

    axios
      .get(showCountry ? (baseUrl + `api/name/${showCountry.name.common}`) : (baseUrl + `api/all`))
      .then(response => {
        setCountries(response.data)
        console.log('response data:', response.data)
        
      })
  }, [showCountry])

  // filter countries shown by search field input
  let countriesToShow = (countries.length > 1)
    ? countries.filter(country => country.name.common.toLowerCase().includes(searchedCountry.toLowerCase()))
    : countries
  const handleFilterChange = (event) => {
    console.log(event.target.value, showCountry, 'status')
    const updatedCountryName = event.target.value
    countriesToShow = showCountry
      ? setShowCountry(null)
      : (countries.length > 1)
        ? countries.filter(country => country.name.common.toLowerCase().includes(updatedCountryName.toLowerCase()))
        : countries
    console.log(countriesToShow, countries)
    setSearchedCountry(event.target.value)
  }

  const handleCountryView = (event) => {
    console.log(event.target.value, event.target, event.target.id)
    const country = countries.find(c => c.name.official === event.target.id)
    console.log(country)

    // filter out all other countries in list, should automatically display country's data?
    //countriesToShow = [country]
    setShowCountry(country)
  }

  let listedCountries = []

  // limits countries listed to 10, otherwise asks user to be more specific
  listedCountries = (countriesToShow.length > 10)
  ? <div>Too many matches, specify another filter</div>
  : (countriesToShow.length > 1 && !showCountry)
    ? countriesToShow.map(country => <div key={country.name.official}>{country.name.common} <button id={country.name.official} onClick={handleCountryView}>show</button></div>)
    : []
 
  let languageData = countriesToShow.length === 1
    ? countriesToShow[0].languages
    : []

  return (
    <div>
      <p>find countries <input value={searchedCountry} onChange={handleFilterChange} /></p>
      {(countriesToShow.length === 1 && !showCountry) // case for showing country on filtered search
        ? <CountryData 
            name={countriesToShow[0].name.common}
            capital={countriesToShow[0].capital}
            area={countriesToShow[0].area}
            languages={[languageData].map(ls => (Object.values(ls).map(l => <li key={l}>{l}</li>)))}
            flag={countriesToShow[0].flag}
          />
        : listedCountries
      }
      {(showCountry) // case for showing country on button click
        ? <CountryData 
            name={showCountry.name.common}
            capital={showCountry.capital}
            area={showCountry.area}
            languages={[showCountry.languages].map(ls => (Object.values(ls).map(l => <li key={l}>{l}</li>)))}
            flag={showCountry.flag}
          />
        : listedCountries
      }
    </div>
  )
}

export default App