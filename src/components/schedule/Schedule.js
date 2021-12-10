import { useState } from "react"
import { useEffect } from "react/cjs/react.development"
import NeighborhoodRepository from "../../repositories/NeighborhoodRepository"
import TruckLocationRepository from "../../repositories/TruckLocationRepository"
import { NeighborhoodCard } from "../neighborhoods/NeighborhoodCard"
import { TruckCard } from "../trucks/TruckCard"


export const Schedule = ({ neighborhoodId, dayId, truckId, truckPage, createNewLocationId }) => {

    const [neighborhoodTrucks, setNeighborhoodTrucks] = useState([])
    const [truckNeighborhoods, setTruckNeighborhoods] = useState([])
    const [neighborhoods, setNeighborhoods] = useState([])

    useEffect(() => {
        NeighborhoodRepository.getAll().then(setNeighborhoods)
    }, [])

    useEffect(() => {
        TruckLocationRepository.getTruckLocationsByNeighborhoodAndDay(neighborhoodId, dayId).then(setNeighborhoodTrucks)
    }, [])

    useEffect(() => {
        TruckLocationRepository.getTruckLocationsByTruckAndDay(truckId, dayId).then(setTruckNeighborhoods)
    }, [])


    return (
        <>

            {
                neighborhoodId
                    ? neighborhoodTrucks.length > 0
                        ? neighborhoodTrucks.map(location => <li className="card truck" key={location.id}><TruckCard truckId={location.truckId} /></li>)
                        : <div className="card card-body">
                            No Trucks Today
                        </div>
                    : ""
            }
            {
                truckId
                    ? truckPage
                        ? truckNeighborhoods.length === 1
                            ? truckNeighborhoods?.map(location => <NeighborhoodCard key={location.neighborhood?.id} neighborhoodId={location.neighborhood?.id} />)
                            : <div className="card card-body">Off Today</div>


                        : truckNeighborhoods.length === 1
                            ? truckNeighborhoods.map(location =>
                                <>
                                    <div>{location.neighborhood?.name}</div>
                                    <NeighborhoodCard key={location.neighborhood?.id} neighborhoodId={location.neighborhood?.id} />
                                    <div className="form-group">
                                        <select
                                            key={location.neighborhood.id}
                                            defaultValue=""
                                            name="location"
                                            id="locationId"
                                            onChange={e => createNewLocationId(location.truck.id, e.target.value, location.day.id)}
                                            className="form-control"
                                        >
                                            <option value="">--Change Location--</option>
                                            {
                                                neighborhoods.map(neighborhood => {
                                                    return <option key={neighborhood.id} id={neighborhood.id} value={neighborhood.id}>{neighborhood.name}</option>
                                                })
                                            }
                                        </select>
                                    </div>
                                </>
                            )

                            : <><div className="card card-body">Off Today</div>
                                <div className="form-group">
                                    <select
                                        key={dayId}
                                        defaultValue=""
                                        name="location"
                                        id="locationId"
                                        onChange={e => createNewLocationId(truckId, e.target.value, dayId)}
                                        className="form-control"
                                    >
                                        <option value="">--Change Location--</option>
                                        {
                                            neighborhoods.map(neighborhood => {
                                                return <option key={neighborhood.id} id={neighborhood.id} value={neighborhood.id}>{neighborhood.name}</option>
                                            })
                                        }
                                    </select>
                                </div></>

                    : ""
            }

        </>
    )
}

