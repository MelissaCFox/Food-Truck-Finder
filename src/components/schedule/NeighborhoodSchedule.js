import { useState } from "react"
import { useEffect } from "react/cjs/react.development"
import TruckLocationRepository from "../../repositories/TruckLocationRepository"
import { TruckCard } from "../trucks/TruckCard"


export const NeighborhoodSchedule = ({ neighborhoodId, dayId }) => {
    const [neighborhoodTrucks, setNeighborhoodTrucks] = useState([])

    useEffect(() => {
        if (neighborhoodId) {
            TruckLocationRepository.getTruckLocationsByNeighborhoodAndDay(neighborhoodId, dayId).then(setNeighborhoodTrucks)
        }
    }, [neighborhoodId, dayId])

    return (
        <>
            {
                neighborhoodTrucks.length > 0
                    ? neighborhoodTrucks.map(location => <li className="card truck" key={`${neighborhoodId}--${dayId}--${location.id}`}><TruckCard key={location.id} truckId={location.truckId} /></li>)
                    : <li className="card truck">
                        <div className="truck-card"><div className="truck card"><div className="card-body">No Trucks Today</div></div></div>
                    </li>
            }
        </>
    )
}

