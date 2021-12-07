import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import NeighborhoodRepository from "../../repositories/NeighborhoodRepository"


export const NeighborhoodCard = (props) => {
    const history = useHistory()
    const [neighborhood, setNeighborhood] = useState({})

    useEffect(() => {
        NeighborhoodRepository.get(props.neighborhoodId).then(setNeighborhood)
    },[])


    return (

        <div className="card-body">
            <button onClick={() => { history.push(`/neighborhoods/${neighborhood?.id}`) }}><img className="neighborhood-logo" src={neighborhood?.profileImgSrc} alt={`${neighborhood?.name} logo`} /></button>
        </div>
    )

}