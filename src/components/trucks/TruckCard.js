import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import TruckRepository from "../../repositories/TruckRepository"
import UserTruckFavoriteRepository from "../../repositories/UserTruckFavoriteRepository"


export const TruckCard = ({ truckId }) => {
    const history = useHistory()
    const [truck, setTruck] = useState({})
    const [favorites, setFavorites] = useState([])
    const { getCurrentUser } = useSimpleAuth()

    useEffect(() => {
        TruckRepository.get(truckId).then(setTruck)
    }, [truckId])

    useEffect(() => {
        UserTruckFavoriteRepository.getAll().then(setFavorites)
    }, [truckId])

    const favorite = favorites.find(fav => fav.userId === getCurrentUser().id && fav.truckId === truck?.id)

    let truckPrice = "$"
    if (truck.dollars === 2) {
        truckPrice = "$$"
    } else if (truck.dollars === 3) {
        truckPrice = "$$"
    }

    return (

        <div className="card ">
            <div className="truck-card-body ">
                <button onClick={() => { history.push(`/trucks/${truck?.id}`) }} className={favorite ? "favorite card-body" : "regular card-body"}>
                    <img className="truck-logo" src={truck?.profileImgSrc} alt={`${truck?.name} logo`} />
                </button>
                <div className="mini-info">
                    <div className="mini-info truck-price">{truckPrice}</div>
                    <div className="mini-info truck-rating"><img className="mini-info userStar" alt="user rating star" src="https://png.pngitem.com/pimgs/s/625-6256492_yellow-star-advertising-hd-png-download.png" />{truck.userRating}</div>
                </div>
            </div>
        </div>
    )

}