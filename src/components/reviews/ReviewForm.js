import { useState } from "react"
import { Input, Label, FormGroup } from "reactstrap"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import ReviewRepository from "../../repositories/ReviewRepository"
import TruckRepository from "../../repositories/TruckRepository"


export const ReviewForm = ({ truckId, setTruck }) => {
    const [review, setReview] = useState("")
    const [date, setDate] = useState("")
    const { getCurrentUser } = useSimpleAuth()
    const [anonymousState, setAnonymous] = useState(false)
    const toggleAnonymous = () => setAnonymous(!anonymousState)
    const [rating, setRating] = useState(0)

    const submitReview = (event) => {
        event.preventDefault()
        const reviewObj = {
            userId: getCurrentUser().id,
            truckId: parseInt(truckId),
            review: review,
            date: date,
            anonymous: anonymousState,
            rating: rating
        }

        if (review && date) {
            ReviewRepository.add(reviewObj).then(() => {
                TruckRepository.get(truckId).then(setTruck)
            })

        }
    }

    return (
        <form className="form review-form">
            <h3>Submit a Review</h3>
            <div className="form-group">
                <Input type="date" onChange={e => setDate(e.target.value)}></Input>
            </div>
            <div className="form-group">
                <Input type="text" required autoFocus className="form-control" onChange={e => setReview(e.target.value)} id="review" placeholder="Review"></Input>
            </div>

            <div className="form-group">
                <Label for="rating">Rating</Label>
                <Input type="range" min="0" max="5" required autoFocus className="form-control" onChange={e => setRating(parseInt(e.target.value))} id="rating"></Input>
            </div>

            <FormGroup >
                <Label>Remain Anonymous?</Label>
                <Input type="checkbox" onChange={toggleAnonymous} />
            </FormGroup>

            <button type="submit" onClick={submitReview} className="btn btn-primary">Submit Review</button>
        </form>
    )
}