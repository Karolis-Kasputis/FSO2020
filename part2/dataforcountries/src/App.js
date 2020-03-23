import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchForm = ({ countries, handleSearchField, searchField }) => {
  return (
    <div>
      find countries <input value={searchField} onChange={handleSearchField} />
    </div>
  )
}

const ListCountries = ({ countries, searchField, setSearchField, weatherData }) => {
  
      
  if (countries.length < 10 && countries.length > 1 ){
    return (
      <TenCountries countries={countries} setSearchField={setSearchField} />
      )
  }

  else if (countries.length === 1){
    return (
      <Country key={countries[0].name} country={countries[0]} weatherData={weatherData} /> 
    )
  }
  return (<div>Too many countries to show...</div>)
}

const TenCountries = ({ countries, setSearchField }) => {

  const handleShow = (country) => {
      setSearchField(country.name)
    }
  return (
    <div>
      {countries.map(country => 
          <div key={country.name}>{country.name} <button type='button' onClick={()=>handleShow(country)}>show</button></div>
      )}
    </div>
      
    )
}

const Country = ({ country, weatherData }) => {
  //console.log(country.country)
  return ( 
    <div>
    <h2>{country.name}</h2>
    <p>Capital: {country.capital}</p>
    <div>Population: {country.population}</div>
    <h3>Languages</h3>
    <ul>{country.languages.map(lang => <li key={lang.name} >{lang.name}</li>)}</ul>
    <img src={country.flag} height='100px' width='150px' alt='flag'/>
    <Weather country={country} weatherData={weatherData}/>
    </div>
  )
}

const Weather = ({ country, weatherData }) => {
  if (weatherData !== 0) {
    return (
      <div>
        <h3>Weather in {country.capital}</h3>
        <div>Temperature: {weatherData.current.temperature} Celsius</div>
        <img src={weatherData.current.weather_icons} alt='weather icons'></img>
        <div>Wind: {weatherData.current.wind_speed} mph direction: {weatherData.current.wind_dir}</div>
      </div>
    )
    }
  else return (<div>No data</div>)
}

const App = () => {
 const [ countries, setCountries] = useState([])
 const [ searchField, setSearchField ] = useState('lithuania')
 const [ weatherData, setWeatherData ] = useState(0)
 const handleSearchField = (e) => {
  e.preventDefault()
  setSearchField(e.target.value)
 }
 
 const filterCountries = (countries) => countries.filter( country => country.name.toLowerCase().includes(searchField.toLowerCase()))

 useEffect(()=> {
   axios
   .get('https://restcountries.eu/rest/v2/all')
   .then(res=>setCountries(filterCountries(res.data)))
 },[searchField])
 
 const accessKey = 'c761284928542fb8d536c1feddbb963d' //REMOVE API KEY
 useEffect(()=>{
  (countries.length === 1)
  ?axios
     .get('http://api.weatherstack.com/current?access_key='+accessKey+'&query='+countries[0].capital)
     .then(response => {setWeatherData(response.data)
     })
 :console.log('dafak')}
,[countries])



 return (
 <>
   <h1>COUNTRIES</h1>
  <SearchForm countries={countries} handleSearchField={handleSearchField} searchField={searchField} />
  <ListCountries countries={countries} searchField={searchField} setSearchField={setSearchField} weatherData={weatherData}/>
  </>
 )
}

export default App;
