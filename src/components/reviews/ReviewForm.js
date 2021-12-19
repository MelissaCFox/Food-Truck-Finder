import { useState } from "react"
import { useEffect } from "react/cjs/react.development"
import { Input, Label } from "reactstrap"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import ReviewRepository from "../../repositories/ReviewRepository"
import TruckRepository from "../../repositories/TruckRepository"
import '../trucks/Truck.css';


export const ReviewForm = ({ truckId, setTruck}) => {
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
            ReviewRepository.addAndUpdate(reviewObj)
                .then(() => {
                    TruckRepository.get(parseInt(truckId))
                        .then((truck) => {
                            setTruck(truck)
                        })   
                })
    }}


        return (
            <form className="form">
                <h3>Submit a Review</h3>
                <div className="form-group">
                    <Input type="date" className="review-date-picker" onChange={e => setDate(e.target.value)} />
                </div>
                <div className="form-group">
                    <Input type="textarea" height="4rem" required autoFocus className="form-control" onChange={e => setReview(e.target.value)} id="review" placeholder="Review"></Input>
                </div>

                <div className="form-group">
                    <Label for="rating">Rating</Label>
                    <input type="range" defaultValue="1" min="1" max="5" step="1" required autoFocus className="form-control" onChange={e => setRating(parseInt(e.target.value))} id="rating"></input>
                </div>

                <div className="form-group anonymous-check">
                    <Label className="label">Remain Anonymous?</Label>
                    <input className="anonymous-checkbox" type="checkbox" onChange={toggleAnonymous} />
                </div>

                <button type="submit" onClick={submitReview} className="btn btn-primary">Submit Review</button>
            </form>
        )
    }