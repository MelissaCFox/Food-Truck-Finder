import { useState } from "react"
import { useEffect } from "react/cjs/react.development"
import { Button } from "reactstrap"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import TruckRepository from "../../repositories/TruckRepository"
import UserRepository from "../../repositories/UserRepository"
import { Favorites } from "./Favorites"

export const User = (props) => {
    const [user, setUser] = useState({})
    const [allTrucks, setAllTrucks] = useState([])
    const { getCurrentUser } = useSimpleAuth()

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
                            {
                                review.userId === getCurrentUser().id
                                    ? (<div className="review-options">
                                        <Button>Edit Review</Button>
                                        <Button>Delete Review</Button>
                                    </div>)
                                    : ""
                            }
                        </li>
                    })
                }
            </ul>
        </>
    )
}