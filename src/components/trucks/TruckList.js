import { useEffect, useState } from "react"
import TruckLocationRepository from "../../repositories/TruckLocationRepository"
import TruckRepository from "../../repositories/TruckRepository"
import { TruckCard } from "./TruckCard"


export const TruckList = (props) => {
    const [truckLocations, updateTruckLocations] = useState([])
    const [trucks, setTrucks] = useState([])

    useEffect(() => {
        TruckRepository.getAll().then(setTrucks)
    }, [])

    useEffect(() => {
        const currentDayId = props.date?.getDay() + 1
        TruckLocationRepository.getTruckLocationsByDay(currentDayId).then(updateTruckLocations)
    }, [])

    const filteredLocations = truckLocations.filter(truckLocation => truckLocation.neighborhoodId === props.neighborhood?.id)

    return (
        <>
            <ul className="trucks">
                {
                    props.neighborhood
                        ? filteredLocations.length > 0
                            ? filteredLocations.map(truckLocation => {
                                const foundTruck = trucks.find(truck => truck.id === truckLocation.truckId)
                                if (foundTruck) {
                                    return <li className="card truck" key={truckLocation.id}>
                                        <TruckCard truckId={foundTruck.id}/>
                                    </li>
                                }
                            })
                            : <li className="card no-truck" key={props.neighborhood.id}>
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