import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { FormGroup, Input, Label } from "reactstrap"
import FoodTypeRepository from "../../repositories/FoodTypeRepository"
import NeighborhoodRepository from "../../repositories/NeighborhoodRepository"
import { TruckList } from "./TruckList"


export const NeighborhoodTruckList = () => {
    const [neighborhoods, setNeighborhoods] = useState([])
    const [dateString, setDateString] = useState("")
    const history = useHistory()
    const [dateForList, setDateForList] = useState("")
    const [favorites, setFavorites] = useState(false)
    const toggleFavorites = () => setFavorites(!favorites)
    const [typePref, setTypePref] = useState(0)
    const [foodTypes, setFoodTypes] = useState([])

    useEffect(() => {
        FoodTypeRepository.getAll().then(setFoodTypes)
    },[])

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
            <div className="date">
                <input type="date" onChange={(event) => {
                    const newDate = event.target.value
                    const parsedDate = Date.parse(newDate) + 86400000
                    const accurateDate = new Date(parsedDate)
                    setDateForList(accurateDate)
                }}></input>
                <div className="date-string">{dateString}</div>
            </div>
            <div className="filter-options">
                <FormGroup >
                    <Label >Show Only Favorites</Label>
                    <Input type="checkbox" onChange={toggleFavorites} />
                </FormGroup>

                <FormGroup >
                    <Label for="typeSelect">Filter By Food Type</Label>
                    <Input id="typeSelect" type="select" onChange={e => setTypePref(parseInt(e.target.value))}>
                        <option value="0">--All--</option>
                        {
                            foodTypes.map(type => <option key={type.id} value={type.id}>{type.type}</option>)
                        }

                    </Input>
                </FormGroup>

            </div>
            <ul className="neighborhoods">
                {
                    neighborhoods.map(neighborhood => {
                        return <li className="card neighborhood" key={neighborhood.id}>
                            <button onClick={() => { history.push(`/neighborhoods/${neighborhood?.id}`) }}>{neighborhood.name}</button>
                            <TruckList key={`neighborhood--${neighborhood.id}`} neighborhood={neighborhood} date={dateForList} favorites={favorites} typePref={typePref} />

                        </li>
                    })
                }
            </ul>
        </>
    )

}