import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import FivePoints from "../images/5Points.png"
import TwelveSouth from "../images/12South.png"
import BerryHill from "../images/BerryHill.png"
import Downtown from "../images/Downtown.png"
import Germantown from "../images/Germantown.png"
import GreenHills from "../images/GreenHills.png"
import Hillsboro from "../images/Hillsboro.png"
import SylvanPark from "../images/SylvanPark.png"
import TheGulch from "../images/TheGulch.png"
import TheNations from "../images/TheNations.png"
import WestEnd from "../images/WestEnd.png"

export const NeighborhoodCard = ({ thisNeighborhood, neighborhoodId }) => {
    const history = useHistory()
    const [neighborhood, setNeighborhood] = useState({})

    let src = ""
    if (neighborhood.name === "12 South") {
        src = TwelveSouth
    } else if (neighborhood.name === "Berry Hill") {
        src = BerryHill
    }else if (neighborhood.name === "Downtown") {
        src = Downtown
    } else if (neighborhood.name === "Germantown") {
        src = Germantown
    } else if (neighborhood.name === "Green Hills") {
        src = GreenHills
    } else if (neighborhood.name === "The Gulch") {
        src = TheGulch
    } else if (neighborhood.name === "Hillsboro Village") {
        src = Hillsboro
    } else if (neighborhood.name === "The Nations") {
        src = TheNations
    } else if (neighborhood.name === "Sylvan Park") {
        src = SylvanPark
    } else if (neighborhood.name === "West End") {
        src = WestEnd
    } else if (neighborhood.name === "5 Points") {
        src = FivePoints
    }

    useEffect(() => {
        if (thisNeighborhood) {
            setNeighborhood(thisNeighborhood)
        } else if (neighborhoodId)
            setNeighborhood(neighborhoodId)
    }, [thisNeighborhood, neighborhoodId])


    return (

        <div className="neighborhood-card">
            <div className="neighborhood-card-body">
                <button className="neighborhood-logo-btn" onClick={() => { history.push(`/neighborhoods/${neighborhood.id}`) }}><img className="neighborhood-logo" src={src} alt={`${neighborhood?.name} logo`} /></button>
            </div>
        </div>

    )

}