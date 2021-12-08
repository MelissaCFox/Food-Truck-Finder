import { useState } from "react"
import { useEffect } from "react/cjs/react.development"
import { Button } from "reactstrap"
import { NeighborhoodTruckList } from "../trucks/NeighborhoodTrucks"
import UserRepository from "../../repositories/UserRepository"
import TruckLocationRepository from "../../repositories/TruckLocationRepository"
import TruckRepository from "../../repositories/TruckRepository"
import { Truck } from "../trucks/Truck"

export const Owner = (props) => {
    const [user, setUser] = useState({})
    const [trucks, setTrucks] = useState([])

    useEffect(() => {
        TruckRepository.getAll().then(setTrucks)
    },[])

    useEffect(() => {
        UserRepository.get(props.userId).then(setUser)
    }, [])

    return (
        <>
            <div className="header">
                <Button color="success" outline onClick={()=> {}}>Register Truck</Button>
                <Button color="success" outline onClick={()=> {}}>Favorites</Button>
            </div>

            <div className="owner-trucks">
                <h3>My Truck(s)</h3>
                <div className="truck-list">
                {
                    user.truckOwners?.map(truckOwner => {
                        const foundTruck = trucks.find(truck => truck.id === truckOwner.truckId)
                        if (foundTruck) {
                            return <li className="card" key={truckOwner.id}>
                                <Truck truckId={foundTruck.id} />
                            </li>
                        }
                    })

                }
                </div>
            </div>
        </>
    )
}