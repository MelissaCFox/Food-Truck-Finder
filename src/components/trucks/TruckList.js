import { useEffect, useState } from "react"
import TruckRepository from "../../repositories/TruckRepository"


export const TruckList = () => {
const [truckLocations, updateTruckLocations] = useState([])
const [trucks, setTrucks] = useState([])

useEffect(() => {
    TruckRepository.getAll().then(setTrucks)
},[])

useEffect(() => {
    const currentDayId = new Date().getDay() + 1
    TruckRepository.getTruckLocationsByDay(currentDayId).then(updateTruckLocations)
},[])


return (
    <>
    {
        truckLocations.map(truckLocation => {
            const foundTruck = trucks.find(truck => truck.id === truckLocation.truckId)
            if (foundTruck) {
                return <div>{foundTruck.name}</div>
            }
        })
    }

    </>
)

}