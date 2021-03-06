import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min"
import Rating from '@mui/material/Rating';
import { useState, useEffect } from "react/cjs/react.development"
import TruckRepository from "../../repositories/TruckRepository"
import NeighborhoodRepository from "../../repositories/NeighborhoodRepository"
import { ReviewForm } from "../forms/ReviewForm"
import TruckLocationRepository from "../../repositories/TruckLocationRepository"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import UserTruckFavoriteRepository from "../../repositories/UserTruckFavoriteRepository"
import { Review } from "../reviews/Review"
import { TruckSchedule } from "../schedule/TruckSchedule"
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap"
import Fav from './images/Fav.png';
import NoFav from './images/NoFav.png';
import './Truck.css';
import { NeighborhoodCard } from "../neighborhoods/NeighborhoodCard"
import UserRepository from "../../repositories/UserRepository"
import FoodTypeRepository from "../../repositories/FoodTypeRepository"
import { SuggestionForm } from "../forms/SuggestionForm"
import FacebookIcon from "./images/FacebookIcon.png"
import TwitterIcon from "./images/TwitterIcon.png"
import InstagramIcon from "./images/InstagramIcon.png"
import WebsiteIcon from "./images/WebsiteIcon.png"
import ReviewRepository from "../../repositories/ReviewRepository"
import { useLocation } from "react-router-dom"
import { TruckForm } from "../forms/TruckForm"



export const Truck = ({ truckID, setUser, userId, updateReadStateChange }) => {
    const [truck, setTruck] = useState({})
    const { truckId } = useParams()
    const [neighborhoods, setNeighborhoods] = useState([])
    const [truckLocations, setTruckLocations] = useState([])
    const { getCurrentUser } = useSimpleAuth()
    const [favorites, setFavorites] = useState([])
    const [existingLike, setExistingLike] = useState(false)
    const [days, setDays] = useState([])
    const [basicTruck, setBasicTruck] = useState({})
    const [roundedUserRating, setRoundedUserRating] = useState(0)
    const [newInfo, setNewInfo] = useState(false)
    const alertNewInfo = () => setNewInfo(!newInfo)
    const [reviews, setReviews] = useState([])
    const [newLocation, setNewLocation] = useState(false)
    const changeLocation = () => setNewLocation(!newLocation)
    const [editModal, setEditModal] = useState(false)
    const editToggle = () => setEditModal(!editModal)
    const [newRating, toggleNewRating] = useState(false)
    const alertNewRating = () => toggleNewRating(!newRating)
    const [modal, setModal] = useState(false)
    const toggle = () => setModal(!modal)
    const [confirm, setConfirm] = useState(false)
    const toggle3 = () => setConfirm(!confirm)
    const [suggestion, setSuggestion] = useState(false)
    const suggestionToggle = () => setSuggestion(!suggestion)

    const location = useLocation()
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])

    const [foodTypes, setFoodTypes] = useState([])
    useEffect(() => {
        FoodTypeRepository.getAll().then(setFoodTypes)

    }, [])

    useEffect(() => {
        const number = truck.userRating
        const rounded = Math.round(number * 2) / 2
        setRoundedUserRating(rounded)
    }, [truck, newRating])

    useEffect(() => {
        ReviewRepository.getAllForTruck(truck.id).then((reviews) => {
            const recentReviews = reviews.sort((a, b) => {
                return b.parsedDate - a.parsedDate
            })
            setReviews(recentReviews)
        })
    }, [truck])

    useEffect(() => {
        if (truckID) {
            TruckRepository.getBasic(truckID).then(setBasicTruck)
        }
    }, [truckID, roundedUserRating, newRating])

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
    }, [truckId, truckID, roundedUserRating, newRating, newInfo])

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
        TruckRepository.get(truckID).then(() => {
            TruckLocationRepository.getTruckLocationsByTruck(truckID).then((res) => {
                setTruckLocations(res)
                alertNewInfo()
                changeLocation()
            })
        })
    }


    const currentDayId = new Date().getDay() + 1
    const currentTruckLocation = truck?.truckLocations?.find(location => location.dayId === currentDayId)
    const currentNeighborhood = neighborhoods?.find(neighborhood => neighborhood.id === currentTruckLocation?.neighborhoodId)
    const foundLike = favorites?.find(favorite => favorite.userId === getCurrentUser().id && favorite.truckId === truck.id)

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

    let truckPrice = "$"
    if (truck.dollars === 2) {
        truckPrice = "$ $"
    } else if (truck.dollars === 3) {
        truckPrice = "$ $ $"
    }


    return (
        <div className="truck__page-card">
            <div className="truck__info">
                <div className="truck__heading">
                    <div className="truck__favorite">
                        {
                            truckId
                                ? existingLike
                                    ? <button key={foundLike?.id} className="star-icon" onClick={() => { toggleFavorite(truckId) }}><img alt="star" className="star-icon" id={`favoriteTruck--${foundLike?.id}`} src={Fav} /></button>
                                    : <button key={truck.name} className="star-icon" onClick={() => { toggleFavorite(truck.id) }}><img alt="star" className="star-icon" id={`favoriteTruck--${foundLike?.id}`} src={NoFav} /></button>
                                : ""
                        }
                    </div>
                    <div className="truck__name">
                        {truck.name}
                    </div>
                    <div className="editTruck-btn">
                        {
                            truckId
                                ? ""
                                : <><Button onClick={editToggle}>Edit/Retire Truck</Button>

                                    <Modal animation="false"
                                        isOpen={editModal}
                                        centered
                                        fullscreen="lg"
                                        size="lg"
                                        toggle={editToggle}
                                    >
                                        <ModalHeader toggle={editToggle}>
                                            Edit Details for {<em>{truck.name}</em>}
                                        </ModalHeader>

                                        <TruckForm existingTruck={truck} register={false} toggle3={toggle3} editToggle={editToggle} basicTruck={basicTruck} alertNewInfo={alertNewInfo} />

                                        <Button type="retire"
                                            color="danger"
                                            value={truck.id}
                                            onClick={() => {

                                                toggle3()
                                            }}
                                            className="btn btn-primary">
                                            Retire Truck
                                        </Button>
                                    </Modal>

                                    <Modal isOpen={confirm} centered fullscreen="sm" size="sm" toggle={toggle} >
                                        <ModalHeader toggle={toggle3}>
                                            Are You Sure You Want to Retire {basicTruck.name}?
                                        </ModalHeader>
                                        <ModalBody>
                                            <Button color="danger" onClick={() => {
                                                TruckRepository.delete(basicTruck.id).then(() => {
                                                    updateReadStateChange()
                                                    UserRepository.get(userId).then(setUser)
                                                        .then(() => {
                                                            toggle3()
                                                            editToggle()
                                                        })
                                                })
                                            }}>
                                                Yes
                                            </Button>
                                            <Button onClick={toggle3}>
                                                Cancel
                                            </Button>
                                        </ModalBody>
                                    </Modal>
                                </>
                        }
                    </div>
                </div>

                <div className="truck__details">
                    <div className="truck-info-details">
                        <div className="truck__media">
                            <div className="truck__image">
                                <img className="truck__logo" src={truck.profileImgSrc} alt={`${truck.name} logo`} />
                            </div>
                        </div>

                        <div className="truck__description">
                            <div className="truck__info--description">{truck.description}</div>
                            <div className="truck__info--hours">Typical Hours: {truck.hours}</div>
                            <div className="truck__info--typeTags">
                                {
                                    truck?.truckFoodTypes?.map(
                                        (type) => {

                                            const foundType = foodTypes.find(foodType => foodType.id === type.foodTypeId)

                                            return <div className="typeTag" key={type.id}>{foundType?.type}</div>
                                        })
                                }
                            </div>
                            <div className="truck__info--dollars">{truckPrice}</div>
                            <div className="truck__info--rating ">
                                {
                                    truck.userRating === 0
                                        ? <div>No Ratings Yet</div>
                                        : <><Rating name="size-small" precision={0.5} value={roundedUserRating} size="small" readOnly />
                                            <div className="truck-userStar">
                                                {
                                                    truck.userTruckReviews?.length > 0
                                                        ? truck.userTruckReviews?.length > 1
                                                            ? `(${truck.userTruckReviews?.length} ratings)`
                                                            : `(${truck.userTruckReviews?.length} rating)`
                                                        : ""
                                                }
                                            </div></>
                                }
                            </div>


                            <div className="truck__info--links">
                                {
                                    truck.websiteURL
                                        ? <a className="link" target="_blank" rel="noreferrer" href={truck.websiteURL} ><img alt="web-logo" className="link__logo" src={WebsiteIcon} /></a>
                                        : ""
                                }
                                {
                                    truck.facebookURL
                                        ? <a className="link" target="_blank" rel="noreferrer" href={truck.facebookURL} ><img alt="facebook-logo" className="link__logo" src={FacebookIcon} /></a>
                                        : ""
                                }
                                {
                                    truck.instagramURL
                                        ? <a className="link" target="_blank" rel="noreferrer" href={truck.instagramURL}><img alt="instagram-logo" className="link__logo" src={InstagramIcon} /></a>
                                        : ""
                                }
                                {
                                    truck.twitterURL
                                        ? <a className="link" target="_blank" rel="noreferrer" href={truck.twitterURL} ><img alt="twitter-logo" className="link__logo" src={TwitterIcon} /></a>
                                        : ""
                                }
                            </div>

                        </div>
                    </div>

                    <div className="truck__currentLocation">
                        {
                            currentNeighborhood
                                ? <><div className="truck-location-heading">Find Us Today </div><div className="truck-location-card"><NeighborhoodCard thisNeighborhood={currentNeighborhood} /></div></>
                                : <><div className="truck-location-heading">Find Us Today </div><div className="neighborhood-card"><div className="card-body">We Are Off Today!</div></div></>

                        }
                        {
                            truckId
                                ? <><div className="suggestion-label truck-location-heading">Know A Good Spot For Us To Visit?</div>
                                    <div className="suggestion-form-btn"><Button onClick={suggestionToggle}>Submit A Suggestion</Button></div>
                                    <Modal animation="false"
                                        isOpen={suggestion}
                                        centered
                                        fullscreen="md"
                                        size="md"
                                        toggle={suggestionToggle}
                                    >
                                        <ModalHeader toggle={suggestionToggle}>
                                            Suggestion For {truck.name}
                                        </ModalHeader>
                                        <ModalBody>
                                            <SuggestionForm suggestionToggle={suggestionToggle} truckId={truck.id} />
                                        </ModalBody>
                                    </Modal></>
                                : ""
                        }
                    </div>
                </div>
            </div>
            <div className="truck__schedule-card">
                <h3 className="schedule-heading">Current Schedule</h3>
                <div className="truck-schedule-card">
                    {
                        days.map(day => {
                            return <div key={day.id} className="schedule-card-full">
                                <div className="day__name">{day.day}</div>
                                <TruckSchedule key={`truck--${truck.id}--schedule--${day.id}`}
                                    dayId={day.id}
                                    truckId={truck.id}
                                    truckPage={truckId}
                                    createNewLocation={createNewLocation}
                                    truckLocations={truckLocations}
                                    setTruckLocations={setTruckLocations}
                                    neighborhoods={neighborhoods}
                                    newLocation={newLocation}
                                    alertNewInfo={alertNewInfo}
                                />
                            </div>
                        })
                    }
                </div>
            </div>

            <div className="truck-reviews-section">
                <div className="truck-reviews-heading">
                    <h3 className="schedule-heading">Recent Reviews</h3>
                    <Link to={`/reviews/${truck.id}`} className="all-reviews">{`View All (${truck.userTruckReviews?.length} reviews)`}</Link>
                </div>
                <div className="truck__reviews card">
                    <div className="review-list reviews">
                        {
                            reviews?.length > 0
                                ? reviews?.slice(0, 3).map(review => {
                                    return <div key={review.id} className="truck-review-card"><Review key={review.id} review={review} setTruck={setTruck} thisTruckId={truckId} alertNewRating={alertNewRating} /></div>
                                })
                                : truckId
                                    ? ""
                                    : <div className="no-reviews">No Reviews Yet</div>
                        }
                    </div>
                    {
                        getCurrentUser().owner
                            ? ""
                            : <div className="review-form"><ReviewForm truckId={truckId} setTruck={setTruck} alertNewRating={alertNewRating} /></div>
                    }
                </div>
            </div>
        </div>
    )
}