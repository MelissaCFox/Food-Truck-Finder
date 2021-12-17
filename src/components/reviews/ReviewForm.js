import { useState } from "react"
import { useEffect } from "react/cjs/react.development"
import { Input, Label, FormGroup } from "reactstrap"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import ReviewRepository from "../../repositories/ReviewRepository"
import TruckRepository from "../../repositories/TruckRepository"
import '../trucks/Truck.css';


export const ReviewForm = ({ truckId, setTruck, setBasicTruck }) => {
    const [review, setReview] = useState("")
    const [date, setDate] = useState("")
    const { getCurrentUser } = useSimpleAuth()
    const [anonymousState, setAnonymous] = useState(false)
    const toggleAnonymous = () => setAnonymous(!anonymousState)
    const [rating, setRating] = useState(0)
    const [thisTruck, setThisTruck] = useState({})
    const [fullTruck, setFullTruck] = useState({})

    useEffect(() => {
        TruckRepository.get(parseInt(truckId)).then(setFullTruck)
    }, [truckId])

    useEffect(() => {
        TruckRepository.getBasic(parseInt(truckId)).then(setThisTruck)
    }, [truckId])



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
            ReviewRepository.add(reviewObj)
                .then(() => {
                    TruckRepository.get(parseInt(truckId))
                        .then((truck) => {
                            setFullTruck(truck)
                            updateRatings()
                        })
                })
        }
    }

    const updateRatings = () => {
        let totalRating = 0
        if (fullTruck?.userTruckReviews?.length > 0) {

            for (const review of fullTruck?.userTruckReviews) {
                totalRating += review.rating
            }
            let averageRating = totalRating / fullTruck?.userTruckReviews?.length
            const updatedTruckObj = { ...thisTruck }
            updatedTruckObj.userRating = averageRating
            TruckRepository.update(thisTruck.id, updatedTruckObj)
                .then(() => {
                    TruckRepository.get(thisTruck.id)
                        .then((truck) => setTruck(truck))
                        .then((truck) => setBasicTruck(truck))

                })
        }
    }

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