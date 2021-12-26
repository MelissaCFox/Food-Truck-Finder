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
                    ? neighborhoodTrucks.map(location => <div className="schedule-card-body" key={`${neighborhoodId}--${dayId}--${location.id}`}>
                            <TruckCard key={location.id} truckId={location.truckId} />
                        </div>
                    )
                    : <div className="schedule-card">
                        <div className="truck-card"><div className="truck card"><div className="card noTrucksCard">No Trucks Today</div></div></div>
                    </div>
            }
        </>
    )
}

