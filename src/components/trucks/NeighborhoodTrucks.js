import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { Input } from "reactstrap"
import NeighborhoodRepository from "../../repositories/NeighborhoodRepository"
import { TruckList } from "./TruckList"


export const NeighborhoodTruckList = () => {
const [neighborhoods, setNeighborhoods] = useState([])
const [dateString, setDateString] = useState("")
const history = useHistory()

let date = new Date()

useEffect(() => {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const day = date?.getDay()
    const number = date?.getDate()
    const month = date?.getMonth()
    const year = date?.getFullYear()
    
    setDateString(`${days[day]} ${months[month]} ${number}, ${year}`)

},[date])


useEffect(() => {
    NeighborhoodRepository.getAll().then(setNeighborhoods)
},[dateString])


return (
    <>
    <div className="date">
        <div className="date-string">{dateString}</div>
    </div>
    <div className="filter-options"></div>
    <ul className="neighborhoods">
    {
        neighborhoods.map(neighborhood => {
            return <li className="card neighborhood" key={neighborhood.id}>
                <button onClick={() => { history.push(`/neighborhoods/${neighborhood?.id}`) }}>{neighborhood.name}</button>
                <TruckList key={`neighborhood--${neighborhood.id}`} neighborhood={neighborhood} date={date}/>

            </li>
        })
    }
    </ul>
    </>
)

}