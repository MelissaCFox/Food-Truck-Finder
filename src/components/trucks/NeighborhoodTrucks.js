import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import NeighborhoodRepository from "../../repositories/NeighborhoodRepository"
import { TruckList } from "./TruckList"


export const NeighborhoodTruckList = () => {
const [neighborhoods, setNeighborhoods] = useState([])
const [dateString, setDateString] = useState("")
const history = useHistory()
const [dateForList, setDateForList] = useState({})

useEffect(() => {
    let newDate = new Date()
    setDateForList(newDate)
},[])



useEffect(() => {
    const date = new Date(dateForList)

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const day = date?.getDay()
    const number = date?.getDate()
    const month = date?.getMonth()
    const year = date?.getFullYear()
    
    setDateString(`${days[day]} ${months[month]} ${number}, ${year}`)
    console.log(date)

},[dateForList])


useEffect(() => {
    NeighborhoodRepository.getAll().then(setNeighborhoods)
},[])


return (
    <>
    <div className="date">
        <input type="date" onChange={(event) => {
            const newDate = event.target.value
            const newDateString = new Date(newDate)
            console.log(newDateString)
            setDateForList(newDateString)
        }}></input>
        <div className="date-string">{dateString}</div>
    </div>
    <div className="filter-options"></div>
    <ul className="neighborhoods">
    {
        neighborhoods.map(neighborhood => {
            return <li className="card neighborhood" key={neighborhood.id}>
                <button onClick={() => { history.push(`/neighborhoods/${neighborhood?.id}`) }}>{neighborhood.name}</button>
                <TruckList key={`neighborhood--${neighborhood.id}`} neighborhood={neighborhood} date={dateForList}/>

            </li>
        })
    }
    </ul>
    </>
)

}