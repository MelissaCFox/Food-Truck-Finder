import { useState } from "react"
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { useEffect } from "react/cjs/react.development"
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import ReviewRepository from "../../repositories/ReviewRepository"
import TruckRepository from "../../repositories/TruckRepository"
import UserRepository from "../../repositories/UserRepository"
import OneStar from '../trucks/images/1Star.png';
import OneAndStar from '../trucks/images/1-5Stars.png';
import TwoStar from '../trucks/images/2Stars.png';
import TwoAndStar from '../trucks/images/2-5Stars.png';
import ThreeStar from '../trucks/images/3Stars.png';
import ThreeAndStar from '../trucks/images/3-5Stars.png';
import FourStar from '../trucks/images/4Stars.png';
import FourAndStar from '../trucks/images/4-5Stars.png';
import FiveStar from '../trucks/images/5Stars.png';


export const Review = ({ review, userId, setUserReviews, setTruck, setUser, alertNewRating, alertNewInfo }) => {
    const { getCurrentUser } = useSimpleAuth()
    const history = useHistory()
    const { truckId } = useParams()
    const [modal, setModal] = useState(false)
    const reviewToggle = () => setModal(!modal)
    const [editModal, setEditModal] = useState(false)
    const editToggle = () => setEditModal(!editModal)
    const [newDescription, setNewDescription] = useState("")
    const [selectedReview, setSelectedReview] = useState({})
    const [reviewer, setReviewer] = useState({})
    const [userRating, updateUserRating] = useState("")


    useEffect(() => {
        UserRepository.get(review.userId).then(setReviewer)
    }, [review])

    useEffect(() => {
        ReviewRepository.getBasic(review.id).then(setSelectedReview)
    }, [review])

    useEffect(() => {

        let starRating = review.rating
        if (0 < starRating && starRating < 1.25) {
            starRating = OneStar
        } else if (starRating === 1.25) {
            starRating = OneStar
        } else if (1.25 < starRating && starRating < 1.75) {
            starRating = OneAndStar
        } else if (starRating === 1.75) {
            starRating = OneAndStar
        } else if (1.75 < starRating && starRating < 2.25) {
            starRating = TwoStar
        } else if (starRating === 2.25) {
            starRating = TwoStar
        } else if (2.25 < starRating && starRating < 2.75) {
            starRating = TwoAndStar
        } else if (starRating === 2.75) {
            starRating = TwoAndStar
        } else if (2.75 < starRating && starRating < 3.25) {
            starRating = ThreeStar
        } else if (starRating === 3.25) {
            starRating = ThreeStar
        } else if (3.25 < starRating && starRating < 3.75) {
            starRating = ThreeAndStar
        } else if (starRating === 3.75) {
            starRating = ThreeAndStar
        } else if (3.75 < starRating && starRating < 4.25) {
            starRating = FourStar
        } else if (starRating === 4.25) {
            starRating = FourStar
        } else if (4.25 < starRating && starRating < 4.75) {
            starRating = FourAndStar
        } else if (starRating === 4.75) {
            starRating = FourAndStar
        } else if (4.75 < starRating) {
            starRating = FiveStar
        }

        updateUserRating(starRating)

    }, [review])



    const updateReview = () => {
        const reviewCopy = { ...selectedReview }
        reviewCopy.review = newDescription

        ReviewRepository.update(review.id, reviewCopy)
            .then(() => {
                truckId
                    ? TruckRepository.get(truckId).then(setTruck)
                    : ReviewRepository.getAllForUser(userId).then(setUserReviews)

            })
            .then(editToggle)
    }

    return (
        <div className="review-card" key={review.id}>
            {
                truckId
                    ? <div></div>
                    : <div className="review-truckName"><button onClick={() => history.push(`/trucks/${review.truck?.id}`)}>{review.truck?.name}</button></div>
            }

            <div className="review-date">{review.date}</div>
            <div className="review-message">"{review.review}"</div>
            <div className="review-rating"><img className="review-rating" alt="user rating star" src={userRating} /></div>

            {
                truckId
                    ? review.anonymous
                        ? <div className="review-author">~ Anonymous</div>
                        : <div className="review-author">~ {reviewer.firstName} {reviewer?.lastName?.charAt(0)}.</div>
                    : ""
            }

            {
                review.userId === getCurrentUser().id
                    ? (<div className="review-options">
                        <Button color="secondary" onClick={editToggle}>Edit</Button>

                        <Modal animation="false"
                            isOpen={editModal}
                            centered
                            fullscreen="md"
                            size="md"
                            toggle={editToggle}
                        >
                            <ModalHeader toggle={editToggle}>
                                Edit Review
                            </ModalHeader>
                            <ModalBody>
                                <input type="text" className="form-control" defaultValue={review.review} onChange={(e) => setNewDescription(e.target.value)}></input>
                            </ModalBody>
                            <ModalFooter>

                                <Button color="danger" onClick={reviewToggle}>Delete Review</Button>
                                <Modal animation="false"
                                    isOpen={modal}
                                    centered
                                    fullscreen="md"
                                    size="md"
                                    toggle={reviewToggle}
                                >
                                    <ModalHeader toggle={reviewToggle}>
                                        Delete Review
                                    </ModalHeader>
                                    <ModalBody>
                                        Are You Sure You Want to Delete This Review?
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button onClick={
                                            () => {
                                                truckId
                                                    ? ReviewRepository.deleteAndUpdate(review)
                                                        .then(() => {
                                                            TruckRepository.get(truckId).then(setTruck)
                                                                .then(alertNewRating)
                                                                .then(editToggle)
                                                                .then(reviewToggle)
                                                        })
                                                    : ReviewRepository.deleteAndUpdate(review)
                                                        .then(() => {
                                                            ReviewRepository.getAllForUser(userId)
                                                                .then((reviews) => {
                                                                    setUserReviews(reviews)
                                                                })
                                                                .then(() => {
                                                                    UserRepository.get(userId).then(setUser)
                                                                    alertNewInfo()
                                                                    reviewToggle()
                                                                })
                                                        })
                                            }}>
                                            Yes, Delete
                                        </Button>
                                        <Button onClick={reviewToggle}>
                                            Cancel
                                        </Button>
                                    </ModalFooter>
                                </Modal>

                                <Button onClick={updateReview}>
                                    Save Changes
                                </Button>
                                <Button onClick={editToggle}>
                                    Cancel
                                </Button>
                            </ModalFooter>

                        </Modal>


                    </div>)
                    : <div className="review-options-blank"></div>
            }
        </div>
    )
}