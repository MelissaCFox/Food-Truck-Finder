import { useEffect, useState } from "react"
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min"
import { Input } from "reactstrap"
import FoodTypeRepository from "../../repositories/FoodTypeRepository"
import NeighborhoodRepository from "../../repositories/NeighborhoodRepository"
import { TruckList } from "./TruckList"
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
import './TruckList.css';


export const NeighborhoodTruckList = () => {
    const [neighborhoods, setNeighborhoods] = useState([])
    const [dateString, setDateString] = useState("")
    const history = useHistory()
    const [dateForList, setDateForList] = useState("")
    const [favorites, setFavorites] = useState(false)
    const toggleFavorites = () => setFavorites(!favorites)
    const [typePref, setTypePref] = useState(0)
    const [foodTypes, setFoodTypes] = useState([])
    const [sortPref, setSortPref] = useState("")
    const [dayId, setDayId] = useState(1)

    const location = useLocation()

    useEffect(() => {
        FoodTypeRepository.getAll().then(setFoodTypes)
    }, [])

    useEffect(() => {
        let newDate = new Date()
        setDateForList(newDate)
    }, [location])

    useEffect(() => {
        let date = new Date(dateForList)

        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        const day = date?.getDay()
        const number = date?.getDate()
        const month = date?.getMonth()
        const year = date?.getFullYear()

        setDateString(`${days[day]} ${months[month]} ${number}, ${year}`)
        setDayId(day)

    }, [dateForList])


    useEffect(() => {
        NeighborhoodRepository.getAll().then(setNeighborhoods)
    }, [])

    const imgSrc = (neighborhood) => {
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
        return src

    }

    return (
        <>
            <div className="options">
                <div className="date">
                    <div className="date-string">
                        <input className="date-picker" type="date" onChange={(event) => {
                            const newDate = event.target.value
                            const parsedDate = Date.parse(newDate) + 86400000
                            const accurateDate = new Date(parsedDate)
                            setDateForList(accurateDate)
                        }}></input>
                        <h2>{dateString}</h2>
                    </div>

                </div>
                <div className="filter-options">

                    <div className="filter-option">
                        <label className="dropDown" >Show Only Favorites</label>
                        <Input className="checkbox" type="checkbox" onChange={toggleFavorites} />
                    </div>

                    <div className="filter-option">
                        <label className="dropDown label">Filter By Food Type</label>
                        <select className="dropDown" id="typeSelect" type="select" onChange={e => setTypePref(parseInt(e.target.value))}>
                            <option value="0">--All--</option>
                            {
                                foodTypes.map(type => <option key={type.id} value={type.id}>{type.type}</option>)
                            }

                        </select>
                    </div>

                    <div className="filter-option">
                        <label className="dropDown label">Sort Trucks By</label>
                        <select className="dropDown" id="sortPref" type="select" onChange={e => setSortPref(e.target.value)}>
                            <option value="">--All--</option>
                            <option value="priceAsc">Price (low to high)</option>
                            <option value="priceDesc">Price (high to low)</option>
                            <option value="userRating">User Rating</option>

                        </select>
                    </div>

                </div>
            </div>
            <ul className="neighborhoods">
                {
                    neighborhoods.map(neighborhood => {
                        const todaysTrucks = neighborhood.truckLocations?.filter(truckLocation => truckLocation.dayId === dayId + 1)
                        if (todaysTrucks?.length > 0) {

                            const src = imgSrc(neighborhood)
                            return <TruckList className="multi-truck-list " key={neighborhood.id} src={src} neighborhood={neighborhood} date={dateForList} favorites={favorites} typePref={typePref} sortPref={sortPref} />

                        } else return false
                    })
                }
            </ul>
        </>
    )

}