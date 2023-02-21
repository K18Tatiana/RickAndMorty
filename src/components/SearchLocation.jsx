import '../assets/styles/SearchLocation.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import Autosuggest from 'react-autosuggest'

const SearchLocation = ( {locationName} ) => {

    const [ locationsData, setLocationsData ] = useState( [] )
    const [ locations, setLocations ] = useState( [] )
    const [ locationValue, setLocationValue ] = useState( '' )
    const [ locationSelected, setLoationSelected ] = useState( {} )

    useEffect( () => {
        axios
        .get("https://rickandmortyapi.com/api/location")
        .then( resp => {
            setLocationsData(resp.data.results)
            setLocations(resp.data.results)
        } )
        .catch( error => console.error(error) )
    }, [] )

    const onSuggestionsFetchRequested = ({value}) => {
        setLocations(filterLocations(value))
    }

    const filterLocations = value => {
        const inputValue = value.trim().toLowerCase()
        const inputLength = inputValue.length
        const filter = locationsData.filter( location => {
            if( location.name.toLowerCase().replace(" ", "").includes(inputValue) ) {
                return location;
            }
        } )
        return inputLength === 0 ? [] : filter;
    }

    const onSuggestionsClearRequested = () => {
        setLocations( [] )
    }

    const getSuggestionValue = suggestion => {
        return suggestion.name;
    }

    const renderSuggestion = suggestion => (
        <div className='suggestion' onClick={ () => selectLocation(suggestion) }>
            {suggestion.name}
        </div>
    )

    const selectLocation = location => {
        setLoationSelected(location)
    }

    const onChange = (e, {newValue}) => {
        setLocationValue(newValue)
    }

    const inputProps = {
        placeholder: "Enter the location name",
        value: locationValue,
        onChange
    }
 
    return (
        <div className="bg-search">
            <div>
                <Autosuggest 
                className="search-location"
                suggestions={ locations }
                onSuggestionsFetchRequested={ onSuggestionsFetchRequested }
                onSuggestionsClearRequested={ onSuggestionsClearRequested }
                getSuggestionValue={ getSuggestionValue }
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
                />
                <button onClick={ () => locationName(locationSelected.name.replace(' ', '%20')) }>Search</button>
            </div>
        </div>
    )
}

export default SearchLocation