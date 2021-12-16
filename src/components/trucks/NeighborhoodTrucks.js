import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { FormGroup, Input, Label } from "reactstrap"
import FoodTypeRepository from "../../repositories/FoodTypeRepository"
import NeighborhoodRepository from "../../repositories/NeighborhoodRepository"
import { TruckList } from "./TruckList"
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

    useEffect(() => {
        FoodTypeRepository.getAll().then(setFoodTypes)
    }, [])

    useEffect(() => {
        let newDate = new Date()
        setDateForList(newDate)
    }, [])

    useEffect(() => {
        let date = new Date(dateForList)

        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        const day = date?.getDay()
        const number = date?.getDate()
        const month = date?.getMonth()
        const year = date?.getFullYear()

        setDateString(`${days[day]} ${months[month]} ${number}, ${year}`)

    }, [dateForList])


    useEffect(() => {
        NeighborhoodRepository.getAll().then(setNeighborhoods)
    }, [])


    return (
        <>
            <div className="options">
                <div className="date">
                    <h2 className="date-string">
                        <input className="date-picker" type="date" onChange={(event) => {
                            const newDate = event.target.value
                            const parsedDate = Date.parse(newDate) + 86400000
                            const accurateDate = new Date(parsedDate)
                            setDateForList(accurateDate)
                        }}></input>
                        <h2>{dateString}</h2>
                    </h2>

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
                        return <li className="card neighborhood" key={neighborhood.id}>
                            <button className="neighborhoodName" onClick={() => { history.push(`/neighborhoods/${neighborhood?.id}`) }}><h3 className="neighborhood-name">{neighborhood.name}</h3></button>
                            <TruckList key={`neighborhood--${neighborhood.id}`} neighborhood={neighborhood} date={dateForList} favorites={favorites} typePref={typePref} sortPref={sortPref} />

                        </li>
                    })
                }
            </ul>
        </>
    )

}