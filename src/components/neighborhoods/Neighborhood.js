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
import Map12South from "../images/Map-12South.png";
import Map5Points from "../images/Map5Points.png";
import MapDowntown from "../images/MapDowntown.png";
import MapGermantown from "../images/MapGermantown.png";
import MapGreenHills from "../images/MapGreenHills.png";
import MapHillsboro from "../images/MapHillsboro.png";
import MapSylvanPark from "../images/MapSylvanPark.png";
import MapWestEnd from "../images/MapWestEnd.png";
import MapTheNations from "../images/MapTheNations.png";
import MapTheGulch from "../images/MapTheGulch.png";
import MapBerryHill from "../images/MapBerryHill.png";


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
    let map = ""
    if (neighborhood.name === "12 South") {
        src = TwelveSouth
        map = Map12South
    } else if (neighborhood.name === "Berry Hill") {
        src = BerryHill
        map = MapBerryHill
    } else if (neighborhood.name === "Downtown") {
        src = Downtown
        map = MapDowntown
    } else if (neighborhood.name === "Germantown") {
        src = Germantown
        map = MapGermantown
    } else if (neighborhood.name === "Green Hills") {
        src = GreenHills
        map = MapGreenHills
    } else if (neighborhood.name === "The Gulch") {
        src = TheGulch
        map = MapTheGulch
    } else if (neighborhood.name === "Hillsboro Village") {
        src = Hillsboro
        map = MapHillsboro
    } else if (neighborhood.name === "The Nations") {
        src = TheNations
        map = MapTheNations
    } else if (neighborhood.name === "Sylvan Park") {
        src = SylvanPark
        map = MapSylvanPark
    } else if (neighborhood.name === "West End") {
        src = WestEnd
        map = MapWestEnd
    } else if (neighborhood.name === "5 Points") {
        src = FivePoints
        map = Map5Points
    }


    return (
        <div className="neighborhood">
            <div className="neighborhood__details">
                <div className="neighborhood__info neighborhood-page-card ">
                    <div className="neighborhood__id">
                        <div className="neighborhood__image"><img alt="logo" className="neighborhood__image" src={src} /></div>
                        <div className="neighborhood__description">
                            <div>{neighborhood.description}</div>
                            <div>Learn More at <a className="NG-link" target="blank" href={neighborhood.linkNG}>Nashville Guru</a></div>
                        </div>
                    </div>

                </div>

                <div className="neighborhood__currentTrucks neighborhood-page-card">
                    <h3 className="feature-heading">Featured Truck </h3>
                        <div className="random-truck-heading">{randomTruckLocation.truck?.name}</div>
                    <div className="featured-truck">
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

                <div className="neighborhood__map">
                    <img className="map" alt="neigborhood location on map" src={map} />
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