import { useState } from "react"
import { useHistory } from "react-router-dom"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { useEffect } from "react/cjs/react.development"
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import Rating from '@mui/material/Rating';
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import ReviewRepository from "../../repositories/ReviewRepository"
import TruckRepository from "../../repositories/TruckRepository"
import UserRepository from "../../repositories/UserRepository"


export const Review = ({ review, userId, setUserReviews, setTruck, setUser, alertNewRating, alertNewInfo, allReviewsList, editedReview }) => {
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


    useEffect(() => {
        UserRepository.get(review.userId).then(setReviewer)
    }, [review])

    useEffect(() => {
        ReviewRepository.getBasic(review.id).then(setSelectedReview)
    }, [review])


    const updateReview = () => {
        const reviewCopy = { ...selectedReview }
        reviewCopy.review = newDescription

        ReviewRepository.update(review.id, reviewCopy)
            .then(() => {
                allReviewsList
                    ? editedReview()
                    : truckId
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

            <div className="review-card-heading">
                <div className="review-date">{review.date}</div>
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
                                    <Input type="textarea" className="form-control" defaultValue={review.review} onChange={(e) => setNewDescription(e.target.value)}></Input
                                    >
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
                                                                alertNewInfo()
                                                                reviewToggle()
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
            <div className="review-message scrollbar scrollbar--review">"{review.review}"</div>
            <Rating precision={0.5} name="size-medium" className="truck-userStar" defaultValue={review.rating} readOnly />

            {
                truckId
                    ? review.anonymous
                        ? <div className="review-author">~ Anonymous</div>
                        : <div className="review-author">~ {reviewer.firstName} {reviewer?.lastName?.charAt(0)}.</div>
                    : ""
            }

        </div>
    )
}