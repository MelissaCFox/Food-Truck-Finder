import { useState } from "react"
import { useEffect } from "react/cjs/react.development"
import ReviewRepository from "../../repositories/ReviewRepository"
import UserRepository from "../../repositories/UserRepository"
import { Review } from "../reviews/Review"
import { Favorites } from "./Favorites"
import './User.css';

export const User = ({ userId }) => {
    const [user, setUser] = useState({})
    const [userReviews, setUserReviews] = useState([])
    
    const [newInfo, setNewInfo] = useState(false)
    const alertNewInfo = () => setNewInfo(!newInfo)

    useEffect(() => {
        ReviewRepository.getAllForUser(userId).then(setUserReviews)
    }, [userId])

    useEffect(() => {
        UserRepository.get(userId).then(setUser)
    }, [userId])

    
  
    return (
        <div className="profile-view">
            <ul className="favorites card">
                <div className="profile-header"><h3>My Favorite Food Trucks</h3></div>
                <div className="profile-container"><Favorites key={user.id} userId={user.id} newInfo={newInfo} /></div>
            </ul>

            <ul className="reviews-container card">
                <div className="profile-header"><h3>My Reviews</h3></div>
                <div className="reviews">
                <div className="profile-container"></div>
                {
                    userReviews.length > 0
                        ? userReviews.map(review => {
                            return <Review key={user.id} review={review} user={user} userId={user.id} setUser={setUser} setUserReviews={setUserReviews} alertNewInfo={alertNewInfo} />
                        })
                        : <div>No Reviews Yet</div>
                }
                </div>
            </ul>
        </div>
    )
}