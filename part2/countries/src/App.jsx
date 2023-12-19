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

const CountryData = ({ country, weatherdata, imglink }) => {
  const countryObject = country[0]
  console.log(`weather data for ${countryObject.name.common}`, weatherdata)

  const name = countryObject.name.common
  const capital = countryObject.capital
  const area = countryObject.area
  const languages = [countryObject.languages].map(ls => (Object.values(ls).map(l => <li key={l}>{l}</li>)))
  //const flag = countryObject.flag

  const temp = weatherdata ? weatherdata.main.temp : '#'
  const wind = weatherdata ? weatherdata.wind.speed : '#'
  console.log(`${name} temp:`, temp, `${name} windspeed:`, wind)

  const flagUrl = countryObject.flags.png

  return (
    <div>
      <h2>{name}</h2>
      <div>capital {capital}</div>
      <div>area {area}</div>
      <p><b>languages:</b></p>
      <ul>
        {languages}
      </ul>
      <img src={flagUrl} />
      <h3>Weather in {capital}</h3>
      <div>temperature {temp} Celsius</div>
      <img src={imglink} />
      <div>wind {wind} m/s</div>

    </div>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchedCountry, setSearchedCountry] = useState(``)
  const [showCountry, setShowCountry] = useState(false)
  const [weatherData, setWeatherData] = useState(false)
  const [imglink, setimglink] = useState(``)

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
      .catch(error => {
        alert(`Error fetching countries data`)
      })
    
  }, [])

  // using second effect hook that runs each time the single country view updates to generate weather report for new country
  useEffect(() => {
    console.log('effect2')
    let units = 'metric'

    if (showCountry) {
      const latlng = showCountry.capitalInfo.latlng
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&units=${units}&appid=${api_key}`
      console.log(weatherUrl)

      axios
        .get(weatherUrl)
        .then(response => {
          console.log(`weather response data:`, response.data)
          const wdata = response.data
          const iconUrl = `https://openweathermap.org/img/wn/${wdata.weather[0].icon}@2x.png`
          setimglink(iconUrl)
          setWeatherData(response.data)
        })
        .catch(error => {
          alert(`Error fetching weather data`)
        })
    }

  }, [showCountry])

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

  const handleShowClick = (event) => {
    //console.log(event.target, event.target.id)

    const country = countries.find(c => c.name.common === event.target.id)
    console.log(`country to show:`, country)

    setShowCountry(country)
  }

  // limits countries listed to 10, otherwise asks user to be more specific
  let listedCountries = (countriesToShow.length > 10)
    ? <div>Too many matches, specify another filter</div>
    : countriesToShow.map(country => <CountryLine key={country.name.official} name={country.name.common} handleShowClick={handleShowClick} />)
  
 
  return (
    <div>
      <p>find countries <input id="inpid1" value={searchedCountry} onChange={handleFilterChange} /></p>
      {(showCountry) // case for showing country on button click or filtered search
        ? <CountryData country={[showCountry]} weatherdata={weatherData} imglink={imglink} />
        : listedCountries
      }
    </div>
  )
}

export default App