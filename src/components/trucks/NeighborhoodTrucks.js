import { useEffect, useState } from "react"
import NeighborhoodRepository from "../../repositories/NeighborhoodRepository"
import { TruckList } from "./TruckList"


export const NeighborhoodTruckList = () => {
const [neighborhoods, setNeighborhoods] = useState([])

useEffect(() => {
    NeighborhoodRepository.getAll().then(setNeighborhoods)
},[])




return (
    <>
    {
        neighborhoods.map(neighborhood => {
            return <div>
                <div>{neighborhood.name}</div>
                <TruckList key={`neighborhood--${neighborhood.id}`} neighborhood={neighborhood}/>

            </div>
        })
    }

    </>
)

}