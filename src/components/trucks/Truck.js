import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { useState, useEffect } from "react/cjs/react.development"
import TruckRepository from "../../repositories/TruckRepository"
import NeighborhoodRepository from "../../repositories/NeighborhoodRepository"
import { NeighborhoodCard } from "../neighborhoods/NeighborhoodCard"
import { ReviewForm } from "./ReviewForm"
import TruckLocationRepository from "../../repositories/TruckLocationRepository"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import useResourceResolver from "../../hooks/resource/useResourceResolver"


export const Truck = (props) => {
    const [truck, setTruck] = useState({})
    const { truckId } = useParams()
    const [neighborhoods, setNeighborhoods] = useState([])
    const [truckLocations, setTruckLocations] = useState([])
    const { getCurrentUser } = useSimpleAuth()
    const { resolveResource, resource: currentAnimal } = useResourceResolver()

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
        } else if(neighborhoodId) {
            TruckLocationRepository.add(newTruckLocation).then(() => {TruckLocationRepository.getTruckLocationsByTruck(props.truckId).then(setTruckLocations)})
        }
        TruckRepository.get(props.truckId).then(() => {TruckLocationRepository.getTruckLocationsByTruck(props.truckId).then(setTruckLocations)})
    }

    const currentDayId = new Date().getDay() + 1
    const currentTruckLocation = truck?.truckLocations?.find(location => location.dayId === currentDayId)
    const currentNeighborhood = neighborhoods?.find(neighborhood => neighborhood.id === currentTruckLocation?.neighborhoodId)

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
                    Find Us Today In {currentNeighborhood?.name}

                </div>
            </div>

            <div className="truck__schedule">
                Current Schedule
                <div className="schedule">
                    {
                        truckLocations.map(location => {
                            return <div className="card schedule-card" key={location.id}>
                                <div>{location.day.day}</div>
                                {
                                    truckId
                                        ? <NeighborhoodCard neighborhoodId={location.neighborhood?.id} />
                                        : (<>
                                            <div>{location.neighborhood.name}</div>
                                            <NeighborhoodCard key={location.neighborhood.id} neighborhoodId={location.neighborhood?.id} />
                                            <div className="form-group">
                                                <select
                                                    defaultValue=""
                                                    name="location"
                                                    id="locationId"
                                                    onChange={e => createNewLocationId(location.truck.id, e.target.value, location.day.id)}
                                                    className="form-control"
                                                >
                                                    <option value="">--Change Location--</option>
                                                    {
                                                        neighborhoods.map(neighborhood => {
                                                            return <option key={neighborhood.id} id={neighborhood.id} value={neighborhood.id}>{neighborhood.name}</option>
                                                        })
                                                    }
                                                </select>
                                            </div>
                                        </>
                                        )

                                }
                            </div>

                        })
                    }
                </div>
            </div>
            Customer Reviews
            <div className="truck__reviews">
                <div className="review-list">
                    {
                        truck?.userTruckReviews?.map(review => {
                            return <div className="card review-card" key={review.id}>
                                <div>{review.date}</div>
                                <div>{review.review}</div>
                            </div>
                        })
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