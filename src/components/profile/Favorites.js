import { useEffect, useState } from "react"
import TruckRepository from "../../repositories/TruckRepository"
import UserRepository from "../../repositories/UserRepository"
import { TruckCard } from "../trucks/TruckCard"


export const Favorites = (props) => {
    const [user, setUser] = useState({})
    const [allTrucks, setAllTrucks] = useState([])

    useEffect(() => {
        TruckRepository.getAll().then(setAllTrucks)
    }, [])

    useEffect(() => {
        UserRepository.get(props.userId).then(setUser)
    }, [])

    return (
    <ul className="favorites list">
        
        {
            user.userTruckFavorites?.length > 0
            ? user.userTruckFavorites?.map(favorite => {
                const foundTruck = allTrucks?.find(truck => truck.id === favorite.truckId)
                if (foundTruck) {
                    return <li className="card truck" key={foundTruck.id}>
                        <TruckCard truckId={foundTruck.id} />
                    </li>
                }
            })
            : <li className="card truck">No Favorites Yet</li>
        }
    </ul>

    )
}