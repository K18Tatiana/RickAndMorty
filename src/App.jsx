import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import SearchLocation from './components/SearchLocation'
import LocationInfo from './components/LocationInfo'
import ResidentsList from './components/ResidentsList'

function App() {

  const [ location, setLocation ] = useState( {} )
  const [ locationName, setLocationName ] = useState( 'Earth%20(C-137)' )
  const [ residents, setResidents ] = useState( [] )

  useEffect( () => {
    getLocationData()
  }, [locationName] )

  const getLocationData = () => {
    axios
    .get( `https://rickandmortyapi.com/api/location/?name=${locationName}` )
    .then( resp => {
      if( resp.data.results.length === 1 ) {
        setLocation({
          name: resp.data.results[0].name,
          type: resp.data.results[0].type,
          dimension: resp.data.results[0].dimension,
          population: resp.data.results[0].residents.length
        })
        setResidents(resp.data.results[0].residents)
      } else {
        setLocation( {} )
        setResidents( [] )
      }
    } )
    .catch( error => console.error(error) )
  }

  useEffect( () => {
    axios
    .get( "https://rickandmortyapi.com/api/location" )
    .then( resp => setLocationFilter(resp.data.results) )
    .catch( error => console.error(error) )
  }, [] )

  const locationDataName = dataName => {
    setLocationName(dataName)
  }

  return (
    <div className="App">
      <SearchLocation 
      locationName = { locationDataName }
      />
      <LocationInfo 
        location = { location }
        />
      {
        residents.length !== 0
        ? 
        <ResidentsList
        residents = { residents }
        />
        :
        <h1 style={ {textAlign: 'center', marginTop: 50, color: '#d8d8d8'} }>No residents</h1>
      }
    </div>
  )
}

export default App