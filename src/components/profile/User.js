import { useState } from "react"
import { useEffect } from "react/cjs/react.development"
import UserRepository from "../../repositories/UserRepository"
import { Review } from "../reviews/Review"
import { Favorites } from "./Favorites"

export const User = (props) => {
    const [user, setUser] = useState({})


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
                        return <Review key={review.id} review={review} user={user} setUser={setUser}/>
                    })
                }
            </ul>
        </>
    )
}