import { useEffect, useState } from "react"
import TruckLocationRepository from "../../repositories/TruckLocationRepository"
import TruckRepository from "../../repositories/TruckRepository"
import { TruckCard } from "./TruckCard"


export const TruckList = ({ neighborhood, date }) => {
    const [truckLocations, updateTruckLocations] = useState([])
    const [trucks, setTrucks] = useState([])

    useEffect(() => {
        TruckRepository.getAll().then(setTrucks)
    }, [date])

    useEffect(() => {
        const currentDayId = date.getDay() + 1
        TruckLocationRepository.getTruckLocationsByDay(currentDayId).then(updateTruckLocations)
    }, [date])

    const filteredLocations = truckLocations.filter(truckLocation => truckLocation.neighborhoodId === neighborhood.id)

    return (
        <>
            <ul className="trucks">
                {
                    neighborhood
                        ? filteredLocations.length > 0
                            ? filteredLocations.map(truckLocation => {
                                const foundTruck = trucks.find(truck => truck.id === truckLocation.truckId)
                                return <li className="card truck" key={truckLocation.id}>
                                    <TruckCard truckId={foundTruck.id} />
                                </li>

                            })
                            : <li className="card no-truck" key={neighborhood.id}>
                                <div className="card-body">
                                    No Trucks Today
                                </div>
                            </li>
                        : ""
                }
            </ul>
        </>
    )

}