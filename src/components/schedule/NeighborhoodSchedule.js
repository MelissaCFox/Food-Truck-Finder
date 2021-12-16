import { useState } from "react"
import { useEffect } from "react/cjs/react.development"
import TruckLocationRepository from "../../repositories/TruckLocationRepository"
import { TruckCard } from "../trucks/TruckCard"
import './Schedule.css';


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
                    : <div className="card card-body">
                        No Trucks Today
                    </div>
            }
        </>
    )
}