import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { useState, useEffect } from "react/cjs/react.development"
import TruckRepository from "../../repositories/TruckRepository"
import NeighborhoodRepository from "../../repositories/NeighborhoodRepository"


export const Truck = () => {
    const [truck, setTruck] = useState({})
    const { truckId } = useParams()
    const [neighborhoods, setNeighborhoods] = useState([])

    useEffect(() => {
        NeighborhoodRepository.getAll().then(setNeighborhoods)
    },[])

    useEffect(() => {
        TruckRepository.get(parseInt(truckId))
            .then(setTruck)

    }, [truckId])

    const currentDayId = new Date().getDay() + 1
    const currentTruckLocation = truck?.truckLocations?.find(location => location.dayId === currentDayId)
    const currentNeighborhood = neighborhoods?.find(neighborhood => neighborhood.id === currentTruckLocation?.neighborhoodId)

    return (
        <>
            <div className="truck__header">
                <div className="truck__details">
                    <div className="truck__name">
                        {truck.name}
                    </div>
                    <div className="truck__image">
                        <img className="truck-logo" src={truck.profileImgSrc} alt={`${truck.name} logo`} />
                    </div>
                    <div className="truck__info">
                        <div className="truck__info--type"></div>
                        <div className="truck__info--description">{truck.description}</div>
                        <div className="truck__info--links">
                            <a target="_blank" href={truck.instagramURL}><img src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c521.png" /></a>
                            <button className="link insta"></button>
                        </div>
                    </div>
                </div>
                <div className="truck__currentLocation">
                    Find Us Today In {currentNeighborhood?.name}

                </div>
            </div>

            <div className="truck__schedule">

            </div>
            <div className="truck__reviews">

            </div>

        </>
    )



}