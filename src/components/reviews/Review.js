import { useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import ReviewRepository from "../../repositories/ReviewRepository"
import TruckRepository from "../../repositories/TruckRepository"


export const Review = ({ review, user, setUserReviews, setTruck }) => {
    const { getCurrentUser } = useSimpleAuth()
    const { truckId } = useParams()
    const [ modal, setModal ] = useState(false)

    const reviewToggle = () => setModal(!modal)

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
                        <Button color="danger" onClick={reviewToggle}>Delete Review</Button>

                        <Modal
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
                                        ReviewRepository.delete(review.id).then(() => {
                                            truckId
                                                ? TruckRepository.get(truckId).then(setTruck)
                                                : ReviewRepository.getAllForUser(user.id).then(setUserReviews)
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




                    </div>)
                    : ""
            }
        </div>

    )


}