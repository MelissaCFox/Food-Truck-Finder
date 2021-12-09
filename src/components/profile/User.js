import { useState } from "react"
import { useEffect } from "react/cjs/react.development"
import ReviewRepository from "../../repositories/ReviewRepository"
import UserRepository from "../../repositories/UserRepository"
import { Review } from "../reviews/Review"
import { Favorites } from "./Favorites"

export const User = (props) => {
    const [user, setUser] = useState({})
    const [userReviews, setUserReviews] = useState([])

    useEffect(() => {
        ReviewRepository.getAllForUser(props.userId).then(setUserReviews)
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
                    userReviews.length > 0
                        ? userReviews.map(review => {
                            return <Review key={review.id} review={review} user={user} setUser={setUser} setUserReviews={setUserReviews} />
                        })
                        : ""
                }
            </ul>
        </>
    )
}