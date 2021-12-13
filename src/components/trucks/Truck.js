import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { useState, useEffect } from "react/cjs/react.development"
import TruckRepository from "../../repositories/TruckRepository"
import NeighborhoodRepository from "../../repositories/NeighborhoodRepository"
import { ReviewForm } from "../reviews/ReviewForm"
import TruckLocationRepository from "../../repositories/TruckLocationRepository"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import UserTruckFavoriteRepository from "../../repositories/UserTruckFavoriteRepository"
import { Review } from "../reviews/Review"
import { TruckSchedule } from "../schedule/TruckSchedule"
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap"
import UserRepository from "../../repositories/UserRepository"



export const Truck = ({ truckID }) => {
    const [truck, setTruck] = useState({})
    const { truckId } = useParams()
    const [neighborhoods, setNeighborhoods] = useState([])
    const [truckLocations, setTruckLocations] = useState([])
    const { getCurrentUser } = useSimpleAuth()
    const [favorites, setFavorites] = useState([])
    const [existingLike, setExistingLike] = useState(false)
    const [days, setDays] = useState([])
    const [editModal, setEditModal] = useState(false)
    const editToggle = () => setEditModal(!editModal)
    const [thisTruck, setThisTruck] = useState({})

    useEffect(() => {
        TruckRepository.getBasic(truckID).then(setThisTruck)
    }, [truckID])


    useEffect(() => {
        TruckLocationRepository.getAllDays().then(setDays)
    }, [truckID])

    useEffect(() => {
        const foundLike = favorites?.find(favorite => favorite.userId === getCurrentUser().id && favorite.truckId === truck.id)
        if (foundLike) {
            setExistingLike(true)
        } else {
            setExistingLike(false)
        }
    }, [truck, favorites, getCurrentUser])

    useEffect(() => {
        UserTruckFavoriteRepository.getAll().then(setFavorites)
    }, [truckID])

    useEffect(() => {
        truckId
            ? TruckLocationRepository.getTruckLocationsByTruck(truckId).then(setTruckLocations)
            : TruckLocationRepository.getTruckLocationsByTruck(truckID).then(setTruckLocations)

    }, [truckId, truckID])

    useEffect(() => {
        NeighborhoodRepository.getAll().then(setNeighborhoods)
    }, [truckID])

    useEffect(() => {
        truckId
            ? TruckRepository.get(truckId).then(setTruck)
            : TruckRepository.get(truckID).then(setTruck)

    }, [truckId, truckID])

    const createNewLocation = (truckId, neighborhoodId, dayId) => {
        const newTruckLocation = {
            truckId: truckId,
            neighborhoodId: parseInt(neighborhoodId),
            dayId: dayId
        }
        const existingTruckLocation = truckLocations.find(location => location.truckId === truckId && location.dayId === dayId)

        if (existingTruckLocation && neighborhoodId === "0") {
            TruckLocationRepository.delete(existingTruckLocation.id).then(() => { TruckLocationRepository.getTruckLocationsByTruck(truckID).then(setTruckLocations) })

        } else if (existingTruckLocation && neighborhoodId) {
            TruckLocationRepository.update(existingTruckLocation.id, newTruckLocation)
        } else if (neighborhoodId) {
            TruckLocationRepository.add(newTruckLocation).then(() => { TruckLocationRepository.getTruckLocationsByTruck(truckID).then(setTruckLocations) })
        }
        TruckRepository.get(truckID).then(() => { TruckLocationRepository.getTruckLocationsByTruck(truckID).then(setTruckLocations) })
    }


    const currentDayId = new Date().getDay() + 1
    const currentTruckLocation = truck?.truckLocations?.find(location => location.dayId === currentDayId)
    const currentNeighborhood = neighborhoods?.find(neighborhood => neighborhood.id === currentTruckLocation?.neighborhoodId)
    const foundLike = favorites?.find(favorite => favorite.userId === getCurrentUser().id && favorite.truckId === truck.id)

    const updateTruck = () => {
        TruckRepository.update(thisTruck.id, thisTruck)
            .then(() => {
                TruckRepository.get(thisTruck.id).then(setTruck)
            })
            .then(editToggle)
    }

    const toggleFavorite = (favoriteTruckId) => {
        const newLike = {
            userId: getCurrentUser().id,
            truckId: favoriteTruckId
        }
        if (truckId) {
            if (existingLike) {
                const like = favorites.find(favorite => favorite.userId === getCurrentUser().id && favorite.truckId === truck.id)
                UserTruckFavoriteRepository.delete(like.id).then(() => {
                    setExistingLike(false)
                    UserTruckFavoriteRepository.getAll().then(setFavorites)
                })

            } else {
                UserTruckFavoriteRepository.add(newLike).then(() => {
                    setExistingLike(true)
                    UserTruckFavoriteRepository.getAll().then(setFavorites)
                })
            }
        }
    }

    return (
        <>
            <div className="truck__header">
                <div className="truck__details">
                    <div className="truck__name">
                        {truck.name}
                    </div>
                    <div className="truck__image">
                        <img className="truck-logo" src={truck.profileImgSrc} alt={`${truck.name} logo`} />
                    </div>
                    <div className="truck__favorite">
                        {
                            truckId
                                ? existingLike
                                    ? <button key={foundLike?.id} className="star-icon" onClick={() => { toggleFavorite(truckId) }}><img alt="star" className="star-icon" id={`favoriteTruck--${foundLike?.id}`} src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Star_icon_stylized.svg/1077px-Star_icon_stylized.svg.png" /></button>
                                    : <button key={truck.name} className="star-icon" onClick={() => { toggleFavorite(truck.id) }}><img alt="star" className="star-icon" id={`favoriteTruck--${foundLike?.id}`} src="https://www.shareicon.net/data/2015/09/19/103568_star_512x512.png" /></button>
                                : ""
                        }
                    </div>
                    <div className="truck__info">
                        <div className="truck__info--type">{truck.foodType?.type}</div>
                        <div className="truck__info--description">{truck.description}</div>
                        <div className="truck__info--links">
                            <a className="link" target="_blank" rel="noreferrer" href={truck.websiteURL} ><img alt="logo" className="link__logo" src="https://www.freepnglogos.com/uploads/logo-website-png/logo-website-file-globe-icon-svg-wikimedia-commons-21.png" /></a>
                            <a className="link" target="_blank" rel="noreferrer" href={truck.instagramURL}><img alt="logo" className="link__logo" src="https://www.nicepng.com/png/detail/1-12860_new-instagram-logo-png-transparent-png-format-instagram.png" /></a>
                        </div>
                    </div>
                </div>
                <div className="truck__currentLocation">

                    <Button onClick={editToggle}>Edit Details</Button>

                    <Modal animation="false"
                        isOpen={editModal}
                        centered
                        fullscreen="md"
                        size="md"
                        toggle={editToggle}
                    >
                        <ModalHeader toggle={editToggle}>
                            Edit Truck Details
                        </ModalHeader>
                        <ModalBody>
                            <label >Name</label>
                            <input type="text" className="form-control" defaultValue={truck.name}
                                onChange={(e) => {
                                    const copy = { ...thisTruck }
                                    copy.name = e.target.value
                                    setThisTruck(copy)
                                }} ></input>
                            <label >Description</label>
                            <input type="text" className="form-control" defaultValue={truck.description}
                                onChange={(e) => {
                                    const copy = { ...thisTruck }
                                    copy.description = e.target.value
                                    setThisTruck(copy)
                                }} ></input>
                            <label >Hours</label>
                            <input type="text" className="form-control" defaultValue={truck.hours}
                                onChange={(e) => {
                                    const copy = { ...thisTruck }
                                    copy.hours = e.target.value
                                    setThisTruck(copy)
                                }} ></input>
                            <label >Website</label>
                            <input type="text" className="form-control" defaultValue={truck.websiteURL}
                                onChange={(e) => {
                                    const copy = { ...thisTruck }
                                    copy.websiteURL = e.target.value
                                    setThisTruck(copy)
                                }} ></input>
                            <label >Instagram</label>
                            <input type="text" className="form-control" defaultValue={truck.instagramURL}
                                onChange={(e) => {
                                    const copy = { ...thisTruck }
                                    copy.instagramURL = e.target.value
                                    setThisTruck(copy)
                                }} ></input>
                            <label >Profile Image</label>
                            <input type="text" className="form-control" defaultValue={truck.profileImgSrc}
                                onChange={(e) => {
                                    const copy = { ...thisTruck }
                                    copy.profileImgSrc = e.target.value
                                    setThisTruck(copy)
                                }} ></input>


                        </ModalBody>
                        <ModalFooter>
                            <Button onClick={() => updateTruck()}>
                                Save Changes
                            </Button>
                            <Button onClick={editToggle}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Modal>


                    {
                        currentNeighborhood
                            ? <div>Find Us Today in {currentNeighborhood.name}!</div>
                            : <div>We Are Off Today!</div>
                    }
                </div>
            </div>

            <div className="truck__schedule">
                Current Schedule
                <div className="schedule">

                    {
                        days.map(day => {
                            return <div key={day.id} className="card schedule-card">
                                <div className="day__name">{day.day}</div>
                                <TruckSchedule key={`truck--${truck.id}--schedule--${day.id}`}
                                    dayId={day.id}
                                    truckId={truck.id}
                                    truckPage={truckId}
                                    createNewLocation={createNewLocation}
                                    truckLocations={truckLocations}
                                    setTruckLocations={setTruckLocations}
                                    neighborhoods={neighborhoods}
                                />
                            </div>
                        })
                    }


                </div>
            </div>
            Customer Reviews
            <div className="truck__reviews">
                <div className="review-list">
                    {
                        truck?.userTruckReviews?.length > 0
                            ? truck?.userTruckReviews?.map(review => {
                                return <Review key={review.id} review={review} setTruck={setTruck} />
                            })
                            : <div>No Reviews Yet</div>
                    }
                </div>
                <div>
                    {
                        getCurrentUser().owner
                            ? ""
                            : <ReviewForm truckId={truckId} setTruck={setTruck} />
                    }

                </div>
            </div>

        </>
    )

}