import ResidentInfo from "./ResidentInfo"
import { useState } from "react"
import '../assets/styles/ResidentsList.css'

const ResidentsList = ( {residents} ) => {

    // pages
    const [ page, setPage ] = useState(1)
    const residentsPerPage = 8
    const lastIndex = page * residentsPerPage
    const firstIndex = lastIndex - residentsPerPage
    const residentsPaginated = residents?.slice( firstIndex, lastIndex )
    const totalPages = Math.ceil(residents.length / residentsPerPage)
    const pagesNumbers = []

    for(let i = 1; i <= totalPages; i++ ) {
        pagesNumbers.push(i)
    }

    const pagesNumberPaginated = page <= 4 ? pagesNumbers?.slice(0, 7) : pagesNumbers?.slice(page - 4, page + 3)
    const colorButton = { backgroundColor: 'rgb(24, 170, 255)', color: 'rgba(0, 0, 0, 0.856)' }

    return (
        <div className="residents">
            <h2>Residents</h2>
            <ul>
                {
                    residentsPaginated?.map( (resident, index) => (
                        <ResidentInfo 
                        key = { `resident-${index}` }
                        resident = { resident }
                        />
                    ) )
                }
            </ul>
            <div className='buttons'>
                <button disabled={ page === 1 } onClick={ () => setPage(page - 1) }>
                    <i className='bx bx-chevrons-left'></i>
                </button>
                { 
                    pagesNumberPaginated.map( num => (
                        <button 
                        key={num} 
                        onClick={ () => setPage(num) } 
                        style={ num === page ? colorButton : {} }
                        >
                            {num}
                        </button>
                    ) ) 
                }
                <button disabled={ page === totalPages } onClick={ () => setPage(page + 1) }>
                    <i className='bx bx-chevrons-right'></i>
                </button>
            </div>
        </div>
    )
}

export default ResidentsList