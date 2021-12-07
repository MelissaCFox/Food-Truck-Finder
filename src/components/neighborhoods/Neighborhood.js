import { useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { useEffect } from "react/cjs/react.development"
import NeighborhoodRepository from "../../repositories/NeighborhoodRepository"
import TruckLocationRepository from "../../repositories/TruckLocationRepository"
import { TruckCard } from "../trucks/TruckCard"


export const Neighborhood = () => {

    const { neighborhoodId } = useParams()
    const [neighborhood, setNeighborhood] = useState({})
    const [todaysTrucks, setTodaysTrucks] = useState([])
    const [sundayLocations, setSundayLocations] = useState([])
    const [mondayLocations, setMondayLocations] = useState([])
    const [tuesdayLocations, setTuesdayLocations] = useState([])
    const [wednesdayLocations, setWednesdayLocations] = useState([])
    const [thursdayLocations, setThursdayLocations] = useState([])
    const [fridayLocations, setFridayLocations] = useState([])
    const [saturdayLocations, setSaturdayLocations] = useState([])

    useEffect(() => {
        NeighborhoodRepository.get(neighborhoodId).then(setNeighborhood)
    }, [])

    useEffect(() => {
        const currentDayId = new Date().getDay() + 1
        TruckLocationRepository.getTruckLocationsByNeighborhoodAndDay(neighborhoodId, currentDayId).then(setTodaysTrucks)
    }, [])



    return (
        <>
            <div className="neighborhood__header">
                <div className="neighborhood__name">{neighborhood.name}</div>
                <div className="neighborhood__description">{neighborhood.description}</div>
                <div className="neighborhood__currentTrucks">
                    Trucks in the Area Today:
                    {
                        todaysTrucks.map(truckLocation => {
                            return <div className="" key={truckLocation.id}>
                                <TruckCard truckId={truckLocation.truckId} />
                            </div>
                        })
                    }

                </div>
                <div className="neighborhood__schedule">
                    Truck in the Area This Week
                    <div className="schedule">
                        {
                            

                        }
                    </div>
                </div>

            </div>

        </>
    )

}