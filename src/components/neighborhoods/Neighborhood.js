import { useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { useEffect } from "react/cjs/react.development"
import NeighborhoodRepository from "../../repositories/NeighborhoodRepository"
import TruckLocationRepository from "../../repositories/TruckLocationRepository"
import { TruckCard } from "../trucks/TruckCard"


export const Neighborhood = () => {

    const { neighborhoodId } = useParams()
    const [neighborhood, setNeighborhood] = useState({})
    const [todaysTrucks, setTodaysTrucks] = useState([])
    const [sundayLocations, setSundayLocations] = useState([])
    const [mondayLocations, setMondayLocations] = useState([])
    const [tuesdayLocations, setTuesdayLocations] = useState([])
    const [wednesdayLocations, setWednesdayLocations] = useState([])
    const [thursdayLocations, setThursdayLocations] = useState([])
    const [fridayLocations, setFridayLocations] = useState([])
    const [saturdayLocations, setSaturdayLocations] = useState([])

    useEffect(() => {
        NeighborhoodRepository.get(neighborhoodId).then(setNeighborhood)
    }, [])

    useEffect(() => {
        const currentDayId = new Date().getDay() + 1
        TruckLocationRepository.getTruckLocationsByNeighborhoodAndDay(neighborhoodId, currentDayId).then(setTodaysTrucks)
    }, [])

    useEffect(() => {
        TruckLocationRepository.getTruckLocationsByNeighborhoodAndDay(neighborhoodId, 1).then(setSundayLocations)
        TruckLocationRepository.getTruckLocationsByNeighborhoodAndDay(neighborhoodId, 2).then(setMondayLocations)
        TruckLocationRepository.getTruckLocationsByNeighborhoodAndDay(neighborhoodId, 3).then(setTuesdayLocations)
        TruckLocationRepository.getTruckLocationsByNeighborhoodAndDay(neighborhoodId, 4).then(setWednesdayLocations)
        TruckLocationRepository.getTruckLocationsByNeighborhoodAndDay(neighborhoodId, 5).then(setThursdayLocations)
        TruckLocationRepository.getTruckLocationsByNeighborhoodAndDay(neighborhoodId, 6).then(setFridayLocations)
        TruckLocationRepository.getTruckLocationsByNeighborhoodAndDay(neighborhoodId, 7).then(setSaturdayLocations)
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
                    <div className="weekday card">
                        <div className="day__name">Sunday</div>
                        <div className="truck-card">
                            {
                                sundayLocations.length > 0
                                    ? sundayLocations.map(location => <li className="card truck" key={location.id}><TruckCard truckId={location.truckId} /></li>)
                                    : <div className="card-body">
                                        No Trucks Today
                                    </div>
                            }
                        </div>
                    </div>
                    <div className="weekday card">
                        <div className="day__name">Monday</div>
                        <div className="truck-card">
                            {
                                mondayLocations.length > 0
                                    ? mondayLocations.map(location => <li className="card truck" key={location.id}><TruckCard truckId={location.truckId} /></li>)
                                    : <div className="card-body">
                                        No Trucks Today
                                    </div>
                            }
                        </div>
                    </div>
                    <div className="weekday card">
                        <div className="day__name">Tuesday</div>
                        <div className="truck-card">
                            {
                                tuesdayLocations.length > 0
                                    ? tuesdayLocations.map(location => <li className="card truck" key={location.id}><TruckCard truckId={location.truckId} /></li>)
                                    : <div className="card-body">
                                        No Trucks Today
                                    </div>
                            }
                        </div>
                    </div>
                    <div className="weekday card">
                        <div className="day__name">Wednesday</div>
                        <div className="truck-card">
                            {
                                wednesdayLocations.length > 0
                                    ? wednesdayLocations.map(location => <li className="card truck" key={location.id}><TruckCard truckId={location.truckId} /></li>)
                                    : <div className="card-body">
                                        No Trucks Today
                                    </div>
                            }
                        </div>
                    </div>
                    <div className="weekday card">
                        <div className="day__name">Thursday</div>
                        <div className="truck-card">
                            {
                                thursdayLocations.length > 0
                                    ? thursdayLocations.map(location => <li className="card truck" key={location.id}><TruckCard truckId={location.truckId} /></li>)
                                    : <div className="card-body">
                                        No Trucks Today
                                    </div>
                            }
                        </div>
                    </div>
                    <div className="weekday card">
                        <div className="day__name">Friday</div>
                        <div className="truck-card">
                            {
                                fridayLocations.length > 0
                                    ? fridayLocations.map(location => <li className="card truck" key={location.id}><TruckCard truckId={location.truckId} /></li>)
                                    : <div className="card-body">
                                        No Trucks Today
                                    </div>
                            }
                        </div>
                    </div>
                    <div className="weekday card">
                        <div className="day__name">Saturday</div>
                        <div className="truck-card">
                            {
                                saturdayLocations.length > 0
                                    ? saturdayLocations.map(location => <li className="card truck" key={location.id}><TruckCard truckId={location.truckId} /></li>)
                                    : <div className="card-body">
                                        No Trucks Today
                                    </div>
                            }
                        </div>
                    </div>
                </div>

            </div>

        </>
    )

}