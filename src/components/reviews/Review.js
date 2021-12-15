import { useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { useEffect } from "react/cjs/react.development"
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import ReviewRepository from "../../repositories/ReviewRepository"
import TruckRepository from "../../repositories/TruckRepository"
import UserRepository from "../../repositories/UserRepository"


export const Review = ({ review, userId, setUserReviews, thisTruckId, setTruck }) => {
    const { getCurrentUser } = useSimpleAuth()
    const { truckId } = useParams()
    const [modal, setModal] = useState(false)
    const reviewToggle = () => setModal(!modal)
    const [editModal, setEditModal] = useState(false)
    const editToggle = () => setEditModal(!editModal)
    const [newDescription, setNewDescription] = useState("")
    const [selectedReview, setSelectedReview] = useState({})
    const [reviewer, setReviewer] = useState({})

    const [thisTruck, setThisTruck] = useState({})
    const [fullTruck, setFullTruck] = useState({})

    useEffect(() => {
        if (truckId) {

            TruckRepository.get(parseInt(truckId)).then(setFullTruck)
        }
    }, [truckId])

    useEffect(() => {
        if (truckId) {

            TruckRepository.getBasic(parseInt(truckId)).then(setThisTruck)
        }
    }, [truckId])


    useEffect(() => {
        UserRepository.get(review.userId).then(setReviewer)
    }, [])

    useEffect(() => {
        ReviewRepository.getBasic(review.id).then(setSelectedReview)
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
                    TruckRepository.get(thisTruck.id).then(setTruck)

                })
        }
    }


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
                truckId
                    ? review.anonymous
                        ? <div>~ Anonymous</div>
                        : <div>~ {reviewer.firstName} {reviewer?.lastName?.charAt(0)}.</div>
                    : ""
            }

            {
                review.userId === getCurrentUser().id
                    ? (<div className="review-options">
                        <Button color="secondary" onClick={editToggle}>Edit Review</Button>

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
                                <Button onClick={updateReview}>
                                    Save Changes
                                </Button>
                                <Button onClick={editToggle}>
                                    Cancel
                                </Button>
                            </ModalFooter>
                        </Modal>

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
                                            ? ReviewRepository.delete(review.id)
                                                .then(() => {
                                                    TruckRepository.get(parseInt(thisTruckId))
                                                        .then((truck) => {
                                                            setThisTruck(truck)
                                                            updateRatings()
                                                            setTruck(truck)
                                                            reviewToggle()
                                                        })
                                                })
                                            : ReviewRepository.delete(review.id)
                                                .then(() => {
                                                    
                                                            ReviewRepository.getAllForUser(userId)
                                                                .then((reviews) => {
                                                                    setUserReviews(reviews)
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

                    </div>)
                    : ""
            }
        </div>
    )
}