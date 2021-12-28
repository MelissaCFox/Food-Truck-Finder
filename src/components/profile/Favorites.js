import { useEffect, useState } from "react"
import UserRepository from "../../repositories/UserRepository"
import { TruckCard } from "../trucks/TruckCard"


export const Favorites = ({ userId, newInfo }) => {
    const [user, setUser] = useState({})

    useEffect(() => {
        UserRepository.get(userId).then(setUser)

    }, [userId, newInfo])

    return (
        <ul className="favorites list">

            {
                user.userTruckFavorites?.length > 0

                    ? user.userTruckFavorites.map(favorite => {
                        return <li className="card truck" key={favorite.id}>
                            <TruckCard key={favorite.id} truckId={favorite.truckId} newInfo={newInfo} />
                        </li>
                    })
                    : <li className="card truck"><div className="card-body">No Favorites Yet</div></li>

            }
        </ul>

    )
}