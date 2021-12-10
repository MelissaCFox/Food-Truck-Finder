import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { useState, useEffect } from "react/cjs/react.development"
import TruckRepository from "../../repositories/TruckRepository"
import NeighborhoodRepository from "../../repositories/NeighborhoodRepository"
import { NeighborhoodCard } from "../neighborhoods/NeighborhoodCard"
import { ReviewForm } from "../reviews/ReviewForm"
import TruckLocationRepository from "../../repositories/TruckLocationRepository"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import UserTruckFavoriteRepository from "../../repositories/UserTruckFavoriteRepository"
import { Review } from "../reviews/Review"
import { Schedule } from "../schedule/Schedule"



export const Truck = (props) => {
    const [truck, setTruck] = useState({})
    const { truckId } = useParams()
    const [neighborhoods, setNeighborhoods] = useState([])
    const [truckLocations, setTruckLocations] = useState([])
    const { getCurrentUser } = useSimpleAuth()
    const [favorites, setFavorites] = useState([])
    const [existingLike, setExistingLike] = useState(false)
    const [days, setDays] = useState([])

    useEffect(() => {
        TruckLocationRepository.getAllDays().then(setDays)
    },[])

    useEffect(() => {
        const foundLike = favorites?.find(favorite => favorite.userId === getCurrentUser().id && favorite.truckId === truck.id)
        if (foundLike) {
            setExistingLike(true)
        } else {
            setExistingLike(false)
        }
    }, [truck])

    useEffect(() => {
        UserTruckFavoriteRepository.getAll().then(setFavorites)
    }, [])

    useEffect(() => {
        truckId
            ? TruckLocationRepository.getTruckLocationsByTruck(truckId).then(setTruckLocations)
            : TruckLocationRepository.getTruckLocationsByTruck(props.truckId).then(setTruckLocations)

    }, [])

    useEffect(() => {
        NeighborhoodRepository.getAll().then(setNeighborhoods)
    }, [])

    useEffect(() => {
        truckId
            ? TruckRepository.get(truckId).then(setTruck)
            : TruckRepository.get(props.truckId).then(setTruck)

    }, [truckId])

    const createNewLocationId = (truckId, neighborhoodId, dayId) => {
        const newTruckLocation = {
            truckId: truckId,
            neighborhoodId: parseInt(neighborhoodId),
            dayId: dayId
        }
        const existingTruckLocation = truckLocations.find(location => location.truckId === truckId && location.dayId === dayId)
        if (existingTruckLocation && neighborhoodId) {
            TruckLocationRepository.update(existingTruckLocation.id, newTruckLocation)
        } else if (neighborhoodId) {
            TruckLocationRepository.add(newTruckLocation).then(() => { TruckLocationRepository.getTruckLocationsByTruck(props.truckId).then(setTruckLocations) })
        }
        TruckRepository.get(props.truckId).then(() => { TruckLocationRepository.getTruckLocationsByTruck(props.truckId).then(setTruckLocations) })
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
                                    ? <button key={foundLike?.id} className="star-icon" onClick={() => { toggleFavorite(truckId) }}><img className="star-icon" id={`favoriteTruck--${foundLike?.id}`} src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Star_icon_stylized.svg/1077px-Star_icon_stylized.svg.png" /></button>
                                    : <button key={truck.name} className="star-icon" onClick={() => { toggleFavorite(truck.id) }}><img className="star-icon" id={`favoriteTruck--${foundLike?.id}`} src="https://www.shareicon.net/data/2015/09/19/103568_star_512x512.png" /></button>
                                : ""
                        }
                    </div>
                    <div className="truck__info">
                        <div className="truck__info--type">{truck.foodType?.type}</div>
                        <div className="truck__info--description">{truck.description}</div>
                        <div className="truck__info--links">
                            <a className="link" target="_blank" href={truck.websiteURL} ><img className="link__logo" src="https://www.freepnglogos.com/uploads/logo-website-png/logo-website-file-globe-icon-svg-wikimedia-commons-21.png" /></a>
                            <a className="link" target="_blank" href={truck.instagramURL}><img className="link__logo" src="https://www.nicepng.com/png/detail/1-12860_new-instagram-logo-png-transparent-png-format-instagram.png" /></a>
                        </div>
                    </div>
                </div>
                <div className="truck__currentLocation">
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
                            return <div className="card schedule-card" key={day.id}>
                            <div className="day__name">{day.day}</div>
                            <Schedule key={`schedule--${day.id}`} dayId={day.id} truckId={truck.id} truckPage={truckId} />
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
                            : <ReviewForm truckId={truckId} />
                    }

                </div>
            </div>

        </>
    )

}