import { useEffect, useState } from "react"
import useSimpleAuth from "../../hooks/ui/useSimpleAuth"
import TruckLocationRepository from "../../repositories/TruckLocationRepository"
import TruckRepository from "../../repositories/TruckRepository"
import userTruckFavorites from "../../repositories/UserTruckFavoriteRepository"
import { TruckCard } from "./TruckCard"


export const TruckList = ({ neighborhood, date, favorites, typePref }) => {
    const [truckLocations, updateTruckLocations] = useState([])
    const [trucks, setTrucks] = useState([])
    const [favoriteTrucks, setFavoriteTrucks] = useState([])
    const { getCurrentUser } = useSimpleAuth()

    useEffect(() => {
        userTruckFavorites.getAll().then(setFavoriteTrucks)
    }, [])

    useEffect(() => {
        TruckRepository.getAll().then(setTrucks)
    }, [date])

    useEffect(() => {
        const currentDayId = date.getDay() + 1
        if (favorites === true && typePref !== 0) {
            TruckLocationRepository.getTruckLocationsByDay(currentDayId)
                .then((res) => {
                    const favoriteLocations = res.filter((location) => {
                        const foundFavorite = favoriteTrucks.find(fav => fav.truckId === location.truckId && fav.userId === getCurrentUser().id)
                        if (foundFavorite) {
                            return location
                        }
                    })
                    const favoriteTypeLocations = favoriteLocations.filter(location => location.truck.foodTypeId === typePref)
                    updateTruckLocations(favoriteTypeLocations)
                })

        } else if (favorites === true) {
            TruckLocationRepository.getTruckLocationsByDay(currentDayId)
                .then((res) => {
                    const favoriteLocations = res.filter((location) => {
                        const foundFavorite = favoriteTrucks.find(fav => fav.truckId === location.truckId && fav.userId === getCurrentUser().id)
                        if (foundFavorite) {
                            return location
                        }
                    })
                    updateTruckLocations(favoriteLocations)
                })
        } else if (typePref !== 0) {
            TruckLocationRepository.getTruckLocationsByDay(currentDayId)
                .then((res) => {
                    const TypeLocations = res.filter(location => location.truck.foodTypeId === typePref)
                    updateTruckLocations(TypeLocations)
                })

        } else {
            TruckLocationRepository.getTruckLocationsByDay(currentDayId).then(updateTruckLocations)
        }
    }, [date, favorites, typePref])




    const filteredLocations = truckLocations.filter(truckLocation => truckLocation.neighborhoodId === neighborhood.id)

    return (
        <>
            <ul className="trucks">
                {
                    neighborhood
                        ? filteredLocations.length > 0
                            ? filteredLocations.map(truckLocation => {
                                const foundTruck = trucks.find(truck => truck.id === truckLocation.truckId)
                                return <li className="card truck" key={truckLocation.id}>
                                    <TruckCard truckId={foundTruck?.id} />
                                </li>

                            })
                            : <li className="card no-truck" key={neighborhood.id}>

                                {
                                    favorites
                                        ? <div className="card-body">No Favorites in This Neighborhood</div>
                                        : <div className="card-body">No Trucks Today</div>
                                }


                            </li>
                        : ""
                }
            </ul>
        </>
    )

}