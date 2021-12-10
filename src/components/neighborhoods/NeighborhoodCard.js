import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import NeighborhoodRepository from "../../repositories/NeighborhoodRepository"


export const NeighborhoodCard = ({neighborhoodId}) => {
    const history = useHistory()
    const [neighborhood, setNeighborhood] = useState({})

    useEffect(() => {
        if (neighborhoodId) {
            NeighborhoodRepository.get(neighborhoodId).then(setNeighborhood)
        }
    },[])


    return (

        <div className="card-body">
            <button onClick={() => { history.push(`/neighborhoods/${neighborhood.id}`) }}><img className="neighborhood-logo" src={neighborhood.profileImgSrc} alt={`${neighborhood?.name} logo`} /></button>
        </div>
    )

}