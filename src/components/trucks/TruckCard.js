import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import TruckRepository from "../../repositories/TruckRepository"
import UserTruckFavoriteRepository from "../../repositories/UserTruckFavoriteRepository"
import '../trucks/TruckList.css';
import OneStar from './images/1Star.png';
import OneAndStar from './images/1-5Stars.png';
import TwoStar from './images/2Stars.png';
import TwoAndStar from './images/2-5Stars.png';
import ThreeStar from './images/3Stars.png';
import ThreeAndStar from './images/3-5Stars.png';
import FourStar from './images/4Stars.png';
import FourAndStar from './images/4-5Stars.png';
import FiveStar from './images/5Stars.png';
import NoRating from './images/NoRating.png';



export const TruckCard = ({ thisTruck, truckId, newInfo }) => {
    const history = useHistory()
    const [truck, setTruck] = useState({})
    const [favorites, setFavorites] = useState([])
    const { getCurrentUser } = useSimpleAuth()

    const [userRating, updateUserRating] = useState("")
    const [truckDollarsString, setTruckDollarsString] = useState("")

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

    },[truck, truckId])


    useEffect(() => {
        let starRating = truck?.userRating
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
        } else if (starRating === 0) {
            starRating = NoRating
        }
        updateUserRating(starRating)
    },[truck, thisTruck, newInfo])


    return (
        <div className="card ">
            <div className="truck-card-body ">
                <button onClick={() => { history.push(`/trucks/${truck?.id}`) }} className={favorite ? "favorite card-body" : "regular card-body"}>
                    <img className="truck-logo" src={truck?.profileImgSrc} alt={`${truck?.name} logo`} />
                </button>
                <div className="mini-info">
                    <div className="mini-info truck-price">{truckDollarsString}</div>
                    <div className="mini-info truck-rating"><img className="mini-info userStar" alt="user rating star" src={userRating} /></div>
                </div>
            </div>
        </div>
    )
}