import { useEffect, useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { Button } from "reactstrap"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import ReviewRepository from "../../repositories/ReviewRepository"
import TruckRepository from "../../repositories/TruckRepository"
import UserRepository from "../../repositories/UserRepository"


export const Review = ({ review, user, setUser }) => {
    const { getCurrentUser } = useSimpleAuth()


    return (
        <div className="card review-card" key={review.id}>

            <div>{review.truck?.name}</div>
            <div>{review.date}</div>
            <div>{review.review}</div>
            {
                review.userId === getCurrentUser().id
                    ? (<div className="review-options">
                        <Button onClick={() => { }}>Edit</Button>
                        <Button color="danger" onClick={() => {
                            ReviewRepository.delete(review.id).then(() => {
                                UserRepository.get(user.id).then(setUser)
                            })
                        }
                        }>Delete Review</Button>
                    </div>)
                    : ""
            }
        </div>

    )


}