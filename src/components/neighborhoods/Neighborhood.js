import { useState } from "react"
import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { useEffect } from "react/cjs/react.development"
import NeighborhoodRepository from "../../repositories/NeighborhoodRepository"
import TruckLocationRepository from "../../repositories/TruckLocationRepository"
import { NeighborhoodSchedule } from "../schedule/NeighborhoodSchedule"
import { TruckCard } from "../trucks/TruckCard"
import FivePoints from "../images/5Points.png"
import TwelveSouth from "../images/12South.png"
import BerryHill from "../images/BerryHill.png"
import Downtown from "../images/Downtown.png"
import Germantown from "../images/Germantown.png"
import GreenHills from "../images/GreenHills.png"
import Hillsboro from "../images/Hillsboro.png"
import SylvanPark from "../images/SylvanPark.png"
import TheGulch from "../images/TheGulch.png"
import TheNations from "../images/TheNations.png"
import WestEnd from "../images/WestEnd.png"
import './Neighborhood.css';


export const Neighborhood = () => {

    const { neighborhoodId } = useParams()
    const [neighborhood, setNeighborhood] = useState({})
    const [todaysTrucks, setTodaysTrucks] = useState([])
    const [days, setDays] = useState([])
    const [randomTruckLocation, setRandomTruckLocation] = useState({})

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

    useEffect(() => {
        if (todaysTrucks.length > 0) {
            setRandomTruckLocation(todaysTrucks[Math.floor(Math.random() * todaysTrucks.length)])
        }
    }, [todaysTrucks])

    let src = ""
    if (neighborhood.name === "12 South") {
        src = TwelveSouth
    } else if (neighborhood.name === "Berry Hill") {
        src = BerryHill
    } else if (neighborhood.name === "Downtown") {
        src = Downtown
    } else if (neighborhood.name === "Germantown") {
        src = Germantown
    } else if (neighborhood.name === "Green Hills") {
        src = GreenHills
    } else if (neighborhood.name === "The Gulch") {
        src = TheGulch
    } else if (neighborhood.name === "Hillsboro Village") {
        src = Hillsboro
    } else if (neighborhood.name === "The Nations") {
        src = TheNations
    } else if (neighborhood.name === "Sylvan Park") {
        src = SylvanPark
    } else if (neighborhood.name === "West End") {
        src = WestEnd
    } else if (neighborhood.name === "5 Points") {
        src = FivePoints
    }


    return (
        <div className="neighborhood">
            <div className="neighborhood__id">
                <div className="neighborhood__info neighborhood-page-card ">
                    <div className="neighborhood__id">
                        <div className="neighborhood__image"><img alt="logo" className="neighborhood__image" src={src} /></div>
                        <div className="neighborhood__description">{neighborhood.description}</div>
                    </div>

                </div>

                <div className="neighborhood__currentTrucks neighborhood-page-card">
                    <h3 className="feature-heading">Featured Truck </h3>
                    <div className="neighborhood__schedule">
                        {
                            randomTruckLocation.id
                                ? <div className="card truck today" key={randomTruckLocation.id}>
                                    <TruckCard className="card-body" truckId={randomTruckLocation.truckId} />
                                </div>
                                : <div className="card truck today"><div className="card-body">
                                    No Trucks Today
                                </div></div>
                        }
                    </div>
                </div>
            </div>
            <div className="neighborhood-page-card ">
                <h3 className="schedule-heading">Trucks in the Area This Week</h3>
                <div className="neighborhood__schedule">

                    {
                        days.map(day => {
                            return <div key={day.id} className="weekday">
                                <div className="day__name">{day.day}</div>
                                <div className="schedule-card">
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