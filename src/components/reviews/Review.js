import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { Button } from "reactstrap"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import ReviewRepository from "../../repositories/ReviewRepository"
import TruckRepository from "../../repositories/TruckRepository"


export const Review = ({ review, user, setUserReviews, setTruck }) => {
    const { getCurrentUser } = useSimpleAuth()
    const { truckId } = useParams()


    return (
        <div className="card review-card" key={review.id}>
            {
                truckId
                    ? <div>{review.truck?.name}</div>
                    : <div>{review.truck?.name}</div>
            }

            <div>{review.date}</div>
            <div>{review.review}</div>
            {
                review.userId === getCurrentUser().id
                    ? (<div className="review-options">
                        <Button onClick={() => { }}>Edit</Button>
                        <Button color="danger" onClick={() => {
                            ReviewRepository.delete(review.id).then(() => {
                                truckId
                                    ? TruckRepository.get(truckId).then(setTruck)
                                    : ReviewRepository.getAllForUser(user.id).then(setUserReviews)
                            })
                        }
                        }>Delete Review</Button>
                    </div>)
                    : ""
            }
        </div>

    )


}