import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import TruckRepository from "../../repositories/TruckRepository"
import UserTruckFavoriteRepository from "../../repositories/UserTruckFavoriteRepository"
import Rating from '@mui/material/Rating';
import '../trucks/TruckList.css';

export const TruckCard = ({ thisTruck, truckId, newInfo }) => {
    const history = useHistory()
    const [truck, setTruck] = useState({})
    const [favorites, setFavorites] = useState([])
    const { getCurrentUser } = useSimpleAuth()

    const [truckDollarsString, setTruckDollarsString] = useState("")
    const [roundedUserRating, setRoundedUserRating] = useState(0)
    useEffect(() => {
        const number = truck.userRating
        const rounded = Math.round(number * 2) / 2
        setRoundedUserRating(rounded)
    }, [truck, thisTruck, newInfo])

    useEffect(() => {
        if (thisTruck) {
            setTruck(thisTruck)
        } else if (truckId) {
            TruckRepository.get(truckId).then(setTruck)
        } else return false
    }, [thisTruck, truckId, newInfo])

    useEffect(() => {
        UserTruckFavoriteRepository.getAll().then(setFavorites)
    }, [thisTruck])

    const favorite = favorites.find(fav => fav.userId === getCurrentUser().id && fav.truckId === truck?.id)

    useEffect(() => {
        let truckPrice = "$"
        if (truck.dollars === 2) {
            truckPrice = "$ $"
        } else if (truck.dollars === 3) {
            truckPrice = "$ $ $"
        }
        setTruckDollarsString(truckPrice)

    }, [truck, truckId])


    return (
        <div className="card ">
            <div className="truck-card-body ">
                <button onClick={() => { history.push(`/trucks/${truck?.id}`) }} className={favorite ? "favorite card-body" : "regular card-body"}>
                    <img className="truck-logo" src={truck?.profileImgSrc} alt={`${truck?.name} logo`} />
                </button>
                <div className="mini-info truck-rating ">
                    {
                        truck.userRating === 0
                            ? <div className="truck-card-rating-text">No Ratings Yet</div>
                            : <><Rating name="size-small" precision={0.5} value={roundedUserRating} size="small" readOnly /> <div className="truck-card-rating-text">{`(${truck.userTruckReviews?.length})`}</div></>
                    }
                </div>
                <div className="mini-info">
                    <div className="mini-info truck-price">{truckDollarsString}</div>
                </div>
            </div>
        </div>
    )
}