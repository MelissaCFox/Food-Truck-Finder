import { useEffect, useState } from "react"
import TruckRepository from "../../repositories/TruckRepository"
import UserRepository from "../../repositories/UserRepository"
import { TruckCard } from "../trucks/TruckCard"


export const Favorites = ({ userId }) => {
    const [user, setUser] = useState({})
    const [allTrucks, setAllTrucks] = useState([])

    useEffect(() => {
        if (userId) {
            TruckRepository.getAll().then(setAllTrucks)
        }
    }, [userId])

    useEffect(() => {
        if (userId) {
            UserRepository.get(userId).then(setUser)
        }
    }, [userId])

    return (
        <ul className="favorites list">

            {
                user.userTruckFavorites?.length > 0
                    ? user.userTruckFavorites?.map(favorite => {
                        const foundTruck = allTrucks?.find(truck => truck.id === favorite.truckId)

                        return <li className="card truck" key={foundTruck.id}>
                            <TruckCard key={foundTruck.id} truckId={foundTruck.id} />
                        </li>

                    })
                    : <li className="card truck"><div className="card-body">No Favorites Yet</div></li>
            }
        </ul>

    )
}