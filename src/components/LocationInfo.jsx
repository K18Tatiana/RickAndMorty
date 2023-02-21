import '../assets/styles/LocationInfo.css'

const LocationInfo = ( {location} ) => {


    return (
        <div className='location'>
            <h2>Location</h2>
            <div className="location-info">
                <div>
                    <h4>Name: </h4>
                    <p>{location.name}</p>
                </div>
                <div>
                    <h4>Type: </h4>
                    <p>{location.type}</p>
                </div>
                <div>
                    <h4>Dimension: </h4>
                    <p>{location.dimension}</p>
                </div>
                <div>
                    <h4>Population: </h4>
                    <p>{location.population}</p>
                </div>
            </div>
        </div>
    )
}

export default LocationInfo