import { useState } from "react"
import { useEffect } from "react/cjs/react.development"
import { Button } from "reactstrap"
import TruckRepository from "../../repositories/TruckRepository"
import UserRepository from "../../repositories/UserRepository"
import { TruckCard } from "../trucks/TruckCard"
import { Favorites } from "./Favorites"

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
                <Favorites userId={props.userId} />
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