import {useEffect, useState} from 'react'
import axios from "axios";

function App() {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then(res => {
        setCountries(res.data)
      })
  }, []);

  return (
    <>
      <div>find countries <input value={query} onChange={(e)=>setQuery(e.target.value)}/></div>
      {query !== '' ? (
        <Search countries={countries.filter((country)=>country.name.common.toLowerCase().includes(query.toLowerCase()))}></Search>
      ) : null}
    </>
  )
}

function Search({countries}) {
  const [activeIndex, setActiveIndex] = useState(-1);

  return (
    countries.length > 10 ? (
      <p>Too many matches, specify another filter</p>
    ): countries.length > 1 ? (
        countries.map((country, index)=>
          <div key={country.name.common}>
            {country.name.common} <button onClick={()=>setActiveIndex(index)}>show</button>
            {(activeIndex === index) ? (
              <Country country={country}></Country>
            ): null}
          </div>
        )
    ) : countries.length === 1 ? (
      <Country country={countries[0]}></Country>
    ) : (
      <p>No matches</p>
    )
  )
}

function Country({country}) {
  const api_key = 'f1539e3ca3284734946104435242505'
  const [weather, setWeather] = useState([])

  useEffect(() => {
    axios
      .get("http://api.weatherapi.com/v1/current.json?key="+api_key+"&q="+country.name.common)
      .then(res => setWeather(res.data))
  }, [country.name.common]);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <h3>languages:</h3>
      <ul>
        {Object.keys(country.languages).map((language)=><li key={language}>{country.languages[language]}</li>)}
      </ul>
      <img src={country.flags.png} alt=""/>
      <h3>Weather in {country.name.common}</h3>
      <p>temperature {weather?.current?.feelslike_c} Celsius</p>
      <img src={weather?.current?.condition?.icon} alt=""/>
      <p>wind {weather?.current?.wind_kph} km/h</p>
    </div>
  )
}

export default App
