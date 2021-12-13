import { useState } from "react"
import { useEffect } from "react/cjs/react.development"
import ReviewRepository from "../../repositories/ReviewRepository"
import UserRepository from "../../repositories/UserRepository"
import { Review } from "../reviews/Review"
import { Favorites } from "./Favorites"

export const User = ({userId}) => {
    const [user, setUser] = useState({})
    const [userReviews, setUserReviews] = useState([])

    useEffect(() => {
        ReviewRepository.getAllForUser(userId).then(setUserReviews)
    }, [userId])

    useEffect(() => {
        UserRepository.get(userId).then(setUser)
    }, [userId])

    return (
        <>
            <ul className="favorites">
                <h3>My Favorite Food Trucks</h3>
                <Favorites userId={user.id} />
            </ul>

            <ul className="reviews">
                <h3>My Reviews</h3>
                {
                    userReviews.length > 0
                        ? userReviews.map(review => {
                            return <Review key={review.id} review={review} user={user} userId={user.id} setUser={setUser} setUserReviews={setUserReviews} />
                        })
                        : <div>No Reviews Yet</div>
                }
            </ul>
        </>
    )
}