import { useEffect, useState } from "react"
import NeighborhoodRepository from "../../repositories/NeighborhoodRepository"
import TruckRepository from "../../repositories/TruckRepository"


export const TruckList = () => {
const [truckLocations, updateTruckLocations] = useState([])
const [trucks, setTrucks] = useState([])
const [neighborhoods, setNeighborhoods] = useState([])

useEffect(() => {
    NeighborhoodRepository.getAll().then(setNeighborhoods)
},[])

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
            const foundNeighborhood = neighborhoods.find(neighborhood => neighborhood.id === truckLocation.neighborhoodId)
            if (foundTruck) {
                return <div key={truckLocation.id}>
                    <img src={foundTruck.profileImgSrc} alt={`${foundTruck.name} logo`} width="150" hight="150"/>
                    <div>{foundTruck.name} will be in {foundNeighborhood.name}</div>
                    </div>
            }
        })
    }

    </>
)

}