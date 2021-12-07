import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import TruckRepository from "../../repositories/TruckRepository"


export const TruckCard = (props) => {
    const history = useHistory()
    const [truck, setTruck] = useState({})

    useEffect(() => {
        TruckRepository.get(props.truckId).then(setTruck)
    },[])


    return (

        <div className="card-body">
            <button onClick={() => { history.push(`/trucks/${truck?.id}`) }}><img className="truck-logo" src={truck?.profileImgSrc} alt={`${truck?.name} logo`} /></button>
        </div>
    )

}