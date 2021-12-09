import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import TruckRepository from "../../repositories/TruckRepository"
import UserTruckFavoriteRepository from "../../repositories/UserTruckFavoriteRepository"


export const TruckCard = (props) => {
    const history = useHistory()
    const [truck, setTruck] = useState({})
    const [favorites, setFavorites] = useState([])
    const {getCurrentUser} = useSimpleAuth()

    useEffect(() => {
        TruckRepository.get(props.truckId).then(setTruck)
    },[])

    useEffect(() => {
        UserTruckFavoriteRepository.getAll().then(setFavorites)
    },[])

    const favorite = favorites.find(fav => fav.userId === getCurrentUser().id && fav.truckId === truck?.id )

    return (

        <div className="card-body">
            <button onClick={() => { history.push(`/trucks/${truck?.id}`) }} className={favorite ? "favorite card-body" : "regular card-body"}><img className="truck-logo" src={truck?.profileImgSrc} alt={`${truck?.name} logo`} /></button>
        </div>
    )

}