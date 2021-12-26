import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"

export const NeighborhoodCard = ({ thisNeighborhood, neighborhoodId }) => {
    const history = useHistory()
    const [neighborhood, setNeighborhood] = useState({})

    useEffect(() => {
        if (thisNeighborhood) {
            setNeighborhood(thisNeighborhood)
        } else if (neighborhoodId)
            setNeighborhood(neighborhoodId)
    }, [thisNeighborhood, neighborhoodId])


    return (

        <div className="neighborhood-card">
            <div className="neighborhood-card-body">
                <button className="neighborhood-logo-btn" onClick={() => { history.push(`/neighborhoods/${neighborhood.id}`) }}><img className="neighborhood-logo" src={neighborhood.profileImgSrc} alt={`${neighborhood?.name} logo`} /></button>
            </div>
        </div>

    )

}