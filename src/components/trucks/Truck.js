import { useParams } from "react-router-dom/cjs/react-router-dom.min"
import { useState, useEffect } from "react/cjs/react.development"
import TruckRepository from "../../repositories/TruckRepository"


export const Truck = () => {
    const [truck, setTruck] = useState({})
    const {truckId }= useParams()

    useEffect(() => {
        TruckRepository.get(parseInt(truckId))
        .then(setTruck)

    }, [truckId])

    return (
        <>
            <div className="truck name">
                {truck.name}
            </div>

        </>
    )



}