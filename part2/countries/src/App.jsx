import { useState, useEffect } from "react"
import axios from 'axios'

// Open Weather API key, stored in environment variable retrieved from .env file in root directory
const api_key = import.meta.env.VITE_WS_KEY
console.log(api_key)

const CountryData = ({ name, capital, area, languages, flag, tw }) => {
  //console.log(`${name}'s coords`, latlng)

  //const wait = t => new Promise()

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
      <div>temperature {tw[0]} Celsius</div>
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
        //console.log('response data:', response.data)
      })
  }, [showCountry])

  // fetch weather data
  let units = 'metric'
  const getWeatherData = () => {
    
    const latlng = showCountry.capitalInfo.latlng
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&units=${units}&appid=${api_key}`
    console.log(weatherUrl)
    const promise = axios
      .get(weatherUrl)
      .then(response => {
        //console.log(`weather response data for ${capital}`, response.data)
        const weatherdata = response.data
        const temp = weatherdata.main.temp
        const windspeed = weatherdata.wind.speed
        const weatherarr = [temp, windspeed]
        setTempwind(weatherarr)

        console.log(temp, windspeed)

        return response.data
      })
    
    return tempwind
  }

  // filter countries shown by search field input
  let countriesToShow = (countries.length > 1)
    ? countries.filter(country => country.name.common.toLowerCase().includes(searchedCountry.toLowerCase()))
    : countries
  const handleFilterChange = (event) => {
    event.preventDefault()
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

  const [tempwind, setTempwind] = useState([])

  const handleCountryView = (event) => {
    event.preventDefault()

    console.log(event.target.value, event.target, event.target.id)
    const country = countries.find(c => c.name.official === event.target.id)
    console.log(country)

    setShowCountry(country)
    const tw = getWeatherData()
    setTempwind(tw)

    return (
      (showCountry)
        ? <CountryData 
            name={showCountry.name.common}
            capital={showCountry.capital}
            area={showCountry.area}
            languages={[showCountry.languages].map(ls => (Object.values(ls).map(l => <li key={l}>{l}</li>)))}
            flag={showCountry.flag}
            tw={tw}
          />
        : []
    )
  }

  let listedCountries = []

  // limits countries listed to 10, otherwise asks user to be more specific
  listedCountries = (countriesToShow.length > 10)
  ? <div>Too many matches, specify another filter</div>
  : (countriesToShow.length > 1 && !showCountry)
    ? countriesToShow.map(country => <div key={country.name.official}>{country.name.common} <button id={country.name.official} onClick={handleCountryView}>show</button></div>)
    : []
  
  
 
  return (
    <div>
      <p>find countries <input value={searchedCountry} onChange={handleFilterChange} /></p>
      {(countriesToShow.length === 1 && !showCountry) // case for showing country on filtered search
        ? <CountryData 
            name={countriesToShow[0].name.common}
            capital={countriesToShow[0].capital}
            area={countriesToShow[0].area}
            languages={[countriesToShow[0].languages].map(ls => (Object.values(ls).map(l => <li key={l}>{l}</li>)))}
            flag={countriesToShow[0].flag}
            tw={tempwind}
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
            tw={tempwind}
          />
        : []
      }
    </div>
  )
}

export default App