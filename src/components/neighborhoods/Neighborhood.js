import { useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { useEffect } from "react/cjs/react.development"
import NeighborhoodRepository from "../../repositories/NeighborhoodRepository"
import TruckLocationRepository from "../../repositories/TruckLocationRepository"
import { NeighborhoodSchedule } from "../schedule/NeighborhoodSchedule"
import { TruckCard } from "../trucks/TruckCard"
import './Neighborhood.css';


export const Neighborhood = () => {

    const { neighborhoodId } = useParams()
    const [neighborhood, setNeighborhood] = useState({})
    const [todaysTrucks, setTodaysTrucks] = useState([])
    const [days, setDays] = useState([])

    useEffect(() => {
        TruckLocationRepository.getAllDays().then(setDays)
    }, [neighborhoodId])

    useEffect(() => {
        NeighborhoodRepository.get(neighborhoodId).then(setNeighborhood)
    }, [neighborhoodId])

    useEffect(() => {
        const currentDayId = new Date().getDay() + 1
        TruckLocationRepository.getTruckLocationsByNeighborhoodAndDay(neighborhoodId, currentDayId).then(setTodaysTrucks)
    }, [neighborhoodId])


    return (
        <div className="neighborhood">
            <div className="neighborhood__info card">
                <div className="neighborhood__id">
                    <div className="neighborhood__image"><img alt="logo" className="neighborhood__image" src={neighborhood.profileImgSrc} /></div>
                    <div className="neighborhood__name">{neighborhood.name}</div>
                </div>
                <div className="neighborhood__description">{neighborhood.description}</div>
            </div>

            <div className="neighborhood__currentTrucks card truck ">


                <h3 className="schedule-heading">Trucks in the Area Today: </h3>
                <div className="neighborhood__schedule">
                    {
                        todaysTrucks.length > 0
                            ? todaysTrucks.map(truckLocation => {
                                return <div className="card truck today" key={truckLocation.id}>
                                    <TruckCard className="card-body" truckId={truckLocation.truckId} />
                                </div>
                            })
                            : <div className="card-body">
                                No Trucks Today
                            </div>
                    }
                </div>

            </div>

            <div className="card ">
                <h3 className="schedule-heading">Trucks in the Area This Week</h3>
                <div className="neighborhood__schedule">

                    {
                        days.map(day => {
                            return <div key={day.id} className="weekday card">
                                <div className="day__name">{day.day}</div>
                                <div className="truck-card">
                                    <NeighborhoodSchedule key={`schedule--${day.id}`} neighborhoodId={neighborhoodId} dayId={day.id} />
                                </div>
                            </div>
                        })
                    }

                </div>
            </div>



        </div >
    )

}