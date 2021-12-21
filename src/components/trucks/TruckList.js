import { useEffect, useState } from "react"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import TruckFoodTypeRepository from "../../repositories/TruckFoodTypeRepository"
import TruckLocationRepository from "../../repositories/TruckLocationRepository"
import TruckRepository from "../../repositories/TruckRepository"
import userTruckFavorites from "../../repositories/UserTruckFavoriteRepository"
import { TruckCard } from "./TruckCard"
import './TruckList.css';


export const TruckList = ({ neighborhood, date, favorites, typePref, sortPref }) => {
    const [truckLocations, updateTruckLocations] = useState([])
    const [trucks, setTrucks] = useState([])
    const [favoriteTrucks, setFavoriteTrucks] = useState([])
    const { getCurrentUser } = useSimpleAuth()
    const [truckFoodTypes, setTruckFoodTypes] = useState([])

    useEffect(() => {
        TruckFoodTypeRepository.getAll().then(setTruckFoodTypes)
    }, [])

    useEffect(() => {
        userTruckFavorites.getAll().then(setFavoriteTrucks)
    }, [])

    useEffect(() => {
        TruckRepository.getAll().then(setTrucks)
    }, [])


    const sortTruckLocations = (array) => {
        if (sortPref === "priceAsc") {
            return array.sort((a, b) => {
                return a.truck.dollars - b.truck.dollars
            })
        } else if (sortPref === "priceDesc") {
            return array.sort((a, b) => {
                return b.truck.dollars - a.truck.dollars
            })
        } else if (sortPref === "userRating") {
            return array.sort((a, b) => {
                return b.truck.userRating - a.truck.userRating
            })
        }
    }

    useEffect(() => {
        const currentDayId = date.getDay() + 1
        if (favorites === true && typePref !== 0) {
            TruckLocationRepository.getTruckLocationsByDay(currentDayId)
                .then((res) => {
                    const favoriteLocations = res.filter((location) => {
                        const foundFavorite = favoriteTrucks.find(fav => fav.truckId === location.truckId && fav.userId === getCurrentUser().id)
                        if (foundFavorite) {
                            return location
                        } else return false
                    })
                    const favoriteTypeLocations = favoriteLocations.filter(location => {
                        const foundType = truckFoodTypes?.find(truckType => truckType.foodTypeId === typePref && truckType.truckId === location.truckId)
                        if (foundType) {
                            return location
                        } else return false
                    })
                    sortPref
                        ? updateTruckLocations(sortTruckLocations(favoriteTypeLocations))
                        : updateTruckLocations(favoriteTypeLocations)
                })
        } else if (favorites === true) {
            TruckLocationRepository.getTruckLocationsByDay(currentDayId)
                .then((res) => {
                    const favoriteLocations = res.filter((location) => {
                        const foundFavorite = favoriteTrucks.find(fav => fav.truckId === location.truckId && fav.userId === getCurrentUser().id)
                        if (foundFavorite) {
                            return location
                        } else return false
                    })
                    sortPref
                        ? updateTruckLocations(sortTruckLocations(favoriteLocations))
                        : updateTruckLocations(favoriteLocations)
                })
        } else if (typePref !== 0) {
            TruckLocationRepository.getTruckLocationsByDay(currentDayId)
                .then((res) => {
                    const TypeLocations = res.filter(location => {
                        const foundType = truckFoodTypes?.find(truckType => truckType.foodTypeId === typePref && truckType.truckId === location.truckId)
                        if (foundType) {
                            return location
                        } else return false
                    })
                    sortPref
                        ? updateTruckLocations(sortTruckLocations(TypeLocations))
                        : updateTruckLocations(TypeLocations)
                })
        } else if (favorites === false && typePref === 0) {
            TruckLocationRepository.getTruckLocationsByDay(currentDayId)
                .then((res) => {
                    sortPref
                        ? updateTruckLocations(sortTruckLocations(res))
                        : updateTruckLocations(res)
                })
        }
    }, [date, favorites, typePref, sortPref])


    const filteredLocations = truckLocations?.filter(truckLocation => truckLocation.neighborhoodId === neighborhood.id)

    return (
        <ul className="trucks">
            {
                neighborhood
                    ? filteredLocations?.length > 0
                        ? filteredLocations.map(truckLocation => {
                            const foundTruck = trucks.find(truck => truck.id === truckLocation.truckId)
                            return <li className="card truck" key={truckLocation.id}>
                                <TruckCard truckId={foundTruck?.id} />
                            </li>
                        })
                        : <li className="card no-truck" key={neighborhood.id}>
                            {
                                favorites
                                    ? ""
                                    : <div className="card-body">No Trucks</div>
                            }
                        </li>
                    : ""
            }
        </ul>
    )
}