import { useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { useEffect } from "react/cjs/react.development"
import NeighborhoodRepository from "../../repositories/NeighborhoodRepository"
import TruckLocationRepository from "../../repositories/TruckLocationRepository"
import { Schedule } from "../schedule/Schedule"
import { TruckCard } from "../trucks/TruckCard"


export const Neighborhood = () => {

    const { neighborhoodId } = useParams()
    const [neighborhood, setNeighborhood] = useState({})
    const [todaysTrucks, setTodaysTrucks] = useState([])
    const [days, setDays] = useState([])

    useEffect(() => {
        TruckLocationRepository.getAllDays().then(setDays)
    }, [])

    useEffect(() => {
        NeighborhoodRepository.get(neighborhoodId).then(setNeighborhood)
    }, [])

    useEffect(() => {
        const currentDayId = new Date().getDay() + 1
        TruckLocationRepository.getTruckLocationsByNeighborhoodAndDay(neighborhoodId, currentDayId).then(setTodaysTrucks)
    }, [])


    return (
        <>
            <div className="neighborhood__header">
                <div className="neighborhood__image"><img className="neighborhood-logo" src={neighborhood.profileImgSrc} /></div>
                <div className="neighborhood__name">{neighborhood.name}</div>
                <div className="neighborhood__description">{neighborhood.description}</div>
                <div className="neighborhood__currentTrucks">
                    Trucks in the Area Today:
                    {
                        todaysTrucks.length > 0
                            ? todaysTrucks.map(truckLocation => {
                                return <div className="" key={truckLocation.id}>
                                    <TruckCard truckId={truckLocation.truckId} />
                                </div>
                            })
                            : <div className="card-body">
                                No Trucks Today
                            </div>
                    }

                </div>
                Trucks in the Area This Week
                <div className="neighborhood__schedule schedule">

                    {
                        days.map(day => {
                            return <div key={day.id} className="weekday card">
                                <div className="day__name">{day.day}</div>
                                <div className="truck-card">
                                    <Schedule key={`schedule--${day.id}`} neighborhoodId={neighborhoodId} dayId={day.id} />
                                </div>
                            </div>
                        })
                    }

                </div>

            </div>

        </>
    )

}