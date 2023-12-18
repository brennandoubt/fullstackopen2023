import { useState, useEffect } from "react"
import axios from 'axios'

// Open Weather API key, stored in environment variable retrieved from .env file in root directory
const api_key = import.meta.env.VITE_WS_KEY
console.log(api_key)

const Button = ({ id, text, handleClick }) => <button id={id} onClick={handleClick}>{text}</button>

const CountryLine = ({ name, handleShowClick }) => {
  return (
    <div>
      {name} <Button id={name} text='show' handleClick={handleShowClick} />
    </div>
  )
}

const CountryData = ({ name, capital, area, languages, flag, latlng }) => {
  //console.log(`${name}'s coords`, latlng)
  let units = 'metric'
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&units=${units}&appid=${api_key}`

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
      <h3>Weather in {capital}</h3>
      <div>temperature {} Celsius</div>
    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchedCountry, setSearchedCountry] = useState(``)
  const [showCountry, setShowCountry] = useState(null)
  const [weatherData, setWeatherData] = useState(null)

  // RESTful API to get country data
  const baseUrl = `https://studies.cs.helsinki.fi/restcountries/`

  useEffect(() => {
    console.log('effect')

    axios
      .get((baseUrl + `api/all`))
      .then(response => {
        setCountries(response.data)
        console.log('response data:', response.data)
      })
    
  }, [])

  // filter countries shown by search field input
  let countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(searchedCountry.toLowerCase()))

  const handleFilterChange = (event) => {
    setShowCountry(null)
    event.preventDefault()
    console.log(event.target.value, showCountry, '<-- status')

    const updatedCountryName = event.target.value
    countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(updatedCountryName.toLowerCase()))
    console.log(`countries to show:`, countriesToShow, countries)

    if (countriesToShow.length === 1) {
      setShowCountry(countriesToShow[0])
    }

    setSearchedCountry(event.target.value)
  }

  const handleShowCountry = (event) => {
    event.preventDefault()
    //console.log(event.target, event.target.id)

    const country = countries.find(c => c.name.common === event.target.id)
    console.log(`country to show:`, country)

    setShowCountry(country)
  }

  // limits countries listed to 10, otherwise asks user to be more specific
  let listedCountries = (countriesToShow.length > 10)
    ? <div>Too many matches, specify another filter</div>
    : countriesToShow.map(country => <CountryLine key={country.name.official} name={country.name.common} handleShowClick={handleShowCountry} />)
  
 
  return (
    <div>
      <p>find countries <input value={searchedCountry} onChange={handleFilterChange} /></p>
      {(showCountry) // case for showing country on button click or filtered search
        ? <CountryData 
            name={showCountry.name.common}
            capital={showCountry.capital}
            area={showCountry.area}
            languages={[showCountry.languages].map(ls => (Object.values(ls).map(l => <li key={l}>{l}</li>)))}
            flag={showCountry.flag}
            latlng={showCountry.capitalInfo.latlng}
          />
        : listedCountries
      }
    </div>
  )
}

export default App