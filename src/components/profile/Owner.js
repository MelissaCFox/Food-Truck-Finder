import { useState } from "react"
import { useEffect } from "react/cjs/react.development"
import { Button } from "reactstrap"
import { NeighborhoodTruckList } from "../trucks/NeighborhoodTrucks"
import UserRepository from "../../repositories/UserRepository"

export const Owner = (props) => {
    const [user, setUser] = useState({})

    useEffect(() => {
        UserRepository.get(props.userId).then(setUser)
    }, [])

    return (
        <>
            {
                user.owner
                    ? <div>{user.name} is an owner</div>
                    : <div>{user.name} is not an owner</div>
            }
            <div className="header">
                <Button color="success" outline onClick={()=> {}}>Register Truck</Button>
                <Button color="success" outline onClick={()=> {}}>Favorites</Button>
            </div>
        </>
    )
}