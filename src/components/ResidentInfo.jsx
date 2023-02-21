import axios from "axios"
import { useState, useEffect } from "react"
import '../assets/styles/ResidentInfo.css'

const ResidentInfo = ( {resident} ) => {

    const [ residentData, setResidentData ] = useState( {} )
    const [ colorI, setColorI ] = useState( { color: 'gray' } )

    useEffect( () => {
        axios
        .get( resident )
        .then( resp => {
            setResidentData({
                name: resp.data.name,
                image: resp.data.image,
                status: resp.data.status,
                species: resp.data.species,
                origin: resp.data.origin.name,
                episodes: resp.data.episode.length
            })
        } )
        .catch( error => console.error(error) )

    }, [ resident ] )

    useEffect( () => {
        if(residentData.status === 'Alive' ) {
            setColorI( { color: 'rgb(27, 216, 27)' } )
        } else if(residentData.status === 'Dead') {
            setColorI( { color: 'rgb(255, 35, 35)' } )
        }
    }, [ residentData.status ] )

    return (
        <li>
            <img src={ residentData.image } alt="" />
            <div className="resident-info">
                <h3>{residentData.name}</h3>
                <h4> 
                    <i className='bx bxs-circle' style={ colorI } ></i>  
                    {residentData.status} - {residentData.species}
                </h4>
                <div>
                    <h5>Origin</h5>
                    <b>{residentData.origin}</b>
                </div>
                <div>
                    <h5>Episodes where appear</h5>
                    <b>{residentData.episodes}</b>
                </div>
            </div>
        </li>
    )
}

export default ResidentInfo