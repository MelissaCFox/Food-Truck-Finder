import { useState } from "react"
import { useEffect } from "react/cjs/react.development"
import { Button } from "reactstrap"
import TruckRepository from "../../repositories/TruckRepository"
import UserRepository from "../../repositories/UserRepository"
import { TruckCard } from "../trucks/TruckCard"

export const User = (props) => {
    const [user, setUser] = useState({})
    const [allTrucks, setAllTrucks] = useState([])

    useEffect(() => {
            TruckRepository.getAll().then(setAllTrucks)
    }, [])

    useEffect(() => {
            UserRepository.get(props.userId).then(setUser)
    }, [])

    return (
        <>
            <ul className="favorites">
                <h3>My Favorite Food Trucks</h3>
                {
                    user.userTruckFavorites?.map(favorite => {
                        const foundTruck = allTrucks?.find(truck => truck.id === favorite.truckId)
                        if (foundTruck) {
                            return <li className="card truck" key={favorite.id}>
                                <TruckCard truckId={foundTruck.id} />
                            </li>
                        } else {
                            return <li className="card truck">No Favorites Yet</li>
                        }
                    })
                }
            </ul>

            <ul className="reviews">
                <h3>My Reviews</h3>
                {
                    user.userTruckReviews?.map(review => {
                        const foundTruck = allTrucks.find(truck => truck.id === review.truckId)
                        return <li className="card review-card" key={review.id}>
                            <div>{foundTruck.name}</div>
                            <div>{review.date}</div>
                            <div>{review.review}</div>
                        </li>
                    })
                }
            </ul>
        </>
    )
}